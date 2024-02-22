import { useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
  Modal,
} from "react-native";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import ImageViewer from "react-native-image-zoom-viewer";

import {
  DARK_COLOR,
  SMALL_TEXT_FONT,
  URL,
  WHITE_COLOR,
} from "../../configs/Config";
import BackgroundImage from "../../configs/BackgroundImage";

const { width, height } = Dimensions.get("window");

export default function Count({ navigation }) {
  const [photoFront, setPhotoFront] = useState(null);
  const [photoBack, setPhotoBack] = useState(null);
  const [isImageViewerVisible, setIsImageViewerVisible] = useState(false);

  const imageWidth = width * 0.9;
  const imageHeight = height * 0.7;

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const json = await AsyncStorage.getItem("countData");
        if (json) {
          const data = JSON.parse(json);
          setPhotoFront(data?.photoFront || null);
          setPhotoBack(data?.photoBack || null);
        }
        const isConnected = await checkInternetConnection();
        if (isConnected) {
          await updateDataFromMongoDB();
        }
      };
      fetchData();
    }, [checkInternetConnection, updateDataFromMongoDB])
  );

  const checkInternetConnection = async () => {
    try {
      const netInfoState = await NetInfo.fetch();
      return netInfoState.isConnected && netInfoState.isInternetReachable;
    } catch (error) {
      return false;
    }
  };

  const updateDataFromMongoDB = async () => {
    const { _id: id } = JSON.parse(await AsyncStorage.getItem("data"));
    const response = await axios.get(`${URL}/count/${id}`);
    const json = response.data.data;
    setPhotoFront(json?.photoFront || null);
    setPhotoBack(json?.photoBack || null);
    await AsyncStorage.setItem("countData", JSON.stringify(json));
  };

  const handleAddCount = () => {
    navigation.navigate("AddCountFront");
  };

  const handleUpdateCount = async () => {
    navigation.navigate("UpdateCountFront");
  };

  return (
    <BackgroundImage>
      <View style={styles.container}>
        {photoFront && (
          <TouchableOpacity
            onPress={() => setIsImageViewerVisible(true)}
            style={{ alignItems: "center" }}
          >
            <Image
              source={{ uri: photoFront }}
              style={[styles.image, { width: imageWidth, height: imageHeight }]}
            />
          </TouchableOpacity>
        )}
        {!photoFront || !photoBack ? (
          <TouchableOpacity onPress={handleAddCount} style={styles.button}>
            <Text style={styles.text}>А данс оруулах</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleUpdateCount} style={styles.button}>
            <Text style={styles.text}>А данс шинэчлэх</Text>
          </TouchableOpacity>
        )}
        <Modal visible={isImageViewerVisible} transparent={true}>
          <ImageViewer
            imageUrls={[{ url: photoFront }, { url: photoBack }]}
            enableSwipeDown
            onSwipeDown={() => setIsImageViewerVisible(false)}
          />
        </Modal>
      </View>
    </BackgroundImage>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "100%",
    resizeMode: "contain",
  },
  button: {
    position: "absolute",
    bottom: 20,
    backgroundColor: DARK_COLOR,
    paddingVertical: 10,
    width: "65%",
    borderRadius: 10,
    alignItems: "center",
  },
  text: {
    fontSize: SMALL_TEXT_FONT,
    fontWeight: "bold",
    color: WHITE_COLOR,
  },
});

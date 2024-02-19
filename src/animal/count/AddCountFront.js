import { useEffect, useState } from "react";
import { StyleSheet, View, Modal, TouchableOpacity } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

import { DARK_COLOR, URL, WHITE_COLOR } from "../../configs/Config";
import SubmitButton from "../../configs/SubmitButton";
import ImageButton from "../../configs/ImageButton";
import BackgroundImage from "../../configs/BackgroundImage";
import ErrorText from "../../configs/ErrorText";
import Loading from "../../configs/Loading";

export default function AddCountFront({ navigation }) {
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const isConnected = await checkInternetConnection();
        if (!isConnected) {
          setError("Интернэт холболтоо шалгана уу");
          return;
        }

        await AsyncStorage.getItem("");
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [checkInternetConnection]);

  const checkInternetConnection = async () => {
    try {
      const netInfoState = await NetInfo.fetch();

      return netInfoState.isConnected && netInfoState.isInternetReachable;
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      const isConnected = await checkInternetConnection();
      if (!isConnected) {
        setError("Интернэт холболтоо шалгана уу");
        return;
      }

      if (!photo) {
        setError("Зурагаа оруулна уу");
        return;
      }

      const { _id: id } = JSON.parse(await AsyncStorage.getItem("data"));

      const uriParts = photo.split(".");
      const fileType = uriParts[uriParts.length - 1];

      const formData = new FormData();
      formData.append("userId", id);
      formData.append("photoFront", {
        uri: photo,
        type: `image/${fileType}`,
        name: `photo.${fileType}`,
      });

      const response = await axios.post(`${URL}/count`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const countId = response.data.data._id;
      await AsyncStorage.setItem("countId", countId);

      navigation.navigate("AddCountBack");
    } catch (error) {
      setError(error.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async (fromCamera = false) => {
    setIsModalVisible(false);

    let result;

    if (fromCamera) {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });
    }

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <BackgroundImage>
      {loading ? (
        <Loading />
      ) : (
        <View style={styles.container}>
          {error && <ErrorText error={error} />}

          <ImageButton text={"Нүүр нэг"} onPress={toggleModal} photo={photo} />

          <SubmitButton onPress={handleSubmit} text={"Хадгалах"} />

          <Modal
            animationType="fade"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => {
              setIsModalVisible(false);
            }}
          >
            <BackgroundImage>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <TouchableOpacity onPress={toggleModal} style={styles.button}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                  </TouchableOpacity>
                  <SubmitButton
                    text={"Камер нээх"}
                    onPress={() => pickImage(true)}
                  />
                  <SubmitButton
                    text={"Зураг сонгох"}
                    onPress={() => pickImage(false)}
                  />
                </View>
              </View>
            </BackgroundImage>
          </Modal>
        </View>
      )}
    </BackgroundImage>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addImageButton: {
    backgroundColor: DARK_COLOR,
    borderRadius: 50,
    padding: 10,
    alignSelf: "center",
    margin: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: WHITE_COLOR,
    width: "65%",
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  button: {
    width: 24,
    marginBottom: 10,
    marginLeft: 5,
    alignSelf: "flex-start",
  },
});

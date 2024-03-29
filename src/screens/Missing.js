import { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import NetInfo from "@react-native-community/netinfo";
import { Ionicons } from "@expo/vector-icons";

import {
  GRAY_COLOR,
  PRIMARY_COLOR,
  SMALL_TEXT_FONT,
  TEXT_FONT,
  URL,
  WHITE_COLOR,
} from "../configs/Config";
import MissingModal from "../missing/MissingModal";
import BackgroundImage from "../configs/BackgroundImage";
import SubmitButton from "../configs/SubmitButton";

export default function Missing({ navigation }) {
  const [missing, setMissing] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [surname, setSurname] = useState("");
  const [givenName, setGivenName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const missing = await AsyncStorage.getItem("missing");
        if (missing) {
          const data = JSON.parse(missing);
          setMissing(data);
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
    const response = await axios.get(`${URL}/missing`);
    setMissing(response.data.data);
    const json = await response.data.data;
    await AsyncStorage.setItem("missing", JSON.stringify(json));
  };

  const truncateText = (text, fontSize, maxWidth) => {
    const maxCharsPerLine = Math.floor(maxWidth / (fontSize * 0.6));
    const maxChars = maxCharsPerLine * 2;
    if (text.length > maxChars) {
      return `${text.substring(0, maxChars)}...`;
    }
    return text;
  };

  const formatDate = (date) => {
    const year = new Date(date).getFullYear();
    const month = (new Date(date).getMonth() + 1).toString().padStart(2, "0");
    const day = new Date(date).getDate().toString().padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  const handleMissing = (
    photo,
    title,
    description,
    date,
    surname,
    givenName
  ) => {
    setModalVisible(true);
    setPhoto(photo);
    setTitle(title);
    setDescription(description);
    setDate(date);
    setSurname(surname);
    setGivenName(givenName);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleUserMissing = () => {
    navigation.navigate("UserMissing");
  };

  return (
    <BackgroundImage>
      <View style={styles.container}>
        <FlatList
          style={styles.listContainer}
          data={missing}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                handleMissing(
                  item.photo,
                  item.title,
                  item.description,
                  item.date,
                  item.surname,
                  item.givenName
                )
              }
              style={styles.listItem}
            >
              <View style={styles.imageContainer}>
                {item.photo ? (
                  <Image source={{ uri: item.photo }} style={styles.image} />
                ) : (
                  <Ionicons
                    name="image-outline"
                    size={80}
                    color={PRIMARY_COLOR}
                  />
                )}
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.title}>
                  {truncateText(
                    item.title,
                    TEXT_FONT,
                    Dimensions.get("window").width - 120
                  )}
                </Text>
                <Text style={styles.description}>
                  {truncateText(
                    item.description,
                    SMALL_TEXT_FONT,
                    Dimensions.get("window").width - 120
                  )}
                </Text>
                <View style={styles.bottomContainer}>
                  <Text style={styles.date}>{formatDate(item.date)}</Text>
                  <Text style={styles.author}>
                    {item.surname || "Малчин"} {item.givenName || ""}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
        <MissingModal
          isVisible={modalVisible}
          closeModal={handleModalClose}
          photo={photo}
          title={title}
          description={description}
          date={date}
          surname={surname}
          givenName={givenName}
        />
        <SubmitButton onPress={handleUserMissing} text={"Миний зарууд"} />
      </View>
    </BackgroundImage>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  listContainer: {
    width: "100%",
    paddingHorizontal: 10,
  },
  listItem: {
    flexDirection: "row",
    backgroundColor: WHITE_COLOR,
    borderRadius: 10,
    marginBottom: 5,
    padding: 10,
  },
  imageContainer: {
    width: 80,
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: TEXT_FONT,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: SMALL_TEXT_FONT,
    color: GRAY_COLOR,
    marginVertical: 5,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 4,
  },
  date: {
    fontSize: SMALL_TEXT_FONT,
    color: "gray",
  },
  author: {
    fontSize: SMALL_TEXT_FONT,
    color: "gray",
  },
});

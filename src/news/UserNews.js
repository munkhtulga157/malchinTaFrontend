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
import NetInfo from "@react-native-community/netinfo";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

import {
  DARK_COLOR,
  GRAY_COLOR,
  PRIMARY_COLOR,
  SMALL_TEXT_FONT,
  TEXT_FONT,
  URL,
  WHITE_COLOR,
} from "../configs/Config";
import SubmitButton from "../configs/SubmitButton";
import DeleteNewsModal from "./DeleteNewsModal";
import UserNewsModal from "./UserNewsModal";
import BackgroundImage from "../configs/BackgroundImage";
import Loading from "../configs/Loading";

export default function UserNews({ navigation }) {
  const [news, setNews] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [itemId, setItemId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const news = await AsyncStorage.getItem("userNews");
        if (news) {
          const data = JSON.parse(news);
          setNews(data);
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
    const response = await axios.get(`${URL}/news/${id}`);
    setNews(response.data.data);
    const json = await response.data.data;
    await AsyncStorage.setItem("userNews", JSON.stringify(json));
  };

  const handleDelete = async () => {
    const isConnected = await checkInternetConnection();
    if (!isConnected) {
      setError("Интернэт холболтоо шалгана уу");
      return;
    }
    await axios.delete(`${URL}/news/${itemId}`);
    const updatedNews = news.filter((item) => item._id !== itemId);
    setNews(updatedNews);
    setDeleteModalVisible(false);
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

  const handleDeleteIcon = (itemId) => {
    setDeleteModalVisible(true);
    setItemId(itemId);
  };

  const handleDeleteModalClose = () => {
    setDeleteModalVisible(false);
  };

  const handleNews = (photo, title, description, date) => {
    setModalVisible(true);
    setPhoto(photo);
    setTitle(title);
    setDescription(description);
    setDate(date);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleAdd = () => {
    navigation.navigate("AddNews");
  };

  return (
    <BackgroundImage>
      {loading ? (
        <Loading />
      ) : (
        <View style={styles.container}>
          <FlatList
            style={styles.listContainer}
            data={news}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  handleNews(
                    item.photo,
                    item.title,
                    item.description,
                    item.date
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
                  <Text style={styles.date}>{formatDate(item.date)}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => handleDeleteIcon(item._id)}
                  style={styles.iconContainer}
                >
                  <MaterialIcons
                    name="delete-forever"
                    size={15}
                    color={WHITE_COLOR}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          />
          <UserNewsModal
            isVisible={modalVisible}
            closeModal={handleModalClose}
            photo={photo}
            title={title}
            description={description}
            date={date}
          />
          <DeleteNewsModal
            isVisible={deleteModalVisible}
            closeModal={handleDeleteModalClose}
            handleDelete={handleDelete}
          />
          <SubmitButton onPress={handleAdd} text={"Мэдээлэл нэмэх"} />
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
    marginBottom: 5,
  },
  date: {
    fontSize: SMALL_TEXT_FONT,
    color: "gray",
  },
  iconContainer: {
    backgroundColor: DARK_COLOR,
    borderRadius: 5,
    padding: 5,
    position: "absolute",
    bottom: 10,
    right: 10,
  },
});

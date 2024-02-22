import { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import {
  DARK_COLOR,
  PRIMARY_COLOR,
  SMALL_TEXT_FONT,
  URL,
  WHITE_COLOR,
} from "../../configs/Config";
import DeleteAnimalVaccineModal from "../modals/DeleteAnimalVaccineModal";
import SubmitButton from "../../configs/SubmitButton";
import BackgroundImage from "../../configs/BackgroundImage";
import Loading from "../../configs/Loading";
import AnimalModal from "../modals/AnimalModal";

export default function CamelVaccine({ navigation }) {
  const [vaccine, setVaccine] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [itemId, setItemId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [animalModalVisible, setAnimalModalVisible] = useState(false);
  const [photoModal, setPhotoModal] = useState(null);
  const [descriptionModal, setDescriptionModal] = useState("");
  const type = "camel";

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const json = await AsyncStorage.getItem("camelVaccine");
        if (json) {
          const data = JSON.parse(json);
          setVaccine(data);
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
    const response = await axios.get(`${URL}/vaccine/${id}?type=${type}`);
    setVaccine(response.data.data);
    const json = await response.data.data;
    await AsyncStorage.setItem("camelVaccine", JSON.stringify(json));
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      setError(null);
      const isConnected = await checkInternetConnection();
      if (!isConnected) {
        setError("Интернэт холболтоо шалгана уу");
        return;
      }
      await axios.delete(`${URL}/vaccine/${itemId}`);
      const updatedVaccine = vaccine.filter((item) => item._id !== itemId);
      setVaccine(updatedVaccine);
      await AsyncStorage.setItem(
        "camelVaccine",
        JSON.stringify(updatedVaccine)
      );
      setModalVisible(false);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteIcon = (itemId) => {
    setModalVisible(true);
    setItemId(itemId);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleAddVaccine = () => {
    navigation.navigate("AddCamelVaccine");
  };

  const handleAnimal = (photo, description) => {
    setAnimalModalVisible(true);
    setPhotoModal(photo);
    setDescriptionModal(description);
  };

  const handleAnimalModalClose = () => {
    setAnimalModalVisible(false);
  };

  return (
    <BackgroundImage>
      {loading ? (
        <Loading />
      ) : (
        <View style={styles.container}>
          <FlatList
            style={styles.listContainer}
            data={vaccine}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleAnimal(item.photo, item.description)}
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
                  <Text
                    style={styles.text}
                  >{`Тайлбар: ${item.description}`}</Text>
                </View>
                <View style={styles.iconContainer}>
                  <TouchableOpacity
                    onPress={() => handleDeleteIcon(item._id)}
                    style={styles.iconContent}
                  >
                    <MaterialIcons
                      name="delete-forever"
                      size={20}
                      color={WHITE_COLOR}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
          />
          <AnimalModal
            isVisible={animalModalVisible}
            closeModal={handleAnimalModalClose}
            photo={photoModal}
            description={descriptionModal}
          />
          <DeleteAnimalVaccineModal
            isVisible={modalVisible}
            closeModal={handleModalClose}
            handleDelete={handleDelete}
            error={error}
          />
          <SubmitButton onPress={handleAddVaccine} text={"Вакцин нэмэх"} />
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
  },
  listItem: {
    backgroundColor: WHITE_COLOR,
    padding: 10,
    marginBottom: 5,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  imageContainer: {
    width: "20%",
    alignItems: "center",
    height: "auto",
    marginRight: 10,
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  textContainer: {
    width: "65%",
  },
  text: {
    fontSize: SMALL_TEXT_FONT,
    color: "black",
    marginVertical: 1,
  },
  iconContainer: {
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
  iconContent: {
    borderRadius: 5,
    padding: 5,
    backgroundColor: DARK_COLOR,
  },
});

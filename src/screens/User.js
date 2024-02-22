import { useCallback, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import NetInfo from "@react-native-community/netinfo";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { TITLE_FONT, URL, WHITE_COLOR } from "../configs/Config";
import MainButton from "../configs/MainButton";
import BackgroundImage from "../configs/BackgroundImage";
import SmallButton from "../configs/SmallButton";
import SubmitButton from "../configs/SubmitButton";

export default function User({ navigation }) {
  const [photo, setPhoto] = useState(null);
  const [surname, setSurname] = useState("");
  const [givenName, setGivenName] = useState("");
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const json = await AsyncStorage.getItem("data");
        if (json) {
          const data = JSON.parse(json);
          setPhoto(data?.photo || null);
          setSurname(data?.surname || "");
          setGivenName(data?.givenName || "");
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
    const response = await axios.get(`${URL}/user/${id}`);
    setPhoto(response.data.data?.photo || null);
    setSurname(response.data.data?.surname || "");
    setGivenName(response.data.data?.givenName || "");
    const json = await response.data.data;
    await AsyncStorage.setItem("data", JSON.stringify(json));
  };

  const pickImage = async (fromCamera = false) => {
    setIsModalVisible(false);
    let result;
    if (fromCamera) {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
    }
    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
      setShowSubmitButton(true);
    }
  };

  const handleAddPhoto = async () => {
    const uriParts = photo.split(".");
    const fileType = uriParts[uriParts.length - 1];
    const formData = new FormData();
    formData.append("photo", {
      uri: photo,
      type: `image/${fileType}`,
      name: `photo.${fileType}`,
    });
    const { _id: id } = JSON.parse(await AsyncStorage.getItem("data"));
    await axios.post(`${URL}/user/photo/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setShowSubmitButton(false);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleUserInfo = () => {
    navigation.navigate("UserInfo");
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("data");
    await AsyncStorage.removeItem("news");
    await AsyncStorage.removeItem("userNews");
    await AsyncStorage.removeItem("missing");
    await AsyncStorage.removeItem("userMissing");
    await AsyncStorage.removeItem("allCount");
    await AsyncStorage.removeItem("stallions");
    await AsyncStorage.removeItem("camelCount");
    await AsyncStorage.removeItem("femaleCamel");
    await AsyncStorage.removeItem("femaleCamelCount");
    await AsyncStorage.removeItem("maleCamel");
    await AsyncStorage.removeItem("maleCamelCount");
    await AsyncStorage.removeItem("removedCamel");
    await AsyncStorage.removeItem("removedCamelCount");
    await AsyncStorage.removeItem("camelVaccine");
    await AsyncStorage.removeItem("countData");
    await AsyncStorage.removeItem("cowCount");
    await AsyncStorage.removeItem("femaleCow");
    await AsyncStorage.removeItem("femaleCowCount");
    await AsyncStorage.removeItem("maleCow");
    await AsyncStorage.removeItem("maleCowCount");
    await AsyncStorage.removeItem("removedCow");
    await AsyncStorage.removeItem("removedCowCount");
    await AsyncStorage.removeItem("cowVaccine");
    await AsyncStorage.removeItem("goatCount");
    await AsyncStorage.removeItem("femaleGoat");
    await AsyncStorage.removeItem("femaleGoatCount");
    await AsyncStorage.removeItem("maleGoat");
    await AsyncStorage.removeItem("maleGoatCount");
    await AsyncStorage.removeItem("removedGoat");
    await AsyncStorage.removeItem("removedGoatCount");
    await AsyncStorage.removeItem("goatVaccine");
    await AsyncStorage.removeItem("horseCount");
    await AsyncStorage.removeItem("femaleHorse");
    await AsyncStorage.removeItem("femaleHorseCount");
    await AsyncStorage.removeItem("maleHorse");
    await AsyncStorage.removeItem("maleHorseCount");
    await AsyncStorage.removeItem("removedHorse");
    await AsyncStorage.removeItem("removedHorseCount");
    await AsyncStorage.removeItem("horseVaccine");
    await AsyncStorage.removeItem("stallion");
    await AsyncStorage.removeItem("stallionCount");
    await AsyncStorage.removeItem("herd");
    await AsyncStorage.removeItem("herdCount");
    await AsyncStorage.removeItem("chosenStallion");
    await AsyncStorage.removeItem("sheepCount");
    await AsyncStorage.removeItem("femaleSheep");
    await AsyncStorage.removeItem("femaleSheepCount");
    await AsyncStorage.removeItem("maleSheep");
    await AsyncStorage.removeItem("maleSheepCount");
    await AsyncStorage.removeItem("removedSheep");
    await AsyncStorage.removeItem("removedSheepCount");
    await AsyncStorage.removeItem("sheepVaccine");
    navigation.navigate("Login");
  };

  return (
    <BackgroundImage>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={toggleModal}>
          {photo ? (
            <Image source={{ uri: photo }} style={styles.image} />
          ) : (
            <FontAwesome name="user-o" size={24} color="black" />
          )}
        </TouchableOpacity>
        {showSubmitButton && (
          <SmallButton text={"Зураг хадгалах"} onPress={handleAddPhoto} />
        )}
        <Text style={styles.title}>{surname + " " + givenName}</Text>
        <MainButton onPress={handleUserInfo} text={"Хувийн мэдээлэл"} />
        <MainButton onPress={handleLogout} text={"Гарах"} />
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
                <TouchableOpacity
                  onPress={toggleModal}
                  style={styles.backButton}
                >
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
    </BackgroundImage>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    justifyContent: "center",
    borderWidth: 2,
    borderColor: WHITE_COLOR,
    backgroundColor: WHITE_COLOR,
    width: 150,
    height: 150,
    padding: 0,
    borderRadius: 100,
    alignItems: "center",
    margin: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  title: {
    fontSize: TITLE_FONT,
    fontWeight: "bold",
    marginBottom: 10,
    color: WHITE_COLOR,
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
  backButton: {
    width: 24,
    marginBottom: 10,
    marginLeft: 5,
    alignSelf: "flex-start",
  },
});

import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { Ionicons } from "@expo/vector-icons";

import { DARK_COLOR, TEXT_FONT, URL, WHITE_COLOR } from "../../configs/Config";
import Input from "../../configs/Input";
import ImageButton from "../../configs/ImageButton";
import SubmitButton from "../../configs/SubmitButton";
import BackgroundImage from "../../configs/BackgroundImage";
import ErrorText from "../../configs/ErrorText";
import Loading from "../../configs/Loading";

export default function AddHorse({ navigation }) {
  const [photo, setPhoto] = useState(null);
  const [sex, setSex] = useState("Эр");
  const [stallion, setStallion] = useState(false);
  const [age, setAge] = useState();
  const [appearance, setAppearance] = useState();
  const [seal, setSeal] = useState();
  const [explanation, setExplanation] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const type = "horse";

  useEffect(() => {
    const fetchData = async () => {
        const isConnected = await checkInternetConnection();
        if (!isConnected) {
          setError("Интернэт холболтоо шалгана уу");
          return;
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

  const handleAdd = async () => {
    try {
      setLoading(true);
      setError(null);
      const { _id: id } = JSON.parse(await AsyncStorage.getItem("data"));
      const uriParts = photo?.split(".") ?? [];
      const fileType =
        uriParts.length > 1 ? uriParts[uriParts.length - 1] : null;
      const formData = new FormData();
      formData.append("userId", id);
      formData.append("type", type);
      if (!photo) {
        setError("Зурагаа оруулна уу");
        return;
      }
      formData.append("photo", {
        uri: photo,
        type: `image/${fileType}`,
        name: `photo.${fileType}`,
      });
      if (!age || !appearance || !seal) {
        setError("Бүх хэсгийг бөглөнө үү");
        return;
      }
      formData.append("sex", sex);
      if (sex === "Эр") {
        formData.append("stallion", stallion);
      }
      formData.append("age", age);
      formData.append("appearance", appearance);
      formData.append("seal", seal);
      if (explanation) {
        formData.append("explanation", explanation);
      }
      await axios.post(`${URL}/animal`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigation.navigate("Horse");
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

  const setSexType = (type) => {
    setSex(type);
  };

  const setStallionData = (data) => {
    setStallion(data);
  };

  return (
    <BackgroundImage>
      {loading ? (
        <Loading />
      ) : (
        <View style={styles.container}>
          {error && <ErrorText error={error} />}
          <ImageButton
            text={"Зураг оруулах"}
            onPress={toggleModal}
            photo={photo}
          />
          <View style={styles.nasHuis}>
            <View style={styles.nasContainer}>
              <Text style={styles.nas}>Нас</Text>
              <TextInput
                style={styles.nasInput}
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
              />
            </View>
            <View>
              <Text style={styles.huis}>Хүйс</Text>
              <View style={styles.radioContainer}>
                <TouchableOpacity
                  style={[styles.radio, sex === "Эр" && styles.selectedRadio]}
                  onPress={() => setSexType("Эр")}
                >
                  <Text
                    style={
                      sex === "Эр"
                        ? styles.selectedRadioText
                        : styles.unselectedRadioText
                    }
                  >
                    Эр
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.radio, sex === "Эм" && styles.selectedRadio]}
                  onPress={() => setSexType("Эм")}
                >
                  <Text
                    style={
                      sex === "Эм"
                        ? styles.selectedRadioText
                        : styles.unselectedRadioText
                    }
                  >
                    Эм
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {sex === "Эр" && (
            <View style={styles.radioContainer}>
              <TouchableOpacity
                style={[
                  styles.radio,
                  stallion === true && styles.selectedRadio,
                ]}
                onPress={() => setStallionData(true)}
              >
                <Text
                  style={
                    stallion === true
                      ? styles.selectedRadioText
                      : styles.unselectedRadioText
                  }
                >
                  Азарга
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.radio,
                  stallion === false && styles.selectedRadio,
                ]}
                onPress={() => setStallionData(false)}
              >
                <Text
                  style={
                    stallion === false
                      ? styles.selectedRadioText
                      : styles.unselectedRadioText
                  }
                >
                  Морь
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <Input text={"Зүс"} value={appearance} onChangeText={setAppearance} />
          <Input text={"Им тамга"} value={seal} onChangeText={setSeal} />
          <Input
            text={"Нэмэлт тайлбар"}
            value={explanation}
            onChangeText={setExplanation}
          />
          <SubmitButton onPress={handleAdd} text={"Нэмэх"} />
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
  nasHuis: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  nasContainer: {
    marginHorizontal: 10,
  },
  nas: {
    fontSize: TEXT_FONT,
    fontWeight: "bold",
    marginBottom: 5,
    color: WHITE_COLOR,
  },
  nasInput: {
    backgroundColor: WHITE_COLOR,
    width: 60,
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 10,
    fontWeight: "bold",
  },
  huis: {
    fontSize: TEXT_FONT,
    fontWeight: "bold",
    marginBottom: 5,
    color: WHITE_COLOR,
  },
  radioContainer: {
    flexDirection: "row",
  },
  radio: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    backgroundColor: WHITE_COLOR,
  },
  selectedRadio: {
    backgroundColor: DARK_COLOR,
  },
  selectedRadioText: {
    color: WHITE_COLOR,
    fontWeight: "bold",
  },
  unselectedRadioText: {
    color: "black",
    fontWeight: "bold",
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

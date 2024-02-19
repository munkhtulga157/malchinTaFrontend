import { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { MaterialIcons } from "@expo/vector-icons";

import {
  DARK_COLOR,
  SMALL_TEXT_FONT,
  TITLE_FONT,
  URL,
  WHITE_COLOR,
} from "../../configs/Config";
import DeleteAnimalModal from "../modals/DeleteAnimalModal";
import BackgroundImage from "../../configs/BackgroundImage";
import Loading from "../../configs/Loading";
import AnimalModal from "../modals/AnimalModal";

export default function RemovedCamel() {
  const [animal, setAnimal] = useState([]);
  const [count, setCount] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [itemId, setItemId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [age, setAge] = useState("");
  const [appearance, setAppearance] = useState("");
  const [seal, setSeal] = useState("");
  const [animalModalVisible, setAnimalModalVisible] = useState(false);
  const [photoModal, setPhotoModal] = useState(null);
  const [ageModal, setAgeModal] = useState("");
  const [sexModal, setSexModal] = useState("");
  const [appearanceModal, setAppearanceModal] = useState("");
  const [sealModal, setSealModal] = useState("");
  const [explanationModal, setExplanationModal] = useState("");
  const [removalModal, setRemovalModal] = useState("");
  const type = "camel";

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          setLoading(true);

          const json = await AsyncStorage.getItem("removedCamel");

          if (json) {
            const data = JSON.parse(json);

            setAnimal(data);
          }

          const jsonCount = await AsyncStorage.getItem("removedCamelCount");

          if (jsonCount) {
            const data = JSON.parse(jsonCount);

            setCount(data);
          }

          const isConnected = await checkInternetConnection();
          if (isConnected) {
            await updateDataFromMongoDB();
          }
        } catch (error) {
        } finally {
          setLoading(false);
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
    try {
      setLoading(true);

      const { _id: id } = JSON.parse(await AsyncStorage.getItem("data"));
      const response = await axios.get(
        `${URL}/animal/removed/${id}?type=${type}`
      );

      setAnimal(response.data.data);
      setCount(response.data.count);

      const json = await response.data.data;
      const jsonCount = await response.data.count;

      await AsyncStorage.setItem("removedCamel", JSON.stringify(json));
      await AsyncStorage.setItem(
        "removedCamelCount",
        JSON.stringify(jsonCount)
      );
    } catch (error) {
    } finally {
      setLoading(false);
    }
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

      await axios.delete(`${URL}/animal/${itemId}`);

      const { _id: id } = JSON.parse(await AsyncStorage.getItem("data"));
      const response = await axios.get(
        `${URL}/animal/removed/${id}?type=${type}`
      );

      setAnimal(response.data.data);
      setCount(response.data.count);

      const json = await response.data.data;
      const jsonCount = await response.data.count;

      await AsyncStorage.setItem("removedCamel", JSON.stringify(json));
      await AsyncStorage.setItem(
        "removedCamelCount",
        JSON.stringify(jsonCount)
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

  const filterAnimal = () => {
    const lowerCaseAge = age.toLowerCase();
    const lowerCaseAppearance = appearance.toLowerCase();
    const lowerCaseSeal = seal.toLowerCase();

    return animal.filter((item) => {
      const ageMatch = item.age.toLowerCase().includes(lowerCaseAge);
      const appearanceMatch = item.appearance
        .toLowerCase()
        .includes(lowerCaseAppearance);
      const sealMatch = item.seal.toLowerCase().includes(lowerCaseSeal);

      return ageMatch && appearanceMatch && sealMatch;
    });
  };

  const handleAnimal = (
    photo,
    age,
    sex,
    appearance,
    seal,
    explanation,
    removal
  ) => {
    setAnimalModalVisible(true);
    setPhotoModal(photo);
    setAgeModal(age);
    setSexModal(sex);
    setAppearanceModal(appearance);
    setSealModal(seal);
    setExplanationModal(explanation);
    setRemovalModal(removal);
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
          <Text style={styles.title}>Тоо толгой: {count ? count : 0}</Text>

          <View style={styles.searchBarContainer}>
            <TextInput
              style={styles.searchBar}
              placeholder="Нас"
              onChangeText={(text) => setAge(text)}
              value={age}
            />
            <TextInput
              style={styles.searchBar}
              placeholder="Зүс"
              onChangeText={(text) => setAppearance(text)}
              value={appearance}
            />
            <TextInput
              style={styles.searchBar}
              placeholder="Им тэмдэг"
              onChangeText={(text) => setSeal(text)}
              value={seal}
            />
          </View>

          <FlatList
            style={styles.listContainer}
            data={filterAnimal()}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  handleAnimal(
                    item.photo,
                    item.age,
                    item.sex,
                    item.appearance,
                    item.seal,
                    item.explanation,
                    item.removal
                  )
                }
                style={styles.listItem}
              >
                <View style={styles.imageContainer}>
                  {item.photo ? (
                    <Image source={{ uri: item.photo }} style={styles.image} />
                  ) : (
                    <Image
                      style={styles.image}
                      source={require("../../../assets/camel.png")}
                    />
                  )}
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{`Нас: ${item.age}`}</Text>
                  <Text style={styles.text}>{`Хүйс: ${item.sex}`}</Text>
                  <Text style={styles.text}>{`Зүс: ${item.appearance}`}</Text>
                  <Text style={styles.text}>{`Им тэмдэг: ${item.seal}`}</Text>
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
            type={type}
            photo={photoModal}
            age={ageModal}
            sex={sexModal}
            appearance={appearanceModal}
            seal={sealModal}
            explanation={explanationModal}
            removal={removalModal}
          />

          <DeleteAnimalModal
            isVisible={modalVisible}
            closeModal={handleModalClose}
            handleDelete={handleDelete}
            error={error}
          />
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
    marginVertical: 5,
  },
  title: {
    fontSize: TITLE_FONT,
    fontWeight: "bold",
    marginBottom: 10,
    color: WHITE_COLOR,
  },
  searchBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 8,
    marginBottom: 5,
  },
  searchBar: {
    flex: 1,
    height: 40,
    marginHorizontal: 2,
    borderRadius: 10,
    backgroundColor: WHITE_COLOR,
    paddingHorizontal: 10,
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
    width: "21%",
    alignItems: "center",
    height: "auto",
    marginRight: 10,
  },
  image: {
    width: "100%",
    height: "100%",
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
    width: "14%",
    justifyContent: "center",
    alignItems: "center",
  },
  iconContent: {
    borderRadius: 5,
    padding: 5,
    backgroundColor: DARK_COLOR,
  },
});

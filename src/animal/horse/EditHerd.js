import { useEffect, useState } from "react";
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
import BackgroundImage from "../../configs/BackgroundImage";
import Loading from "../../configs/Loading";
import AnimalModal from "../modals/AnimalModal";
import SubmitButton from "../../configs/SubmitButton";
import ErrorText from "../../configs/ErrorText";

export default function EditHerd({ navigation }) {
  const [animal, setAnimal] = useState([]);
  const [count, setCount] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [age, setAge] = useState("");
  const [appearance, setAppearance] = useState("");
  const [seal, setSeal] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [animalModalVisible, setAnimalModalVisible] = useState(false);
  const [photoModal, setPhotoModal] = useState(null);
  const [ageModal, setAgeModal] = useState("");
  const [sexModal, setSexModal] = useState("");
  const [appearanceModal, setAppearanceModal] = useState("");
  const [sealModal, setSealModal] = useState("");
  const [explanationModal, setExplanationModal] = useState("");
  const type = "horse";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const isConnected = await checkInternetConnection();
        if (!isConnected) {
          setError("Интернэт холболтоо шалгана уу");
          return;
        }

        setLoading(true);

        const { _id: id } = JSON.parse(await AsyncStorage.getItem("data"));
        const response = await axios.get(`${URL}/animal/nonStallion/${id}`);

        setAnimal(response.data.data);
        setCount(response.data.count);
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

  const toggleSelectItem = (itemId) => {
    const selectedIndex = selectedItems.indexOf(itemId);
    if (selectedIndex > -1) {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((item) => item !== itemId)
      );
    } else {
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, itemId]);
    }
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

  const handleAnimal = (photo, age, sex, appearance, seal, explanation) => {
    setAnimalModalVisible(true);
    setPhotoModal(photo);
    setAgeModal(age);
    setSexModal(sex);
    setAppearanceModal(appearance);
    setSealModal(seal);
    setExplanationModal(explanation);
  };

  const handleAnimalModalClose = () => {
    setAnimalModalVisible(false);
  };

  const handleAdd = async () => {
    try {
      setLoading(true);
      setError(null);

      const stallionId = JSON.parse(
        await AsyncStorage.getItem("selectedStallion")
      );

      const otherIds = selectedItems.join(",");

      await axios.put(`${URL}/herd/add/${otherIds}?stallionId=${stallionId}`);

      await axios.put(`${URL}/animal/stallionId/${otherIds}`, {
        stallionId,
      });

      navigation.navigate("HerdList");
    } catch (error) {
      setError(error.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BackgroundImage>
      {loading ? (
        <Loading />
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>Тоо толгой: {count ? count : 0}</Text>

          {error && <ErrorText error={error} />}

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
              placeholder="Им тамга"
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
                    item.explanation
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
                      source={require("../../../assets/horse.png")}
                    />
                  )}
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{`Нас: ${item.age}`}</Text>
                  <Text style={styles.text}>{`Хүйс: ${item.sex}`}</Text>
                  <Text style={styles.text}>{`Зүс: ${item.appearance}`}</Text>
                  <Text style={styles.text}>{`Им тамга: ${item.seal}`}</Text>
                </View>
                <View style={styles.iconContainer}>
                  <TouchableOpacity
                    onPress={() => toggleSelectItem(item._id)}
                    style={styles.iconContent}
                  >
                    <MaterialIcons
                      name={
                        selectedItems.includes(item._id)
                          ? "check-box"
                          : "check-box-outline-blank"
                      }
                      size={20}
                      color={WHITE_COLOR}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
          />
          <SubmitButton onPress={handleAdd} text={"Адуу нэмэх"} />
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

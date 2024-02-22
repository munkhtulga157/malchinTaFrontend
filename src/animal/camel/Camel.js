import { useCallback, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

import { TITLE_FONT, URL, WHITE_COLOR } from "../../configs/Config";
import MainButton from "../../configs/MainButton";
import SubmitButton from "../../configs/SubmitButton";
import BackgroundImage from "../../configs/BackgroundImage";

export default function Camel({ navigation }) {
  const [count, setCount] = useState(null);
  const [maleCount, setMaleCount] = useState(null);
  const [femaleCount, setFemaleCount] = useState(null);
  const [removedCount, setRemovedCount] = useState(null);
  const type = "camel";

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const jsonCount = await AsyncStorage.getItem("camelCount");
        if (jsonCount) {
          const data = JSON.parse(jsonCount);
          setCount(data);
        }
        const jsonMaleCount = await AsyncStorage.getItem("maleCamelCount");
        if (jsonMaleCount) {
          const data = JSON.parse(jsonMaleCount);
          setMaleCount(data);
        }
        const jsonFemaleCount = await AsyncStorage.getItem("femaleCamelCount");
        if (jsonFemaleCount) {
          const data = JSON.parse(jsonFemaleCount);
          setFemaleCount(data);
        }
        const jsonRemovedCount = await AsyncStorage.getItem(
          "removedCamelCount"
        );
        if (jsonRemovedCount) {
          const data = JSON.parse(jsonRemovedCount);
          setRemovedCount(data);
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
    const response = await axios.get(`${URL}/animal/${id}?type=${type}`);
    setCount(response.data.count);
    const jsonCount = await response.data.count;
    await AsyncStorage.setItem("camelCount", JSON.stringify(jsonCount));
    const maleResponse = await axios.get(
      `${URL}/animal/male/${id}?type=${type}`
    );
    setMaleCount(maleResponse.data.count);
    const jsonMaleCount = await maleResponse.data.count;
    await AsyncStorage.setItem("maleCamelCount", JSON.stringify(jsonMaleCount));
    const femaleResponse = await axios.get(
      `${URL}/animal/female/${id}?type=${type}`
    );
    setFemaleCount(femaleResponse.data.count);
    const jsonFemaleCount = await femaleResponse.data.count;
    await AsyncStorage.setItem(
      "femaleCamelCount",
      JSON.stringify(jsonFemaleCount)
    );
    const removedResponse = await axios.get(
      `${URL}/animal/removed/${id}?type=${type}`
    );
    setRemovedCount(removedResponse.data.count);
    const jsonRemovedCount = await removedResponse.data.count;
    await AsyncStorage.setItem(
      "removedCamelCount",
      JSON.stringify(jsonRemovedCount)
    );
  };

  const handleMale = () => {
    navigation.navigate("MaleCamel");
  };

  const handleFemale = () => {
    navigation.navigate("FemaleCamel");
  };

  const handleRemoved = () => {
    navigation.navigate("RemovedCamel");
  };

  const handleAdd = () => {
    navigation.navigate("AddCamel");
  };

  const handleVaccine = () => {
    navigation.navigate("CamelVaccine");
  };

  return (
    <BackgroundImage>
      <View style={styles.container}>
        <Text style={styles.title}>Тоо толгой: {count ? count : 0}</Text>
        <MainButton
          onPress={handleMale}
          text={`Эр ${maleCount ? maleCount : 0}`}
        />
        <MainButton
          onPress={handleFemale}
          text={`Эм ${femaleCount ? femaleCount : 0}`}
        />
        <MainButton
          onPress={handleRemoved}
          text={`Хасалт хийгдсэн ${removedCount ? removedCount : 0}`}
        />
        <MainButton onPress={handleVaccine} text={"Вакцин"} />
        <SubmitButton onPress={handleAdd} text={"Тэмээ нэмэх"} />
      </View>
    </BackgroundImage>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
  },
  title: {
    fontSize: TITLE_FONT,
    fontWeight: "bold",
    marginBottom: 10,
    color: WHITE_COLOR,
  },
});

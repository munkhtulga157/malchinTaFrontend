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
import Loading from "../../configs/Loading";

export default function Cow({ navigation }) {
  const [count, setCount] = useState(null);
  const [maleCount, setMaleCount] = useState(null);
  const [femaleCount, setFemaleCount] = useState(null);
  const [removedCount, setRemovedCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const type = "cow";

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          setLoading(true);

          const jsonCount = await AsyncStorage.getItem("cowCount");

          if (jsonCount) {
            const data = JSON.parse(jsonCount);

            setCount(data);
          }

          const jsonMaleCount = await AsyncStorage.getItem("maleCowCount");

          if (jsonMaleCount) {
            const data = JSON.parse(jsonMaleCount);

            setMaleCount(data);
          }

          const jsonFemaleCount = await AsyncStorage.getItem("femaleCowCount");

          if (jsonFemaleCount) {
            const data = JSON.parse(jsonFemaleCount);

            setFemaleCount(data);
          }

          const jsonRemovedCount = await AsyncStorage.getItem(
            "removedCowCount"
          );

          if (jsonRemovedCount) {
            const data = JSON.parse(jsonRemovedCount);

            setRemovedCount(data);
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
      const response = await axios.get(`${URL}/animal/${id}?type=${type}`);

      setCount(response.data.count);

      const jsonCount = await response.data.count;

      await AsyncStorage.setItem("cowCount", JSON.stringify(jsonCount));

      const maleResponse = await axios.get(
        `${URL}/animal/male/${id}?type=${type}`
      );

      setMaleCount(maleResponse.data.count);

      const jsonMaleCount = await maleResponse.data.count;

      await AsyncStorage.setItem("maleCowCount", JSON.stringify(jsonMaleCount));

      const femaleResponse = await axios.get(
        `${URL}/animal/female/${id}?type=${type}`
      );

      setFemaleCount(femaleResponse.data.count);

      const jsonFemaleCount = await femaleResponse.data.count;

      await AsyncStorage.setItem(
        "femaleCowCount",
        JSON.stringify(jsonFemaleCount)
      );

      const removedResponse = await axios.get(
        `${URL}/animal/removed/${id}?type=${type}`
      );

      setRemovedCount(removedResponse.data.count);

      const jsonRemovedCount = await removedResponse.data.count;

      await AsyncStorage.setItem(
        "removedCowCount",
        JSON.stringify(jsonRemovedCount)
      );
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleMale = () => {
    navigation.navigate("MaleCow");
  };

  const handleFemale = () => {
    navigation.navigate("FemaleCow");
  };

  const handleRemoved = () => {
    navigation.navigate("RemovedCow");
  };

  const handleAdd = () => {
    navigation.navigate("AddCow");
  };

  const handleVaccine = () => {
    navigation.navigate("CowVaccine");
  };

  return (
    <BackgroundImage>
      {loading ? (
        <Loading />
      ) : (
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
          <SubmitButton onPress={handleAdd} text={"Үхэр нэмэх"} />
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
    marginVertical: 30,
  },
  title: {
    fontSize: TITLE_FONT,
    fontWeight: "bold",
    marginBottom: 10,
    color: WHITE_COLOR,
  },
});

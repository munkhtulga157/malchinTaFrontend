import { useCallback, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

import { BLACK_COLOR, URL, TITLE_FONT, WHITE_COLOR } from "../configs/Config";
import BackgroundImage from "../configs/BackgroundImage";
import Loading from "../configs/Loading";

export default function Animal({ navigation }) {
  const [allCount, setAllCount] = useState(null);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          setLoading(true);

          const jsonCount = await AsyncStorage.getItem("allCount");

          if (jsonCount) {
            const data = JSON.parse(jsonCount);

            setAllCount(data);
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
      const response = await axios.get(`${URL}/animal/all/${id}`);

      setAllCount(response.data.count);

      const jsonCount = await response.data.count;

      await AsyncStorage.setItem("allCount", JSON.stringify(jsonCount));
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const horse = () => {
    navigation.navigate("Horse");
  };

  const cow = () => {
    navigation.navigate("Cow");
  };

  const sheep = () => {
    navigation.navigate("Sheep");
  };

  const goat = () => {
    navigation.navigate("Goat");
  };

  const camel = () => {
    navigation.navigate("Camel");
  };

  const count = () => {
    navigation.navigate("Count");
  };

  const Button = ({ onPress, name, image }) => {
    return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{name}</Text>

        <Image
          style={styles.buttonImage}
          source={image}
          accessibilityLabel={name}
        />
      </TouchableOpacity>
    );
  };

  return (
    <BackgroundImage>
      {loading ? (
        <Loading />
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>
            Тоо толгой: {allCount ? allCount : 0}
          </Text>

          <Button
            onPress={horse}
            name={"Адуу"}
            image={require("../../assets/horse.png")}
          />

          <Button
            onPress={cow}
            name={"Үхэр"}
            image={require("../../assets/cow.png")}
          />

          <Button
            onPress={sheep}
            name={"Хонь"}
            image={require("../../assets/sheep.png")}
          />

          <Button
            onPress={goat}
            name={"Ямаа"}
            image={require("../../assets/goat.png")}
          />

          <Button
            onPress={camel}
            name={"Тэмээ"}
            image={require("../../assets/camel.png")}
          />

          <TouchableOpacity style={styles.button} onPress={count}>
            <Text style={styles.buttonText}>А данс</Text>
          </TouchableOpacity>
        </View>
      )}
    </BackgroundImage>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: TITLE_FONT,
    fontWeight: "bold",
    color: WHITE_COLOR,
  },
  button: {
    backgroundColor: WHITE_COLOR,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    marginVertical: 15,
    width: "65%",
  },
  buttonText: {
    fontSize: TITLE_FONT,
    color: BLACK_COLOR,
    fontWeight: "bold",
    marginRight: 20,
  },
  buttonImage: {
    width: 60,
    height: 50,
  },
});

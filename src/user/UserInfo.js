import { useCallback, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

import { BLACK_COLOR, TEXT_FONT, URL, WHITE_COLOR } from "../configs/Config";
import SubmitButton from "../configs/SubmitButton";
import BackgroundImage from "../configs/BackgroundImage";

export default function UserInfo({ navigation }) {
  const [surname, setSurname] = useState("");
  const [givenName, setGivenName] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [subdistrict, setSubdistrict] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const json = await AsyncStorage.getItem("data");
        if (json) {
          const data = JSON.parse(json);
          setSurname(data?.surname || "");
          setGivenName(data?.givenName || "");
          setProvince(data?.province || "");
          setDistrict(data?.district || "");
          setSubdistrict(data?.subdistrict || "");
          setPhoneNumber(data?.phoneNumber || "");
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
    setSurname(response.data.data?.surname || "");
    setGivenName(response.data.data?.givenName || "");
    setProvince(response.data.data?.province || "");
    setDistrict(response.data.data?.district || "");
    setSubdistrict(response.data.data?.subdistrict || "");
    setPhoneNumber(response.data.data?.phoneNumber || "");
    const json = await response.data.data;
    await AsyncStorage.setItem("data", JSON.stringify(json));
  };

  const handleEditInfo = () => {
    navigation.navigate("EditInfo");
  };

  const handleDeleteAccount = () => {
    navigation.navigate("DeleteAccount");
  };

  return (
    <BackgroundImage>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.info}>
            <Text style={styles.text}>Овог: {surname}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.text}>Нэр: {givenName}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.text}>Аймаг: {province}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.text}>Сум: {district}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.text}>Баг: {subdistrict}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.text}>Утас: {phoneNumber}</Text>
          </View>
          <SubmitButton onPress={handleEditInfo} text={"Мэдээлэл засах"} />
          <SubmitButton onPress={handleDeleteAccount} text={"Бүртгэл устгах"} />
        </View>
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
  content: {
    width: "65%",
    paddingVertical: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: WHITE_COLOR,
  },
  info: {
    flexDirection: "column",
    marginBottom: 15,
  },
  text: {
    fontSize: TEXT_FONT,
    fontWeight: "bold",
    color: BLACK_COLOR,
  },
});

import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

import { URL } from "../configs/Config";
import Input from "../configs/Input";
import SubmitButton from "../configs/SubmitButton";
import BackgroundImage from "../configs/BackgroundImage";
import ErrorText from "../configs/ErrorText";
import Loading from "../configs/Loading";

export default function EditInfo({ navigation }) {
  const [surname, setSurname] = useState("");
  const [givenName, setGivenName] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [subdistrict, setSubdistrict] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      const isConnected = await checkInternetConnection();
      if (!isConnected) {
        setError("Интернэт холболтоо шалгана уу");
        return;
      }
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

  const handleEditInfo = async () => {
    try {
      setLoading(true);
      setError(null);
      const isConnected = await checkInternetConnection();
      if (!isConnected) {
        setError("Интернэт холболтоо шалгана уу");
        return;
      }
      const { _id: id } = JSON.parse(await AsyncStorage.getItem("data"));
      const response = await axios.put(`${URL}/user/info/${id}`, {
        surname,
        givenName,
        province,
        district,
        subdistrict,
        phoneNumber,
      });
      const json = await response.data.data;
      await AsyncStorage.setItem("data", JSON.stringify(json));
      navigation.goBack();
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
          {error && <ErrorText error={error} />}
          <Input text={"Овог"} value={surname} onChangeText={setSurname} />
          <Input text={"Нэр"} value={givenName} onChangeText={setGivenName} />
          <Input text={"Аймаг"} value={province} onChangeText={setProvince} />
          <Input text={"Сум"} value={district} onChangeText={setDistrict} />
          <Input
            text={"Баг"}
            value={subdistrict}
            onChangeText={setSubdistrict}
          />
          <Input
            text={"Утасны дугаар"}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType={"numeric"}
          />
          <SubmitButton onPress={handleEditInfo} text={"Хадгалах"} />
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
});

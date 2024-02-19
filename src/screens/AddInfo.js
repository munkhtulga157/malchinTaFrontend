import { useState } from "react";
import { StyleSheet, View } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { URL } from "../configs/Config";
import SubmitButton from "../configs/SubmitButton";
import Input from "../configs/Input";
import BackgroundImage from "../configs/BackgroundImage";
import ErrorText from "../configs/ErrorText";
import Loading from "../configs/Loading";

export default function AddInfo({ navigation }) {
  const [surname, setSurname] = useState("");
  const [givenName, setGivenName] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [subdistrict, setSubdistrict] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    try {
      setLoading(true);
      setError(null);

      const id = await AsyncStorage.getItem("id");

      if (id) {
        await axios.put(`${URL}/user/info/${id}`, {
          surname,
          givenName,
          province,
          district,
          subdistrict,
          phoneNumber,
        });

        await AsyncStorage.removeItem("id");

        navigation.navigate("Login");
      }
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

          <SubmitButton text={"Бүртгүүлэх"} onPress={handleRegister} />
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

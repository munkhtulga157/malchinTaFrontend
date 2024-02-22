import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo } from "@expo/vector-icons";

import {
  DARK_COLOR,
  SMALL_TEXT_FONT,
  TEXT_FONT,
  TITLE_FONT,
  URL,
  WHITE_COLOR,
} from "../configs/Config";
import MyInput from "../configs/Input";
import MySubmitButton from "../configs/SubmitButton";
import BackgroundImage from "../configs/BackgroundImage";
import ErrorText from "../configs/ErrorText";
import Loading from "../configs/Loading";

export default function Register({ navigation }) {
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(`${URL}/user/register`, {
        registrationNumber,
        password,
      });
      const id = response.data.data._id;
      await AsyncStorage.setItem("id", id);
      navigation.navigate("AddInfo");
    } catch (error) {
      setError(error.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <BackgroundImage>
      {loading ? (
        <Loading />
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>Бүртгүүлэх</Text>
          {error && <ErrorText error={error} />}
          <MyInput
            text={"Регистрийн дугаар"}
            value={registrationNumber}
            onChangeText={setRegistrationNumber}
          />
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Нууц үг (6 оронтой)</Text>
            <View style={styles.input}>
              <TextInput
                style={styles.inputField}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                keyboardType="numeric"
              />
              <TouchableOpacity
                style={styles.passwordIcon}
                onPress={handleTogglePasswordVisibility}
              >
                <Entypo
                  name={showPassword ? "eye" : "eye-with-line"}
                  size={24}
                  color={DARK_COLOR}
                />
              </TouchableOpacity>
            </View>
          </View>
          <MySubmitButton text={"Бүртгүүлэх"} onPress={handleRegister} />
          <View style={styles.buttonContainer}>
            <Text style={styles.button}>Бүртгэлтэй юу?</Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.buttonText}>Нэвтрэх</Text>
            </TouchableOpacity>
          </View>
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
  title: {
    color: WHITE_COLOR,
    fontSize: TITLE_FONT,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "center",
  },
  inputContainer: {
    width: "65%",
    marginBottom: 10,
    alignSelf: "center",
  },
  inputText: {
    fontSize: TEXT_FONT,
    fontWeight: "bold",
    marginBottom: 5,
    color: WHITE_COLOR,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: WHITE_COLOR,
    borderRadius: 10,
  },
  inputField: {
    height: 40,
    width: "83%",
    paddingHorizontal: 10,
    fontWeight: "bold",
  },
  passwordIcon: {
    height: 40,
    width: "17%",
    color: DARK_COLOR,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  button: {
    fontSize: SMALL_TEXT_FONT,
    fontWeight: "bold",
    color: WHITE_COLOR,
  },
  buttonText: {
    backgroundColor: WHITE_COLOR,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
    color: DARK_COLOR,
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: SMALL_TEXT_FONT,
  },
});

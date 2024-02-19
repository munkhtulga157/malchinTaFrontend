import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import {
  DARK_COLOR,
  PRIMARY_COLOR,
  SMALL_TEXT_FONT,
  TEXT_FONT,
  TITLE_FONT,
  URL,
  WHITE_COLOR,
} from "../configs/Config";
import Input from "../configs/Input";
import SubmitButton from "../configs/SubmitButton";
import BackgroundImage from "../configs/BackgroundImage";
import ErrorText from "../configs/ErrorText";
import Loading from "../configs/Loading";

export default function Login({ navigation }) {
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const storedItem = await AsyncStorage.getItem("registrationNumber");

      if (storedItem) {
        setRegistrationNumber(storedItem);
      }
    };

    fetchData().finally(() => setLoading(false));
  }, []);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setRememberMe(!isChecked);
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(`${URL}/user/login`, {
        registrationNumber,
        password,
      });

      const token = await response.data.token;
      const json = await response.data.data;

      await AsyncStorage.setItem("token", JSON.stringify(token));
      await AsyncStorage.setItem("data", JSON.stringify(json));

      if (rememberMe === true) {
        await AsyncStorage.setItem("registrationNumber", registrationNumber);
      } else {
        await AsyncStorage.removeItem("registrationNumber");
      }

      navigation.navigate("Home");
    } catch (error) {
      setError(error.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <BackgroundImage>
      {loading ? (
        <Loading />
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>Нэвтрэх</Text>

          {error && <ErrorText error={error} />}

          <Input
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

          <TouchableOpacity
            onPress={handleCheckboxChange}
            style={styles.checkboxContainer}
          >
            <Text style={styles.label}>Регистрийн дугаар сануулах</Text>
            <View style={[styles.checkbox, isChecked && styles.checked]}>
              {isChecked && (
                <FontAwesome name="check" size={18} color={PRIMARY_COLOR} />
              )}
            </View>
          </TouchableOpacity>

          <SubmitButton
            style={styles.button}
            text={"Нэвтрэх"}
            onPress={handleLogin}
          />

          <View style={styles.buttonContainer}>
            <Text style={styles.button}>Бүртгэлгүй юу?</Text>
            <TouchableOpacity onPress={handleRegister}>
              <Text style={styles.buttonText}>Бүртгүүлэх</Text>
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
  checkboxContainer: {
    width: 250,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  checkbox: {
    width: 25,
    height: 25,
    borderRadius: 7,
    backgroundColor: WHITE_COLOR,
    justifyContent: "center",
    alignItems: "center",
  },
  checked: {
    backgroundColor: WHITE_COLOR,
  },
  label: {
    fontSize: SMALL_TEXT_FONT,
    fontWeight: "bold",
    color: WHITE_COLOR,
    marginRight: 10,
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

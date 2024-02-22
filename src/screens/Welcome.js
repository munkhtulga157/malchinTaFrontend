import { useEffect } from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import MainButton from "../configs/MainButton";
import BackgroundImage from "../configs/BackgroundImage";

const { width } = Dimensions.get("window");

export default function Welcome({ navigation }) {
  const imageSize = width * 0.7;

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      navigation.navigate("Home");
    }
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <BackgroundImage>
      <View style={styles.container}>
        <Image
          style={[styles.logo, { width: imageSize, height: imageSize }]}
          source={require("../../assets/malchinTaLogoWhite.png")}
        />
        <MainButton onPress={handleLogin} text={"Нэвтрэх"} />
        <MainButton onPress={handleRegister} text={"Бүртгүүлэх"} />
      </View>
    </BackgroundImage>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

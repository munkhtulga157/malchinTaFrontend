import { ImageBackground, StyleSheet } from "react-native";

export default function BackgroundImage({ children }) {
  return (
    <ImageBackground
      source={require("../../assets/grassBackground.png")}
      style={styles.image}
      resizeMode="cover"
    >
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

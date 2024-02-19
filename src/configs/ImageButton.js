import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import {
  BLACK_COLOR,
  PRIMARY_COLOR,
  SMALL_TEXT_FONT,
  TITLE_FONT,
  WHITE_COLOR,
} from "./Config";

export default function ImageButton({ text, onPress, photo }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      {photo ? (
        <Image source={{ uri: photo }} style={styles.image} />
      ) : (
        <View style={styles.container}>
          <FontAwesome name="photo" size={TITLE_FONT} color={PRIMARY_COLOR} />
          <Text style={styles.text}>{text}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    backgroundColor: WHITE_COLOR,
    padding: 0,
    width: 150,
    height: 150,
    borderRadius: 10,
    alignItems: "center",
    margin: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  container: {
    alignItems: "center",
  },
  text: {
    color: BLACK_COLOR,
    fontSize: SMALL_TEXT_FONT,
    fontWeight: "bold",
  },
});

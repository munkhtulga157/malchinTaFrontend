import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { BLACK_COLOR, TEXT_FONT, WHITE_COLOR } from "./Config";

export default function MainButton({ text, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: WHITE_COLOR,
    padding: 10,
    width: "65%",
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    margin: 10,
  },
  text: {
    color: BLACK_COLOR,
    fontSize: TEXT_FONT,
    fontWeight: "bold",
  },
});

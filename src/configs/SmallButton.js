import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { DARK_COLOR, SMALL_TEXT_FONT, WHITE_COLOR } from "./Config";

export default function SmallButton({ text, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: DARK_COLOR,
    padding: 10,
    width: 150,
    borderRadius: 10,
    alignItems: "center",
    margin: 10,
    alignSelf: "center",
  },
  text: {
    fontSize: SMALL_TEXT_FONT,
    fontWeight: "bold",
    color: WHITE_COLOR,
  },
});

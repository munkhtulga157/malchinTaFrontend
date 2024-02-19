import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { DARK_COLOR, SMALL_TEXT_FONT, WHITE_COLOR } from "./Config";

export default function SubmitButton({ text, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: DARK_COLOR,
    width: "65%",
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
    margin: 10,
    padding: 10,
  },
  text: {
    fontSize: SMALL_TEXT_FONT,
    fontWeight: "bold",
    color: WHITE_COLOR,
  },
});

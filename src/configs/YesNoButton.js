import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { DARK_COLOR, SMALL_TEXT_FONT, WHITE_COLOR } from "./Config";

export default function YesNoButton({
  onPressYes,
  yesText,
  onPressNo,
  noText,
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPressYes}>
        <Text style={styles.text}>{yesText}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPressNo}>
        <Text style={styles.text}>{noText}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: DARK_COLOR,
    padding: 10,
    width: "30%",
    borderRadius: 10,
    alignItems: "center",
    margin: 5,
  },
  text: {
    color: WHITE_COLOR,
    fontSize: SMALL_TEXT_FONT,
    fontWeight: "bold",
  },
});

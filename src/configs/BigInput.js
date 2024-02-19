import { StyleSheet, Text, TextInput, View } from "react-native";

import { TEXT_FONT, WHITE_COLOR } from "./Config";

export default function BigInput({ text, value, onChangeText }) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputText}>{text}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        multiline={true}
        numberOfLines={10}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: "65%",
    marginBottom: 10,
    alignSelf: "center",
  },
  inputText: {
    fontSize: TEXT_FONT,
    fontWeight: "bold",
    color: WHITE_COLOR,
    marginBottom: 5,
  },
  input: {
    backgroundColor: WHITE_COLOR,
    borderRadius: 15,
    height: 100,
    padding: 10,
    textAlignVertical: "top",
  },
});

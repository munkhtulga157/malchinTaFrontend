import { StyleSheet, Text, TextInput, View } from "react-native";

import { TEXT_FONT, WHITE_COLOR } from "./Config";

export default function Input({
  text,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "65%",
    marginBottom: 10,
    alignSelf: "center",
  },
  text: {
    fontSize: TEXT_FONT,
    fontWeight: "bold",
    marginBottom: 5,
    color: WHITE_COLOR,
  },
  input: {
    backgroundColor: WHITE_COLOR,
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 10,
    fontWeight: "bold",
  },
});

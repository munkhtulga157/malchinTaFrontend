import { StyleSheet, Text, View } from "react-native";

import { RED_COLOR } from "./Config";

export default function ErrorText({ error }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "65%",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#ffd8d8",
    alignSelf: "center",
    marginBottom: 5,
  },
  text: {
    color: RED_COLOR,
    fontWeight: "bold",
    textAlign: "center",
  },
});

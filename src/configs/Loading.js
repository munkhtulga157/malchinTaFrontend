import React from "react";
import { View, ActivityIndicator } from "react-native";
import { WHITE_COLOR } from "../configs/Config";

export default function Loading() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator
        size="large"
        color={WHITE_COLOR}
        style={styles.activityIndicator}
      />
    </View>
  );
}

const styles = {
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
};

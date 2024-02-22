import { Modal, View, Text, StyleSheet } from "react-native";

import { TEXT_FONT, WHITE_COLOR } from "../configs/Config";
import YesNoButton from "../configs/YesNoButton";

export default function DeleteNewsModal({
  isVisible,
  closeModal,
  handleDelete,
}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.text}>
            Мэдээллийг устгахдаа итгэлтэй байна уу
          </Text>
          <YesNoButton
            onPressYes={handleDelete}
            yesText={"Тийм"}
            onPressNo={closeModal}
            noText={"Үгүй"}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    width: "65%",
    backgroundColor: WHITE_COLOR,
    borderRadius: 10,
    paddingVertical: 30,
    alignItems: "center",
  },
  text: {
    fontSize: TEXT_FONT,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "center",
    textAlign: "center",
    width: "65%",
  },
});

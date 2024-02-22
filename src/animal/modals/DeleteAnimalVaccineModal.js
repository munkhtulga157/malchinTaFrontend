import { Modal, View, Text, StyleSheet } from "react-native";

import { TEXT_FONT, WHITE_COLOR } from "../../configs/Config";
import BackgroundImage from "../../configs/BackgroundImage";
import YesNoButton from "../../configs/YesNoButton";
import ErrorText from "../../configs/ErrorText";

export default function DeleteAnimalVaccineModal({
  isVisible,
  closeModal,
  error,
  handleDelete,
}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={closeModal}
    >
      <BackgroundImage>
        <View style={styles.container}>
          <View style={styles.content}>
            {error && <ErrorText error={error} />}
            <Text style={styles.text}>
              Та вакцигийг устгахдаа итгэлтэй байна уу?
            </Text>
            <YesNoButton
              onPressYes={handleDelete}
              yesText={"Тийм"}
              onPressNo={closeModal}
              noText={"Үгүй"}
            />
          </View>
        </View>
      </BackgroundImage>
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
    width: "70%",
    fontSize: TEXT_FONT,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
});

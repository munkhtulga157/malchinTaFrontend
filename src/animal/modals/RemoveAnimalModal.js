import { Modal, View, Text, StyleSheet, TextInput } from "react-native";

import { TEXT_FONT, WHITE_COLOR } from "../../configs/Config";
import BackgroundImage from "../../configs/BackgroundImage";
import YesNoButton from "../../configs/YesNoButton";
import ErrorText from "../../configs/ErrorText";

export default function RemoveAnimalModal({
  isVisible,
  closeModal,
  error,
  value,
  setValue,
  handleRemove,
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
            <Text style={styles.text}>Хасалт хийх шалтгаан</Text>
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={setValue}
              multiline={true}
              numberOfLines={10}
            />

            <YesNoButton
              onPressYes={handleRemove}
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
    fontSize: TEXT_FONT,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderColor: "lightgray",
    borderWidth: 2,
    borderRadius: 15,
    width: "80%",
    height: 100,
    padding: 10,
    textAlignVertical: "top",
    marginBottom: 10,
  },
});

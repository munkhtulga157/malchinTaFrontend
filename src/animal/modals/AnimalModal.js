import { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import { Ionicons } from "@expo/vector-icons";

import { TEXT_FONT, WHITE_COLOR } from "../../configs/Config";
import BackgroundImage from "../../configs/BackgroundImage";

const { width } = Dimensions.get("window");

export default function AnimalModal({
  isVisible,
  closeModal,
  type,
  photo,
  age,
  sex,
  appearance,
  seal,
  explanation,
  removal,
  description,
}) {
  const [isImageViewerVisible, setIsImageViewerVisible] = useState(false);

  const imageSize = width * 0.8;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={closeModal}
    >
      <BackgroundImage>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={styles.content}>
              <TouchableOpacity onPress={closeModal} style={styles.button}>
                <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
              {photo && (
                <TouchableOpacity
                  onPress={() => setIsImageViewerVisible(true)}
                  style={{ alignItems: "center" }}
                >
                  <Image
                    source={{ uri: photo }}
                    style={[styles.image, { height: imageSize }]}
                  />
                </TouchableOpacity>
              )}
              {age && <Text style={styles.text}>{`Нас: ${age}`}</Text>}
              {sex && <Text style={styles.text}>{`Хүйс: ${sex}`}</Text>}
              {appearance && (
                <Text style={styles.text}>{`Зүс: ${appearance}`}</Text>
              )}
              {seal &&
                (type === "horse" ? (
                  <Text style={styles.text}>{`Им тамга: ${seal}`}</Text>
                ) : (
                  <Text style={styles.text}>{`Им тэмдэг: ${seal}`}</Text>
                ))}
              {explanation && (
                <Text
                  style={styles.text}
                >{`Нэмэлт тайлбар: ${explanation}`}</Text>
              )}
              {removal && (
                <Text
                  style={styles.text}
                >{`Хасалт хийгдсэн шалтгаан: ${removal}`}</Text>
              )}
              {description && (
                <Text style={styles.text}>{`Тайлбар: ${description}`}</Text>
              )}
            </View>
          </ScrollView>
        </View>
      </BackgroundImage>

      <Modal visible={isImageViewerVisible} transparent={true}>
        <ImageViewer
          imageUrls={[{ url: photo }]}
          enableSwipeDown
          onSwipeDown={() => setIsImageViewerVisible(false)}
        />
      </Modal>
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
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    width: "100%",
  },
  content: {
    margin: 10,
    minWidth: "95%",
    backgroundColor: WHITE_COLOR,
    borderRadius: 10,
    padding: 20,
  },
  button: {
    width: 24,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    resizeMode: "contain",
    marginBottom: 20,
  },
  text: {
    fontSize: TEXT_FONT,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

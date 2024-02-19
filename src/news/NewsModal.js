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

import {
  GRAY_COLOR,
  SMALL_TEXT_FONT,
  TEXT_FONT,
  WHITE_COLOR,
} from "../configs/Config";
import BackgroundImage from "../configs/BackgroundImage";

const { width } = Dimensions.get("window");

export default function NewsModal({
  isVisible,
  closeModal,
  photo,
  title,
  description,
  date,
  surname,
  givenName,
}) {
  const [isImageViewerVisible, setIsImageViewerVisible] = useState(false);

  const imageSize = width * 0.8;

  const formatDate = (date) => {
    const year = new Date(date).getFullYear();
    const month = (new Date(date).getMonth() + 1).toString().padStart(2, "0");
    const day = new Date(date).getDate().toString().padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

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
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.description}>{description}</Text>
              <Text style={styles.date}>{formatDate(date)}</Text>
              <Text style={styles.author}>
                {surname || "Малчин"} {givenName || ""}
              </Text>
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
  title: {
    fontSize: TEXT_FONT,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: SMALL_TEXT_FONT,
    color: GRAY_COLOR,
    marginBottom: 10,
  },
  date: {
    fontSize: SMALL_TEXT_FONT,
    color: "gray",
  },
  author: {
    fontSize: SMALL_TEXT_FONT,
    color: "gray",
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});

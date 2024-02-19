import { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import NetInfo from "@react-native-community/netinfo";

import { BLACK_COLOR, TEXT_FONT, URL, WHITE_COLOR } from "../configs/Config";
import YesNoButton from "../configs/YesNoButton";
import BackgroundImage from "../configs/BackgroundImage";
import ErrorText from "../configs/ErrorText";
import Loading from "../configs/Loading";

export default function DeleteAccount({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkInternetConnection = async () => {
    try {
      const netInfoState = await NetInfo.fetch();

      return netInfoState.isConnected && netInfoState.isInternetReachable;
    } catch (error) {
      return false;
    }
  };

  const handleYes = async () => {
    try {
      setLoading(true);

      const isConnected = await checkInternetConnection();
      if (!isConnected) {
        setError("Интернэт холболтоо шалгана уу");
        return;
      }

      const { _id: id } = JSON.parse(await AsyncStorage.getItem("data"));
      await axios.delete(`${URL}/user/${id}`);

      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("data");

      await AsyncStorage.removeItem("news");
      await AsyncStorage.removeItem("userNews");

      await AsyncStorage.removeItem("missing");
      await AsyncStorage.removeItem("userMissing");

      await AsyncStorage.removeItem("allCount");
      await AsyncStorage.removeItem("stallions");

      await AsyncStorage.removeItem("camelCount");
      await AsyncStorage.removeItem("femaleCamel");
      await AsyncStorage.removeItem("femaleCamelCount");
      await AsyncStorage.removeItem("maleCamel");
      await AsyncStorage.removeItem("maleCamelCount");
      await AsyncStorage.removeItem("removedCamel");
      await AsyncStorage.removeItem("removedCamelCount");
      await AsyncStorage.removeItem("camelVaccine");

      await AsyncStorage.removeItem("countData");

      await AsyncStorage.removeItem("cowCount");
      await AsyncStorage.removeItem("femaleCow");
      await AsyncStorage.removeItem("femaleCowCount");
      await AsyncStorage.removeItem("maleCow");
      await AsyncStorage.removeItem("maleCowCount");
      await AsyncStorage.removeItem("removedCow");
      await AsyncStorage.removeItem("removedCowCount");
      await AsyncStorage.removeItem("cowVaccine");

      await AsyncStorage.removeItem("goatCount");
      await AsyncStorage.removeItem("femaleGoat");
      await AsyncStorage.removeItem("femaleGoatCount");
      await AsyncStorage.removeItem("maleGoat");
      await AsyncStorage.removeItem("maleGoatCount");
      await AsyncStorage.removeItem("removedGoat");
      await AsyncStorage.removeItem("removedGoatCount");
      await AsyncStorage.removeItem("goatVaccine");

      await AsyncStorage.removeItem("horseCount");
      await AsyncStorage.removeItem("femaleHorse");
      await AsyncStorage.removeItem("femaleHorseCount");
      await AsyncStorage.removeItem("maleHorse");
      await AsyncStorage.removeItem("maleHorseCount");
      await AsyncStorage.removeItem("removedHorse");
      await AsyncStorage.removeItem("removedHorseCount");
      await AsyncStorage.removeItem("horseVaccine");
      await AsyncStorage.removeItem("stallion");
      await AsyncStorage.removeItem("stallionCount");
      await AsyncStorage.removeItem("herd");
      await AsyncStorage.removeItem("herdCount");
      await AsyncStorage.removeItem("chosenStallion");

      await AsyncStorage.removeItem("sheepCount");
      await AsyncStorage.removeItem("femaleSheep");
      await AsyncStorage.removeItem("femaleSheepCount");
      await AsyncStorage.removeItem("maleSheep");
      await AsyncStorage.removeItem("maleSheepCount");
      await AsyncStorage.removeItem("removedSheep");
      await AsyncStorage.removeItem("removedSheepCount");
      await AsyncStorage.removeItem("sheepVaccine");

      navigation.navigate("Welcome");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleNo = () => {
    navigation.goBack();
  };

  return (
    <BackgroundImage>
      {loading ? (
        <Loading />
      ) : (
        <View style={styles.container}>
          <View style={styles.content}>
            {error && <ErrorText error={error} />}

            <Text style={styles.title}>
              Бүртгэлээ устгахдаа итгэлтэй байна уу?
            </Text>

            <YesNoButton
              onPressYes={handleYes}
              yesText={"Тийм"}
              onPressNo={handleNo}
              noText={"Үгүй"}
            />
          </View>
        </View>
      )}
    </BackgroundImage>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    backgroundColor: WHITE_COLOR,
    borderRadius: 10,
    width: "65%",
    paddingVertical: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    width: "70%",
    fontSize: TEXT_FONT,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "center",
    textAlign: "center",
    color: BLACK_COLOR,
  },
});

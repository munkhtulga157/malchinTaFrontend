import { Image, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import {
  BLACK_COLOR,
  DARK_COLOR,
  SMALL_TEXT_FONT,
  TITLE_FONT,
  WHITE_COLOR,
} from "../configs/Config";

import Animal from "./Animal";
import TopTabs from "./TopTabs";
import User from "./User";

const Tab = createBottomTabNavigator();

const LogoTitle = () => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image
        source={require("../../assets/logoGreen.png")}
        style={{ width: 90, height: 50 }}
      />
      <Text
        style={{
          color: BLACK_COLOR,
          marginLeft: 5,
          fontSize: TITLE_FONT,
          fontWeight: "bold",
        }}
      >
        МАЛЧИН ТА
      </Text>
    </View>
  );
};

export default function Home() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        headerTitle: () => <LogoTitle />,
        headerStyle: {
          backgroundColor: WHITE_COLOR,
        },
        tabBarActiveTintColor: DARK_COLOR,
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontSize: SMALL_TEXT_FONT,
          fontWeight: "bold",
        },
        tabBarStyle: {
          backgroundColor: WHITE_COLOR,
        },
      }}
    >
      <Tab.Screen
        name="Мал бүртгэл"
        component={Animal}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="horse-variant"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Мэдээлэл"
        component={TopTabs}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="forum" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Хэрэглэгч"
        component={User}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { DARK_COLOR, SMALL_TEXT_FONT, WHITE_COLOR } from "../configs/Config";

import News from "./News";
import Missing from "./Missing";

const Tab = createMaterialTopTabNavigator();

export default function TopTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: DARK_COLOR,
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontSize: SMALL_TEXT_FONT,
          fontWeight: "bold",
          textTransform: "none",
          width: 200,
        },
        tabBarStyle: {
          backgroundColor: WHITE_COLOR,
        },
      }}
    >
      <Tab.Screen name="Мэдээ, мэдээлэл" component={News} />
      <Tab.Screen name="Алдсан, олдсон малын зар" component={Missing} />
    </Tab.Navigator>
  );
}

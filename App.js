import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { WHITE_COLOR } from "./src/configs/Config";

import Welcome from "./src/screens/Welcome";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import AddInfo from "./src/screens/AddInfo";
import Home from "./src/screens/Home";
import Animal from "./src/screens/Animal";
import TopTabs from "./src/screens/TopTabs";
import News from "./src/screens/News";
import Missing from "./src/screens/Missing";
import User from "./src/screens/User";

import DeleteAccount from "./src/user/DeleteAccount";
import EditInfo from "./src/user/EditInfo";
import UserInfo from "./src/user/UserInfo";

import AddNews from "./src/news/AddNews";
import UserNews from "./src/news/UserNews";

import AddMissing from "./src/missing/AddMissing";
import UserMissing from "./src/missing/UserMissing";

import Camel from "./src/animal/camel/Camel";
import AddCamel from "./src/animal/camel/AddCamel";
import MaleCamel from "./src/animal/camel/MaleCamel";
import FemaleCamel from "./src/animal/camel/FemaleCamel";
import RemovedCamel from "./src/animal/camel/RemovedCamel";
import CamelVaccine from "./src/animal/camel/CamelVaccine";
import AddCamelVaccine from "./src/animal/camel/AddCamelVaccine";

import Cow from "./src/animal/cow/Cow";
import AddCow from "./src/animal/cow/AddCow";
import MaleCow from "./src/animal/cow/MaleCow";
import FemaleCow from "./src/animal/cow/FemaleCow";
import RemovedCow from "./src/animal/cow/RemovedCow";
import CowVaccine from "./src/animal/cow/CowVaccine";
import AddCowVaccine from "./src/animal/cow/AddCowVaccine";

import Goat from "./src/animal/goat/Goat";
import AddGoat from "./src/animal/goat/AddGoat";
import MaleGoat from "./src/animal/goat/MaleGoat";
import FemaleGoat from "./src/animal/goat/FemaleGoat";
import RemovedGoat from "./src/animal/goat/RemovedGoat";
import GoatVaccine from "./src/animal/goat/GoatVaccine";
import AddGoatVaccine from "./src/animal/goat/AddGoatVaccine";

import Horse from "./src/animal/horse/Horse";
import AddHorse from "./src/animal/horse/AddHorse";
import MaleHorse from "./src/animal/horse/MaleHorse";
import FemaleHorse from "./src/animal/horse/FemaleHorse";
import HorseHerd from "./src/animal/horse/HorseHerd";
import ChooseStallion from "./src/animal/horse/ChooseStallion";
import AddHerd from "./src/animal/horse/AddHerd";
import EditHerd from "./src/animal/horse/EditHerd";
import RemovedHorse from "./src/animal/horse/RemovedHorse";
import HorseVaccine from "./src/animal/horse/HorseVaccine";
import AddHorseVaccine from "./src/animal/horse/AddHorseVaccine";

import Sheep from "./src/animal/sheep/Sheep";
import AddSheep from "./src/animal/sheep/AddSheep";
import MaleSheep from "./src/animal/sheep/MaleSheep";
import FemaleSheep from "./src/animal/sheep/FemaleSheep";
import RemovedSheep from "./src/animal/sheep/RemovedSheep";
import SheepVaccine from "./src/animal/sheep/SheepVaccine";
import AddSheepVaccine from "./src/animal/sheep/AddSheepVaccine";

import Count from "./src/animal/count/Count";
import AddCountFront from "./src/animal/count/AddCountFront";
import AddCountBack from "./src/animal/count/AddCountBack";
import UpdateCountFront from "./src/animal/count/UpdateCountFront";
import UpdateCountBack from "./src/animal/count/UpdateCountBack";
import HerdList from "./src/animal/horse/HerdList";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: WHITE_COLOR,
          },
        }}
      >
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddInfo"
          component={AddInfo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Animal" component={Animal} />
        <Stack.Screen name="TopTabs" component={TopTabs} />
        <Stack.Screen name="News" component={News} />
        <Stack.Screen name="Missing" component={Missing} />
        <Stack.Screen name="User" component={User} />

        <Stack.Screen
          name="DeleteAccount"
          component={DeleteAccount}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EditInfo"
          component={EditInfo}
          options={{
            headerTitle: "Мэдээлэл засах",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="UserInfo"
          component={UserInfo}
          options={{
            headerTitle: "Хувийн мэдээлэл",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="AddNews"
          component={AddNews}
          options={{
            headerTitle: "Мэдээлэл нэмэх",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="UserNews"
          component={UserNews}
          options={{
            headerTitle: "Миний мэдээллүүд",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="AddMissing"
          component={AddMissing}
          options={{
            headerTitle: "Зар нэмэх",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="UserMissing"
          component={UserMissing}
          options={{
            headerTitle: "Миний зарууд",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="Camel"
          component={Camel}
          options={{
            headerTitle: "Тэмээ",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="AddCamel"
          component={AddCamel}
          options={{
            headerTitle: "Тэмээ нэмэх",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="MaleCamel"
          component={MaleCamel}
          options={{
            headerTitle: "Эр",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="FemaleCamel"
          component={FemaleCamel}
          options={{
            headerTitle: "Эм",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="RemovedCamel"
          component={RemovedCamel}
          options={{
            headerTitle: "Хасалт хийгдсэн",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="CamelVaccine"
          component={CamelVaccine}
          options={{
            headerTitle: "Вакцинууд",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="AddCamelVaccine"
          component={AddCamelVaccine}
          options={{
            headerTitle: "Вакцин нэмэх",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="Cow"
          component={Cow}
          options={{
            headerTitle: "Үхэр",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="AddCow"
          component={AddCow}
          options={{
            headerTitle: "Үхэр нэмэх",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="MaleCow"
          component={MaleCow}
          options={{
            headerTitle: "Эр",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="FemaleCow"
          component={FemaleCow}
          options={{
            headerTitle: "Эм",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="RemovedCow"
          component={RemovedCow}
          options={{
            headerTitle: "Хасалт хийгдсэн",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="CowVaccine"
          component={CowVaccine}
          options={{
            headerTitle: "Вакцинууд",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="AddCowVaccine"
          component={AddCowVaccine}
          options={{
            headerTitle: "Вакцин нэмэх",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="Goat"
          component={Goat}
          options={{
            headerTitle: "Ямаа",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="AddGoat"
          component={AddGoat}
          options={{
            headerTitle: "Ямаа нэмэх",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="MaleGoat"
          component={MaleGoat}
          options={{
            headerTitle: "Эр",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="FemaleGoat"
          component={FemaleGoat}
          options={{
            headerTitle: "Эм",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="RemovedGoat"
          component={RemovedGoat}
          options={{
            headerTitle: "Хасалт хийгдсэн",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="GoatVaccine"
          component={GoatVaccine}
          options={{
            headerTitle: "Вакцинууд",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="AddGoatVaccine"
          component={AddGoatVaccine}
          options={{
            headerTitle: "Вакцин нэмэх",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="Horse"
          component={Horse}
          options={{
            headerTitle: "Адуу",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="AddHorse"
          component={AddHorse}
          options={{
            headerTitle: "Адуу нэмэх",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="MaleHorse"
          component={MaleHorse}
          options={{
            headerTitle: "Эр",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="FemaleHorse"
          component={FemaleHorse}
          options={{
            headerTitle: "Эм",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="HorseHerd"
          component={HorseHerd}
          options={{
            headerTitle: "Сүргийн азарганууд",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="HerdList"
          component={HerdList}
          options={{
            headerTitle: "Cүргийн адуунууд",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="ChooseStallion"
          component={ChooseStallion}
          options={{
            headerTitle: "Сүргийн азарга сонгох",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="AddHerd"
          component={AddHerd}
          options={{
            headerTitle: "Сүрэгт адуу нэмэх",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="EditHerd"
          component={EditHerd}
          options={{
            headerTitle: "Сүрэгт адуу нэмэх",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="RemovedHorse"
          component={RemovedHorse}
          options={{
            headerTitle: "Хасалт хийгдсэн",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="HorseVaccine"
          component={HorseVaccine}
          options={{
            headerTitle: "Вакцинууд",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="AddHorseVaccine"
          component={AddHorseVaccine}
          options={{
            headerTitle: "Вакцин нэмэх",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="Sheep"
          component={Sheep}
          options={{
            headerTitle: "Хонь",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="AddSheep"
          component={AddSheep}
          options={{
            headerTitle: "Хонь нэмэх",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="MaleSheep"
          component={MaleSheep}
          options={{
            headerTitle: "Эр",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="FemaleSheep"
          component={FemaleSheep}
          options={{
            headerTitle: "Эм",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="RemovedSheep"
          component={RemovedSheep}
          options={{
            headerTitle: "Хасалт хийгдсэн",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="SheepVaccine"
          component={SheepVaccine}
          options={{
            headerTitle: "Вакцинууд",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="AddSheepVaccine"
          component={AddSheepVaccine}
          options={{
            headerTitle: "Вакцин нэмэх",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="Count"
          component={Count}
          options={{
            headerTitle: "А данс",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="AddCountFront"
          component={AddCountFront}
          options={{
            headerTitle: "А данс оруулах",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="AddCountBack"
          component={AddCountBack}
          options={{
            headerTitle: "А данс оруулах",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="UpdateCountFront"
          component={UpdateCountFront}
          options={{
            headerTitle: "А данс шинэчлэх",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="UpdateCountBack"
          component={UpdateCountBack}
          options={{
            headerTitle: "А данс шинэчлэх",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

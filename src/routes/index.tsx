import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../pages/home";
import Detail from "../pages/detail";
import Favorites from "../pages/favorites";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type StackParamList = {
  Home: undefined;
  Detail: undefined;
  Favorites: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

export function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Favorites"
        component={Favorites}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

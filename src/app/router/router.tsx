import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ImageDetailsScreen } from "../../ui/ImageDetailScreen/ImageDetailsScreen";
import { MainScreen } from "../../ui/MainScreen/MainScreen";


export function Router() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="MainScreen" screenOptions={{headerShown: false}} >
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="ImageDetailScreen" component={ImageDetailsScreen} />
    </Stack.Navigator>
  )
};
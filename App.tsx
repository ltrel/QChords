import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CameraScreen from "./src/CameraScreen";
import EditorScreen from "./src/EditorScreen";
import ExportScreen from "./src/ExportScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Editor">
        <Stack.Screen name="Export" component={ExportScreen} />
        <Stack.Screen name="Editor" component={EditorScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

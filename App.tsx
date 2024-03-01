import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import ImportScreen from "./src/Components/ImportScreen";
import EditorScreen from "./src/Components/EditorScreen";
import ExportScreen from "./src/Components/ExportScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <StatusBar style="auto"/>
      <Stack.Navigator initialRouteName="Editor">
        <Stack.Screen name="Export" component={ExportScreen} />
        <Stack.Screen name="Editor" component={EditorScreen} />
        <Stack.Screen name="Import" component={ImportScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

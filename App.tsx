import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraScreen from './CameraScreen';
import EditorScreen from './EditorScreen';
import ExportScreen from './ExportScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Camera'>
        <Stack.Screen name="Export" component={ExportScreen} />
        <Stack.Screen name="Editor" component={EditorScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

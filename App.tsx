import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import ChordChart from './ChordChart';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ChordChart/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 80,
    marginHorizontal: 4,
  },
  text: {
    fontSize: 12
  }
});

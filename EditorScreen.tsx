import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useCameraPermission } from 'react-native-vision-camera'
import ChordChart from './ChordChart';
import { jsonToBin } from 'tiny-chords/dist/nowasm';
import { TextButton } from './Button';
import { Chord } from './Chord';
import { Note } from './Chord';
import { collapseFromMeasures } from './Serialization';

const initialMeasures: Chord[][] = Array(1).fill([
  new Chord(Note.fromStr("C"), "min7"),
  new Chord(Note.fromStr("F"),  "dom7"),
  new Chord(Note.fromStr("Bb"), "maj7"),
  new Chord(Note.fromStr("G"), "dom7"),
]);

export default function EditorScreen({ navigation }) {
  const [text, setText] = useState('');
  //useEffect(() => {
  //  async function f() {
  //    const val = await jsonToBin('{"beatsPerBar":4,"beatType":"quarter","bpm":120,"chords":[{"root":"C#","chordType":"min9","beats":3,"bass":"E"},{"root":"F#","chordType":"dom7","beats":4},{"root":"B","chordType":"maj7","beats":4}]}')
  //    setText(val.toString())
  //  }
  //  f();
  //}, [])
  async function f() {
    const val = await jsonToBin('{"beatsPerBar":4,"beatType":"quarter","bpm":120,"chords":[{"root":"C#","chordType":"min9","beats":3,"bass":"E"},{"root":"F#","chordType":"dom7","beats":4},{"root":"B","chordType":"maj7","beats":4}]}')
    setText(val.toString())
  }

  const [measures, setMeasures] = useState(initialMeasures)
  function updateChord(measureIndex, beatIndex, newChord = null) {
    setMeasures((prev) => {
      const newMeasures = [...prev];
      newMeasures[measureIndex][beatIndex] = newChord;
      return newMeasures;
    });
  }
  function addBar() {
    setMeasures((prev) => [...prev, Array(4).fill(null)]);
  }
  function removeBar() {
    setMeasures((prev) => prev.slice(0, prev.length - 1));
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <View style={{flex: 1, marginHorizontal: 4, justifyContent: 'center'}}>
          {measures.length
          ? <ChordChart measures={measures} onUpdateChord={updateChord}/>
          : <Text style={{textAlign: 'center'}}>Press 'Add bar' to get started</Text>}
        </View>
        <View style={{flexDirection: 'row', borderTopWidth: 1, padding: 8, gap: 8}}>
          <Text>{text}</Text>
          <TextButton title='Add bar' onPress={addBar}/>
          <TextButton title='Remove bar' onPress={removeBar}/>
          <TextButton title='Export' onPress={() => navigation.navigate('Export', {serializedChart: collapseFromMeasures(measures, 4)})}/>
          <TextButton title='Clear' onPress={() => setText('')}/>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
  },
  text: {
    fontSize: 12
  }
});

import { Modal, View } from 'react-native';
import Measure from './Measure';
import { Chord, Note } from './Chord';
import { useState } from 'react';
import ChordPicker from './ChordPicker';

const initialMeasures: Chord[][] = [
  [
    new Chord(Note.fromStr("C"), "min7"),
    new Chord(Note.fromStr("F"),  "dom7"),
    new Chord(Note.fromStr("Bb"), "maj7"),
    new Chord(Note.fromStr("G"), "dom7"),
  ],
  [
    new Chord(Note.fromStr("A"), "min7"),
    new Chord(Note.fromStr("D"),  "dom7"),
    new Chord(Note.fromStr("G"), "maj7"),
    null
  ]
]

export default function ChordChart() {
  const [measures, setMeasures] = useState(initialMeasures);
  const [selectedPos, setSelectedPos] = useState<[number, number]>(null);

  function logChord(measureIndex, beatIndex) {
    console.log(measures[measureIndex][beatIndex]) 
    setSelectedPos([measureIndex, beatIndex])
  }

  return (
    <>
      <View style={{display: "flex", flexDirection: "row", flexWrap: "wrap", alignSelf: 'stretch', rowGap: 10}}>
        {measures.map((measure, i) => {
          return <Measure key={i} chords={measure} onTouch={(beatIndex) => logChord(i, beatIndex)}/>
        })}
      </View>
      <Modal
        animationType='fade'
        visible={!!selectedPos}
        transparent
        onRequestClose={() => setSelectedPos(null)}
        statusBarTranslucent
      >
        {selectedPos && <ChordPicker
          onCancel={() => setSelectedPos(null)}   
          onClear={() => setSelectedPos(null)}   
          onSet={() => setSelectedPos(null)}   
          current={measures[selectedPos[0]][selectedPos[1]]}
        />}
      </Modal>
    </>
  )
}

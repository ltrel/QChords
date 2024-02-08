import { View, StyleSheet, Pressable, Platform } from "react-native";
import { TextButton, SvgButton } from "./Button";
import { useState } from "react";
import NaturalSign from "./assets/NaturalSign.svg"
import Sharp from "./assets/Sharp.svg"
import Flat from "./assets/Flat.svg"
import { Chord } from "./Chord";

const chordTypes = [
  "maj",
  "min",
  "maj7",
  "min7",
  "dom7",
  // other triads
  "dim",
  "aug",
  // other sevenths
  "dim7",
  "min7b5",
  "maj7#5",
  "aug7",
  "minmaj7",
  // sus
  "sus4",
  "sus2",
  // sixths
  "maj6",
  "min6",
  "maj69",
  "min69",
  // ninths
  "maj9",
  "min9",
  "dom9",
  // extended
  "min11",
  "maj7#11",
  "dom13",
  "alt",
  // add9
  "majadd9",
  "minadd9",
]

const accidentals = ['b', 'n', '#']

export interface ChordPickerProps {
  onCancel: () => void;
  onClear: () => void;
  onSet: () => void;
  current: Chord;
}
export default function ChordPicker({onCancel, onClear, onSet, current}: ChordPickerProps) {

  const [accidentalIndex, setAccidentalIndex] = useState(current.root.accidentalIndex);
  const [letterIndex, setLetterIndex] = useState(current.root.letterIndex);
  const [chordTypeIndex, setChordTypeIndex] = useState(chordTypes.indexOf(current.chordType));


  function renderAccidentalSvg(accidentalStr, color)
  {
    const commonProps = {width: 40, height: 40, fill: color}
    switch (accidentalStr) {
      case 'b':
        return <Flat viewBox="0 0 4 13" {...commonProps}/>
      case 'n':
        return <NaturalSign viewBox="0 0 27 108" {...commonProps}/>
      case '#':
        return <Sharp viewBox="0 0 6 19" {...commonProps}/>
    }
  }

  return (
    <Pressable style={[styles.backdrop, styles.noHover]} onPress={() => onCancel()}>
      <Pressable style={[styles.dialog, styles.noHover]}>
        <View style={{flexDirection: 'row', gap: 5}}>
          {accidentals.map((accidental, index) => {
            return (
              <SvgButton
                key={index}
                invert={index == accidentalIndex}
                pressableStyle={{flexGrow: 1}}
                onPress={() => setAccidentalIndex(index)}
                svg={renderAccidentalSvg(accidental, index == accidentalIndex ? 'white' : 'black')}
              />
            )
          })}
        </View>
        <View style={{flexDirection: 'row', gap: 1}}>
          {[..."ABCDEFG"].map((letter, index) => {
            return (
              <TextButton
                key={letter}
                title={letter}
                pressableStyle={{borderRadius: 0, flexGrow: 1}}
                invert={index == letterIndex}
                onPress={() => setLetterIndex(index)}
              />
            )
          })} 
        </View>
        <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 1}}>
          {chordTypes.map((chord, index) => {
            return (
              <TextButton
                key={chord}
                title={chord}
                pressableStyle={{borderRadius: 0, flexGrow: index == chordTypes.length - 1 ? 0 : 1}}
                invert={index == chordTypeIndex}
                onPress={() => setChordTypeIndex(index)}
              />
            )
          })}
        </View>
        <View style={{flexDirection: 'row', gap: 5}}>
          <TextButton title="Cancel" onPress={onCancel} pressableStyle={{flexGrow: 1}}/>
          <TextButton title="Clear" onPress={onClear} pressableStyle={{flexGrow: 1}}/>
          <TextButton title="Ok" onPress={onSet} pressableStyle={{flexGrow: 1}}/>
        </View>
      </Pressable>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  noHover: {
    display: 'flex',
    ...Platform.select({
      web: {
        cursor: 'default',
      }
    })
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 4,
    gap: 10,
    marginLeft: 20,
    marginRight: 20,
    maxWidth: 400,
  }
})

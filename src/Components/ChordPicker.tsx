import { View } from "react-native";
import { TextButton, SvgButton } from "./Button";
import { useState } from "react";
import NaturalSign from "../../assets/NaturalSign.svg";
import Sharp from "../../assets/Sharp.svg";
import Flat from "../../assets/Flat.svg";
import { Chord, Note, chordTypes } from "../Data/Chord";
import Dialog from "./Dialog";

const accidentalDimensions = {
  width: 40,
  height: 40,
};
const accidentals = [
  {
    Svg: Flat,
    svgProps: {
      ...accidentalDimensions,
      viewBox: "0 0 4 13",
    },
  },
  {
    Svg: NaturalSign,
    svgProps: {
      ...accidentalDimensions,
      viewBox: "0 0 27 108",
    },
  },
  {
    Svg: Sharp,
    svgProps: {
      ...accidentalDimensions,
      viewBox: "0 0 6 19",
    },
  },
];

export interface ChordPickerProps {
  onCancel: () => void;
  onClear: () => void;
  onSet: (Chord) => void;
  initialChord: Chord;
}
export default function ChordPicker({
  onCancel,
  onClear,
  onSet,
  initialChord,
}: ChordPickerProps) {
  const initialState = (() => {
    if (initialChord) {
      return {
        accidentalIndex: initialChord.root.accidentalIndex,
        letterIndex: initialChord.root.letterIndex,
        chordTypeIndex: chordTypes.indexOf(initialChord.chordType),
      };
    }
    return {
      accidentalIndex: 1,
      letterIndex: 0,
      chordTypeIndex: 0,
    };
  })();

  const [accidentalIndex, setAccidentalIndex] = useState(
    initialState.accidentalIndex,
  );
  const [letterIndex, setLetterIndex] = useState(initialState.letterIndex);
  const [chordTypeIndex, setChordTypeIndex] = useState(
    initialState.chordTypeIndex,
  );

  function handleSet() {
    const root = new Note(letterIndex, accidentalIndex);
    const chord = new Chord(root, chordTypes[chordTypeIndex]);
    onSet(chord);
  }

  return (
    <Dialog onPressOutside={onCancel}>
      <View style={{ flexDirection: "row", gap: 5 }}>
        {accidentals.map((accidental, index) => {
          return (
            <SvgButton
              key={index}
              active={index == accidentalIndex}
              pressableStyle={{ flexGrow: 1 }}
              onPress={() => setAccidentalIndex(index)}
              Svg={accidental.Svg}
              svgProps={accidental.svgProps}
            />
          );
        })}
      </View>
      <View style={{ flexDirection: "row", gap: 1 }}>
        {[..."ABCDEFG"].map((letter, index) => {
          return (
            <TextButton
              key={letter}
              title={letter}
              pressableStyle={{ borderRadius: 0, flexGrow: 1 }}
              active={index == letterIndex}
              onPress={() => setLetterIndex(index)}
            />
          );
        })}
      </View>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 1 }}>
        {chordTypes.map((chord, index) => {
          return (
            <TextButton
              key={chord}
              title={chord}
              pressableStyle={{
                borderRadius: 0,
                flexGrow: index == chordTypes.length - 1 ? 0 : 1,
              }}
              active={index == chordTypeIndex}
              onPress={() => setChordTypeIndex(index)}
            />
          );
        })}
      </View>
      <View style={{ flexDirection: "row", gap: 5 }}>
        <TextButton
          title="Cancel"
          onPress={onCancel}
          pressableStyle={{ flexGrow: 1 }}
        />
        <TextButton
          title="Clear"
          onPress={onClear}
          pressableStyle={{ flexGrow: 1 }}
        />
        <TextButton
          title="Ok"
          onPress={handleSet}
          pressableStyle={{ flexGrow: 1 }}
        />
      </View>
    </Dialog>
  );
}

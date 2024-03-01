import {
  View,
  Text,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import ChordSymbol from "./ChordSymbol";
import { Chord } from "../Data/Chord";

export interface MeasureProps {
  chords: Chord[];
  highlightBeat?: number;
  onTouch?: (beatIndex) => void;
}
export default function Measure({
  chords,
  highlightBeat = -1,
  onTouch,
}: MeasureProps) {
  function createBeatStyle(active, pressed): StyleProp<ViewStyle> {
    return {
      display: "flex",
      minWidth: 35,
      flexGrow: 1,
      backgroundColor: active || pressed ? "#dddddd" : undefined,
    };
  }

  const beats = chords.map((chord, i) => {
    return (
      <Pressable
        key={i}
        style={({ pressed }) => createBeatStyle(i === highlightBeat, pressed)}
        onPress={() => onTouch(i)}
      >
        <ChordSymbol chord={chord} />
        <Text style={{ fontSize: 32, marginTop: -10 }}>𝄍</Text>
      </Pressable>
    );
  });

  return <View style={styles.measureContainer}>{beats}</View>;
}

const styles = StyleSheet.create({
  measureContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 7,
    flexGrow: 1,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    marginLeft: -1,
    marginRight: -1,
    paddingHorizontal: 2,
  },
});

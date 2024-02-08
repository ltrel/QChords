import { View, Text, Pressable, StyleSheet } from "react-native";
import ChordSymbol from "./ChordSymbol";
import { Chord } from "./Chord";

export interface MeasureProps {
  chords: Chord[];
  onTouch?: (beatIndex) => void;
}
export default function Measure({ chords, onTouch }: MeasureProps) {
  const beats = chords.map((chord, i) => {
    return (
      <Pressable key={i} style={{display: "flex", minWidth: 35, flexGrow: 1}} onPress={() => onTouch(i)}>
        <ChordSymbol chord={chord}/>
        <Text style={{fontSize: 32, marginTop: -10}}>𝄍</Text>
      </Pressable>
    );
  })

  return <View style={styles.measureContainer}>{beats}</View>
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
    paddingHorizontal: 2
  }
})
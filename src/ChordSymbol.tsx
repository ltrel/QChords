import { View, Text } from "react-native";
import { Chord } from "./Chord";

export interface ChordSymbolProps {
  chord?: Chord
}
export default function ChordSymbol({chord}: ChordSymbolProps)
{
  const bigText = {fontSize: 32}
  const smallText = {fontSize: bigText.fontSize / 2}
  if (chord)
  {
    const letter = chord.root.printLetter();
    const accidental = chord.root.printAccidental();
    return (
      <View style={{flexDirection: "row", alignItems: "center"}}>
        <Text style={bigText}>{letter}</Text>
        <View>
          <Text style={smallText}>{accidental}</Text>
          <Text style={[smallText, {marginTop: -5}]}>{chord.renderChordType()}</Text>
        </View>
      </View>
    )
  }
  return <Text style={bigText}> </Text>
}


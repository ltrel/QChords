import { Modal, View, ScrollView } from "react-native";
import Measure from "./Measure";
import { Chord } from "./Chord";
import { useState } from "react";
import ChordPicker from "./ChordPicker";

export interface ChordChartProps {
  measures: Chord[][];
  onUpdateChord: (
    measureIndex: number,
    beatIndex: number,
    newChord: Chord,
  ) => void;
}
export default function ChordChart({
  measures,
  onUpdateChord,
}: ChordChartProps) {
  const [selectedPos, setSelectedPos] = useState<[number, number]>(null);

  function logChord(measureIndex, beatIndex) {
    console.log(measures[measureIndex][beatIndex]);
    setSelectedPos([measureIndex, beatIndex]);
  }

  return (
    <>
      <ScrollView>
        {/* Need padding to stop the negative margins coming out of the measures being cut off */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignSelf: "stretch",
            rowGap: 10,
            marginTop: 4,
            paddingHorizontal: 1,
          }}
        >
          {measures.map((measure, i) => {
            return (
              // Removing this seemingly pointless View causes the height of the ChordChart to double
              <View style={{ flexGrow: 1 }} key={i}>
                <Measure
                  chords={measure}
                  onTouch={(beatIndex) => logChord(i, beatIndex)}
                  highlightBeat={
                    selectedPos && i === selectedPos[0]
                      ? selectedPos[1]
                      : undefined
                  }
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
      <Modal
        animationType="fade"
        visible={!!selectedPos}
        transparent
        onRequestClose={() => setSelectedPos(null)}
        statusBarTranslucent
      >
        {selectedPos && (
          <ChordPicker
            onCancel={() => setSelectedPos(null)}
            onClear={() => {
              onUpdateChord(selectedPos[0], selectedPos[1], null);
              setSelectedPos(null);
            }}
            onSet={(newChord) => {
              onUpdateChord(selectedPos[0], selectedPos[1], newChord);
              setSelectedPos(null);
            }}
            initialChord={measures[selectedPos[0]][selectedPos[1]]}
          />
        )}
      </Modal>
    </>
  );
}

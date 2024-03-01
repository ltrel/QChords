import { StyleSheet, View, Text, Modal } from "react-native";
import ChordChart from "./ChordChart";
import { TextButton } from "./Button";
import { collapseFromMeasures } from "./Serialization";
import { useEditorStore } from "./EditorStore";
import SongSettings from "./SongSettings";
import { useState } from "react";

export default function EditorScreen({ navigation }) {
  const state = useEditorStore();
  const [showSongSettings, setShowSongSettings] = useState(false);

  return (
    <View style={styles.container}>
      <View
        style={{ flex: 1, marginHorizontal: 4, justifyContent: "center" }}
      >
        {state.measures.length ? (
          <ChordChart
            measures={state.measures}
            onUpdateChord={state.updateChord}
          />
        ) : (
          <Text style={{ textAlign: "center" }}>
            Press 'Add bar' to get started
          </Text>
        )}
      </View>
      <View
        style={{
          flexDirection: "column",
          borderTopWidth: 1,
          padding: 8,
          gap: 8,
        }}
      >
        <View style={{flexDirection: "row", gap: 8}}>
          <TextButton pressableStyle={styles.toolbarItem} title="Add bar" onPress={state.addMeasure} />
          <TextButton pressableStyle={styles.toolbarItem} title="Remove bar" onPress={state.removeMeasure} />
        </View>
        <View style={{flexDirection: "row", gap: 8}}>
          <TextButton
            pressableStyle={styles.toolbarItem}
            title="Export"
            onPress={() =>
              navigation.navigate("Export", {
                serializedChart: collapseFromMeasures(state.measures, state.beatsPerBar),
              })
            }
          />
          <TextButton
            pressableStyle={styles.toolbarItem}
            title="Import"
            onPress={() => navigation.navigate("Import")}
          />
          <TextButton
            pressableStyle={styles.toolbarItem}
            title="Song settings"
            onPress={() => setShowSongSettings(true)}
          />
        </View>
      </View>
      <Modal
        animationType="fade"
        visible={showSongSettings}
        transparent
        onRequestClose={() => setShowSongSettings(false)}
        statusBarTranslucent
      >
        <SongSettings
          initialBeatsPerBar={state.beatsPerBar}
          onCancel={() => setShowSongSettings(false)}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
  },
  text: {
    fontSize: 12,
  },
  toolbarItem: {
    flexGrow: 1,
    flex: 1,
  }
});

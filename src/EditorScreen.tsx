import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import ChordChart from "./ChordChart";
import { TextButton } from "./Button";
import { collapseFromMeasures } from "./Serialization";
import { useEditorStore } from "./EditorStore";

export default function EditorScreen({ navigation }) {
  const state = useEditorStore();

  return (
    <View style={styles.container}>
      <View
        style={{ flex: 1, marginHorizontal: 4, justifyContent: "center" }}
      >
        {state.measures.length ? (
          <ChordChart
            measures={state.measures}
            onUpdateChord={state.update}
          />
        ) : (
          <Text style={{ textAlign: "center" }}>
            Press 'Add bar' to get started
          </Text>
        )}
      </View>
      <View
        style={{
          flexDirection: "row",
          borderTopWidth: 1,
          padding: 8,
          gap: 8,
        }}
      >
        <TextButton pressableStyle={styles.toolbarItem} title="Add bar" onPress={state.addMeasure} />
        <TextButton pressableStyle={styles.toolbarItem} title="Remove bar" onPress={state.removeMeasure} />
        <TextButton
          pressableStyle={styles.toolbarItem}
          title="Export"
          onPress={() =>
            navigation.navigate("Export", {
              serializedChart: collapseFromMeasures(state.measures, 4),
            })
          }
        />
        <TextButton
          pressableStyle={styles.toolbarItem}
          title="Import"
          onPress={() => navigation.navigate("Import")}
        />
      </View>
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

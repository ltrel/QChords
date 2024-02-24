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
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
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
          <TextButton title="Add bar" onPress={state.addMeasure} />
          <TextButton title="Remove bar" onPress={state.removeMeasure} />
          <TextButton
            title="Export"
            onPress={() =>
              navigation.navigate("Export", {
                serializedChart: collapseFromMeasures(state.measures, 4),
              })
            }
          />
          <TextButton
            title="Import"
            onPress={() => navigation.navigate("Camera")}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
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
});

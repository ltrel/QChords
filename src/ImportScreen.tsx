import { View, Text } from "react-native";
import { useCameraPermission } from "react-native-vision-camera";
import { binToJson } from "tiny-chords/dist/nowasm";
import { expand } from "./Serialization";
import { useEditorStore } from "./EditorStore";
import CodeScanner from "./CodeScanner";

function renderError(errorStr: string) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{errorStr}</Text>
    </View>
  );
}
export default function ImportScreen({ navigation }) {
  const loadChart = useEditorStore((state) => state.loadChart);

  const { hasPermission, requestPermission } = useCameraPermission();

  const handleCodeScanned = async (result: number[]) => {
    const chart = await binToJson(new Uint8Array(result));
    const measures = expand(chart);
    loadChart(measures);
    navigation.navigate("Editor");
  };

  if (!hasPermission) {
    requestPermission();
    return renderError("Enable camera permissions to continue");
  }

  return (
    <View style={{ flex: 1 }}>
      <CodeScanner onCodeScanned={handleCodeScanned} />
    </View>
  );
}

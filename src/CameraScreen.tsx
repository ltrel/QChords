import { View, Text, StyleSheet, Button } from "react-native";
import {
  Camera,
  runAsync,
  runAtTargetFps,
  useCameraDevice,
  useCameraFormat,
  useCameraPermission,
  useFrameProcessor,
} from "react-native-vision-camera";
import { useIsFocused } from "@react-navigation/native";
import { Worklets } from "react-native-worklets-core";
import { scanCodes } from "react-native-vision-camera-binary-scanner";
import { binToJson } from "tiny-chords/dist/nowasm";
import { expand } from "./Serialization";
import { useEditorStore } from "./EditorStore";

function renderError(errorStr: string) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{errorStr}</Text>
    </View>
  );
}
export default function CameraScreen({ navigation }) {
  const loadChart = useEditorStore((state) => state.loadChart);
  const isFocused = useIsFocused();

  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice("back");

  const codeScannedCallback = Worklets.createRunInJsFn(
    async (result: number[]) => {
      const chart = await binToJson(new Uint8Array(result));
      const measures = expand(chart);
      loadChart(measures);
      navigation.navigate("Editor");
    },
  );

  const frameProcessor = useFrameProcessor(
    (frame) => {
      "worklet";

      runAtTargetFps(1, () => {
        "worklet";
        if (frame.isValid) {
          const buf = scanCodes(frame);
          console.log(buf);
          if (buf) codeScannedCallback(buf);
        }
      });
    },
    [codeScannedCallback],
  );

  if (!hasPermission || !requestPermission()) {
    return renderError("Enable camera permissions to continue");
  }
  if (device == null) return renderError("No camera device");

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flexGrow: 1 }}
        device={device}
        isActive={isFocused}
        pixelFormat="yuv"
        frameProcessor={frameProcessor}
      />
    </View>
  );
}

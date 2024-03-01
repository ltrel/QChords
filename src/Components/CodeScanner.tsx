import {
  Camera,
  useCameraDevice,
  useFrameProcessor,
  runAtTargetFps,
} from "react-native-vision-camera";
import { scanCodes } from "react-native-vision-camera-binary-scanner";
import { useIsFocused } from "@react-navigation/native";
import { Text } from "react-native";
import { Worklets } from "react-native-worklets-core";

export interface CodeScannerProps {
  onCodeScanned: (result: number[]) => void;
}
export default function CodeScanner({ onCodeScanned }: CodeScannerProps) {
  const device = useCameraDevice("back");
  const isFocused = useIsFocused();

  const callbackWorklet = Worklets.createRunInJsFn(onCodeScanned);

  const frameProcessor = useFrameProcessor(
    (frame) => {
      "worklet";

      runAtTargetFps(1, () => {
        "worklet";
        if (frame.isValid) {
          const buf = scanCodes(frame);
          console.log(buf);
          if (buf) callbackWorklet(buf);
        }
      });
    },
    [callbackWorklet],
  );

  if (device == null) return <Text>No camera available</Text>;
  return (
    <Camera
      style={{ flexGrow: 1 }}
      device={device}
      isActive={isFocused}
      pixelFormat="yuv"
      frameProcessor={frameProcessor}
    />
  );
}

// import { NativeModules, Platform } from 'react-native';
import { VisionCameraProxy, type Frame } from "react-native-vision-camera";

// const LINKING_ERROR =
//   `The package 'react-native-vision-camera-binary-scanner' doesn't seem to be linked. Make sure: \n\n` +
//   Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
//   '- You rebuilt the app after installing the package\n' +
//   '- You are not using Expo Go\n';
//
// const VisionCameraBinaryScanner = NativeModules.VisionCameraBinaryScanner
//   ? NativeModules.VisionCameraBinaryScanner
//   : new Proxy(
//       {},
//       {
//         get() {
//           throw new Error(LINKING_ERROR);
//         },
//       }
//     );
//
// export function multiply(a: number, b: number): Promise<number> {
//   return VisionCameraBinaryScanner.multiply(a, b);
// }

const plugin = VisionCameraProxy.initFrameProcessorPlugin("scanCodes");

export function scanCodes(frame: Frame) {
  "worklet";
  if (plugin == null)
    throw new Error('Failed to load Frame Processor Plugin "scanCodes"!');
  return plugin.call(frame) as number[] | null;
}

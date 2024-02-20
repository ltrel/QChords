import { View, Text, StyleSheet } from "react-native";
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner, useFrameProcessor } from "react-native-vision-camera";
import {useAppState} from '@react-native-community/hooks'
import { useIsFocused } from "@react-navigation/native";
import jsQR from "jsqr";
import { Worklets } from "react-native-worklets-core";

function renderError(errorStr: string) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>{errorStr}</Text>
    </View>
  )
}
export default function CameraScreen() {
  const appState = useAppState();
  const isFocused = useIsFocused();
  const isActive = isFocused && appState == 'active';

  // const { hasPermission, requestPermission } = useCameraPermission(); 
  // if (!hasPermission || !requestPermission()) {
  //   return renderError("Enable camera permissions to continue");
  // }
  const device = useCameraDevice('back');
  // if (device == null) return renderError('No camera device');
  
  const wrapper = Worklets.createRunInJsFn((buffer: Uint8ClampedArray, width: number, height: number) => {
    try {
      const res = jsQR(buffer, width, height).binaryData
      if (res) console.log(res)
    }
    catch {
      console.log("read fail")
    }
  });

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet'
    if (frame.pixelFormat === 'yuv' && frame.isValid) {
      console.log(frame.toString())
      const data = frame.toArrayBuffer()
      console.log(`Pixel at 0,0: YUV(${data[0]}, ${data[1]}, ${data[2]})`)
    }
  }, [])

  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
      pixelFormat="yuv"
      frameProcessor={frameProcessor}
    />
  )
}

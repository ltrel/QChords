import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import QRCode from 'react-native-qrcode-svg';
import { jsonToBin } from "tiny-chords/dist/nowasm";

export default function ExportScreen({ route }) {
  const { serializedChart } = route.params;
  const [binaryData, setBinaryData] = useState(null);
  useEffect(() => {
    async function f() {
      const res = await jsonToBin(JSON.stringify(serializedChart));
      setBinaryData(res);
    }
    f();
  })

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
      {/* @ts-ignore*/}
      {binaryData ? <QRCode size={300} value={[{data: binaryData, mode: 'byte'}]}/> : <Text>Loading...</Text>}
    </View>
  )
}

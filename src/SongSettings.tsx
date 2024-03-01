import { View, Text } from "react-native";
import Dialog from "./Dialog";
import { TextButton } from "./Button";
import { useState } from "react";
import { useEditorStore } from "./EditorStore";

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max)
}
function clampTimeSig(val) {
  return clamp(val, 1, 16);
}

export interface SongSettingsProps {
  initialBeatsPerBar: number;
  onCancel: () => void;
}
export default function SongSettings({initialBeatsPerBar, onCancel}: SongSettingsProps) {
  const updateTimeSig = useEditorStore((state) => state.updateTimeSig);
  const [beatsPerBar, setBeatsPerBar] = useState(initialBeatsPerBar);

  function handleSave() {
    updateTimeSig(beatsPerBar);
    onCancel();
  }

  return (
    <Dialog onPressOutside={onCancel}>
      <View style={{flexDirection: "row", alignItems: "center", width: 300, gap: 4}}>
        <Text>
          Time signature: <Text style={{fontWeight: "bold"}}>{beatsPerBar}</Text> beats per bar
        </Text>
        <TextButton
          pressableStyle={{marginLeft: "auto", width: 35}}
          title="&ndash;"
          onPress={() => setBeatsPerBar(prev => clampTimeSig(prev - 1))}
        />
        <TextButton
          pressableStyle={{width: 35}}
          title="+"
          onPress={() => setBeatsPerBar(prev => clampTimeSig(prev + 1))}
        />
      </View>
      <View style={{flexDirection: "row", gap: 8}}>
        <TextButton pressableStyle={{flex: 1}} title="Cancel" onPress={onCancel}/>
        <TextButton pressableStyle={{flex: 1}} title="Save" onPress={handleSave}/>
      </View>
    </Dialog>
  )
}

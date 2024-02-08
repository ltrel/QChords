import { Pressable, Text, StyleSheet, ViewStyle, StyleProp, TextStyle } from "react-native";

export interface TextButtonProps {
  onPress?: () => void;
  title?: string;
  invert?: boolean;
  pressableStyle?: StyleProp<ViewStyle>,
  textStyle?: StyleProp<TextStyle>,
}
export function TextButton({onPress, title, invert, pressableStyle, textStyle}: TextButtonProps) {
  const mergedPressableStyle: StyleProp<ViewStyle> = [
    styles.buttonPressable,
    invert ? {backgroundColor: 'black'} : {},
    pressableStyle,
  ]
  const mergedTextStyle: StyleProp<TextStyle> = [
    invert ? {color: 'white'} : {},
    textStyle,
  ]
  return (
    <Pressable onPress={onPress} style={mergedPressableStyle}>
      <Text style={mergedTextStyle}>{title}</Text>
    </Pressable>
  )
}

export interface SvgButtonProps {
  onPress?: () => void;
  svg?: any;
  invert?: boolean;
  pressableStyle?: StyleProp<ViewStyle>,
  textStyle?: StyleProp<TextStyle>,
}
export function SvgButton({onPress, svg,  invert,  pressableStyle }: SvgButtonProps)
{
  const mergedPressableStyle: StyleProp<ViewStyle> = [
    styles.buttonPressable,
    invert ? {backgroundColor: 'black'} : {},
    pressableStyle,
  ]
  return (
   <Pressable onPress={onPress} style={mergedPressableStyle}>
    {svg}
   </Pressable> 
  )
}

const styles = StyleSheet.create({
  buttonPressable: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  }
})

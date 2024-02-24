import React from "react";
import { Pressable, Text, StyleSheet, ViewStyle, StyleProp, TextStyle, View } from "react-native";
import { SvgProps } from "react-native-svg";

function mergePressableStyles(active: boolean, pressed: boolean, overrides: StyleProp<ViewStyle>): StyleProp<ViewStyle> {
  if (active) {
    return [styles.buttonPressable, {backgroundColor: 'black'}, overrides]
  }
  else if (pressed) {
    return [styles.buttonPressable, {backgroundColor: '#e6e6e6'}, overrides]
  }
  else {
    return [styles.buttonPressable, overrides]
  }
}

export interface TextButtonProps {
  onPress?: () => void;
  title?: string;
  active?: boolean;
  pressableStyle?: StyleProp<ViewStyle>,
  textStyle?: StyleProp<TextStyle>,
}
export function TextButton({onPress, title, active, pressableStyle, textStyle}: TextButtonProps) {
  const mergedTextStyle: StyleProp<TextStyle> = [
    active ? {color: 'white'} : {},
    textStyle,
  ]

  return (
    <Pressable onPress={onPress} style={({pressed}) => mergePressableStyles(active, pressed, pressableStyle)}>
      <Text style={mergedTextStyle}>{title}</Text>
    </Pressable>
  )
}

export interface SvgButtonProps {
  onPress?: () => void;
  Svg?: React.FC<SvgProps>;
  svgProps?: SvgProps;
  active?: boolean;
  pressableStyle?: StyleProp<ViewStyle>,
  textStyle?: StyleProp<TextStyle>,
}
export function SvgButton({onPress, Svg, svgProps, active, pressableStyle}: SvgButtonProps)
{
  return (
   <Pressable onPress={onPress} style={({pressed}) => mergePressableStyles(active, pressed, pressableStyle)}>
    <Svg fill={active ? 'white' : 'black'} {...svgProps}/>
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

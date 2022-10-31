import React from "react";
import { View } from "react-native";
import { TagModule, TagProps, useTags } from "./tags";
import { textPattern, useTagStyle } from "./utils";

export const Div = ({style, children, ...rest}:TagProps) => {

  const { tagStyle } = useTags();
  const divTagStyle = tagStyle?.['div'];

  const [
    textStyle, 
    viewStyle
  ]
  = useTagStyle([
    textPattern
  ], [divTagStyle, style]);
  
  return (
    <View style={viewStyle} {...rest}>
      <TagModule style={textStyle}>{children}</TagModule>
    </View>
  )
}
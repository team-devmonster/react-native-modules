import React from "react";
import { View } from "react-native";
import { TagModule, TagProps, useTags } from "./tags";
import { textPattern, useTagStyle } from "./utils";

export const P = ({style, children, ...rest}:TagProps) => {

  const { tagConfig } = useTags();
  const divTagStyle = tagConfig?.['div'];
  const pTagStyle = tagConfig?.['p'];

  const [
    textStyle, 
    viewStyle
  ]
  = useTagStyle([
    textPattern
  ], [divTagStyle, pTagStyle, style]);
  
  return (
    <View style={viewStyle} {...rest}>
      <TagModule style={textStyle}>{children}</TagModule>
    </View>
  )
}
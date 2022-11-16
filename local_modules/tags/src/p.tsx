import React from "react";
import { View } from "react-native";
import { TagModule, textPattern, useTags, useTagStyle } from "./core";
import { TagProps } from "./type";

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
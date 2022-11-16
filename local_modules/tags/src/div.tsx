import React from "react";
import { View } from "react-native";
import { gapPattern, TagModule, textPattern, useTags, useTagStyle } from "./core";
import { TagProps } from "./type";

export const Div = ({style, children, ...rest}:TagProps) => {

  const { tagConfig } = useTags();
  const divTagStyle = tagConfig?.div;

  const [
    textStyle,
    gapStyle, 
    viewStyle
  ]
  = useTagStyle([
    textPattern,
    gapPattern
  ], [divTagStyle, style]);
  
  const gap = gapStyle?.gap;
  return (
    <View style={{
      ...viewStyle,
      ...(gap ? {margin: -gap/2} : null)
    }} {...rest}>
      <TagModule 
        style={{
        ...textStyle,
        ...(gap ? {margin: gap/2} : null)
      }}>{children}</TagModule>
    </View>
  )
}
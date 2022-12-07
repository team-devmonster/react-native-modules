import React from "react";
import { Text, TextStyle } from "react-native";
import { useTags, useTagStyle } from "./core";
import { TagProps } from "./type";

export const Span = ({style, children, ...rest}:TagProps) => {

  const { tagConfig } = useTags();
  const divTagStyle = tagConfig?.div;
  const spanTagStyle = tagConfig?.span;

  const [
    newStyle
  ]
  = useTagStyle(
    [], 
    [divTagStyle, spanTagStyle, style]);
  
  return (
    <Text style={newStyle as TextStyle} {...rest}>{children}</Text>
  )
}
Span.displayName = 'Span';
import React, { useEffect, useState } from "react";
import { TextProps, Text, TextStyle } from "react-native";
import { useTags } from "./tags";
// import { textPattern } from "./utils";

export const Span = ({style, children, ...rest}:TextProps) => {

  const { tagStyle } = useTags();
  const divTagStyle = tagStyle?.['div'];
  const spanTagStyle = tagStyle?.['span'];

  const [newStyle, setNewStyle] = useState<TextStyle>();

  useEffect(() => {
    setNewStyle({
      ...style as TextStyle
    });
  }, [divTagStyle, spanTagStyle, style]);
  
  return (
    <Text style={newStyle as TextStyle} {...rest}>{children}</Text>
  )
}
import React from "react";
import { Text } from "react-native";
import { useTags } from "./core";
import { TagProps } from "./type";
import { createStyle } from "./createStyle";

export const Span = ({style, children, ...rest}:TagProps) => {

  const { tagConfig } = useTags();
  const divTagStyle = tagConfig?.div?.style;
  const spanTagStyle = tagConfig?.span?.style;

  const { newStyle } = createStyle({
    newStyle: {
      ...divTagStyle, 
      ...spanTagStyle, 
      ...style
    }
  }, [divTagStyle, spanTagStyle, style]);
  
  return (
    <Text style={newStyle} {...rest}>{children}</Text>
  )
}
Span.displayName = 'Span';
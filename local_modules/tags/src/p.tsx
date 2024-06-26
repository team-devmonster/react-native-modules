import React, { forwardRef, LegacyRef } from "react";
import { View } from "react-native";
import { useTags } from "./core";
import { Div } from "./div";
import { TagProps } from "./type";
import { useCreateStyle } from "./useCreateStyle";

export const P = forwardRef(({style, ...rest}:TagProps, ref:LegacyRef<View>) => {

  const { tagConfig } = useTags();
  const tagStyle = tagConfig?.p?.style;

  const { newStyle } = useCreateStyle({
    newStyle: { 
      ...tagStyle,  
      ...style 
    }
  }, [tagStyle, style]);
  
  return <Div ref={ref as any} style={newStyle} {...rest}></Div>;
})
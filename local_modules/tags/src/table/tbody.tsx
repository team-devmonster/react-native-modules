import React, { LegacyRef, forwardRef } from "react";
import { useTags } from "../core";
import { Div } from "../div";
import { TagProps } from "../type";
import { View } from "react-native";
import { useCreateStyle } from "../useCreateStyle";

export const Tbody = forwardRef(({style, ...rest}:TagProps, ref:LegacyRef<View>) => {

  const { tagConfig } = useTags();
  const tagStyle = tagConfig?.tbody?.style;

  const { newStyle } = useCreateStyle({
    newStyle: { 
      ...tagStyle,  
      ...style 
    }
  }, [tagStyle, style]);
  
  return <Div ref={ref as any} style={newStyle} {...rest}></Div>;
})
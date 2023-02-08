import React, { forwardRef, LegacyRef } from "react";
import { View } from "react-native";
import { useTags } from "./core";
import { Div } from "./div";
import { TagProps } from "./type";

export const P = forwardRef(({style, ...rest}:TagProps, ref:LegacyRef<View>) => {

  const { tagConfig } = useTags();
  const tagStyle = tagConfig?.p?.style;
  
  return (
    <Div 
      ref={ref as any}
      style={{
        ...tagStyle, 
        ...style
      }} {...rest}></Div>
  )
})
import React from "react";
import { useTags } from "../core";
import { Div } from "../div";
import { TagProps } from "../type";

export const Tbody = ({style, ...rest}:TagProps) => {

  const { tagConfig } = useTags();
  const tagStyle = tagConfig?.tbody?.style;
  
  return (
    <Div 
      style={{
        paddingBottom: 1,
        ...tagStyle,
        ...style
      }} {...rest}></Div>
  )
}
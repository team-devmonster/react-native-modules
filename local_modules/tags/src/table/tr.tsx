import React from "react";
import { useTags } from "../core";
import { Div } from "../div";
import { TagProps } from "../type";

export const Tr = ({style, ...rest}:TagProps) => {

  const { tagConfig } = useTags();
  const tagStyle = tagConfig?.tr?.style;
  
  return (
    <Div 
      style={{
        flexDirection: 'row',
        paddingRight: 1,
        ...tagStyle,
        ...style
      }} {...rest}></Div>
  )
}
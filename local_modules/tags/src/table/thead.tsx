import React from "react";
import { useTags } from "../core";
import { Div } from "../div";
import { TagProps } from "../type";

export const Thead = ({style, ...rest}:TagProps) => {

  const { tagConfig } = useTags();
  const tagStyle = tagConfig?.thead?.style;
  
  return (
    <Div 
      style={{
        ...tagStyle, 
        ...style
      }} {...rest}></Div>
  )
}
import React from "react";
import { useTags } from "./core";
import { Div } from "./div";
import { TagProps } from "./type";

export const P = ({style, ...rest}:TagProps) => {

  const { tagConfig } = useTags();
  const tagStyle = tagConfig?.p?.style;
  
  return (
    <Div 
      style={{
        ...tagStyle, 
        ...style
      }} {...rest}></Div>
  )
}
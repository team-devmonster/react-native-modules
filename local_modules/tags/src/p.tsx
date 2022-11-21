import React from "react";
import { useTags } from "./core";
import { Div } from "./div";
import { TagProps } from "./type";

export const P = ({style, ...rest}:TagProps) => {

  const { tagConfig } = useTags();
  const pTagStyle = tagConfig?.p;
  
  return (
    <Div 
      style={{
        ...pTagStyle, 
        ...style
      }} {...rest}></Div>
  )
}
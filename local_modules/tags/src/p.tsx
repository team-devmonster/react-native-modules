import React from "react";
import { useTags, useTagStyle } from "./core";
import { Div } from "./div";
import { TagProps } from "./type";

export const P = ({style, ...rest}:TagProps) => {

  const { tagConfig } = useTags();
  const pTagStyle = tagConfig?.p;

  const [
    pStyle
  ]
  = useTagStyle([

  ], [pTagStyle, style]);
  
  return (
    <Div style={pStyle} {...rest}></Div>
  )
}
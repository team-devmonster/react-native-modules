import React from "react";
import { useTags } from "../core";
import { P } from "../p";
import { TagProps } from "../type";

export const Th = ({style, ...rest}:TagProps) => {

  const { tagConfig } = useTags();
  const tagStyle = tagConfig?.th?.style;
  
  return (
    <P 
      style={{
        marginRight: -1,
        marginBottom: -1,
        ...tagStyle,
        ...style
      }} {...rest}></P>
  )
}
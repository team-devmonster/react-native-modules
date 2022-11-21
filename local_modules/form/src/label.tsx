import React from "react"
import { P, useTags } from "@team-devmonster/react-native-tags";
import { FormValues, LabelProps } from "./type";

export function Label<T extends FormValues>({ 
  errors, 
  name, 
  disabled,
  style,
  disabledStyle,
  errorStyle,
  ...rest
  }:LabelProps<T>) {

  const { tagConfig } = useTags();
  const labelTagStyle = tagConfig?.label?.style;
  const labelTagDisabledStyle = tagConfig?.label?.disabledStyle;
  const labelTagErrorStyle = tagConfig?.label?.errorStyle;

  if(name) {
    const hasDot = name?.includes('.');
    let nameArr = [];
    if(hasDot) {
      nameArr = name!.split('.');
    }
    else {
      nameArr = [name];
    }
    let error = null;

    for(let i = 0; i < nameArr.length; i++) {
      const name = nameArr[i];
      error = errors?.[name];
    }
    console.log(error);

    return (
      <P 
      style={{
        ...labelTagStyle,
        ...style,
        ...(error ? {
          ...labelTagErrorStyle,
          ...errorStyle
        } : null),
        ...(disabled ? {
          ...labelTagDisabledStyle,
          ...disabledStyle
        } : null)
      }} {...rest}></P>
    )
  }
  
  return (
    <P 
    style={{
      ...labelTagStyle,
      ...style
    }} {...rest}></P>
  )
}
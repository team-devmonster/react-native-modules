import React from "react";
import { FormValues, InputProps } from "./type";
import { Checkbox } from "./checkbox";
import { BaseInput } from "./baseInput";
import { Radio } from "./radio";

export function Input<T extends FormValues>(props:InputProps<T>) 
{
  const { type } = props;

  switch(type) {
    case 'date':
      return null;
    case 'time':
      return null;
    case 'checkbox':
      return <Checkbox {...props}/>;
    case 'radio':
      return <Radio {...props}/>;
    default:
      return <BaseInput {...props}/>;
  }
  
}
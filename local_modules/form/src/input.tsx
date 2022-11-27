import React from "react";
import { FormValues, InputProps } from "./type";
import { Checkbox } from "./checkbox";
import { BaseInput } from "./baseInput";
import { Radio } from "./radio";
import { DateInput } from "./dateInput";

export function Input<T extends FormValues>(props:InputProps<T>) 
{
  const { type } = props;

  switch(type) {
    case 'date':
    case 'datetime-local':
    case 'time':
      return <DateInput {...props}/>;
    case 'checkbox':
      return <Checkbox {...props}/>;
    case 'radio':
      return <Radio {...props}/>;
    default:
      return <BaseInput {...props}/>;
  }
  
}
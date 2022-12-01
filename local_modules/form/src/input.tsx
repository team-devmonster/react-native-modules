import React from "react";
import { FormValues, InputProps } from "./type";
import { Checkbox } from "./checkbox";
import { BaseInput } from "./baseInput";
import { Radio } from "./radio";
import { DateInput } from "./dateInput";
import { FileInput } from "./fileInput";

export function Input<T extends FormValues>(props:InputProps<T>) 
{
  const { type, ...rest } = props;

  switch(type) {
    case 'date':
    //case 'datetime-local':
    case 'time':
      return <DateInput type={type} {...rest}/>;
    case 'checkbox':
      return <Checkbox {...rest}/>;
    case 'radio':
      return <Radio {...rest}/>;
    case 'file':
      return <FileInput {...rest}/>;
    default:
      return <BaseInput type={type} {...rest}/>;
  } 
}
import React from "react";
import { FormValues, InputProps } from "./type";
import { Checkbox } from "./checkbox";
import { BaseInput } from "./baseInput";
import { Radio } from "./radio";
import { MonthInput } from "./monthInput";
import { FileInput } from "./fileInput";
import { TimeInput } from "./timeInput";
import { YearInput } from "./yearInput";

export function Input<T extends FormValues>(props:InputProps<T>) 
{
  const { type, ...rest } = props;

  switch(type) {
    case 'date':
    case 'datetime-local':
    case 'time':
      return <TimeInput type={type} {...rest as any}/>;
    case 'year':
      return <YearInput type={type} {...rest as any}/>;
    case 'month':
      return <MonthInput type={type} {...rest as any}/>;
    case 'checkbox':
      return <Checkbox {...rest as any}/>;
    case 'radio':
      return <Radio {...rest as any}/>;
    case 'file':
      return <FileInput {...rest as any}/>;
    default:
      return <BaseInput type={type} {...rest as any}/>;
  } 
}
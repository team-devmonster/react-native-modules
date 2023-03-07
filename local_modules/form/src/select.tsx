import React from "react";
import { FormValues, SelectProps } from "./type";
import { SelectPicker } from "./selectPicker";
import { SelectPopover } from "./selectPopover";

export function Select<T extends FormValues>(props:SelectProps<T>) {
  switch(props.interface) {
    case 'popover':
      return <SelectPopover {...props as any}/>;
    default: // picker
      return <SelectPicker {...props as any}/>;
  }
}
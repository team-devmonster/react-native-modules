import React from "react";
import { FormValues, SelectProps } from "./type";
import { SelectPicker } from "./selectPicker";
import { SelectPopover } from "./selectPopover";
import { useTags } from "@team-devmonster/react-native-tags";

export function Select<T extends FormValues>(props:SelectProps<T>) {

  const { tagConfig } = useTags();
  const selectInterface = tagConfig?.select?.interface || props.interface;

  switch(selectInterface) {
    case 'popover':
      return <SelectPopover {...props as any}/>;
    default: // picker
      return <SelectPicker {...props as any}/>;
  }
}
import { Button } from "@team-devmonster/react-native-tags";
import React from "react"
import { OptionProps } from "./type";

export function Option({ 
  value,
  label,
  children,
  ...rest
}:OptionProps) {
  return (
    <Button color="transparent" fill="none" {...rest}>{children}</Button>
  )
}
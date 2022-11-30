import { Picker } from "@react-native-picker/picker";
import React from "react"
import { OptionProps } from "./type";

export function Option({ 
  value,
  children
}:OptionProps) {
  // not use this. but need it :(
  return (
    <Picker.Item label={children} value={value}></Picker.Item>
  )
}
import React from "react";
import { InputRuleProps } from "./type";
import { Control, Controller, Path } from 'react-hook-form';
import { TextInput } from "react-native";

interface FormValues {[name:string]:any};
export interface InputProps<T extends FormValues> extends InputRuleProps {
  control:Control<T>,
  name:Path<T>
}

export function Input<T extends FormValues>({
  control, name
}:InputProps<T>) {
  
  if(control && name) {
    return (
      <Controller
        control={control}
        name={name}
        render={({ 
          /* field: { onChange, onBlur, value, name, ref },
          fieldState: { invalid, isTouched, isDirty, error },
          formState, */
         }) => (
          <TextInput></TextInput>
        )}
      />
    )
  }
  else {
    return null;
  }
}
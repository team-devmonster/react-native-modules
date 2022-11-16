import React from "react";
import { FormValues, InputRuleProps } from "./type";
import { Control, Controller, Path } from 'react-hook-form';
import { TextInput } from "react-native";
import { TagStyle, useTags, useTagStyle } from '@team-devmonster/react-native-tags';

export interface InputProps<T extends FormValues = any> extends InputRuleProps {
  control:Control<T>,
  name:Path<T>,
  style?:TagStyle,
  disabledStyle?:TagStyle,
  errorStyle?:TagStyle
}

export function Input<T extends FormValues>(
  {
    control, 
    name, 
    disabled,
    style,
    disabledStyle,
    errorStyle,
    value,
    ...rules
  }:InputProps<T>) 
{

  const { tagConfig } = useTags();
  
  const inputTagStyle = tagConfig?.input?.style;
  const inputTagDisabledStyle = tagConfig?.input?.disabledStyle;
  const inputTagErrorStyle = tagConfig?.input?.errorStyle;

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={value}
      rules={rules as any}
      render={({ 
        field: { onChange, onBlur, value, ref },
        fieldState: { error }
       }) => {

        const [
          allStyle
        ]
        = useTagStyle([

        ], [
          inputTagStyle, 
          disabled ? inputTagDisabledStyle : undefined,
          error ? inputTagErrorStyle : undefined,
          style,
          disabled ? disabledStyle : undefined,
          error ? errorStyle : undefined
        ]);

        return (
          <TextInput
            ref={ref}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            maxLength={typeof rules.maxLength === 'number' ? rules.maxLength : rules.maxLength?.value}
            style={allStyle}
          ></TextInput>
        )
       }}
    />
  )
}
import React from "react";
import { useColorScheme, TextInput } from "react-native";
import { Control, Controller, Path as Names } from 'react-hook-form';

import { FormValues, InputProps } from "./type";
import { TagStyle, useTags, useTagStyle, Button } from '@team-devmonster/react-native-tags';

export interface SelectProps<T extends FormValues = any> extends InputProps<T> {
  control:Control<T>,
  name:Names<T>,
  style?:TagStyle,
  disabledStyle?:TagStyle,
  errorStyle?:TagStyle,
  children:React.ReactNode
}
export function Select<T extends FormValues>(
  {
    control, 
    name, 
    disabled,
    style,
    disabledStyle,
    errorStyle,
    value,
    onClick,
    children,
    ...rules
  }:SelectProps<T>) 
{
  const colorScheme = useColorScheme();
  const { tagConfig } = useTags();
  
  const inputTagStyle = tagConfig?.input?.style;
  const inputTagDisabledStyle = tagConfig?.input?.disabledStyle;
  const inputTagErrorStyle = tagConfig?.input?.errorStyle;

  const selectTagStyle = tagConfig?.select?.style;
  const selectTagDisabledStyle = tagConfig?.select?.disabledStyle;
  const selectTagErrorStyle = tagConfig?.select?.errorStyle;

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={value}
      rules={rules as any}
      render={({ 
        field: { ref, onChange, value, onBlur },
        fieldState: { error }
       }) => {

        const [
          newStyle
        ]
        = useTagStyle([

        ], [
          inputTagStyle, 
          selectTagStyle, 
          disabled ? inputTagDisabledStyle : undefined,
          disabled ? selectTagDisabledStyle : undefined,
          error ? inputTagErrorStyle : undefined,
          error ? selectTagErrorStyle : undefined,
          style,
          disabled ? disabledStyle : undefined,
          error ? errorStyle : undefined
        ]);

        return (
          <Button
            color={colorScheme === 'dark' ? '#000000' : '#ffffff'}
            style={{
              ...newStyle
            }}
            onClick={(e) => {
              const newValue = !value;
              onChange(newValue);
              onClick?.({...e, value: newValue});
            }}>
              <TextInput
              showSoftInputOnFocus={false}
              ref={ref}
              onBlur={onBlur}
              style={{ position: 'absolute', top: -2, left: 0, width: 1, height: 1, zIndex: -1, opacity: 0 }}></TextInput>
              {children}
          </Button>
        )
       }}
    />
  )
}
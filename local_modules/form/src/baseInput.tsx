import React from "react";
import { FormValues, InputProps } from "./type";
import { Controller } from 'react-hook-form';
import { KeyboardTypeOptions, TextInput } from "react-native";
import { placeholderPattern, useTags, useTagStyle } from '@team-devmonster/react-native-tags';

export function BaseInput<T extends FormValues>(props:InputProps<T>) 
{
  const {
    control, 
    name,
    placeholder,
    disabled,
    style,
    disabledStyle,
    errorStyle,
    value,
    type = 'text',
    ...rules
  } = props;

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
          placeholderStyle,
          inputStyle
        ]
        = useTagStyle([
          placeholderPattern
        ], [
          inputTagStyle,
          disabled ? inputTagDisabledStyle : undefined,
          error ? inputTagErrorStyle : undefined,
          style,
          disabled ? disabledStyle : undefined,
          error ? errorStyle : undefined
        ]);

        let keyboardType:KeyboardTypeOptions = 'default';
        let secureTextEntry:boolean = false;
        let newValue = value;
        let newOnChange = onChange;

        switch(type) {
          case 'number':
            keyboardType = 'number-pad';
            newValue = String(value || '0') as any;
            newOnChange = (v) => {
              onChange(isNaN(+v) ? 0 : +v);
            }
            break;
          case 'tel':
            keyboardType = 'phone-pad';
            break;
          case 'password':
            keyboardType = 'default';
            secureTextEntry = true;
            break;
        }

        return (
          <TextInput
            ref={ref}
            onChangeText={newOnChange}
            onBlur={onBlur}
            value={newValue}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            maxLength={typeof rules.maxLength === 'number' ? rules.maxLength : rules.maxLength?.value}
            placeholder={placeholder}
            placeholderTextColor={placeholderStyle.placeholderColor}
            style={inputStyle}
          ></TextInput>
        )
        }}
    />
  )
}
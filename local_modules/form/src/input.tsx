import React from "react";
import { FormValues, InputRuleProps } from "./type";
import { Control, Controller, Path } from 'react-hook-form';
import { KeyboardTypeOptions, TextInput } from "react-native";
import { placeholderPattern, TagStyle, useTags, useTagStyle } from '@team-devmonster/react-native-tags';
import { Checkbox } from "./checkbox";

export interface InputProps<T extends FormValues = any> extends InputRuleProps {
  control:Control<T>,
  name:Path<T>,
  placeholder?:string,
  style?:TagStyle,
  disabledStyle?:TagStyle,
  errorStyle?:TagStyle,
  type?:'text'|'email'|'url'|''|'number'|'tel'|'password'|'date'|'time'|'checkbox'|'radio'
}

export function Input<T extends FormValues>(props:InputProps<T>) 
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

  switch(type) {
    case 'text':
    case 'email':
    case 'number':
    case 'tel':
    case 'password':
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
              case 'text':
              case 'email':
                // nothing
                break;
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
    case 'date':
      return null;
    case 'time':
      return null;
    case 'checkbox':
      return <Checkbox {...props}/>;
    case 'radio':
      return null;
    default:
      return null;
  }
  
}
import React, { useMemo } from "react";
import { FormValues, InputProps, InputType, InputRuleProps, InputKeyboardType } from "./type";
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
    returnKeyType,
    onEnter,
    onFocus,
    keyboardType,
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

        const { newKeyboardType, secureTextEntry, newValue, newOnChange } = useMemo(() => inputModeChange({ type, value, onChange, rules, keyboardType }), [type, value, onChange, rules, keyboardType]);

        const maxLength = useMemo(() => typeof rules.maxLength === 'number' ? rules.maxLength : rules.maxLength?.value || 30, [rules.maxLength]);

        return (
          <TextInput
            ref={ref}
            onChangeText={newOnChange}
            onBlur={onBlur}
            onFocus={onFocus}
            value={newValue}
            keyboardType={newKeyboardType}
            secureTextEntry={secureTextEntry}
            maxLength={maxLength}
            placeholder={placeholder}
            placeholderTextColor={placeholderStyle.placeholderColor}
            style={inputStyle}
            editable={!disabled}
            returnKeyType={returnKeyType}
            onSubmitEditing={onEnter}
          ></TextInput>
        )
      }}
    />
  )
}

type InputModeChangeProps = {
  type:InputType, 
  value:any, 
  onChange:any,
  rules:InputRuleProps,
  keyboardType?:InputKeyboardType
}
const inputModeChange = ({ type, value, onChange, rules, keyboardType }:InputModeChangeProps) => {
  let newKeyboardType:KeyboardTypeOptions = 'default';
  let secureTextEntry:boolean = false;
  let newValue:string = value;
  let newOnChange = onChange;

  switch(type) {
    case 'email':
      newKeyboardType = 'email-address';
      break;
    case 'number':
      newKeyboardType = 'number-pad';
      newValue = String(value || '0');
      newOnChange = (v:any) => {
        let num = v.replace(/\D+/g, '');
        onChange(num ? +num : 0);
      }
      break;
    case 'tel':
      newKeyboardType = 'phone-pad';
      let tel = (value as string)?.replace(/\D+/g, '').replace(/(\d{2,3})(\d{3,4})(\d{4})/, "$1-$2-$3");
      newValue = tel;
      newOnChange = (v:any) => {
        let num = v.replace(/\D+/g, '');
        onChange(num);
      }
      rules.maxLength = rules.maxLength || 13;
      break;
    case 'password':
      newKeyboardType = 'default';
      secureTextEntry = true;
      break;
  }

  return {
    newKeyboardType: keyboardType || newKeyboardType,
    secureTextEntry,
    newValue,
    newOnChange
  }
}
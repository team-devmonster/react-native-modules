import React, { useImperativeHandle, useMemo, useRef } from "react";
import { FormValues, InputProps, InputType, InputRuleProps, InputKeyboardType } from "./type";
import { Controller } from 'react-hook-form';
import { KeyboardTypeOptions, TextInput } from "react-native";
import { placeholderPattern, useTags, useTagStyle } from '@team-devmonster/react-native-tags';

export const BaseInput = (props:InputProps<FormValues>) => {
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
    inputRef,
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
        field: { onChange, onBlur, value, ref:conrollerRef },
        fieldState: { error }
      }) => {

        const ref = useRef<TextInput>(null);
        conrollerRef(ref.current);
        useImperativeHandle(inputRef, () => {
          return ref.current;
        }, [ref]);

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

        const { newKeyboardType, secureTextEntry, newValue, newOnChange, newOnBlur } = useMemo(() => inputModeChange({ type, value, onChange, onBlur, rules, keyboardType }), [type, value, onChange, rules, keyboardType]);

        const maxLength = useMemo(() => typeof rules.maxLength === 'number' ? rules.maxLength : rules.maxLength?.value || 30, [rules.maxLength]);

        return (
          <TextInput
            ref={ref}
            onChangeText={newOnChange}
            onBlur={newOnBlur}
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
  onBlur:any,
  rules:InputRuleProps,
  keyboardType?:InputKeyboardType
}
const inputModeChange = ({ type, value, onChange, onBlur, rules, keyboardType }:InputModeChangeProps) => {
  let newKeyboardType:KeyboardTypeOptions = 'default';
  let secureTextEntry:boolean = false;
  let newValue:string = value;
  let newOnChange = onChange;
  let newOnBlur = onBlur;

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
    case 'float':
      newKeyboardType = 'numeric';
      newValue = String(value || '0');
      newOnChange = (v:any) => {
        // 숫자와 소숫점 이외의 모든 문자 제거
        let num = v.replace(/[^0-9.]/g, '');

        // 첫 번째 소숫점 이후의 모든 소숫점 제거
        num = num.replace(/(\..*?)\..*/g, '$1');

        // 선행 0 제거, 단 0. 형태는 허용
        num = num.replace(/^0+(?=\d)/, '');

        onChange(num || 0);
      };
      newOnBlur = (e:any) => {
        onChange(parseFloat(newValue) || 0);
        onBlur(e);
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
    case 'price':
      newKeyboardType = 'phone-pad';
      let price = (value as string)?.replace(/\D+/g, '').replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      newValue = price;
      newOnChange = (v:any) => {
        let num = v.replace(/\D+/g, '');
        onChange(num);
      }
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
    newOnChange,
    newOnBlur
  }
}
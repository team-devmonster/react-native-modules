import React, { useEffect, useState } from "react";
import { FormValues, InputProps } from "./type";
import { Controller } from 'react-hook-form';
import { Keyboard, TextInput } from "react-native";
import { placeholderPattern, useTags, useTagStyle } from '@team-devmonster/react-native-tags';

export function Textarea<T extends FormValues>(props:InputProps<T>) 
  {const [isScrollEnabled, setIsScrollEnabled] = useState<boolean>(false);
  const {
    control, 
    name,
    placeholder,
    disabled,
    style,
    disabledStyle,
    errorStyle,
    value,
    ...rules
  } = props;

  const { tagConfig } = useTags();

  const inputTagStyle = tagConfig?.input?.style;
  const inputTagDisabledStyle = tagConfig?.input?.disabledStyle;
  const inputTagErrorStyle = tagConfig?.input?.errorStyle;
  
  useEffect(() => {
    const subKWS = Keyboard.addListener("keyboardWillShow", onKeyboardWillShow);
    const subKDS = Keyboard.addListener("keyboardDidShow", onKeyboardDidShow);

    return () => {
      subKWS.remove();
      subKDS.remove();
    };
  }, []);

  // KeyBoard Event
  const onKeyboardWillShow = () => {
    setIsScrollEnabled(false);
  }

  const onKeyboardDidShow = () => {
    setIsScrollEnabled(true);
  }
    
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

        return (
          <TextInput
            ref={ref}
            onChangeText={onChange}
            onBlur={onBlur}
            multiline={isScrollEnabled}
            value={value}
            maxLength={typeof rules.maxLength === 'number' ? rules.maxLength : rules.maxLength?.value}
            placeholder={placeholder}
            placeholderTextColor={placeholderStyle.placeholderColor}
            style={inputStyle}
            editable={!disabled}
          ></TextInput>
        )
        }}
    />
  )
}
import React, { useEffect, useRef } from "react";
import { useColorScheme, TextInput, Animated, Easing } from "react-native";
import { Control, Controller, Path as Names } from 'react-hook-form';
import Svg, { Path } from "react-native-svg";

import { FormValues, InputProps } from "./type";
import { TagStyle, useTags, useTagStyle, Button } from '@team-devmonster/react-native-tags';


const checkboxDefaultStyle:TagStyle = {
  minHeight: undefined,
  padding: undefined,
  paddingLeft: undefined,
  paddingRight: undefined,
  paddingTop: undefined,
  paddingBottom: undefined,
  width: 38,
  height: 38,
  borderColor: '#dedede',
  borderWidth: 1,
  borderRadius: 5,
  justifyContent: 'center',
  alignItems: 'center'
}
export interface CheckboxProps<T extends FormValues = any> extends InputProps<T> {
  control:Control<T>,
  name:Names<T>,
  style?:TagStyle,
  disabledStyle?:TagStyle,
  errorStyle?:TagStyle
}
export function Checkbox<T extends FormValues>(
  {
    control, 
    name, 
    disabled,
    style,
    disabledStyle,
    errorStyle,
    value,
    onClick,
    ...rules
  }:CheckboxProps<T>) 
{
  const colorScheme = useColorScheme();
  const { tagConfig } = useTags();
  
  const checkboxTagStyle = tagConfig?.checkbox?.style;
  const checkboxTagDisabledStyle = tagConfig?.checkbox?.disabledStyle;
  const checkboxTagErrorStyle = tagConfig?.checkbox?.errorStyle;

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

        const inoutAnim = useRef(new Animated.Value(0)).current;

        useEffect(() => {
          Animated.timing(
            inoutAnim,
            {
              toValue: value ? 1 : 0,
              duration: 150,
              easing: Easing.ease,
              useNativeDriver: true
            }
          ).start();
        }, [value]);

        const [
          newStyle
        ]
        = useTagStyle([

        ], [
          checkboxTagStyle, 
          disabled ? checkboxTagDisabledStyle : undefined,
          error ? checkboxTagErrorStyle : undefined,
          style,
          disabled ? disabledStyle : undefined,
          error ? errorStyle : undefined
        ]);

        return (
          <Button
            color={colorScheme === 'dark' ? '#000000' : '#ffffff'}
            style={{
              ...checkboxDefaultStyle,
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
              {
                <Animated.View style={{
                  transform: [
                    { scale: inoutAnim }
                  ]
                }}>
                  <Svg 
                    fill="none" 
                    viewBox="0 0 24 24"
                    stroke={newStyle.color || '#FF6420'} 
                    strokeWidth={2}
                    width={26}
                    height={26}
                    style={{ width: 26, height: 26 }}>
                    <Path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </Svg>
                </Animated.View>
              }
          </Button>
        )
       }}
    />
  )
}
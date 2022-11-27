import React, { useEffect, useRef } from "react";
import { useColorScheme, TextInput, View, Animated, Easing } from "react-native";
import { Control, Controller, Path as Names } from 'react-hook-form';

import { FormValues, InputRuleProps } from "./type";
import { TagStyle, useTags, useTagStyle, Button } from '@team-devmonster/react-native-tags';


const radioDefaultStyle:TagStyle = {
  width: 38,
  height: 38,
  borderColor: '#dedede',
  borderWidth: 1,
  borderRadius: 19,
  justifyContent: 'center',
  alignItems: 'center'
}
export interface RadioProps<T extends FormValues = any> extends InputRuleProps {
  control:Control<T>,
  name:Names<T>,
  style?:TagStyle,
  disabledStyle?:TagStyle,
  errorStyle?:TagStyle
}
export function Radio<T extends FormValues>(
  {
    control, 
    name, 
    disabled,
    style,
    disabledStyle,
    errorStyle,
    value,
    ...rules
  }:RadioProps<T>) 
{
  const colorScheme = useColorScheme();
  const { tagConfig } = useTags();
  
  const radioTagStyle = tagConfig?.radio?.style;
  const radioTagDisabledStyle = tagConfig?.radio?.disabledStyle;
  const radioTagErrorStyle = tagConfig?.radio?.errorStyle;

  return (
    <Controller
      control={control}
      name={name}
      rules={rules as any}
      render={({ 
        field: { ref, onChange, value:fieldValue, onBlur },
        fieldState: { error }
       }) => {

        const inoutAnim = useRef(new Animated.Value(0)).current;

        useEffect(() => {
          Animated.timing(
            inoutAnim,
            {
              toValue: value === fieldValue ? 1 : 0,
              duration: 120,
              easing: Easing.ease,
              useNativeDriver: true
            }
          ).start();
        }, [value, fieldValue]);

        const [
          radioStyle
        ]
        = useTagStyle([

        ], [
          radioTagStyle, 
          disabled ? radioTagDisabledStyle : undefined,
          error ? radioTagErrorStyle : undefined,
          style,
          disabled ? disabledStyle : undefined,
          error ? errorStyle : undefined
        ]);

        return (
          <Button
            color={colorScheme === 'dark' ? '#000000' : '#ffffff'}
            style={{
              ...radioDefaultStyle,
              ...radioStyle
            }}
            onClick={() => {
              onChange(value);
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
                  <View style={{
                    width: 16,
                    height: 16,
                    borderRadius: 12,
                    backgroundColor: radioStyle.color || '#FF6420'
                  }}>
                  </View>
                </Animated.View>
              }
          </Button>
        )
       }}
    />
  )
}
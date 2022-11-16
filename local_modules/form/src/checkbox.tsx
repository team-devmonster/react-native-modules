import React from "react";
import { FormValues, InputRuleProps } from "./type";
import { Control, Controller, Path as Names } from 'react-hook-form';
import Svg, { Path } from "react-native-svg";
import { TagStyle, useTags, useTagStyle, Button } from '@team-devmonster/react-native-tags';
import { useColorScheme } from "react-native";


const checkboxDefaultStyle:TagStyle = {
  minHeight: undefined,
  padding: undefined,
  paddingLeft: undefined,
  paddingRight: undefined,
  paddingTop: undefined,
  paddingBottom: undefined,
  width: 32,
  height: 32,
  borderColor: '#dedede',
  borderWidth: 1,
  borderRadius: 5,
  justifyContent: 'center',
  alignItems: 'center'
}
export interface CheckboxProps<T extends FormValues = any> extends InputRuleProps {
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
        field: { onChange, value },
        fieldState: { error }
       }) => {

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
              ...checkboxDefaultStyle as any,
              ...newStyle
            }}
            onClick={() => {
              onChange(!value);
            }}>
              {
                value ?
                <Svg fill="none" viewBox="0 0 24 24" stroke={newStyle.color || '#FF6420'} strokeWidth={2}>
                  <Path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </Svg>
                : null
              }
          </Button>
        )
       }}
    />
  )
}
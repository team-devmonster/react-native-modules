import React, { useEffect, useRef, useMemo } from "react";
import { TextInput, View, Animated, Easing } from "react-native";
import { Control, Controller, Path as Names, UnPackAsyncDefaultValues } from 'react-hook-form';

import { FormValues, InputRuleProps } from "./type";
import { TagStyle, useTags, useTagStyle, Button, TagGroupConfig, borderPattern } from '@team-devmonster/react-native-tags';


const radioDefaultStyle:TagStyle = {
  width: 38,
  height: 38,
  borderColor: '#dedede',
  borderWidth: 1,
  justifyContent: 'center',
  alignItems: 'center'
}
export interface RadioProps<T extends FormValues = any> extends InputRuleProps {
  control:Control<T>,
  name:Names<UnPackAsyncDefaultValues<T>>,
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
  const { tagConfig } = useTags();
  
  const styles = useMemo(() => getStyles({ tagConfig }), [tagConfig?.input]);

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
          newStyle
        ]
        = useTagStyle([

        ], [
          styles.tagStyle, 
          disabled ? styles.tagDisabledStyle : undefined,
          error ? styles.tagErrorStyle : undefined,
          style,
          disabled ? disabledStyle : undefined,
          error ? errorStyle : undefined
        ]);

        return (
          <Button
            color={newStyle.backgroundColor}
            style={{
              ...radioDefaultStyle,
              ...newStyle
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
                    width: newStyle.iconWidth || 16,
                    height: newStyle.iconHeight || 16,
                    borderRadius: 50,
                    backgroundColor: newStyle.iconColor || '#FF6420'
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

const getStyles = ({ tagConfig }:{ tagConfig:TagGroupConfig|undefined }) => {
  const inputTagStyle = tagConfig?.input?.style;
  const inputDisabledTagStyle = tagConfig?.input?.disabledStyle;
  const inputErrorTagStyle = tagConfig?.input?.errorStyle;

  const borderStyle = inputTagStyle ? 
    Object.entries(inputTagStyle)
      .filter(([key]) => borderPattern.test(key))
      .reduce((sum, cur) => ({ ...sum, [cur[0]]:cur[1] }), {}) : null;
  const backgroundColor = inputTagStyle?.backgroundColor;

  const borderDisabledStyle = inputDisabledTagStyle ? 
    Object.entries(inputDisabledTagStyle)
      .filter(([key]) => borderPattern.test(key))
      .reduce((sum, cur) => ({ ...sum, [cur[0]]:cur[1] }), {}) : null;
  const backgroundDisabledColor = inputDisabledTagStyle?.backgroundColor;

  const borderErrorStyle = inputErrorTagStyle ? 
    Object.entries(inputErrorTagStyle)
      .filter(([key]) => borderPattern.test(key))
      .reduce((sum, cur) => ({ ...sum, [cur[0]]:cur[1] }), {}) : null;
  const backgroundErrorColor = inputErrorTagStyle?.backgroundColor;

  const radioTagStyle = tagConfig?.input?.["type=radio"]?.style;
  const radioTagDisabledStyle = tagConfig?.input?.["type=radio"]?.disabledStyle;
  const radioTagErrorStyle = tagConfig?.input?.["type=radio"]?.errorStyle;

  return {
    tagStyle:  {
      ...borderStyle,
      borderRadius: 50,
      backgroundColor: backgroundColor,
      ...radioTagStyle
    },
    tagDisabledStyle: {
      ...borderDisabledStyle,
      backgroundColor: backgroundDisabledColor,
      ...radioTagDisabledStyle
    },
    tagErrorStyle: {
      ...borderErrorStyle,
      backgroundColor: backgroundErrorColor,
      ...radioTagErrorStyle
    }
  }
}
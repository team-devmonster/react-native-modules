import React, { useMemo } from "react";
import { TextInput, View } from "react-native";
import { Controller } from 'react-hook-form';
import Animated, { ZoomIn } from "react-native-reanimated";

import { FormValues, InputProps } from "./type";
import { TagStyle, useTags, useTagStyle, Button, TagGroupConfig, borderPattern } from '@team-devmonster/react-native-tags';
import { getIcon } from "./utils";


const radioDefaultStyle:TagStyle = {
  width: 38,
  height: 38,
  borderColor: '#dedede',
  borderWidth: 1,
  justifyContent: 'center',
  alignItems: 'center'
}
export interface RadioProps<T extends FormValues = any> extends Omit<InputProps<T>, 'placeholder'> {
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

        const [
          newStyle
        ]
        = useTagStyle([

        ], [
          styles.tagStyle, 
          disabled ? styles.tagDisabledStyle : undefined,
          error ? styles.tagErrorStyle : undefined,
          value === fieldValue ? styles.tagCheckedStyle : undefined,
          style,
          disabled ? disabledStyle : undefined,
          error ? errorStyle : undefined,
          value === fieldValue ? styles.tagCheckedStyle : undefined,
        ]);

        const { icon, iconStyle } = useMemo(() => getIcon({ iconObj: newStyle}), [newStyle.icon]);

        return (
          <Button
            fill="none"
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
                icon ? icon
                :
                  value === fieldValue ?
                    <Animated.View entering={ZoomIn}>
                      <View style={{
                        width: iconStyle.width || 16,
                        height: iconStyle.height || 16,
                        borderRadius: 50,
                        backgroundColor: iconStyle.color || '#FF6420'
                      }}>
                      </View>
                    </Animated.View>
                  : null
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

  const tagStyle = tagConfig?.input?.["type=radio"]?.style;
  const tagCheckedStyle = tagConfig?.input?.["type=radio"]?.checkedStyle;
  const tagDisabledStyle = tagConfig?.input?.["type=radio"]?.disabledStyle;
  const tagErrorStyle = tagConfig?.input?.["type=radio"]?.errorStyle;

  return {
    tagStyle:  {
      ...borderStyle,
      borderRadius: 50,
      backgroundColor: backgroundColor,
      ...tagStyle
    },
    tagCheckedStyle: {
      ...tagCheckedStyle
    },
    tagDisabledStyle: {
      ...borderDisabledStyle,
      backgroundColor: backgroundDisabledColor,
      ...tagDisabledStyle
    },
    tagErrorStyle: {
      ...borderErrorStyle,
      backgroundColor: backgroundErrorColor,
      ...tagErrorStyle
    }
  }
}
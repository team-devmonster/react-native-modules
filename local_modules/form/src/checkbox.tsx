import React, { useMemo } from "react";
import { TextInput } from "react-native";
import { Control, Controller, Path as Names, UnPackAsyncDefaultValues } from 'react-hook-form';
import Svg, { Path } from "react-native-svg";
import Animated, { ZoomIn } from "react-native-reanimated";

import { FormValues, InputProps } from "./type";
import { TagStyle, useTags, useTagStyle, Button, borderPattern, TagGroupConfig } from '@team-devmonster/react-native-tags';
export interface CheckboxProps<T extends FormValues = any> extends Omit<InputProps<T>, 'placeholder'> {
  control:Control<T>,
  name:Names<UnPackAsyncDefaultValues<T>>,
  style?:TagStyle,
  disabledStyle?:TagStyle,
  errorStyle?:TagStyle
}
export function Checkbox<T extends FormValues>({
    control, 
    name, 
    disabled,
    style,
    checkedStyle,
    disabledStyle,
    errorStyle,
    value,
    onClick,
    ...rules
  }:CheckboxProps<T>) 
{
  const { tagConfig } = useTags();
  
  const styles = useMemo(() => getStyles({ tagConfig }), [tagConfig?.input]);

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

        const [
          newStyle
        ]
        = useTagStyle([

        ], [
          styles.tagStyle, 
          disabled ? styles.tagDisabledStyle : undefined,
          error ? styles.tagErrorStyle : undefined,
          value ? styles.tagCheckedStyle : undefined,
          style,
          disabled ? disabledStyle : undefined,
          error ? errorStyle : undefined,
          value ? checkedStyle : undefined
        ]);

        return (
          <Button
            fill="none"
            color={newStyle.backgroundColor}
            style={{
              width: 38,
              height: 38,
              justifyContent: 'center',
              alignItems: 'center',
              ...newStyle
            }}
            disabled={disabled}
            onClick={(e) => {
              const newValue = !value;
              onChange(newValue);
              onClick?.({...e, value: newValue});
            }}>
              <TextInput
                showSoftInputOnFocus={false}
                ref={ref}
                onBlur={onBlur}
                style={{ position: 'absolute', top: -2, left: 0, width: 1, height: 1, zIndex: -1, opacity: 0 }}
              />
              {
                newStyle.icon ? 
                  <Animated.View entering={ZoomIn}>
                    {newStyle.icon}
                  </Animated.View>
                :
                  value ?
                    <Animated.View entering={ZoomIn}>
                      <Svg 
                        fill="none" 
                        viewBox="0 0 24 24"
                        stroke={newStyle.iconColor || '#FF6420'} 
                        strokeWidth={2}
                        width={newStyle.iconWidth || 28}
                        height={newStyle.iconHeight || 28}>
                        <Path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </Svg>
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

  const tagStyle = tagConfig?.input?.["type=checkbox"]?.style;
  const tagCheckedStyle = tagConfig?.input?.["type=checkbox"]?.checkedStyle;
  const tagDisabledStyle = tagConfig?.input?.["type=checkbox"]?.disabledStyle;
  const tagErrorStyle = tagConfig?.input?.["type=checkbox"]?.errorStyle;

  return {
    tagStyle:  {
      ...borderStyle,
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
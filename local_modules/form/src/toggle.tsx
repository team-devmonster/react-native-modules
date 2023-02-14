import React, { useEffect, useMemo, useRef } from "react";
import { TextInput } from "react-native";
import { Controller } from 'react-hook-form';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import { FormValues, InputProps } from "./type";
import { useTags, useTagStyle, Button, TagGroupConfig, iconPattern, ToggleStyle } from '@team-devmonster/react-native-tags';
export interface ToggleProps<T extends FormValues = any> extends Omit<InputProps<T>, 'placeholder'> {
  style?:ToggleStyle,
  checkedStyle?:ToggleStyle,
  disabledStyle?:ToggleStyle,
  errorStyle?:ToggleStyle
}
export function Toggle<T extends FormValues>({
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
  }:ToggleProps<T>) 
{
  const { tagConfig } = useTags();
  
  const styles = useMemo(() => getStyles({ tagConfig }), [tagConfig?.toggle]);

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
          iconStyle,
          contentStyle
        ]
        = useTagStyle([
          iconPattern
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

        const widthRef = useRef<{ width:number, iconWidth:number }>({ width: 60, iconWidth: 30 });
        
        const contentBackgroundColor = useSharedValue(contentStyle.backgroundColor || '#cccccc');

        const iconBackgroundColor = useSharedValue(iconStyle.iconColor || '#ffffff');
        const iconPosition = useSharedValue(0);
        
        const contentAnimatedStyle = useAnimatedStyle(() => {
          return {
            backgroundColor: withTiming(contentBackgroundColor.value)
          }
        })
        
        const iconAnimatedStyle = useAnimatedStyle(() => {
          return {
            backgroundColor: withTiming(iconBackgroundColor.value),
            transform: [{ translateX: withTiming(iconPosition.value) }]
          }
        })

        useEffect(() => {
          if(value) {
            contentBackgroundColor.value = contentStyle.backgroundColor || '#FF6420';
            iconBackgroundColor.value = iconStyle.iconColor || '#FF6420';
            iconPosition.value = widthRef.current.width - widthRef.current.iconWidth;
          }
          else {
            contentBackgroundColor.value = contentStyle.backgroundColor || '#cccccc';
            iconBackgroundColor.value = iconStyle.iconColor || '#ffffff';
            iconPosition.value = 0;
          }
        }, [value]);

        return (
          <Button
            animated={false}
            fill="none"
            style={{
              width: contentStyle.width || 60,
              height: iconStyle.iconHeight || 30,
              justifyContent: 'center',
              borderRadius: 20
            }}
            disabled={disabled}
            onLayout={(e) => {
              const { width } = e.nativeEvent.layout;
              widthRef.current.width = width;
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
                style={{ position: 'absolute', top: -2, left: 0, width: 1, height: 1, zIndex: -1, opacity: 0 }}
              />
              <Animated.View 
                style={[{ 
                  width: '100%', 
                  height: 20, 
                  borderRadius: 20,
                  ...contentStyle
                }, contentAnimatedStyle]}></Animated.View>
              {
                iconStyle.icon ? 
                  iconStyle.icon
                :
                  <Animated.View 
                    onLayout={(e) => {
                      const { width } = e.nativeEvent.layout;
                      widthRef.current.iconWidth = width;
                    }}
                    style={[{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      width: iconStyle.iconWidth || 30,
                      height: iconStyle.iconHeight || 30,
                      borderRadius: 15
                    }, iconAnimatedStyle]}>
                  </Animated.View>
              }
          </Button>
        )
       }}
    />
  )
}

const getStyles = ({ tagConfig }:{ tagConfig:TagGroupConfig|undefined }) => {
  const tagStyle = tagConfig?.toggle?.style;
  const tagCheckedStyle = tagConfig?.toggle?.checkedStyle;
  const tagDisabledStyle = tagConfig?.toggle?.disabledStyle;
  const tagErrorStyle = tagConfig?.toggle?.errorStyle;

  return {
    tagStyle,
    tagCheckedStyle,
    tagDisabledStyle,
    tagErrorStyle
  }
}
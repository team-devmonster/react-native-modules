import React, { useEffect, useMemo, useRef } from "react";
import { TextInput, StyleSheet, Pressable } from "react-native";
import { Controller } from 'react-hook-form';
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import { FormValues, InputProps } from "./type";
import { useTags, useTagStyle, TagGroupConfig, ToggleStyle } from '@team-devmonster/react-native-tags';
import { formStyles, getIcon } from "./utils";
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
          contentStyle
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

        const { icon, iconStyle } = useMemo(() => getIcon({ iconObj: contentStyle}), [contentStyle.icon]);

        const widthRef = useRef<{ width:number, iconWidth:number }>({ width: 60, iconWidth: 30 });
        
        const animationProgress = useSharedValue(0);

        const contentBackgroundColor = useRef<string>('#cccccc');
        const contentCheckedBackgroundColor = useRef<string>('#FF6420');


        const iconBackgroundColor = useRef<string>('#ffffff');
        const iconCheckedBackgroundColor = useRef<string>('#FF6420');


        const iconPosition = useSharedValue(0);
        
        if(value) {
          contentCheckedBackgroundColor.current = contentStyle.backgroundColor || '#FF6420';
          iconCheckedBackgroundColor.current = iconStyle.color as string || '#FF6420';
        }
        else {
          contentBackgroundColor.current = contentStyle.backgroundColor || '#cccccc';
          iconBackgroundColor.current = iconStyle.color as string || '#cccccc';
        }

        const contentAnimatedStyle = useAnimatedStyle(() => {
          return {
            backgroundColor: interpolateColor(animationProgress.value, [0, 1], [contentBackgroundColor.current, contentCheckedBackgroundColor.current])
          }
        })
        
        const iconAnimatedStyle = useAnimatedStyle(() => {
          return {
            backgroundColor: interpolateColor(animationProgress.value, [0, 1], [iconBackgroundColor.current, iconCheckedBackgroundColor.current]),
            transform: [{ translateX: withTiming(iconPosition.value) }]
          }
        })
        useEffect(() => {
          if(value) {
            iconPosition.value = widthRef.current.width - widthRef.current.iconWidth;
            animationProgress.value = withTiming(1);
          }
          else {
            iconPosition.value = 0;
            animationProgress.value = withTiming(0);
          }
        }, [value]);

        console.log(contentStyle);
        return (
          <Pressable
            style={{
              width: contentStyle.width || 60,
              height: iconStyle.height || 30,
              justifyContent: 'center',
              borderRadius: 20
            }}
            disabled={disabled}
            onLayout={(e) => {
              const { width } = e.nativeEvent.layout;
              widthRef.current.width = width;
            }}
            onPress={(e) => {
              const newValue = !value;
              onChange(newValue);
              onClick?.({...e, value: newValue});
            }}>
              <TextInput
                showSoftInputOnFocus={false}
                ref={ref}
                onBlur={onBlur}
                style={formStyles.dummyInput}
              />
              <Animated.View 
                style={[{ 
                  width: '100%', 
                  height: 20, 
                  borderRadius: 20,
                  ...contentStyle
                }, contentAnimatedStyle]}></Animated.View>
              {
                icon ?
                  icon
                :
                  <Animated.View 
                    onLayout={(e) => {
                      const { width } = e.nativeEvent.layout;
                      widthRef.current.iconWidth = width;
                    }}
                    style={[defaultStyle.iconStyle, iconStyle as any, iconAnimatedStyle]}>
                  </Animated.View>
              }
          </Pressable>
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

const defaultStyle = StyleSheet.create({
  iconStyle: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 30,
    height: 30,
    borderRadius: 15
  }
})
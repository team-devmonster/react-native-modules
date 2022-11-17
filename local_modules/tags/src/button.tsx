import React, { forwardRef } from "react";
import { Pressable, Platform, useColorScheme, GestureResponderEvent, View, PressableProps } from "react-native";
import { gapPattern, TagModule, textPattern, useTags, useTagStyle } from "./core";
import { ButtonStyle } from "./type";
import { contrast, darken } from "./utils";

interface ButtonClickEvent extends GestureResponderEvent {
  [name:string]:any
}
export interface ButtonProps extends Omit<PressableProps, 'style'|'children'|'onBlur'|'onFocus'> {
  style?: ButtonStyle;
  disabledStyle?:ButtonStyle;
  color?: string;
  fill?: 'base' | 'outline' | 'translucent';
  onClick?: ((event: ButtonClickEvent) => void) | null | undefined;
  disabled?:boolean;
  children?:React.ReactNode
}

export const Button = forwardRef<View, ButtonProps>(({color:_color, fill:_fill, style, disabledStyle, disabled, onClick, children, ...rest}, ref) => {

  const colorScheme = useColorScheme();
  const { tagConfig } = useTags();
  const buttonTagStyle = tagConfig?.button?.style;
  const buttonTagDisabledStyle = tagConfig?.button?.disabledStyle;
  const color = _color || tagConfig?.button?.color;
  const fill = _fill || tagConfig?.button?.fill || 'base';

  let fillStyle:any;
  switch(fill) {
    case 'base':
      fillStyle = {
        background: {
          base: color,
          pressed: color ? darken(color, 30) : undefined,
          ripple: color ? darken(color, 30) : undefined
        },
        color: color ? contrast(color) : undefined
      }
      break;
    case 'outline':
      fillStyle = {
        background: {
          base: colorScheme === 'dark' ? '#000000' : '#ffffff',
          pressed: `${color}32` || undefined,
          ripple: `${color}32` || undefined
        },
        color: color || undefined,
        borderColor: color,
        borderWidth: 1
      }
      break;
    case 'translucent':
      fillStyle = {
        background: {
          base: color ? `${color}3C` : undefined,
          pressed: color || undefined,
          ripple: color || undefined
        },
        color: color || undefined
      }
      break;
  }

  const [
    textStyle, 
    gapStyle,
    buttonStyle
  ]
  = useTagStyle([
    textPattern,
    gapPattern
  ], [
    buttonTagStyle, 
    disabled ? buttonTagDisabledStyle : undefined,
    style,
    disabled ? disabledStyle : undefined
  ]);

  const gap = gapStyle?.gap;
  const rowGap = gapStyle?.rowGap;
  const columnGap = gapStyle?.columnGap;

  return (
    <Pressable 
      ref={ref}
      disabled={disabled}
      style={({ pressed }) => {
        return {
          borderWidth: fillStyle.borderWidth,
          borderColor: fillStyle.borderColor,
          backgroundColor: (!pressed || Platform.OS !== 'ios') ? fillStyle.background.base : fillStyle.background.pressed,
          ...buttonStyle,
          ...(gap ? {margin: -gap/2} : null),
          ...(rowGap ? {marginVertical: -rowGap/2} : null),
          ...(columnGap ? {marginHorizontal: -columnGap/2} : null)
        }
      }}
      android_ripple={{ color: fillStyle.background.ripple }}
      onPress={onClick}
      {...rest}>
      <TagModule 
        style={{
          color: fillStyle.color, 
          ...textStyle,
          ...(gap ? {margin: gap/2} : null),
          ...(rowGap ? {marginVertical: rowGap/2} : null),
          ...(columnGap ? {marginHorizontal: columnGap/2} : null)
        }}>{children}</TagModule>
    </Pressable>
  )
})
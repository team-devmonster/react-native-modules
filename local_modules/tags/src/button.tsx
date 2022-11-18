import React, { forwardRef, useLayoutEffect, useState } from "react";
import { Pressable, Platform, useColorScheme, GestureResponderEvent, View, PressableProps, ColorSchemeName } from "react-native";
import { gapPattern, TagModule, textPattern, useTags, useTagStyle } from "./core";
import { ButtonStyle } from "./type";
import { contrast, darken } from "./utils";

export interface ButtonClickEvent extends GestureResponderEvent {
  [name:string]:any
}

export type FillProps = 'base' | 'outline' | 'translucent' | 'none';
export interface ButtonProps extends Omit<PressableProps, 'style'|'children'|'onBlur'|'onFocus'> {
  style?: ButtonStyle;
  disabledStyle?:ButtonStyle;
  color?: string;
  fill?: FillProps;
  onClick?: ((event: ButtonClickEvent) => void) | null | undefined;
  disabled?:boolean;
  children?:React.ReactNode
}

export const Button = forwardRef<View, ButtonProps>(({color:_color, fill:_fill, style, disabledStyle, disabled, onClick, children, ...rest}, ref) => {

  const colorScheme = useColorScheme();
  const { tagConfig } = useTags();
  const fill = _fill || tagConfig?.button?.fill || 'base';
  const buttonTagStyle = tagConfig?.button?.style;
  const buttonTagDisabledStyle = tagConfig?.button?.disabledStyle;
  const color = _color || tagConfig?.button?.color;

  const [fillStyle, setFillStyle] = useState<FillStyle|undefined>(undefined);

  useLayoutEffect(() => {
    const fillStyle = getFillStyle({ colorScheme, color, fill, buttonTagStyle });
    setFillStyle(fillStyle);
  }, [color, fill]);

  const [
    textStyle, 
    gapStyle,
    buttonStyle
  ]
  = useTagStyle([
    textPattern,
    gapPattern
  ], [
    fill !== 'none' ? buttonTagStyle : undefined, 
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
          borderWidth: fillStyle?.borderWidth,
          borderColor: fillStyle?.borderColor,
          borderRadius: fillStyle?.borderRadius,
          backgroundColor: (!pressed || Platform.OS !== 'ios') ? fillStyle?.background?.base : fillStyle?.background?.pressed,
          ...buttonStyle,
          ...(gap ? {margin: -gap/2} : null),
          ...(rowGap ? {marginVertical: -rowGap/2} : null),
          ...(columnGap ? {marginHorizontal: -columnGap/2} : null)
        }
      }}
      android_ripple={{ color: fillStyle?.background.ripple }}
      onPress={onClick}
      {...rest}>
      <TagModule
        style={{
          color: fillStyle?.color,
          ...textStyle,
          ...(gap ? {margin: gap/2} : null),
          ...(rowGap ? {marginVertical: rowGap/2} : null),
          ...(columnGap ? {marginHorizontal: columnGap/2} : null)
        }}>{children}</TagModule>
    </Pressable>
  )
})


interface FillStyle {
  background: {
    base?: string,
    pressed?: string,
    ripple?: string
  },
  color?: string,
  borderColor?: string,
  borderWidth?: number,
  borderRadius?: number
}
const getFillStyle = ({ colorScheme, color, fill, buttonTagStyle }:{colorScheme:ColorSchemeName, color?: string, fill: FillProps, buttonTagStyle?:ButtonStyle}):FillStyle => {
  switch(fill) {
    case 'outline':
      return {
        background: {
          base: colorScheme === 'dark' ? '#000000' : '#ffffff',
          pressed: color ? `${color}32` : undefined,
          ripple: color ? `${color}32` : undefined
        },
        color: color,
        borderColor: color,
        borderWidth: 1
      }
    case 'translucent':
      return {
        background: {
          base: color ? `${color}3C` : undefined,
          pressed: color,
          ripple: color
        },
        color: color
      }
    case 'none':
      return {
        background: {
          base: color,
          pressed: color ? darken(color, 30) : undefined,
          ripple: color ? darken(color, 30) : undefined
        },
        color: color ? contrast(color) : undefined,
        borderRadius: buttonTagStyle?.borderRadius
      }
    default:
      return {
        background: {
          base: color,
          pressed: color ? darken(color, 30) : undefined,
          ripple: color ? darken(color, 30) : undefined
        },
        color: color ? contrast(color) : undefined
      }
  }
}
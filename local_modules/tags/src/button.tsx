import React, { useMemo } from "react";
import { Pressable, Platform, useColorScheme, GestureResponderEvent, View, PressableProps, ColorSchemeName } from "react-native";

import { borderPattern, gapPattern, layoutPattern, marginPattern, shadowPattern, TagModule, textPattern, useTags, useTagStyle } from "./core";
import { ButtonStyle, FillProps, TagElement } from "./type";
import { contrast, darken, lighten } from "./utils";

export interface ButtonClickEvent extends GestureResponderEvent {
  [name:string]:any
}

export interface ButtonProps extends Omit<PressableProps, 'style'|'children'|'onBlur'|'onFocus'> {
  style?: ButtonStyle;
  disabledStyle?:ButtonStyle;
  color?: string;
  fill?: FillProps;
  onClick?: ((event: ButtonClickEvent) => void) | null | undefined;
  disabled?:boolean;
  children?:TagElement
}

export const Button = ({color:_color, fill:_fill, style, disabledStyle, disabled, onClick, onLayout, children, ...rest}:ButtonProps) => {

  const colorScheme = useColorScheme();
  const { tagConfig } = useTags();
  const fill = _fill || tagConfig?.button?.fill || 'base';
  const buttonTagStyle = tagConfig?.button?.style;
  const buttonTagDisabledStyle = tagConfig?.button?.disabledStyle;
  const color = _color || tagConfig?.button?.color;

  const fillStyle = useMemo(() => getFillStyle({ colorScheme, color, fill, buttonTagStyle }), [colorScheme, color, fill, buttonTagStyle]);

  const [
    layoutStyle,
    shadowStyle,
    borderStyle,
    marginStyle,
    gapStyle,
    textStyle,
    viewStyle
  ]
  = useTagStyle([
    layoutPattern,
    shadowPattern,
    borderPattern,
    marginPattern,
    gapPattern,
    textPattern,
  ], [
    fill !== 'none' ? buttonTagStyle : undefined, 
    disabled ? buttonTagDisabledStyle : undefined,
    style,
    disabled ? disabledStyle : undefined
  ]);
  
  const rowGap = gapStyle?.rowGap || gapStyle?.gap || 0;
  const columnGap = gapStyle?.columnGap || gapStyle?.gap || 0;

  const gapContainerStyle = useMemo(() => ({
    marginTop: -rowGap/2,
    marginBottom: -rowGap/2,
    marginLeft: -columnGap/2,
    marginRight: -columnGap/2
  }), [rowGap, columnGap]);

  const borderRadiusStyle = useMemo(() => ({
    borderTopLeftRadius: borderStyle?.borderTopLeftRadius ?? borderStyle?.borderRadius ?? fillStyle?.borderRadius,
    borderTopRightRadius: borderStyle?.borderTopRightRadius ?? borderStyle?.borderRadius ?? fillStyle?.borderRadius,
    borderBottomLeftRadius: borderStyle?.borderBottomLeftRadius ?? borderStyle?.borderRadius ?? fillStyle?.borderRadius,
    borderBottomRightRadius: borderStyle?.borderBottomRightRadius ?? borderStyle?.borderRadius ?? fillStyle?.borderRadius
  }), [borderStyle, fillStyle]);

  if(!Object.keys(gapStyle).length) {
    return (
      <View style={{
        ...layoutStyle,
        ...shadowStyle,
        ...marginStyle,
        flex: viewStyle.flex,
        ...borderRadiusStyle
      }}>
        <View
          style={{
            flex: 1,
            overflow: 'hidden',
            borderWidth: fillStyle?.borderWidth,
            borderColor: fillStyle?.borderColor,
            ...borderStyle
          }}>
          <Pressable
            disabled={disabled}
            style={({ pressed }) => {
              return {
                flex: 1,
                ...borderRadiusStyle,
                backgroundColor: (!pressed || Platform.OS !== 'ios') ? fillStyle?.background?.base : fillStyle?.background?.pressed,
                ...viewStyle
              }
            }}
            android_ripple={{ color: fillStyle?.background.ripple }}
            onPress={onClick}
            {...rest}>
            <TagModule
              style={{
                color: fillStyle?.color,
                ...textStyle
              }}>{children}</TagModule>
          </Pressable>
        </View>
      </View>
    )
  }
  else  {
    return (
      <View style={{
        ...layoutStyle,
        ...shadowStyle,
        ...marginStyle,
        flex: viewStyle.flex,
        ...borderRadiusStyle,
      }}>
        <View style={{
          flex: 1,
          overflow: 'hidden',
          borderWidth: fillStyle?.borderWidth,
          borderColor: fillStyle?.borderColor,
          ...borderRadiusStyle,
          ...borderStyle
        }}>
          <Pressable
            disabled={disabled}
            style={({ pressed }) => {
              return {
                flex: 1,
                ...borderRadiusStyle,
                ...gapContainerStyle,
                ...viewStyle,
                ...(pressed && Platform.OS === 'ios' ? { backgroundColor: fillStyle?.background?.pressed } : null)
              }
            }}
            android_ripple={{ color: fillStyle?.background.ripple }}
            onPress={onClick}
            {...rest}>
            <TagModule
              style={{
                color: fillStyle?.color,
                ...textStyle,
                ...(rowGap ? {marginVertical: rowGap/2} : null),
                ...(columnGap ? {marginHorizontal: columnGap/2} : null)
              }}>{children}</TagModule>
          </Pressable>
        </View>
      </View>
    )
  }
}


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
          base: color ? `${color}32` : undefined,
          pressed: color ? `${color}4b` : undefined,
          ripple: color ? `${color}4b` : undefined,
        },
        color: color
      }
    case 'none':
      return {
        background: {
          base: color,
          pressed: color ? colorScheme === 'dark' ? lighten(color, 30) : darken(color, 30) : undefined,
          ripple: color ? colorScheme === 'dark' ? lighten(color, 30) : darken(color, 30) : undefined
        },
        color: color ? contrast(color) : undefined,
        borderRadius: buttonTagStyle?.borderRadius
      }
    default:
      return {
        background: {
          base: color,
          pressed: color ? colorScheme === 'dark' ? lighten(color, 30) : darken(color, 30) : undefined,
          ripple: color ? colorScheme === 'dark' ? lighten(color, 30) : darken(color, 30) : undefined
        },
        color: color ? contrast(color) : undefined
      }
  }
}
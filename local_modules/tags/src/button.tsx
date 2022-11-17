import React, { forwardRef } from "react";
import { Pressable, Platform, useColorScheme, GestureResponderEvent, View } from "react-native";
import { borderPattern, layoutPattern, marginPattern, shadowPattern, TagModule, textPattern, useTags, useTagStyle } from "./core";
import { ButtonStyle, TagProps } from "./type";
import { contrast, darken } from "./utils";

export interface ButtonProps extends TagProps {
  style?: ButtonStyle;
  disabledStyle?:ButtonStyle;
  color?: string;
  fill?: 'base' | 'outline' | 'translucent';
  onClick?: ((event: GestureResponderEvent) => void) | null | undefined;
  disabled?:boolean;
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
    layoutStyle, 
    shadowStyle, 
    borderStyle, 
    marginStyle, 
    textStyle, 
    etcStyle
  ]
  = useTagStyle([
    layoutPattern, 
    shadowPattern, 
    borderPattern, 
    marginPattern, 
    textPattern
  ], [
    buttonTagStyle, 
    disabled ? buttonTagDisabledStyle : undefined,
    style,
    disabled ? disabledStyle : undefined
  ]);

  const innerWidth = () => {
    if(typeof layoutStyle?.width === 'number') {
      if(borderStyle?.borderWidth) {
        return layoutStyle.width - borderStyle.borderWidth*2;
      }
      else {
        return layoutStyle?.width;
      }
    }
    else {
      return layoutStyle?.width;
    }
  }
  const innerHeight = () => {
    if(typeof layoutStyle?.height === 'number') {
      if(borderStyle?.borderWidth) {
        return layoutStyle.height - borderStyle.borderWidth*2;
      }
      else {
        return layoutStyle?.height;
      }
    }
    else {
      return layoutStyle?.height;
    }
  }

  return (
    <Pressable 
      ref={ref}
      disabled={disabled}
      style={({ pressed }) => {
        return {
          ...layoutStyle,
          width: innerWidth(),
          height: innerHeight(),
          borderWidth: fillStyle.borderWidth,
          borderColor: fillStyle.borderColor,
          ...shadowStyle,
          ...marginStyle,
          ...borderStyle,
          ...etcStyle,
          backgroundColor: (!pressed || Platform.OS !== 'ios') ? (etcStyle?.backgroundColor || fillStyle.background.base) : fillStyle.background.pressed,
        }
      }}
      android_ripple={{ color: fillStyle.background.ripple }}
      onPress={onClick}
      {...rest}>
      <TagModule 
        style={{
          color: fillStyle.color, 
          ...textStyle
        }}>{children}</TagModule>
    </Pressable>
  )
})
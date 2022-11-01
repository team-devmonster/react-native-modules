import React from "react";
import { View, Pressable, GestureResponderEvent, Platform, useColorScheme } from "react-native";
import { TagModule, TagStyle, useTags } from "./tags";
import { borderPattern, contrast, darken, layoutPattern, marginPattern, shadowPattern, textPattern, useTagStyle } from "./utils";

interface ButtonProps {
  children?: React.ReactNode;
  style?: TagStyle;
  color?: string;
  fill?: 'base' | 'outline';
  onClick?: ((event: GestureResponderEvent) => void) | null | undefined;
  disabled?:boolean;
}

export const Button = ({color, fill = 'base', style, disabled, onClick, children, ...rest}:ButtonProps) => {

  const colorScheme = useColorScheme();
  const { tagStyle } = useTags();
  const buttonTagStyle = tagStyle?.['button'];

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
          base: colorScheme === 'dark' ? 'black' : 'white',
          pressed: color || undefined,
          ripple: color || undefined
        },
        color: color || undefined,
        borderColor: color,
        borderWidth: 1
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
  ], [buttonTagStyle, style]);

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
    <View 
      style={{
        ...layoutStyle,
        ...shadowStyle,
        ...marginStyle,
        overflow: 'hidden',
        borderWidth: fillStyle.borderWidth,
        borderColor: fillStyle.borderColor,
        ...borderStyle
      }}>
        <Pressable 
          disabled={disabled} 
          style={({ pressed }) => {
            return {
              ...layoutStyle,
              width: innerWidth(),
              height: innerHeight(),
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
    </View>
  )
}
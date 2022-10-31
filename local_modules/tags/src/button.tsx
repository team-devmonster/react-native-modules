import React from "react";
import { Platform, View, Pressable, GestureResponderEvent } from "react-native";
import { TagModule, TagStyle, useTags } from "./tags";
import { borderPattern, contrast, darken, layoutPattern, marginPattern, shadowPattern, textPattern, useTagStyle } from "./utils";

interface ButtonProps {
  children?: React.ReactNode;
  style?: TagStyle;
  color?: string;
  fill?: 'default' | 'translucent';
  onClick?: ((event: GestureResponderEvent) => void) | null | undefined;
  disabled?:boolean;
}

export const Button = ({color, style, disabled, onClick, children, ...rest}:ButtonProps) => {

  const { tagStyle } = useTags();
  const buttonTagStyle = tagStyle?.['button'];

  const background = {
    base: color,
    pressed: color ? darken(color, 30) : undefined,
    ripple: color ? darken(color, 30) : undefined
  }
  const text = {
    color: color ? contrast(color) : undefined
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

  return (
    <View style={{
      borderRadius: borderStyle?.borderRadius,
      ...layoutStyle,
      ...shadowStyle,
      ...marginStyle
    }}>
      <View style={{ 
        overflow: 'hidden',
        ...layoutStyle,
        ...borderStyle,
      }}>
        <Pressable 
          disabled={disabled} 
          style={({ pressed }) => {
            return {
              backgroundColor: (!pressed || Platform.OS !== 'ios') ? background.base : background.pressed,
              ...layoutStyle,
              ...etcStyle
            }
          }}
          android_ripple={{ color: background.ripple }}
          onPress={onClick}
          {...rest}>
          <TagModule 
            style={{
              ...text, 
              ...textStyle
            }}>{children}</TagModule>
        </Pressable>
      </View>
    </View>
  )
}
import React, { useEffect, useState } from "react";
import { Platform, View, Pressable, GestureResponderEvent } from "react-native";
import { TagModule, TagStyle, useTags } from "./tags";
import { contrast, darken } from "./utils";

const textPattern = /^(color|font|text|lineHeight)/;
const layoutPattern = /^(flex|width|height)$/;
const shadowPattern = /^(shadow|elevation)/;
const borderPattern = /^(border)/;
const marginPattern = /^(margin)/;

interface ButtonProps {
  children?: React.ReactNode;
  style?: TagStyle;
  color?: string;
  fill?: 'default' | 'translucent';
  onClick?: ((event: GestureResponderEvent) => void) | null | undefined;
  disabled?:boolean;
}

export const Button = ({color = '#ffffff', style, disabled, onClick, children, ...rest}:ButtonProps) => {

  const { tagStyle } = useTags();
  const buttonTagStyle = tagStyle?.['button'];

  const [newStyle, setNewStyle] = useState<{layoutStyle:any, shadowStyle:any, borderStyle:any, marginStyle:any, textStyle:any, etcStyle:any}>();

  const background = {
    base: color,
    pressed: darken(color, 30),
    ripple: darken(color, 30)
  }
  const text = {
    color: contrast(color)
  }

  useEffect(() => {
    const entries = Object.entries({...buttonTagStyle, ...style as any});
    let layoutStyle:any = {};
    let shadowStyle:any = {};
    let borderStyle:any = {};
    let marginStyle:any = {};
    let textStyle:any = {};
    let etcStyle:any = {}

    
    for(let i = 0; i < entries.length; i++) {
      const key = entries[i][0];
      const value = entries[i][1];

      if(layoutPattern.test(key)) {
        layoutStyle[key] = value;
      }
      else if(shadowPattern.test(key)) {
        shadowStyle[key] = value;
      }
      else if(borderPattern.test(key)) {
        borderStyle[key] = value;
      }
      else if(marginPattern.test(key)) {
        marginStyle[key] = value;
      }
      else if(textPattern.test(key)) {
        textStyle[key] = value;
      }
      else {
        etcStyle[key] = value;
      }
    }
    setNewStyle({ layoutStyle, shadowStyle, borderStyle, marginStyle, textStyle, etcStyle });
  }, [buttonTagStyle, style]);

  return (
    <View style={{
      borderRadius: newStyle?.borderStyle.borderRadius,
      ...newStyle?.layoutStyle,
      ...newStyle?.shadowStyle,
      ...newStyle?.marginStyle
    }}>
      <View style={{ 
        overflow: 'hidden',
        ...newStyle?.layoutStyle,
        ...newStyle?.borderStyle,
      }}>
        <Pressable 
          disabled={disabled} 
          style={({ pressed }) => {
            return {
              backgroundColor: (!pressed || Platform.OS !== 'ios') ? background.base : background.pressed,
              ...newStyle?.layoutStyle,
              ...newStyle?.etcStyle
            }
          }}
          android_ripple={{ color: background.ripple }}
          onPress={onClick}
          {...rest}>
          <TagModule 
            style={{
              ...text, 
              ...newStyle?.textStyle
            }}>{children}</TagModule>
        </Pressable>
      </View>
    </View>
  )
}
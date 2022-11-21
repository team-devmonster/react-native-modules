import React, { useEffect, useLayoutEffect, useState } from "react";
import { Pressable, Platform, useColorScheme, GestureResponderEvent, View, PressableProps, ColorSchemeName } from "react-native";
import MaskedView from '@react-native-masked-view/masked-view';

import { borderPattern, gapPattern, layoutPattern, marginPattern, shadowPattern, TagModule, textPattern, useTags, useTagStyle } from "./core";
import { ButtonStyle, FillProps } from "./type";
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
  children?:React.ReactNode
}

export const Button = ({color:_color, fill:_fill, style, disabledStyle, disabled, onClick, onLayout, children, ...rest}:ButtonProps) => {

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
  }, [colorScheme, color, fill, buttonTagStyle]);

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


  const [size, setSize] = useState({ 
    left: 0,
    top: 0,
    width: 0, 
    height: 0
  });
  const [gapContainerStyle, setGapContainerStyle] = useState({
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0
  });

  useEffect(() => {
    if(Object.keys(gapStyle).length) {
      setGapContainerStyle({
        marginTop: -rowGap/2,
        marginBottom: -rowGap/2,
        marginLeft: -columnGap/2,
        marginRight: -columnGap/2,
        paddingTop: (borderStyle.borderTopWidth || borderStyle.borderWidth || 0),
        paddingBottom: (borderStyle.borderBottomWidth || borderStyle.borderWidth || 0),
        paddingLeft: (borderStyle.borderLeftWidth || borderStyle.borderWidth || 0),
        paddingRight: (borderStyle.borderRightWidth || borderStyle.borderWidth || 0)
      })
    }
  }, [borderStyle, gapStyle]);
  
  const rowGap = gapStyle?.rowGap || gapStyle?.gap || 0;
  const columnGap = gapStyle?.columnGap || gapStyle?.gap || 0;


  if(!Object.keys(gapStyle).length) {
    return (
      <View style={{
        ...layoutStyle,
        ...shadowStyle,
        ...marginStyle,
        flex: viewStyle.flex,
        borderRadius: borderStyle.borderRadius || fillStyle?.borderRadius,
      }}>
        <View
          style={{
            ...layoutStyle,
            flex: viewStyle.flex,
            overflow: 'hidden',
            borderWidth: fillStyle?.borderWidth,
            borderColor: fillStyle?.borderColor,
            borderRadius: fillStyle?.borderRadius,
            ...borderStyle
          }}>
          <Pressable
            disabled={disabled}
            style={({ pressed }) => {
              return {
                ...layoutStyle,
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
        borderRadius: borderStyle.borderRadius || fillStyle?.borderRadius
      }}>
        <MaskedView
          style={{
            ...layoutStyle,
            backgroundColor: 'transparent',
            ...gapContainerStyle
          }}
          onLayout={(e) => {
            const { height, width } = e.nativeEvent.layout;
            setSize({
              height: Math.floor(height) - rowGap,
              width: Math.floor(width) - columnGap,
              left: columnGap/2,
              top: rowGap/2
            })
            onLayout?.(e);
          }}
          maskElement={
            <View style={{
              position: 'absolute',
              backgroundColor: 'black',
              ...size,
              borderRadius: borderStyle.borderRadius
            }}>
            </View>
          }>
          <Pressable
            disabled={disabled}
            style={({ pressed }) => {
              console.log({
                ...layoutStyle,
                backgroundColor: (!pressed || Platform.OS !== 'ios') ? fillStyle?.background?.base : fillStyle?.background?.pressed,
                ...viewStyle
              });
              return {
                ...layoutStyle,
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
                ...textStyle,
                ...(rowGap ? {marginVertical: rowGap/2} : null),
                ...(columnGap ? {marginHorizontal: columnGap/2} : null)
              }}>{children}</TagModule>
          </Pressable>
          <View
            pointerEvents="none"
            style={{
              position: 'absolute',
              ...size,
              borderWidth: fillStyle?.borderWidth,
              borderColor: fillStyle?.borderColor,
              borderRadius: fillStyle?.borderRadius,
              ...borderStyle
            }}></View>
        </MaskedView>
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
          pressed: color ? `${color}3C` : undefined,
          ripple: color ? `${color}3C` : undefined
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
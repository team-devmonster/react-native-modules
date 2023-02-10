import React, { useMemo, useState } from "react";
import { Pressable, View } from "react-native";

import { borderPattern, gapPattern, layoutPattern, marginPattern, shadowPattern, TagModule, textPattern, useTags, useTagStyle } from "./core";
import { ButtonProps, FillProps, TagGroupConfig } from "./type";
import { darken, getLightOrDark, lighten } from "./utils";

export const Button = ({ 
    tag:_,
    color:inlineColor, 
    fill:_fill, 
    style, 
    disabledStyle, 
    activeStyle, 
    disabled, 
    onClick, 
    onLayout, 
    children, 
    ...rest}:ButtonProps
  ) => {

  const { tagConfig } = useTags();
  
  const fill = _fill || tagConfig?.button?.fill || 'base';
  const color = useMemo(() => inlineColor || tagConfig?.button?.color || '#FF6420', [inlineColor, tagConfig?.button?.color]);
  const lightOrDark = useMemo(() => getLightOrDark(color), [color]);

  const styles = useMemo(() => getStyles({ tagConfig, color, inlineColor, lightOrDark, fill }), [tagConfig?.button, color, inlineColor, lightOrDark, fill]);
  const [active, setActive] = useState(false);

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
    styles.tagStyle, 
    disabled ? styles.tagDisabledStyle : undefined,
    active ? styles.tagActiveStyle : undefined,
    style,
    disabled ? disabledStyle : undefined,
    active ? activeStyle : undefined
  ]);
  const borderRadiusStyle = useMemo(() => ({
    borderTopLeftRadius: borderStyle?.borderTopLeftRadius ?? borderStyle?.borderRadius,
    borderTopRightRadius: borderStyle?.borderTopRightRadius ?? borderStyle?.borderRadius,
    borderBottomLeftRadius: borderStyle?.borderBottomLeftRadius ?? borderStyle?.borderRadius,
    borderBottomRightRadius: borderStyle?.borderBottomRightRadius ?? borderStyle?.borderRadius
  }), [borderStyle]);
  
  // gaps
  const rowGap = gapStyle?.rowGap || gapStyle?.gap || 0;
  const columnGap = gapStyle?.columnGap || gapStyle?.gap || 0;

  const gapContainerStyle = useMemo(() => ({
    marginTop: -rowGap/2,
    marginBottom: -rowGap/2,
    marginLeft: -columnGap/2,
    marginRight: -columnGap/2
  }), [rowGap, columnGap]);

  const onPressStart = () => {
    setActive(true);
  }
  const onPressEnd = () => {
    setActive(false);
  }

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
            ...borderStyle
          }}>
          <Pressable
            disabled={disabled}
            style={({ pressed }) => {
              return {
                flex: 1,
                ...borderRadiusStyle,
                ...viewStyle
              }
            }}
            android_ripple={{ color: viewStyle.backgroundColor }}
            onPressIn={onPressStart}
            onPressOut={onPressEnd}
            onPress={onClick}
            {...rest}>
            <TagModule
              style={{
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
          ...borderStyle
        }}>
          <Pressable
            disabled={disabled}
            style={({ pressed }) => {
              return {
                flex: 1,
                ...borderRadiusStyle,
                ...gapContainerStyle,
                ...viewStyle
              }
            }}
            android_ripple={{ color: viewStyle.rippleColor }}
            onPressIn={onPressStart}
            onPressOut={onPressEnd}
            onPress={onClick}
            {...rest}>
            <TagModule
              style={{
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

const getStyles = ({ tagConfig, color, fill, inlineColor, lightOrDark }:{tagConfig:TagGroupConfig|undefined, color:string, fill:FillProps, inlineColor?:string, lightOrDark:'light'|'dark'}) => {

  const tagStyle = tagConfig?.button?.style;
  const tagDisabledStyle = tagConfig?.button?.disabledStyle;
  const tagActiveStyle = tagConfig?.button?.activeStyle;
  const tagHoverStyle = tagConfig?.button?.hoverStyle;

  const fillType:`fill=${FillProps}` = `fill=${fill}`;
  const tagFillStyle = tagConfig?.button?.[fillType]?.style;
  const tagFillDisabeldStyle = tagConfig?.button?.[fillType]?.disabledStyle;
  const tagFillActiveStyle = tagConfig?.button?.[fillType]?.activeStyle;
  const tagFillHoverStyle = tagConfig?.button?.[fillType]?.hoverStyle;

  const defaultStyle = (() => {
    switch(fill) {
      case 'outline':
        return {
          style: {
            backgroundColor: 'transparent',
            rippleColor: `${color}32`,
            color: color,
            borderColor: color,
            borderWidth: 1
          },
          activeStyle: {
            backgroundColor: `${color}19`
          },
          hoverStyle: {
            backgroundColor: `${color}19`
          }
        }
      case 'translucent':
        return {
          style: {
            backgroundColor: `${color}32`,
            rippleColor: `${color}5A`,
            color: color
          },
          activeStyle: {
            backgroundColor: `${color}4b`
          }
        }
      case 'clear':
        return {
          style: {
            backgroundColor: 'transparent',
            rippleColor: `${color}32`,
            color: color
          },
          activeStyle: {
            backgroundColor: `${color}19`
          },
          hoverStyle: {
            backgroundColor: `${color}19`
          }
        }
      case 'none':
        return {
          style: {
            backgroundColor: inlineColor || 'transparent',
            rippleColor: lightOrDark === 'dark' ? lighten(color, 55) : darken(color, 55)
          },
          activeStyle: {
            backgroundColor: lightOrDark === 'dark' ? lighten(color, 30) : darken(color, 30)
          },
          hoverStyle: {
            backgroundColor: lightOrDark === 'dark' ? lighten(color, 15) : darken(color, 15)
          }
        }
      default: // base
        return {
          style: {
            backgroundColor: color,
            rippleColor: lightOrDark === 'dark' ? lighten(color, 55) : darken(color, 55),
            color: lightOrDark === 'dark' ? '#ffffff' : '#000000'
          },
          activeStyle: {
            backgroundColor: lightOrDark === 'dark' ? lighten(color, 30) : darken(color, 30)
          },
          hoverStyle: {
            backgroundColor: lightOrDark === 'dark' ? lighten(color, 15) : darken(color, 15)
          }
        }
    }
  })()

  if(color === 'transparent') {
    defaultStyle.style.backgroundColor = 'transparent';
    defaultStyle.style.rippleColor = 'transparent';
    defaultStyle.activeStyle.backgroundColor = 'transparent';
  }

  if(fill !== 'none') {
    return {
      tagStyle: {
        ...defaultStyle.style,
        ...tagStyle,
        ...tagFillStyle
      },
      tagDisabledStyle: {
        ...tagDisabledStyle,
        ...tagFillDisabeldStyle
      },
      tagActiveStyle: {
        ...defaultStyle.activeStyle,
        ...tagActiveStyle,
        ...tagFillActiveStyle
      },
      tagHoverStyle: {
        ...defaultStyle.hoverStyle,
        ...tagHoverStyle,
        ...tagFillHoverStyle
      }
    }
  }
  else {
    return {
      tagStyle: {
        ...defaultStyle.style,
        ...tagFillStyle
      },
      tagDisabledStyle: {
        ...tagDisabledStyle,
        ...tagFillDisabeldStyle
      },
      tagActiveStyle: {
        ...defaultStyle.activeStyle,
        ...tagActiveStyle,
        ...tagFillActiveStyle
      },
      tagHoverStyle: {
        ...defaultStyle.hoverStyle,
        ...tagFillHoverStyle
      }
    }
  }
}
import React, { forwardRef, LegacyRef, useMemo, useRef, useState } from "react";
import { Pressable, View } from "react-native";

import { borderPattern, gapPattern, layoutPattern, marginPattern, shadowPattern, TagModule, textPattern, useTags, useTagStyle } from "./core";
import { ButtonProps, FillProps, TagGroupConfig } from "./type";
import { darken, getLightOrDark, lighten } from "./utils";

export const Button = forwardRef(({
    tag:_,
    animated:inlineAnimated,
    color:inlineColor, 
    fill:_fill, 
    style, 
    disabledStyle, 
    activeStyle, 
    disabled, 
    onClick, 
    onLayout, 
    children,
    ...rest}:ButtonProps,
    ref:LegacyRef<View>
  ) => {

  const { tagConfig } = useTags();
  
  const animated = inlineAnimated ?? tagConfig?.button?.animated ?? true;
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
    style,
    animated && active ? styles.tagActiveStyle : undefined,
    animated && active ? activeStyle : undefined,
    disabled ? styles.tagDisabledStyle : undefined,
    disabled ? disabledStyle : undefined
  ]);
  const borderRadiusStyle = useMemo(() => ({
    borderTopLeftRadius: borderStyle?.borderTopLeftRadius ?? borderStyle?.borderRadius,
    borderTopRightRadius: borderStyle?.borderTopRightRadius ?? borderStyle?.borderRadius,
    borderBottomLeftRadius: borderStyle?.borderBottomLeftRadius ?? borderStyle?.borderRadius,
    borderBottomRightRadius: borderStyle?.borderBottomRightRadius ?? borderStyle?.borderRadius
  }), Object.entries(borderStyle));

  // 아무때나 flex: 1 줘버리면 높이값이 사라질 때가 있음. 정확한 케이스에만 주어야 함.
  // 정확한 규칙은 모르겠으나, flex: 1을 줄 때 가끔 생기는 것은 확실함...
  const calcInnerSize = useMemo(() => ({
    height: (() => {
      if(!layoutStyle.height || layoutStyle.height === 'auto') return null;
      else return '100%';
    })(),
    width: (() => {
      if(!layoutStyle.width || layoutStyle.width == 'auto') return null;
      else return '100%';
    })(),
    flex: (() => {
      if(!layoutStyle.flex && !layoutStyle.aspectRatio) return null;
      else return 1;
    })()
  }), [layoutStyle.height, layoutStyle.width, layoutStyle.flex]);
  
  // gaps
  const rowGap = useMemo(() => gapStyle?.rowGap || gapStyle?.gap || 0, [gapStyle?.rowGap, gapStyle?.gap]);
  const columnGap = useMemo(() => gapStyle?.columnGap || gapStyle?.gap || 0, [gapStyle?.columnGap, gapStyle?.gap]);

  const gapContainerStyle = useMemo(() => ({
    marginTop: -rowGap/2,
    marginBottom: -rowGap/2,
    marginLeft: -columnGap/2,
    marginRight: -columnGap/2
  }), [rowGap, columnGap]);

  // events
  const onPressStart = () => {
    setActive(true);
  }
  const onPressEnd = () => {
    setActive(false);
  }

  const clickTimeout = useRef<any>();
  const clickDelay = useRef(false);

  // render
  if(!rowGap && !columnGap) {
    return (
      <View 
        ref={ref}
        style={{
          ...layoutStyle,
          ...shadowStyle,
          ...marginStyle,
          ...borderRadiusStyle
        }}
        onLayout={onLayout}>
        <View
          style={{
            ...calcInnerSize,
            overflow: 'hidden',
            ...borderStyle
          }}>
          <Pressable
            disabled={disabled}
            style={{
              ...calcInnerSize,
              ...borderRadiusStyle,
              ...viewStyle
            }}
            android_ripple={animated ? { color: viewStyle.backgroundColor } : null}
            onPressIn={onPressStart}
            onPressOut={onPressEnd}
            onPress={(e) => {
              clearTimeout(clickTimeout.current);
              clickTimeout.current = setTimeout(() => {
                clickDelay.current = false;
              }, 1000);
              
              if(clickDelay.current) return;

              clickDelay.current = true;
              onClick?.(e);
            }}
            {...rest}>
            <TagModule
              style={textStyle}
            >{children}</TagModule>
          </Pressable>
        </View>
      </View>
    )
  }
  else  {
    return (
      <View 
        ref={ref}
        style={{
          ...layoutStyle,
          ...shadowStyle,
          ...marginStyle,
          ...borderRadiusStyle
        }}>
        <View style={{
          ...calcInnerSize,
          overflow: 'hidden',
          ...borderStyle
        }}
        onLayout={onLayout}>
          <Pressable
            disabled={disabled}
            style={{
              ...calcInnerSize,
              ...borderRadiusStyle,
              ...gapContainerStyle,
              ...viewStyle
            }}
            android_ripple={animated ? { color: viewStyle.backgroundColor } : null}
            onPressIn={onPressStart}
            onPressOut={onPressEnd}
            onPress={onClick}
            {...rest}>
            <TagModule
              style={textStyle}
              rowGap={rowGap}
              columnGap={columnGap}
            >{children}</TagModule>
          </Pressable>
        </View>
      </View>
    )
  }
});
Button.displayName = 'Button';

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
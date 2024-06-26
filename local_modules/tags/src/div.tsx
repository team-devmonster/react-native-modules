import React, { forwardRef, LegacyRef, useMemo } from "react";
import { View } from "react-native";
import { borderPattern, gapPattern, layoutPattern, marginPattern, shadowPattern, TagModule, textPattern, useTags, useTagStyle } from "./core";
import { TagProps } from "./type";
import { useCreateStyle } from "./useCreateStyle";

export const Div = forwardRef(({style, children, numberOfLines, ellipsizeMode, ...rest}:TagProps, ref:LegacyRef<View>) => {

  const { tagConfig } = useTags();
  const divTagStyle = tagConfig?.div?.style;

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
    textPattern
  ], [ 
    divTagStyle, 
    style 
  ]);

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
      if(!layoutStyle.flex) return null;
      else return 1;
    })()
  }), [layoutStyle.height, layoutStyle.width, layoutStyle.flex]);
  
  const rowGap = useMemo(() => gapStyle?.rowGap || gapStyle?.gap || 0, [gapStyle?.rowGap, gapStyle?.gap]);
  const columnGap = useMemo(() => gapStyle?.columnGap || gapStyle?.gap || 0, [gapStyle?.columnGap, gapStyle?.gap]);

  const { containerStyle, gapOuterStyle, gapContainerStyle } = useCreateStyle({
    containerStyle: {
      ...layoutStyle,
      ...shadowStyle,
      ...marginStyle,
      ...viewStyle,
      ...borderStyle
    },
    gapOuterStyle: {
      ...layoutStyle,
      ...shadowStyle,
      ...marginStyle,
      ...borderStyle
    },
    gapContainerStyle: {
      // 높이 넓이 최저값 지정해서 아이템이 없을 때도, 터지지 않게 처리
      minWidth: rowGap,
      minHeight: columnGap,
      // 각 케이스별로 계산된 값 입력
      ...calcInnerSize,
      ...viewStyle,
      marginTop: -rowGap/2,
      marginBottom: -rowGap/2,
      marginLeft: -columnGap/2,
      marginRight: -columnGap/2
    }
  }, [divTagStyle, style]);

  if(!rowGap && !columnGap) {
    return (
      <View
        ref={ref} {...rest} style={containerStyle}>
        <TagModule
          style={textStyle}
          numberOfLines={numberOfLines}
          ellipsizeMode={ellipsizeMode}
          >{children}</TagModule>
      </View>
    )
  }
  else {
    return (
      <View
        ref={ref} {...rest} style={gapOuterStyle}>
        <View style={gapContainerStyle} pointerEvents="box-none">
          <TagModule
            rowGap={rowGap}
            columnGap={columnGap}
            style={textStyle}
          >{children}</TagModule>
        </View>
      </View>
    )
  }
})
Div.displayName = 'Div';
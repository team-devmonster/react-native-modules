import React, { forwardRef, LegacyRef, useMemo } from "react";
import { View } from "react-native";
import { borderPattern, gapPattern, layoutPattern, marginPattern, shadowPattern, TagModule, textPattern, useTags, useTagStyle } from "./core";
import { TagProps } from "./type";

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
  
  const rowGap = useMemo(() => gapStyle?.rowGap || gapStyle?.gap || 0, [gapStyle?.rowGap, gapStyle?.gap]);
  const columnGap = useMemo(() => gapStyle?.columnGap || gapStyle?.gap || 0, [gapStyle?.columnGap, gapStyle?.gap]);

  const gapContainerStyle = useMemo(() => ({
    marginTop: -rowGap/2,
    marginBottom: -rowGap/2,
    marginLeft: -columnGap/2,
    marginRight: -columnGap/2
  }), [rowGap, columnGap]);

  if(!Object.keys(gapStyle).length) {
    return (
      <View
        ref={ref}
        {...rest}
        style={{
          ...layoutStyle,
          ...shadowStyle,
          ...marginStyle,
          ...viewStyle,
          ...borderStyle
        }}>
        <TagModule
          style={textStyle}
          numberOfLines={numberOfLines}
          ellipsizeMode={ellipsizeMode}
          >{children}</TagModule>
      </View>
    )
  }
  else {

    // 아무때나 flex: 1 줘버리면 높이값이 사라질 때가 있음. 정확한 케이스에만 주어야 함.
    // 정확한 규칙은 모르겠으나, flex: 1을 줄 때 가끔 생기는 것은 확실함...
    const height = (() => {
      if(!layoutStyle.height) return null;
      if(typeof layoutStyle.height === 'number') return layoutStyle.height;
      if(typeof layoutStyle.height === 'string') return '100%';
    })()
    const width = (() => {
      if(!layoutStyle.width) return null;
      if(typeof layoutStyle.width === 'number') return layoutStyle.width;
      if(typeof layoutStyle.width === 'string') return '100%';
    })()
    const flex = (() => {
      if(!layoutStyle.flex) return null;
      if(layoutStyle.flex) return 1;
    })()

    return (
      <View
        ref={ref}
        {...rest}
        style={{
          ...layoutStyle,
          ...shadowStyle,
          ...marginStyle,
          ...borderStyle,
          flex: viewStyle.flex
        }}>
        <View style={{
          // 높이 넓이 최저값 지정해서 아이템이 없을 때도, 터지지 않게 처리
          minWidth: rowGap,
          minHeight: columnGap,
          // 각 케이스별로 계산된 값 입력
          height,
          width,
          flex,
          ...viewStyle,
          ...gapContainerStyle
        }} pointerEvents="box-none">
          <TagModule
            rowGap={rowGap}
            columnGap={columnGap}
            style={{
            ...textStyle
          }}>{children}</TagModule>
        </View>
      </View>
    )
  }
})

Div.displayName = 'Div';
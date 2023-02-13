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
          // 여기에 flex: 1을 주게 되면, 높이값이 가끔 사라지는 문제가 생긴다. 정확한 규칙은 모르겠으나, flex: 1을 줄 때 가끔 생기는 것은 확실함...
          // flex: 1,
          // 높이 넓이 최저값 지정해서 아이템이 없을 때도, 터지지 않게 처리
          minWidth: rowGap,
          minHeight: columnGap,
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
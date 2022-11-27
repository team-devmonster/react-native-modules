import React, { useMemo } from "react";
import { View } from "react-native";
import { borderPattern, gapPattern, layoutPattern, marginPattern, shadowPattern, TagModule, textPattern, useTags, useTagStyle } from "./core";
import { TagProps } from "./type";

export const Div = ({style, onLayout, children, ...rest}:TagProps) => {

  const { tagConfig } = useTags();
  const divTagStyle = tagConfig?.div;

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
  
  const rowGap = gapStyle?.rowGap || gapStyle?.gap || 0;
  const columnGap = gapStyle?.columnGap || gapStyle?.gap || 0;

  const gapContainerStyle = useMemo(() => ({
    marginTop: -rowGap/2,
    marginBottom: -rowGap/2,
    marginLeft: -columnGap/2,
    marginRight: -columnGap/2
  }), [rowGap, columnGap, viewStyle]);

  if(!Object.keys(gapStyle).length) {
    return (
      <View
        {...rest}
        style={{
          ...layoutStyle,
          ...shadowStyle,
          ...marginStyle,
          ...viewStyle,
          ...borderStyle
        }}>
        <TagModule
          style={textStyle}>{children}</TagModule>
      </View>
    )
  }
  else {
    return (
      <View
        {...rest}
        style={{
          ...layoutStyle,
          ...shadowStyle,
          ...marginStyle,
          ...borderStyle,
          flex: viewStyle.flex,
          overflow: viewStyle?.overflow
        }}>
        <View style={{
          flex: 1,
          ...viewStyle,
          ...gapContainerStyle
        }}>
          <TagModule
            style={{
            ...textStyle,
            ...(rowGap ? {marginVertical: rowGap/2} : null),
            ...(columnGap ? {marginHorizontal: columnGap/2} : null)
          }}>{children}</TagModule>
        </View>
      </View>
    )
  }
}
import React, { useState } from "react";
import { View } from "react-native";
import MaskedView from '@react-native-masked-view/masked-view';
import { borderPattern, gapPattern, TagModule, textPattern, useTags, useTagStyle } from "./core";
import { TagProps } from "./type";

export const Div = ({style, onLayout, children, ...rest}:TagProps) => {

  const { tagConfig } = useTags();
  const divTagStyle = tagConfig?.div;

  const [
    textStyle,
    borderStyle,
    gapStyle,
    viewStyle
  ]
  = useTagStyle([
    textPattern,
    borderPattern,
    gapPattern
  ], [divTagStyle, style]);


  const [size, setSize] = useState({ 
    left: 0,
    top: 0,
    width: 0, 
    height: 0
  });
  
  const rowGap = gapStyle?.rowGap || gapStyle?.gap || 0;
  const columnGap = gapStyle?.columnGap || gapStyle?.gap || 0;

  const gapContainerStyle = {
    marginTop: -rowGap/2 + (viewStyle.margin || viewStyle.marginVertical || viewStyle.marginTop || 0),
    marginBottom: -rowGap/2 + (viewStyle.margin || viewStyle.marginVertical || viewStyle.marginBottom || 0),
    marginLeft: -columnGap/2 + (viewStyle.margin || viewStyle.marginHorizontal || viewStyle.marginLeft || 0),
    marginRight: -columnGap/2 + (viewStyle.margin || viewStyle.marginHorizontal || viewStyle.marginRight || 0),
    paddingTop: (borderStyle.borderTopWidth || borderStyle.borderWidth || 0) + (viewStyle.padding || viewStyle.paddingVertical || viewStyle.paddingTop || 0),
    paddingBottom: (borderStyle.borderBottomWidth || borderStyle.borderWidth || 0) + (viewStyle.padding || viewStyle.paddingVertical || viewStyle.paddingBottom || 0),
    paddingLeft: (borderStyle.borderLeftWidth || borderStyle.borderWidth || 0) + (viewStyle.padding || viewStyle.paddingVertical || viewStyle.paddingLeft || 0),
    paddingRight: (borderStyle.borderRightWidth || borderStyle.borderWidth || 0) + (viewStyle.padding || viewStyle.paddingVertical || viewStyle.paddingRight || 0)
  }

  if(!Object.keys(gapStyle).length) {
    return (
      <View
        {...rest}
        style={{
          ...viewStyle,
          ...borderStyle
        }}>
        <TagModule
          style={textStyle}>{children}</TagModule>
      </View>
    )
  }
  else if(viewStyle.overflow !== 'hidden') {
    return (
      <View
        {...rest}
        style={{
          ...viewStyle,
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
        }}>
        <View 
          pointerEvents="none"
          style={{
            position: 'absolute',
            ...size,
            borderRadius: borderStyle.borderRadius,
            backgroundColor: viewStyle.backgroundColor,
            zIndex: -1
          }}></View>
        <TagModule
          style={{
          ...textStyle,
          ...(rowGap ? {marginVertical: rowGap/2} : null),
          ...(columnGap ? {marginHorizontal: columnGap/2} : null)
        }}>{children}</TagModule>
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            ...size,
            ...borderStyle
          }}></View>
      </View>
    )
  }
  else {
    return (
      <MaskedView
        {...rest}
        style={{
          ...viewStyle,
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
        <View 
          pointerEvents="none"
          style={{
            position: 'absolute',
            ...size,
            borderRadius: borderStyle.borderRadius,
            backgroundColor: viewStyle.backgroundColor,
            zIndex: -1
          }}></View>
        <TagModule
          style={{
          ...textStyle,
          ...(rowGap ? {marginVertical: rowGap/2} : null),
          ...(columnGap ? {marginHorizontal: columnGap/2} : null)
        }}>{children}</TagModule>
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            ...size,
            ...borderStyle
          }}></View>
      </MaskedView>
    )
  }
}
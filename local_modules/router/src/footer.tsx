import { Div, TagElement, TagStyle, useTags } from '@team-devmonster/react-native-tags';
import React from 'react';
import { ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface FooterProps {
  children:TagElement|TagElement[],
  style?:TagStyle
}
export const Footer = (
  { 
    children,
    style
  }:FooterProps
  ) => {

  const { tagConfig } = useTags();
  const tagStyle = tagConfig?.footer?.style;
  
  const paddingBottom = Number(style?.paddingBottom || style?.paddingVertical || style?.padding || 0);
  const safe = useSafeAreaInsets();

  return (
    <Div 
      style={{
        ...tagStyle,
        ...style as ViewStyle,
        paddingBottom: paddingBottom + safe.bottom
      }}>
      { children }
    </Div>
  )
}
Footer.displayName = 'Footer';
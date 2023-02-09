import React, { forwardRef, LegacyRef, useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Div, TagElement, TagStyle, useTags } from '@team-devmonster/react-native-tags';
import { View } from 'react-native';

export interface FooterProps {
  children:TagElement,
  style?:TagStyle,
  bottomEdge?:boolean
}
export const Footer = forwardRef((
  { 
    children,
    style,
    bottomEdge
  }:FooterProps,
  ref:LegacyRef<View>
  ) => {

  const { tagConfig } = useTags();
  const tagStyle = tagConfig?.footer?.style;
  
  const safe = useSafeAreaInsets();
  const paddingBottom = useMemo(() => (style?.paddingBottom || style?.paddingVertical || style?.padding || 0) as number, [style]);
  const resultPaddingBottom = useMemo(() => bottomEdge ? paddingBottom : paddingBottom + safe.bottom, [bottomEdge, paddingBottom, safe.bottom]);

  return (
    <Div 
      ref={ref as any}
      style={{
        ...tagStyle,
        ...style,
        paddingBottom: resultPaddingBottom
      }}>
      { children }
    </Div>
  )
})
Footer.displayName = 'Footer';
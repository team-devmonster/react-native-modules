import React, { Children, forwardRef, LegacyRef, useEffect, useMemo, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { Edge, SafeAreaView } from "react-native-safe-area-context";
import { TagElement, TagProps, useTags } from "@team-devmonster/react-native-tags";

interface LayoutProps extends TagProps {
  edges?:Edge[];
  onScroll?:(e:any) => void;
  scrollEventThrottle?:number;
  scrollRef?:LegacyRef<ScrollView>
}
export const Layout = forwardRef<KeyboardAvoidingView|View, LayoutProps>(({ children, edges, style, onScroll, scrollEventThrottle, scrollRef, ...rest }, ref) => {

  const { header, defaultEdges, contents, fixedLayout, footer } = useMemo(() => newChildren({ children }), [children]);
  const { tagConfig } = useTags();
  const layoutTagStyle = tagConfig?.layout?.style;

  const layoutStyle = useMemo(() => StyleSheet.create({
    flex: 1,
    ...layoutTagStyle as any
  }), [layoutTagStyle]);
  const contentStyle = useMemo(() => ({ ...layoutStyle, ...style }), [layoutStyle, style]);

  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardWillShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardWillHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const resultEdges = useMemo(() => edges || defaultEdges, [defaultEdges, edges]);
  const resultScrollEventThrottle = useMemo(() => scrollEventThrottle || (onScroll ? 16 : undefined), [scrollEventThrottle, onScroll]);

  const Layout = useMemo(() => {
    switch(Platform.OS) {
      case 'ios':
        return KeyboardAvoidingView;
      default:
        return View;
    }
  }, [Platform.OS]);

  return (
    <Layout
      ref={ref}
      style={{ flex: 1, backgroundColor: contentStyle?.backgroundColor }}
      behavior="padding">
      {header}
      {
        style?.overflow !== 'hidden' ? 
          <ScrollView 
            ref={scrollRef}
            onScroll={onScroll}
            scrollEventThrottle={resultScrollEventThrottle}
            style={{
              flex: 1
            }}>
            {
              resultEdges.length ?
                <SafeAreaView
                  edges={resultEdges}
                  style={contentStyle} {...rest}>
                  {contents}
                </SafeAreaView>
              :
                <View
                  style={contentStyle} {...rest}>
                  {contents}
                </View>
            }
          </ScrollView>
        :
          resultEdges.length ?
            <SafeAreaView
              edges={resultEdges}
              style={contentStyle} {...rest}>
              {contents}
            </SafeAreaView>
          :
            <View
              style={contentStyle} {...rest}>
              {contents}
            </View>
      }
      {fixedLayout}
      {
        footer ?
        React.cloneElement(footer as any, {
          bottomEdge: keyboardVisible
        })
        : null
      }
    </Layout>
  )
})

const newChildren = ({ children }:{ children:TagElement })
  :{ 
    defaultEdges:Edge[], 
    header:JSX.Element|null,
    contents:TagElement, 
    fixedLayout:TagElement,
    footer:TagElement
  } => {
  if(!children) return { defaultEdges: ['top', 'left', 'right', 'bottom'], header:null, contents: null, fixedLayout: null, footer: null };

  const edges:Edge[] = ['left', 'right'];
  
  let header:JSX.Element|null = null;
  let contents:TagElement = [];
  let fixedLayout = null;
  let footer = null;

  const childrenArr = Children.toArray(children);

  for(let i = 0; i < childrenArr.length; i++) {
    const child = childrenArr[i] as TagElement;
    if(!child) {
      contents.push(child);
      continue;
    }
    if(Array.isArray(child)) {
      contents.push(child);
      continue;
    }
    
    // not array
    if(typeof child === 'string' || typeof child === 'number') {
      contents.push(child);
      continue;
    }
    
    switch(child?.type?.displayName) {
      case 'Header':
        header = child;
        break;
      case 'FixedLayout':
        fixedLayout = child;
        break;
      case 'Footer':
        footer = child;
        break;
      default:
        contents.push(child);
        break;
    }
  }

  if(!header || header?.props?.headerShown === false) edges.push('top');
  if(!footer) edges.push('bottom');
  return {
    defaultEdges: edges, 
    header,
    contents,
    fixedLayout,
    footer
  }
}
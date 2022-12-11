import React, { useMemo } from "react";
import { ScrollView, View, ViewStyle } from "react-native";
import { Edge, SafeAreaView } from "react-native-safe-area-context";
import { TagElement, TagProps, useTags } from "@team-devmonster/react-native-tags";

interface LayoutProps extends TagProps {
  edges?:Edge[];
}
export const Layout = ({ children, edges, style, ...rest }:LayoutProps) => {

  const { header, defaultEdges, contents, fixedLayout, footer } = useMemo(() => newChildren({ children }), [children]);
  const { tagConfig } = useTags();
  const layoutTagStyle = tagConfig?.layout?.style;

  return (
    <View style={{ flex: 1 }}>
      {header}
      <ScrollView style={{
        backgroundColor: style?.backgroundColor,
        flex: 1
      }}>
        <SafeAreaView 
          edges={defaultEdges || edges} 
          style={{
            flex: 1,
            ...layoutTagStyle as any,
            ...style as ViewStyle
          }} {...rest}>
          {contents}
        </SafeAreaView>
      </ScrollView>
      {fixedLayout}
      {footer}
    </View>
  )
}

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

  if(Array.isArray(children)) {
    for(let i = 0; i < children.length; i++) {
      const child = children[i];
      if(Array.isArray(child)) {
        contents = children;
      }
      else if(child) {
        if(typeof child === 'string' || typeof child === 'number') {
          contents = children;
        }
        else {
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
      }
      else {
        contents = children;
      }
    }
  }
  else {
    contents = children;
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
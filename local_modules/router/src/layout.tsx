import React from "react";
import { ScrollView, View } from "react-native";
import { Edge, SafeAreaView } from "react-native-safe-area-context";
import { TagProps } from "@team-devmonster/react-native-tags";

interface LayoutProps extends TagProps {
  edges?:Edge[];
}
export const Layout = ({ children, edges, style, ...rest }:LayoutProps) => {

  const { defaultEdges, contents, fixedLayout, footer } = newChildren({ children });

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{
        backgroundColor: style?.backgroundColor,
        flex: 1
      }}>
        <SafeAreaView 
          edges={defaultEdges || edges} 
          style={{
            flex: 1
          }} {...rest}>
          {contents}
        </SafeAreaView>
      </ScrollView>
      {fixedLayout}
      {footer}
    </View>
  )
}

const newChildren = ({ children:_children }:{ children:React.ReactNode })
  :{ 
    defaultEdges:Edge[], 
    contents:React.ReactNode, 
    fixedLayout:React.ReactNode,
    footer:React.ReactNode
  } => {
  if(!_children) return { defaultEdges: ['top', 'left', 'right', 'bottom'], contents: null, fixedLayout: null, footer: null };

  const children = Array.isArray(_children) ? _children : [_children];
  const edges:Edge[] = ['left', 'right'];
  
  let header = null;
  let contents = [];
  let fixedLayout = null;
  let footer = null;
  for(let i = 0; i < children.length; i++) {
    const child = children[i];
    switch(child.type?.displayName) {
      case 'Header':
        header = child;
        contents.push(child);
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
    contents,
    fixedLayout,
    footer
  }
}
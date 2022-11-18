import React, { useLayoutEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Edge, SafeAreaView } from "react-native-safe-area-context";
import { TagProps, useTagStyle } from "@team-devmonster/react-native-tags";
import { Header } from "./header";

const edges_LRB:Edge[] = ['left', 'right', 'bottom'];
const edges_TLRB:Edge[] = ['top', 'left', 'right', 'bottom'];

interface LayoutProps extends TagProps {
  edges?:Edge[];
}
export const Layout = ({ children, edges, style, ...rest }:LayoutProps) => {
  
  const [defaultEdges, setDefaultEdges] = useState<Edge[]>(edges_TLRB);

  useLayoutEffect(() => {
    if(!children) return setDefaultEdges(edges_TLRB);
    else if(Array.isArray(children)) {
      const hasHeader = children.some(child => child.type === Header);
      if(hasHeader) setDefaultEdges(edges_LRB);
      else setDefaultEdges(edges_TLRB);
    }
    else if(typeof children === 'object') {
      const child:any = children;
      const hasHeader = child.type === Header;
      if(hasHeader) setDefaultEdges(edges_LRB);
      else setDefaultEdges(edges_TLRB);
    }
  }, [children]);

  console.log(defaultEdges);

  const [newStyle] = useTagStyle([], [style]);

  return (
    <View>
      <ScrollView>
        <SafeAreaView edges={defaultEdges || edges} style={newStyle} {...rest}>
          {children}
        </SafeAreaView>
      </ScrollView>
    </View>
  )
}
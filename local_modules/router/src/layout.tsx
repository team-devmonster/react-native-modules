import React, { useLayoutEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Edge, SafeAreaView } from "react-native-safe-area-context";
import { TagProps } from "@team-devmonster/react-native-tags";

const edges_LRB:Edge[] = ['left', 'right', 'bottom'];
const edges_TLRB:Edge[] = ['top', 'left', 'right', 'bottom'];

interface LayoutProps extends TagProps {
  edges:Edge[];
}
export const Layout = ({ children, edges }:LayoutProps) => {
  
  const [defaultEdges, setDefaultEdges] = useState<Edge[]>(edges_TLRB);

  useLayoutEffect(() => {
    if(!children) return setDefaultEdges(edges_TLRB);
    else if(Array.isArray(children)) {
      const hasHeader = children.some(child => child.type?.name === 'Header');
      if(hasHeader) setDefaultEdges(edges_LRB);
      else setDefaultEdges(edges_TLRB);
    }
    else if(typeof children === 'object') {
      const child:any = children;
      const hasHeader = child.type?.name === 'Header';
      if(hasHeader) setDefaultEdges(edges_LRB);
      else setDefaultEdges(edges_TLRB);
    }
  }, [children]);

  return (
    <View>
      <ScrollView>
        <SafeAreaView edges={defaultEdges || edges}>
          {children}
        </SafeAreaView>
      </ScrollView>
    </View>
  )
}
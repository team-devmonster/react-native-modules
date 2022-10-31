import React, { createContext, useContext, useEffect, useState } from "react";
import { Text, TextStyle } from "react-native"

export interface TagProps {
  children:React.ReactNode,
  style:TextStyle
}

export interface TagGroupStyle {
  div?: TagStyle,
  button?: TagStyle,
  input?: TagStyle,
  img?: TagStyle,

  //additional
  p?:TagStyle
}

export interface TagStyle extends Omit<TextStyle, 'fontWeight'> {
  cursor?:string,
  fontWeight?:string|number
}

const TagContext = createContext<{ tagStyle?:TagGroupStyle }>({});

export function TagProvider({children, tagStyle}:{children:React.ReactNode, tagStyle?:TagGroupStyle}) {

  //useFonts

  return (
    <TagContext.Provider value={{ tagStyle }}>
      {children}
    </TagContext.Provider>
  )
}

export function useTags() {
  return useContext(TagContext);
}

export const TagModule = ({ children, style:textStyle }:TagProps) => {

  const [newChildren, setNewChildren] = useState<React.ReactNode>(null);

  useEffect(() => {
    const newChildren = newChildrenFn();
    setNewChildren(newChildren);
  }, [children, textStyle]);

  const newChildrenFn = () => {
    if(!children) return null;
    if(typeof children === 'string' || typeof children === 'number') {
      return <Text style={{
        lineHeight: textStyle?.fontSize ? textStyle.fontSize*1.28 : undefined,
        ...textStyle
      }}>{children}</Text>
    }
    else if(Array.isArray(children)) {
      const newChildren = [];
      let textchild = '';
      for(let i = 0; i < children.length; i++) {
        const child = children[i];
        if(typeof child === 'string' || typeof child === 'number') {
          textchild += child;
        }
        else {
          if(textchild) {
            newChildren.push(
              <Text key={i} style={{
                lineHeight: textStyle?.fontSize ? textStyle.fontSize*1.28 : undefined,
                ...textStyle
              }}>{textchild}</Text>
            );
            textchild = '';
          }
          newChildren.push(child);
        }
      }
      // 마지막놈이 스트링이거나 넘버면 한번 더 처리를 해줘야된다.
      if(textchild) {
        newChildren.push(
          <Text key={newChildren.length} style={{
            lineHeight: textStyle?.fontSize ? textStyle.fontSize*1.28 : undefined,
            ...textStyle
          }}>{textchild}</Text>
        );
        textchild = '';
      }
      return newChildren;
    }
    else {
      return children;
    }
  }

  return newChildren as JSX.Element;
}

/* const objectFilter = (obj:Object, callback:({key, value}:{key:string, value:any}) => void) => {
  const entries = Object.entries(obj);
  return Object.fromEntries(entries.filter(([key, value]) => callback({ key, value })));
} */
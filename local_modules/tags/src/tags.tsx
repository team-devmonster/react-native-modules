import React, { createContext, useContext, useEffect, useState } from "react";
import { Text, TextProps, TextStyle } from "react-native"
import { ButtonProps } from "./button";

export interface TagGroupConfig {
  div?: TagStyle,
  button?: ButtonProps,
  input?: TagStyle,
  img?: TagStyle,

  //additional
  p?:TagStyle,
  span?:TagStyle
}

export interface TagProps extends Omit<TextProps, 'style'> {
  style?:TagStyle
}
export interface TagStyle extends Omit<TextStyle, 'display'> {
  cursor?:string,
  display?: 'flex' | 'inline-flex' | 'none'
}

const TagContext = createContext<{ tagConfig?:TagGroupConfig }>({});

export function TagProvider({children, tagConfig}:{children:React.ReactNode, tagConfig?:TagGroupConfig}) {

  //useFonts

  return (
    <TagContext.Provider value={{ tagConfig }}>
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
        ...textStyle as TextStyle
      }}>{children}</Text>
    }
    else if(Array.isArray(children)) {
      const newChildren = [];
      const textchildren = [];
      for(let i = 0; i < children.length; i++) {
        const child = children[i];
        if(typeof child === 'string' || typeof child === 'number') {
          textchildren.push(child);
        }
        else {
          if(child?.type?.name === 'Span' || child?.props?.style?.display === 'inline-flex') {
            textchildren.push(child);
          }
          else {
            if(textchildren.length) {
              newChildren.push(
                <Text key={newChildren.length} style={{
                  lineHeight: textStyle?.fontSize ? textStyle.fontSize*1.28 : undefined,
                  ...textStyle as TextStyle
                }}>{[...textchildren]}</Text>
              );
              textchildren.length = 0;
            }
            newChildren.push(child);
          }
        }
      }
      // 마지막놈이 스트링이거나 넘버면 한번 더 처리를 해줘야된다.
      if(textchildren.length) {
        newChildren.push(
          <Text key={newChildren.length} style={{
            lineHeight: textStyle?.fontSize ? textStyle.fontSize*1.28 : undefined,
            ...textStyle as TextStyle
          }}>{[...textchildren]}</Text>
        );
        textchildren.length = 0;
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
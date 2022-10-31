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
    if(typeof children === 'string') {
      return <Text style={{
        lineHeight: textStyle?.fontSize ? textStyle.fontSize*1.28 : undefined,
        ...textStyle
      }}>{children}</Text>
    }
    else if(Array.isArray(children)) {
      return children.map(
        (child, key) => {
          if(typeof child === 'string') {
            return <Text key={key} style={textStyle}>{child}</Text>
          }
          else {
            return child;
          }
        }
      );
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
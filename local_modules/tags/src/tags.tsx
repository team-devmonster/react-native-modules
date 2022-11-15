import React, { createContext, useContext } from "react";
import { TextProps, TextStyle } from "react-native"
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
  display?: 'flex' | 'inline-flex' | 'none'
}
export interface ButtonStyle extends TagStyle {
  cursor?:string
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

/* const objectFilter = (obj:Object, callback:({key, value}:{key:string, value:any}) => void) => {
  const entries = Object.entries(obj);
  return Object.fromEntries(entries.filter(([key, value]) => callback({ key, value })));
} */
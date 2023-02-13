import React, { createContext, useContext, useMemo } from "react";
import { TextStyle, Text } from "react-native";
import { TagElement, TagGroupConfig, TagProps, TagStyle } from "./type";



export const TagContext = createContext<{ tagConfig?:TagGroupConfig }>({});

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

export const textPattern = /^(color|font|text|lineHeight|whiteSpace)/;
export const layoutPattern = /^(display|width|minWidth|maxWidth|height|minHeight|maxHeight|position|top|left|right|bottom|opacity|overflow|alignSelf|justifySelf|aspectRatio|flex)$/;
export const shadowPattern = /^(shadow|elevation)/;
export const borderPattern = /^(border)/;
export const marginPattern = /^(margin)/;
export const placeholderPattern = /^(placeholder)/;
export const gapPattern = /(gap|Gap)/;
export const iconPattern = /(^icon)/;

export const useTagStyle = (patterns:RegExp[], styleStates:(TagStyle|undefined)[]):any[] => {

  const styles = useMemo(() => makeTagStyle({ patterns, styleStates }), styleStates);
  return styles;
}
const makeTagStyle = ({ patterns, styleStates }: { patterns:RegExp[], styleStates:(TagStyle|undefined)[] }) => {
  // case 1
  let styleObj = {};
  styleStates.forEach(styleState => styleObj = Object.assign(styleObj, styleState));
  if(!patterns.length) return [styleObj];


  // case 2
  const entries = Object.entries(styleObj) as [keyof TagStyle, any][];
  const styles:TagStyle[] = new Array(patterns.length+1).fill(null).map(() => ({}));

  for(let i = 0; i < entries.length; i++) {
    const key = entries[i][0];
    const value = entries[i][1];

    for(let j = 0; j < patterns.length; j++) {
      const pattern = patterns[j];
      const styleIndex = j;

      if(pattern.test(key)) {
        styles[styleIndex][key] = value === 'inline-flex' ? 'flex' : value;
        break;
      }

      if(styleIndex === patterns.length-1) {
        styles[styles.length-1][key] = value === 'inline-flex' ? 'flex' : value;
      }
    }
  }
  return styles;
}

export const TagModule = ({ children, style, numberOfLines, ellipsizeMode, rowGap, columnGap }:TagProps & { rowGap?:number, columnGap?:number }):JSX.Element => {
  const tagChildren = useMemo(() => makeTagChildren({ children, style, numberOfLines, ellipsizeMode, rowGap, columnGap }), [children, style, numberOfLines, ellipsizeMode, rowGap, columnGap]);
  return tagChildren as JSX.Element;
}
const makeTagChildren = ({ children, style, numberOfLines, ellipsizeMode, rowGap, columnGap }:{ children?:TagElement, style?:TagStyle, numberOfLines?:number, ellipsizeMode?:"head" | "tail" | "middle" | "clip",  rowGap?:number, columnGap?:number }) => {
  if(Array.isArray(children)) {
    const newChildren:TagElement[] = [];
    const textchildren:(JSX.Element|string)[] = [];
    children.forEach((child, i) => {
      if(Array.isArray(child)) {
        newChildren.push(child);
      }
      else if(child) {
        if(typeof child === 'string' || typeof child === 'number') {
          textchildren.push(String(child));
        }
        else if(child.type?.displayName === 'Br' || child.type?.displayName === 'Span' || child.props?.style?.display === 'inline-flex') {
          textchildren.push(child);
        }
        else {
          if(textchildren.length) {
            newChildren.push(
              <Text key={`tag_${i}`} 
                style={{
                  lineHeight: style?.fontSize ? style.fontSize*1.28 : undefined,
                  ...style as TextStyle
                }}
                ellipsizeMode="tail"
                numberOfLines={style?.whiteSpace === 'nowrap' ? 1 : numberOfLines}
              >{[...textchildren]}</Text>
            )
            textchildren.length = 0;
          }

          if(rowGap || columnGap) {
            const style:any = {};
            if(rowGap) style.marginVertical = rowGap/2;
            if(columnGap) style.marginHorizontal = columnGap/2;
            
            newChildren.push(
              <React.Fragment key={`tag_${i}`}>
                {
                  React.cloneElement(child, {
                    style: {
                      ...child.props?.style,
                      ...style
                    }
                  })
                }
              </React.Fragment>
            );
          }
          else {
            newChildren.push(child);
          }
        }
      }
      else {
        newChildren.push(child);
      }
    });
    
    // 마지막놈이 스트링이거나 넘버면 한번 더 처리를 해줘야된다.
    if(textchildren.length) {
      newChildren.push(
        <Text key={`tag_${children.length}`} 
          style={{
            lineHeight: style?.fontSize ? style.fontSize*1.28 : undefined,
            ...style as TextStyle
          }}
          ellipsizeMode={ellipsizeMode}
          numberOfLines={style?.whiteSpace === 'nowrap' ? 1 : numberOfLines}
        >{[...textchildren]}</Text>
      );
      textchildren.length = 0;
    }
    return newChildren;
  }
  else if(typeof children === 'string' || typeof children === 'number') {
    return <Text 
      style={{
        lineHeight: style?.fontSize ? style.fontSize*1.28 : undefined,
        ...style as TextStyle
      }}
      ellipsizeMode={ellipsizeMode}
      numberOfLines={style?.whiteSpace === 'nowrap' ? 1 : numberOfLines}
    >{String(children)}</Text>
  }
  else if(children) {
    return children;
  }
  else {
    return null;
  }
}
import React, { createContext, useContext, useEffect, useState } from "react";
import { TextStyle, Text } from "react-native";
import { TagGroupConfig, TagProps, TagStyle } from "./type";



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

export const textPattern = /^(color|font|text|lineHeight)/;
export const layoutPattern = /^(flex|width|height)$/;
export const shadowPattern = /^(shadow|elevation)/;
export const borderPattern = /^(border)/;
export const marginPattern = /^(margin)/;
export const placeholderPattern = /^(placeholder)/;
export const gapPattern = /^(gap)/;

export const useTagStyle = (patterns:RegExp[], styleStates:(TagStyle|undefined)[]):any[] => {

  const [newStyles, setNewStyles] = useState<(TagStyle|null)[]>(new Array(patterns.length+1).fill(null).map(() => ({})));

  useEffect(() => {

    let styleObj = {};
    styleStates.forEach(styleState => {
      styleObj = Object.assign(styleObj, styleState);
    })

    if(!patterns.length) {
      return setNewStyles([styleObj]);
    }

    const entries = Object.entries(styleObj) as [keyof TagStyle, any][];
    const styles:(TagStyle|null)[] = new Array(patterns.length+1).fill(null).map(() => ({}));

    for(let i = 0; i < entries.length; i++) {
      const key = entries[i][0];
      const value = entries[i][1];

      for(let j = 0; j < patterns.length; j++) {
        const pattern = patterns[j];
        const styleIndex = j;

        if(pattern.test(key)) {
          if(!styles[styleIndex]) styles[styleIndex] = {};
          styles[styleIndex]![key] = value === 'inline-flex' ? 'flex' : value;
          break;
        }

        if(styleIndex === patterns.length-1) {
          if(!styles[styles.length-1]) styles[styles.length-1] = {};
          styles[styles.length-1]![key] = value === 'inline-flex' ? 'flex' : value;
        }
      }

    }

    setNewStyles(styles);
  }, styleStates);

  return newStyles as any[];
}

export const TagModule = ({ children, style:textStyle }:TagProps) => {

  const [newChildren, setNewChildren] = useState<React.ReactNode>(null);
  const [id] = useState(new Date().getTime());

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
        if(!child) {
          continue;
        }
        else if(typeof child === 'string' || typeof child === 'number') {
          textchildren.push(child);
        }
        /* else if(child.type?.name === 'Br') {
          textchildren.push(`\n`);
        } */
        else {
          if(child.type?.name === 'Br' || child.type?.name === 'Span' || child.props?.style?.display === 'inline-flex') {
            textchildren.push(child);
          }
          else {
            if(textchildren.length) {
              newChildren.push(
                <Text key={`tag_${id}_${newChildren.length}`} style={{
                  lineHeight: textStyle?.fontSize ? textStyle.fontSize*1.28 : undefined,
                  ...textStyle as TextStyle
                }}>{[...textchildren]}</Text>
              );
              textchildren.length = 0;
            }
            if(textStyle?.margin) {
              newChildren.push(React.cloneElement(child, { style: { ...child.props?.style, margin: textStyle.margin } }));
            }
            else {
              newChildren.push(child);
            }
            
          }
        }
      }
      // 마지막놈이 스트링이거나 넘버면 한번 더 처리를 해줘야된다.
      if(textchildren.length) {
        newChildren.push(
          <Text key={`tag_${id}_${newChildren.length}`} style={{
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
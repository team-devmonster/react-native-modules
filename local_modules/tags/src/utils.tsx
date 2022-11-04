import { useEffect, useState } from "react";
import { TextStyle, ViewStyle, Text } from "react-native";
import { TagProps, TagStyle } from "./tags";

export function darken(col:string, amt:number) {

  const num = parseInt(col.slice(1),16);

  let r = (num >> 16) - amt;

  if (r > 255) r = 255;
  else if  (r < 0) r = 0;

  let b = ((num >> 8) & 0x00FF) - amt;

  if (b > 255) b = 255;
  else if  (b < 0) b = 0;

  let g = (num & 0x0000FF) - amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return '#' + (g | (b << 8) | (r << 16)).toString(16);
}

export const lighten = (col:string, amt:number) => {

  const num = parseInt(col.slice(1),16);

  let r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if  (r < 0) r = 0;

  let b = ((num >> 8) & 0x00FF) + amt;

  if (b > 255) b = 255;
  else if  (b < 0) b = 0;

  let g = (num & 0x0000FF) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return '#' + (g | (b << 8) | (r << 16)).toString(16);
}

export const contrast = (hex:string, c1:string = '#000000', c2:string = '#FFFFFF', amt:number = 206) => {
  
  hex = hex.slice(1);

  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  const r = parseInt(hex.slice(0, 2), 16),
      g = parseInt(hex.slice(2, 4), 16),
      b = parseInt(hex.slice(4, 6), 16);

  return (r * 0.299 + g * 0.587 + b * 0.114) > amt 
    ? c1 : c2;
}

export const textPattern = /^(color|font|text|lineHeight)/;
export const layoutPattern = /^(flex|width|height)$/;
export const shadowPattern = /^(shadow|elevation)/;
export const borderPattern = /^(border)/;
export const marginPattern = /^(margin)/;

export const useTagStyle = (patterns:RegExp[], styleStates:(TagStyle|undefined)[]) => {

  const [newStyles, setNewStyles] = useState<(TagStyle|null)[]>(new Array(patterns.length+1).fill(null));

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

  return newStyles as (ViewStyle | TextStyle)[];
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
        else if(child.type?.name === 'Br') {
          textchildren.push(`\n`);
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
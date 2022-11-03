import { useEffect, useState } from "react";
import { TextStyle, ViewStyle } from "react-native";
import { TagStyle } from "./tags";

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
    const styles:(TagStyle|null)[] = new Array(patterns.length+1).fill(null);

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
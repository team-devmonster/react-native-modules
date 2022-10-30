import React, { useEffect, useState } from "react";
import { TextProps, View } from "react-native";
import { TagModule, useTags } from "./tags";

const textPattern = /^(color|font|text)/;

export const P = ({style, children, ...rest}:TextProps) => {

  const { tagStyle } = useTags();
  const divTagStyle = tagStyle?.['div'];
  const pTagStyle = tagStyle?.['p'];

  const [newStyle, setNewStyle] = useState<{ viewStyle:any, textStyle:any }>();

  useEffect(() => {
    const entries = Object.entries({...divTagStyle, ...pTagStyle, ...style as any});
    let viewStyle:any = {};
    let textStyle:any = {};

    for(let i = 0; i < entries.length; i++) {
      const key = entries[i][0];
      const value = entries[i][1];
      
      if(textPattern.test(key)) {
        textStyle[key] = value;
      }
      else {
        viewStyle[key] = value;
      }
    }
    setNewStyle({ viewStyle, textStyle });
  }, [divTagStyle, pTagStyle, style]);
  
  return (
    <View style={newStyle?.viewStyle} {...rest}>
      <TagModule style={newStyle?.textStyle}>{children}</TagModule>
    </View>
  )
}
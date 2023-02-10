import React, { useMemo } from "react";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TouchableWithoutFeedback } from "react-native";
import { navigate } from "./navigation";

export interface UrlObject {
  auth?: string | null | undefined;
  hash?: string | null | undefined;
  host?: string | null | undefined;
  hostname?: string | null | undefined;
  href?: string | null | undefined;
  pathname?: string | null | undefined;
  protocol?: string | null | undefined;
  search?: string | null | undefined;
  slashes?: boolean | null | undefined;
  port?: string | number | null | undefined;
  query?: Object | undefined;
}
export type Url = string | UrlObject;
export interface Aprops {
  href?: string | UrlObject,
  as?: Url,
  replace?:boolean,
  push?:boolean,
  back?:boolean,
  reset?:boolean,
  children:React.ReactNode,
  target?:string
}

export const A = ({ href, as:_, replace, push, back, reset, children, target:__, ...rest }:Aprops) => {

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const style = (rest as any).style;
  const newChildren = useMemo(() => {
    if(style) {
      return React.cloneElement(children as any, {
        style
      })
    }
    else {
      return children
    }
  }, [children, style]);
  
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigate({navigation, href, replace, push, back, reset});
      }}>
      {newChildren}
    </TouchableWithoutFeedback>
  )
}
A.displayName = 'A';
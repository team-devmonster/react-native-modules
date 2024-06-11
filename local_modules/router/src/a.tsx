import { useMemo, cloneElement, useCallback } from "react";
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
  children:JSX.Element,
  target?:string
}

export const A = ({ href, as:_, replace, push, back, reset, children, target:__, ...rest }:Aprops) => {

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handlePress = useCallback(() => {
    navigate({navigation, href, replace, push, back, reset});
  }, [navigation, href, replace, push, back, reset]);

  const newChildren = useMemo(() => {
    if(children.type.displayName === 'Button') {
      return cloneElement(children, {
        onClick: handlePress
      })
    }
    else {
      return children
    }
  }, [children]);
  
  return (
    children.type.displayName !== 'Button' ?
    <TouchableWithoutFeedback
      onPress={handlePress}>
      {newChildren}
    </TouchableWithoutFeedback>
    : newChildren
  )
}
A.displayName = 'A';
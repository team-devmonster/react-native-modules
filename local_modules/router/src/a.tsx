import React from "react";
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Linking, TouchableWithoutFeedback } from "react-native";

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
  children:React.ReactNode
  target?:'string'
}

export const A = ({ href, as:_, replace, push, back, reset, children, target:__ }:Aprops) => {

  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigate({navigation, href, replace, push, back, reset});
      }}>
      {children}
    </TouchableWithoutFeedback>
  )
}



type ParamListBase = {
  [x: string]: object | undefined;
}
type Keyof<T extends {}> = Extract<keyof T, string>;
export type RouterProps<T extends ParamListBase, K extends keyof T = Keyof<T>> = T[K];

export function useRouter<Query extends RouterProps<ParamListBase>>() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { params, ...rest } = useRoute();
  const query = params as Query;
  const push = (href:string | UrlObject, as?: Url) => {
    navigate({navigation, href, push: true});
  }
  const reset = (href:string | UrlObject, as?: Url) => {
    navigate({navigation, href, reset: true});
  }
  const replace = (href:string | UrlObject, as?: Url) => {
    navigate({navigation, href, replace: true});
  }
  const back = () => {
    navigate({navigation, back: true});
  }
  return { query, ...rest, push, reset, replace, back };
}


interface navigateProps {
  navigation: NativeStackNavigationProp<any>,
  href?: string | UrlObject,
  replace?:boolean,
  push?:boolean,
  back?:boolean,
  reset?:boolean,
}
const navigate = ({ navigation, href, replace, push, back, reset }:navigateProps) => {
  if(back) {
    navigation.goBack();
    return;
  }
  let page = '';
  let query:object | undefined;
  if(!href) return;

  if(typeof href === 'string') {
    if(href.startsWith('http')) {
      Linking.openURL(href);
      return;
    }

    page = href.replace(/^\//, '');
  }
  else {
    if(!href.pathname) return;

    page = href.pathname.replace(/^\//, '');
    query = href.query;
  }

  if(replace) {
    navigation.replace(page, query);
  }
  else if(push) {
    navigation.push(page, query);
  }
  else if(reset) {
    navigation.reset({ 
      routes: [{ name: page, params: query }]
    })
  }
  else {
    navigation.navigate(page, query);
  }
}
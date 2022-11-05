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
  query?: string | null | Object | undefined;
}
export type Url = string | UrlObject;
export interface Aprops {
  href?: string | UrlObject,
  as?: Url,
  replace?:boolean,
  push?:boolean,
  back?:boolean,
  children:React.ReactNode
}

export const A = ({ href, as:_, replace, push, back, children }:Aprops) => {

  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if(back) {
          navigation.goBack();
          return;
        }
        let page = '';
        let query;
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

        console.log(page, query);

        if(replace) {
          navigation.replace(page, query);
        }
        else if(push) {
          navigation.push(page, query);
        }
        else {
          navigation.navigate(page, query);
        }
      }}>
      {children}
    </TouchableWithoutFeedback>
  )
}

export function useRouter() {
  const { params, ...rest } = useRoute();
  const query = params || {} as any;
  return { query, ...rest };
}
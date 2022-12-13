import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Linking } from "react-native";
import { UrlObject } from "./a";

interface navigateProps {
  navigation: NativeStackNavigationProp<any>,
  href?: string | UrlObject,
  replace?:boolean,
  push?:boolean,
  back?:boolean,
  reset?:boolean,
}
export const navigate = ({ navigation, href, replace, push, back, reset }:navigateProps) => {
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
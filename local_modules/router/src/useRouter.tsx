import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Url, UrlObject } from "./a";
import { navigate } from "./navigation";

type ParamListBase = {
  [x: string]: object | undefined;
}
type Keyof<T extends {}> = Extract<keyof T, string>;
export type RouterProps<T extends ParamListBase, K extends keyof T = Keyof<T>> = T[K];

export function useRouter<Query extends RouterProps<ParamListBase>>() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { name, params, ...rest } = useRoute();
  const query = params as Query;

  const originNavigate = (href:string | UrlObject, as?: Url) => {
    navigate({navigation, href, navigate: true});
  }
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
  return { query, push, reset, replace, back, navigate:originNavigate, pathname:name, ...rest };
}
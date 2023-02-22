/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  'calendar':undefined,
  'index':undefined,
  'themeEx':undefined,
  'tagsEx':undefined,
  'routerEx':undefined,
  'routerEx/paramEx':{ name:string, nickname:string, company:string, des:string },
  'formEx':undefined,
  'swiperEx':undefined
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;
export type Query<RouteName extends keyof RootStackParamList> = RootStackParamList[RouteName];
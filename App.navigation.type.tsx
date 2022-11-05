/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  'index':undefined,
  'themeEx':undefined,
  'tagsEx':undefined,
  'routerEx':undefined,
  'routerEx/paramEx':{ name:string, nickname:string, company:string }
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;
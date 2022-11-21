import { TextProps, TextStyle } from "react-native";

export interface TagGroupConfig {
  div?: TagStyle,
  button?: ButtonConfig,
  img?: TagStyle,
  //additional
  p?:TagStyle,
  span?:TagStyle
  // forms
  input?: InputConfig
  errorText?: ErrorTextConfig,
  label?: LabelConfig,
  checkbox?: InputConfig,
  radio?: InputConfig,
  select?: InputConfig
}

export interface TagProps extends Omit<TextProps, 'style'|'onPress'> {
  style?:TagStyle
}
export interface TagStyle extends Omit<TextStyle, 'display'> {
  display?: 'flex' | 'inline-flex' | 'none',
  gap?:number,
  rowGap?:number,
  columnGap?:number
}


// tags

export interface ButtonStyle extends TagStyle {
  cursor?:string
}
export interface ButtonConfig {
  style?: ButtonStyle;
  disabledStyle?:ButtonStyle;
  hoverStyle?:ButtonStyle;
  color?: string;
  fill?: 'base' | 'outline' | 'translucent';
}


// forms

export interface InputStyle extends TagStyle {
  placeholderColor?:string
}
export interface InputConfig {
  style?:InputStyle,
  disabledStyle?:InputStyle,
  errorStyle?:InputStyle
}

export interface ErrorTextConfig {
  style?:TagStyle
}

export interface LabelConfig {
  style?:TagStyle,
  disabledStyle?:TagStyle,
  errorStyle?:TagStyle
}
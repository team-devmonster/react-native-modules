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
  checkbox?: InputConfig,
  radio?: InputConfig
}

export interface TagProps extends Omit<TextProps, 'style'> {
  style?:TagStyle
}
export interface TagStyle extends Omit<TextStyle, 'display'> {
  display?: 'flex' | 'inline-flex' | 'none'
}


// tags

export interface ButtonStyle extends TagStyle {
  cursor?:string
}
export interface ButtonConfig {
  style?: ButtonStyle;
  disabledStyle?:ButtonStyle;
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
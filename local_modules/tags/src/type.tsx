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
  errorText?: ErrorTextConfig
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

export interface InputConfig {
  style?:TagStyle,
  disabledStyle?:TagStyle,
  errorStyle?:TagStyle
}

export interface ErrorTextConfig {
  style?:TagStyle
}
import { TextProps, TextStyle } from "react-native";

export interface TagGroupConfig {
  // tag - default
  div?: TagStyle,
  button?: ButtonConfig,
  img?: TagStyle,
  // tag - additional
  p?:TagStyle,
  span?:TagStyle,
  // router
  layout?:LayoutConfig,
  header?:HeaderConfig,
  // forms
  input?: InputConfig
  errorText?: ErrorTextConfig,
  label?: LabelConfig,
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
export type FillProps = 'base' | 'outline' | 'translucent' | 'none';
export interface ButtonStyle extends TagStyle {
  cursor?:string
}
export interface ButtonConfig {
  style?: ButtonStyle;
  disabledStyle?:ButtonStyle;
  hoverStyle?:ButtonStyle;
  color?: string;
  fill?: FillProps;
}

// router
export interface LayoutConfig {
  style?: TagStyle
}
export interface HeaderConfig {
  style?: TagStyle,
  headerTitleStyle?:Pick<TagStyle, "fontFamily" | "fontSize" | "fontWeight"> & {
    color?: string | undefined;
  }
}


// forms

export interface InputStyle extends TagStyle {
  placeholderColor?:string
}
export interface InputConfig {
  style?:InputStyle,
  disabledStyle?:InputStyle,
  errorStyle?:InputStyle,
  'type=checkbox'?:InputCheckboxConfig,
  'type=radio'?:InputRadioConfig,
  'type=date'?:InputDateConfig,
  'type=datetime-local'?:InputDateConfig,
  'type=time'?:InputDateConfig,
}
export interface InputCheckboxConfig {
  style?:InputCheckboxStyle,
  disabledStyle?:InputCheckboxStyle,
  errorStyle?:InputCheckboxStyle
}
export interface InputRadioConfig {
  style?:InputRadioStyle,
  disabledStyle?:InputRadioStyle,
  errorStyle?:InputRadioStyle
}
export interface InputDateConfig {
  style?:InputDateStyle,
  disabledStyle?:InputDateStyle,
  errorStyle?:InputDateStyle
}
export interface InputCheckboxStyle extends TagStyle {
  iconColor?:string,
  iconWidth?:number,
  iconHeight?:number
}
export interface InputRadioStyle extends TagStyle {
  iconColor?:string,
  iconWidth?:number,
  iconHeight?:number
}
export interface InputDateStyle extends TagStyle {
  iconColor?:string,
  iconWidth?:number,
  iconHeight?:number
}

export interface ErrorTextConfig {
  style?:TagStyle
}

export interface LabelConfig {
  style?:TagStyle,
  disabledStyle?:TagStyle,
  errorStyle?:TagStyle
}
import { GestureResponderEvent, PressableProps, TextProps, TextStyle } from "react-native";
export interface TagGroupConfig {
  // tag - default
  div?: TagConfig,
  button?: ButtonConfig,
  img?: TagConfig,
  // tag - additional
  h1?:TagConfig,
  h2?:TagConfig,
  h3?:TagConfig,
  p?:TagConfig,
  span?:TagConfig,
  dl?:TagConfig,
  dt?:TagConfig,
  dd?:TagConfig,
  main?:TagConfig,
  // tag - table
  table?:TagConfig,
  thead?:TagConfig,
  tbody?:TagConfig,
  tr?:TagConfig,
  th?:TagConfig,
  td?:TagConfig,
  // router
  layout?:TagConfig,
  header?:HeaderConfig,
  footer?:TagConfig,
  toast?:ToastConfig,
  // forms
  input?: InputConfig
  errorText?: ErrorTextConfig,
  label?: LabelConfig,
  select?: SelectConfig
}
export interface TagConfig {
  style?:TagStyle
}

export interface TagProps extends Omit<TextProps, 'style'|'onPress'> {
  tag?:string,
  childTag?:string,
  children?:TagElement,
  style?:TagStyle
}
export interface TagStyle extends Omit<TextStyle, 'display'> {
  display?: 'flex' | 'inline-flex' | 'none',
  whiteSpace?: 'pre-line'|'nowrap',
  icon?:TagElement,
  iconColor?:string,
  gap?:number,
  rowGap?:number,
  columnGap?:number,
  padding?:number,
  paddingBottom?:number,
  paddingTop?:number,
  paddingLeft?:number,
  paddingRight?:number,
  paddingVertical?:number,
  paddingHorizontal?:number
}
export type TagElement = JSX.Element|string|number|null|undefined|TagElement[];

// tags props
export interface ButtonClickEvent extends GestureResponderEvent {
  [name:string]:any
}

export interface ButtonProps extends Omit<PressableProps, 'style'|'children'|'onBlur'|'onFocus'|'onPress'> {
  tag?: 'div'|'button'|'a';
  animated?:boolean;
  style?: ButtonStyle;
  disabledStyle?:ButtonStyle;
  hoverStyle?:ButtonStyle;
  activeStyle?:ButtonStyle;
  color?: string;
  fill?: FillProps;
  onClick?: ((event: ButtonClickEvent) => void) | null | undefined;
  disabled?:boolean;
  children?:TagElement;
}

// tags config
export type FillProps = 'base' | 'outline' | 'translucent' | 'clear' | 'none';
export interface ButtonStyle extends TagStyle {
  cursor?:string
}
export interface ButtonConfig {
  animated?:boolean;
  style?: ButtonStyle;
  disabledStyle?:ButtonStyle;
  hoverStyle?:ButtonStyle;
  activeStyle?:ButtonStyle;
  color?: string;
  fill?: FillProps;
  'fill=base'?:ButtonFillConfig;
  'fill=outline'?:ButtonFillConfig;
  'fill=translucent'?:ButtonFillConfig;
  'fill=clear'?:ButtonFillConfig;
  'fill=none'?:ButtonFillConfig;
}
interface ButtonFillConfig {
  style?: ButtonStyle;
  disabledStyle?:ButtonStyle;
  hoverStyle?:ButtonStyle;
  activeStyle?:ButtonStyle;
  color?: string;
}

// router
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
  'type=month'?:InputDateConfig,
  'type=datetime-local'?:InputDateConfig,
  'type=time'?:InputDateConfig,
  'type=file'?:InputFileConfig,
}
export interface InputCheckboxConfig {
  style?:InputCheckboxStyle,
  checkedStyle?:InputCheckboxStyle,
  disabledStyle?:InputCheckboxStyle,
  errorStyle?:InputCheckboxStyle
}
export interface InputRadioConfig {
  style?:InputRadioStyle,
  checkedStyle?:InputRadioStyle,
  disabledStyle?:InputRadioStyle,
  errorStyle?:InputRadioStyle
}
export interface InputDateConfig {
  confirmText?:string,
  cancelText?:string,
  style?:InputDateStyle,
  disabledStyle?:InputDateStyle,
  errorStyle?:InputDateStyle
}
export interface InputFileConfig {
  cameraText?:string,
  albumText?:string,
  cancelText?:string,
  style?:InputStyle,
  disabledStyle?:InputStyle,
  errorStyle?:InputStyle,
  cameraButtonStyle?:ButtonStyle,
  albumButtonStyle?:ButtonStyle,
  cancelButtonStyle?:ButtonStyle
}
export interface SelectConfig {
  confirmText?:string,
  cancelText?:string,
  style?:SelectStyle,
  disabledStyle?:SelectStyle,
  errorStyle?:SelectStyle,
  confirmButtonStyle?:ButtonStyle,
  cancelButtonStyle?:ButtonStyle
}
export interface InputCheckboxStyle extends TagStyle {
  icon?:TagElement,
  iconColor?:string,
  iconWidth?:number,
  iconHeight?:number
}
export interface InputRadioStyle extends TagStyle {
  icon?:TagElement,
  iconColor?:string,
  iconWidth?:number,
  iconHeight?:number
}
export interface InputDateStyle extends TagStyle {
  icon?:TagElement,
  iconColor?:string,
  iconWidth?:number,
  iconHeight?:number
}

export interface SelectStyle extends InputStyle {
  icon?:TagElement,
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





/**************************************/
/*************** router ***************/
/**************************************/

export type ToastConfig = {
  message?:string,
  duration?:number,
  position?:'top'|'bottom',
  style?:TagStyle,
  contentStyle?:TagStyle
}
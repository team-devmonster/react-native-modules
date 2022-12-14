import { ButtonProps, ButtonStyle, InputStyle, TagProps, TagStyle } from "@team-devmonster/react-native-tags"
import { SyntheticEvent } from "react"
import { Control, FieldErrorsImpl, Path, UnPackAsyncDefaultValues } from "react-hook-form"
import { NativeSyntheticEvent, ReturnKeyType, TextInputFocusEventData, TextInputSubmitEditingEventData } from "react-native"

export interface InputRuleProps {
  required?: boolean | 
    string |
    {
      value: boolean,
      message: string
    },
  maxLength?: number |
    {
      value: number,
      message: string
    },
  minLength?:
    {
      value: number,
      message: string
    },
  max?: number |
    {
      value: number,
      message: string
    },
  min?:
    {
      value: number,
      message: string
    },
  pattern?:
    {
      value: RegExp,
      message: string
    },
  validate?:
    Function | Object,
  valueAsNumber?:
    boolean,
  valueAsDate?:
    boolean,
  setValueAs?:
    (value: any) => any,
  disabled?:
    boolean,
  onChange?:
    (e: SyntheticEvent) => void,
  onBlur?:
    (e: SyntheticEvent) => void,
  value?:
    any,
  shouldUnregister?:
    boolean,
  deps?:
    string | string[]
}

export interface FormValues {[name:string]:any};

export interface InputProps<T extends FormValues = any> extends InputRuleProps, Omit<ButtonProps, 'children'> {
  control:Control<T>,
  name:Path<UnPackAsyncDefaultValues<T>>,
  placeholder?:string,
  style?:InputStyle,
  disabledStyle?:InputStyle,
  errorStyle?:InputStyle,
  type?:InputType,
  returnKeyType?:ReturnKeyType,
  onEnter?:(e:NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void,
  onFocus?:((e: NativeSyntheticEvent<TextInputFocusEventData>) => void) | undefined,
  // options by types
  cameraText?:string,
  albumText?:string,
  confirmText?:string,
  cancelText?:string,
  cameraButtonStyle?:ButtonStyle,
  albumButtonStyle?:ButtonStyle,
  confirmButtonStyle?:ButtonStyle,
  cancelButtonStyle?:ButtonStyle,
  // input['type=checkbox']
  checkedStyle?:InputStyle,
  // input['type=file']
  accept?:string,
  multiple?:boolean
}
export type InputType = 'text'|'email'|'url'|'number'|'tel'|'password'|'checkbox'|'radio'|'file'|InputDateType;
export type InputDateType = 'date'|'month'|'time';

export interface LabelProps<T extends FormValues> extends TagProps {
  errors?: Partial<FieldErrorsImpl<T>>,
  disabled?:boolean,
  name?:Path<T>,
  style?:TagStyle,
  disabledStyle?:TagStyle,
  errorStyle?:TagStyle
}

export interface OptionProps {
  value:any,
  children: string
}

export interface SelectProps<T extends FormValues> extends Omit<InputProps<T>, 'type'|'cameraButtonStyle'|'albumButtonStyle'> {
  children?:JSX.Element | JSX.Element[]
}
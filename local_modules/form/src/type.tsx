import { ButtonProps, TagStyle } from "@team-devmonster/react-native-tags"
import { SyntheticEvent } from "react"
import { Control, Path } from "react-hook-form"

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

export interface InputProps<T extends FormValues = any> extends InputRuleProps, ButtonProps {
  control:Control<T>,
  name:Path<T>,
  placeholder?:string,
  style?:TagStyle,
  disabledStyle?:TagStyle,
  errorStyle?:TagStyle,
  type?:'text'|'email'|'url'|'number'|'tel'|'password'|'date'|'time'|'checkbox'|'radio'
}
import { SyntheticEvent } from "react"

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
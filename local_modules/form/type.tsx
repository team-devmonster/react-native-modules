import { SyntheticEvent } from "react"

export interface InputRuleProps {
  required?: string |
    {
      value: boolean,
      message: string
    },
  maxLength?:
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
  alueAsNumber?:
    boolean,
  valueAsDate?:
    boolean,
  setValueAs?:
    <T>(value: any) => T
  disabled?:
    boolean,
  onChange?:
    (e: SyntheticEvent) => void,
  onBlur?:
    (e: SyntheticEvent) => void,
  value?:
    unknown,
  shouldUnregister?:
    boolean,
  deps?:
    string | string[]
}
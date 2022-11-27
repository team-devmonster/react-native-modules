import React, { useState, useMemo } from "react";
import { useColorScheme, TextInput } from "react-native";
import { Control, Controller, Path as Names } from "react-hook-form"
import { Button, P, placeholderPattern, TagStyle, textPattern, useTags, useTagStyle } from "@team-devmonster/react-native-tags"
import DatePicker from 'react-native-date-picker';
import { FormValues, InputProps, InputType } from "./type";

export interface DateInputProps<T extends FormValues = any> extends InputProps<T> {
  control:Control<T>,
  name:Names<T>,
  style?:TagStyle,
  disabledStyle?:TagStyle,
  errorStyle?:TagStyle
}

export function DateInput<T extends FormValues>({
  control, 
  name, 
  placeholder,
  disabled,
  style,
  disabledStyle,
  errorStyle,
  value,
  type = 'date',
  onClick,
  ...rules
}:DateInputProps) {

  const mode = useMemo(() => getMode({ type }), [type]);
  const [open, setOpen] = useState(false)

  const colorScheme = useColorScheme();
  const { tagConfig } = useTags();

  const inputTagStyle = tagConfig?.input?.style;
  const inputTagDisabledStyle = tagConfig?.input?.disabledStyle;
  const inputTagErrorStyle = tagConfig?.input?.errorStyle;

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={value}
      rules={rules as any}
      render={({
        field: { ref, onChange, value, onBlur },
        fieldState: { error }
      }) => {

        const [
          placeholderStyle,
          textStyle,
          inputStyle
        ]
        = useTagStyle([
          placeholderPattern,
          textPattern
        ], [
          inputTagStyle, 
          disabled ? inputTagDisabledStyle : undefined,
          error ? inputTagErrorStyle : undefined,
          style,
          disabled ? disabledStyle : undefined,
          error ? errorStyle : undefined
        ]);

        const { date, isValid } = useMemo(() => getDate({ value }), [value]);
        
        return (
          <Button 
            fill="none"
            color={colorScheme === 'dark' ? '#000000' : '#ffffff'}
            style={{
              flexDirection: 'row',
              ...inputStyle
            }}
            onClick={() => setOpen(true)}
          >
            <TextInput
              showSoftInputOnFocus={false}
              ref={ref}
              onBlur={onBlur}
              style={{ position: 'absolute', top: -2, left: 0, width: 1, height: 1, zIndex: -1, opacity: 0 }}
            />
            <DatePicker
              modal
              title={placeholder}
              mode={mode}
              open={open}
              date={date}
              onConfirm={(date:Date) => {
                const value = getValue({ type, date });
                onChange(value);
                setOpen(false);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
            {
              isValid
              ?
                <P 
                  style={{
                    flex: 1,
                    ...textStyle
                  }}>
                  {value}
                </P>
              :
                <P 
                  style={{
                    flex: 1,
                    ...textStyle,
                    color: placeholderStyle?.placeholderColor
                  }}>
                  {placeholder}
                </P>
            }
          </Button>
        )
      }}
    />
  )
}

const getMode = ({type}:{type:InputType}) => {
  switch(type) {
    case 'date':
    case 'time':
      return type;
    default:
      return 'datetime';
  }
}
const getDate = ({value}:{value:string}) => {
  const timeReg = /^\d{2}:\d{2}$/;
  if(timeReg.test(value)) {
    value = `${today()} ${value}`;
  }
  let date:any = new Date(value);
  let isValid = true;
  if(isNaN(date)) {
    date = new Date();
    isValid = false;
  }
  return { date, isValid };
}

const getValue = ({type, date:_date}:{ type:InputType, date:Date}) => {
  const date = `${_date.getFullYear()}-${toXX(_date.getMonth()+1)}-${toXX(_date.getDate())}`;
  const time = `${toXX(_date.getHours())}:${toXX(_date.getMinutes())}`;

  switch(type) {
    case 'date':
      return date;
    case 'datetime-local':
      return `${date} ${time}`;
    case 'time':
      return `${time}`;
  }
}

const toXX = (num:number) => {
  return num < 10 ? `0${num}` : num;
}

const today = () => {
  const date = new Date();
  return `${date.getFullYear()}-${toXX(date.getMonth()+1)}-${toXX(date.getDate())}`;
}
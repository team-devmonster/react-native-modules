import React, { useState, useMemo } from "react";
import { Modal, Platform, TextInput, useColorScheme } from "react-native";
import { Control, Controller, Path as Names, UnPackAsyncDefaultValues } from "react-hook-form"
import { Button, InputConfig, P, TagGroupConfig, TagStyle, textPattern, useTags, useTagStyle } from "@team-devmonster/react-native-tags"
import DatePicker from 'react-native-date-picker';
import MonthPicker from 'react-native-month-year-picker';
import { FormValues, InputDateType, InputProps } from "./type";
import Svg, { Path } from "react-native-svg";
import { textColor } from "./utils";

export interface DateInputProps<T extends FormValues = any> extends InputProps<T> {
  control:Control<T>,
  name:Names<UnPackAsyncDefaultValues<T>>,
  style?:TagStyle,
  disabledStyle?:TagStyle,
  errorStyle?:TagStyle,
  type:InputDateType
}

export function DateInput<T extends FormValues>({
  confirmText,
  cancelText,
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
}:DateInputProps<T>) {

  const mode = useMemo(() => getMode({ type }), [type]);
  const [open, setOpen] = useState(false);
  const colorScheme = useColorScheme();

  const { tagConfig } = useTags();

  const styles = useMemo(() => getStyles({ tagConfig, type }), [tagConfig?.input, type]);

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
          textStyle,
          inputStyle
        ]
        = useTagStyle([
          textPattern
        ], [
          styles.tagStyle, 
          disabled ? styles.tagDisabledStyle : undefined,
          error ? styles.tagErrorStyle : undefined,
          style,
          disabled ? disabledStyle : undefined,
          error ? errorStyle : undefined
        ]);

        const { date, isValid } = useMemo(() => getDate({ value }), [value]);
        console.log(date, open);
        
        return (
          <Button 
            onClick={(e) => {
              setOpen(true);
              onClick?.(e);
            }}
            fill="none"
            color={inputStyle?.backgroundColor}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              ...inputStyle
            }}
            disabled={disabled}
          >
            <TextInput
              showSoftInputOnFocus={false}
              ref={ref}
              onBlur={onBlur}
              style={{ position: 'absolute', top: -2, left: 0, width: 1, height: 1, zIndex: -1, opacity: 0 }}
            />
            {
              isValid
              ?
                <P style={{ flex: 1, ...textStyle }}>{value}</P>
              :
                <P style={{ flex: 1, ...textStyle, color: inputStyle?.placeholderColor}}>{placeholder}</P>
            }
            {
              {
                'date': (
                  <Svg
                    width={inputStyle?.iconWidth || 24}
                    height={inputStyle?.iconWidth || 24}
                    viewBox="0 0 24 24"
                    fill={inputStyle?.iconColor || '#FF6420'}
                  >
                    <Path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm-5.25 3a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm.75 1.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm1.5-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm.75 1.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm1.5-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm.75 1.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm1.5-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm.75 1.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm1.5-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm-1.5-3a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm1.5.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5z" />
                    <Path
                      fillRule="evenodd"
                      d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5z"
                      clipRule="evenodd"
                    />
                  </Svg>
                ),
                'month': (
                  <Svg
                    width={inputStyle?.iconWidth || 24}
                    height={inputStyle?.iconWidth || 24}
                    viewBox="0 0 24 24"
                    fill={inputStyle?.iconColor || '#FF6420'}
                  >
                    <Path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm-5.25 3a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm.75 1.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm1.5-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm.75 1.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm1.5-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm.75 1.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm1.5-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm.75 1.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm1.5-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm-1.5-3a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm1.5.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5z" />
                    <Path
                      fillRule="evenodd"
                      d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5z"
                      clipRule="evenodd"
                    />
                  </Svg>
                ),
                'time': (
                  <Svg
                    width={inputStyle?.iconWidth || 24}
                    height={inputStyle?.iconWidth || 24}
                    viewBox="0 0 24 24"
                    fill={inputStyle?.iconColor || '#FF6420'}
                  >
                    <Path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6z"
                      clipRule="evenodd"
                    />
                  </Svg>
                ),
                'datetime-local': (
                  <Svg
                    width={inputStyle?.iconWidth || 24}
                    height={inputStyle?.iconWidth || 24}
                    viewBox="0 0 24 24"
                    fill={inputStyle?.iconColor || '#FF6420'}
                  >
                    <Path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6z"
                      clipRule="evenodd"
                    />
                  </Svg>
                )
              }[type]
            }
            {
              type === 'month' ?
                Platform.OS === 'ios' ?
                  <Modal 
                    transparent={true}
                    visible={open} 
                    onRequestClose={() => setOpen(false)}
                    animationType="fade"
                  >
                    <Button 
                      onClick={() => setOpen(false)}
                      fill="none" 
                      style={{ backgroundColor: 'black', opacity: 0.3, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    />
                    <MonthPicker
                      value={date}
                      okButton={confirmText || '확인'}
                      cancelButton={cancelText || '취소'}
                      onChange={(event, newDate) => {
                        setOpen(false);
                        if(newDate) {
                          const value = getValue({ type, date: newDate });
                          onChange(value);
                        }
                      }}
                      locale="ko"
                    ></MonthPicker>
                  </Modal>
                :
                  open ?
                    <MonthPicker
                    value={date}
                    okButton={confirmText || '확인'}
                    cancelButton={cancelText || '취소'}
                    onChange={(event, newDate) => {
                      setOpen(false);
                      if(newDate) {
                        const value = getValue({ type, date: newDate });
                        onChange(value);
                      }
                    }}
                    locale="ko"
                  ></MonthPicker>
                : null
              :
                <DatePicker
                  modal
                  title={placeholder}
                  confirmText={confirmText || '확인'}
                  cancelText={cancelText || '취소'}
                  mode={mode}
                  open={open}
                  date={date}
                  theme={Platform.OS === 'ios' ? 'auto' : 'light'}
                  textColor={Platform.OS === 'ios' ? textColor({ colorScheme }) : '#1f1f1f'}
                  onConfirm={(date:Date) => {
                    const value = getValue({ type, date });
                    onChange(value);
                    setOpen(false);
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                />
            }
          </Button>
        )
      }}
    />
  )
}

const getMode = ({type}:{type:InputDateType}) => {
  switch(type) {
    case 'date':
    case 'time':
      return type;
    /* case 'datetime-local':
      return 'datetime'; */
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

const getValue = ({type, date:_date}:{ type:InputDateType, date:Date}) => {
  switch(type) {
    case 'date':
      const date = `${_date.getFullYear()}-${toXX(_date.getMonth()+1)}-${toXX(_date.getDate())}`;
      return date;
    /* case 'datetime-local':
      return `${date} ${time}`; */
    case 'month':
      const month = `${_date.getFullYear()}-${toXX(_date.getMonth()+1)}`;
      return month;
    case 'time':
      const time = `${toXX(_date.getHours())}:${toXX(_date.getMinutes())}`;
      return time;
  }
}

const toXX = (num:number) => {
  return num < 10 ? `0${num}` : num;
}

const today = () => {
  const date = new Date();
  return `${date.getFullYear()}-${toXX(date.getMonth()+1)}-${toXX(date.getDate())}`;
}

const getStyles = ({ tagConfig, type }:{ tagConfig:TagGroupConfig|undefined, type:InputDateType }) => {
  const inputTagStyle = tagConfig?.input?.style;
  const inputDisabledTagStyle = tagConfig?.input?.disabledStyle;
  const inputErrorTagStyle = tagConfig?.input?.errorStyle;

  const dateType:keyof InputConfig = `type=${type}`;
  const dateTagStyle = tagConfig?.input?.[dateType]?.style;
  const dateTagDisabledStyle = tagConfig?.input?.[dateType]?.disabledStyle;
  const dateTagErrorStyle = tagConfig?.input?.[dateType]?.errorStyle;

    return {
      tagStyle:  {
        ...inputTagStyle,
        ...dateTagStyle
      },
      tagDisabledStyle: {
        ...inputDisabledTagStyle,
        ...dateTagDisabledStyle
      },
      tagErrorStyle: {
        ...inputErrorTagStyle,
        ...dateTagErrorStyle
      }
    }
}
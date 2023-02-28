import { forwardRef, useCallback, useMemo, useState } from "react";
import { Platform, useColorScheme, TextInput } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";

import { Button, useTags, TagStyle, TagGroupConfig, InputConfig, useTagStyle, textPattern, P, InputStyle } from "@team-devmonster/react-native-tags";
import { Modal } from "@team-devmonster/react-native-router";

import { FormValues, InputProps, InputDateType } from "./type";
import { Controller } from "react-hook-form";
import { getIcon } from "./utils";
import Svg, { Path } from "react-native-svg";

export interface TimeInputProps<T extends FormValues = any> extends InputProps<T> {
  type:InputDateType
}
export const TimeInput = ({
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
}:TimeInputProps) => {

  const colorScheme = useColorScheme();
  colorScheme
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

        const { icon, iconStyle } = useMemo(() => getIcon({ iconObj: inputStyle}), [inputStyle.icon]);
        
        const { date, isValid } = useMemo(() => getDate({ value }), [value]);

        return (
          Platform.OS === 'android' ?
            <CalendarAndroid
              ref={ref}
              type={type}
              date={date}
              value={value}
              placeholder={placeholder}
              isValid={isValid}
              style={inputStyle}
              textStyle={textStyle}
              icon={icon} 
              iconStyle={iconStyle}
              onChange={onChange}
              onBlur={onBlur}
            />
          :
            <CalendarIOS 
              ref={ref}
              type={type}
              date={date}
              value={value}
              placeholder={placeholder}
              isValid={isValid}
              style={inputStyle}
              textStyle={textStyle}
              icon={icon} 
              iconStyle={iconStyle}
              onChange={onChange}
              onBlur={onBlur}
            />
        )
      }}
    />
  )
}

type CalendarProps = {
  date:Date,
  value:string,
  placeholder?:string,
  type:InputDateType,
  isValid:boolean,
  style?:InputStyle,
  textStyle?:TagStyle,
  icon?:JSX.Element | null,
  iconStyle:TagStyle,
  onChange:any,
  onBlur:any
}
const CalendarAndroid = forwardRef<TextInput, CalendarProps>(({ date, value, placeholder, type, isValid, style, textStyle, icon, iconStyle, onChange, onBlur }:CalendarProps, ref) => {

  const [open, setOpen] = useState<'calendar'|'clock'|'none'>('none');

  const onChangeDate = useCallback((event:DateTimePickerEvent, date?:Date) => {
    if(date) {
      const value = getValue({ type, date });
      onChange(value);

      if(type === 'datetime-local') {
        if(open === 'calendar') {
          setOpen('clock');
        }
        else {
          setOpen('none');  
        }
      }
      else {
        setOpen('none');
      }
    }
  }, [type, onChange]);

  const onClick = useCallback(() => {
    if(type === 'date'
    || type === 'datetime-local') {
      setOpen('calendar');
    }
    else { // type === time
      setOpen('clock');
    }
  }, []);

  return (
    <>
      <Button 
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          ...style as any
        }}
        color={style?.backgroundColor as string}
        fill="none"
        onClick={onClick}
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
            <P style={{ flex: 1, ...textStyle, color: style?.placeholderColor}}>{placeholder}</P>
        }
        {
          icon ? 
            icon
          :
            <Svg
              width={iconStyle?.width || 24}
              height={iconStyle?.height || 24}
              viewBox="0 0 24 24"
              fill={style?.color || '#FF6420'}
            >
              <Path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm-5.25 3a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm.75 1.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm1.5-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm.75 1.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm1.5-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm.75 1.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm1.5-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm.75 1.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm1.5-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm-1.5-3a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm1.5.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5z" />
              <Path
                fillRule="evenodd"
                d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5z"
                clipRule="evenodd"
              />
            </Svg>
        }
      </Button>
      {
        open === 'calendar' ?
          <DateTimePicker
            value={date}
            display="calendar"
            mode="date"
            onChange={onChangeDate}
          />
        : 
        open === 'clock' ?
          <DateTimePicker
            value={date}
            display="calendar"
            mode="date"
            onChange={onChangeDate}
          />
        : null
      }
    </>
  )
})
const CalendarIOS = forwardRef<TextInput, CalendarProps>(({ date, value, placeholder, type, isValid, style, textStyle, icon, iconStyle, onChange, onBlur }:CalendarProps, ref) => {

  const [open, setOpen] = useState(false);

  const { mode, display } = useMemo(() => getIOSMode(type), [type]);

  const onChangeDate = useCallback((event:DateTimePickerEvent, date?:Date) => {
    if(date) {
      const value = getValue({ type, date });
      console.log(value);
      onChange(value);
    }
  }, [type, onChange]);

  return (
    <>
      <Button 
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          ...style as any
        }}
        color={style?.backgroundColor as string}
        fill="none"
        onClick={() => setOpen(true)}
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
            <P style={{ flex: 1, ...textStyle, color: style?.placeholderColor}}>{placeholder}</P>
        }
        {
          icon ? 
            icon
          :
            <Svg
              width={iconStyle?.width || 24}
              height={iconStyle?.height || 24}
              viewBox="0 0 24 24"
              fill={style?.color || '#FF6420'}
            >
              <Path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm-5.25 3a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm.75 1.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm1.5-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm.75 1.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm1.5-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm.75 1.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm1.5-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm.75 1.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm1.5-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm-1.5-3a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm1.5.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5z" />
              <Path
                fillRule="evenodd"
                d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5z"
                clipRule="evenodd"
              />
            </Svg>
        }
      </Button>
      <Modal
        type="center"
        contentStyle={{
          backgroundColor: '#ffffff', 
          borderRadius: 10,
          paddingTop: 5,
          paddingBottom: 5,
          paddingLeft: 10,
          paddingRight: 10
        }}
        visible={open}
        onRequestClose={() => {
          setOpen(false);
        }}
      >
        <DateTimePicker
          value={date}
          display={display}
          mode={mode}
          onChange={onChangeDate}
        />
      </Modal>
    </>
  )
})

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

const getValue = ({type, date:_date}:{ type:InputDateType, date:Date}) => {
  switch(type) {
    case 'date': {
      const date = `${_date.getFullYear()}-${toXX(_date.getMonth()+1)}-${toXX(_date.getDate())}`;
      return date;
    }
    case 'datetime-local': {
      const date = `${_date.getFullYear()}-${toXX(_date.getMonth()+1)}-${toXX(_date.getDate())}`;
      const time = `${toXX(_date.getHours())}:${toXX(_date.getMinutes())}`;
      return `${date} ${time}`;
    }
    case 'month': {
      const month = `${_date.getFullYear()}-${toXX(_date.getMonth()+1)}`;
      return month;
    }
    case 'time': {
      const time = `${toXX(_date.getHours())}:${toXX(_date.getMinutes())}`;
      return time;
    }
  }
}

const getDate = ({value}:{value:string}) => {
  const timeReg = /^\d{2}:\d{2}$/;
  if(timeReg.test(value)) {
    value = `${today()} ${value}`;
  }
  let date:any = new Date(value);
  console.log(value, date);
  let isValid = true;
  if(isNaN(date)) {
    date = new Date();
    isValid = false;
  }
  return { date, isValid };
}
const today = () => {
  const date = new Date();
  return `${date.getFullYear()}-${toXX(date.getMonth()+1)}-${toXX(date.getDate())}`;
}
const toXX = (num:number) => {
  return num < 10 ? `0${num}` : num;
}

const getIOSMode = (type:InputDateType) => {
  switch(type) {
    case 'date':
      return { mode: 'date', display: 'inline' } as const;
    case 'time':
      return { mode: 'time', display: 'spinner' } as const;
    case 'datetime-local':
      return { mode: 'date', display: 'inline' } as const;
    default:
      return { mode: 'date', display: 'inline' } as const;
  }
}
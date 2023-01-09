import React, { useEffect, useMemo, useRef, useState } from "react";
import { Animated, ColorSchemeName, Easing, Modal, Platform, StyleSheet, TextInput, TouchableWithoutFeedback, useColorScheme } from "react-native";
import { Controller } from 'react-hook-form';
import { Picker } from "@react-native-picker/picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTagStyle, Button, TagGroupConfig, P, textPattern, ButtonStyle, useTags, iconPattern } from '@team-devmonster/react-native-tags';
import { FormValues, SelectProps } from "./type";
import Svg, { Path } from "react-native-svg";

export function Select<T extends FormValues>({
  control, 
  name, 
  confirmText,
  cancelText,
  confirmButtonStyle,
  cancelButtonStyle,
  placeholder,
  disabled,
  style,
  disabledStyle,
  errorStyle,
  value,
  onClick,
  children,
  ...rules
}:SelectProps<T>) {

  const colorScheme = useColorScheme();
  const { tagConfig } = useTags();
  const styles = useMemo(() => getStyles({ tagConfig }), [tagConfig?.input]);
  const buttonStyles = useMemo(() => getButtonStyles({ styles, confirmButtonStyle, cancelButtonStyle }), [styles, confirmButtonStyle, cancelButtonStyle]);
  const defaultStyle = useMemo(() => ({
    backgroundColor: colorScheme === 'dark' ? '#272727' : '#f2f2f2'
  }), [colorScheme])

  const safe = useSafeAreaInsets();
  const pickerRef = useRef<Picker<any>>(null);
  const enterAnim = useRef(new Animated.Value(0)).current;
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  const openModal = () => {
    if(Platform.OS === 'android') {
      pickerRef.current?.focus();
    }
    else {
      setOpen(true);
    }
  }

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

        const [temptValue, setTemptValue] = useState(value);

        useEffect(() => {
          if(open) {
            setVisible(true);
            Animated.timing(enterAnim, {
              toValue: 1,
              duration: 280,
              easing: Easing.bezier(.26,.64,.62,.99),
              useNativeDriver: true
            })
            .start(() => {
              setTemptValue(value);
            });
          }
          else {
            Animated.timing(enterAnim, {
              toValue: 0,
              duration: 200,
              easing: Easing.ease,
              useNativeDriver: true
            })
            .start(() => {
              setVisible(false);
            });
          }
        }, [open]);

        const [
          iconStyle,
          textStyle,
          inputStyle
        ]
        = useTagStyle([
          iconPattern,
          textPattern
        ], [
          styles.tagStyle, 
          disabled ? styles.tagDisabledStyle : undefined,
          error ? styles.tagErrorStyle : undefined,
          style,
          disabled ? disabledStyle : undefined,
          error ? errorStyle : undefined
        ]);

        const PickerItem = useMemo(() => getPickerItem({ children, colorScheme }), [children, colorScheme]);
        const selectedPickerItem = useMemo(() => getSelectedPickerItem({ children, value }), [children, value]);

        return (
          <Button
            onClick={(e) => {
              openModal();
              onClick?.(e);
            }}
            color={inputStyle?.backgroundColor}
            fill="none"
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
              selectedPickerItem
              ?
                <P style={{ flex: 1, ...textStyle }}>{selectedPickerItem.props.children}</P>
              :
                <P style={{ flex: 1, ...textStyle, color: inputStyle?.placeholderColor}}>{placeholder}</P>
            }
            {
              iconStyle?.icon ?
                iconStyle.icon
              :
                <Svg
                  width={iconStyle?.iconWidth || 24}
                  height={iconStyle?.iconWidth || 24}
                  viewBox="0 0 24 24"
                  fill={iconStyle?.iconColor || '#FF6420'}
                >
                  <Path
                    fillRule="evenodd"
                    d="M11.47 4.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1-1.06 1.06L12 6.31 8.78 9.53a.75.75 0 0 1-1.06-1.06l3.75-3.75zm-3.75 9.75a.75.75 0 0 1 1.06 0L12 17.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0l-3.75-3.75a.75.75 0 0 1 0-1.06z"
                    clipRule="evenodd"
                  />
                </Svg>
            }

            {
              // hidden layout part for android
              Platform.OS === 'android' ?
              <Picker
              ref={pickerRef}
              style={{ display: 'none', opacity: 0, width: 0, height: 0 }}
              enabled={!disabled}
              selectedValue={value}
              onValueChange={onChange}>
                <Picker.Item color={inputStyle?.placeholderColor} label={placeholder||'선택'} value={null}></Picker.Item>
                {PickerItem}
              </Picker>
              : null
            }

            {
              // modal layout part for ios
              Platform.OS === 'ios' ?
              <Modal 
                visible={visible} 
                animationType="none"
                transparent={true}
                onRequestClose={() => setOpen(false)}>
                <TouchableWithoutFeedback onPress={() => setOpen(false)}>
                  <Animated.View
                    style={{
                      flex: 1,
                      backgroundColor: 'black',
                      opacity: enterAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 0.3]
                      })
                    }}>
                  </Animated.View>
                </TouchableWithoutFeedback>
                <Animated.View style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  paddingBottom: safe.bottom + 8,
                  paddingLeft: safe.left + 8,
                  paddingRight: safe.right + 8,
                  transform: [
                    {
                      translateY: enterAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [500, 0]
                      })
                    }
                  ]
                }}>
                  <Picker
                    style={{
                      backgroundColor: defaultStyle.backgroundColor,
                      borderTopRightRadius: 12,
                      borderTopLeftRadius: 12,
                      borderBottomWidth: StyleSheet.hairlineWidth,
                      borderBottomColor: colorScheme === 'dark' ? '#383838' : '#b1b1b1',
                      height: 240,
                      justifyContent: 'center',
                    }}
                    selectedValue={temptValue}
                    onValueChange={(e, i) => {
                      setTemptValue(e);
                    }}>
                      <Picker.Item color={inputStyle?.placeholderColor} label={placeholder||'선택'} value={null}></Picker.Item>
                      {PickerItem}
                  </Picker>
                  <Button 
                    onClick={() => {
                      if(value !== temptValue) {
                        onChange(temptValue);
                      }
                      setOpen(false);
                    }}
                    fill="none"
                    style={{
                      marginBottom: 8,
                      borderRadius: 12,
                      borderTopRightRadius: 0,
                      borderTopLeftRadius: 0,
                      height: 52,
                      fontSize: 18,
                      alignItems: 'center',
                      justifyContent: 'center',
                      ...buttonStyles.confirmButtonStyle
                    }}
                    color={buttonStyles.confirmButtonStyle?.backgroundColor as string ?? defaultStyle.backgroundColor}
                    >확인</Button>
                  <Button 
                    onClick={() => setOpen(false)}
                    fill="none"
                    style={{
                      borderRadius: 12,
                      height: 52,
                      fontSize: 18,
                      alignItems: 'center',
                      justifyContent: 'center',
                      ...buttonStyles.cancelButtonStyle
                    }}
                    color={buttonStyles.cancelButtonStyle?.backgroundColor as string ?? defaultStyle.backgroundColor}
                    >취소</Button>
                </Animated.View>
              </Modal>
              : null
            }
          </Button>
        )
      }}
    />
  )
}

const getStyles = ({ tagConfig }:{ tagConfig:TagGroupConfig|undefined }) => {
  const inputTagStyle = tagConfig?.input?.style;
  const inputDisabledTagStyle = tagConfig?.input?.disabledStyle;
  const inputErrorTagStyle = tagConfig?.input?.errorStyle;

  const selectTagStyle = tagConfig?.select?.style;
  const selectTagDisabledStyle = tagConfig?.select?.disabledStyle;
  const selectTagErrorStyle = tagConfig?.select?.errorStyle;

  const confirmButtonStyle = tagConfig?.select?.confirmButtonStyle;
  const cancelButtonStyle = tagConfig?.select?.cancelButtonStyle;

    return {
      tagStyle:  {
        ...inputTagStyle,
        ...selectTagStyle
      },
      tagDisabledStyle: {
        ...inputDisabledTagStyle,
        ...selectTagDisabledStyle
      },
      tagErrorStyle: {
        ...inputErrorTagStyle,
        ...selectTagErrorStyle
      },
      confirmButtonStyle,
      cancelButtonStyle
    }
}

const getButtonStyles = ({ styles, confirmButtonStyle, cancelButtonStyle }:{ styles:ReturnType<typeof getStyles>, confirmButtonStyle?:ButtonStyle, cancelButtonStyle?:ButtonStyle }) => {
  return {
    confirmButtonStyle: {
      ...styles.confirmButtonStyle,
      ...confirmButtonStyle
    },
    cancelButtonStyle: {
      ...styles.cancelButtonStyle,
      ...cancelButtonStyle
    }
  }
}

const getPickerItem = ({children:options,colorScheme}:{children:JSX.Element|JSX.Element[]|undefined,colorScheme:ColorSchemeName}) => {
  if(Array.isArray(options)) {
    return options.map(({ props: { children:label, value:optionValue } }, i) => (
      <Picker.Item key={i} label={label} value={optionValue}/>
    ))
  }
  else {
    const { children:label, value:optionValue } = options?.props || {};
    return <Picker.Item label={label} value={optionValue}/>
  }
}

const getSelectedPickerItem = ({children:options,value}:{children:JSX.Element|JSX.Element[]|undefined,value:any}):JSX.Element|null => {
  if(Array.isArray(options)) {
    return options.find(({ props: { value:optionValue } }) => {
      return value === optionValue;
    }) ?? null;
  }
  else {
    const option = options;
    if(option) {
      const { value:optionValue } = option.props;
      return value === optionValue ? option : null;
    }
    else {
      return null;
    }
  }
}
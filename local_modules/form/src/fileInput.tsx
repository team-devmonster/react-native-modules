import React, { useRef, useMemo, useState, useEffect } from "react";
import { FormValues, InputProps } from "./type";
import { Controller } from 'react-hook-form';
import { TextInput, Modal, TouchableWithoutFeedback, Animated, useColorScheme, Easing, StyleSheet } from "react-native";
import { Button, ButtonStyle, P, TagGroupConfig, textPattern, useTags, useTagStyle } from '@team-devmonster/react-native-tags';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function FileInput<T extends FormValues>(props:InputProps<T>) 
{
  const {
    control, 
    name,
    cameraText,
    albumText,
    cancelText,
    cameraButtonStyle,
    albumButtonStyle,
    cancelButtonStyle,
    placeholder,
    disabled,
    style,
    disabledStyle,
    errorStyle,
    value,
    multiple,
    onClick,
    onChange:_onChange,
    ...rules
  } = props;

  const safe = useSafeAreaInsets();
  const enterAnim = useRef(new Animated.Value(0)).current;
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  const colorScheme = useColorScheme();
  const { tagConfig } = useTags();

  const config = useMemo(() => getConfig({ tagConfig }), [tagConfig?.input]);
  const buttonConfig = useMemo(() => 
    getButtonConfig({ 
      config, 
      cameraText, 
      albumText, 
      cancelText, 
      cameraButtonStyle, 
      albumButtonStyle, 
      cancelButtonStyle 
    }), 
    [
      config, 
      cameraText, 
      albumText, 
      cancelText, 
      albumButtonStyle, 
      cameraButtonStyle, 
      albumButtonStyle, 
      cancelButtonStyle
    ]
  );
  const defaultStyle = useMemo(() => ({
    backgroundColor: colorScheme === 'dark' ? '#272727' : '#f2f2f2'
  }), [colorScheme])

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
          config.tagStyle, 
          disabled ? config.tagDisabledStyle : undefined,
          error ? config.tagErrorStyle : undefined,
          style,
          disabled ? disabledStyle : undefined,
          error ? errorStyle : undefined
        ]);

        useEffect(() => {
          if(open) {
            setVisible(true);
            Animated.timing(enterAnim, {
              toValue: 1,
              duration: 280,
              easing: Easing.bezier(.26,.64,.62,.99),
              useNativeDriver: true
            })
            .start();
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
        
        return (
          <Button
            onClick={async(e) => {
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
          >
            <TextInput
              showSoftInputOnFocus={false}
              ref={ref}
              onBlur={onBlur}
              style={{ position: 'absolute', top: -2, left: 0, width: 1, height: 1, zIndex: -1, opacity: 0 }}
            />
            {
              value?.[0]
              ?
                <P style={{ flex: 1, ...textStyle }}>{value[0].fileName}</P>
              :
                <P style={{ flex: 1, ...textStyle, color: inputStyle?.placeholderColor}}>{placeholder}</P>
            }
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
                <Button 
                  onClick={async(e) => {
                    const result = await launchCamera({ mediaType: 'photo', maxWidth: 1200, maxHeight: 1200 });
                    if(multiple) {
                      onChange([...value, ...(result.assets || [])]);
                    }
                    else {
                      onChange(result.assets);
                    }
                    _onChange?.({...e, target: { ...e.target, value: result.assets }} as any);
                    setOpen(false);
                  }}
                  fill="none"
                  style={{
                    borderRadius: 12,
                    borderBottomRightRadius: 0,
                    borderBottomLeftRadius: 0,
                    height: 52,
                    fontSize: 18,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    borderBottomColor: colorScheme === 'dark' ? '#313131' : '#b1b1b1',
                    alignItems: 'center',
                    justifyContent: 'center',
                    ...buttonConfig.cameraButtonStyle
                  }}
                  color={buttonConfig.cameraButtonStyle?.backgroundColor as string || defaultStyle.backgroundColor}
                >
                  { buttonConfig.cameraText }
                </Button>
                <Button 
                  onClick={async(e) => {
                    const result = await launchImageLibrary({ mediaType: 'photo', maxWidth: 1200, maxHeight: 1200 });
                    if(multiple) {
                      onChange([...value, ...(result.assets || [])]);
                    }
                    else {
                      onChange(result.assets);
                    }
                    _onChange?.({...e, target: { ...e.target, value: result.assets }} as any);
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
                    ...buttonConfig.albumButtonStyle
                  }}
                  color={buttonConfig.albumButtonStyle?.backgroundColor as string || defaultStyle.backgroundColor}
                >
                  { buttonConfig.albumText }
                </Button>
                <Button 
                  onClick={() => setOpen(false)}
                  fill="none"
                  style={{
                    borderRadius: 12,
                    height: 52,
                    fontSize: 18,
                    alignItems: 'center',
                    justifyContent: 'center',
                    ...buttonConfig.cancelButtonStyle
                  }}
                  color={buttonConfig.cancelButtonStyle?.backgroundColor as string || defaultStyle.backgroundColor}
                >
                  { buttonConfig.cancelText }
                </Button>
              </Animated.View>
            </Modal>
          </Button>
        )
      }}
    />
  )
}

const getConfig = ({ tagConfig }:{ tagConfig:TagGroupConfig|undefined }) => {
  const inputTagStyle = tagConfig?.input?.style;
  const inputDisabledTagStyle = tagConfig?.input?.disabledStyle;
  const inputErrorTagStyle = tagConfig?.input?.errorStyle;

  const tagStyle = tagConfig?.input?.['type=file']?.style;
  const tagDisabledStyle = tagConfig?.input?.['type=file']?.disabledStyle;
  const tagErrorStyle = tagConfig?.input?.['type=file']?.errorStyle;

  const cameraButtonStyle = tagConfig?.input?.['type=file']?.cameraButtonStyle;
  const albumButtonStyle = tagConfig?.input?.['type=file']?.albumButtonStyle;
  const cancelButtonStyle = tagConfig?.input?.['type=file']?.cancelButtonStyle;

  const cameraText = tagConfig?.input?.['type=file']?.cameraText;
  const albumText = tagConfig?.input?.['type=file']?.albumText;
  const cancelText = tagConfig?.input?.['type=file']?.cancelText;

  return {
    tagStyle:  {
      ...inputTagStyle,
      ...tagStyle
    },
    tagDisabledStyle: {
      ...inputDisabledTagStyle,
      ...tagDisabledStyle
    },
    tagErrorStyle: {
      ...inputErrorTagStyle,
      ...tagErrorStyle
    },
    cameraButtonStyle,
    albumButtonStyle,
    cancelButtonStyle,
    cameraText,
    albumText,
    cancelText
  }
}

interface GetButtonConfigProps {
  config:ReturnType<typeof getConfig>,
  cameraText?:string,
  albumText?:string,
  cancelText?:string,
  cameraButtonStyle?:ButtonStyle, 
  albumButtonStyle?:ButtonStyle, 
  cancelButtonStyle?:ButtonStyle
}
const getButtonConfig = ({ 
  config, 
  cameraText,
  albumText,
  cancelText,
  cameraButtonStyle, 
  albumButtonStyle, 
  cancelButtonStyle 
}:GetButtonConfigProps) => {
  return {
    cameraText: config.cameraText || cameraText || '카메라',
    albumText: config.albumText || albumText || '앨범',
    cancelText: config.cancelText || cancelText || '취소',
    cameraButtonStyle: {
      ...config.cameraButtonStyle,
      ...cameraButtonStyle
    },
    albumButtonStyle: {
      ...config.albumButtonStyle,
      ...albumButtonStyle
    },
    cancelButtonStyle: {
      ...config.cancelButtonStyle,
      ...cancelButtonStyle
    }
  }
}
import React, { Children, useMemo, useRef, useState } from "react";
import { TextInput, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { Controller } from 'react-hook-form';

import { useTheme } from "@team-devmonster/react-native-theme";
import { useTagStyle, Button, TagGroupConfig, P, textPattern, useTags } from '@team-devmonster/react-native-tags';
import { Modal } from "@team-devmonster/react-native-router";

import { FormValues, SelectProps } from "./type";
import { getIcon } from "./utils";
import { ZoomInEasyUp } from "react-native-reanimated";

export function SelectPopover<T extends FormValues>({
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
  onLayout,
  ...rules
}:SelectProps<T>) {

  const tagRef = useRef<View>(null);

  const { colorScheme } = useTheme();
  const { tagConfig } = useTags();
  const styles = useMemo(() => getStyles({ tagConfig }), [tagConfig?.input]);
  const defaultStyle = useMemo(() => ({
    backgroundColor: colorScheme === 'dark' ? '#272727' : '#f2f2f2'
  }), [colorScheme])

  const [visible, setVisible] = useState(false);

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

        const selectedItem = useMemo(() => getSelectedItem({ children, value }), [children, value]);
        const [popoverPosition, setPopoverPosition] = useState({x: 0, y: 0, width: 100, height: 100});

        return (
          <Button
            ref={tagRef}
            onClick={(e) => {
              tagRef.current?.measure((xZero, yZero, width, height, px, py) => {
                //"height": 42.28571319580078, "width": 371.4285583496094, "x": 0, "y": 772.952392578125
                //0 0 371.4285583496094 42.28571319580078 20.190475463867188 476.952392578125
                console.log("measure", width, height, px, py);
                setPopoverPosition({ x:px, y:py, width, height });
                console.log({ x:px, y:py, width, height });
                
              })
              // 개고생했는데 안되잖아!!!!
              /* tagRef.current?.measureLayout(layoutScrollRef.current, (x, y, width, height) => {
                //console.log(popoverPosition);
                console.log(x, y, width, height);
              }, () => { console.log('fail') }); */
              setVisible(true);
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
            onLayout={e => {
              // 이 수치가 부정확하다!!(아주 큰일이다. 버그네.)
              /* const layout = e.nativeEvent.layout; */
              onLayout?.(e);
            }}
          >
            <TextInput
            showSoftInputOnFocus={false}
            ref={ref}
            onBlur={onBlur}
              style={{ position: 'absolute', top: -2, left: 0, width: 1, height: 1, zIndex: -1, opacity: 0 }}
            />
            {
              selectedItem
              ?
                <P style={{ flex: 1, ...textStyle }}>{selectedItem.props.children}</P>
              :
                <P style={{ flex: 1, ...textStyle, color: inputStyle?.placeholderColor}}>{placeholder}</P>
            }
            {
              icon ? icon
              :
                <Svg
                  width={iconStyle?.width || 24}
                  height={iconStyle?.height || 24}
                  viewBox="0 0 24 24"
                  fill={iconStyle?.color || '#FF6420'}
                >
                  <Path
                    fillRule="evenodd"
                    d="M11.47 4.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1-1.06 1.06L12 6.31 8.78 9.53a.75.75 0 0 1-1.06-1.06l3.75-3.75zm-3.75 9.75a.75.75 0 0 1 1.06 0L12 17.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0l-3.75-3.75a.75.75 0 0 1 0-1.06z"
                    clipRule="evenodd"
                  />
                </Svg>
            }

            <Modal 
              visible={visible}
              type="center"
              entering={ZoomInEasyUp}
              backDropStyle={{ opacity: 0 }}
              contentStyle={{
                position: 'absolute',
                backgroundColor: defaultStyle.backgroundColor,
                left: popoverPosition.x,
                top: popoverPosition.y + popoverPosition.height,
                width: popoverPosition.width
              }}
              onRequestClose={() => setVisible(false)}>
              {
                Children.map(children, 
                  (child) => child ?
                    <Button
                      color="transparent" fill="none"
                      {...child.props}
                      onClick={() => {
                        setVisible(false);
                      }}
                    /> 
                  : 
                    null
                )
              }
            </Modal>
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

const getSelectedItem = ({children, value}:{children:JSX.Element|JSX.Element[]|undefined,value:any}):JSX.Element|null => {
  const options = Children.toArray(children) as JSX.Element[];

  return options.find(({ props: { value:optionValue } }) => {
    return value === optionValue;
  }) ?? null;
}
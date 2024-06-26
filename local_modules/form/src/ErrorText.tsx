import { FieldErrors, Path } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import { Div, iconPattern, TagStyle, useTags, useTagStyle } from '@team-devmonster/react-native-tags';

import { FormValues } from './type';


export interface ErrorTextProps<T extends FormValues> {
  errors: FieldErrors<T>,
  name:Path<T>,
  style?:TagStyle,
  message?:string
}

export function ErrorText<T extends FormValues>(
  {
    errors, name, style, message
  }:ErrorTextProps<T>) 
{

  const { tagConfig } = useTags();
  const errorTextStyle = tagConfig?.errorText?.style;

  const [
    iconStyle,
    tagStyle
  ]
  = useTagStyle([
    iconPattern
  ], [
    errorTextStyle,
    style
  ])

  return (
    <ErrorMessage
      errors={errors}
      name={name as any}
      message={message}
      render={({ message:msg }) => {
        return (
          msg &&
          <Div style={{
            flexDirection: 'row',
            ...tagStyle
          }}>
            {
              iconStyle?.icon ?
              iconStyle.icon
              : null
            }
            {msg}
          </Div>
        )
      }}
    />
  )
}
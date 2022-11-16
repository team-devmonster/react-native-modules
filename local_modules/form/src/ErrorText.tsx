import { FieldErrorsImpl, Path } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { FormValues } from './type';
import { View, Text } from "react-native";
import { TagStyle, textPattern, useTags, useTagStyle } from '@team-devmonster/react-native-tags';


export interface ErrorTextProps<T extends FormValues> {
  errors: Partial<FieldErrorsImpl<T>>,
  name:Path<T>,
  style?:TagStyle
}

export function ErrorText<T extends FormValues>(
  {
    errors, name, style
  }:ErrorTextProps<T>) 
{

  const { tagConfig } = useTags();
  const errorTextStyle = tagConfig?.errorText?.style;

  const [
    textStyle,
    viewStyle 
  ]
  = useTagStyle([
    textPattern
  ], [
    errorTextStyle,
    style
  ])

  return (
    <ErrorMessage
      errors={errors}
      name={name as any}
      render={({ message }) => {
        return (
          message &&
          <View style={viewStyle}>
            <Text style={textStyle}>{message}</Text>
          </View>
        )
      }}
    />
  )
}
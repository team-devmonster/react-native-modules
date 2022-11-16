import React from "react";

import { useTheme } from "@local_modules/theme";
import { Theme } from "App.theme";
import { Button, Div } from "@local_modules/tags";
import { useForm } from "react-hook-form";
import { ErrorText, Input } from "@local_modules/form";

interface FormProps {
  id:string, 
  password:string
}

const FormEx = () => {

  const { color, fontSize, shadow } = useTheme<Theme>();

  const { control, handleSubmit, formState: { errors } } = useForm<FormProps>({
    mode: 'onChange',
    defaultValues: {
      id: 'hello'
    }
  });

  const onSubmit = (form:FormProps) => {
    console.log(form);
  }

  return (
    <Div style={{ backgroundColor: color.white, padding: 20 }}>

      <Input
        control={control}
        name="id"
        style={{ display: 'flex' }}
        maxLength={{ value: 10, message: 'id <= 10' }}
        minLength={{ value: 5, message: 'id > 5' }}
        required="please insert id"></Input>
      <ErrorText errors={errors} name="id"></ErrorText>
      
      <Input 
        control={control} 
        name="password"
        style={{ display: 'flex' }}
        maxLength={{ value: 10, message: 'password <= 10' }} 
        required="please insert password"></Input>
      <ErrorText errors={errors} name="password"></ErrorText>

      <Button color={color.primary} onClick={handleSubmit(onSubmit)}>login</Button>

    </Div>
  )
}

export default FormEx;
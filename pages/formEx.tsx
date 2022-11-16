import React from "react";

import { useTheme } from "@local_modules/theme";
import { Theme } from "App.theme";
import { Button, Div, P } from "@local_modules/tags";
import { useForm } from "react-hook-form";
import { ErrorText, Input } from "@local_modules/form";

interface FormProps {
  id:string, 
  password:string,
  price:number,
  agree1:boolean,
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
        placeholder="password"
        style={{ display: 'flex' }}
        maxLength={{ value: 10, message: 'password <= 10' }} 
        required="please insert password"></Input>
      <ErrorText errors={errors} name="password"></ErrorText>

      <Input 
        control={control} 
        type="number"
        name="price"
        style={{ display: 'flex' }}
        max={{ value: 1000, message: 'price <= 1000' }}
        min={{ value: 11, message: 'price > 1' }}
        required="please insert price"></Input>
      <ErrorText errors={errors} name="price"></ErrorText>

      <Div style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, marginBottom: 8 }}>
        <Input
          control={control}
          name="agree1"
          type="checkbox"
          required="place agree privacy usage"
          style={{ marginRight: 8 }}
          ></Input>
        <P>privacy usage</P>
      </Div>
      <ErrorText errors={errors} name="agree1"></ErrorText>

      <Button color={color.primary} onClick={handleSubmit(onSubmit)}>login</Button>

    </Div>
  )
}

export default FormEx;
import React from "react";

import { useTheme } from "@local_modules/theme";
import { Theme } from "App.theme";
import { Button, Div } from "@local_modules/tags";
import { useForm } from "react-hook-form";
import { ErrorText, Input, Label } from "@local_modules/form";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Layout } from "@local_modules/router";

interface FormProps {
  id:string, 
  password:string,
  phone:string,
  price:number,
  agree1:boolean,
  gender:'man'|'woman'|'etc',
}

const FormEx = () => {

  const { color, fontSize, shadow } = useTheme<Theme>();

  const { control, handleSubmit, formState: { errors }, setFocus, setValue, watch } = useForm<FormProps>({
    mode: 'onChange',
    defaultValues: {
      id: 'hello',
      gender: 'man'
    }
  });

  const onSubmit = (form:FormProps) => {
    console.log(form);
  }

  return (
    <Layout style={{ padding: 20, backgroundColor: color.white }}>
      <Div style={{ rowGap: 8 }}>
        <Input
          control={control}
          name="id"
          maxLength={{ value: 10, message: 'id <= 10' }}
          minLength={{ value: 5, message: 'id > 5' }}
          required="please insert id"></Input>
        <ErrorText errors={errors} name="id"></ErrorText>
        
        <Label errors={errors} name="password">password</Label>
        <Input 
          control={control} 
          name="password"
          type="password"
          placeholder="password"
          maxLength={{ value: 10, message: 'password <= 10' }} 
          required="please insert password"></Input>
        <ErrorText errors={errors} name="password"></ErrorText>

        <Label errors={errors} name="phone">phone</Label>
        <Input 
          control={control} 
          name="phone"
          type="tel"
          placeholder="phone"
          minLength={{ value: 11, message: 'phone more than 11' }}
          required="please insert phone"></Input>
        <ErrorText errors={errors} name="phone"></ErrorText>

        <Input 
          control={control} 
          type="number"
          name="price"
          style={{ display: 'flex' }}
          max={{ value: 1000, message: 'price <= 1000' }}
          min={{ value: 11, message: 'price > 1' }}
          required="please insert price"></Input>
        <ErrorText errors={errors} name="price"></ErrorText>

        <Button 
          fill="none"
          style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }} 
          onClick={() => setValue('agree1', !watch('agree1'))}>
          <Input
            control={control}
            name="agree1"
            type="checkbox"
            required="place agree privacy usage"></Input>
          <Label style={{ flex: 1 }}>privacy usage</Label>
          <Button color={color.primary} fill="outline">view</Button>
        </Button>
        <ErrorText errors={errors} name="agree1"></ErrorText>

        <Button 
          color={color.primary}
          fill="none"
          style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
          onClick={() => setValue('gender', 'man')}>
          <Input
            control={control}
            name="gender"
            value="man"
            type="radio"></Input>
          <Label>man</Label>
        </Button>

        <Button 
          fill="none"
          style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
          onClick={() => setValue('gender', 'woman')}>
          <Input
            control={control}
            name="gender"
            value="woman"
            type="radio"></Input>
          <Label>woman</Label>
        </Button>

        <Button 
          fill="none"
          style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
          onClick={() => setValue('gender', 'etc')}>
          <Input
            control={control}
            name="gender"
            value="etc"
            type="radio"></Input>
          <Label>etc</Label>
        </Button>

        <Button 
          onClick={() => {
            setFocus('price');
          }}>focus input</Button>
        <Button 
          onClick={() => {
            setFocus('agree1');
          }}>focus checkbox</Button>
        <Button 
          color={color.primary} 
          onClick={handleSubmit(onSubmit)}>login</Button>
      </Div>
    </Layout>
  )
}

export default FormEx;
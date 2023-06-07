import React from "react";
import { useForm } from "react-hook-form";

import { useTheme } from "@local_modules/theme";
import { Theme } from "App.theme";
import { Button, Div } from "@local_modules/tags";
import { ErrorText, Input, Label, Select, Option, Textarea, Toggle } from "@local_modules/form";
import { Footer, Header, Layout } from "@local_modules/router";

interface FormProps {
  toogle:boolean,
  id:string, 
  password:string,
  phone:string,
  price:number,
  agree1:boolean,
  gender:'man'|'woman'|'etc',
  year:string,
  month:string,
  date:string,
  dateTime:string,
  time:string,
  company:string,
  file:any,
  longText:string
}

const FormEx = () => {

  const { color, fontSize, shadow } = useTheme<Theme>();

  const { control, handleSubmit, formState: { errors }, setFocus, setValue, watch } = useForm<FormProps>({
    mode: 'onChange',
    defaultValues: {
      id: 'hello',
      gender: 'man',
      company: '1',
      year: '2021',
      month: '2022-12',
      date: '2022-12-27',
      dateTime: '2022-12-27 17:54',
      time: '17:54'
    }
  });

  const onSubmit = (form:FormProps) => {
    console.log(form);
  }

  return (
    <Layout style={{ padding: 20, backgroundColor: color.white }}>
      <Header title="react-hook-form"/>
      <Toggle  
        control={control} 
        name="toogle"
      />
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
        <ErrorText 
          errors={errors} 
          name="agree1" 
          style={{
            icon: <Div>X</Div>
          }}></ErrorText>

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

        <Input 
          type="year" 
          control={control}
          name="year"
          placeholder="year"></Input>

        <Button onClick={() => setValue('year', '2012')}>year 2012 change</Button>

        <Input 
          type="month" 
          control={control}
          name="month"
          placeholder="month"></Input>
        
        <Input 
          type="date" 
          control={control}
          name="date"
          placeholder="date"></Input>

        <Input 
          type="datetime-local" 
          control={control}
          name="dateTime"
          placeholder="date time"></Input>
        
        <Input 
          type="time" 
          control={control}
          name="time"
          placeholder="time"></Input>

        <Textarea control={control} name="longText" placeholder="textarea"></Textarea>


        <Select 
          control={control}
          name="company"
          interface="popover"
          placeholder="please select">
          <Option value="1">
            <Div style={{ backgroundColor: 'red' }}>devmonster1</Div>
          </Option>
          <Option value="2" label="hello" style={{ backgroundColor: 'red' }}>
            devmonster2
          </Option>
          <Option value="3">devmonster3</Option>
          <Option value="4">devmonster4</Option>
          <Option value="5">devmonster5</Option>
          <Option value="6">devmonster6</Option>
        </Select>

        <Input
          type="file"
          control={control}
          //accept="image/*"
          //accept="application/pdf"
          name="file"
          placeholder="file"></Input>

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

        <Input
          control={control}
          name="id"
          placeholder="id"></Input>
      </Div>

      <Footer>
        <Button color={color.primary}>fixedButton</Button>
      </Footer>
    </Layout>
  )
}

export default FormEx;
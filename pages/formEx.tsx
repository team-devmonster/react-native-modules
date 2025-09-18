import React, { useRef, useState } from "react";
import { TextInput } from "react-native";
import { useForm, useFieldArray } from "react-hook-form";

// import { useTheme } from "@local_modules/theme";
// import { Button, Div } from "@local_modules/tags";
// import { Footer, Header, Layout } from "@local_modules/router";
// import { ErrorText, Input, Label, Select, Option, Textarea, Toggle, FormValues } from "@local_modules/form";
import { useTheme } from "@team-devmonster/react-native-theme";
import { Button, Div } from "@team-devmonster/react-native-tags";
import { Footer, Header, Layout } from "@team-devmonster/react-native-router";
import { ErrorText, Input, Label, Select, Option, Textarea, Toggle } from "@team-devmonster/react-native-form";
import type { FormValues } from "@team-devmonster/react-native-form/dist/esm/src/type";
import { Theme } from "App.theme";

interface FormProps extends FormValues {
  toogle:boolean,
  id:string,
  password:string,
  phone:string,
  price:number,
  number:string,
  float:string,
  agree1:boolean,
  gender:'man'|'woman'|'etc',
  year:string,
  month:string,
  date:string,
  dateTime:string,
  time:string,
  company:string,
  file:any,
  fileDoc:any,
  longText:string,
  newCompanyValue?:string,
  newCompanyLabel?:string,
  companies:{ value:string }[]
}

const FormEx = () => {

  const { color, fontSize, shadow } = useTheme<Theme>();
  const [companies, setCompanies] = useState<{ value:string, label:string, disabled?:boolean }[]>([
    { value: '1', label: 'devmonster1' },
    { value: '2', label: 'devmonster2' },
    { value: '3', label: 'devmonster3', disabled: true },
    { value: '4', label: 'devmonster4', disabled: true },
    { value: '5', label: 'devmonster5', disabled: true },
    { value: '6', label: 'devmonster6', disabled: true },
  ]);

  const { control, handleSubmit, formState: { errors }, setFocus, setValue, watch } = useForm<FormProps>({
    mode: 'onChange',
    defaultValues: {
      id: 'hello',
      gender: 'man',
      company: '1',
      number: '0',
      float: '0',
      year: '2021',
      month: '2023-08',
      date: '2023-08-27',
      dateTime: '2022-12-27 17:54',
      time: '17:54',
      companies: [{ value: '1' }]
    }
  });

  const companiesForm = useFieldArray({ control, name: 'companies' });

  const onSubmit: (form: FormProps) => void = (form) => {
    console.log(form);
  }

  const onError = (e:any) => {
    console.log(e);
  }

  const testRef = useRef<TextInput>(null);

  return (
    <Layout style={{ padding: 20, backgroundColor: color.white }}>
      <Header title="react-hook-form"/>
      <Toggle  
        control={control} 
        name="toogle"
      />
      <Div style={{ rowGap: 8 }}>
        <Input
          inputRef={testRef}
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

        <Label errors={errors} name="password">number</Label>
        <Input 
          control={control} 
          name="number"
          type="number"
          placeholder="number"></Input>

        <Label errors={errors} name="password">float</Label>
        <Input 
          control={control} 
          name="float"
          type="float"
          placeholder="float"></Input>

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
          type="price"
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
          min={'2023-08-24'}
          max={'2023-08-28'}
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
          placeholder="please select">
          {
            companies.map(({ value, label, disabled }) => (
              <Option key={`company_${value}`} value={value} disabled={disabled}>{label}</Option>
            ))
          }
        </Select>

        {/* 실시간 옵션 추가 UI */}
        <Div style={{ rowGap: 8, marginTop: 8 }}>
          <Label>add company option</Label>
          <Div style={{ flexDirection: 'row', gap: 8 }}>
            <Input
              control={control}
              name="newCompanyValue"
              placeholder="value"/>
            <Input
              control={control}
              name="newCompanyLabel"
              placeholder="label"/>
            <Button
              onClick={() => {
                const value = String(watch('newCompanyValue') || '').trim();
                const label = String(watch('newCompanyLabel') || '').trim();
                if(!value || !label) return;
                setCompanies(prev => prev.some(o => String(o.value) === value)
                  ? prev
                  : [...prev, { value, label }]
                );
                setValue('newCompanyValue', '');
                setValue('newCompanyLabel', '');
              }}
              style={{ paddingHorizontal: 12 }}
            >add</Button>
          </Div>
          <Div style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {
              companies.map(({ value, label }) => (
                <Button
                  key={`chip_${value}`}
                  fill="outline"
                  onClick={() => setCompanies(prev => prev.filter(o => o.value !== value))}
                  style={{ paddingVertical: 6, paddingHorizontal: 10 }}
                >{label} (x)</Button>
              ))
            }
          </Div>
        </Div>

        {/* Select 태그 자체를 동적으로 추가/삭제 */}
        <Div style={{ rowGap: 8, marginTop: 12 }}>
          <Label>add/remove Select</Label>
          <Button onClick={() => {
            companiesForm.append({ value: '' }, { shouldFocus: false });
          }}>add select</Button>
          {
            companiesForm.fields.map((field, i) => (
              <Div key={field.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Select
                  control={control}
                  name={`companies.${i}.value`}
                  placeholder="please select"
                  style={{ flex: 1, marginBottom: 0 }}
                >
                  {
                    companies.map(({ value, label, disabled }) => (
                      <Option key={`company_dyn_${i}_${value}`} value={value} disabled={disabled}>{label}</Option>
                    ))
                  }
                </Select>
                <Button fill="outline" onClick={() => companiesForm.remove(i)} style={{ marginBottom: 0 }}>remove</Button>
              </Div>
            ))
          }
        </Div>

        <Input
          type="file"
          control={control}
          accept="image/*"
          //accept="application/pdf"
          name="file"
          multiple
          maxLength={2}
          placeholder="file"></Input>

        <Input
          type="file"
          control={control}
          accept="application/pdf"
          name="fileDoc"
          placeholder="document (pdf)"></Input>

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
          onClick={handleSubmit(onSubmit, onError)}>login</Button>

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
# @team-devmonster/react-native-form

> :warning: **It's under development**<br>
> :warning: **It's using [react-hook-form](https://www.npmjs.com/package/react-hook-form)**<br>
> :warning: **It's using [react-native-svg](https://github.com/software-mansion/react-native-svg)**<br>
> :warning: **It's using @team-devmonster/react-native-tags**

## This is under devmonster's react & react-native union project.

This project is part of the `react-module & react-native-module` projects, that integrate `react & react-native` by the devmonster team.<br><br>
`react` => [`@team-devmonster/react-form`](https://www.npmjs.com/package/@team-devmonster/react-form)<br>
General `react-native-modules` load map => [here](https://github.com/team-devmonster/react-native-modules);<br>
General `react-modules` load map => [here](https://github.com/team-devmonster/react-modules);

### Other `react-native` modules

- [o] [`react-native-theme`](https://www.npmjs.com/package/@team-devmonster/react-native-theme)
- [o] [`react-native-tags`](https://www.npmjs.com/package/@team-devmonster/react-native-tags)

#### author: devmonster

We are always looking for investment or assistance.
hompage: [https://devmonster.co.kr](https://devmonster.co.kr)<br>
email: [aldegad@devmonster.co.kr](mailto:aldegad@devmonster.co.kr)



## items

- [o] [Input]


## Getting started

`$ npm install react-hook-form @team-devmonster/react-native-tags@latest @team-devmonster/react-native-form@latest`


## Examples

Easy. Too Easy.

```javascript
import React from "react";
import { useForm } from "react-hook-form";

import { useTheme } from "@team-devmonster/react-theme";
import { Theme } from "./App.theme";
import { Div, Button, P } from "@team-devmonster/react-native-tags";
import { A, useRouter, RouterProps } from "@team-devmonster/react-native-router";
import { ErrorText, Input } from "@team-devmonster/react-native-form";

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
```
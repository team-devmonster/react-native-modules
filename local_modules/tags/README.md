# @team-devmonster/react-native-tags

> :warning: **It's under development**
## This is under devmonster's react & react-native union project.

This project is part of the `react-module`&`react-native-module` projects, that integrate `react`&`react-native` by the devmonster team.<br><br>
`react` => [`@team-devmonster/react-tags`](https://www.npmjs.com/package/@team-devmonster/react-tags)<br>
General `react-native-modules` load map => [here](https://github.com/team-devmonster/react-native-modules);<br>
General `react-modules` load map => [here](https://github.com/team-devmonster/react-modules);

### Other `react-native` modules

- [o] [react-native-theme](https://www.npmjs.com/package/@team-devmonster/react-native-theme)
- [o] [react-native-form](https://www.npmjs.com/package/@team-devmonster/react-native-form)
- [o] [react-native-router](https://www.npmjs.com/package/@team-devmonster/react-native-router)
- [o] [react-native-skeleton](https://www.npmjs.com/package/@team-devmonster/react-native-skeleton)

#### author: devmonster 

We are always looking for investment or assistance.<br>
hompage: [https://devmonster.co.kr](https://devmonster.co.kr)<br>
email: [aldegad@devmonster.co.kr](mailto:aldegad@devmonster.co.kr)

## items
- [o] [Br] => Just br.
- [o] [Button](#Button)
- [o] [Div]
- [o] [Img](#Img)
- [o] [Main] => this is for main contents. `extends` `div`.
- [o] [H1 ~ H3] => this is for text. `extends` `div`.
- [o] [P] => this is for text. `extends` `div`.
- [o] [Span] => this is for inline text. `extends` `div`.
- [o] [Dl] => this is for define list. `extends` `div`.
- [o] [Dt] => this is for define list title. `extends` `div`.
- [o] [Dd] => this is for define list description. `extends` `div`.
- [o] [Table] => Under development :(help)

### additional Items
These items are not contained this library.
from [`react-native-form`](https://www.npmjs.com/package/@team-devmonster/react-native-form).
- [o] [Input]
- [o] [ErrorText]
- [o] [Label] => this is input label. `extends` `divConfig`.
- [o] [input[type=checkbox]]
- [o] [input[type=radio]]
- [o] [input[type=date]]
- [o] [input[type=time]]


## Getting started

`$ npm install @team-devmonster/react-native-tags@latest`


## Examples

Easy. Too Easy.

### step1. Set Provider

```javascript
// App.theme.tsx => You can use any file name :)
import { TagProvider, TagStyle, ButtonConfig, InputConfig, ErrorTextConfig } from '@team-devmonster/react-native-tags';

export const AppTagProvider = ({children}: {children:React.ReactNode}) => {

  // useTheme is in react-theme. If you wanna use darkmode easily, use it.
  //const { div, button } = useTheme<Theme>();

  const div:TagStyle = {
    color: color.black,
    fontSize: fontSize.base
  }
  const button:ButtonProps = {
    color: color.white,
    style: {
      cursor: 'pointer',
      position: 'relative',
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: fontSize.base,
      minHeight: 42,
      borderRadius: 5
    },
    disabledStyle: {
      opacity: 0.5
    }
  }
  const input:InputConfig = {
    style: {
      backgroundColor: color.white,
      borderColor: color.step300,
      color: color.black,
      placeholderColor: color.step500,
      borderRadius: 5,
      borderWidth: 1,
      fontSize: fontSize.base,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 10,
      paddingRight: 10,
      minHeight: 42,
      marginTop: 8,
      marginBottom: 8
    },
    errorStyle: {
      borderColor: color.warning,
      marginBottom: 0 // for errorText
    },
    disabledStyle: {
      backgroundColor: color.step100,
      borderColor: color.step200
    }
  }

  const errorText:ErrorTextConfig = {
    style: {
      color: color.danger,
      marginBottom: 8
    }
  }
  return (
    <TagProvider tagConfig={{ div, button, input, errorText }}>
      {children}
    </TagProvider>
  )
}
```

```javascript
import { AppTagProvider } from './App.theme';

export default function App() {

  return (
    <AppTagProvider>
      <Component></Component>
    </AppTagProvider>
  )
}
```


### step2. Use

```javascript
import React from "react";
import { useTheme } from '@team-devmonster/react-native-theme';
import { Theme } from './App.theme';
import { Div, Button, Img, P, Span, Br } from "@team-devmonster/react-native-tags";

const TagsEx = () => {

  // useTheme is in react-theme. If you wanna use darkmode easily, use it.
  const { color, fontSize } = useTheme<Theme>();

  return (
    <Div
      style={{
        backgroundColor: color.backgroundColor, 
        flex: 1, 
        padding: 18 
      }}>
      <Div style={{ fontSize: fontSize.xl }}>
        {`1. div => <Div></Div>`}
      </Div>
      <Div>
        <Button color={color.primary} onClick={() => alert('pressed')}>
          {`2. button => <Button></Button>`}
        </Button>
      </Div>
      <Div>
        <Img
          style={{
            width: '100%',
            aspectRatio: 1.774, 
            backgroundColor: color.step500
          }} 
          src="https://devmonster.co.kr/static/media/main-bg-05.d88f30e7.png"></Img>
      </Div>
      <P style={{
        marginBottom: 24, 
        height: 80
        }}>
        hello P
        <Span style={{ color: color.danger }}>hello Span</Span>
        <Button 
          color={color.primary} 
          style={{ display: 'inline-flex', height: 40 }}>inline button</Button>
        hello~!
      </P>
      <P style={{ marginBottom: 20, color: color.primary }}>
        hello?
        <Button color={color.step500}>not inline button. normal button.</Button>
      </P>
      <P>
        text with <Br/>hello
      </P>
      <Button 
        color={color.primary}
        fill="outline"
        style={{ 
          alignSelf: 'stretch', 
          alignItems: 'center',
          fontSize: fontSize.sm,
          ...shadow.base,
          marginBottom: 18
        }}>
          hellohellohello omg~
          <Img
          style={{
            width: 20,
            aspectRatio: 1.774,
            backgroundColor: color.step500
          }}
          src="https://devmonster.co.kr/static/media/main-bg-05.d88f30e7.png"></Img>
      </Button>
      <Button color={color.primary} fill="outline" style={{ marginBottom: 8 }}>
        outline
      </Button>

      <Button color={color.primary} fill="translucent">
        translucent
      </Button>

      <Button color={color.primary} fill="translucent" disabled={true}>
        disabled
      </Button>

      <P>gap Test</P>
      <Div style={{ borderColor: 'green', borderWidth: 1, flexDirection: 'row', gap: 8, backgroundColor: 'blue' }}>
        <Div style={{ backgroundColor: 'red', flex: 1, aspectRatio: 1 }}></Div>
        <Div style={{ backgroundColor: 'red', flex: 1, aspectRatio: 1 }}></Div>
        <Div style={{ backgroundColor: 'red', flex: 1, aspectRatio: 1 }}></Div>
        <Div style={{ backgroundColor: 'red', flex: 1, aspectRatio: 1 }}></Div>
        <Div style={{ backgroundColor: 'red', flex: 1, aspectRatio: 1 }}></Div>
        <Div style={{ backgroundColor: 'red', flex: 1, aspectRatio: 1 }}></Div>
      </Div>
    </Div>
  )
}

export default TagsEx;
```
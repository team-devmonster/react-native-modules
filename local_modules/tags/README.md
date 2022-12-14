# @team-devmonster/react-native-tags
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

## Getting started

`$ npm install @team-devmonster/react-native-theme@latest @team-devmonster/react-native-tags@latest`


## Examples

Easy. Too Easy.

### step1. Set Provider

```javascript
// App.theme.tsx => You can use any file name :)
import React from 'react';
import { ThemeProvider, useTheme } from '@local_modules/theme';
import { TagProvider, ButtonConfig, InputConfig, ErrorTextConfig, LabelConfig, SelectConfig, TagConfig } from '@local_modules/tags';

const color = {
  light: {
    // key colors
    primary: '#4a93cf',
    warning: '#ec670b',
    success: '#9cca5a',
    danger: '#eb445a',
    placeholder: '#4d4d4d',
    backgroundColor: '#f2f2f2',
    // color steps
    white: '#ffffff',
    step50: '#f2f2f2',
    step100: '#e6e6e6',
    step200: '#cccccc',
    step300: '#b3b3b3',
    step400: '#999999',
    step500: '#808080',
    step600: '#666666',
    step700: '#4d4d4d',
    step800: '#333333',
    step900: '#191919',
    black: '#111111'
  },
  dark: {
    // key colors
    primary: '#4a93cf',
    warning: '#ec670b',
    success: '#9cca5a',
    danger: '#eb445a',
    placeholder: '#4d4d4d',
    backgroundColor: '#191919',
    // color steps
    white: '#111111',
    step50: '#191919',
    step100: '#333333',
    step200: '#4d4d4d',
    step300: '#666666',
    step400: '#808080',
    step500: '#999999',
    step600: '#b3b3b3',
    step700: '#cccccc',
    step800: '#e6e6e6',
    step900: '#f2f2f2',
    black: '#ffffff'
  }
}

const theme = (color:Color) => {
  const fontSize = {
    xs: 12 as const,
    sm: 14 as const,
    base: 16 as const,
    lg: 18 as const,
    xl: 20 as const,
    x2l: 24 as const,
    x3l: 30 as const,
    x4l: 36 as const,
    x5l: 48 as const,
    x6l: 60 as const,
    x7l: 72 as const,
    x8l: 96 as const,
    x9l: 128 as const
  }

  const shadow = {
    base: {
      shadowColor: color.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    lg: {
      shadowColor: color.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    card: {
      shadowColor: color.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    }
  }

  const div:TagConfig = {
    style: {
      color: color.black,
      fontSize: fontSize.base
    }
  }

  const button:ButtonConfig = {
    color: color.white,
    style: {
      cursor: 'pointer',
      position: 'relative',
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: fontSize.base,
      height: 42,
      borderRadius: 5
    },
    disabledStyle: {
      opacity: 0.5
    }
  }

  return {
    // basic theme
    color, fontSize, shadow,
    // tags theme
    div, button
  }
}

// example of Color & ColorKeys type
export type Color = typeof color.light;
export type ColorKeys = keyof Color;
export type Theme = ReturnType<typeof theme>;

export const AppThemeProvider = ({children}: {children:React.ReactNode}) => {
  return (
    <ThemeProvider color={color} theme={theme}>
      {children}
    </ThemeProvider>
  )
}

export const AppTagProvider = ({children}: {children:React.ReactNode}) => {
  const theme = useTheme<Theme>();
  return (
    <TagProvider tagConfig={theme}>
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
    <ScrollView
      style={{
        backgroundColor: color.white, 
        flex: 1, 
        padding: 18 
      }}>
      <Div style={{ fontSize: fontSize.xl }}>
        {`1. div => <Div></Div>`}
      </Div>
      <Div>
        <Button color={color.primary} onClick={() => Alert.alert('pressed')}>
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
          src={require('assets/images/back.png')}></Img>
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
        text with {`<Br/>`}<Br></Br>hello
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

      <Button color={color.primary} fill="translucent" style={{ marginBottom: 8 }}>
        translucent
      </Button>

      <Button color={color.primary} fill="outline" style={{ marginBottom: 10 }} disabled={true}>
        disabled
      </Button>

      <Button 
        color={color.primary} 
        fill="outline" 
        style={{ 
          marginBottom: 10,
          borderRadius: 10,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0
        }}>
        disabled
      </Button>

      <Button 
        color={color.step100}
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          borderStyle: 'dashed',
          borderColor: color.primary,
          borderWidth: 1
        }}>
      </Button>

      <P>gap Test</P>
      <Div style={{ borderColor: 'orange', borderWidth: 1, flexDirection: 'row', gap: 8, borderRadius: 20, flexWrap: 'wrap', marginBottom: 10, ...shadow.base, overflow: 'hidden' }}>
        <Div style={{ backgroundColor: 'lightgray', flex: 2, minWidth: 100, height: 50 }}>1</Div>
        <Div style={{ backgroundColor: 'lightgray', flex: 1, minWidth: 100, height: 50 }}>2</Div>
        <Div style={{ backgroundColor: 'lightgray', flex: 3, minWidth: 100, height: 50 }}>3</Div>
        <Div style={{ backgroundColor: 'lightgray', flex: 1, minWidth: 100, height: 50 }}>4</Div>
        <Div style={{ backgroundColor: 'lightgray', flex: 1, minWidth: 100, height: 50 }}>5</Div>
        <Div style={{ backgroundColor: 'lightgray', flex: 1, minWidth: 100, height: 50 }}>6</Div>
      </Div>

      <P>not gap Test</P>
      <Div style={{ borderColor: 'orange', borderWidth: 1, flexDirection: 'row', borderRadius: 20, flexWrap: 'wrap', ...shadow.base, padding: 5 }}>
        <Div style={{ backgroundColor: 'lightgray', flex: 2, minWidth: 100, height: 50 }}>1</Div>
        <Div style={{ backgroundColor: 'lightgray', flex: 1, minWidth: 100, height: 50 }}>2</Div>
        <Div style={{ backgroundColor: 'lightgray', flex: 3, minWidth: 100, height: 50 }}>3</Div>
        <Div style={{ backgroundColor: 'lightgray', flex: 1, minWidth: 100, height: 50 }}>4</Div>
        <Div style={{ backgroundColor: 'lightgray', flex: 1, minWidth: 100, height: 50 }}>5</Div>
        <Div style={{ backgroundColor: 'lightgray', flex: 1, minWidth: 100, height: 50 }}>6</Div>
      </Div>

      <P>button gap Test</P>
      <Button color={color.primary} fill="none" style={{ 
        borderColor: 'red', 
        borderWidth: 2, 
        flexDirection: 'row', 
        gap: 10, 
        ...shadow.base, 
        borderRadius: 20, 
        flexWrap: 'wrap', 
        padding: 2,
        marginBottom: 20}}>
        <Div style={{ backgroundColor: 'lightgray', flex: 2, minWidth: 100, height: 50 }}>1</Div>
        <Div style={{ backgroundColor: 'lightgray', flex: 1, minWidth: 100, height: 50 }}>2</Div>
        <Div style={{ backgroundColor: 'lightgray', flex: 3, minWidth: 100, height: 50 }}>3</Div>
        <Div style={{ backgroundColor: 'lightgray', flex: 1, minWidth: 100, height: 50 }}>4</Div>
        <Div style={{ backgroundColor: 'lightgray', flex: 1, minWidth: 100, height: 50 }}>5</Div>
        <Div style={{ backgroundColor: 'lightgray', flex: 1, minWidth: 100, height: 50 }}>6</Div>
      </Button>

      <P>button not gap Test</P>
      <Button color={color.primary} fill="none" style={{ borderColor: 'green', borderWidth: 1, flexDirection: 'row', borderRadius: 20, flexWrap: 'wrap', padding: 5}}>
        <Div style={{ backgroundColor: 'lightgray', flex: 2, minWidth: 100, height: 50 }}>1</Div>
        <Div style={{ backgroundColor: 'lightgray', flex: 1, minWidth: 100, height: 50 }}>2</Div>
        <Div style={{ backgroundColor: 'lightgray', flex: 3, minWidth: 100, height: 50 }}>3</Div>
        <Div style={{ backgroundColor: 'lightgray', flex: 1, minWidth: 100, height: 50 }}>4</Div>
        <Div style={{ backgroundColor: 'lightgray', flex: 1, minWidth: 100, height: 50 }}>5</Div>
        <Div style={{ backgroundColor: 'lightgray', flex: 1, minWidth: 100, height: 50 }}>6</Div>
      </Button>
    </ScrollView>
  )
}

export default TagsEx;
```
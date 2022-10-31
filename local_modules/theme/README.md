# @team-devmonster/react-native-theme

This is devmonster's react-native module for make app easily. This is compatible with devmonster's react module.
[@team-devmonster/react-theme](https://www.npmjs.com/package/@team-devmonster/react-theme)

`react-native-theme` was created to easily create a theme in the `react-native` environment.
`Darkmode` compatibility is also easy.

##### author: devmonster 
hompage: [https://devmonster.co.kr](https://devmonster.co.kr)
email: [aldegad@devmonster.co.kr](mailto:aldegad@devmonster.co.kr)

### Road Map

General [react-native-modules] load map => [here](https://github.com/team-devmonster/react-native-modules);

## Getting started

`$ npm install @team-devmonster/react-native-theme@latest`


## Usage


### 1. Make Color & Theme

Set Colors & Themes anything you want to use.

```javascript
// App.theme.tsx => You can use any file name :)
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

  const input = {
    position: 'relative',
    backgroundColor: color.white,
    borderColor: color.step300,
    color: color.black,
    borderRadius: 5,
    borderWidth: 1,
    fontSize: fontSize.base,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    minHeight: 42,
    flex: 1
  }
  const inputError = {
    borderColor: color.warning
  }
  const inputDisabled = {
    backgroundColor: color.step100,
    borderColor: color.step200
  }

  const button = {
    cursor: 'pointer',
    position: 'relative',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: fontSize.base,
    minHeight: 42,
    borderRadius: 5
  }

  return {
    // basic theme
    color, fontSize, 
    // components theme
    input, inputError, inputDisabled,
    button
  }
}
```


### 2. Set Provider

```javascript
// App.theme.tsx => You can use any file name :)
export function AppThemeProvider({children}:{children:React.ReactNode}) {
  return (
    <ThemeProvider color={color} theme={theme}>
      {children}
    </ThemeProvider>
  )
}
```

```javascript
import { AppThemeProvider } from './App.theme';

export default function App() {

  return (
    <AppThemeProvider>
      <Component></Component>
    </AppThemeProvider>
  )
}
```


### 3. Use Theme

Use your theme, whatever you want!

```javascript
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme, darken, lighten, hexToRgb, contrast } from '@team-devmonster/react-native-theme';

import { Theme } from './App.theme';

const ThemeEx = () => {

  const { colorScheme, color, fontSize } = useTheme<Theme>();

  return (
    <View style={{ backgroundColor: color.white, flex: 1, padding: 18 }}>
      <View>
        <Text style={{ color: color.black }}>1. color themes</Text>
      </View>
      <View 
        style={{ 
          flexDirection: 'row', 
          paddingBottom: 18 
        }}>
        <View style={{ backgroundColor: color.primary, ...style.boxStyle }}>
          <Text style={{ color: color.black, fontSize: fontSize.sm }}>primary</Text>
        </View>
        <View style={{ backgroundColor: color.danger, ...style.boxStyle }}>
          <Text style={{ color: color.black, fontSize: fontSize.sm }}>danger</Text>
        </View>
      </View>
      <View>
        <Text style={{ color: color.black }}>2. color utils</Text>
      </View>
      <View 
        style={{ 
          flexDirection: 'row', 
          flexWrap: 'wrap',
          paddingBottom: 18
        }}>
        <View style={{ backgroundColor: lighten(color.primary, 50), ...style.boxStyle }}>
          <Text style={{ color: contrast(color.primary), fontSize: fontSize.sm }}>primary lighter 50</Text>
        </View>
        <View style={{ backgroundColor: darken(color.danger, 50), ...style.boxStyle }}>
          <Text style={{ color: contrast(color.danger), fontSize: fontSize.sm }}>danger darken 50</Text>
        </View>
        <View style={{ backgroundColor: darken(color.step200, 50), ...style.boxStyle, width: style.boxStyle.width*2 }}>
          <Text style={{ color: contrast(color.step200), fontSize: fontSize.sm }}>step200 hex:{color.step200} {`\n`} rgb: {hexToRgb(color.step200)}</Text>
        </View>
      </View>
      <View>
        <Text style={{ color: color.black }}>3. colorScheme</Text>
      </View>
      <Text style={{ color: contrast(color.primary), fontSize: fontSize.sm }}>colorScheme: {colorScheme}</Text>
    </View>
  )
}

const style = {
  boxStyle: {
    width: 80, 
    height: 80, 
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center'
  }
}

export default ThemeEx;
```
#### 3-1. Use colorScheme

Also you can use `colorScheme`. It is `light` or `dark`.

```javascript
import { useTheme } from '@team-devmonster/react-theme';
import { Theme } from './App.theme';

import ImgWhite from '@Img/imgWhite.png';
import ImgDark from '@Img/imgDark.png';

const ThemeEx = () => {

  const { colorScheme } = useTheme<Theme>();

  return (
    <View>
      <Image source={colorScheme === 'light' ? ImgWhite : ImgDark}/>
    </View>
  )
}
export default ThemeEx;
```

### 4. extra => Type Guide

```javascript
export type Color = typeof color.light;
export type ColorKeys = keyof Color;
export type Theme = ReturnType<typeof theme>;
```


### 5. extra2 => color utils

Sometimes we should use lighter, darker, or invert colors.
So this library offers some utils.

```javascript
import { useTheme, darken, lighten, hexToRgb, contrast } from "@local_modules/theme";
import { Theme } from "App.theme";

const ThemeEx = () => {

  const { color, fontSize } = useTheme<Theme>();

  return (
    <View>
      <Text>
      <View style={{ backgroundColor: lighten(color.primary, 50), ...style.boxStyle }}>
        <Text style={{ color: contrast(color.primary), fontSize: fontSize.sm }}>primary lighter 50</Text>
      </View>
      <View style={{ backgroundColor: darken(color.danger, 50), ...style.boxStyle }}>
        <Text style={{ color: contrast(color.white), fontSize: fontSize.sm }}>danger darken 50</Text>
      </View>
      <View style={{ backgroundColor: darken(color.step200, 50), ...style.boxStyle, width: style.boxStyle.width*2 }}>
        <Text style={{ color: contrast(color.step200), fontSize: fontSize.sm }}>step200 hex:{color.step200} {`\n`} rgb: {hexToRgb(color.step200)}</Text>
      </View>
    </View>
  )
}
const style = StyleSheet.create({
  boxStyle: {
    width: 80, 
    height: 80, 
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
```
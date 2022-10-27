# @team-devmonster/react-native-theme

This is devmonster's react-native module for make app easily. This is compatible with devmonster's react module.
[@team-devmonster/react-theme](https://github.com/team-devmonster/react-modules/tree/master/local_modules/theme)

## Getting started

`$ npm install @team-devmonster/react-native-theme`


## Usage


### 1. Make Color & Theme

Set Colors & Themes anything you want to use.

```javascript
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
import { ThemeProvider } from '@team-devmonster/react-native-theme';
import { color, theme } from './App.theme';

export default function App() {
  return (
    <ThemeProvider color={color} theme={theme}>
      <Component></Component>
    </ThemeProvider>
  )
}
```


### 3. Use Theme

Use your theme, whatever you want!

```javascript
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from '@team-devmonster/react-native-theme';

import { Theme } from './App.theme';

const ThemeEx = () => {

  const { color, fontSize } = useTheme<Theme>();

  return (
    <View 
      style={{ 
        backgroundColor: color.white, 
        flex: 1, 
        flexDirection: 'row', 
        paddingTop: 18, 
        paddingBottom: 18 
      }}>
      <View style={{ backgroundColor: color.primary, ...style.boxStyle }}>
        <Text style={{ color: color.black, fontSize: fontSize.sm }}>primary</Text>
      </View>
      <View style={{ backgroundColor: color.danger, ...style.boxStyle }}>
        <Text style={{ color: color.black, fontSize: fontSize.sm }}>danger</Text>
      </View>
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

### 4. extra => Type Guide

```javascript
export type Color = typeof color.light;
export type ColorKeys = keyof Color;
export type Theme = ReturnType<typeof theme>;
```
import React from 'react';
import { ThemeProvider, useTheme } from '@local_modules/theme';
import { TagProvider, TagStyle, ButtonConfig, InputConfig, ErrorTextConfig } from '@local_modules/tags';

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
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    lg: {
      shadowColor: color.black,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    card: {
      shadowColor: color.black,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    }
  }

  const div:TagStyle = {
    color: color.black,
    fontSize: fontSize.base
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
      minHeight: 42
    },
    errorStyle: {
      borderColor: color.warning,
      //marginBottom: 0 // for errorText
    },
    disabledStyle: {
      backgroundColor: color.step100,
      borderColor: color.step200
    }
  }
  const checkbox:InputConfig = {
    style: {
      color: color.primary
    },
    errorStyle: {
      marginBottom: 0
    }
  }

  const errorText:ErrorTextConfig = {
    style: {
      color: color.danger,
      marginBottom: 8
    }
  }

  return {
    // basic theme
    color, fontSize, shadow,
    // tags theme
    div, button,
    // form theme
    input, checkbox, errorText
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
  const { div, button, input, checkbox, errorText } = useTheme<Theme>();
  return (
    <TagProvider tagConfig={{ div, button, input, checkbox, errorText }}>
      {children}
    </TagProvider>
  )
}
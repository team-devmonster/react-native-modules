import React from 'react';
import { ThemeProvider, useTheme } from '@local_modules/theme';
import { TagProvider, ButtonConfig, InputConfig, ErrorTextConfig, LabelConfig, SelectConfig, TagConfig, Div, ToastConfig } from '@local_modules/tags';
import ImgPaperAirplane from "assets/images/paperAirplane.svg";
import { HeaderConfig } from '@local_modules/tags';
import { RouterProvider } from '@local_modules/router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const color = {
  light: {
    // key colors
    primary: '#ec670b',
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
    primary: '#ec670b',
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

  const h1:TagConfig = {
    style: {
      fontSize: fontSize.x2l
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
  button['fill=translucent'] = {
    color: color.primary,
    style: {
      backgroundColor: color.danger
    },
    activeStyle: {
      backgroundColor: color.black
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
      paddingTop: 8,
      paddingBottom: 8,
      paddingLeft: 10,
      paddingRight: 10,
      minHeight: 42
    },
    errorStyle: {
      borderColor: color.warning
    },
    disabledStyle: {
      backgroundColor: color.step100,
      borderColor: color.step200
    }
  }

  input['type=checkbox'] = {
    style: {
      icon: <ImgPaperAirplane color={color.step100} width={18} height={18}/>,
      backgroundColor: color.step100
    },
    checkedStyle: {
      icon: <ImgPaperAirplane color={color.primary} width={20} height={20}/>,
      backgroundColor: color.white
    },
    errorStyle: {
      backgroundColor: color.danger
    }
  }
  input['type=radio'] = {
    style: {
      icon: <Div style={{ width: 8, height: 8, backgroundColor: color.step200 }}></Div>,
    },
    checkedStyle: {
      icon: <Div style={{ width: 8, height: 8, backgroundColor: color.primary }}></Div>,
    }
  }

  input['type=date'] = {
    style: {
      iconColor: color.primary
    }
  }
  input['type=month'] = {
    style: {
      iconColor: color.primary
    }
  }
  /* input['type=datetime-local'] = {
    style: {
      iconColor: color.primary
    }
  } */
  input['type=time'] = {
    style: {
      iconColor: color.primary
    }
  }

  const select:SelectConfig = {
    style: {
      iconColor: color.primary
    }
  }

  const label:LabelConfig = {
    errorStyle: {
      color: color.danger
    }
  }

  const errorText:ErrorTextConfig = {
    style: {
      icon: <Div style={{ 
        borderWidth: 1, 
        borderColor: color.danger, 
        width: 20, 
        height: 20, 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginRight: 8 }}>i</Div>,
      color: color.danger,
      marginBottom: 8
    }
  }

  // router
  const layout:TagConfig = {
    /* style: {
      padding: 20
    } */
  }
  const header:HeaderConfig = {
    
  }
  
  const toast:ToastConfig = {
    contentStyle: {
      backgroundColor: color.primary
    }
  }

  return {
    // basic theme
    color, fontSize, shadow,
    // tags theme
    div, button, h1,
    // form theme
    input, select, label, errorText,
    // router theme
    layout, toast
  }
}

// example of Color & ColorKeys type
export type Color = typeof color.light;
export type ColorKeys = keyof Color;
export type Theme = ReturnType<typeof theme>;

const AppThemeProvider = ({children}: {children:React.ReactNode}) => {
  return (
    <ThemeProvider color={color} theme={theme}>
      {children}
    </ThemeProvider>
  )
}

const AppTagProvider = ({children}: {children:React.ReactNode}) => {
  const theme = useTheme<Theme>();
  return (
    <TagProvider tagConfig={theme}>
      {children}
    </TagProvider>
  )
}

const AppRouterProvider = ({children}: {children:React.ReactNode}) => {
  const { color, colorScheme } = useTheme<Theme>();
  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider style={{ flex: 1, backgroundColor: color.white }}>
        <NavigationContainer theme={{
          ...theme,
          colors: {
            ...theme.colors
          }
        }}>
          <RouterProvider>
            {children}
          </RouterProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

export const AppNextNativeProvider = ({children}: {children:React.ReactNode}) => {
  return (
    <AppThemeProvider>
      <AppTagProvider>
        <AppRouterProvider>
          {children}
        </AppRouterProvider>
      </AppTagProvider>
    </AppThemeProvider>
  )
}
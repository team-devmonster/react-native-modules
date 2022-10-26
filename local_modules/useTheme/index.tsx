import { createContext, useContext, useEffect, useState } from "react";
import { ColorSchemeName, useColorScheme } from "react-native";

const ThemeContext = createContext(null) as any;

export type Color = {
  light: {[name:string]:string},
  dark: {[name:string]:string}
}

export function ThemeProvider<S extends Color,T extends Function>({children, color, theme}:{children:React.ReactNode, color:S, theme:T}) {

  const colorScheme = useColorScheme() as NonNullable<ColorSchemeName>;

  return (
    <ThemeContext.Provider value={theme(color[colorScheme])}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme<T>() {
  return useContext<T>(ThemeContext);
}
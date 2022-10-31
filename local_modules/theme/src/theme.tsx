import { createContext, useContext } from "react";
import { ColorSchemeName, useColorScheme } from "react-native";

const ThemeContext = createContext(null) as any;

type Color = {
  light: {[name:string]:string},
  dark: {[name:string]:string}
}

export function ThemeProvider<S extends Color,T extends Function>({children, color, theme}:{children:React.ReactNode, color:S, theme:T}) {

  const colorScheme = useColorScheme() as NonNullable<ColorSchemeName>;

  return (
    <ThemeContext.Provider 
      value={{
        ...theme(color[colorScheme]),
        colorScheme
      }}>
      {children}
    </ThemeContext.Provider>
  )
}

type Merge<A,B> = {
  [K in keyof A]: K extends keyof B ? B[K] : A[K]
} & B;
type ThemeProps<T> = Merge<T, {
  colorScheme:'light'|'dark'
}>

export function useTheme<T>() {
  return useContext<ThemeProps<T>>(ThemeContext);
}

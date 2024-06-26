import { createContext, useContext, useMemo } from "react";
import { ColorSchemeName, useColorScheme } from "react-native";

const ThemeContext = createContext({ colorScheme:'light' }) as any;

type Color = {
  light: {[name:string]:string},
  dark?: {[name:string]:string}
}

export function ThemeProvider<S extends Color,T extends Function>({children, color, theme, darkModeEnabled = true}:{children:React.ReactNode, color:S, theme:T, darkModeEnabled?:boolean}) {

  const deviceColorScheme = useColorScheme() as NonNullable<ColorSchemeName>;
  const colorScheme = darkModeEnabled ? deviceColorScheme === 'dark' ? 'dark' : 'light' : 'light';

  const themeValue = useMemo(() => ({
    ...theme(color[colorScheme]),
    colorScheme,
    darkModeEnabled
  }), [colorScheme]);

  return (
    <ThemeContext.Provider value={themeValue}>
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

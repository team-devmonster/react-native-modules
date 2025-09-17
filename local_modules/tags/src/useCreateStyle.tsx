import { TagStyle } from "./type";
import { useTheme } from "@team-devmonster/react-native-theme";
import { useMemo } from "react"
import { ImageStyle, StyleSheet } from "react-native";

type UseCreateStyleProps = {
  [name:string]: TagStyle | ImageStyle
}
export const useCreateStyle = (styleGroup:UseCreateStyleProps, deps?:any[]) => {
  const { colorScheme } = useTheme();
  return useMemo(() => (
    StyleSheet.create(styleGroup as any)
  ), [colorScheme, ...deps || []]);
}
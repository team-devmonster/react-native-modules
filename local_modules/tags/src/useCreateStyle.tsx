import { TagStyle } from "@team-devmonster/react-native-tags";
import { useTheme } from "@team-devmonster/react-native-theme";
import { useMemo } from "react"
import { ImageStyle, StyleSheet } from "react-native";

type useCreateStyleProps = {
  [name:string]: TagStyle | ImageStyle
}
export const useCreateStyle = (styleGroup:useCreateStyleProps, deps?:any[]) => {
  const { colorScheme } = useTheme();
  return useMemo(() => (
    StyleSheet.create(styleGroup as any)
  ), [colorScheme, ...deps || []]);
}
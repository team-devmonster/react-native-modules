import { TagStyle } from "@team-devmonster/react-native-tags";
import { useTheme } from "@team-devmonster/react-native-theme";
import { useMemo } from "react"
import { ImageStyle, StyleSheet } from "react-native";

type CreateStyleProps = {
  [name:string]: TagStyle | ImageStyle
}
export const createStyle = (styleGroup:CreateStyleProps, deps?:any[]) => {
  const { colorScheme } = useTheme();
  return useMemo(() => (
    StyleSheet.create(styleGroup as any)
  ), [colorScheme, ...deps || []]);
}
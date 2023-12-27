import { useMemo } from "react";
import { StyleProp, StyleSheet, ViewStyle, View } from "react-native"

export const SkeletonItem = ({ style }:{ style?:StyleProp<ViewStyle> }) => {
  const flattenStyle = useMemo(() => StyleSheet.flatten(style), [style]);

  return (
    <View style={{ ...flattenStyle, backgroundColor: 'black' }}></View>
  )
}
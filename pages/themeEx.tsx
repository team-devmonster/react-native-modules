import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme, darken, lighten, hexToRgb, contrast } from "@local_modules/theme";
import { Theme } from "App.theme";

const ThemeEx = () => {

  const { color, fontSize } = useTheme<Theme>();

  return (
    <View style={{ backgroundColor: color.white, flex: 1, padding: 20 }}>
      <View>
        <Text style={{ color: color.black }}>1. color themes</Text>
      </View>
      <View 
        style={{ 
          flexDirection: 'row', 
          paddingBottom: 18 
        }}>
        <View style={{ backgroundColor: color.primary, ...style.boxStyle }}>
          <Text style={{ color: color.black, fontSize: fontSize.sm }}>primary</Text>
        </View>
        <View style={{ backgroundColor: color.danger, ...style.boxStyle }}>
          <Text style={{ color: color.black, fontSize: fontSize.sm }}>danger</Text>
        </View>
      </View>
      <View>
        <Text style={{ color: color.black }}>2. color utils</Text>
      </View>
      <View 
        style={{ 
          flexDirection: 'row', 
          paddingBottom: 18 
        }}>
        <View style={{ backgroundColor: lighten(color.primary, 50), ...style.boxStyle }}>
          <Text style={{ color: contrast(color.primary), fontSize: fontSize.sm }}>primary lighter 50</Text>
        </View>
        <View style={{ backgroundColor: darken(color.danger, 50), ...style.boxStyle }}>
          <Text style={{ color: contrast(color.danger), fontSize: fontSize.sm }}>danger darken 50</Text>
        </View>
        <View style={{ backgroundColor: darken(color.step200, 50), ...style.boxStyle, width: style.boxStyle.width*2 }}>
          <Text style={{ color: contrast(color.step200), fontSize: fontSize.sm }}>step200 hex:{color.step200} {`\n`} rgb: {hexToRgb(color.step200)}</Text>
        </View>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  boxStyle: {
    width: 80, 
    height: 80, 
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default ThemeEx;
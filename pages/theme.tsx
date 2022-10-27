import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@local_modules/theme";
import { Theme } from "App.theme";

const ThemeEx = () => {

  const { color, fontSize } = useTheme<Theme>();

  return (
    <View 
      style={{ 
        backgroundColor: color.white, 
        flex: 1, 
        flexDirection: 'row', 
        paddingTop: 18, 
        paddingBottom: 18 
      }}>
      <View style={{ backgroundColor: color.primary, ...style.boxStyle }}>
        <Text style={{ color: color.black, fontSize: fontSize.sm }}>primary</Text>
      </View>
      <View style={{ backgroundColor: color.danger, ...style.boxStyle }}>
        <Text style={{ color: color.black, fontSize: fontSize.sm }}>danger</Text>
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
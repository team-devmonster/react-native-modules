import React from "react";
import { View } from "react-native";
import { useTheme } from "@local_modules/theme";
import { Button, Div, P } from "@local_modules/tags";

import { RootStackScreenProps } from "types";
import { SafeAreaView } from "react-native-safe-area-context";
import { Theme } from "App.theme";

const Index = ({ navigation }:RootStackScreenProps<'Index'>) => {

  const { color, fontSize } = useTheme<Theme>();

  return (
    <Div style={{ backgroundColor: color.white, flex: 1 }}>
      <SafeAreaView style={{ padding: 20 }}>
        <P style={{ 
          fontSize: fontSize.x2l, 
          marginBottom: 20 
          }}>React-native-modules!!</P>
        <Div>
          <Button 
            color={color.primary}
            style={{ marginBottom: 8 }}
            onClick={() => navigation.navigate('ThemeEx')}>
            react-native-theme
          </Button>
          <Button 
            color={color.primary}
            onClick={() => navigation.navigate('TagsEx')}>
            react-native-tags
          </Button>
        </Div>
      </SafeAreaView>
    </Div>
  )
}

export default Index;
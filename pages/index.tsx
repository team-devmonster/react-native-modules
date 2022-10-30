import React from "react";
import { View } from "react-native";
import { useTheme } from "@local_modules/theme";

import { RootStackScreenProps } from "types";
import { SafeAreaView } from "react-native-safe-area-context";
import { Theme } from "App.theme";
import { Button, Div } from "@local_modules/tags";

const Index = ({ navigation }:RootStackScreenProps<'Index'>) => {

  const { color } = useTheme<Theme>();

  return (
    <Div style={{ backgroundColor: color.white, flex: 1 }}>
      <SafeAreaView>
        <Div style={{ padding: 20 }}>
          <Button 
            style={{ marginBottom: 8 }}
            onPress={() => navigation.navigate('ThemeEx')}>
            hello
          </Button>
          <Button 
            onPress={() => navigation.navigate('TagsEx')}>
            hello2
          </Button>
        </Div>
      </SafeAreaView>
    </Div>
  )
}

export default Index;
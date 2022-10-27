import React from "react";
import { View, Text, Button } from "react-native";
import { useTheme } from "@local_modules/theme";

import { RootStackScreenProps } from "types";
import { SafeAreaView } from "react-native-safe-area-context";
import { Theme } from "App.theme";

const Index = ({ navigation }:RootStackScreenProps<'Index'>) => {

  const { color } = useTheme<Theme>();

  return (
    <View style={{ backgroundColor: color.white, flex: 1 }}>
      <SafeAreaView>
        <View style={{ padding: 20 }}>
          <Button 
            onPress={() => navigation.navigate('ThemeEx')} 
            title="Theme"></Button>
        </View>
      </SafeAreaView>
    </View>
  )
}

export default Index;
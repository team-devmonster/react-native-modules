import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "@local_modules/theme";

import { Theme } from "App";

const Index = () => {

  const { color } = useTheme<Theme>();

  return (
    <View style={{ backgroundColor: color.white }}>
      <Text>hello</Text>
    </View>
  )
}

export default Index;
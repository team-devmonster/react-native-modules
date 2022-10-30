import React from "react";
import { LogBox } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
// LogBox.ignoreAllLogs(); //Ignore all log notifications

import Index from "@pages/index";
import ThemeEx from "@pages/themeEx";
import TagsEx from "@pages/tagsEx";

import { RootStackParamList } from "types";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useTheme } from "@local_modules/theme";
import { Theme } from "App.theme";




const RootStack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {

  const { color } = useTheme<Theme>();
  
  return (
    <SafeAreaProvider style={{ backgroundColor: color.backgroundColor }}>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="Index">
          <RootStack.Screen name="Index" component={Index}/>
          <RootStack.Screen name="ThemeEx" component={ThemeEx}/>
          <RootStack.Screen name="TagsEx" component={TagsEx}/>
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default Navigation;
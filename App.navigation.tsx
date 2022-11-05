import React from "react";
import { LogBox } from "react-native";

import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
// LogBox.ignoreAllLogs(); //Ignore all log notifications

import Index from "@pages/index";
import ThemeEx from "@pages/themeEx";
import TagsEx from "@pages/tagsEx";

import { RootStackParamList } from "App.navigation.type";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useTheme } from "@local_modules/theme";
import { Theme } from "App.theme";
import RouterEx from "@pages/routerEx";
import ParamEx from "@pages/routerEx/paramEx";




const RootStack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {

  const { color, colorScheme } = useTheme<Theme>();
  
  return (
    <SafeAreaProvider style={{ backgroundColor: color.backgroundColor }}>
      <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <RootStack.Navigator initialRouteName="index">
          <RootStack.Screen name="index" component={Index}/>
          <RootStack.Screen name="themeEx" component={ThemeEx}/>
          <RootStack.Screen name="tagsEx" component={TagsEx}/>
          <RootStack.Screen name="routerEx" component={RouterEx}/>
          <RootStack.Screen name="routerEx/paramEx" component={ParamEx}/>
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default Navigation;
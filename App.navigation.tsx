import React from "react";
import { LogBox } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
// LogBox.ignoreAllLogs(); //Ignore all log notifications

import Index from "@pages/index";
import ThemeEx from "@pages/themeEx";
import { RootStackParamList } from "types";




const RootStack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Index">
        <RootStack.Screen name="Index" component={Index}/>
        <RootStack.Screen name="ThemeEx" component={ThemeEx}/>
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation;
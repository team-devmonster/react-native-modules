import React, { useLayoutEffect } from "react";
import { StyleProp, TextStyle, useColorScheme, ViewStyle } from "react-native";
import { StatusBar, StatusBarStyle } from 'expo-status-bar';
import { DarkTheme, DefaultTheme, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

interface LayoutProps {
  title?:string | (() => React.ReactNode);
  headerLeft?:React.ReactNode;
  headerRight?:React.ReactNode;
  headerBackTitle?:string;
  headerTitleStyle?:StyleProp<Pick<TextStyle, "fontFamily" | "fontSize" | "fontWeight"> & {
    color?: string | undefined;
  }>;
  headerShown?: boolean;
  style?: TextStyle;
  statusBarStyle?:StatusBarStyle;
  contentStyle?:StyleProp<ViewStyle>
}

export const Header = ({ title, headerTitleStyle, headerLeft, headerRight, headerBackTitle, headerShown, style, statusBarStyle, contentStyle }:LayoutProps) => {

  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  
  useLayoutEffect(() => {
    let options:Partial<NativeStackNavigationOptions> = {
      headerShadowVisible: false,
      headerStyle: {
        backgroundColor: (style?.backgroundColor || (colorScheme === 'dark' ? DarkTheme.colors.background : DefaultTheme.colors.background)) as string
      },
      headerTintColor: (style?.color || (colorScheme === 'dark' ? DarkTheme.colors.text : DefaultTheme.colors.text)) as string,
      contentStyle
    }
    if(typeof title !== null) options.headerTitle = title;
    if(headerTitleStyle) options.headerTitleStyle = headerTitleStyle;
    if(headerLeft) options.headerLeft = () => headerLeft;
    if(headerRight) options.headerRight = () => headerRight;
    if(headerBackTitle) options.headerBackTitle = headerBackTitle;
    if(typeof headerShown === 'boolean') options.headerShown = headerShown;

    navigation.setOptions(options);
  }, [title, headerLeft, headerRight, headerShown]);

  return (
    <StatusBar style={statusBarStyle || 'auto'} />
  )
}
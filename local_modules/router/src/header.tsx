import React, { useLayoutEffect, useMemo } from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { StatusBar, StatusBarStyle } from 'expo-status-bar';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { useTags } from "@team-devmonster/react-native-tags";

export interface HeaderProps {
  title?:string | React.ReactNode;
  headerLeft?:React.ReactNode;
  headerRight?:React.ReactNode;
  headerBackTitle?:string;
  headerTitleAlign?:"left" | "center" | undefined;
  headerTitleStyle?:StyleProp<Pick<TextStyle, "fontFamily" | "fontSize" | "fontWeight"> & {
    color?: string | undefined;
  }>;
  headerShown?: boolean;
  style?: TextStyle;
  statusBarStyle?:StatusBarStyle;
  contentStyle?:StyleProp<ViewStyle>
}

export const Header = ({ 
  title, 
  headerTitleAlign,
  headerTitleStyle:_headerTitleStyle,
  headerLeft, 
  headerRight, 
  headerBackTitle, 
  headerShown, 
  style, 
  statusBarStyle, 
  contentStyle 
}:HeaderProps) => {

  const navigation = useNavigation();

  const { tagConfig } = useTags();
  const headerTagStyle = tagConfig?.header?.style;
  const headerTagTitleStyle = tagConfig?.header?.headerTitleStyle;

  const headerStyle = useMemo(() => ({
    ...headerTagStyle,
    ...style as any
  }), [headerTagStyle, style]);

  const headerTitleStyle = useMemo(() => ({
    ...headerTagTitleStyle,
    ..._headerTitleStyle as any
  }), [headerTagTitleStyle, _headerTitleStyle])
  
  useLayoutEffect(() => {
    let options:Partial<NativeStackNavigationOptions> = {
      headerShadowVisible: false,
      headerStyle,
      contentStyle,
      headerTitleStyle
    }

    if(typeof title !== null) {
      if(typeof title === 'string') options.headerTitle = title;
      else options.headerTitle = () => title;
    }

    if(style?.color) options.headerTintColor = style.color as string;

    if(headerTitleAlign) options.headerTitleAlign = headerTitleAlign;
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
Header.displayName = 'Header';
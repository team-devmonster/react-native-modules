import React, { useEffect, useMemo } from "react";
import { ImageSourcePropType, StyleProp, TextStyle, ViewStyle } from "react-native";
import { StatusBar, StatusBarStyle } from 'expo-status-bar';
import { useNavigation } from "@react-navigation/native";
import { useHeaderHeight } from '@react-navigation/elements';
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { TagElement, useTags } from "@team-devmonster/react-native-tags";

export interface HeaderProps {
  title?:string | React.ReactNode;
  headerLeft?:React.ReactNode;
  headerRight?:React.ReactNode;
  headerBackTitle?:string;
  headerBackImageSource?:ImageSourcePropType;
  headerTitleAlign?:"left" | "center" | undefined;
  headerTitleStyle?:StyleProp<Pick<TextStyle, "fontFamily" | "fontSize" | "fontWeight"> & {
    color?: string | undefined;
  }>;
  headerShown?: boolean;
  style?: TextStyle;
  statusBarStyle?:StatusBarStyle;
  contentStyle?:ViewStyle;
  children?:TagElement;
}

export const Header = ({ 
  title, 
  headerTitleAlign,
  headerTitleStyle:_headerTitleStyle,
  headerLeft, 
  headerRight, 
  headerBackTitle, 
  headerBackImageSource,
  headerShown, 
  style, 
  statusBarStyle, 
  contentStyle,
  children
}:HeaderProps) => {

  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();

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
  
  useEffect(() => {
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
    if(headerBackImageSource) options.headerBackImageSource = headerBackImageSource;
    if(typeof headerShown === 'boolean') options.headerShown = headerShown;

    options.headerTransparent = true;
    options.contentStyle = { paddingTop: headerHeight, ...options.contentStyle as ViewStyle };

    navigation.setOptions(options);
  }, [title, headerLeft, headerRight, headerShown, headerStyle, headerTitleStyle, headerHeight]);

  return (
    <>
      <StatusBar style={statusBarStyle || 'auto'} />
      {children}
    </>
  )
}
Header.displayName = 'Header';
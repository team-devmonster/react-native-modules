import React, { useEffect, useMemo } from "react";
import { ImageSourcePropType, StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { StatusBar, StatusBarStyle } from 'expo-status-bar';
import { useNavigation } from "@react-navigation/native";
import { getDefaultHeaderHeight } from '@react-navigation/elements';
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { TagElement, useTags } from "@team-devmonster/react-native-tags";
import { useSafeAreaFrame, useSafeAreaInsets } from "react-native-safe-area-context";

export interface HeaderProps {
  title?:string | TagElement;
  headerLeft?:TagElement;
  headerRight?:TagElement;
  headerBackTitle?:string;
  headerBackVisible?:boolean;
  backButtonShown?:boolean;
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
  headerTitleStyle:inlineHeaderTitleStyle,
  headerLeft, 
  headerRight, 
  headerBackTitle, 
  headerBackVisible,
  headerBackImageSource,
  headerShown = true, 
  style, 
  statusBarStyle, 
  contentStyle:inlineContentStyle,
  children
}:HeaderProps) => {

  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const headerHeight = getDefaultHeaderHeight(
    useSafeAreaFrame(),
    false,
    insets.top
  );

  const { tagConfig } = useTags();
  const headerTagStyle = tagConfig?.header?.style;
  const headerTagTitleStyle = tagConfig?.header?.headerTitleStyle;

  const styles = useMemo(() => StyleSheet.create({ 
    headerStyle: {
      ...headerTagStyle,
      ...style as any
    },
    headerTitleStyle: {
      ...headerTagTitleStyle,
      ...inlineHeaderTitleStyle as any
    },
    contentStyle: {
      paddingTop: headerHeight,
      ...inlineContentStyle 
    }
  }), [
    headerTagStyle, style, 
    headerTagTitleStyle, inlineHeaderTitleStyle, 
    headerShown, inlineContentStyle
  ]);
  
  useEffect(() => {
    let options:Partial<NativeStackNavigationOptions> = {
      headerShown,
      headerShadowVisible: false,
      headerStyle: styles.headerStyle,
      headerTitleStyle: styles.headerTitleStyle,
      headerBackVisible
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
    if(headerShown) {
      // for react-native-reanimation's layout animation bugs....
      // they fill fix it... someday...
      options.headerTransparent = true;
      options.contentStyle = styles.contentStyle;
    }

    navigation.setOptions(options);
  }, [title, headerLeft, headerRight, headerShown, styles]);

  return (
    <>
      <StatusBar style={statusBarStyle || 'auto'} />
      {children}
    </>
  )
}
Header.displayName = 'Header';
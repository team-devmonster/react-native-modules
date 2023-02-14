import { useFonts } from 'expo-font';
import React, { useCallback, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';

import Navigation from './App.navigation';
import { AppNextNativeProvider } from './App.theme';

export default function App() {
  
  const [fontsLoaded] = useFonts({
    'Thin': require('./assets/fonts/Pretendard-Thin.otf'),
    'ExtraLight': require('./assets/fonts/Pretendard-ExtraLight.otf'),
    'Light': require('./assets/fonts/Pretendard-Light.otf'),
    'Regular': require('./assets/fonts/Pretendard-Regular.otf'),
    'Medium': require('./assets/fonts/Pretendard-Medium.otf'),
    'SemiBold': require('./assets/fonts/Pretendard-SemiBold.otf'),
    'Bold': require('./assets/fonts/Pretendard-Bold.otf'),
    'ExtraBold': require('./assets/fonts/Pretendard-ExtraBold.otf'),
    'Black': require('./assets/fonts/Pretendard-Black.otf')
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if(!fontsLoaded) {
    return null;
  }

  return (
    <AppNextNativeProvider>
      <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
        <Navigation></Navigation>
      </View>
    </AppNextNativeProvider>
  );
}
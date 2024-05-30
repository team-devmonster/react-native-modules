import { useFonts } from 'expo-font';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';

import Navigation from './App.navigation';
import { AppNextNativeProvider } from './App.theme';
import AppContext from '@components/context';

export default function App() {
  // global variables
  const checkJWT = useRef<any>();
  const instanceInit = useRef(true);
  const [isLoading, _setIsLoading] = useState<boolean>(true);
  const [isLoadingLocal, _setIsLoadingLocal] = useState<boolean>(true);

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
      <AppContext.Provider value={{ 
        checkJWT, 
        loading: { isLoading: isLoading, setIsLoading: _setIsLoading }, 
        loadingLocal: { isLoading: isLoadingLocal, setIsLoading: _setIsLoadingLocal }, 
        instanceInit
      }}>

        {
          fontsLoaded ?
            <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
              {/* <FetchLoading visible={isLoading}/> */}
              <Navigation></Navigation>
            </View>
          : null
        }

      </AppContext.Provider>
    </AppNextNativeProvider>
  );
}
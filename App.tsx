import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProvider } from '@local_modules/theme';

import Navigation from './App.navigation';
import { color, theme } from './App.theme';

export default function App() {
  return (
    <ThemeProvider color={color} theme={theme}>
      <SafeAreaProvider>
        <Navigation></Navigation>
      </SafeAreaProvider>
    </ThemeProvider>
  )
}
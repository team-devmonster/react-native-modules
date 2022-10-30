import React from 'react';

import Navigation from './App.navigation';
import { AppTagProvider, AppThemeProvider } from './App.theme';

export default function App() {

  return (
    <AppThemeProvider>
      <AppTagProvider>
        <Navigation></Navigation>
      </AppTagProvider>
    </AppThemeProvider>
  )
}
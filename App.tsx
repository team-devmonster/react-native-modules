import React from 'react';

import Navigation from './App.navigation';
import { AppNextNativeProvider } from './App.theme';

export default function App() {

  return (
    <AppNextNativeProvider>
      <Navigation></Navigation>
    </AppNextNativeProvider>
  )
}
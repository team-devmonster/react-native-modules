import React from "react";
import { RootStackScreenProps } from "App.navigation.type";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "@local_modules/theme";
import { Theme } from "App.theme";
import { Button, Div, P } from "@local_modules/tags";
import { A } from "@local_modules/router";

const Index = () => {

  const { color, fontSize } = useTheme<Theme>();

  return (
    <Div>
      <Div style={{ backgroundColor: color.white }}>
        <Div style={{ padding: 20 }}>
          <P style={{ 
            fontSize: fontSize.x2l, 
            marginBottom: 20 
            }}>Devmonster's react-native-modules!!</P>
          <Div>
            <A href={'/themeEx'}>
              <Button 
                color={color.primary}
                style={{ marginBottom: 8 }}>
                react-native-theme
              </Button>
            </A>
            <A href={'/tagsEx'}>
              <Button 
                color={color.primary}
                style={{ marginBottom: 8 }}>
                react-native-tags
              </Button>
            </A>
            <A href={'/routerEx'} style={{ backgroundColor: 'red', padding: 20 }}>
              <Button color={color.warning}>
                react-native-router
              </Button>
            </A>
          </Div>
        </Div>
      </Div>
    </Div>
  )
}

export default Index;
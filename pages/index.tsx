import React from "react";

import { useTheme } from "@local_modules/theme";
import { Theme } from "App.theme";
import { Button, Div, H1 } from "@local_modules/tags";
import { Layout, A, Header } from "@local_modules/router";
import { ScrollView } from "react-native";

const Index = () => {

  const { color, fontSize, shadow } = useTheme<Theme>();

  return (
    <Layout style={{ padding: 0 }}>
      <Header title="hello devmonster" style={{ backgroundColor: 'blue' }}/>
      <Div style={{ backgroundColor: 'red' }}>
        <H1 style={{
          fontSize: fontSize.x2l, 
          marginBottom: 20 
          }}>
          Devmonster's react-native-modules!!
        </H1>
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
          <A href={'/routerEx'}>
            <Button 
              color={color.danger} 
              fill="outline" 
              style={{ ...shadow.base, marginBottom: 8 }}>
              react-native-router
            </Button>
          </A>
          <A href={'/formEx'}>
            <Button color={color.danger} fill="outline" style={{ ...shadow.base }}>
              react-native-form
            </Button>
          </A>
        </Div>
      </Div>
    </Layout>
  )
}

export default Index;
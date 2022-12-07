import React from "react";
import { useTheme } from "@local_modules/theme";
import { Theme } from "App.theme";
import { Div, Button } from "@local_modules/tags";
import { A, FixedLayout, Header, Layout } from "@local_modules/router";
const isTrue = true;
const RouterEx = () => {

  const { color } = useTheme<Theme>();

  return (
    <Layout
      style={{
        backgroundColor: color.backgroundColor,
        flex: 1,
        //padding: 18
      }}>
      <Header
        title="Hello Header"
        headerRight={
          <Button>
            setting
          </Button>
        }/>
      <A href='/themeEx'>
        <Button color={color.primary} style={{ marginBottom: 8 }}>themeEx</Button>
      </A>
      <A href={{
        pathname: '/routerEx/paramEx',
        query: {
          name: 'soohong kim',
          nickname: 'aldegad',
          company: 'devmonster'
        }
      }}>
        <Button color={color.danger} style={{ marginBottom: 8 }}>paramEx</Button>
      </A>
      <A href='https://www.google.co.kr'>
        <Button color={color.warning}>google</Button>
      </A>
      <FixedLayout>
        <Div style={{ backgroundColor: 'red', top: 0 }}>hello</Div>
        {
          isTrue ? null : <Div style={{ backgroundColor: 'red', top: 0 }}>hello</Div>
        }
        <Div style={{ backgroundColor: 'red' }}>hello</Div>
        <Div style={{ backgroundColor: 'red' }}>hello</Div>
        <Div style={{ backgroundColor: 'red' }}>hello</Div>
      </FixedLayout>
    </Layout>
  )
}

export default RouterEx;
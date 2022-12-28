import React from "react";
import { useTheme } from "@local_modules/theme";
import { Theme } from "App.theme";
import { Div, Button, P } from "@local_modules/tags";
import { A, FixedLayout, Header, Layout } from "@local_modules/router";
import { useRouter } from "@local_modules/router/dist/esm/src/useRouter";
const isTrue = true;
const RouterEx = () => {

  const { color } = useTheme<Theme>();
  const router = useRouter();

  return (
    <Layout
      style={{
        backgroundColor: color.backgroundColor,
        flex: 1,
        padding: 18
      }}>
      <Header
        title="Hello Header"
        headerRight={
          <Button>
            setting
          </Button>
      }>
        <P style={{ height: 56, alignItems: 'center', justifyContent: 'center', backgroundColor: color.step100 }}>next line</P>
      </Header>
      <A href='/themeEx'>
        <Button color={color.primary} style={{ marginBottom: 8 }}>themeEx</Button>
      </A>
      <A href={{
        pathname: '/routerEx/paramEx',
        query: {
          name: 'soohong kim',
          nickname: 'aldegad',
          company: 'devmonster',
          des: 'use A & href',
        }
      }}>
        <Button color={color.danger} style={{ marginBottom: 8 }}>paramEx(A)</Button>
      </A>
      <Button 
        onClick={() => {
          router.push({
            pathname: '/routerEx/paramEx',
            query: {
              name: 'soohong kim',
              nickname: 'aldegad',
              company: 'devmonster',
              des: 'use useRouter & push'
            }
          })
        }}
        color={color.danger} 
        style={{ marginBottom: 8 }}
      >paramEx(Router)</Button>
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
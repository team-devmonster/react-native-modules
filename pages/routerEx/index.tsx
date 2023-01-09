import React from "react";
import { useTheme } from "@local_modules/theme";
import { Theme } from "App.theme";
import { Div, Button, P } from "@local_modules/tags";
import { A, FixedLayout, Header, Layout } from "@local_modules/router";
import { useRouter } from "@local_modules/router/dist/esm/src/useRouter";

import ImgPaperAirplane from "assets/images/paperAirplane.svg";
import { MainHeader } from "@components/mainHeader";

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
      {/* <Header
        headerLeft={
          <Button onClick={() => router.back()}>
            <ImgPaperAirplane color={color.primary} width={20} height={20}/>
          </Button>
        }
        title="Hello Header"
        headerRight={
          <Button style={{ marginRight: -20 }}>
            setting
          </Button>
      }>
        <P style={{ height: 56, alignItems: 'center', justifyContent: 'center', backgroundColor: color.step100 }}>next line</P>
      </Header> */}
      <MainHeader/>
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
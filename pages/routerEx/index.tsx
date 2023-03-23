import React, { useContext, useState } from "react";
import { useTheme } from "@local_modules/theme";
import { Theme } from "App.theme";
import { Div, Button, P, H1, H2, TagContext } from "@local_modules/tags";
import { A, FixedLayout, Header, Layout, Modal, useRouter, RouterContext } from "@local_modules/router";

import ImgPaperAirplane from "assets/images/paperAirplane.svg";
import { Toast } from "@local_modules/router";

const RouterEx = () => {

  const { color } = useTheme<Theme>();
  const router = useRouter();

  const [visibleFull, setVisibleFull] = useState(false);
  const [visibleHandle, setVisibleHandle] = useState(false);
  const [visibleCenter, setVisibleCenter] = useState(false);
  const [visibleClear, setVisibleClear] = useState(false);

  // const { layoutScrollRef } = useContext(RouterContext);
  
  const [count, setCount] = useState(0);

  return (
    <Layout
      style={{
        backgroundColor: color.backgroundColor,
        flex: 1,
        padding: 18
      }}>
      <Header
        headerLeft={
          <Button onClick={() => router.back()}>
            <ImgPaperAirplane color={color.primary} width={20} height={20}/>
          </Button>
        }
        title={<Div style={{ backgroundColor: 'red' }}>Hello Header</Div>}
        headerTitleAlign="center"
        headerRight={
          <Button style={{ marginRight: -20 }}>
            setting
          </Button>
      }>
        <P style={{ height: 56, alignItems: 'center', justifyContent: 'center', backgroundColor: color.step100 }}>next line</P>
      </Header>

      <Div style={{ rowGap: 8 }}>
        <A href='/themeEx'>
          <Button color={color.primary}>themeEx</Button>
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
          <Button color={color.danger}>paramEx(A)</Button>
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
        >paramEx(Router)</Button>
        
        <A href='https://www.google.co.kr'>
          <Button color={color.warning}>google</Button>
        </A>

        <Button 
          onClick={() => {
            // console.log(layoutScrollRef.current);
            setVisibleFull(true);
          }}
          color={color.danger} 
        >open modal fullScreen</Button>

        <Button 
          onClick={() => {
            setVisibleHandle(true);
          }}
          color={color.danger} 
        >open modal handleScreen</Button>

        <Button 
          onClick={() => {
            setVisibleCenter(true);
          }}
          color={color.danger} 
        >open modal center</Button>

        <Button 
          onClick={() => {
            setVisibleClear(true);
          }}
          color={color.danger}
        >open modal clear</Button>

        <Button 
          onClick={() => {
            Toast({ message: '토스트 완성' });
          }}
          color={color.step900}
        >open Toast</Button>
      </Div>

      <Modal 
        visible={visibleFull}
        onRequestClose={() => setVisibleFull(false)}
        type="fullScreen"
      >
        <H1>Modal Fullscreen</H1>
        <H1>Count: { String(count) }</H1>
        <H1>Modal Fullscreen</H1>
        <H1>Modal Fullscreen</H1>
        <H1>Modal Fullscreen</H1>
        <H1>Modal Fullscreen</H1>
        <Button onClick={() => setCount(count + 1)}>add count</Button>
        <Button onClick={() => setVisibleFull(false)}>close Modal</Button>
      </Modal>

      <Modal 
        visible={visibleHandle}
        onRequestClose={() => setVisibleHandle(false)}
        contentStyle={{ height: 600 }}
        type="handleScreen"
      >
        <H1>Modal HandleScreen</H1>
        
        <Button onClick={() => setVisibleHandle(false)}>close Modal</Button>
      </Modal>

      <Modal 
        visible={visibleCenter}
        onRequestClose={() => setVisibleCenter(false)}
        type="center"
      >
        <H1>Modal Center</H1>
        
        <Button onClick={() => setVisibleCenter(false)}>close Modal</Button>
      </Modal>

      <Modal 
        visible={visibleClear}
        onRequestClose={() => setVisibleClear(false)}
        type="clear"
      >
        <H1>Modal Clear</H1>
        
        <Button onClick={() => setVisibleClear(false)}>close Modal</Button>
      </Modal>
    </Layout>
  )
}

export default RouterEx;
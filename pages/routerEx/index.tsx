import React, { useState } from "react";
import { useTheme } from "@local_modules/theme";
import { Theme } from "App.theme";
import { Div, Button, P, H1 } from "@local_modules/tags";
import { A, FixedLayout, Header, Layout, Modal } from "@local_modules/router";
import { useRouter } from "@local_modules/router/dist/esm/src/useRouter";

import ImgPaperAirplane from "assets/images/paperAirplane.svg";
import { MainHeader } from "@components/mainHeader";
import { FadeIn } from "react-native-reanimated";

const isTrue = true;
const RouterEx = () => {

  const { color } = useTheme<Theme>();
  const router = useRouter();

  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [count, setCount] = useState(0);

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
        <Button color={color.warning} style={{ marginBottom: 8 }}>google</Button>
      </A>

      <Button 
        onClick={() => {
          setVisible(true);
        }}
        color={color.danger} 
        style={{ marginBottom: 8 }}
      >open modal</Button>

      <Modal 
        visible={visible}
        onRequestClose={() => setVisible(false)}
        fullScreen={true}
      >
        <H1>Modal1</H1>
        <Button onClick={() => setCount(count+1)}>add count</Button>
        <P>count: {String(count)}</P>
        <Button onClick={() => {
          setVisible(false);
          setVisible2(true);
        }}>change modal</Button>
        <Button onClick={() => {
          setVisible3(true);
        }}>add modal</Button>
        <Button onClick={() => setVisible(false)}>close modal</Button>
      </Modal>

      <Modal 
        visible={visible2}
        onRequestClose={() => setVisible2(false)}
        fullScreen={true}
      >
        <Div>
          <H1>Modal2</H1>
          <Button onClick={() => setCount(count+1)}>add count</Button>
          <P>count: {String(count)}</P>
          <Button onClick={() => setVisible2(false)}>close modal</Button>
        </Div>
      </Modal>

      <Modal 
        visible={visible3}
        onRequestClose={() => setVisible3(false)}
        fullScreen={true}
        style={{ alignItems: 'center', justifyContent: 'center' }}
      >
        <Div style={{ backgroundColor: color.step100 }}>
          <H1>Modal3</H1>
          <Button onClick={() => setCount(count+1)}>add count</Button>
          <P>count: {String(count)}</P>
          <Button onClick={() => setVisible3(false)}>close modal</Button>
        </Div>
      </Modal>
    </Layout>
  )
}

export default RouterEx;
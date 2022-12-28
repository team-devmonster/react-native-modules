import React from "react";
import { useTheme } from "@local_modules/theme";
import { Div, Button, P } from "@local_modules/tags";
import { Theme } from "App.theme";
import { A, useRouter, RouterProps, Header, Layout, FixedLayout, Footer } from "@local_modules/router";
import { RootStackParamList } from "App.navigation.type";

const ParamEx = () => {
  const { color } = useTheme<Theme>();
  const router = useRouter<RouterProps<RootStackParamList, 'routerEx/paramEx'>>();
  const { query } = router;

  return (
    <Layout
      style={{
        backgroundColor: color.white,
        padding: 18,
        flex: 1
      }}>
      <Header
        style={{
          backgroundColor: color.primary,
          color: 'red'
        }}
        title="Hello Params"
      />
      <P style={{ padding: 8, backgroundColor: color.step300 }}>
        { query.name } / { query.nickname } / { query.company }
      </P>
      <P style={{ padding: 8, backgroundColor: color.step300 }}>
        { query.des }
      </P>
      <A back={true}>
        <Button color={color.primary}>Back</Button>
      </A>
      <A href="/tagsEx" replace={true}>
        <Button color={color.primary}>replace this page</Button>
      </A>
      <A href="/index" reset={true}>
        <Button color={color.primary}>reset to home</Button>
      </A>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <FixedLayout>
        <Div style={{ top: 100, left: 20 }}>HEllo</Div>
      </FixedLayout>
      <Footer style={{
        backgroundColor: color.white
      }}>
        <Div style={{
          flexDirection: 'row',
          backgroundColor: 'red'
        }}>
          <Button color={color.primary} style={{ flex: 1 }}>Tab1</Button>
          <Button color={color.primary} style={{ flex: 1 }}>Tab2</Button>
          <Button color={color.primary} style={{ flex: 1 }}>Tab3</Button>
          <Button color={color.primary} style={{ flex: 1 }}>Tab4</Button>
        </Div>
      </Footer>
    </Layout>
  )
}

export default ParamEx;
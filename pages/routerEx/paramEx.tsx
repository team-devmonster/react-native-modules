import React from "react";
import { useTheme } from "@local_modules/theme";
import { Div, Button, P } from "@local_modules/tags";
import { Theme } from "App.theme";
import { A, useRouter, RouterProps, Header } from "@local_modules/router";
import { RootStackParamList } from "App.navigation.type";

const ParamEx = () => {
  const { color } = useTheme<Theme>();
  const router = useRouter<RouterProps<RootStackParamList, 'routerEx/paramEx'>>();
  const { query } = router;

  return (
    <Div
      style={{
        backgroundColor: color.backgroundColor,
        flex: 1,
        padding: 18
      }}>
      <Header title="Custom Header"></Header>
      <P style={{ padding: 8, backgroundColor: color.step300 }}>
        { query.name } / { query.nickname } / { query.company }
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
    </Div>
  )
}

export default ParamEx;
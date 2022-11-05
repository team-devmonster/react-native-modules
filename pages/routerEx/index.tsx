import React from "react";
import { useTheme } from "@local_modules/theme";
import { Theme } from "App.theme";
import { Div, Button } from "@local_modules/tags";
import { A } from "@local_modules/router";

const RouterEx = () => {

  const { color } = useTheme<Theme>();

  return (
    <Div
      style={{
        backgroundColor: color.backgroundColor,
        flex: 1,
        padding: 18
      }}>
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
    </Div>
  )
}

export default RouterEx;
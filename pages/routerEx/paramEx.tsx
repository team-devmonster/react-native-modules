import React from "react";
import { useTheme } from "@local_modules/theme";
import { Div, Button, P } from "@local_modules/tags";
import { Theme } from "App.theme";
import { A, useRouter } from "@local_modules/router";

const ParamEx = () => {

  const { color } = useTheme<Theme>();
  const { query } = useRouter();

  //console.log(colorScheme);

  return (
    <Div
      style={{
        backgroundColor: color.backgroundColor,
        flex: 1,
        padding: 18
      }}>
      <P style={{ padding: 8, backgroundColor: color.step300 }}>
        { query.name } / { query.nickname } / { query.company }
      </P>
      <A back={true}>
        <Button color={color.primary}>Back</Button>
      </A>
    </Div>
  )
}

export default ParamEx;
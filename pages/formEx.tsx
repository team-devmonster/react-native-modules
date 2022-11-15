import React from "react";

import { useTheme } from "@local_modules/theme";
import { Theme } from "App.theme";
import { Button, Div, P } from "@local_modules/tags";
import { A } from "@local_modules/router";
import { Input } from "@local_modules/form/input";
import { useForm } from "react-hook-form";

const FormEx = () => {

  const { color, fontSize, shadow } = useTheme<Theme>();

  const { control } = useForm<{ id:number, password:string }>();

  return (
    <Div>
      <Div style={{ backgroundColor: color.white }}>
        <Div style={{ padding: 20 }}>
          <Input control={control} name="id"></Input>
        </Div>
      </Div>
    </Div>
  )
}

export default FormEx;
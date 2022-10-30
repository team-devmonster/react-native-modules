import React from "react";
import { useTheme } from "@local_modules/theme";
import { Theme } from "App.theme";
import { Div, Button } from "@local_modules/tags";
import { Alert } from "react-native";

const TagsEx = () => {

  const { color, fontSize } = useTheme<Theme>();

  return (
    <Div
      style={{
        backgroundColor: color.white, 
        flex: 1, 
        padding: 18 
      }}>
      <Div>
        {`1. div => <Div></Div>`}
      </Div>
      <Div>
        <Button color={color.primary} onPress={() => Alert.alert('pressed')}>
          {`2. button => <Button></Button>`}
        </Button>
      </Div>
    </Div>
  )
}

export default TagsEx;
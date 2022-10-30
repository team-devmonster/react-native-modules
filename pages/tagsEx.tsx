import React from "react";
import { useTheme } from "@local_modules/theme";
import { Div, Button, Img } from "@local_modules/tags";
import { Theme } from "App.theme";
import { Alert, Text, View } from "react-native";

const TagsEx = () => {

  const { color, fontSize } = useTheme<Theme>();

  return (
    <Div
      style={{
        backgroundColor: color.white, 
        flex: 1, 
        padding: 18 
      }}>
      <Div style={{ fontSize: fontSize.xl }}>
        {`1. div => <Div></Div>`}
      </Div>
      <Div>
        <Button color={color.primary} onClick={() => Alert.alert('pressed')}>
          {`2. button => <Button></Button>`}
        </Button>
      </Div>
      <Div>
        <Img 
          style={{ 
            width: '100%',
            aspectRatio: 1.774, 
            backgroundColor: color.step500
          }} 
          src="https://devmonster.co.kr/static/media/main-bg-05.d88f30e7.png"></Img>
      </Div>
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: 24, 
        height: 80 
        }}>
        <Button 
          style={{ 
            flex: 1, 
            alignSelf: 'stretch', 
            flexDirection: 'row', 
            alignItems: 'center',
            fontSize: fontSize.sm
          }}>
            hellohellohello omg~
        </Button>
      </View>
    </Div>
  )
}

export default TagsEx;
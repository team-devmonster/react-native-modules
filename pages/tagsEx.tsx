import React from "react";
import { useTheme } from "@local_modules/theme";
import { Div, Button, Img, P, Span } from "@local_modules/tags";
import { Theme } from "App.theme";
import { Alert } from "react-native";

const TagsEx = () => {

  const { color, fontSize, shadow } = useTheme<Theme>();
  const date = 10;

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
      <P style={{  
        marginBottom: 24, 
        height: 80
        }}>
        hello button~ {date}
        <Span>hello</Span>
        <Button 
          color={color.primary} 
          style={{ display: 'inline-flex' }}>inline button</Button>
        hello~!
        <P>hello next line!</P>
      </P>
      <P style={{ marginBottom: 20, color: color.primary }}>
        hello?
        <Button color={color.step500}>not inline button. normal button.</Button>
      </P>
      <Button 
        color={color.primary}
        fill="outline"
        style={{ 
          alignSelf: 'stretch', 
          alignItems: 'center',
          fontSize: fontSize.sm,
          ...shadow.base,
          marginBottom: 18
        }}>
          hellohellohello omg~
          <Img 
          style={{
            width: 20,
            aspectRatio: 1.774, 
            backgroundColor: color.step500
          }} 
          src="https://devmonster.co.kr/static/media/main-bg-05.d88f30e7.png"></Img>
      </Button>

      <Button
        style={{
          width: 40, 
          height: 40, 
          borderRadius: 15, 
          borderColor: color.primary, 
          borderWidth: 2,
          padding: 0,
          minHeight: undefined
          }}>
          <Div 
            style={{
              padding: 0,
              width: 14, 
              height: 14, 
              borderRadius: 7, 
              backgroundColor: color.primary 
            }}></Div>
      </Button>
    </Div>
  )
}

export default TagsEx;
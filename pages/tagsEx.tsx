import React from "react";
import { useTheme } from "@local_modules/theme";
import { Div, Button, Img, P, Span, Br } from "@local_modules/tags";
import { Theme } from "App.theme";
import { Alert } from "react-native";

const TagsEx = () => {

  const { color, fontSize, shadow } = useTheme<Theme>();

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
          src={require('assets/images/back.png')}></Img>
      </Div>
      <P style={{  
        marginBottom: 24, 
        height: 80
        }}>
        hello P
        <Span style={{ color: color.danger }}>hello Span</Span>
        <Button 
          color={color.primary} 
          style={{ display: 'inline-flex', height: 40 }}>inline button</Button>
        hello~!
      </P>
      <P style={{ marginBottom: 20, color: color.primary }}>
        hello?
        <Button color={color.step500}>not inline button. normal button.</Button>
      </P>
      <P>
        text with {`<Br/>`}<Br></Br>hello
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

      <Button color={color.primary} fill="outline" style={{ marginBottom: 8 }}>
        outline
      </Button>

      <Button color={color.primary} fill="translucent" style={{ marginBottom: 8 }}>
        translucent
      </Button>

      <Button color={color.primary} fill="translucent" disabled={true}>
        disabled
      </Button>



      <P>gap Test1</P>
      <Div style={{ borderColor: 'green', borderWidth: 1 }}>
        <Div style={{ flexDirection: 'row', borderColor: 'blue', borderWidth: 1, margin: -4 }}>
          <Div style={{ margin: 4, backgroundColor: 'red', flex: 1, aspectRatio: 1 }}></Div>
          <Div style={{ margin: 4, backgroundColor: 'red', flex: 1, aspectRatio: 1 }}></Div>
          <Div style={{ margin: 4, backgroundColor: 'red', flex: 1, aspectRatio: 1 }}></Div>
          <Div style={{ margin: 4, backgroundColor: 'red', flex: 1, aspectRatio: 1 }}></Div>
          <Div style={{ margin: 4, backgroundColor: 'red', flex: 1, aspectRatio: 1 }}></Div>
          <Div style={{ margin: 4, backgroundColor: 'red', flex: 1, aspectRatio: 1 }}></Div>
        </Div>
      </Div>

      <P>gap Test2: ....how to remove -margin...?</P>
      <Div style={{ borderColor: 'green', borderWidth: 1, flexDirection: 'row', gap: 8 }}>
        <Div style={{ backgroundColor: 'red', flex: 1, aspectRatio: 1 }}></Div>
        <Div style={{ backgroundColor: 'red', flex: 1, aspectRatio: 1 }}></Div>
        <Div style={{ backgroundColor: 'red', flex: 1, aspectRatio: 1 }}></Div>
        <Div style={{ backgroundColor: 'red', flex: 1, aspectRatio: 1 }}></Div>
        <Div style={{ backgroundColor: 'red', flex: 1, aspectRatio: 1 }}></Div>
        <Div style={{ backgroundColor: 'red', flex: 1, aspectRatio: 1 }}></Div>
      </Div>
    </Div>
  )
}

export default TagsEx;
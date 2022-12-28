import React from "react";
import { useTheme } from "@local_modules/theme";
import { Div, Button, Img, P, Span, Br, Table, Thead, Tr, Th, Tbody, Td } from "@local_modules/tags";
import { Theme } from "App.theme";
import { Alert, ScrollView } from "react-native";

const TagsEx = () => {

  const { color, fontSize, shadow } = useTheme<Theme>();

  return (
    <ScrollView
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

      <Button color={color.primary} fill="outline" style={{ marginBottom: 10 }} disabled={true}>
        disabled
      </Button>

      <Button 
        color={color.primary} 
        fill="outline" 
        style={{ 
          marginBottom: 10,
          borderRadius: 10,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0
        }}>
        disabled
      </Button>

      <Button 
        color={color.step100}
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          borderStyle: 'dashed',
          borderColor: color.primary,
          borderWidth: 1
        }}>
      </Button>

      <P>gap Test</P>
      <Div style={{ borderColor: 'orange', borderWidth: 1, flexDirection: 'row', gap: 8, borderRadius: 20, flexWrap: 'wrap', marginBottom: 10, ...shadow.base, overflow: 'hidden' }}>
        <Div style={{ backgroundColor: 'lightgray', flex: 2, minWidth: 100, height: 50 }}>1</Div>
        <Div style={{ backgroundColor: 'lightgray', flex: 1, minWidth: 100, height: 50 }}>2</Div>
        <Div style={{ backgroundColor: 'lightgray', flex: 3, minWidth: 100, height: 50 }}>3</Div>
        <Div style={{ backgroundColor: 'lightgray', flex: 1, minWidth: 100, height: 50 }}>4</Div>
        <Div style={{ backgroundColor: 'lightgray', flex: 1, minWidth: 100, height: 50 }}>5</Div>
        <Div style={{ backgroundColor: 'lightgray', flex: 1, minWidth: 100, height: 50 }}>6</Div>
      </Div>

      <P>not gap Test</P>
      <Div style={{ borderColor: 'orange', borderWidth: 1, flexDirection: 'row', borderRadius: 20, flexWrap: 'wrap', ...shadow.base, padding: 5 }}>
        <Div style={{ backgroundColor: 'lightgray', flex: 2, minWidth: 100, height: 50 }}>1</Div>
        <Div style={{ backgroundColor: 'lightgray', flex: 1, minWidth: 100, height: 50 }}>2</Div>
        <Div style={{ backgroundColor: 'lightgray', flex: 3, minWidth: 100, height: 50 }}>3</Div>
        <Div style={{ backgroundColor: 'lightgray', flex: 1, minWidth: 100, height: 50 }}>4</Div>
        <Div style={{ backgroundColor: 'lightgray', flex: 1, minWidth: 100, height: 50 }}>5</Div>
        <Div style={{ backgroundColor: 'lightgray', flex: 1, minWidth: 100, height: 50 }}>6</Div>
      </Div>

      <P>button gap Test</P>
      <Button color={color.primary} fill="none" style={{ 
        borderColor: 'red', 
        borderWidth: 2, 
        flexDirection: 'row', 
        gap: 10, 
        ...shadow.base, 
        borderRadius: 20, 
        flexWrap: 'wrap', 
        padding: 2,
        marginBottom: 20}}>
        <Div style={{ backgroundColor: 'lightgray', flex: 2, minWidth: 100, height: 50 }}>1</Div>
        <Div style={{ backgroundColor: 'lightgray', flex: 1, minWidth: 100, height: 50 }}>2</Div>
        <Div style={{ backgroundColor: 'lightgray', flex: 3, minWidth: 100, height: 50 }}>3</Div>
        <Div style={{ backgroundColor: 'lightgray', flex: 1, minWidth: 100, height: 50 }}>4</Div>
        <Div style={{ backgroundColor: 'lightgray', flex: 1, minWidth: 100, height: 50 }}>5</Div>
        <Div style={{ backgroundColor: 'lightgray', flex: 1, minWidth: 100, height: 50 }}>6</Div>
      </Button>

      <P>button not gap Test</P>
      <Button color={color.primary} fill="none" style={{ borderColor: 'green', borderWidth: 1, flexDirection: 'row', borderRadius: 20, flexWrap: 'wrap', padding: 5}}>
        <Div style={{ backgroundColor: 'lightgray', flex: 2, minWidth: 100, height: 50 }}>1</Div>
        <Div style={{ backgroundColor: 'lightgray', flex: 1, minWidth: 100, height: 50 }}>2</Div>
        <Div style={{ backgroundColor: 'lightgray', flex: 3, minWidth: 100, height: 50 }}>3</Div>
        <Div style={{ backgroundColor: 'lightgray', flex: 1, minWidth: 100, height: 50 }}>4</Div>
        <Div style={{ backgroundColor: 'lightgray', flex: 1, minWidth: 100, height: 50 }}>5</Div>
        <Div style={{ backgroundColor: 'lightgray', flex: 1, minWidth: 100, height: 50 }}>6</Div>
      </Button>

      <Table>
        <Thead>
          <Tr style={{ display: 'flex', flexDirection: 'row' }}>
            <Th style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>부품번호</Th>
            <Th style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>보관BOX</Th>
            <Th style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>부품명</Th>
            <Th style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>UNIT</Th>
            <Th style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>WORK</Th>
            <Th style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>STND</Th>
            <Th style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>최초잔량</Th>
            <Th style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>RE-MAIN</Th>
            <Th style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>최종DATE</Th>
            <Th style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>최종 사용량</Th>
            <Th style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>소모 / 수급량 정보 확인하기</Th>
            <Th style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>수정하기</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr style={{ display: 'flex', flexDirection: 'row' }}>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>부품번호</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>보관BOX</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>부품명</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>UNIT</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>WORK</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>STND</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>최초잔량</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>RE-MAIN</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>최종DATE</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>최종 사용량</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>소모 / 수급량 정보 확인하기</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>수정하기</Td>
          </Tr>
          <Tr style={{ display: 'flex', flexDirection: 'row' }}>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>부품번호</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>보관BOX</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>부품명</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>UNIT</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>WORK</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>STND</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>최초잔량</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>RE-MAIN</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>최종DATE</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>최종 사용량</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>소모 / 수급량 정보 확인하기</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>수정하기</Td>
          </Tr>
          <Tr style={{ display: 'flex', flexDirection: 'row' }}>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>부품번호</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>보관BOX</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>부품명</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>UNIT</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>WORK</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>STND</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>최초잔량</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>RE-MAIN</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>최종DATE</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>최종 사용량</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>소모 / 수급량 정보 확인하기</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>수정하기</Td>
          </Tr>
        </Tbody>
      </Table>
    </ScrollView>
  )
}

export default TagsEx;
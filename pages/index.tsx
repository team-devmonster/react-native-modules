import React, { useState } from "react";

import { useTheme } from "@local_modules/theme";
import { Theme } from "App.theme";
import { Button, Div, H1 } from "@local_modules/tags";
import { Layout, A, Header } from "@local_modules/router";
import ImgShadowEx from "assets/images/shadowEx.svg";
import { Pressable, Text } from "react-native";
import { ImgViewer } from "@local_modules/imgViewer";

const Index = () => {

  const { color, fontSize, shadow } = useTheme<Theme>();

  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);

  return (
    <Layout style={{ padding: 0 }}>
      <Header headerShown={false}/>
      <Div style={{ rowGap: 8 }}>
        <H1 style={{
          fontSize: fontSize.x2l, 
          marginBottom: 20 
          }}>
          Devmonster's react-native-modules!!
        </H1>
        <Div>
          <A href={'/themeEx'}>
            <Button 
              color={color.primary}
              style={{ marginBottom: 8 }}>
              react-native-theme
            </Button>
          </A>
          <A href={'/tagsEx'}>
            <Button 
              color={color.primary}
              style={{ marginBottom: 8 }}>
              react-native-tags
            </Button>
          </A>
          <A href={'/routerEx'}>
            <Button 
              color={color.danger} 
              fill="outline" 
              style={{ ...shadow.base, marginBottom: 8, borderStyle: 'dashed', backgroundColor: color.step100 }}>
              react-native-router
            </Button>
          </A>
          <A href={'/formEx'}>
            <Button 
              color={color.danger} 
              fill="outline" 
              style={{ ...shadow.base, marginBottom: 8, borderStyle: 'dashed', backgroundColor: color.step100 }}>
              react-native-form
            </Button>
          </A>

          <Button color={color.danger} fill="outline" style={{ ...shadow.base }} onClick={() => setVisible(true)}>
            react-native-img-viewer(single)
          </Button>

          <Button color={color.danger} fill="outline" style={{ ...shadow.base }} onClick={() => setVisible2(true)}>
            react-native-img-viewer(Multiple)
          </Button>

          <ImgViewer
            visible={visible}
            onRequestClose={() => {
              setVisible(false);
            }}
            src={'https://media.istockphoto.com/id/1402577565/photo/colour-swatches-book.webp?b=1&s=170667a&w=0&k=20&c=5oYyljXxGN1aolUSuyLLAii11_bcDb-tiVq0iGV7N5I='}
          />

          <ImgViewer
            visible={visible2}
            onRequestClose={() => {
              setVisible2(false);
            }}
            src={[
              'https://media.istockphoto.com/id/1402577565/photo/colour-swatches-book.webp?b=1&s=170667a&w=0&k=20&c=5oYyljXxGN1aolUSuyLLAii11_bcDb-tiVq0iGV7N5I=',
              'https://asia.omsystem.com/content/000104499.jpg',
              'https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg',
              'https://nikonrumors.com/wp-content/uploads/2014/03/Nikon-1-V3-sample-photo.jpg'
            ]}
            startIndex={1}
          />
        </Div>
      </Div>
    </Layout>
  )
}

export default Index;
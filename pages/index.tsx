import React, { useState } from "react";

import { useTheme } from "@team-devmonster/react-native-theme";
import { Theme } from "App.theme";
import { Button, Div, H1 } from "@team-devmonster/react-native-tags";
import { Layout, A, Header } from "@team-devmonster/react-native-router";
import { ImgViewer } from "@team-devmonster/react-native-img-viewer";
// import { AxiosAPI } from "@local_modules/accio";

export type POST_LOGIN = {
  user_number:string;
  auth_token:string;
}

export type DATA_LOGIN = {
  access_token:string;
  refresh_token:string;
  user:DATA_USER;
}

export type DATA_USER = {
  user_email:string;
  user_name:string;
  user_type:'BASIC'|'ADMIN'|'SUPERADMIN';
  user_number:string;
  result_data_count:number;
  user_phone:string;
  user_id:number;
}

const Index = () => {

  const { color, fontSize, shadow } = useTheme<Theme>();

  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);

  //   // API
  // /** 로그인 */
  // const fetch_POST_LOGIN = AxiosAPI<POST_LOGIN, DATA_LOGIN>({ url: '/login', type: 'post' });
  // const fetch_POST_LOGIN = testAPIFunctions();

  // Functions
  /** 로그인 */
  /* const submit = async() => {
    try{
      const { code, data } = await fetch_POST_LOGIN.fetch({ params: { auth_token: '000005', user_number: '000005' } });
      console.log(data);

      if(code === 0) {
        console.log('login success');
      } else {
        console.error('login fail');
      }
    } catch(error) {
      console.log(error);
    }
  } */

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

          {/* <Button color={color.danger} fill="outline" style={{ ...shadow.base }} onClick={submit}>
            react-native-accio(Test API)
          </Button> */}

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
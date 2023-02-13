# @team-devmonster/react-native-router
## This is under devmonster's react & react-native union project.

This project is part of the `react-module & react-native-module` projects, that integrate `react & react-native` by the devmonster team.<br><br>
`react` => [`@team-devmonster/react-router`](https://www.npmjs.com/package/@team-devmonster/react-router)<br>
General `react-native-modules` load map => [here](https://github.com/team-devmonster/react-native-modules);<br>
General `react-modules` load map => [here](https://github.com/team-devmonster/react-modules);

### Other `react-native` modules

- [o] [`react-native-theme`](https://www.npmjs.com/package/@team-devmonster/react-native-theme)
- [o] [`react-native-tags`](https://www.npmjs.com/package/@team-devmonster/react-native-tags)
- [o] [`react-native-form`](https://www.npmjs.com/package/@team-devmonster/react-native-form)
- [o] [`react-native-skeleton`](https://www.npmjs.com/package/@team-devmonster/react-native-skeleton)
- [o] [`react-native-imgViewer`](https://www.npmjs.com/package/@team-devmonster/react-native-imgViewer)

#### author: devmonster

We are always looking for investment or assistance.
hompage: [https://devmonster.co.kr](https://devmonster.co.kr)<br>
email: [aldegad@devmonster.co.kr](mailto:aldegad@devmonster.co.kr)



## items
It was created for use with a layout sense similar to Html.
- [o] [A] => Just tag [a](https://www.w3schools.com/tags/tag_a.asp).
- [o] [Head] => It is made for compatibility with `react-router`. It doesn't do anything here.
- [o] [Layout] => This has scrollview & safet
- [o] [Header]
- [o] [Footer]
- [o] [FixedLayout] => fixed layout here.
- [o] [useRouter] => It is similar to [nextjs router](https://nextjs.org/docs/api-reference/next/router)
- [o] [Modal] => It is Modals. You can do multiple modal open.
- [o] [Toast] => It is Toast Modals. You can use as function.


## Getting started

Before use it, see these.<br>
- [o] [`react-native-tags`](https://www.npmjs.com/package/@team-devmonster/react-native-tags)
<br>

`$ npm install @team-devmonster/react-native-tags@latest @team-devmonster/react-native-router@latest`


## Examples

Easy. Too Easy.

pages/routerEx/index.tsx
```javascript
import React from "react";
import { useTheme } from "@local_modules/theme";
import { Theme } from "App.theme";
import { Div, Button } from "@local_modules/tags";
import { A, FixedLayout, Header, Layout } from "@local_modules/router";

const RouterEx = () => {

  const { color } = useTheme<Theme>();
  const router = useRouter();

  const [visibleFull, setVisibleFull] = useState(false);
  const [visibleHandle, setVisibleHandle] = useState(false);
  const [visibleCenter, setVisibleCenter] = useState(false);
  const [visibleClear, setVisibleClear] = useState(false);

  return (
    <Layout
      style={{
        backgroundColor: color.backgroundColor,
        flex: 1,
        padding: 18
      }}>
      <Header
        headerLeft={
          <Button onClick={() => router.back()}>
            <ImgPaperAirplane color={color.primary} width={20} height={20}/>
          </Button>
        }
        title="Hello Header"
        headerRight={
          <Button style={{ marginRight: -20 }}>
            setting
          </Button>
      }>
        <P style={{ height: 56, alignItems: 'center', justifyContent: 'center', backgroundColor: color.step100 }}>next line</P>
      </Header>

      <Div style={{ rowGap: 8 }}>
        <A href='/themeEx'>
          <Button color={color.primary}>themeEx</Button>
        </A>
        
        <A href={{
          pathname: '/routerEx/paramEx',
          query: {
            name: 'soohong kim',
            nickname: 'aldegad',
            company: 'devmonster',
            des: 'use A & href',
          }
        }}>
          <Button color={color.danger}>paramEx(A)</Button>
        </A>
        
        <Button
          onClick={() => {
            router.push({
              pathname: '/routerEx/paramEx',
              query: {
                name: 'soohong kim',
                nickname: 'aldegad',
                company: 'devmonster',
                des: 'use useRouter & push'
              }
            })
          }}
          color={color.danger} 
        >paramEx(Router)</Button>
        
        <A href='https://www.google.co.kr'>
          <Button color={color.warning}>google</Button>
        </A>

        <Button 
          onClick={() => {
            setVisibleFull(true);
          }}
          color={color.danger} 
        >open modal fullScreen</Button>

        <Button 
          onClick={() => {
            setVisibleHandle(true);
          }}
          color={color.danger} 
        >open modal handleScreen</Button>

        <Button 
          onClick={() => {
            setVisibleCenter(true);
          }}
          color={color.danger} 
        >open modal center</Button>

        <Button 
          onClick={() => {
            setVisibleClear(true);
          }}
          color={color.danger}
        >open modal clear</Button>

        <Button 
          onClick={() => {
            Toast({ message: '토스트 완성' });
          }}
          color={color.step900}
        >open Toast</Button>
      </Div>

      <Modal 
        visible={visibleFull}
        onRequestClose={() => setVisibleFull(false)}
        type="fullScreen"
      >
        <H1>Modal Fullscreen</H1>
        
        <Button onClick={() => setVisibleFull(false)}>close Modal</Button>
      </Modal>

      <Modal 
        visible={visibleHandle}
        onRequestClose={() => setVisibleHandle(false)}
        type="handleScreen"
      >
        <H1>Modal HandleScreen</H1>
        
        <Button onClick={() => setVisibleHandle(false)}>close Modal</Button>
      </Modal>

      <Modal 
        visible={visibleCenter}
        onRequestClose={() => setVisibleCenter(false)}
        type="center"
      >
        <H1>Modal Center</H1>
        
        <Button onClick={() => setVisibleCenter(false)}>close Modal</Button>
      </Modal>

      <Modal 
        visible={visibleClear}
        onRequestClose={() => setVisibleClear(false)}
        type="clear"
      >
        <H1>Modal Clear</H1>
        
        <Button onClick={() => setVisibleClear(false)}>close Modal</Button>
      </Modal>
    </Layout>
  )
}

export default RouterEx;
```

pages/routerEx/paramEx.tsx
```javascript
import React from "react";
import { useTheme } from "@team-devmonster/react-theme";
import { Theme } from "./App.theme";
import { Div, Button, P } from "@team-devmonster/react-native-tags";
import { A, useRouter, RouterProps } from "@team-devmonster/react-native-router";
import { RootStackParamList } from "App.navigation.type";

const ParamEx = () => {
  const { color } = useTheme<Theme>();
  const router = useRouter<RouterProps<RootStackParamList, 'routerEx/paramEx'>>();
  const { query } = router;

  return (
    <Layout
      style={{
        backgroundColor: color.white,
        padding: 18,
        flex: 1
      }}>
      <Header
        style={{
          backgroundColor: color.primary,
          color: 'red'
        }}
        title="Hello Params"
      />
      <P style={{ padding: 8, backgroundColor: color.step300 }}>
        { query.name } / { query.nickname } / { query.company }
      </P>
      <A back={true}>
        <Button color={color.primary}>Back</Button>
      </A>
      <A href="/tagsEx" replace={true}>
        <Button color={color.primary}>replace this page</Button>
      </A>
      <A href="/index" reset={true}>
        <Button color={color.primary}>reset to home</Button>
      </A>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <P>Scrollllll.....</P>
      <FixedLayout>
        <Div style={{ top: 100, left: 20 }}>HEllo</Div>
      </FixedLayout>
      <Footer style={{
        backgroundColor: color.white
      }}>
        <Div style={{
          flexDirection: 'row',
          backgroundColor: 'red'
        }}>
          <Button color={color.primary} style={{ flex: 1 }}>Tab1</Button>
          <Button color={color.primary} style={{ flex: 1 }}>Tab2</Button>
          <Button color={color.primary} style={{ flex: 1 }}>Tab3</Button>
          <Button color={color.primary} style={{ flex: 1 }}>Tab4</Button>
        </Div>
      </Footer>
    </Layout>
  )
}

export default ParamEx;
```

App.navigation.tsx
```javascript
import React from "react";
import { LogBox } from "react-native";

import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
// LogBox.ignoreAllLogs(); //Ignore all log notifications

import Index from "@pages/index";
import ThemeEx from "@pages/themeEx";
import TagsEx from "@pages/tagsEx";

import { RootStackParamList } from "App.navigation.type";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useTheme } from "@local_modules/theme";
import { Theme } from "App.theme";
import RouterEx from "@pages/routerEx";
import ParamEx from "@pages/routerEx/paramEx";
import FormEx from "@pages/formEx";
import SwiperEx from "@pages/swiperEx";


export const AppRouterProvider = ({children}: {children:React.ReactNode}) => {
  const { color, colorScheme } = useTheme<Theme>();
  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;
  // SafeAreaProvider & NavigationContainer are needed to out of RouterProvider
  // style & theme is just option. do what you want.
  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: color.white }}>
      <NavigationContainer theme={{
        ...theme,
        colors: {
          ...theme.colors
        }
      }}>
        <RouterProvider>
          {children}
        </RouterProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

const RootStack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {

  const { color, colorScheme } = useTheme<Theme>();
  
  return (
    <RootStack.Navigator initialRouteName="index">
      <RootStack.Screen name="index" component={Index}/>
      <RootStack.Screen name="themeEx" component={ThemeEx}/>
      <RootStack.Screen name="tagsEx" component={TagsEx}/>
      <RootStack.Screen name="routerEx" component={RouterEx}/>
      <RootStack.Screen name="routerEx/paramEx" component={ParamEx}/>
      <RootStack.Screen name="formEx" component={FormEx}/>
      <RootStack.Screen name="swiperEx" component={SwiperEx}/>
    </RootStack.Navigator>
  )
}

export default Navigation;
```

App.navigation.type.tsx
```javascript
/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  'index':undefined,
  'themeEx':undefined,
  'tagsEx':undefined,
  'routerEx':undefined,
  'routerEx/paramEx':{ name:string, nickname:string, company:string },
  'formEx':undefined,
  'swiperEx':undefined
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;
export type Query<RouteName extends keyof RootStackParamList> = RootStackParamList[RouteName];
```
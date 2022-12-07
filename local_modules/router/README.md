# @team-devmonster/react-native-router

> :warning: **It's under development**<br>
> :warning: **It's using [@react-navigation/native](https://reactnavigation.org/)**
> :warning: **It's using [@team-devmonster/react-native-tags](https://www.npmjs.com/package/@team-devmonster/react-native-tags)**

## This is under devmonster's react & react-native union project.

This project is part of the `react-module & react-native-module` projects, that integrate `react & react-native` by the devmonster team.<br><br>
`react` => [`@team-devmonster/react-router`](https://www.npmjs.com/package/@team-devmonster/react-router)<br>
General `react-native-modules` load map => [here](https://github.com/team-devmonster/react-native-modules);<br>
General `react-modules` load map => [here](https://github.com/team-devmonster/react-modules);

### Other `react-native` modules

- [o] [`react-native-theme`](https://www.npmjs.com/package/@team-devmonster/react-native-theme)
- [o] [`react-native-tags`](https://www.npmjs.com/package/@team-devmonster/react-native-tags)
- [o] [`react-native-form`](https://www.npmjs.com/package/@team-devmonster/react-native-form)

#### author: devmonster

We are always looking for investment or assistance.
hompage: [https://devmonster.co.kr](https://devmonster.co.kr)<br>
email: [aldegad@devmonster.co.kr](mailto:aldegad@devmonster.co.kr)



## items

- [o] [A] => Just tag `a`
- [o] [Head] => It is made for compatibility with `react-router`. It doesn't do anything here.
- [o] [Layout]
- [o] [Header]
- [o] [Footer]
- [o] [FixedLayout]


## Getting started

`$ npm install @team-devmonster/react-native-router@latest`


## Examples

Easy. Too Easy.

```javascript
import React from "react";
import { useTheme } from '@team-devmonster/react-native-theme';
import { Theme } from './App.theme';
import { Div, Button } from "@team-devmonster/react-native-tags";
import { A } from "@team-devmonster/react-native-router";

const RouterEx = () => {

  const { color } = useTheme<Theme>();

  return (
    <Div
      style={{
        backgroundColor: color.backgroundColor,
        flex: 1,
        padding: 18
      }}>
      <A href='/themeEx'>
        <Button color={color.primary} style={{ marginBottom: 8 }}>themeEx</Button>
      </A>
      <A href={{
        pathname: '/routerEx/paramEx',
        query: {
          name: 'soohong kim',
          nickname: 'aldegad',
          company: 'devmonster'
        }
      }}>
        <Button color={color.danger} style={{ marginBottom: 8 }}>paramEx</Button>
      </A>
      <A href='https://www.google.co.kr'>
        <Button color={color.warning}>google</Button>
      </A>
    </Div>
  )
}

export default RouterEx;
```

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
      <A href="/index" reset={true}>
        <Button color={color.primary}>reset to home</Button>
      </A>
    </Div>
  )
}

export default ParamEx;
```
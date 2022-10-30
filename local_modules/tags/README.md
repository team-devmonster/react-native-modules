# @team-devmonster/react-native-theme

This is devmonster's react-native module for make app easily. This is compatible with devmonster's react module.
[@team-devmonster/react-theme](https://www.npmjs.com/package/@team-devmonster/react-theme)

`react-native-tags` was created to use tags similar to `react` in `react-native` environment.
It can be used in the same way as [react-tags](https://www.npmjs.com/package/@team-devmonster/react-tags) produced by [@team-devmonster](mailto:aldegad@devmonster.co.kr).
It is more useful when used with [react-native-theme](https://github.com/team-devmonster/react-native-modules/tree/master/local_modules/theme).

author: devmonster 
[aldegad@devmonster.co.kr](mailto:aldegad@devmonster.co.kr)



### Road Map

General [react-native-modules] load map => [here](https://github.com/team-devmonster/react-native-modules);

- [x] [div]
- [x] [button]
- [ ] input
- [ ] img
- [ ] checkbox
- [ ] label
- [ ] errorText
- [ ] modal
- [ ] select
- [ ] option

## Getting started

`$ npm install @team-devmonster/react-native-tags@latest`


## Usage


### 1. Set Provider

```javascript
// App.theme.tsx => You can use any file name :)
import { TagProvider, TagStyle } from '@team-devmonster/react-native-tags';

export const AppTagProvider = ({children}: {children:React.ReactNode}) => {
  const div:TagStyle = {
    color: color.black,
    fontSize: fontSize.base
  }
  const button:TagStyle = {
    cursor: 'pointer',
    position: 'relative',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: fontSize.base,
    minHeight: 42,
    borderRadius: 5
  }
  return (
    <TagProvider tagStyle={{ div, button }}>
      {children}
    </TagProvider>
  )
}
```


### 2. Set Provider

```javascript
import { AppTagProvider } from './App.theme';

export default function App() {

  return (
    <AppTagProvider>
      <Component></Component>
    </AppTagProvider>
  )
}
```

#### 2-1. If you use with `react-native-theme`

```javascript
import { AppThemeProvider, AppTagProvider } from './App.theme';

export default function App() {

  return (
    <AppThemeProvider>
      <AppTagProvider>
        <Component></Component>
      </AppTagProvider>
    </AppThemeProvider>
  )
}
```


### 3. Use Tags

Use your theme, whatever you want!

```javascript
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from '@team-devmonster/react-native-theme';

import { Theme } from './App.theme';

const TagsEx = () => {

  // if you use with `react-native-theme`
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
        <Button 
          color={color.primary} 
          onPress={() => Alert.alert('pressed')}>
          {`2. button => <Button></Button>`}
        </Button>
      </Div>
    </Div>
  )
}

export default TagsEx;
```
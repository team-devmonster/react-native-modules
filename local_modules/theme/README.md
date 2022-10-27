# @team-devmonster/react-native-theme
This is devmonster's react-native module for make app easily. This is compatible with devmonster's react module.

## Getting started

`$ npm install @team-devmonster/react-native-theme`


## Usage

### 1. Set provider

```javascript

export default function App() {
  return (
    <ThemeProvider color={color} theme={theme}>
      <Component></Component>
    </ThemeProvider>
  )
}
```
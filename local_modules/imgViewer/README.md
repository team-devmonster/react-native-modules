# @team-devmonster/react-native-img-viewer

#### author: devmonster 

We are always looking for investment or assistance.<br>
hompage: [https://devmonster.co.kr](https://devmonster.co.kr)<br>
email: [aldegad@devmonster.co.kr](mailto:aldegad@devmonster.co.kr)

## items
- [o] [ImgViewer]

## Getting started
install prev libraries<br>
`$ npm install react-native-safe-area-context react-native-reanimated react-native-gesture-handler`<br>

install @team-devmonster/react-native-img-viewer<br>
`$ npm install @team-devmonster/react-native-tags@latest @team-devmonster/react-native-img-viewer@latest`


## Examples

<img src="https://github.com/team-devmonster/react-native-modules/blob/master/local_modules/imgViewer/screenshots/imgViewer01.png" width="120">

Easy. Too Easy.

### usage

```javascript
// App.theme.tsx => You can use any file name :)
import React, { useState } from "react";
import { ImgViewer } from '@team-devmonster/react-native-img-viewer';

export const AnyComponent = () => {

  const [visible, setVisible] = useState(false);
  
  return (
    <ImgViewer
      visible={visible}
      onRequestClose={() => {
        setVisible(false);
      }}
      src={'https://anything'}
      closeText="close"
      closeButtonStyle={{ backgroundColor: '#FF6420' }}
    />
  )
}
```

### Other `react-native` modules

- [o] [`react-native-theme`](https://www.npmjs.com/package/@team-devmonster/react-native-theme)
- [o] [`react-native-tags`](https://www.npmjs.com/package/@team-devmonster/react-native-tags)
- [o] [`react-native-router`](https://www.npmjs.com/package/@team-devmonster/react-native-router)
- [o] [`react-native-form`](https://www.npmjs.com/package/@team-devmonster/react-native-form)
- [o] [`react-native-skeleton`](https://www.npmjs.com/package/@team-devmonster/react-native-skeleton)
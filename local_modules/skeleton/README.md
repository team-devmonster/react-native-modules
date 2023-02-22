# @team-devmonster/react-native-skeleton
## This is under devmonster's react & react-native union project.

This project is part of the `react-module`&`react-native-module` projects, that integrate `react`&`react-native` by the devmonster team.<br><br>
// `react` => [`@team-devmonster/react-skeleton`](https://www.npmjs.com/package/@team-devmonster/react-skeleton)<br>
General `react-native-modules` load map => [here](https://github.com/team-devmonster/react-native-modules);<br>
General `react-modules` load map => [here](https://github.com/team-devmonster/react-modules);

### Other `react-native` modules

- [o] [`react-native-theme`](https://www.npmjs.com/package/@team-devmonster/react-native-theme)
- [o] [`react-native-tags`](https://www.npmjs.com/package/@team-devmonster/react-native-tags)
- [o] [`react-native-router`](https://www.npmjs.com/package/@team-devmonster/react-native-router)
- [o] [`react-native-form`](https://www.npmjs.com/package/@team-devmonster/react-native-form)

#### author: devmonster 

We are always looking for investment or assistance.<br>
hompage: [https://devmonster.co.kr](https://devmonster.co.kr)<br>
email: [aldegad@devmonster.co.kr](mailto:aldegad@devmonster.co.kr)

## items
- [o] [Skeleton]
- [o] [SkeletonItem]


## Getting started
install prev libraries<br>
`$ npm install @react-native-masked-view/masked-view expo-linear-gradient react-native-reanimated`<br>

install @team-devmonster/react-native-skeleton<br>
`$ npm install @team-devmonster/react-native-skeleton@latest`


## Examples

Easy. Too Easy.

### usage

```javascript
// App.theme.tsx => You can use any file name :)
import { Skeleton, SkeletonItem } from '@team-devmonster/react-native-skeleton';

export const AnyComponent = () => {

  // use width skeleton item
  return (
    <Skeleton style={{ flexDirection: 'row' }}>
      <SkeletonItem style={{ width: 50, height: 50, borderRadius: 25 }}/>
      <SkeletonItem style={{ width: 50, height: 50, borderRadius: 25 }}/>
    </Skeleton>
  )

  // or not
  return (
    <Skeleton style={{ borderRadius: 10, aspectRatio: 0.8, width: width/2*0.85 }}/>
  )
}
```
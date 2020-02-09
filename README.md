# react-native-x-carousel
> a cross-platform (`iOS`, `Android`, `Web`) react native carousel component
  

[![npm](https://img.shields.io/npm/v/react-native-x-carousel.svg?style=flat-square)](https://www.npmjs.com/package/react-native-x-carousel) ![](https://img.shields.io/travis/yuanfux/react-native-x-carousel/master.svg?style=flat-square) ![GitHub issues](https://img.shields.io/github/issues/yuanfux/react-native-x-carousel.svg?style=flat-square) ![NPM](https://img.shields.io/npm/l/react-native-hsv-color-picker.svg?style=flat-square) ![](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square) ![](https://img.shields.io/maintenance/yes/2020.svg?style=flat-square)



<p align="center">

<img  width="400"  src="https://user-images.githubusercontent.com/6414178/74084331-090d0c80-4aa9-11ea-90d6-c7b74e86b75d.gif">

</p>



## Preview
[View Live Demo](https://snack.expo.io/@fuyuanx/react-native-x-carousel)

`react-native-x-carousel` is a React Native component for building a cross-platform carousel.

Highlighted Features:

1. **Cross Platform** - uniform behaviors among `iOS`, `Android` and `Web`
2. **Loop Cycle** - support head-to-tail / tail-to-head loop cycle
4. **Auto Play** - auto play with smooth transition
5. **Fully Customizable** - customizable carousel content & pagination

## Install
```bash
$ npm install react-native-x-carousel --save
```

## Usage
> a minimally-configured carousel
```js
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Carousel, { Pagination } from 'react-native-x-carousel';

const DATA = [
  { text: '#1' },
  { text: '#2' },
  { text: '#3' },
];

const App = () => {
  const renderItem = data => (
    <View key={data.text} style={styles.item}>
      <Text>{data.text}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <Carousel
        pagination={Pagination}
        renderItem={renderItem}
        data={DATA}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dbf3fa',
  },
});

export default App;
```

## Props
#### Basic Props
| Prop | Type | Default | Description |
|--|--|--| -- |
| `data` | any[]  | `[]` |  the item data  |
| `renderItem` | (data: any[], index: number) => void  | () => {} | function for rendering each item  |
| `loop` | boolean  | `false` | determine whether the loop mode is enabled or not |
| `autoplay` | boolean  | `false` | determine whether the auto play mode is enabled or not |
| `autoplayInterval` | number  | `2000` | delay between item transitions in `milliseconds`  |
| `pagination` | () => JSX.Element &#124; { render: () => JSX.Element } | `null` | the pagination component  |

#### Callback Props
| Prop | Callback Params | Description |
|--|--| -- |
| `onPage` | {<br>&nbsp;&nbsp;&nbsp;&nbsp;prev: number,<br>&nbsp;&nbsp;&nbsp;&nbsp;current: number<br>} | called when page number changes |

## Pagination
#### Default
> 2 pagination components are provided as default
```js
import Carousel, {
  Pagination, // dark-colored pagination component
  PaginationLight // light-colored pagination component
} from 'react-native-x-carousel';
// ...
const App = () => (
  <Carousel
    // ...
    pagination={PaginationLight}
  />
);
```

#### Customize
> Your customized pagination component will have access to the following props

| Prop | Type | Default | Description |
|--|--|--| -- |
| `total` | number  | `0` |  the total number of pages  |
| `currentPage` | number  | `1` |  the current page number  |

## Dev
> The `demo` folder contains a standalone Expo project, which can be used for dev purpose.

> react-native - 0.61 <br  />
> react-native-web - 0.11.7 <br />
> react - 16.9

1. Start Expo
	```bash
	$ npm install

	$ npm start
	```

2. Run on `simulator`
	- type the following command in the `Terminal` after the project is booted up
	- `w` for `web` developement
	- `a` for `android` simulator
	- `i` for `iOS` simulator

3. Run on `device`
	- require the installation of corresponding [`iOS client`](https://itunes.apple.com/app/apple-store/id982107779) or [`android client`](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www) on the device

	- scan the QR code from `Terminal` using the device

4. More on [`Expo Guide`](https://docs.expo.io/versions/v36.0.0/)

## Related
- scaffolded by [**react-native-component-cli**](https://github.com/yuanfux/react-native-component-cli) 

## License
MIT

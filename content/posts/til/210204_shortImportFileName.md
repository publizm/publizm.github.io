---
title: import 되는 경로를 깔끔하게 하기 위한 삽질기
date: '2021-02-04'
template: 'post'
draft: false
slug: '/posts/til/02'
category: 'TIL'
tags:
  - 'TIL'
  - 'Import'
  - 'babel-plugin-module-resolver'
description: 'babel-plugin-module-resolver 사용법'
---

<span class="notice">
  <em>삽질기 기록!! 추후 계속 디벨롭될 예정이며, 피드백은 언제나 환영입니다.</em>
</span>

## 어떤 이유로 진행하게 되었는지?

이번에 신규 프로젝트로 react-native를 도입하여 진행하게 되었는데 react-native 프로젝트 세팅을 하며 "내가 기존 react로 만들어진 웹 서비스를 작업하며 불편함을 느낀 것은 무엇일까?"라는 고민을 하게되었고, 그 중 하나가 뎁스가 깊어지면 깊어질수록 복잡해지고 지저분해지는 import 방식이여서 어떻게하면 뎁스에 연연하지 않고 깔끔하게 할 수 있을까? 생각했습니다.

그리하여 생각한 것이 바로 모듈을 활용하여 변수화 시키자! 였고 많은 써치 끝에 사람들이 많이 사용중인 'babel-plugin-module-resolver'를 활용하기로 했다.

![/images/til/short_image_1.png](/images/til/short_image_1.png 'import 되는 경로를 깔끔하게 하기 위한 삽질기')

[babel-plugin-module-resolver](https://www.npmjs.com/package/babel-plugin-module-resolver)

## 진행하기

설치부터 시작해보자!

```bash
$ npm install --save-dev babel-plugin-module-resolver
```

또는

```bash
$ yarn add --dev babel-plugin-module-resolver
```

development 환경에서만 필요하므로 devDependency로 설치해주었다.

테스트 하기 앞서 다음과 같이 디렉토리 구조를 작성했다.

매칭 잘 작동하는지 확인하기 위해 디렉토리 구조에 뎁스를 추가했다.

```bash
src
  ㄴ component
    ㄴ depth1
      ㄴ depth2
        ㄴ depth3
          ㄴ Component.tsx
  ㄴ otherComponent
    ㄴ OtherComponent.tsx
assets
	ㄴ images
  	ㄴ depth1
  		ㄴ sample-image1.png
    ㄴ sample-image2.png
App.tsx
```

.babelrc 또는 babel.config.js 파일에 다음과 같이 plugins를 추가해준다.

```javascript
// .babelrc or babel.config.js
module.exports = {
  ...
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '변수명': '경로'
        },
      },
    ],
  ],
}
```

이렇게 설정을 해주면 된다.

필자는 다음과 같이 설정을 해주었다.

```javascript
// .babelrc or babel.config.js
module.exports = {
  ...
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@components': './src/components/',
          '@otherComponent': './src/otherComponent/',
          '@assets': './assets/',
        },
      },
    ],
  ],
}
```

만약 typescript 를 사용중이라면 tsconfig.json에도 다음과 같이 작성해주자.

```json
// tsconfig.json
{
  ...
  "complierOptions": {
    ...
    "baseUrl": ".",
    "paths": {
      "@components/*": [
        "./src/components/*"
      ],
      "@otherComponent/*": [
        "./src/otherComponent/*"
      ],
      "@assets/*": [
        "./assets/*"
      ],
  }
}
```

이제 테스트를 한번해보자!

테스트 방식은 다음과 같다.

1. App.tsx에서 Component.tsx를 불러온다.
2. Component.tsx 내부에는 OtherComponent를 사용한다.
3. OtherComponent에서는 assets 폴더 내부에 있는 image들을 사용한다.
4. App.tsx에서 Component.tsx를 불러온다.

```tsx
// App.tsx
import React from 'react';
import Component from '@components/depth1/depth2/depth3/Component';

const App = () => <Component />;

export default App;
```

![/images/til/short_image_2.png](/images/til/short_image_2.png 'import 되는 경로를 깔끔하게 하기 위한 삽질기')

import된 코드에 마우스 커서를 올리면 위와 같이 잘 불러오는 것을 알 수 있다.

**결과화면**

![/images/til/short_image_3.png](/images/til/short_image_3.png 'import 되는 경로를 깔끔하게 하기 위한 삽질기')

2. Component.tsx 내부에는 OtherComponent를 사용한다.

```tsx
// Component.tsx
import React from 'react';
import { Text, View } from 'react-native';
import OtherComponent from '@components/otherComponent/OhterComponent';

const Component = () => {
	return (
		<View>
			<Text>hello world</Text>
			<Text>This is Component</Text>
			<OtherComponent />
		</View>
	);
};

export default Component;
```

![/images/til/short_image_4.png](/images/til/short_image_4.png 'import 되는 경로를 깔끔하게 하기 위한 삽질기')

VSCode는 친절하게도 Auto import를 제공해준다. 참 똑똑한 친구인 것 같다.

**결과화면**

![/images/til/short_image_5.png](/images/til/short_image_5.png 'import 되는 경로를 깔끔하게 하기 위한 삽질기')

만약 변수설정을 안해주었다면 다음과 같이 불러와졌을 것이다.

```tsx
// Bad
import OtherComponent from '../../../../otherComponent/OhterComponent';

// Good
import OtherComponent from '@otherComponent/OtherComponent';
```

이렇게 @otherComponent를 활용하여 폴더내로 접근이 가능해진다.

아주 깔끔해졌다!

3. OtherComponent에서는 assets 폴더 내부에 있는 image들을 사용한다.

```tsx
import React from 'react';
import { StyleSheet, Text, ScrollView, Image } from 'react-native';
import sampleImage1 from '@assets/images/depth1/sample-image1.png';
import sampleImage2 from '@assets/images/sample-image2.png';

const OtherComponent = () => {
	return (
		<ScrollView>
			<Text>This is OtherComponent</Text>
			<Image source={sampleImage1} style={{ width: '100%' }} />
			<Image source={sampleImage2} style={{ width: '100%' }} />
		</ScrollView>
	);
};

export default OtherComponent;
```

필자는 해당 프로젝트에 typesciprt를 사용하고 있어 다음과 같이 경고가 나타난다.

![/images/til/short_image_6.png](/images/til/short_image_6.png 'import 되는 경로를 깔끔하게 하기 위한 삽질기')

"@assets/images/depth1/sample-image1.png"라는 모듈을 찾을 수 없다라는 말인데 이는 typescript 에러 메시지이므로 d.ts를 만들어 png파일을 모듈로 인식하게 해주어 해결했다.

```typescript
// file.d.ts
declare module '*.png';
declare module '*.jpg';
```

혹시몰라 jpg 확장자까지 같이 해주었다!

비로서 눈이 편안하게 코딩 할 수 있게 되었다!!

시간이 된다면 현재 서비스 중인 프로젝트에도 적용해야겠다.

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

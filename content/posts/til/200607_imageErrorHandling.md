---
title: TIL - nextjs를 활용한 서버사이드 렌더링 프로젝트에서 img 에러 핸들링하기
date: '2020-06-07'
template: 'post'
draft: false
slug: '/posts/til/01'
category: 'TIL'
tags:
  - 'TIL'
  - 'Img tag'
  - 'Img error fallback'
description: '카카오맵 API 활용해보기'
---

<span class="notice">
  <em>공부삼아 작업한 것을 기록해놓는 공간입니다. 추후 계속 디벨롭될 예정이며, 피드백은 언제나 환영입니다.</em>
</span>

## image 공통 컴포넌트 제작 이유

기존 CRA를 활용하여 클라이언트 사이드 렌더링시에 이미지 꺠짐 처리를 image 태그에 내장된 onError 이벤트를 활용하여 onError 이벤트를 발생시킨 event target에 src를 변경해주었음.

**기존 사용방법**

```jsx
export default function App() {
  const onHandledError = e => {
    console.log(e); // e가 잘 잡힌다.
    e.target.src = 'fallback 이미지';
  };
  return (
    <div className="App">
      <img
        src="없는경로로 연결된 이미지.jpg"
        onError={onHandledError}
        alt="test"
      />
    </div>
  );
}
```

<br />

하지만 next를 활용한 서버사이드 렌더링시 onError 이벤트 핸들러가 작동이 안되는 현상이 발생했다. 예상에는 Dom이 그려지기전에 이미지를 먼저 불러오는 과정에서 이미 에러가 발생하고 event target이 누군지 잃게 되는 것 같았다. 그래서 다음과 같이 작업하여 이러한 문제를 해결했다.

<br />

**이미지 공통 컴포넌트**

```tsx
import React, { useState, useEffect } from 'react';

const Image = ({ src = '', alt = '' }) => {
  const noImage = 'fallback 이미지';
  const [imageSrc, setImageSrc] = useState('');
  const onError = () => {
    console.log('error');
    setImageSrc(noImage);
  };

  useEffect(() => {
    setImageSrc(src);
  }, []);

  return <img src={imageSrc} onError={onError} alt={alt} />;
};

export default Image;
```

**활용 컴포넌트**

```tsx
<Image src="없는경로로 연결된 이미지.jpg" alt="test image" />
```

공통 컴포넌트로 따로 빼서 state를 만들어 Dom이 렌더링이 된 후 props로 전달받은 url을 연결해주어 dom이 렌더링 된 후 url이 연결되게끔 하여 onError 이벤트의 타켓을 작동하게 만들었다.

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

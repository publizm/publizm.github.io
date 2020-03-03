---
title: React 컴포넌트를 꾸미는 다양한 방식
date: "2020-01-24"
template: "post"
draft: false
slug: "/posts/react/styling_component"
category: "React"
tags:
  - "css module/scss module"
  - "styled-component"
description: "React 컴포넌트를 꾸미는 다양한 방식"
---
<span class="notice">
  <em>TIL 내용이므로 잘못된 내용은 댓글 부탁드립니다</em>
</span>

<div id="toc">

**:link:  Table Of Contents**

- [1. CSS/SASS 파일을 따로 두어 작성하는 기존 방식](#1-csssass-파일을-따로-두어-작성하는-기존-방식)
  - [1-1. 네이밍 규칙을 활용](#1-1-네이밍-규칙을-활용)
  - [1-2. CSS Selector를 활용](#1-2-css-selector를-활용)
- [2. CSS/SASS Module](#2-csssass-module)
- [3. classnames 활용](#3-classnames-활용)
- [4. styled-components](#4-styled-components)
  - [4-1. 엘리먼트 만들기](#4-1-엘리먼트-만들기)
  - [4-2. 조건부 스타일링](#4-2-조건부-스타일링)

</div>

React와는 다르게 VueJS나 AngularJS에는 컴포넌트간의 CSS 오염을 방지할 수 있지만, React에서는 어려움이 있다.

그래서 React 컴포넌트를 꾸미는 법에 있어서는 오염을 어떻게 극복할 것인가에 초점을 맞춰서 공부를 해보았다.

리액트 컴포넌트를 디자인하는데 있어 여러가지의 방법이 있다.

## React 컴포넌트를 디자인하는 방식

<br>

### 1. CSS/SASS 파일을 따로 두어 작성하는 기존 방식
프로젝트의 규모가 작다면 다른 복잡한 방식을 하는 것보다 이 방식으로하는 것이 효율적일 수도 있다.

그렇다면 CSS/SASS 파일을 따로 두어 작성하는 방식은 어떻게 오염을 최소화 시킬 수 있을까?

<br>

#### 1-1. 네이밍 규칙을 활용
create-react-app으로 생성한 프로젝트의 App.js와 App.css를 확인해보면 다음과 같다.

<b>App.js</b>

``` jsx
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
```

<b>App.css</b>

``` css
.App {
  text-align: center;
}

.App-logo {
  animation: App-logo-spin infinite 20s linear;
  height: 40vmin;
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App-link {
  color: #61dafb;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

위의 css 클래스명 작성방식을 확인하면 중복되는 클래스명을 방지하기위해 네이밍에 신경을 쓴 것을 확인할 수 있다. 클래스명이 **컴포넌트명-클래스**로 네이밍하여 컴포넌트단위로 class명을 분리 시킬 수 있다.

마치 BEM 방법론과 유사하다

> **BEM(Block Element Modifier) 방법론**<br>
> *- 또는 _*를 사용하여 Block과 Element 그리고 Modifer를 구분하여 클래스명을 스타일링하는 방법이다.<br>
> <br>
> 다음과 같은 모양을 띈다.<br>
> form(블록)__submit(요소)--disabled(상태 또는 동작)<br>
> 자세한 내용은 [BEM Naming](http://getbem.com/naming/)에서 확인

<hr />

#### 1-2. CSS Selector를 활용

App.css를 다음과 같이 CSS Selector를 활용하여 작성할 수 있다.

<b>App.js</b>

``` jsx
import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <img src={logo} className="logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
```

<b>App.css</b>

``` css
.App {
  text-align: center;
}

.App .logo {
  animation: App-logo-spin infinite 20s linear;
  height: 40vmin;
}

.App header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App a {
  color: #61dafb;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

<hr />

#### 1-3. SASS 사용
SASS는 CSS pre-processor(CSS 전처리기)로서 복잡한 작업을 쉽게 할 수 있게 해주고, 코드의 재사용성을 높이며, 코드의 가독성을 높여주어 유지보수를 좀 더 효율적으로 할 수 있게 해준다.

SASS는 두가지 확장자(.sass/.scss)를 지원하는데 두가지 모두 SASS라 통칭할 수 있으나, 문법적으로 좀 다르다.

이전에 create-react-app으로 만든 프로젝트에는 SASS 로더가 따로 내장되어 있지 않아 SASS 로더를 넣기위해 module을 eject하여 별도로 추가해주었어야 됬는데 현재는 로더가 포함되어 있어 바로 사용할 수 있다.

하지만 node 환경에서 libsass를 사용할 수 있도록 해주는 node-sass는 별도로 설치해줘야한다. 이 라이브러리는 SASS를 CSS로 트랜스파일링을 해준다.

``` bash
npm i -g node-sass
```

설치가 완료되면 위의 App.css를 App.scss파일로 확장자를 바꾼 후 다음과 같이 수정해보자

``` scss
.App { // 부모요소
  text-align: center;

  .logo {
    height: 40vmin;
    pointer-events: none;
  }

  @media (prefers-reduced-motion: no-preference) {
    .logo {
      animation: logo-spin infinite 20s linear;
    }
  }

  .header {
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
  }

  .link {
    color: #61dafb;
  }

  @keyframes logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
}
```

이렇게 작성하면 App안의 요소들을 블록화시켜 시각적으로도 코드를 구분하기가 수월해진다.

<hr class="sub" />

### 2. CSS/SASS Module
다음은 모듈을 활용하는 방법이다.<br>
CSS/SASS 모듈을 클래스를 불러와서 사용할 때 [파일이름]_[클래스이름]__[해쉬값] 형태로 클래스네임을 자동으로 고유한 값을 만들어 주어 컴포넌트 스타일 오염현상을 방지해주는 기술이다.

주로 레거시 프로젝트에 리액트를 도입할 때 충돌 방지를 위해 또는 CSS 클래스 네이밍 규칙을 만들기 귀찮을때 사용한다

파일명은 [파일이름].module.css 이런식으로 파일을 저장해야한다.

간단한 컴포넌트를 만들어 예제를 만들어보자.

<b>Button.module.css</b>

``` css
.button {
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  font-size: 20px;
}

.loading {
  border: 2px solid grey;
  color: grey;
}
```

<b>Button.jsx</b>

``` jsx
import React from 'react'
import styles from './Button.module.css';

const Button = () => (
  <button>
    버튼
  </button>
)
```

먼저 기존 css 파일을 import 받을때와 모습이 다른걸 알 수 있다.

``` jsx
// css를 import하는 방법
import "./App.css";

// css module을 import하는 방법
import styles from './Button.module.css';
```

import를 받는 변수가 있다는 것은 무엇을 리턴해준다는 것인데 무엇인지 한번 살펴보자.

``` javascript
console.log(styles);
```

![module_css_log](/images/react/module_css_log.png "module_css_log")

바로 module.css 파일에서 선언한 클래스명([파일이름]_[클래스이름]__[해쉬값])이 객체로 담겨있는 것을 확인할 수 있다.

우리는 클래스명에 접근할때 styles.프로퍼티키 값으로 접근하면 될 것 같다.

``` jsx
import React from 'react'
import styles from './Button.module.css';

const Button = () => (
  <button className={styles.button}>
    버튼
  </button>
)
```

className에는 객체의 프로퍼티 키를 불러와야되므로 중괄호를 감싸서 불러와줘야한다.

아마 이런 모습일 것이다.

``` jsx
<button className={`Button_button__3D6GH`}>
  버튼
</button>
```

**출력화면**

![module_css_view](/images/react/module_css_view.png "module_css_view")

조건부로 클래스명을 렌더링해야할 경우를 예시로 들어보자.

일단 조건으로는 loading 중일떄는 버튼이 회색이였다가, loading이 끈났을때는 색깔이 바뀌는 조건을 걸어보자.

``` jsx
import React, { useState, useEffect } from 'react';
import styles from './Button.module.css';

const Button = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    // 여러 클래스명 사용시
    <button
      className={`${styles.button} ${styles.loading}`}>
      버튼
    </button>

    // 조건부 클래스명 사용시
    <button
      className={loading ? `${styles.button} ${styles.loading}` : styles.button}>
      버튼
    </button>
  )
}
```

일단 loading에 필요한 상태를 만들어주고, 페이지가 렌더링되는 순간 useEffect를 내부에 setTime 함수를 넣어 2초뒤에 loading 값을 false로 바꾸어 주었다.

그리고 버튼에는 삼항식을 넣어 주었다. 조건에 맞게 렌더링하는데 있어 더블클래스의 경우 중간에 html 문법상 띄어쓰기 공백이 있어야되므로 템플릿 문자열로 감싸주어 띄어쓰기를 만들었고 객체의 프로퍼티 키이기 때문에 문자열 인터폴레이션(${...})으로 감싸주었다.

**출력화면**

![module_css_loading](/images/react/module_css_loading.gif "module_css_loading")

하지만 클래스를 넣는 부분에서 가독성이 매우 떨어지고 지저분해 보인다.

<hr class="sub" />

### 3. classnames 활용

여러 클래스를 써야될 경우 유용한 classNames 라이브러리를 설치해보자.

CSS Moudle을 사용할때 이 라이브러리를 사용하면 좀 더 효율적이다.

``` bash
npm i classnames
```

classnames의 사용법은 다음과 같다.

``` javascript
import classNames from 'classnames';

classNames('one', 'two'); // 'one two'
classNames('one', { two: true }); // 'one two'
classNames('one', { two: false }); // 'one'
classNames('one', ['two', 'three']); // 'one two three'

console.log(classNames(styles.button, styles.loading));
// Button_button__3D6GH Button_loading__1geB1

const otherClass = 'otherClass';
classNames('one', otherClass, { myCondition: true }); //'one hello myCondition'
```

import로 classNames를 받는게 이게 무엇인지 console.log로 출력해보자

``` javascript
console.log(classNames);
```

**출력화면**

![module_css_classnames](/images/react/module_css_classnames.png "module_css_classnames")

classnames 라이브러리는 함수를 보내주는데 이 함수에 여러가지 종류의 파라미터를 조합하여 CSS 클래스를 설정할 수 있게되므로, 컴포넌트에서 조건부로 클래스를 설정할때 굉장히 편하다.

예시로 loading 이라는 prop값에 따라 다른 스타일을 줄 수 있다.

``` jsx
import React from 'react';
import classNames from 'classnames';

const Button = ({ loading }) => {
  // loading prop가 true/false 값으로 전달된다는 가정하에 아래와 같이 작성할 수 있다.
  return (
    <button
      className={classNames('button', { loading: loading })}
    >
      버튼
    </button>
  )
}
```

위와 같이 작성할 수 있다.

``` jsx
<button className={classNames('button', { loading: loading })}
>
```

<b>:</b> 기준으로 왼쪽의 loading은 우변의 값이 true값 일 경우 문자열로 노출시킬 값을 할당하고 오른쪽에는 true/false값이 있는 것을 넣어준다.

또, 위 코드를 구조분해할당을 통해 더 함축시켜 가독성을 키울 수도 있다.

``` jsx
<button className={classNames('button', { loading })}
>
```

만약 classnames와 같이 라이브러리의 도움을 받지 않는다면 다음과 같은 형식으로 처리를 해야한다.

``` jsx
const Button = ({ loading }) => {
  // loading prop가 true/false 값으로 전달된다는 가정하에 아래와 같이 작성할 수 있다.
  return (
    <button
      className={`button ${loading ? 'loading' : ''}`}}
    >
      버튼
    </button>
  )
}
```

이제 classnames와 css module과 함께 사용해보자.

먼저 기존에 css module을 불러올때 <b>style.[클래스]</b> 형식으로 불러왔었는데, classnames/bind를 사용하여 클래스를 넣어줄때마다 위와 같은 형식을 할 필요없이 사전에 미리 styles에서 받아와서 사용하게끔 설정하여 문자열형태로 받을 수 있게 만들어줄 수 있다.

``` jsx
import React from 'react';
import classNames from 'classnames/bind';
import styles from './Button.module.css';

const cx = classNames.bind(styles); // 미리 styles 에서 클래스를 받아오도록 설정

const Button = () => {
  return (
    <button className={cx('button', 'loading')}>
      버튼
    </button>
  )
}
```

위처럼 작성할 수 있다.

이제 문자열로 받아올 수 있으므로 classNames와 css module을 합쳐서 조건부로 클래스를 설정해보자

``` jsx
import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Button.module.css';

const cx = classNames.bind(styles); // 미리 styles 에서 클래스를 받아오도록 설정

const Button = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <button className={cx('button', { loading })}>
      버튼
    </button>
  )
}
```

이렇게 classNames를 활용할 수 있다.

<hr class="sub" />

### 4. styled-components

styled-components는 CSS-in-JS 라이브러리이다. CSS-in-JS는 이름에서 알 수 있듯, 자바스크립트 파일안에 CSS 작성을 하여 기존의 방식처럼 CSS 파일을 따로 분리하지 않고, JS 파일로 통일하여 관리할 수 있다.

``` bash
npm i styled-components
```

``` jsx
import styled from 'styled-components';
```

<br>

#### 4-1. 엘리먼트 만들기

스타일링 할 엘리먼트를 만들 땐, <b>styled.html태그명</b>을 사용하여 구현한다.

``` jsx
import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background: transparent;
  border-radius: 3px;
  border-width: 2px;
  border-style: solid;
  border-color: palevioletred;
  color: palevioletred;
  padding: 0.25em 1em;
  font-size: 20px;
  cursor: pointer;
`;

function App() {
  return (
    <div className="App">
      <StyledButton>버튼</StyledButton>
    </div>
  );
}

export default App;
```

이렇게 작성하면 module.css/module.scss 사용한 것과 유사하게 고유한 값을 붙여서 엘리먼트를 만들어준다.

**출력화면**

![styled-components_element](/images/react/styled-components_element.png "styled-components_element")

만약 태그 형식이 유동적이라면 아래와 같이 styled함수에 문자열로 원하는 태그명을 문자열로 전달해줄 수 있다.

``` jsx
const StyledButton = styled('button')`
  background: transparent;
  border-radius: 3px;
  border-width: 2px;
  border-style: solid;
  border-color: palevioletred;
  color: palevioletred;
  padding: 0.25em 1em;
  font-size: 20px;
  cursor: pointer;
`;
```

공통된 스타일이 존재하고, 일부의 스타일만 다르다면 아래와 같이 공통된 스타일의 컴포넌트를 가져와서 사용이 가능하다.

``` jsx
import React from 'react';
import styled from 'styled-components';
import './App.css';

const StyledButton = styled('button')`
  background: transparent;
  border-radius: 3px;
  border-width: 2px;
  border-style: solid;
  border-color: palevioletred;
  color: palevioletred;
  padding: 0.25em 1em;
  font-size: 20px;
  cursor: pointer;

  & ~ & {
    margin: 0 0 0 10px;
  }
`;

const StyledButton2 = styled(StyledButton)`
  border-color: cadetblue;
  color: cadetblue;
`;

const StyledButton3 = styled(StyledButton)`
  border-color: rebeccapurple;
  color: rebeccapurple;
`;

function App() {
  return (
    <div className="App">
      <StyledButton>버튼1</StyledButton>
      <StyledButton2>버튼2</StyledButton2>
      <StyledButton3>버튼3</StyledButton3>
    </div>
  );
}

export default App;
```

StyledButton이라는 컴포넌트의 스타일을 공통적으로 사용하여 styled 함수안에 인수로 컴포넌트를 전달해주었다. 그리고 border와 color 스타일을 덮어써서 각 컴포넌트마다 border와 color 값을 다르게 표현하였다.

**출력화면**

![styled-components_rendering](/images/react/styled-components_rendering.png "styled-components_rendering")

<hr class="sub" />

#### 4-2. 조건부 스타일링
기존 css 또는 css module을 사용했을 경우에는 더블 클래스를 이용하여 조건부로 렌더링을 해주었었다. 하지만 styled-components를 사용할때는 더블클래스 사용없이 props를 전달받아 사용이 가능해진다.

``` jsx
import React from 'react';
import styled from 'styled-components';
import './App.css';

const StyledButton = styled.button`
  background: transparent;
  border-radius: 3px;
  border-width: 2px;
  border-style: solid;
  border-color: ${props => props.color};
  padding: 0.25em 1em;
  font-size: 20px;
  color: ${props => props.color};
  cursor: pointer;

  & ~ & {
    margin: 0 0 0 10px;
  }
`;

function App() {
  return (
    <div className="App">
      <StyledButton>버튼1</StyledButton>
      <StyledButton color="cadetblue">버튼2</StyledButton>
      <StyledButton color="rebeccapurple">버튼3</StyledButton>
    </div>
  );
}

StyledButton.defaultProps = {
  color: 'palevioletred'
};

export default App;
```

이런식으로 defaultProps를 지정할 수도 있고, props마다 값을 받아 지정해줄 수 있다.

이제 color만 설정하는 것이 아니라 만약 disabled라는 props를 전달받았을 경우 스타일링 하는 방법을 알아보자

``` jsx
import React from 'react';
import styled, { css } from 'styled-components';
import './App.css';

const StyledButton = styled.button`
  background: transparent;
  border-radius: 3px;
  border-width: 2px;
  border-style: solid;
  border-color: ${props => props.color};
  padding: 0.25em 1em;
  font-size: 20px;
  color: ${props => props.color};
  cursor: pointer;

  & ~ & {
    margin: 0 0 0 10px;
  }

  ${props =>
    props.disabled &&
    css`
      border: none;
      background: #ccc;
      color: #fff;
      cursor: not-allowed;
    `}
`;

function App() {
  return (
    <div className="App">
      <StyledButton disabled>버튼1</StyledButton>
      <StyledButton color="cadetblue">버튼2</StyledButton>
      <StyledButton color="rebeccapurple">버튼3</StyledButton>
    </div>
  );
}

StyledButton.defaultProps = {
  color: 'palevioletred',
};

export default App;
```

첫번째 버튼에만 disabled props를 전달해주었고, 스타일 내부에선 props의 상태에 따라 전혀 다른 스타일을 설정해주었다. 이때 문자열 인터폴레이션(${...}) 내부에 props를 받아 css 값을 리턴하는 화살표 함수를 사용했다. 스타일을 리턴해야하므로 styled-components **css** 를 사용한다.

**출력화면**

![styled-components_rendering2](/images/react/styled-components_rendering2.png "styled-components_rendering2")

이처럼 styled-components는 CSS 파일을 별도로 분리하지 않고 JS내부에서 스타일도 입히고, Props를 활용하여 조건부로 스타일링을 할 수 있게 해주는 라이브러리이다.

<br>
<br>
<br>
<br>
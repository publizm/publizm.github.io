---
title: JSX란?
date: "2019-12-12"
template: "post"
draft: false
slug: "/posts/react/jsx"
category: "React"
tags:
  - "React"
  - "JSX"
description: "JSX에 대해 알아보자"
---
<span class="notice">
  <em>TIL 내용이므로 잘못된 내용은 댓글 부탁드립니다</em>
</span>

<div id="toc">

**:link:  Table Of Contents**

- [JSX](#jsx)
- [JSX 문법](#jsx-문법)
  - [꼭 닫혀야 하는 태그](#꼭-닫혀야-하는-태그)
  - [꼭 감싸져야하는 하는 태그](#꼭-감싸져야하는-하는-태그)
  - [JSX안에 자바스크립트 값 사용하기](#jsx안에-자바스크립트-값-사용하기)
  - [JSX 속성](#jsx-속성)
  - [주석](#주석)

</div>


## JSX
JSX는 React에서 생김새를 정의할때 사용하는 문법이다.

``` jsx
const element = <h1>Hello world!</h1>;
```

위의 태그 문법은 문자열도 HTML도 아니다.<br>
바로 위 문법을 JSX라고 부르며, 자바스크립트의 문법 확장이다. JSX는 템플릿 언어처럼 보일 수 있지만, 자바스크립트를 기반으로 하고 있다

React Component 파일에서 XML 형태로 코드를 작성하면 babel이 아래와 같이 JSX를 Javascript 객체로 트랜스파일링해준다.

![JSX](/images/react/babel_jsx.jpg "JSX")

babel은 JSX를 Javascript의 객체로 트랜스파일링한다고 했는데 객체 안에 무엇이 포함되는지 알아보자.

아래의 코드를 다시 [babel](https://babeljs.io/repl)에서 확인해보자

> Babel이란?
> 자바스크립트의 문법을 확장해주는 도구로서, 아직 지원되지 않는 최신 문법이나, 편의상 사용하거나 실험적인 자바스크립트 문법들을 정식 자바스크립트 형태로 변환해줌으로서 구형 브라우저같은 환경에서도 제대로 실행할 수 있게 해주는 역할을 한다.

<br>

``` jsx
const element = (
  <h1 className="greeting">
    Hello World!
  </h1>
);
```

<br>

![jsx_greeting](/images/react/jsx_greeting.jpg "jsx_greeting")

위와 같이 React.createElement()가 호출된다.

React.createElement()는 버그 없는 코드를 작성하는데 도움을 주는 몇가지 체크를 하지만 기본적으로는 아래와 같은 객체를 생성한다.

``` jsx
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello World!'
  }
}
```

이 객체는 React elements라고 불린다. 화면에 볼 수 있는 내용에 대한 설명으로 생각하면 된다. React는 이 객체를 읽어들이고 이를 사용하여 DOM을 구성하고 최신 상태를 유지한다.

특이한점이 있다면 props에 className과 children에 텍스트 노드가 들어간다는 점이있다. children에는 해당 컴포넌트의 하위 요소들이 들어가게된다.

## JSX 문법

### 꼭 닫혀야 하는 태그
태그는 꼭 닫혀있어야한다.
다음과 같은 코드는 오류가 발생한다.

<b>APP.js</b>

``` jsx
import React from 'react';

function App() {
  return (
    <div>
      Hello World
      <div>
    </div>
  );
}

export default App;
```

![jsx_syntax1](/images/react/jsx_syntax1.jpg "jsx_syntax1")

위와 같이 컴파일 에러가 난다. 태그를 열었으면 꼭, 닫는 태그를 넣어줘야한다.<br>
HTML에서 input 또는 br, img 등(empty element)을 사용 할 때 사용하기도 한다. 하지만 React에서는 그렇게 하면 안된다.

> empty elements<br>
> contents를 가지고 있지 않는 요소를 말한다.<br>
> contents를 가지고 있지 않으므로 시작태그는 존재하나, 종료태그는 존재하지 않는다.

<b>APP.js</b>

``` jsx
import React from 'react';

function App() {
  return (
    <div>
      Hello World
      <input type="text">
      <br>
    </div>
  );
}

export default App;
```

태그와 태그 사이에 내용이 들어가지 않을때는 Self Closing 태그라는 것을 사용해야한다.<br>
Self Closing 태그는 열리고 바로 닫히는 태그를 의미하는데 다음과 같다

<b>APP.js</b>

``` jsx
import React from 'react';

function App() {
  return (
    <div>
      Hello World
      <input type="text" />
      <br />
    </div>
  );
}

export default App;
```

<hr class="sub" />

### 꼭 감싸져야하는 하는 태그
두개 이상의 태그는 무조건 하나의 태그로 감싸져있어야한다.

<b>APP.js</b>

``` jsx
import React from 'react';

function App() {
  return (
    Hello World
    <input type="text" />
    <br />
  );
}

export default App;
```

위와 같은 코드는 아래와 같이 에러가 난다.

![jsx_syntax2](/images/react/jsx_syntax2.jpg "jsx_syntax2")

그래서 아래와 같이 하나의 태그로 감싸주어야한다.

``` jsx
import React from 'react';

function App() {
  return (
    <div>
      Hello World
      <input type="text" />
      <br />
    </div>
  );
}

export default App;
```
하지만 이렇게 오류를 피하기 위해서 불필요한 div를 감싸는게 좋지 않은 상황이 있다. 스타일 관련 설정이라던가, 아니면 컴포넌트화를 세부적으로 쪼갤 경우 div로 감싸줌으로써 웹표준에 어긋날 수도 있는 점이 있다.

이럴때는 React의 Fragment라는 것을 사용하면 된다.

<b>App.js</b>

``` jsx
import React from 'react';

function App() {
  return (
    <>
      Hello World
      <input type="text" />
      <br />
    </>
  );
}

export default App;
```

태그를 작성할때 태그의 이름없이 작성을 하게 되면 Fragment가 만들어지는데, Fragment는 브라우저상에서 별도의 엘리먼트를 나타내지 않는다.

![jsx_syntax3](/images/react/jsx_syntax3.jpg "jsx_syntax3")

<hr class="sub" />

### JSX안에 자바스크립트 값 사용하기
JSX 또한 표현식이다.

트랜스 파일링이 끈나면 JSX는 자바스크립트의 객체로 인식하게된다. 이 말은 if문이나 for 반복 내에서 JSX를 사용할 수 있으며, 변수에 할당하거나 매개변수로 전달하거나, 함수에서 반환할 수 있음을 의미한다.

``` jsx
function getGreeting(user) {
  if (user) {
    return <h1>Hello !</h1>;
  } else {
    return <h1>Please login</h1>;
  }
}
```

위와 같이 JSX를 값으로서 반환할 수 있다는 의미이다.

또 JSX 내부에 자바스크립트 변수를 보여줘야할때에는 **{변수}**로 감싸서 보여준다.

``` jsx
import React from 'react';

function App() {
  const name = 'react';
  return (
    <>
      Hello <strong>{name}</strong>
    </>
  );
}

export default App;
```

<hr class="sub" />

### JSX 속성

속성에 따옴표를 이용해 문자열 리터럴을 정의할 수 있다.

``` jsx
const element = <div tabIndex="0"></div>;
```

속성에 {}를 이용해 자바스크립트 표현식을 포함시킬 수 있다.

``` jsx
const element = <img src={user.character} />
```

속성에서 자바스크립트 표현식을 포함시킬때 중괄호를 따옴표(")로 묶으면 안된다. 따옴표(문자열 값인 경우) 또는 중괄호(표현식인 경우) 중 하나를 사용해야하고, 둘 다 같은 속성에 사용할 수 있는 것이 아니다.

JSX에서 태그에 style과 CSS class를 설정하는 방법은 HTML에서 설정했던 방법과는 다르다.

> JSX는 HTML보다는 자바스크립트에 가깝기 때문에, React DOM은 HTML 속성 이름 대신 camelCase속성 이름 컨벤션을 사용한다
> 예를들어 HTML속성 class는 JSX에서 className이며, tabindex는 tabIndex로 작성해야된다.

인라인 스타일은 객체 형태로 작성해야하며, HTML 속성과 마찬가지로 camelCase형태로 네이밍해주어야한다.

<b>App.js</b>

``` jsx
import React from 'react';

function App() {
  const name = 'react';
  const style = {
    backgroundColor: 'black',
    fontSize: 24, // 기본단위는 px이다.
    fontSize: '24px', // 일반적으로 가독성을 위해서 표기해준다
    color: 'aqua',
    padding: '1rem' // px이 아닌 다른단위라면 무조건 문자열로 표기
  }

  return (
    <>
      <h1 className="title" style={style}>Hello {name}</h1>
    </>
  );
}
```

그리고 html에서 사용했었던 onclick 이벤트, onchange 이벤트 등등.. 이벤트를 바인딩 해줌에 있어 기존의 html에서는

``` html
<button onclick="console.log('hello world!')">버튼</button>
```

이런식으로 작성을 해주어 클릭했을때의 실행할 함수를 넣어주었는데

**jsx에서 이벤트핸들러에 함수를 바인딩할때는 일단 onclick이 아닌 onClick, onchange가 아닌 onChange와 같이 camelCase로 이벤트이름을 설정해주어야한다.**

그리고, 이벤트에 전달되는 값은 함수호출이 아닌 **함수이름**으로 해야한다.

``` jsx
import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
  }

  handleIncrease = () => {
    const { count } = this.state;
    this.setState({
      count: count + 1
    })
  }

  render() {
    return (
      <button onClick={this.handleIncrease}>버튼</button> // 1
      <button onClick={this.handleIncrease()}>버튼</button> // 2
    )
  }
}
```

1. 올바르게 작동한다.
2. 렌더링을 할때마다 호출이 되고, handleIncrease 메소드 내부에는 setState가 있어 setState에 의해 상태변화가 생기면 또 다시 렌더링이 되고... 무한 루프에 빠지게 된다.

그러면 이때 인수를 넘겨줘야되는 메소드가 있을땐 어떻게 해주면 될까?

``` jsx
<button onClick={() => {
  this.handleIncrease('lalala')
}}>버튼</button>
```

위와 같이 화살표함수를 한번 더 감싸주면 해결이 된다! 이때 화살표함수는 렌더링 될때마다 실행되지 않고, 결국 클릭됬을때 익명함수가 실행되니 그 내부에 있는 handleIncrease가 호출되기 때문이다.

<hr class="sub" />

### 주석

JSX에서 내부 주석은 {/* 주석 */} 이런 형태로 작성한다.

<b>App.js</b>

``` jsx
import React from 'react';

function App() {
  const name = 'react';
  const style = {
    backgroundColor: 'black',
    fontSize: 24, // 기본단위는 px이다.
    fontSize: '24px', // 일반적으로 가독성을 위해서 표기해준다
    color: 'aqua',
    padding: '1rem' // px이 아닌 다른단위라면 무조건 문자열로 표기
  }

  return (
    <>
      {/* 올바른 예 */}
      /* 잘못된 예 */
      <h1 className="title" style={style}>Hello {name}</h1>
    </>
  );
}
```

추가적으로 열리는 태그 내부에서는 //으로 주석 작성이 가능하다.

<b>App.js</b>

``` jsx
import React from 'react';

function App() {
  const name = 'react';
  const style = {
    backgroundColor: 'black',
    fontSize: 24, // 기본단위는 px이다.
    fontSize: '24px', // 일반적으로 가독성을 위해서 표기해준다
    color: 'aqua',
    padding: '1rem' // px이 아닌 다른단위라면 무조건 문자열로 표기
  }

  return (
    <>
      {/* 올바른 예 */}
      /* 잘못된 예 */
      <h1
        className="title"
        // 주석이 가능
        style={style}>
        Hello {name}
      </h1>
    </>
  );
}
```




<br>
<br>
<br>
<br>
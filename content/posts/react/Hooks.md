---
title: React Hook
date: "2019-12-27"
template: "post"
draft: false
slug: "/posts/react/Hook"
category: "React"
tags:
  - "React Hooks"
  - "useState"
  - "useEffect"
description: "React Hook에 대해 알아보자"
---
<span class="notice">
  <em>TIL 내용이므로 잘못된 내용은 댓글 부탁드립니다</em>
</span>

<div id="toc">

**:link:  Table Of Contents**

- [Hook 사용규칙](#hook-사용규칙)
- [useState](#usestate)
  - [State 변수 선언하기](#state-변수-선언하기)
  - [State 갱신하기](#state-갱신하기)
  - [State 가져오기](#state-가져오기)
- [useEffect](#useeffect)
  - [의존값(deps)을 설정하여 useEffect 사용하기](#의존값deps을-설정하여-useeffect-사용하기)
  - [의존값(deps)을 빈배열([])로 설정하여 mount와 unmount 관리하기](#의존값deps을-빈배열로-설정하여-mount와-unmount-관리하기)
  - [의존값(deps)을 생략하면?](#의존값deps을-생략하면)
- [useLayoutEffect](#uselayouteffect)
- [useRef](#useref)
  - [ref](#ref)
  - [useRef와 createRef](#useref와-createref)
      - [공통점](#공통점)
      - [차이점](#차이점)
  - [useRef 활용](#useRef-활용)
</div>

Hooks는 React 버전 16.8에 새로 추가되었다. Hook을 이용하여 Class를 작성할 필요 없이 상태 값과 여러 React의 기능을 사용할 수 있다.

Hook은 함수형 컴포넌트에서 React의 생명주기 기능을 연동할 수 있게 해주는 함수이다. **Hook은 class안에서 동작하지 않고, 대신 class없이 React를 사용할 수 있게 해준다.**

## Hook의 장점은 무엇일까?
1. **생산성 증가**<br>
class Copmonent에 비해 눈에 띄게 코드의 양을 압축시킬 수 있고, 코드의 양이 줄었다는 것은 각각의 기능이 한눈에 볼 수 있게 되어 그만큼 생산성이 높아진다.
2. **Wrapper Hell을 피할 수 있다**<br>
기존 Class component에서의 기능과 상태들을 전달하기 위해서는 props를 통하여 전달하거나, HOC(High Order Component)를 활용하는 방법이 있었는데 이때 Wrapper가 너무 깊어 지는 문제가 있었다. 이 문제를 Wrapper Hell이라 하는데, Wrapper Hell을 해결할 수 있게 해준다.
3. **라이프사이클**<br>
라이프사이클이 단순해졌다. useEffect를 활용하여 componentDidMount, conponentWillUnmount, componentDidupdata 등을 표현할 수 있다.

## Hook 사용규칙

### 최상위(at the Top Level)에서만 Hook을 호출해야한다.

반복문, 조건문 혹은 중첩 함수내에서 Hook을 호출할 수 없다. 항상 React 함수의 최상위에서 Hook을 호출해야한다.
위 규칙을 따라야하는 이유는 **React가 Hook이 호출되는 순서에 의존하는데 있어서 컴포넌트가 렌더링 될 때마다 항상 동일한 순서로 Hook이 호출되는 것을 보장받을 수 있기 때문이다.** 만약 조건부로 effect를 실행하기를 원한다면, 조건문을 Hook 내부에 넣을 수 있다.

그리고 하나의 컴포넌트에서 Hook은 여러개 사용할 수 있다.

<hr class="sub" />

### 오직 React 함수 내에서 Hook를 호출해야한다.

**Hook을 일반적인 Javascript 함수에서 호출하면 안된다.**

대신 아래와 같이 호출할 수 있다.

1. React 함수형 컴포넌트에서 Hook을 호출하는 경우
2. Custom Hook에서 Hook을 호출하는 경우

## useState
useState는 상태를 변화시키는 Hook인데, 이때 상태를 변화시키면 컴포넌트 전체(return문만 **X**)가 리렌더링된다는 점에 유의하자.
Hook를 사용하기 전에 class로 state를 다루기 위해 어떻게 해주었는지 알아보자.

class를 이용하여 카운트 컴포넌트를 만들어보자.

``` jsx
import React from "react";

class Example extends React.Component {
  constructor(props) {
    // Super 클래스인 리액트의 컴포넌트와 연결하기 위해 super 키워드를 사용했다.
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}

export default Example;
```

위 코드에서 state는 { count: 0 }이며 사용자가 this.state()를 호출하는 버튼을 클릭했을때, state.count를 증가시킨다.

이제 동일한 기능을 하는 컴포넌트를 Hook 사용하여 만들어보자

``` jsx
import React, { useState } from 'react';

const Example = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default Example;
```

두 코드를 비교해보면 겉으로만 봐도 Hook을 사용한 컴포넌트가 훨씬 간결하다.

<br>

### State 변수 선언하기

**클래스 컴포넌트**

``` jsx
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
...
```

클래스를 사용할 경우, constructor안에 this.state를 { count: 0 }으로 설정함으로써 count를 0으로 초기화 했다.

**함수형 컴포넌트**

``` jsx
import React, { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);
...
```

함수형 컴포넌트는 this를 가질 수 없기 때문에 this.state를 할당하거나 참조할 수 없다. 대신, useState Hook을 직접 컴포넌트에 호출한다.

- **useState를 호출하는 것은 무엇을 의미하는 걸까?**<br>
  state 변수를 선언할 수 있다. 위의 예시는 count라고 변수명을 지어줬지만, 아무 이름을 지어도 상관없다. useState는 클래스 컴포넌트의 this.state가 제공하는 기능과 똑같다. 일반적으로 변수는 함수가 끝날 때 생명주기를 다하지만, state 변수는 React에 의해 사라지지 않는다.

- **useState의 argument로 무엇을 넘겨주어야 할까?**<br>
  state의 초기 값이다. 함수형 컴포넌트의 state는 클래스와 달리 객체일 필요는 없고, 숫자 타입과 문자 타입을 가질 수 있다.<br>
  아래와 같이 변수에 담아 초기값을 넣어주는 것은 위험하다.

``` jsx
const value = 0;
const [count, setCount] = useState(value);
```

- **useState는 무엇을 반환할까?**<br>
  state 변수, 해당 변수를 갱신할 수 있는 함수를 반환한다.


상태는 해당 함수형 컴포넌트에서만 사용이 가능하므로, 만약 다른 컴포넌트로 넘겨야할때 props로 넘겨주던지, redux를 사용한다.

<br>

``` jsx
import React, { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);
...
```

위 예제는 count라는 state 변수를 선언하고, 0으로 초기화한다. React는 해당 변수를 리렌더링 할 때 기억하고, 가장 최근에 갱신된 값을 제공한다. count 변수의 값을 갱신하려면 setCount를 호출하면 된다.

<hr class="sub" />

### State 갱신하기


**클래스 컴포넌트**

``` jsx
<button onClick={() => this.setState({ count: this.state.count + 1 })}>
  Click me
</button>
```

this.setState를 사용하여 바꾸어주었다.

반면에 함수형 컴포넌트는 사용자가 지정한 변수로 변경이 가능해졌다.

**함수형 컴포넌트**

``` jsx
<button onClick={() => setCount(count + 1)}>
  Click me
</button>
```

<br>

주의해야할 점은 Hook 함수가 return 밖에 있고, useEffect로 호출되지 않았다면 다음과 같은 에러가 보여진다.

``` jsx
import React, { useState } from 'react';

const Example = () => {
  const [count, setCount] = useState(0);
  setCount(count + 1)
  return (
    <div>
      <p>You clicked {count} times</p>
    </div>
  );
}

export default Example;
```

![state_error](/images/react/state_error.jpg "state_error")

위 에러는 너무 많은 리렌더링이 발생된다는 에러이다.

이유는 Example 컴포넌트가 렌더링될때 setCount가 동작하는데 이 setCount가 동작하게 되면 상태가 변하면서 리렌더링을 하게되고 리렌더링을 할때 또 setCount가 동작하며 무한루프가 발생하게 된다.

이럴땐 useEffect를 활용하면 된다.

``` jsx
import React, { useState, useEffect } from 'react';

const Example = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count + 1)
  }, []);

  return (
    <div>
      <p>You clicked {count} times</p>
    </div>
  );
}

export default Example;
```

![state_error_repair](/images/react/state_error_repair.jpg "state_error_repair")

해결된 것을 확인할 수 있다. 하지만 콘솔창을 살펴보면 useEffect의 의존성 배열에 수정하려는 상태를 넣어야된다는 경고 문구가 출력된다.

위 코드에서 setCount는 count의 상태를 변경하는 것이므로 count를 넣어보자

``` jsx
import React, { useState, useEffect } from 'react';

const Example = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count + 1)
  }, [count]);

  return (
    <div>
      <p>You clicked {count} times</p>
    </div>
  );
}

export default Example;
```

이렇게하면 경고문구는 출력되지 않지만, 무한루프에 빠진다. setCount함수는 count를 변경하는 함수인데 의존성 배열에 count가 있으니 당연한 결과이다.

그렇다면 딱 Didmount시에 한번만 setter 함수를 호출할 수 있는 방법은 없을까?

다음과 같이하면 해결된다.

``` jsx
import React, { useState, useEffect } from 'react';

const Example = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count => count + 1)
  }, []);

  return (
    <div>
      <p>You clicked {count} times</p>
    </div>
  );
}

export default Example;
```

현재 상태를 파라미터로 받아오면 의존성 배열에 넣어주지 않을 수 있다.

useEffect는 아래 섹션에서 확인해보자.

만약 state에 재할당을 한다면?

``` jsx
import React, { useState, useEffect } from 'react';

const Example = () => {
  const [name, setName] = useState('publee');

  useEffect(() => {
    setName(name = 'CheolHwan')
  }, []);

  return (
    <div>
      <p>I'm {name}.</p>
    </div>
  );
}

export default Example;
```

![state_constant_error](/images/react/state_constant_error.jpg "state_constant_error")

상수 변수에 할당한다는 에러가 나온다. 하지만 다음과 같이 이전상태를 불러와서 값을 수정한다면?

``` jsx
import React, { useState, useEffect } from 'react';

const Example = () => {
  const [name, setName] = useState('publee');

  useEffect(() => {
    setName(name => (name = 'CheolHwan'));
  }, []);

  return (
    <div>
      <p>I'm {name}.</p>
    </div>
  );
}

export default Example;
```

![state_constant_error_repair](/images/react/state_constant_error_repair.jpg "state_constant_error_repair")

이유는 간단하다 set에서는 할당 자체를 하기때문에 할당을 하면 안된다 이게 무슨말이냐면,

``` jsx
const [name, setName] = useState('publee');

useEffect(() => {
  setName('CheolHwan');
  console.log(name); // CheolHwan
}, [name]);
```

setName에 인수로 들어가는 값은 즉 name의 상태가 되는 것이기 때문이다. 그래서 할당을 하면 안된다. 위의 함수형 업데이트(이전 상태를 가져와서 에러를 해결 했던 방법)도 결국 name이라는 변수에 CheolHwan이라는 문자열을 담아 리턴 했기 때문에 잘 작동되는 것이다.

state 또는 props의 변화가 있을때 리렌더링되는데 클래스 컴포넌트는 render 메소드가 다시 호출되고, 함수형 컴포넌트는 해당 컴포넌트가 재호출 된다는 것을 인지하고 있자.

<br>

useState를 풀어보면 아마 아래의 코드와 비슷하게 작동할 것으로 예상된다.(참고)

``` jsx
const React = (function() {
  let _val;

  return {
    render(Component) {
      const Comp = Component();
      Comp.render(); // Counter 컴포넌트의 render 함수호출
      return Comp;
    },
    useState(init) {
      _val = _val || init;

      function setState(newVal) {
        _val = newVal;
      }

      return [_val, setState];
    },
  };
})();

const { useState } = React;
function Counter() {
  const [count, setCount] = useState(0);
  return {
    click: () => setCount(count + 1),
    render: () => console.log('render', { count }),
  };
}

let App;
App = React.render(Counter); // render { count: 0 }
App.click();
App = React.render(Counter); // render { count: 1 }
```

<hr class="sub" />

### State 가져오기

클래스 컴포넌트는 count를 보여주기 위해 this.state.count를 사용했다.

``` javascript
<p>You clicked {this.state.count} times</p>
```

반면에 함수형 컴포넌트는 this.state없이 count를 직접 사용할 수 있다.

``` javascript
<p>You clicked {count} times</p>
```

<br>

## useEffect
현재 React State에 변수로 정의된 값이 변화가 일어났을 때를 감지해주는 함수이다.
이때의 변화는 상태의 얕은 비교를 통해 하게된다는 점 그리고 비동기적으로 작동한다는 점, 하나의 컴포넌트에 여러개의 useEffect를 사용할수 있다는 점을 유의하자.

함수형 컴포넌트를 사용함에 있어 클래스 컴포넌트의 라이프사이클(componentDidMount, componentDidUpdate, componentWillUnmount)을 대체하기위해 useEffect를 사용한다.


일단 클래스 컴포넌트의 라이프사이클을 다뤄보자.

``` jsx
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    // 렌더링하고 난 후 실행
    document.title = `You clicked ${this.state.count} times`;
  }

  componentDidUpdate() {
    // State가 업데이트가 된 후 실행
    document.title = `You clicked ${this.state.count} times`;
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```

componentDidMount, componentDidUpdate 함수를 사용해보았다.

<br>

같은 기능을 함수형 컴포넌트에 useEffect를 활용하여 작업해보자

### 의존값(deps)을 설정하여 useEffect 사용하기

``` jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('count 값이 설정됨');
      document.title = `You clicked ${count} times`;
    return () => {
      console.log('count 가 바뀌기 전..');
      document.title = `You clicked ${count} times`;
    };
  }, [count]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

위 코드를 실행하면 렌더링시 초기값을 세팅해주기 위해서 useEffect가 실행된다. 그 후 버튼을 클릭하면 setCount에 의해 상태가 변화된다.

useEffect를 사용 할 때에는 첫번째 파라미터에는 함수, 두번째 파라미터에는 **의존값이 들어있는 배열 (deps)을 넣는다.**
deps 에 특정 값을 넣게 된다면, 컴포넌트가 처음 마운트 될 때에도 호출이 되고, 지정한 값이 바뀔 때에도 호출이 된다. 그리고, 언마운트시에도 호출이 되고, 값이 바뀌기 직전에도 호출이 된다.

위의 코드의 useEffect의 deps의 값으로 [ count ]를 넣어줌으로써 count의 상태에 변화가 생길때마다 호출된다.

다음과 같은 경우에는 의존성 배열에 변화를 감지해야되는 값을 넣어주지 않고도

<hr class="sub" />

특정 상태가 아닌 컴포넌트 자체의 마운트와 언마운트를 관리하려면 어떻게 해야할까?

### 의존값(deps)을 빈배열([])로 설정하여 mount와 unmount 관리하기

**의존값을 빈배열로 설정하면 최초 렌더링시 한번 호출되고, 그안에 cleanup 함수가 있다면 컴포넌트가 사라질때 한번 더 호출된다.**

<br>

예시를 통해 확인해보자.

<b>index.js</b>

``` jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);

serviceWorker.unregister();
```

<b>App.js</b>

``` javascript
import React from 'react';
import { Route, Link } from 'react-router-dom';
import About from './About';
import Home from './Home';

const App = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
      </ul>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
    </div>
  );
}

export default App;
```

<b>About.js</b>

``` jsx
import React, { useEffect } from 'react';

const About = () => {
  useEffect(() => {
    console.log('소개 컴포넌트가 화면에서 나타남');
    return () => {
      console.log('소개 컴포넌트가 화면에서 사라짐');
    };
  }, []);
  return (
    <div>
      <h1>소개</h1>
      <p>소개 페이지</p>
    </div>
  );
};

export default About;
```

<b>Home.js</b>

``` jsx
import React, { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    console.log('홈 컴포넌트가 화면에서 나타남');
    return () => {
      console.log('홈 컴포넌트가 화면에서 사라짐');
    };
  }, []);
  return (
    <div>
      <h1>홈</h1>
      <p>Home 페이지</p>
    </div>
  );
};

export default Home;
```

홈 컴포넌트가 나타났을때(마운트)와 사라졌을때(언마운트)를 확인해보자.

홈 컴포넌트로 접근하면

![useEffect_01](/images/react/useEffect_01.jpg "useEffect_01")

위와 같이 렌더링이 되면 useEffect가 최초 실행된다.

그리고 소개 컴포넌트로 이동해보자

![useEffect_02](/images/react/useEffect_02.jpg "useEffect_02")

그러면 홈 컴포넌트가 이동하기전에 useEffect 첫번째 인수안의 return문의 함수가 실행된 후 소개 컴포넌트의 useEffect가 실행되는 것을 확인할 수 있다.

useEffect에서는 함수를 반환 할 수 있는데 이를 cleanup 함수라고 한다. cleanup 함수는 useEffect에 대한 뒷정리를 해준다고 이해하시면 되는데, deps가 비어있는 경우에는 컴포넌트가 사라질 때 cleanup함수가 호출된다.

주로, 마운트 시에 하는 작업으로는
- props 로 받은 값을 컴포넌트의 로컬 상태로 설정
- 외부 API 요청 (REST API 등)
- 라이브러리 사용 (D3, Video.js 등...)
- setInterval 을 통한 반복작업 혹은 setTimeout 을 통한 작업 예약

그리고, 언마운트 시에 하는 작업으로는
- setInterval, setTimeout 을 사용하여 등록한 작업들 clear 하기 (clearInterval, clearTimeout)
- 라이브러리 인스턴스 제거
- scroll 이벤트와 같은 이벤트 바인딩 제거

<hr class="sub" />

### 의존값(deps)을 생략하면?

``` jsx
useEffect(() => {
  console.log('호출');
});
```
의존값을 생략하게 되면 모든 상태와 props변화에 의해 리렌더링될 때마다 실행하게된다.

참고로 리액트 컴포넌트는 기본적으로 부모컴포넌트가 리렌더링되면 바뀐 내용이 없다하더라도 자식 컴포넌트 또한 리렌더링이 된다.

물론, 실제 DOM 에 변화가 반영되는 것은 바뀐 내용이 있는 컴포넌트에만 해당한다. 하지만, Virtual DOM에는 모든걸 다 렌더링하고 있다.

useEffect를 한눈에 살펴보자

``` jsx
useEffect(() => {
  // componentDidmount 렌더링된 직후
  // componentDidUpdate 의존성 배열이 없을 시 업데이트될때마다 호출
  // componentDidUpdate는 의존성 배열이 없어 if문으로 따로 분기처리를 해주었어야 됬었다.

  return () => {
  // WillUnmount를 사용하려면 의존성배열이 빈배열이여야한다.
  // componentWillUnmount
  };
}, []);

useEffect(() => {
  // DidUpdate
}, [count]);

useEffect(() => {
  // DidMount
}, []);

useEffect(() => {
    return () => {
      // WillUnmount
    };
}, []);
```

<br>

## useLayoutEffect
이 함수는 useEffect와 거의 동일하다.
너무 잦은 상태변화를 일으켜 useEffect로 이를 감지한다면 상태 변화 이후 렌더링하는 중 깜빡거림이 보인다.
이는 **useEffect가 비동기적으로 처리가 되기 때문인데 useLayoutEffect는 DOM 변경 후에 동기적으로 발생하여 위와 같은 깜빡거림(화면 갱신)을 방지할 수 있다.**

말로는 위와 같은 현상을 설명하기 어려우니 예제를 들어보자.

``` jsx
import React, { useState, useEffect } from 'react';

export default function BlinkRender() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (value === 0) {
      setValue(10 + Math.random() * 200);
    }
  }, [value]);

  return <button onClick={() => setValue(0)}>value: {value}</button>;
}
```

위와 같이 useEffect에 의존성배열로 value라는 상태를 참조하여 value의 상태 값이 변할때만 useEffect를 실행시켜놓았다. 그리고 버튼을 클릭시 random의 값으로 value를 바꾸어주었다.

위와 같이 하게되면 값이 변할때 종종 깜빡거림 현상(화면 갱신)을 발견할 수 있다.

이와 같은 현상을 방지하기 위해서 다음과 같이 layoutEffect를 사용해보자

``` jsx
import React, { useState, useLayoutEffect } from 'react';

export default function BlinkRender() {
  const [value, setValue] = useState(0);

  useLayoutEffect(() => {
    if (value === 0) {
      setValue(10 + Math.random() * 200);
    }
  }, [value]);

  return <button onClick={() => setValue(0)}>value: {value}</button>;
}
```

깜빡거림(화면 갱신)을 차단할 수 있다.

그러면 useEffect랑 역할은 같은데 무조건 useLayoutEffect를 쓰면 되지 않을까? 깜빡거림도 방지할 수 있고..

정답은 특수한 상황에만 useLayoutEffect를 사용하고, 일반적으로는 useEffect를 사용하자. 이유는 위에서 언급했 듯 useLayoutEffect는 동기적으로 발생한다 했다. 그렇다는 것은 useLayoutEffect 내부의 연산이 오래걸린다면 그만큼 뒤의 작업은 지연될 수 있다는 말이다.

<br>

## useRef
Javascript를 사용할 때에는, 특정 DOM을 선택하기 위해서 getElementById 또는 querySelector와 같은 DOM Selector 함수를 사용하여 DOM을 선택했었다.

리액트를 사용하는 프로젝트에서도 가끔씩 DOM을 직접 선택해야하는 상황이 있는데, 이때 리액트에서 ref를 사용한다.

<br>

### ref
일반적인 React의 data flow에서 props는 부모 컴포넌트가 자식 컴포넌트와 상호작용할 수 있는 유일한 수단이다. 자식 컴포넌트를 수정하려면 새로운 props를 전달하여 자식을 다시 렌더링해야하는데, 일반적인 data flow에서 벗어나 직접적으로 자식 컴포넌트를 수정해야 하는 경우도 가끔씩 있다. 그럴때 ref를 사용하는데

주로 사용해야할 때
1. focus, 텍스트 선택 영역, 미디어의 재생 관리
2. 애니메이션을 직접적으로 실행시킬때
3. 서드 파티 DOM 라이브러리를 React와 같이 사용할때

React 공식문서에서는 선언적으로 해결될 수 있는 문제는 ref 사용을 지양하라고 한다.

> 선언적으로 해결될 수 있는 예시<br>
> 만약 모달팝업이 있는 컴포넌트가 있다고 가정했을 경우, open과 close 메서드를 두는 대신, isOpen이라는 props를 넘겨 받아 true, false로 제어하자

**변수를 만들어 ref에 할당하는 방법**

``` jsx
export default function childComponent({ inputValue }) {
  let inputs;

  return (
    <>
      <input ref={ref => (inputs = ref)} type="text" />
      <button onClick={() => inputValue(inputs.value)}>전달</button>
    </>
  );
}
```

위 사용법에는 current가 존재하지 않는다. 값을 가져오고 싶다면 inputs.value과 같이 접근하면 된다.
예를들어 props로 부모 컴포넌트로 부터 함수를 받아와 그 함수에 전달해줄때 위와 같이 쓸 수 있다.

<hr class="sub" />

### useRef와 createRef

<br>

#### 공통점
- 문법적 사용법은 완전 동일하다
- 하나의 참조의 하나의 DOM을 연결시킬 수 있다.

<br>

##### **useRef**

**useRef()를 사용하여 Ref 객체를 만들고, 이 객체를 우리가 선택하고 싶은 DOM에 ref의 값으로 설정하여 사용한다.
이때 current 값은 우리가 ref로 설정한 DOM을 가르키게 된다.**

``` jsx
const input = useRef();

const focusInput = () => {
  input.current.focus();
};
return (
  <>
    <input ref={input} type="text" />
    <button onClick={focusInput}>focus Input</button>
  </>
);
```

우선 useRef로 Ref 객체를 만들어서 변수에 담고, 우리가 선택하고 싶은 DOM에 ref 속성의 값으로 해당 변수를 선언해줬다.
그리고 버튼을 클릭했을때 focusInput이라는 함수를 실행하는데 focusInput에서는 input.current에 focus를 하라고 명령했다.

이때 current 값은 우리가 원하는 DOM을 가리킨다.

<br>

##### **createRef**

``` jsx
const input = createRef();

const focusInput = () => {
  input.current.focus();
};
return (
  <>
    <input ref={input} type="text" />
    <button onClick={focusInput}>focus Input</button>
  </>
);
```

문법상 useRef와 사용법이 같고, 동작원리도 같으니 설명은 생략하겠다.

<hr class="sub" />

이제 차이점에 대해서 알아보자

<br>

#### 차이점
- 함수형 컴포넌트에서 ref 사용은 useRef을 사용
- 클래스형 컴포넌트에서는 콜백 함수를 사용하거나 React.createRef 함수 사용
- **useRef의 경우 current의 값이 변경이 되었을 경우에 리렌더링을 발생시키지 않는다.**<br>
  **반면에, createRef의 경우 current 값이 변경되었을 경우에 리렌더링이 된다.**

> useRef 사용시 current의 값이 변경되었을 경우에 리렌더링이 안됬을 뿐이지, current값은 변했다는거를 명심하자.

<br>

코드를 통해 알아보자

``` jsx
export default function App() {
  const [renderIndex, setRenderIndex] = useState(1);
  const refFromUseRef = useRef();
  const refFromCreateRef = createRef();

  if (!refFromUseRef.current) {
    refFromUseRef.current = renderIndex;
  }

  if (!refFromCreateRef.current) {
    refFromCreateRef.current = renderIndex;
  }

  return (
    <>
      {'useRef와 createRef의 current의 차이'}
      <p>Current render index: {renderIndex}</p>
      <p>refFromUseRef: {refFromUseRef.current}</p>
      <p>refFromCreateRef: {refFromCreateRef.current}</p>
      <button onClick={() => setRenderIndex(prev => prev + 1)}>re-render</button>
    </>
  );
}
```

버튼을 클릭해보면

![useRef_createRef](/images/react/useRef_createRef.jpg "useRef_createRef")

createRef로 선언한 ref는 클릭시마다 리렌더링되지만 useRef는 리렌더링이 되지 않음을 확인할 수 있다.

<hr class="sub" />

### useRef 활용

useRef의 업데이트 시점을 활용하여 useEffect와 함께 componentDidUpdate에서 사용할 수 있는 이전 값을 사용할 수 있도록 할 수 있다.

``` jsx
import React, { useState, useEffect, useRef } from 'react';

function usePrev(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

export default function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrev(count);

  const increase = () => {
    setCount(prevCount => prevCount + 1);
  };

  return (
    <>
      <p>현재 카운트 : {count}</p>
      <p>이전 카운트: {prevCount}</p>
      <button onClick={increase}>카운트 증가</button>
    </>
  );
}
```




<br>
<br>
<br>
<br>
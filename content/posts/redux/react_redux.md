---
title: React-Redux란?
date: "2020-02-02"
template: "post"
draft: false
slug: "/posts/redux/react_redux"
category: "Redux"
tags:
  - "React-Redux"
description: "React-Redux에 대해 알아보자"
---
<span class="notice">
  <em>TIL 내용이므로 잘못된 내용은 댓글 부탁드립니다</em>
</span>

<div id="toc">

**:link:  Table Of Contents**

- [React-Redux](#react-redux)
  - [Provider 컴포넌트](#provider-컴포넌트)
  - [Connect](#connect)
      - [mapStateProps](#mapstateprops)
        - [mapDispatchToProps](#mapdispatchtoprops)
      - [connect 함수 결론](#connect-함수-결론)
  - [Hooks](#hooks)

</div>

## React-Redux
React의 Component 자체는 Redux의 흐름을 타는 것이 불편하다. 그래서 React와 Redux를 연결해주는 역할을 해주는 React-Redux를 사용한다.

만약 React-Redux를 활용하지 않고 React와 Redux로만 활용을 하게 된다면. ContextAPI까지 활용하여 복잡한 로직으로 구현 해야한다.
하지만 React-Redux는 내부적으로 ContextAPI를 포함한 라이브러리로 좀 더 직관적인 코드로 구현할 수 있게 도와준다.

React-Redux를 설치해보자

``` bash
npm install react-redux --save
```

<br>

이제 Redux의 Store에 접근하는 방법을 알아보자.

<br>

### Provider 컴포넌트
말 그대로 컴포넌트이다. React로 작성된 컴포넌트들을 Provider 컴포넌트 안에 넣으면 하위 컴포넌트들이 Provider를 통해서 Redux Store에 접근이 가능해진다.

``` jsx
import React from 'react';
import { Provider } from 'react-redux'
import { Something } from './Something'

const App = () => {
  return (
    <Provider>
      <Something />
    </Provider>
  )
}
```

이런식으로 컴포넌트를 감싸주면 된다. 이제 Redux Store를 만들어서 연결시켜보자.

``` jsx
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Something } from './Something'

const App = () => {
  return (
    <Provider store={createStore(리듀서를 연결해야한다)}>
      <Something />
    </Provider>
  )
}
```
이렇게 redux의 createStore함수를 이용하여 store를 만들어주면된다. 이때 주의해야할 점은 createStore의 인수로 reducer를 넣어주어야된다.

이제 redux의 store을 접근할 수 있게 되었다.

다음은 Provider 컴포넌트 하위에 존재하는 컴포넌트들이 Store에 접근시켜주는 역할을 하는 connect 함수에 대해 알아보자.

<hr class="sub" />

### Connect(High Order Component)
Connect 함수를 통해 컨테이너를 만들어준다.

컨테이너는 Store의 state와 dispatch를 연결한 컴포넌트에 props로 넣어주는 역할을 한다.

![redux_connect](/images/redux/redux_connect_fuc.jpg "redux_connect")

코드를 살펴보자

``` jsx
import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { add } from './actions';

const Counter = props => {
  return (
    <div>
      <button onClick={() => props.add(1)}>+</button>
      {props.count}
      <button onClick={() => props.add(-1)}>-</button>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    count: state.counter.count
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    add
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
```

일단 우린

``` jsx
export default connect(mapStateToProps, mapDispatchToProps)(Counter)
```

맨 마지막 코드 부분을 먼저 살펴보자.

<br>

#### mapStateProps
mapStateProps함수의 인수로 전달된 state는 **state 전체**를 의미한다는 것을 알아두자.

``` jsx
function mapStateToProps(state) {
  return {
    count: state.counter.count
  }
}
```

return으로 count에 state.counter.count를 넣어주는데 이때 state는 전체를 의미하며 state는 객체를 갖고 있으므로 그 객체안의 reducer인 counter에 접근해 counter의 state인 count를 할당한다. 기본적으로 필요한 것만 선별하여 props로 엮는다라고 생각하면 된다.

그리고 mapStateToProps라는 함수명은 암묵적으로 개발자들이 정한 명칭이므로 지켜주는 것이 좋을 것 같다.

<hr />

#### mapDispatchToProps

``` jsx
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    add
  }, dispatch)
```

Action Creator에서 action을 만든다고 해서 아무 일도 일어나지 않는다. Reducer에게 전달하기 위해서 만든 action을 dispatch라는 함수에 넘겨줘야 전달할 수 있다.

Component쪽에 하나하나 수동으로 dispatch하는 처리 해야되는 것을 bindActionCreators와 함께 사용함으로서 한번에 action 생성부터 dispatch까지 바인딩한 함수를 props로 전달해주는 역할을 해주는 함수이다.

이렇게 하기때문에 Reducer에서 switch문으로 action type을 case별로 나누어 처리하는 이유라고 생각한다.

<hr />

#### connect 함수 결론

``` jsx
export default connect(mapStateToProps, mapDispatchToProps)(Counter)
```

1. mapStateToProps - Store가 가진 state를 어떻게 props의 전달할지 정한다
2. mapDispatchToProps - Reducer에 action을 알리는 함수 dispatch를 어떻게 props에 전달할지 정한다.
3. 두가지 함수가 적용된 props를 받을 Component를 정한다.
4. Store 상태와 dispatch를 Props로 전달받은 Component가 반환값이 된다.

<hr class="sub" />

### Hooks
Priveder로 store를 전달하는 것은 기존과 동일하다.
Hooks을 사용하면 코드가 간결해지긴하지만, 컨테이너 컴포넌트와 프레젠테이션 컴포넌트의 분리가 어려워진다라는 단점이 있다.

**컨테이너 컴포넌트**
- 어떻게 동작하는지에 관련이 있다.
- 데이터 소스 역할을 하기 때문에 상태가 자주 변하는 컴포넌트

**프레젠테이션 컴포넌트**
- 데이터를 가져오거나 변경하는 방법에 대해서 관여할 필요가 없는 컴포넌트
- 상태를 데이터가 아닌 UI 상태에 관한 것을 가지고 있는 컴포넌트

<br />

주요 2가지 Hooks

#### useSelector
store에 있는 상태를 꺼내오는 것이다.

``` jsx
import React from 'react';
import { useSelector } from 'react-redux';

export default Example = () => {
  const counter = useSelector(state => state.counter);
  return <div>{counter}</div>
}
```

<hr />

#### useDispatch
Provider에 연결된 Store에 dispatch를 꺼내오는 것이다.

``` jsx
const dispatch = useDispatch();

// 사용
dispatch(countUp())
```

<br>
<br>
<br>
<br>
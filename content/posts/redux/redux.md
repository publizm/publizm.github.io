---
title: Redux란?
date: "2020-02-01"
template: "post"
draft: false
slug: "/posts/redux/redux"
category: "Redux"
tags:
  - "Redux"
description: "Redux에 대해 알아보자"
---
<span class="notice">
  <em>TIL 내용이므로 잘못된 내용은 댓글 부탁드립니다</em>
</span>

<div id="toc">

**:link:  Table Of Contents**

- [Redux란?](#redux란)
- [Redux의 3가지](#redux의-3가지)
  - [store](#store)
  - [Action과 Action Creator](#action과-action-creator)
  - [Reducer](#reducer)
- [결론](#결론)

</div>

## Redux란?
리덕스는 상태관리 라이브러리이다. 리덕스를 사용하면 컴포넌트들의 상태 관련 로직들을 다른 파일로 분리시켜 효울적으로 관리할 수 있고, 컴포넌트간의 상태를 공유하게 될 때 상위 컴포넌트를 거치지 않고 상태 값을 전달 받을 수 있다.

만약 간단한 구조의 프로젝트일 경우 상태관리를 보다 수월하게 할 수 있지만,<br>
규모가 큰 복잡한 프로젝트일 경우 그만큼 컴포넌트가 많아져서 아래의 그림같은 구조를 하고 있다면

![redux_structor](/images/redux/redux_structor.jpg "redux_structor")

위 그림과 같이 value값을 필요한 곳으로 전달하기 위해, 해당 value 값을 사용하지 않는 컴포넌트를 거쳐야한다. 이 과정은 굉장히 비효율적이고, 원하는 컴포넌트까지 prop로 내려줘야되기 때문에 코드가 다소 복잡해질 가능성이 높다.

이러한 문제를 redux로 해결한다면? 아래의 그림과 같을 것이다.

![redux_structor2](/images/redux/redux_structor2.jpg "redux_structor2")

리덕스를 사용하면 애플리케이션이 지니고 있는 상태와, 상태 변화 로직이 들어있는 스토어를 통하여, 우리가 원하는 컴포넌트에 원하는 상태값과 함수를 다른 상위 컴포넌트를 안 거치고도 직접 주입하여줄 수 있게된다.

Redux는 엄격한 규칙이 있고, 이러한 규칙을 지키게되면 좀 더 안전하게 상태를 관리할 수 있다.

사용해보기 앞서 설치를 먼저 해보자

``` bash
npm install redux --save
```

보통 트리구조는

``` code
src
└ actions
└ reducers
└ components
App.js
index.js
```

이런식으로 분류한다

## Redux의 3가지

### Store
스토어 안에는 현재의 애플리케이션의 상태, 리듀서가 있고, 몇가지 내장함수가 있다.
**일반적으로 스토어는 하나의 애플리케이션 당 하나의 스토어를 만든다**

<br>

#### dispatch
스토어의 내장함수로서 액션을 발생 시키는 것이라고 생각하면 된다. dispatch라는 함수에는 액션 생성자함수 또는 액션을 파라미터로 전달한다.

``` jsx
const store = createStore(리듀서);

store.dispatch({ type: 'ADD_VALUE', value })
```
이런식으로 호출하면 스토어는 리듀서 함수를 실행시켜서 해당 액션을 처리하는 로직이 있다면 액션을 참고하여 새로운 상태를 만들어준다.

<hr />

#### subscribe
스토어의 내장함수로서 함수 형태의 값을 파라미터로 받아온다. subscribe 함수에 특정 함수를 전달하면, 액션이 디스패치 되었을 때마다 전달해준 함수를 호출한다.
subscribe의 리턴으로는 unsubscribe라는 점을 주의해야한다.

``` jsx
import { createStore } from 'redux';

const store = createStore(리듀서);

const unsubscribe = store.subscribe(() => {
  store.getState(); // store의 상태가 변할때마다 현재의 상태를 호출
});

unsubscribe(); // 구독취소
```

<hr />

#### getState
스토어의 내장함수로서 현재 스토어의 state를 가져올 수 있다.

``` jsx
const store = createStore(리듀서);

store.getState(); // 현재의 state를 리턴
```

<hr />

#### replaceReducer
리듀서를 변경할때 사용한다. 잘 사용하지 않는다.

``` jsx
store.replaceReducer(다른 리듀서);
```

<hr class="sub"/>

### Action과 Action Creator
상태에 어떠한 변화가 필요하게 될때 Action을 발생시키는데, 이는 하나의 객체로 표현된다.

액션 객체는 다음과 같은 형식을 갖춘다.

``` jsx
{
  type: 'ADD_VALUE'
}
```

**액션 객체는 type 필드는 필수적으로 가지고 있어야하고**, 그외의 값들은 개발자가 해당 변화가 필요한 값들로 넣어줄 수 있다.

``` jsx
{
  type: 'ADD_VALUE',
  data: {
    value: 0,
  }
}
```

하지만 매번 Action type명을 문자열로 쓰는 것은 반복적인 것을 싫어하는 개발자 입장에선 귀찮은 일이다. 이걸 좀 더 유지보수하기 쉽게 하기위해선 상수와 함수를 사용해서 쓰는 것이 일반적이다. 보통 외부 파일에서 참조할 수 있으니 export해주는 것이 좋다.

``` jsx
export const ADD_VALUE = 'ADD_VALUE';
export const addValue = value => ({ type: ADD_VALUE, value });
```

이때 addValue 함수를 Action Creator라 한다. Action 함수는 단순히 파라미터를 받아와서 액션 객체 형태로 만들어 리턴해주는 역할을 한다.

![redux_creator](/images/redux/redux_creator.jpg "redux_creator")


<hr class="sub" />

### Reducer
![redux_reducer](/images/redux/redux_reducer.jpg "redux_reducer")

이전의 State와 Action을 합쳐, 새로운 State를 만드는 역할을 한다.

``` jsx
import { ADD_VALUE } from './actions';

const INITIAL_VALUE = {
  value: 0,
};

export default function counter(state = INITIAL_VALUE, action) {
  switch (action.type) {
    case ADD_VALUE:
      return {
        ...state,
        value: state.value + action.value
      }
    default:
      return state;
  }
}
```

위에서 설명한 Action의 예제를 이어서 생각하면 Action 예제에서 ADD_VALUE라는 상수를 export 해주었다. 그것을 import 받아서 사용해보자.

**주의해야할 점은**
1. 초기상태는 Reducer에 default의 인수에서 정의를 해줘야 한다는 점<br>
  이유는 Redux에서 초기 상태를 만들때 Reducer를 호출하는데 그 시점에 state가 undefined가 되면 초기상태가 원하는대로 만들어지지 않기 때문에 초기 state를 입력해주어야한다.

2. 상태를 변경할때 state의 그 자체의 값을 변경하는 것이 아니라, 불변성을 지키면서 사용한다는 점

> **불변성을 지켜야하는 이유?**<br>
> 값만 바뀌게 되면 매번 상태의 값까지 체크해야되는데, 성능적으로 좋지 않아 좀 더 수월하게 하기위해 Redux는 참조값이 바뀌는 것을 체크하여 상태가 변경되었음을 인지하는 로직으로 구현되어있다.

<br>

불변성을 지키는 방법은 2가지가 있다.<br>
1. Object.assign을 이용하는 방법
> Object.assign(target, ...sources)<br>
> 열거할 수 있는 하나 이상의 출처 객체로부터 대상 객체로 속성을 복사할 때 사용한다. 대상 객체를 반환한다.

2. 스프레드문법

<br>

#### combineReducers
보통 Reducer는 기능별로 파일을 나누는 것이 일반적이다. 이 나누어진 파일들을 사용할때마다 따로따로 import하여 사용하기는 매우 귀찮은 일이고 실수가 분명 나올 것이다.
이렇게 나뉜 Reducer를 하나로 병합하여 사용할 수 있게 해주는 함수가 combineReducers라는 redux 함수이다.

<b>./reducers/index.js</b>

``` jsx
import { combineReducers } from 'redux';
import counter from './counter';
import doSomething from './doSomething';

export default combineReducers({
  counter,
  doSomething
});
```

이런식으로 합쳐줄 수 있다.

## 결론
Redux의 개념은 좀 어렵다.<br>
근데 은행을 빗대어 생각하면 이해하는데 조금은 도움이 된다.

``` code
지갑 - React State (체계가 없어, 상태 내역을 알 수가 없다.)

은행 - Redux

통장 - Store의 state

은행원 - Reducer

명세표 - Action
```

지갑을 React의 state라 비유해보자.

지갑에 있는 돈은 우리가 마음대로 넣고 뺄 수 있다. 하지만 일종의 체계가 없어 우리가 따로 적어놓지 않는 이상 사용내역을 알기가 어렵다.

그래서 우리는 은행에가서 통장을 만든다.

이때 은행은 Redux로 비유할 수 있고, 은행은 엄격한 체계하에 고객의 돈을 관리해준다. Redux도 엄격한 체계가 있어 우리가 관리하기는 조금 어려움이 있더라도, 확실한 상태관리를 할 수 있다.

우리는 입/출금을 할때 통장을 들고가서 거래명세표를 작성한다.

이때의 통장은 Redux의 Store의 state로 생각할 수 있고, 명세표는 action이라고 생각할 수 있다.

그리고 은행원을 Reducer라고 생각해보면,

우리는 은행원에게 통장(state)과 명세표(action)을 건네주면 기존의 통장의 내역(old state)을 덮어쓰지 않고 새로운 라인에 내역을 새긴 후 새로운 내용(new state)이 담긴 통장을 건네준다(불변성)

``` code
은행원							   Reducer
기존 통장, 입/출금 거래명세표		   기존 상태, Action

Return							   Return
새로운 내역이 추가된 통장			   새로운 State 객체
```

<br>
<br>
<br>
<br>
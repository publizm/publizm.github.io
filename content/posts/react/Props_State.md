---
title: Props와 State
date: "2020-01-05"
template: "post"
draft: false
slug: "/posts/react/Props_State"
category: "React"
tags:
  - "Props"
  - "State"
  - "setState"
description: "Props와 State에 대해 알아보자"
---
<span class="notice">
  <em>TIL 내용이므로 잘못된 내용은 댓글 부탁드립니다</em>
</span>

<div id="toc">

**:link:  Table Of Contents**

- [props](#props)
  - [클래스 컴포넌트에서의 props](#클래스-컴포넌트에서의-props)
  - [함수형 Component에서의 props](#함수형-component에서의-props)
  - [defaultProps](#defaultProps)
- [state](#state)
  - [state 정의](#state-정의)
  - [setState](#setstate)

</div>

리액트 컴포넌트에서 다루는 데이터는 두가지로 나뉜다.

1. **props**<br>
  부모 컴포넌트가 자식 컴포넌트에게 전달해주는 값, 이 값은 자식 컴포넌트에서 받아와서 사용할 수만 있을 뿐, 받아온 props를 직접 수정할 수 없다.

2. **state**<br>
  컴포넌트 내부에서 선언하고 내부에서 값을 변경할 수 있다. 만약 자식 컴포넌트에서 부모 컴포넌트의 state를 변경하고 싶은 경우에는 부모 컴포넌트에서 상태를 변경하는 메소드를 만들어 props로 자식 컴포넌트에게 전달하여 변경할 수 있다.

Hook이 나오기 이전에는 state를 class에서 밖에 상태를 관리 할 수 있어, 상태가 있어야 하는 컴포넌트는 Class Component로 상태가 필요없는 컴포넌트는 함수형 Component로 작업했던걸로 알고 있다. 하지만 Hook이 등장하여 useState Hook으로 이 부분을 해결 할 수 있게되어 코드를 간결하게 쓸 수 있는 함수형 Component를 구분없이 사용할 수 있게 되었다.

먼저 props부터 알아보자.

## props

### 클래스 컴포넌트에서의 props

<b>App.js</b>

``` jsx
import React, { Component } from 'react';
import Name from './Name'

class App extends Component {
  render() {
    return (
      <Name name="Publee">
    )
  }
}
```

App.js에서 Name이라는 컴포넌트에 태그의 속성을 설정해주는 것 처럼 작성하면 된다. 이때 name의 props의 식별자가 된다.

<b>Name.js</b>

``` jsx
import React, { Component } from 'react';

class Name extends Component {
  render() {
    console.log(this); // 아래의 이미지 참고
    return (
      <div>Hi! {this.props.name}</div>
    )
  }
}
```

Name 컴포넌트에서는 {this.props.name} 이런식으로 부모 컴포넌트로부터 props를 전달받을 수 있다.

this.props.name에서의 this안의 내용을 한번 살펴보자.

![props_this](/images/react/props_this.jpg "props_this")

이때의 this는 Name이라는 클래스, 즉 컴포넌트를 가리킨다.

이제 함수형 Component에서의 props를 알아보자

<hr class="sub" />

### 함수형 Component에서의 props

<b>App.js</b>

``` jsx
import React from 'react';
import Name from './Name'

const App = () => {
  return <Name name="Publee">;
};
```

함수형 컴포넌트에서 props 전달방식은 클래스 컴포넌트와 다를게 없다.

<b>Name.js</b>

``` jsx
import React from 'react';

const Name = props => {
  console.log(props); // { name: publee }
  return <div>Hi! {props.name}</div>;
};
```

전달받을때는 함수의 인수로 받을 수 있는데, 이때 props는 위의 그림처럼 객체에 담겨있으므로 다음과 같이 비구조화할당을 활용하여 코드의 가독성을 높일 수 있다.

``` jsx
const Name = ({ name }) => {
  return <div>Hi! {name}</div>;
};
```

이런식으로 디스트럭쳐링을 해주면 된다. 그렇게 되면 props.name으로 받아온 것을 (props.)을 생략할 수 있어 코드 가독성이 좋아진다. 하지만 위의 예시는 props가 하나이므로 가독성이 좋은지 느낌이 안온다.

위의 클래스 컴포넌트와 함수형 컴포넌트의 결과를 확인해보면 다음의 결과가 나올 것이다

![props_result](/images/react/props_result.jpg "props_result")

<hr class="sub" />

### defaultProps
추가적으로 개발자는 완벽한 사람이 아니기에 props를 빠뜨리는 실수를 할때가 있을 것이다 또는 특정 상황에 따라 props의 값이 달라져야되는 경우로 있을 것이다. 이때 props의 기본 값을 설정해줄 수 있는데, 그것은 바로 defaultProps이다.

사용법은 클래스 컴포넌트와 함수형 컴포넌트 동일하다.

예시는 함수형 component로 들어보겠다.

``` jsx
import React from 'react';
import Name from './Name'

const App = () => {
  return <Name name="Publee">;
};
```

만약 부모 컴포넌트에서 props값을 전달받지 못했다면 아래와 같이 defaultProps를 설정해주면된다.

``` jsx
import React from 'react';

const Name = ({ name }) => {
  return <div>Hi! {name}</div>;
};

Name.defaultProps = {
  name: 'publizm',
};
```

<br>

## state
동적인 데이터를 다룰땐 state를 사용한다.

``` jsx
import React, { Component } from 'react';

class Counter extends Compontent {
  // ⓐ class field를 사용한 것
  state = {
    number: 0
  }

  // ⓑ class field를 사용하지 않은 것
  constructor(props) {
    super(props);
    this.state = {
      number: 0
    }
  }

  increase = () => {
    this.setState({
      number: this.state.number + 1
    });
  }


  decrease = () => {
    this.setState({
      number: this.state.number - 1
    });
  }

  render() {
    return (
      <div>
        <h1>카운트: {this.state.number}</h1>
        <button onClick={this.increase}>+</button>
        <button onClick={this.decrease}>-</button>
      </div>
    )
  }
}
```

<br>

### state 정의
state 정의는 class field 문법을 활용한 방법(ⓐ)과 사용하지 않는 방법(ⓑ) 두가지가 있다.

> class field<br>
  현재(2020년 1월 05일)를 기준으로 아직 stage3 단계로 비표준 사양이다. 하지만 stage3 단계인 만큼 표준이 될 가능성이 높다.

class field를 사용하는 이유는 편의성 때문이다.<br>
class field를 사용하지 않는다면 constructor와 함께 정의해야하는데, 이때 super(prop)을 호출해주어야한다. 이유는 컴포넌트를 만들게 되면서 React의 Component를 상속했으며, 우리가 constructor를 작성하게 되면 기존의 클래스 생성자를 덮어쓰게 된다. 그래서 리액트 컴포넌트가 지니고있던 생성자를 super 키워드를 통하여 미리 실행하고, 그 다음에 우리가 사용할 state 설정을 해준다.

그리고 메소드를 작성함에 있어서 불편함이 있다. 불편함이란 바로 this 바인딩인데

위의 코드는 다음과 같이 메소드를 정의해 주었는데

``` jsx
increase = () => {
  this.setState({
    number: this.state.number + 1
  });
}

decrease = () => {
  this.setState({
    number: this.state.number - 1
  });
}
```

아래와 같이 [ES6 사양에서 말하는 메소드(축약 표현)](/posts/javascript/ES6-Function#메소드)로 정의할 수 있다.

``` jsx
increase() {
  this.setState({
    number: this.state.number + 1
  });
}

decrease() {
  this.setState({
    number: this.state.number - 1
  });
}
```

하지만 축약표현으로 정의한 메소드를 버튼의 클릭이벤트로 바인딩했을 경우, 해당 버튼에 클릭이벤트가 발생했을 때, this가 undefined로 잡혀 setState를 찾을 수 없다는 에러(Uncaught TypeError: Cannot read property 'setState' of undefined)가 출력된다. 이는 함수가 버튼의 클릭이벤트로 전달이 되는 과정에서 this와의 연결이 끊겼기 때문이다.

이러한 문제점을 고치기 위해서 constructor에서 해당 메소드에 bind함수를 이용하여 this를 바인딩해주면 해결된다.

``` jsx
constructor(props) {
  super(props);
  this.increase = this.increase.bind(this);
  this.decrease = this.decrease.bind(this);
}
```

하지만 이 방법도 좋진 않다. 이유는 추가가 되거나 삭제가 될때 계속 수정을 해줘야되는 번거로움이 있고, 만약 해당 컴포넌트에서의 메소드가 많다면 코드양이 늘어나게 될 것이다.

그래서 아래와 같이

``` jsx
constructor(props) {
  super(props);
  Object.getOwnPropertyNames(클래스명.prototype).forEach(key => (this[key] = this[key].bind(this)));
}
```

해당 컴포넌트의 class명의 prototype의 키값만 얻어와 그것을 forEach문으로 순환하며 this를 바인딩 시켜줘서 동적으로 this를 바인딩 시킬 수 있다.

<hr class="sub" />

### setState
state에 있는 값을 바꾸기 위해서는 만약 해당 컴포넌트가 class Component라면 this.setState를 무조건 거쳐야한다. **React에서는 setState가 호출이 되면 컴포넌트(render함수가 재실행된다)가 리렌더링 되도록 설계가 되어있다는 점을 명심하자.**

**setState는 객체로 전달되는 값만 업데이트를 해준다.**

만약 아래와 같이 state가 정의되어 있다고 가정해보자.

``` jsx
state = {
  age: 28,
  name: 'publee'
}
```

이 상태에서 다음과 같이 setState를 하게 된다면

``` jsx
this.setState({ age: 29 })
```

name은 그대로 남고, age 값만 업데이트 된다.

**setState는 객체의 깊숙한 곳 까지 확인하지 못한다.**

다음과 같이 상태가 정의되어 있다고 가정해보자.

``` jsx
state = {
  name: 'publee',
  info: {
    gender: 'male',
    nationality: 'ROK'
  }
}
```

아래와 같이 setState를 한다고 해서 해당 값이 업데이트 되지 않는다.

``` jsx
this.setState({
  info: {
    nationality: 'Korea'
  }
})
```

위와 같이 하게되면 기존의 info 객체 자체가 바뀌어 버린다.

``` jsx
state = {
  name: 'publee',
  info: {
    nationality: 'Korea'
  }
}
```

그래서 위와 같이 객체의 깊숙한 곳까지 업데이트를 하기 위해선 [ES6의 스프레드 문법](/posts/javascript/spread#스프레드-문법★)을 활용한다

``` jsx
state = {
  name: 'publee',
  info: {
    ...this.state.info,
    nationality: 'Korea'
  }
}
```

하지만 매번 이러한 작업은 번거로움으로 immutable.js 또는 immer.js 라이브러리를 활용하여 좀 더 효율적으로 할 수 있다.

**setState를 사용하여 값을 업데이트하게 될 때의 가독성을 높여보자.**

기존의 코드

``` jsx
this.setState({
  number: this.state.number + 1
});
```

굳이 또 this.state를 조회해서 + 1을 해주는데, setState에 객체 대신에 함수를 전달함으로서 가독성을 높이는 방법이 있다.

``` jsx
this.setState((state) => ({
  number: state.number + 1
}));
```

**함수를 전달하는 대신 함수의 리턴 값은 객체이다.**

여기서 비구조화할당을 활용하여 더 직관적으로 바꿀 수 있다.

``` jsx
this.setState(({ number }) => ({
  number: number + 1
}));
```

위와 같은 문법은 아래와 같이 변수로 따로 할당하여 사용할 수도 있다.

``` jsx
const { number } = this.state;
this.setState({
  number: number + 1
})
```

이상으로 props와 state를 알아보았다.

<br>
<br>
<br>
<br>
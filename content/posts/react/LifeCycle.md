---
title: LifeCycle API
date: "2020-01-07"
template: "post"
draft: false
slug: "/posts/react/LifeCycle"
category: "React"
tags:
  - "LifeCycle"
description: "LifeCycle API에 대해 알아보자"
---
<span class="notice">
  <em>TIL 내용이므로 잘못된 내용은 댓글 부탁드립니다</em>
</span>

<div id="toc">

**:link:  Table Of Contents**

- [Component Mounting](#component-mounting)
  - [constructor(props)](#constructorprops)
  - [componentDidMount](#componentdidmount)
- [Component updating](#component-updating)
  - [static getDerivedStateFromProps(nextProps, prevState)](#static-getderivedstatefrompropsnextprops-prevstate)
  - [shouldComponentUpdate(nextProps, nextState)](#shouldcomponentupdatenextprops-nextstate)
  - [getSnapshotBeforeUpdate(prevProps, prevState)](#getsnapshotbeforeupdateprevprops-prevstate)
  - [componentDidUpdate(prevProps, prevState, snapshot)](#componentdidupdateprevprops-prevstate-snapshot)
- [Component Unmounting](#component-unmounting)
  - [componentWillUnmount](#componentwillunmount)

</div>

Class Component에서의 Life Cycle에 대해서 알아보자.(**v16.3부터 deprecate된 메소드는 생략했다**)

Life Cycle API는 컴포넌트가 브라우저에 나타날때, 사라질때 그리고 상태가 업데이트될 때 호출되는 API이다.

- **Mounting**<br>
  아래의 메서드들은 컴포넌트의 인스턴스가 생성되어 DOM 상에 삽입될 때 순서대로 호출된다.
  1. constructor()
  2. static getDerivedStateFromProps()
  3. render()
  4. componentDidMount()

- **Updating**<br>
  props 또는 state가 변경되면 갱신이 발생한다. 아래의 메서드들은 컴포넌트가 다시 렌더링될 때 순서대로 호출된다.
  1. static getDerivedStateFromProps()
  2. shouldComponentUpdate()
  3. render()
  4. getSnapshotBeforeUpdate()
  5. componentDidUpdate()

- **Unmounting**<br>
  컴포넌트가 DOM 상에서 제거될 때 호출
  1. componentWillUnmount()

- **Error Handling**
  1. static getDerivedStateFromError()
  2. componentDidCatch()


## Component Mounting
컴포넌트가 브라우저에 나타나기 전,후에 호출되는 API

<br>

### constructor(props)
constructor는 컴포넌트 생성자 함수이다. 컴포넌트가 새로 만들어 질 때마다 호출된다.

``` jsx
class App extends Component {
  construcor(props) {
    super(props);
    this.state = {
      ...
    }
  }
}
```

이때 초기 state값을 설정하는 등을 할 수 있다.

<hr class="sub" />

### componentDidMount
화면에 나타난 후 호출된다. 주로 DOM을 사용해야하는 외부 라이브러리를 연동하거나, 해당 컴포넌트에서 필요로 하는 데이터를 요청하기 위해 axios, fetch 등을 통하여 데이터 요청을 하거나, DOM의 속성을 읽거나 직접 변경하는 작업 등을 한다.

``` jsx
componentDidMount() {
  ...
}
```

<br>
<br>

## Component Updating
컴포넌트의 업데이트는 props의 변화 또는 state의 변화에 따라 결정된다.

<br>

### static getDerivedStateFromProps(nextProps, prevState)
props로 받아온 값을 state로 동기화하는 작업을 해줘야할 때 사용한다.

``` jsx
static getDerivedStateFromProps(nextProps, prevState) {
  if (nextProps.value !== prevState.value) {
    return { value: nextProps.value }; // state 값
  } else {
    return null;
  }
}
```
여기서는 setState를 하는 것이 아니라, 특정 props가 바뀔때 설정하고 싶은 state 값을 리턴하는 형태로 사용된다.

<hr class="sub" />

### shouldComponentUpdate(nextProps, nextState)

컴포넌트를 최적화하는 작업에서 매우 유용하게 사용된다.
리액트에서는 변화가 발생하는 부분만 감지하여 업데이트를 하기위해 Virtual DOM을 한번 그려줘야한다. 쉽게말해 현재 컴포넌트의 상태가 업데이트 되지 않아도 부모 컴포넌트가 리렌더링(= render() 호출)되면 자식 컴포넌트들도 리렌더링(= render() 호출)되는데 이 작업은 부하가 많은 작업은 아니지만, 컴포넌트가 무수히 많이 렌더링된다면 쓸때없는 CPU 자원이 낭비된다. CPU 처리량을 줄여주기 위해서 불필요한 경우에 Virtual DOM이 리렌더링되는 것을 방지하기 위해서 shouldComponentUpdate를 사용한다.

``` jsx
shouldComponentUpdate(nextProps, nextState) {
  // return false 하면 업데이트를 안함
  // return this.props.checked !== nextProps.checked
  return true;
}
```

이 함수는 기본적으로 true를 반환하는데, 우리가 조건을 부여하여 false를 반환하면 해당 조건에서 해당 컴포넌트의 render 함수를 호출하지 않는다.

<hr class="sub" />

### getSnapshotBeforeUpdate(prevProps, prevState)
해당 API가 발생하는 시점은 아래와 같다.

1. render()
2. **getSnapshotBeforeUpdate()**
3. 실제 DOM에 변화 발생
4. componentDidUpdate

이처럼 해당 API를 통해서 DOM 변화가 일어나기 직점의 DOM의 상태를 가져오고, 여기서 리턴하는 값은 componentDidUpdate에서 3번째 파라미터로 넘겨준다.

새 데이터가 상단에 추가되었을 경우 스크롤바를 유지시키는 예제

``` jsx
getSnapshotBeforeUpdate(prevProps, prevState) {
  if (prevState.array !== this.state.array) {
    const {
      scrollTop, scrollHeight
    } = this.list;
  }

  // 여기서 반환하는 값은 componentDidMount에서 snapshot 값으로 받아올 수 있습니다.
  return {
    scrollTop, scrollHeight
  }
}

componentDidUpdate(prevProps, prevState, snapshot) {
  if (snapshot) {
    const { scrollTop } = this.list;
    if (scrollTop !== snapshot.scrollTop) return; // 기능이 이미 있다면 처리하지 않는다.
    const diff = this.list.scrollHeight - snapshot.scrollHeight;
    this.list.scrollTop += diff;
  }
}
```

<hr class="sub" />

### componentDidUpdate(prevProps, prevState, snapshot)
컴포넌트가 render()를 호출하고 난 다음 호출된다. 이 시점에서 this.props와 this.state는 변화가 이루어진 다음이다. 파라미터를 통해 prevProps와 prevState를 조회할 수 있고, getSnapshotBeforeUpdate에서 반환한 snapshot값을 받아올 수 있다.

``` jsx
componentDidUpdate(prevProps, prevState, snapshot) {
  ...
}
```

<br>
<br>

## Component Unmounting

### componentWillUnmount
컴포넌트가 더 이상 필요하지 않게 되면 해당 API가 호출된다.

``` jsx
componentWillUnmount() {
  ...
}
```

주로 등록했었던 이벤트를 제거하고, setTimout이나 setInterval를 걸은 것이 있다면 clear를 하여 제거를 한다. 추가적으로 외부 라이브러리를 사용한게 있고 해당 라이브러리에 dispose기능이 있다면 여기서 호출하면 된다.




<br>
<br>
<br>
<br>
<div class="reference-site">

  **Reference**<br>

  [velopert님의 블로그](https://velopert.com/3631)<br />
  [React 공식문서](https://reactjs.org/docs/react-component.html)

</div>
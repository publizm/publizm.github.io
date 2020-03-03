---
title: Controlled Component and Uncontrolled Component
date: "2020-01-30"
template: "post"
draft: false
slug: "/posts/react/Control"
category: "React"
tags:
  - "createRef"
  - "ref"
description: "Component Control에 대해서 공부해보자"
---
<span class="notice">
  <em>TIL 내용이므로 잘못된 내용은 댓글 부탁드립니다</em>
</span>

<div id="toc">

**:link:  Table Of Contents**

- [Controlled Component](#controlled-component)
- [Uncontrolled Component](#uncontrolled-component)

</div>

엘리먼트의 상태를 누가 관리하느냐에 따라 Controlled Component, Uncontrolled Component로 분리한다.

## Controlled Component
엘리먼트를 가지고 있는 컴포넌트가 관리한다.
React의 패러다임은 상태에 따른 조작을 권장하므로 Conrtolled Componet를 권장한다.

### 클래스 컴포넌트에서의 사용예시

``` jsx
import React, { Component } from 'react';

export class Controlled extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  change = e => {
    console.log('e', e);
    console.log(e.target, typeof e.target);
    console.log(e.target.value);

    this.setState({
      ...this.state,
      value: e.target.value,
    });
  };

  click = () => {
    console.log(this.state.value);
  };

  render() {
    return (
      <div>
        {/* 상태와 싱크를 맞추는 행위를 Controlled라고 한다 */}
        {/* value를 state로 관리하므로 onChange없이 사용할 수 없다. */}
        <input
          type="text"
          value={this.state.value}
          onChange={this.change}
        />
        <button onClick={this.click}>전송</button>
      </div>
    );
  }
}

export default Controlled;
```

<hr class="sub" />

### 함수형 컴포넌트에서의 사용예시

``` jsx
import React, { useState } from 'react';

const ControlledHook = () => {
  const [value, setValue] = useState('');

  const change = e => {
    setValue(e.target.value);
  };

  const click = () => {
    console.log(value);
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={change}
      />
      <button onClick={click}>전송</button>
    </div>
  );
};

export default ControlledHook;
```

<br>

## Uncontrolled Component
엘리먼트의 상태를 관리하지 않고, 엘리먼트의 참조만 컴포넌트가 소유

**주로 DOM을 다루기 위해 Reference를 준다** document.querySelector와 같은 DOM요소에 접근하는 것을 위해 ref가 생겼다.

해당 ref는 해당 컴포넌트에서만 사용이 가능하고, 만약 상위 컴포넌트에서 하위 컴포넌트의 dom에 접근하고 싶을때는 React.forwardRef를 활용해야한다.

### 클래스 컴포넌트에서의 사용예시

옛날 방식으로는 다음과 같이 코드를 작성했다.

```jsx
import React, { Component } from 'react';

class UnControlled extends Component {
  input;

  click = () => {
    console.log(this.input.value);
  };

  render() {
    return (
      <div>
        <input
          type="text"
          ref={ref => {
            this.input = ref;
          }}
        />
        <button onClick={this.click}>전송</button>
      </div>
    );
  }
}

export default UnControlled;
```

하지만 ref의 참조를 유지하는데 있어 위험할 수 있어서 current를 관리하게끔 아래와 같은 방식으로 변경

<br>

``` jsx
import React, { Component } from 'react';

export class UnControlled extends Component {
  inputRef = React.createRef();
  // 최초 선언시에는 null이 들어와 있다가 render 이후에 ref={}를 작동하여 current 자리에 해당 DOM을 넣어준다.
  // 상태에 넣는 것이 아니다

  mouseOver = () => {
    this.inputRef.current.focus();
  };

  click = () => {
    console.log(this.inputRef);
    console.log(this.inputRef.current.value);
  };

  render() {
    console.log(this.inputRef);
    return (
      <div>
        <input type="text" ref={this.inputRef} onMouseOver={this.mouseOver} />
        <button onClick={this.click}>전송</button>
      </div>
    );
  }
}

export default UnControlled;
```

<hr class="sub" />

### 함수형 컴포넌트에서의 사용예시

``` jsx
import React, { useState } from 'react';

const UnControlledHook = () => {
  const [value, setValue] = useState('');
  const inputRef = React.createRef();

  const change = () => {
    setValue(inputRef.current.value);
  };

  const click = () => {
    console.log(value);
  };

  return (
    <div>
      <input type="text" ref={inputRef} value={value} onChange={change} />
      <button onClick={click}>전송</button>
    </div>
  );
};

export default UnControlledHook;
```

<br>
<br>
<br>
<br>
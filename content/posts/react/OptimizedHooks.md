---
title: 성능 최적화를 위한 React Hook
date: "2020-01-01"
template: "post"
draft: false
slug: "/posts/react/OptimizedHook"
category: "React"
tags:
  - "React Hooks"
  - "useCallback"
  - "useMemo"
description: "성능 최적화를 위한 React Hook에 대해 알아보자"
---
<span class="notice">
  <em>TIL 내용이므로 잘못된 내용은 댓글 부탁드립니다</em>
</span>

<div id="toc">

**:link:  Table Of Contents**

- [Hook 사용규칙](#hook-사용규칙)
- [useCallback](#usecallback)
- [useMemo](#usememo)
- [React.Memo](#reactmemo)

</div>

React는 React Hook으로 인해 상태에 변화가 있다면 전체 컴포넌트가 렌더링된다는 점에서 원하는 곳이 아닌 다른 곳에서 상태변화가 이루어져도 같이 렌더링되어 불필요한 호출로 인해 자원이 낭비된다.

## Hook 사용규칙

### 최상위(at the Top Level)에서만 Hook을 호출해야한다.

반복문, 조건문 혹은 중첩 함수내에서 Hook을 호출할 수 없다. 항상 React 함수의 최상위에서 Hook을 호출해야한다.
위 규칙을 따라야하는 이유는 컴포넌트가 렌더링 될 때마다 항상 동일한 순서로 Hook이 호출되는 것을 보장받을 수 있기 때문이다.

<hr class="sub" />

### 오직 React 함수 내에서 Hook를 호출해야한다.

**Hook을 일반적인 Javascript 함수에서 호출하면 안된다.**

대신 아래와 같이 호출할 수 있다.

1. React 함수형 컴포넌트에서 Hook을 호출하는 경우
2. Custom Hook에서 Hook을 호출하는 경우

<br>

## useCallback
**함수 자체를 기억 하기 위한 목적으로 쓰인다. 함수를 리턴한다.**
즉 렌더링 될때마다 특정 함수를 새롭게 만들지 않고 재사용하고 싶을때 사용한다.

아래와 같이 코드를 썻을 경우

``` jsx
import React, { useState, memo } from 'react';

const Button = memo(({ onClick, count }) => {
  console.log(count);
  return (
    <button count={count} onClick={onClick}>
      버튼
    </button>
  );
});

function Counter() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  // 함수가 실행될 때마다 새로운 참조를 Button 컴포넌트의 props로 전달된다.
  const increment1 = () => {
    console.log('버튼1');
    setCount1(prev => prev + 1);
  };

  const increment2 = () => {
    console.log('버튼2');
    setCount2(prev => prev + 1);
  };

  return (
    <>
      <Button count={count1} onClick={increment1} />
      <Button count={count2} onClick={increment2} />
    </>
  );
}

export default Counter;
```

위와 같은 코드를 작성하고 첫번째 버튼을 클릭해보자.

![useCallback_01](/images/react/useCallback_01.jpg "useCallback_01")

console.log가 2개가 찍힌다. 이는 상태변화가 생겼을 경우 increment1, increment2가 props로 전달될 때 참조값이 변하여 Button 컴포넌트가 변화를 감지하고 실행되어 Button 컴포넌트 내부에 console.log가 호출되는 것이다.

React에 props로 함수가 전달되는 경우 함수코드가 동일한 코드라도 컴포넌트가 리렌더링되는 시점마다 계속 참조값이 바뀌어 React의 strict 체킹에 의해서 함수의 레퍼런스까지 체크하게되어 메모이제이션함수가 정상적으로 작동하지 않는다.

위와 같은 현상을 최적화 하기 위해서 useCallback을 이용하면 된다.

useCallback을 사용해보자

``` jsx
import React, { useState, useCallback, memo } from 'react';

const Button = memo(({ onClick, count }) => {
  console.log(count);
  return (
    <button count={count} onClick={onClick}>
      버튼
    </button>
  );
});

function Counter() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  const increment1 = useCallback(() => {
    console.log('버튼1');
    setCount1(prev => prev + 1);
  }, []);

  const increment2 = useCallback(() => {
    console.log('버튼2');
    setCount2(prev => prev + 1);
  }, []);

  return (
    <>
      <Button count={count1} onClick={increment1} />
      <Button count={count2} onClick={increment2} />
    </>
  );
}

export default Counter;
```

위와 같이 useCallback를 사용하여 원하는 기능을 제공하는 함수를 첫번째 인수로 넣어주고, 두번째 인수로는 deps 넣어주면되는데 빈 배열을 넣어주게되면 처음 렌더링시에 함수의 참조값을 유지해준다.

![useCallback_02](/images/react/useCallback_02.jpg "useCallback_02")

짜잔! 이제 console.log에 두번씩 찍히는 현상은 발생하지 않는다. 이유는 특정함수의 참조가 컴포넌트 리렌더링시 변경되지 않기 때문이다.

<br>

## useMemo
Memo는 "memoized"를 의미하는데, 이는 이전에 계산한 값을 재사용한다는 의미를 가진다.

**useMemo는 함수의 실행결과**를 기억하기 위한 목적으로 쓰이며, 함수를 실행한 결과값을 리턴한다.

``` jsx
useMemo(함수, [deps])
```

- **첫번째 파라미터**<br>
  어떻게 연산할지 정의하는 함수
- **두번째 파라미터**<br>
  deps 배열을 넣어주면 되는데, 이 배열 안에 넣은 내용이 바뀌면, 우리가 등록한 함수를 호출해서 값을 연산해주고, 만약에 내용이 바뀌지 않았다면 이전에 연산한 값을 재사용하게 된다.

이렇게 글로만 읽어서는 이해하기가 어렵다.

코드로 한번 확인해보자

``` jsx
import React, { useState, useMemo } from 'react';

export default function Usememo() {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  const words = ['react', 'node.js', 'web'];
  const word = words[wordIndex];

  const computeLetterCount = word => {
    let i = 0;
    while (i < 1000000000) i++;
    return word.length;
  };

  const letterCount = useMemo(() => computeLetterCount(word), [word]);

  return (
    <>
      {letterCount}
      <button
        onClick={() => {
          const next = wordIndex + 1 === words.length ? 0 : wordIndex + 1;
          setWordIndex(next);
        }
      }>
        단어 카운트
      </button>
      {count}
      <button onClick={() => setCount(count + 1)}>카운트</button>
    </>
  );
}
```

버튼을 두개 만들어 하나는 단어를 카운트 하게 했고, 다른 버튼 하나는 단순히 count를 올려주는 기능을 하게 만들었다.

setWordIndex로 wordIndex의 값을 변경해주고

``` jsx
const [wordIndex, setWordIndex] = useState(0);

<button
  onClick={() => {
    // 현재 wordIndex + 1의 값이 words배열의 length와 같다면 0으로 바꿔 첫번째 인덱스로 돌아가고 아니라면 + 1
    const next = wordIndex + 1 === words.length ? 0 : wordIndex + 1;
    // 위의 연산으로 뽑아낸 값을 setWrodIndex의 인수로 넘겨 상태를 변환
    setWordIndex(next);
  }
}>
```

``` jsx
const word = words[wordIndex];
```

바뀐 wordIndex값을 word 변수에 넣어서 값을 계속 변경 시켜주었다.

그리고 word의 값을 useMemo의 deps 값으로 넣어 word의 변화가 감지 될때마다 실행되게끔 작성하였다.

``` jsx
const computeLetterCount = word => {
  let i = 0;
  while (i < 1000000000) i++;
  return word.length;
};

const letterCount = useMemo(() => computeLetterCount(word), [word]);
```

computeLetterCount는 결과를 명확하게 볼 수 있도록 while문을 넣어 복잡한 연산식으로 딜레이를 주었다.

위와 같은 코드를 실행해보면,

``` jsx
{letterCount}
<button
  onClick={() => {
    const next = wordIndex + 1 === words.length ? 0 : wordIndex + 1;
    setWordIndex(next);
  }
}>
  단어 카운트
</button>
```

단어를 카운트하는 버튼은 word 상태가 변할때마다 실행되는데 computeLetterCount안의 while문의 연산으로 인해 딜레이가 생기는 반면에

``` jsx
{count}
<button onClick={() => setCount(count + 1)}>카운트</button>
```

단순 카운트하는 버튼은 딜레이 없이 즉시 실행된다.

이렇게 보면 너무나도 당연한 결과라고 생각이 든다.

하지만, useMemo를 제외한다면?

``` jsx
import React, { useState, useMemo } from 'react';

export default function Usememo() {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  const words = ['react', 'node.js', 'web'];
  const word = words[wordIndex];

  const computeLetterCount = word => {
    let i = 0;
    while (i < 1000000000) i++;
    return word.length;
  };

  const letterCount = computeLetterCount(word); // useMemo를 제거해보자

  return (
    <>
      {letterCount}
      <button
        onClick={() => {
          const next = wordIndex + 1 === words.length ? 0 : wordIndex + 1;
          setWordIndex(next);
        }
      }>
        단어 카운트
      </button>
      {count}
      <button onClick={() => setCount(count + 1)}>카운트</button>
    </>
  );
}
```

단순 카운트하는 버튼을 클릭했을때도 딜레이가 생기는 것을 확인할 수 있다.

이유는 단순 카운트의 클릭이벤트의 바인드된 useState 함수인 setCount가 실행됨으로서 리액트는 상태변화를 감지하고 컴포넌트 전체를 리렌더링하게 된다. 이때 computeLetterCount 함수가 호출되어 딜레이가 생기는 것이다.

다른 예시를 들어보면

``` jsx
import React, { useState, useMemo } from 'react';

const UseMemo2 = () => {
  const [value, setValue] = useState('');
  const [persons] = useState([
    { name: 'Mark', age: 38 },
    { name: 'Hanna', age: 27 },
  ]);

  function change(e) {
    setValue(e.target.value);
  }

  function getSum(persons) {
    return persons.map(person => person.age).reduce((a, b) => a + b, 0);
  }

  const sum = getSum(persons);

  return (
    <div>
      <input type="text" value={value} onChange={change} />
      <p>{sum}</p>
    </div>
  );
};

export default UseMemo2;
```

이때는 input에 onChange 이벤트가 발생했을때 setValue로 value의 상태를 변화를 주어 컴포넌트가 리렌더링이 되게끔 했다.

리렌더링될때마다 변수 sum에 담겨있는 getSum도 같이 호출이 되는 것을 확인할 수 있다. 하지만 getSum함수 내부에서의 상태는 persons라는 상태를 받아와서 사용하기때문에 전혀 value라는 상태와 관계가 없다.

단지 리렌더링 되면서 함수가 호출된다고 밖에 판단이 안된다. 그러면 우리는 persons가 변화가 생길때마다 getSum가 반환하는 값을 갱신시켜주면 된다.

이럴때 계산된 값을 메모이제이션 하기 위해 사용되는 것이 useMemo이다.

``` jsx
import React, { useState, useMemo } from 'react';

const UseMemo2 = () => {
  const [value, setValue] = useState('');
  const [persons] = useState([
    { name: 'Mark', age: 38 },
    { name: 'Hanna', age: 27 },
  ]);

  function change(e) {
    setValue(e.target.value);
  }

  function getSum(persons) {
    return persons.map(person => person.age).reduce((a, b) => a + b, 0);
  }

  const sum = useMemo(() => getSum(persons), [persons]);

  return (
    <div>
      <input type="text" value={value} onChange={change} />
      <p>{sum}</p>
    </div>
  );
};

export default UseMemo2;
```

이처럼 원하는 상태의 변화를 감지할때만 실행시키기 위해서 useMemo를 사용한다.

<br>

## React.memo
같은 props로 렌더링이 자주 일어나는 컴퍼넌트에 유용하며, props를 1차 레벨 비교를하여 같다면 리렌더링을 하지 않게 해준다.

클래스 컴포넌트에서는 shouldComponentUpdate시에 위와 같은 문제를 처리했었다.

``` jsx
import React, { useState, useCallback } from 'react';

const Person = React.memo(({ index, name, age, click }) => {
  console.log(name, age);
  function onClick() {
    click(index);
  }
  return (
    <li>
      {name}, {age} <button onClick={onClick}>한해가 갔다.</button>
    </li>
  );
});

const Memo = () => {
  const [value, setValue] = useState('');
  const [persons, setPersons] = useState([
    { name: 'publee', age: 29 },
    { name: 'Cheolhwan', age: 29 },
  ]);

  function change(e) {
    setValue(e.target.value);
  }

  const click = useCallback(
    index => {
      const newPersons = [...persons];
      newPersons[index].age = newPersons[index].age + 1;
      setPersons(newPersons);
    },
    [persons],
  );

  return (
    <div>
      <input type="text" value={value} onChange={change} />
      <ul>
        {persons.map((person, index) => (
          <Person
            index={index}
            key={index}
            name={person.name}
            age={person.age}
            click={click}
          />
        ))}
      </ul>
    </div>
  );
};

export default Memo;
```

<br>
<br>
<br>
<br>
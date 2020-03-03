---
title: async/await
date: "2019-12-03"
template: "post"
draft: false
slug: "/posts/javascript/async_await"
category: "Javascript"
tags:
  - "async/await"
  - "비동기처리"
description: "async/await을 알아보자"
---
<span class="notice">
  <em>TIL 내용이므로 잘못된 내용은 댓글 부탁드립니다</em>
</span>

<div id="toc">

**:link:  Table Of Contents**

- [async/await의 탄생 배경](#asyncawait의-탄생-배경)
- [async/await의 기본 문법](#asyncawait의-기본-문법)
  - [async/await 예제](#asyncawait-예제)
  - [async/await 예외처리](#asyncawait-예외처리)
- [async/await 활용](#asyncawait-활용)

</div>

## async/await의 탄생 배경
- Promise를 사용했을 경우 에러 처리하였을 시 어느 후속처리에서 발생했는지 파악하기가 어려움이 있다.
- then으로 이어지기 때문에 분기처리하는데 있어서 어려움이 있다.
- 특정 값을 공유하며 작업하기 번거롭다.

## async/await의 기본 문법

``` javascript
async function 함수명() {
  await 비동기처리함수명();
}
```

await을 사용하기 위해서는 **해당 부모 함수**에 async 키워드가 존재해야한다.

<br>

이때 해당 부모 함수란?
``` javascript
async function 함수명() {
  function 부모함수() {
    await 비동기처리함수명();
  }
}
```

위와 같이 부모함수를 일반 함수로 처리하게 되면 정상적으로 작동하지 않게 된다. 한마디로 await은 async 함수 바로 아래에 쓰여야된다.
그리고 await 키워드는 **Promise 객체를 생성하는 함수**에 사용한다.

<br>

### async/await 예제

``` javascript
const item = value => {
  return new Promise(resolve => resolve(value))
};

const asynchronous = async () => {
  let result = await item([1, 2, 3]);
  console.log(result);
};

asynchronous(); // [1, 2, 3]
```

item 함수는 Promise 객체를 반환하는 함수이다. item 함수를 실행하면 프로미스가 resolve되어 결과값은 파라미터로 전달받은 값이 된다.

asynchronous 함수를 호출하면 result에 할당된 값([1, 2, 3])이 console.log로 호출되어 나온다.

await를 사용하지 않았다면 데이터를 받아온 시점에 콘솔을 출력할 수 있도록 콜백 함수나 .then()등을 사용해야한다. 하지만 async await 문법으로 코드를 쓰여진 순서대로 작동되는 것과 같이 예측이 가능해졌다.

<br>

위의 await에 대한 설명으로는 이해하기 어려우니 코드로 보면

``` javascript
const timer = ms => {
  return new Promise(resolve =>
    setTimeout(() => {
      resolve(console.log("비동기완료"));
    }, ms)
  );
};

const asynchronous = async () => {
  console.log("시작");
  timer(2000);
  console.log("끝");
};

asynchronous();
```

위 코드를 asynchronous 함수를 호출했을때,<br>

``` code
"시작"
**2초 뒤** "비동기 완료"
"끝"
```

이런식으로 코드의 순서대로 출력될 것을 기대하게 된다.

하지만 위 코드는 우리가 기대한대로 작동하지 않고, "시작", "끝", "비동기완료" 이런식으로 출력된다.

<br>

이러한 문제를 아래와 같이 await 키워드로 해결할 수 있다.

``` javascript
const timer = ms => {
  return new Promise(resolve =>
    setTimeout(() => {
      resolve(console.log("비동기완료"));
    }, ms)
  );
};

const asynchronous = async () => {
  console.log("시작");
  await timer(2000);
  console.log("끝");
};

asynchronous();
```
위 코드를 asynchronous 함수를 호출했을때,<br>

``` code
"시작"
**2초 뒤** "비동기 완료"
"끝"
```

await 키워드를 사용함으로써 비동기 처리가 완료된 후 다음 코드를 실행하는 것을 확인할 수 있다. 즉, 개발자가 예측이 가능하도록 순서대로 실행된다.

<hr class="sub" />

### async/await 예외처리
async/await의 예외처리는 try/catch를 사용한다.

위의 예제 코드를 통해서 예외를 처리하는 코드를 작성해보면

``` javascript
const asynchronous = async () => {
  try {
    console.log("시작");
    await timer(2000);
    console.log("끝");
  } catch (err) {
    console.error(err);
  }
};
```

catch로는 코드를 실행하다가 발생한 네트워크 통신 오류 뿐만 아니라 간단한 타입 오류 등의 일반 오류까지도 잡아낼 수 있다.

<br>

## async/await 활용
try문안에서 분기처리 혹은 받아온 데이터를 가공하여 새로운 Promise 객체로 만들때 등등 많은 곳에서 활용이 가능하다는 장점이 있다.

예를들어 사용자의 데이터를 받아와서 수정하고 저장할때의 코드가 있다고 가정한다면

``` javascript
const modifyUserInfo = async id => {
  try {
    let user = await users.find(id);
    user.name = 'cheolhwan';
    user = await user.save();
  } catch (err) {
    console.error(err);
  }
}

modifyUserInfo('publee')
```

위와 같이 활용할 수 있다.

<br>
<br>
<br>
<br>
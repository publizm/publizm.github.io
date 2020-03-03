---
title: 프로미스(Promise)
date: "2019-11-23"
template: "post"
draft: false
slug: "/posts/javascript/Promise"
category: "Javascript"
tags:
  - "Promise"
  - "REST API"
description: "프로미스(Promise)에 대해 알아보자"
---
<span class="notice">
  <em>TIL 내용이므로 잘못된 내용은 댓글 부탁드립니다</em>
</span>

<div id="toc">

**:link:  Table Of Contents**

- [콜백 패턴의 단점](#콜백-패턴의-단점)
  - [콜백 헬](#콜백-헬)
  - [에러 처리의 한계](#에러-처리의-한계)
- [프로미스(Promise)](#프로미스promise)
  - [프로미스의 후속 처리 메소드](#프로미스의-후속-처리-메소드)
  - [프로미스의 에러 처리](#프로미스의-에러-처리)
  - [프로미스 체이닝](#프로미스-체이닝)
  - [프로미스의 정적 메소드](#프로미스의-정적-메소드)
      - [Promise.resolve / Promise.reject](#promiseresolve--promisereject)
      - [Promise.all](#promiseall)
      - [Promise.race](#promiserace)

</div>

<br>

<b>자바스크립트는 비동기 처리를 위한 하나의 패턴으로 콜백함수를 사용한다.</b>

## 콜백 패턴의 단점

### 콜백 헬
비동기식 처리모델은 병렬적으로 태스크를 수행한다. **task가 종료되지 않은 상태라 하더라도 대기하지 않고 즉시 다음 태스크를 실행한다.** 자바스크립트의 대부분의 DOM 이벤트와 Timer 함수, Ajax요청은 비동기식 처리 모델로 동작한다.

**비동기 처리를 위해 콜백 패턴을 사용하면 처리 순서를 보장하기 위해 여러개의 콜백 함수가 중첩되어 복잡도가 높아지는 콜백 헬이 발생된다는 단점이 있다.**

콜백 헬은 가독성을 나쁘게하며 실수를 유발하는 원인이 된다.

아래의 예제가 바로 콜백 헬이 발생하는 전형적인 예시이다.

``` javascript
step1(function(value1) {
  step2(value1, function(value2) {
    step3(value2, function(value3) {
      step4(value3, function(value4) {
        step5(value4, function(value5) {
            // value5를 사용하는 처리
        });
      });
    });
  });
});
```

비동기 처리 모델은 실행 완료를 기다리지 않고 즉시 다음 테스크를 실행한다. 따라서 비동기 함수내에서 처리 결과를 반환하면 기대한 결과로 동작하지 않는다.

``` html
<!DOCTYPE html>
<html>
<body>
  <script>
    // 비동기 함수
    function get(url) {
      // XMLHttpRequest 객체 생성
      const xhr = new XMLHttpRequest();

      // 서버 응답 시 호출될 이벤트 핸들러
      xhr.onreadystatechange = function () {
        // 서버 응답 완료가 아니면 무시
        if (xhr.readyState !== XMLHttpRequest.DONE) return;

        if (xhr.status === 200) { // 정상 응답
          console.log(xhr.response);
          // 비동기 함수의 결과에 대한 처리는 반환할 수 없다.
          return xhr.response; // ①
        } else { // 비정상 응답
          console.log('Error: ' + xhr.status);
        }
      };

      // 비동기 방식으로 Request 오픈
      xhr.open('GET', url);
      // Request 전송
      xhr.send();
    }

    // 비동기 함수 내의 readystatechange 이벤트 핸들러에서 처리 결과를 반환(①)하면 순서가 보장되지 않는다.
    const res = get('http://jsonplaceholder.typicode.com/posts/1');
    console.log(res); // ② undefined
  </script>
</body>
</html>
```

비동기 함수 내의 ready statechange 이벤트 핸들러에서 처리한 결과를 반환(①)하면 순서가 보장되지 않는다. 즉, ②에서 get 함수가 반환한 값을 참조할 수 없다.

get 함수가 호출되면 get 함수의 실행 컨텍스트가 생성되고 호출 스택에서 실행된다. get 함수가 반환하는 xhr.response는 readystatechange 이벤트 핸들러가 반환한다. readystatechange 이벤트는 발생하는 시점을 명확히 알 수는 없지만 반드시 get 함수가 종료한 이후 발생한다. get 함수의 마지막 문인 xhr.send()가 실행되어야 request를 전송하고 request를 전송해야 readystatechange 이벤트가 발생하기 때문이다.


get 함수가 종료하면 곧바로 console.log(②)가 호출되어 호출 스택에 들어가 실행된다. console.log가 호출되기 직전에 readystatechange 이벤트는 이미 발생했다 하더라도 이벤트 핸들러는 console.log보다 먼저 실행되지 않는다.

이유는 **readystatechange 이벤트의 이벤트 핸들러는 이벤트가 발생하면 즉시 실행되는 것이 아니고, 태스트 큐로 들어가고 호출 스택이 비면 그때 이벤트 루프에 의해 호출 스택으로 들어가 실행된다.** console.log 호출 시점 이전에 readystatechange 이벤트가 이미 발생했다하더라도 get 함수가 종료하면 바로 console.log가 호출되어 호출 스택에 들어가기 때문에 readystatechange 이벤트의 이벤트 핸들러는 console.log가 종료되어 호출 스택에서 빠진 이후 실행되게 된다.

비동기 함수의 처리결과를 반환하는 경우, 순서가 보장되지 않기 때문에 그 반환 결과를 가지고 후속처리를 할 수 없다. 즉, 비동기 함수의 처리 결과에 대한 후속처리는 비동기 함수의 콜백 함수 내에서 처리해야한다.

만일 **비동기 함수의 처리 결과를 가지고 다른 비동기 함수를 호출해야 하는 경우, 함수의 호출이 중첩되어 복잡도가 높아지는 현상이 발생하는데 이 현상을 *Callback Hell이라 한다.**

<hr class="sub" />

### 에러 처리의 한계

콜백 방식의 비동기 처리가 갖는 문제점 중에서 가장 심각한 것은 에러 처리가 곤란하다는 것이다.

``` javascript
try {
  setTimeout(() => { throw new Error('Error!'); }, 1000);
} catch (e) {
  console.log('에러를 캐치하지 못한다..');
  console.log(e);
}
```
try 블록 내에서 setTimeout 함수(비동기 함수)가 실행되면 1초 후에 콜백함수가 실행되고 이 콜백함수는 예외를 발생시킨다. 하지만 이 예외는 catch 블록에서 캐치되지 않는다.

그 이유는 setTimeout 함수는 비동기 함수이므로 콜백함수가 실행될 때까지 기다리지 않고 즉시 종료되어 호출 스택에서 제거된다. 이후 **tick** 이벤트가 발생하면 setTimeout 함수의 콜백함수는 태스트 큐로 이동한 후 호출 스택이 비워졌을때 호출 스택으로 이동되어 실행된다.

이때 setTimeout 함수는 이미 호출 스택에서 제거된 상태 이므로 이것은 setTimeout 함수의 콜백함수를 호출한 것은 setTimeout 함수가 아니다라는 것을 의미한다. setTimeout 함수의 콜백함수의 호출자(caller)가 setTimeout 함수라면 호출 스택에 setTimeout 함수가 존재해야하기 때문이다.

**예외는 호출자 방향으로 전파된다.** 따라서 setTimeout 함수의 콜백 함수 내에서 발생시킨 에러는 catch 블로게서 캐치되지 않아 프로세스는 종료된다.

<br>

## 프로미스(Promise)

위에서의 콜백 패턴의 문제를 극복하기 위해 Promise가 제안되어 ES6부터 등장하여 IE를 제외한 대부분의 브라우저가 지원하고 있다.

### 프로미스의 생성
프로미스는 Promise 생성자 함수를 통해 인스턴스화한다. <b>Promise 생성자 함수는 비동기 작업을 수행할 콜백함수를 인자로 받는데 이 콜백 함수는 resolve와 reject 함수를 인자로 전달 받는다.</b>

``` javascript
// Promise 객체의 생성
const promise = new Promise((resolve, reject) => {
  // 비동기 작업을 수행한다.

  if (/* 비동기 작업 수행 성공 */) {
    resolve('result');
  }
  else { /* 비동기 작업 수행 실패 */
    reject('failure reason');
  }
});
```

Promise는 비동기 처리가 성공(fulfilled)하였는지 또는 실패(rejected)하였는지 등의 상태(state) 정보를 갖는다.

<br>

<article class="board-tbl">

| 상태 | 의미 | 구현 |
| :-------: | :---------- | :----------- |
| pending | 비동기 처리가 아직 수행되지 않은 상태 | resolve 또는 reject 함수가 아직 호출되지 않은 상태 |
| **fulfilled** | 비동기 처리가 수행된 상태 (성공) | resolve 함수가 호출된 상태 |
| **rejected**  | 비동기 처리가 수행된 상태 (실패) | reject 함수가 호출된 상태 |
| settled | 비동기 처리가 수행된 상태 (성공 또는 실패) | resolve 또는 reject 함수가 호출된 상태 |

</article>

<br>

Promise 생성자 함수가 인자로 전달받은 콜백 함수는 내부에서 비동기 처리 작업을 수행한다. 이때 비동기 처리가 성공하면 콜백 함수의 인자로 전달받은 resolve 함수를 호출한다. 이때 프로미스는 ‘fulfilled’ 상태가 된다. 비동기 처리가 실패하면 reject 함수를 호출한다. 이때 프로미스는 ‘rejected’ 상태가 된다. Promise를 사용하여 비동기 함수를 정의해보자.

<br>

``` javascript
const promiseAjax = (method, url, payload) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(payload));

    xhr.onreadystatechange = function () {
      // 서버 응답 완료가 아니면 무시
      if (xhr.readyState !== XMLHttpRequest.DONE) return;

      if (xhr.status >= 200 && xhr.status < 400) {
        // resolve 메소드를 호출하면서 처리 결과를 전달
        resolve(xhr.response); // Success!
      } else {
        // reject 메소드를 호출하면서 에러 메시지를 전달
        reject(new Error(xhr.status)); // Failed...
      }
    };
  });
};
```

위 예제처럼 비동기 함수 내에서 Promise 객체를 생성하고 그 내부에서 비동기 처리를 구현한다. 이때 비동기 처리에 성공하면 resolve 메소드를 호출한다. 이때 resolve 메소드의 인자로 비동기 처리 결과를 전달한다. 이 처리 결과는 Promise 객체의 후속 처리 메소드로 전달된다. 만약 비동기 처리에 실패하면 reject 메소드를 호출한다. 이때 reject 메소드의 인자로 에러 메시지를 전달한다. 이 에러 메시지는 Promise 객체의 후속 처리 메소드로 전달된다.

<hr class="sub" />

### 프로미스의 후속 처리 메소드
**Promise로 구현된 비동기 함수는 Promise 객체를 반환하여야한다.** Promise로 구현된 비동기 함수를 호출하는 측에서는 Promise 객체의 후속처리 메소드를 통해 비동기 처리 결과 또는 에러 메시지를 전달받아 처리한다.

Promise 객체는 상태를 갖고, 이 상태에 따라 후속 처리 메소드를 체이닝 방식으로 호출한다.

후속처리메소드는 2가지가 있다.

> **then**<br>
then 메소드는 두 개의 콜백 함수를 인자로 전달 받는다. 첫 번째 콜백함수는 성공(fulfilled, resolve 함수가 호출된 상태)시 호출되고 두 번째 함수는 실패(rejected, reject 함수가 호출된 상태) 시 호출된다.<br>
**then 메소드는 Promise를 반환한다.**

> **catch**<br>
예외(비동기 처리에서 발생한 에러와 then 메소드에서 발생한 에러)가 발생하면 호출된다.<br>
catch 메소드는 Promise를 반환한다.

프로미스로 정의한 비동기 함수 get을 사용해 보자.

``` html
<!DOCTYPE html>
<html>
<body>
<!DOCTYPE html>
<html>
<body>
  <pre class="result"></pre>
  <script>
    const $result = document.querySelector('.result');
    const render = content => { $result.textContent = JSON.stringify(content, null, 2); };

    const promiseAjax = (method, url, payload) => {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(payload));

        xhr.onreadystatechange = function () {
          if (xhr.readyState !== XMLHttpRequest.DONE) return;

          if (xhr.status >= 200 && xhr.status < 400) {
            resolve(xhr.response); // Success!
          } else {
            reject(new Error(xhr.status)); // Failed...
          }
        };
      });
    };

    /*
      비동기 함수 promiseAjax은 Promise 객체를 반환한다.
      Promise 객체의 후속 메소드를 사용하여 비동기 처리 결과에 대한 후속 처리를 수행한다.
    */
    promiseAjax('GET', 'http://jsonplaceholder.typicode.com/posts/1')
      .then(JSON.parse)
      .then(
        // 첫 번째 콜백 함수는 성공(fulfilled, resolve 함수가 호출된 상태) 시 호출된다.
        render,
        // 두 번째 함수는 실패(rejected, reject 함수가 호출된 상태) 시 호출된다.
        console.error
      );
  </script>
</body>
</html>
```

<hr class="sub" />

### 프로미스의 에러 처리
위의 예제에서 비동기 처리시 발생한 에러 메시지를 then메소드의 두 번째 콜백함수로 전달하였었다. 다른 방법으로는 Promise 객체의 후속 처리 메소드 catch를 사용하여도 에러를 처리할 수 있다.

``` javascript
promiseAjax('GET', 'http://jsonplaceholder.typicode.com/posts/1')
  .then(JSON.parse)
  .then(render)
  .catch(console.error);
```

catch 메소드는 에러를 처리한다는 점에서 then 메소드의 두 번째 콜백 함수와 유사하지만 미묘한 차이가 있다.

then 메소드의 두 번째 콜백 함수는 비동기 처리에서 발생한 에러(reject 함수가 호출된 상태)만을 캐치한다.

catch 메소드는 비동기 처리에서 발생한 에러(reject 함수가 호출된 상태)뿐만 아니라 then 메소드 내부에서 발생한 에러도 캐치한다.

따라서 에러 처리는 catch 메소드를 사용하는 편이 보다 효율적이다.

<hr class="sub" />

### 프로미스 체이닝
비동기 함수 처리 결과를 가지고 다른 비동기 함수를 호출해야하는 경우, 함수의 호출이 중첩이 되어 복잡도가 높아지는 콜백 헬이 발생한다.

프로미스는 후속처리 메소드를 체이닝하여 여러 개의 프로미스를 연결하여 사용할 수 있다. 따라서 then 메소드가 Promise 객체를 반환하도록 하면 여러 개의 프로미스를 연결하여 사용할 수 있다.

아래의 예제는 서버로 부터 특정 포스트를 취득한 후, 그 포스트를 작성한 사용자의 아이디로 작성된 모든 포스트를 검색하는 예제이다.

``` html
<!DOCTYPE html>
<html>
<body>
  <pre class="result"></pre>
  <script>
    const $result = document.querySelector('.result');
    const render = content => { $result.textContent = JSON.stringify(content, null, 2); };

    const promiseAjax = (method, url, payload) => {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(payload));

        xhr.onreadystatechange = function () {
          if (xhr.readyState !== XMLHttpRequest.DONE) return;

          if (xhr.status >= 200 && xhr.status < 400) {
            resolve(xhr.response); // Success!
          } else {
            reject(new Error(xhr.status)); // Failed...
          }
        };
      });
    };

    const url = 'http://jsonplaceholder.typicode.com/posts';

    // 포스트 id가 1인 포스트를 검색하고 프로미스를 반환한다.
    promiseAjax('GET', `${url}/1`)
      // 포스트 id가 1인 포스트를 작성한 사용자의 아이디로 작성된 모든 포스트를 검색하고 프로미스를 반환한다.
      .then(res => promiseAjax('GET', `${url}?userId=${JSON.parse(res).userId}`))
      .then(JSON.parse)
      .then(render)
      .catch(console.error);
  </script>
</body>
</html>
```

<hr class="sub" />

### 프로미스의 정적 메소드
Promise는 주로 생성자 함수로 사용되지만 함수도 객체이므로 메소드를 가질 수 있다.<br>
Promise 객체는 4가지의 정적 메소드를 제공한다.

<br>

#### Promise.resolve / Promise.reject
두개의 메소드는 존재하는 값을 Promise로 래핑하기 위해 사용한다.

Promise.resolve 메소드는 인자로 전달된 값을 resolve하는 Promise를 생성한다.

``` javascript
const resolvedPromise = new Promise(resolve => resolve([1, 2, 3]));
resolvedPromise.then(console.log); // [ 1, 2, 3 ]
```

Promise.reject 메소드는 인자로 전달된 값을 reject하는 프로미스를 생성한다.

``` javascript
const rejectedPromise = new Promise((resolve, reject) => reject(new Error('Error!')));
rejectedPromise.catch(console.log); // Error: Error!
```

<hr />

#### Promise.all
Promise.all 메소드는 프로미스가 담겨 있는 **배열 등의 이터러블**을 인자로 전달 받는다. 그리고 전달받은 모든 프로미스를 병렬로 처리하고 그 처리 결과를 resolve하는 새로운 프로미스를 반환한다.

``` javascript
Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(console.log) // [ 1, 2, 3 ]
  .catch(console.log);
```

Promise.all 메소드는 전달받은 모든 프로미스를 병렬로 처리한다. 이때 모든 프로미스의 처리가 종료될 때까지 기다린 후 아래와 모든 처리 결과를 resolve 또는 reject한다.

- 모든 프로미스의 처리가 성공하면 각각의 프로미스가 resolve한 처리 결과를 배열에 담아 resolve하는 새로운 프로미스를 반환한다. 이때 첫번째 프로미스가 가장 나중에 처리되어도 Promise.all 메소드가 반환하는 프로미스는 첫번째 프로미스가 resolve한 처리 결과부터 차례대로 배열에 담아 그 배열을 resolve하는 새로운 프로미스를 반환한다. 즉, 처리 순서가 보장된다.
- 프로미스의 처리가 하나라도 실패하면 가장 먼저 실패한 프로미스가 reject한 에러를 reject하는 새로운 프로미스를 즉시 반환한다.

``` javascript
Promise.all([
  new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error 1!')), 3000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error 2!')), 2000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error 3!')), 1000))
]).then(console.log)
  .catch(console.log); // Error: Error 3!
```

위 예제의 경우, 세번째 프로미스가 가장 먼저 실패(이터러블이 아님)하므로 세번째 프로미스가 reject한 에러가 catch 메소드로 전달된다.

Promise.all 메소드는 전달 받은 이터러블의 요소가 프로미스가 아닌 경우, Promise.resolve 메소드를 통해 프로미스로 래핑된다.

``` javascript
Promise.all([
  1, // => Promise.resolve(1)
  2, // => Promise.resolve(2)
  3  // => Promise.resolve(3)
]).then(console.log) // [1, 2, 3]
  .catch(console.log);
```

<hr />

#### Promise.race

Promise.race 메소드는 Promise.all 메소드와 동일하게 프로미스가 담겨 있는 배열 등의 이터러블을 인자로 전달 받는다. 그리고 Promise.race 메소드는 Promise.all 메소드처럼 모든 프로미스를 병렬 처리하는 것이 아니라 가장 먼저 처리된 프로미스가 resolve한 처리 결과를 resolve하는 새로운 프로미스를 반환한다.

``` javascript
Promise.race([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(console.log) // 3
  .catch(console.log);
```

에러가 발생한 경우는 Promise.all 메소드와 동일하게 처리된다. 즉, Promise.race 메소드에 전달된 프로미스 처리가 하나라도 실패하면 가장 먼저 실패한 프로미스가 reject한 에러를 reject하는 새로운 프로미스를 즉시 반환한다.

``` javascript
Promise.race([
  new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error 1!')), 3000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error 2!')), 2000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error 3!')), 1000))
]).then(console.log)
  .catch(console.log); // Error: Error 3!
```

<br>
<br>
<br>
<br>
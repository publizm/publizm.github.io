---
title: 실행 컨텍스트
date: "2019-10-27"
template: "post"
draft: false
slug: "/posts/javascript/execution-context"
category: "Javascript"
tags:
  - "scope"
  - "stack"
  - "context"
  - "record"
description: "실행 컨텍스트에 대해 알아보자"
---
<span class="notice">
  <em>TIL 내용이므로 잘못된 내용은 댓글 부탁드립니다</em>
</span>

<div id="toc">

**:link:  Table Of Contents**

- [실행 가능한 코드](#실행-가능한-코드)
- [실행 가능한 코드의 평가와 실행](#실행-가능한-코드의-평가와-실행)
- [실행 컨텍스트의 역할](#실행-컨텍스트의-역할)
- [실행 컨텍스트 스텍](#실행-컨텍스트-스텍)
- [동기식 처리 모델과 비동기식 처리 모델](#동기식-처리-모델과-비동기식-처리-모델)
  - [동기식 처리 모델(Synchronous processing model)](#동기식-처리-모델synchronous-processing-model)
  - [비동기식 처리 모델(Asynchronous processing model)](#비동기식-처리-모델asynchronous-processing-model)
- [렉시컬 환경](#렉시컬-환경)
- [실행 컨텍스트의 생성과 식별자 검색 과정](#실행-컨텍스트의-생성과-식별자-검색-과정)
  - [1. 전역 객체 생성](#1-전역-객체-생성)
  - [2. 전역 코드 평가](#2-전역-코드-평가)
      - [1. 전역 실행 컨텍스트를 생성](#1-전역-실행-컨텍스트를-생성br)
      - [2. 전역 렉시컬 환경 생성](#2-전역-렉시컬-환경-생성br)
  - [3. 전역 코드 실행](#3-전역-코드-실행)
      - [1. 함수 실행 컨텍스트 생성](#1-함수-실행-컨텍스트-생성)
      - [2. 함수 렉시컬 환경 생성](#2-함수-렉시컬-환경-생성)
      - [3. 함수 코드 실행](#3-함수-코드-실행)
      - [4. 함수 코드 종료](#4-함수-코드-종료)
  - [4. 전역 코드 실행종료](#4-전역-코드-실행종료)
- [실행 컨텍스트와 블록 레벨 스코프](#실행-컨텍스트와-블록-레벨-스코프)

</div>

자바스크립트 엔진이 관리하는 객체이며, 실행 컨텍스트는 식별자, 스코프, 호이스팅, 클로저 등의 동작원리를 담고 있는 자바스크립트의 핵심 개념이다.

## 실행 가능한 코드
ECMAScript 사양은 실행 가능한 코드를 4가지 유형으로 구분한다.


<article class="board-tbl">

| 실행 가능한 코드 | 설명 |
| :---- | :---- |
| 전역 코드(Global code) | **전역**에 존재하는 텍스트 코드를 말한다. **전역에 정의된 함수, 클래스 등의 내부 코드는 포함되지 않는다.** |
| 함수 코드(Function code) | **함수 내부**에 존재하는 텍스트 코드를 말한다. **함수 내부에 중첩된 함수, 클래스 등의 내부 코드는 포함되지 않는다.** |
| eval 코드(Eval code) | 빌트인 전역 함수인 eval 함수에 인수로 전달된 텍스트 코드를 말한다. |
| 모듈 코드(Module code) | 모듈 내부에 존재하는 텍스트 코드를 말한다. 모듈 내부의 함수, 클래스 등의 내부 코드는 포함되지 않는다. |

</article>

각 유형마다 실행 컨텍스트를 생성하는 과정과 관리 내용이 다르다.

1. 전역 코드<br>
  전역 코드는 **전역 스코프**를 생성해야하며 전역 객체와 연결되어야 한다. 이를 위해 전역 코드가 평가되면 전역 실행 컨텍스트가 생성된다.
2. 함수 코드<br>
  함수 코드는 **지역 스코프**를 생성해야 하며 생성된 지역 스코프는 스코프체인의 최상위인 전역 스코프에서 시작하는 스코프 체인의 일원으로 연결되어야 한다. 이를 위해 함수 코드가 평가되면 함수 실행 컨텍스트가 생성된다.
3. eval 코드<br>
  eval 코드는 엄격 모드(strict mode)에서 자신만의 독자적인 스코프를 생성한다. 이를 위해 eval 코드가 평가되면 eval 실행 컨텍스트가 생성된다.
4. 모듈 코드<br>
  모듈 코드는 모듈 별로 독립적인 스코프를 생성한다. 이를  위해 모듈 코드가 평가되면 모듈 실행 컨텍스트가 생성된다.

## 실행 가능한 코드의 평가와 실행
- 코드의 평가<br>
  실행 컨텍스트가 생성되고 변수, 함수, 클래스 등의 선언문이 평가되어 그 결과가 생성된 실행 컨텍스트에 등록된다.

- 코드의 실행<br>
  선언문을 제외한 코드가 순차적으로 실행된다. 이때 코드 실행에 필요한 정보를 실행 컨텍스트에서 취하고, 그 코드의 실행 결과를 실행 컨텍스트에 등록하여 관리된다.

![context](/images/javascript/context.jpg "context")

## 실행 컨텍스트의 역할
예제를 보며 자세히 알아보자
``` javascript
// ①, ②

// 전역 변수 선언
const x = 1;
const y = 2;

function foo(a) { // ③
  const x = 10;
  const y = 20;

  // 메소드 호출 ④
  console.log(a + x + y); // 130
}

// 함수 호출
foo(100);

// 메소드 호출
console.log(x + y); // 3
```

**① 전역 코드 평가**<br>
전역의 변수 선언문과 함수 선언문이 평가되고 그 결과, 전역 변수와 전역 함수는 전역 스코프에 등록된다. var 키워드로 선언된 전역 변수와 함수 선언문으로 정의된 전역 함수는 전역 객체의 프로퍼티가 된다.

**② 전역 코드 실행**<br>
전역 코드의 평가가 종료되면 순차적으로 전역 코드가 실행되어 전역 변수에 값이 할당되고 함수가 호출된다. 함수가 호출되면 순차적으로 실행되던 전역 코드의 실행을 일시 중단하고 코드 실행 순서를 변경하여 함수 내부로 진입한다.

**③ 함수 코드 평가**<br>
함수 내부의 문들을 실행하기전에 먼저 함수 내부의 문들을 평가한다. 이때 매개 변수와 지역 변수 선언문이 평가되고 지역 스코프에 등록된다. 또한 함수 내부에서 지역 변수처럼 사용할 수 있는 arguments 객체도 생성되어 지역 스코프에 등록된다.

**④ 함수 코드 실행**<br>
함수 코드 평가가 종료하면 순차적으로 함수 코드가 실행되어 매개 변수와 지역 변수에 값이 할당되고 foo함수 내부의 console.log 메소드가 호출된다.

console.log 메소드의 실행이 종료되면 foo 함수 코드의 실행이 종료되고 foo 함수 호출 이전으로 되돌아가 전역 코드 실행을 계속한다. 이처럼 코드가 실행되려면 스코프를 구분하여 식별자와 바인딩된 값을 관리할 수 있어야 한다. 그리고 중첩 관계에 의해 스코프 체인을 형성하여 식별자를 검색할 수 있어야 하고, 전역 객체의 프로퍼티도 전역 변수처럼 검색할 수 있어야 한다.

이 모든 것을 관리하는 것이 바로 실행 컨텍스트이다. <b>실행 컨텍스트는 실행 가능한 코드를 평가하고 실행하기 위해 필요한 환경을 제공하고 코드의 실행 결과를 실제로 관리하는 영역이다.</b>

## 실행 컨텍스트 스텍
``` javascript
const x = 1;

function foo () {
  const y = 2;

  function bar () {
    const z = 3;
    console.log(x + y + z);
  }
  bar();
}

foo(); // 6
```
자바스크립트 엔진은 먼저 전역 코드를 평가하여 전역 컨텍스트를 생성한다. 그리고 함수가 호출되면 함수 코드를 평가하여 함수 실행 컨텍스트를 생성한다.

이때 생성된 실행 컨텍스트는 <b>스택(Stack) 자료 구조로 관리된다.</b>이를 실행 컨텍스트 스택이라고 부른다.

> 실행 컨텍스트 스택을 콜 스택이라고 부르기도 한다.

위 코드를 실행하는 순서는
1. 전역 코드의 평가와 실행
2. foo 함수 코드의 평가와 실행
3. bar 함수 코드의 평가와 실행
4. foo 함수 코드로 복귀
5. 전역 코드로 복귀

스택이 push되고 pop 되는 것을 표현하면 아래의 그림과 같다.

![context stack](/images/javascript/context_stacks.jpg "context stack")

이처럼 <b>실행 컨텍스트 스택은 코드의 실행 순서를 관리한다.</b> 실행 가능한 코드가 평가되면 실행 컨텍스트가 스택의 최상위에 쌓이게 되고, 실행 컨텍스트 스택의 최상위에 존재하는 실행 컨텍스트는 언제나 현재 실행 중인 코드의 실행 컨텍스트이다.

## 동기식 처리 모델과 비동기식 처리 모델
자바스크립트 엔진은 단 하나의 실행 컨텍스트 스택을 갖는다. 한마디로 동시에 두가지 이상의 태스크(task)를 실행할 수 없다는 것을 의미한다. 이는 자바스크립트가 **싱글 스레드(single thread)**로 동작한다는 것을 의미한다.

<br>

### 동기식 처리 모델(Synchronous processing model)
![Synchronous](/images/javascript/context_synchronous.jpg "Synchronous")

실행 컨텍스트 스택의 최상위 스택(현재 실행중인 실행 컨텍스트)을 제외한 모든 실행 컨텍스트는 모두 실행 대기 중인 태스크(task)들이다. 이들은 현재 실행 중인 실행 컨텍스트가 POP되어 실행 컨텍스트 스택에서 제거될 때까지 실행을 대기하고, 종료하고나서야 다음 처리를 실행한다. 이를 **동기식 처리 모델(Synchronous processing model)이라고 한다.**

- 직렬적으로 태스크(task)를 수행한다
- 어떤 작업이 진행 중이면 다음 작업은 대기한다.
- 만약 서버에 데이터를 불러와서 수행할 때, 데이터가 응답될 때까지 이후 태스크들은 블로킹(blocking, 중단)된다.

<hr class="sub" />

### 비동기식 처리 모델(Asynchronous processing model)
![Asynchronous](/images/javascript/context_asynchronous.jpg "Asynchronous")

자바스크립트는 싱글 스레드로 동작하지만, 비동기식 처리 모델을 지원한다.

- 병렬적으로 태스크(task)를 수행한다.
- 태스트가 종료되지 않은 상태라도 대기하지 않고 다음 태스크를 실행
- 만약 서버에 데이터를 불러와서 수행할 때, 요청 한 이후 응답될 때까지 대기하지 않고, 즉시 다음 태스크를 수행한다. 이후 서버로부터 응답이 되면 이벤트가 발생하고 이벤트 핸들러가 응답된 데이터를 가지고 수행할 태스크를 계속 수행한다.

자바스크립트의 Timer 함수(setTimeout, setInterval), Ajax 요청은 비동식 처리 모델로 등장한다. 비동기식 처리 모델은 자바스크립트에 동시성을 부여하여 싱글 스레드의 약점을 보완해준다.
*하지만 비동기식으로 동작하는 코드는 순차적으로 실행되지 않아 가독성이 좋지 않고 콜백 지옥을 유발하며 에러 처리가 어렵다는 약점이 있다.*


## 렉시컬 환경
식별자가 선언되는 환경을 말한다. 렉시컬 환경은 객체 형태의 스코프(전역, 함수, 블록 스코프)를 만들고 이곳에 식별자를 등록한다. 그리고 등록된 식별자에 바인딩된 값을 관리한다.
- 렉시컬 환경은 스코프와 식별자를 관리한다.
- 스코프를 구분하여 식별자를 등록하고 관리하는 저장소 역할을 한다.

![context Scope](/images/javascript/context_scopechain.jpg "context Scope")

실행 컨텍스트는 Lexical Environment 컴포넌트와 Variable Environment 컴포넌트로 구성된다. 생성 초기에 두 컴포넌트는 하나의 동일한 렉시컬 환경을 참조한다.

![context lexical environment](/images/javascript/context_lexical.jpg "context lexical environment")

**렉시컬 환경은 3가지의 컴포넌트로 구성된다.**

![lexical environment component](/images/javascript/lexical_environment_component.jpg "lexical environment component")

- **환경 레코드(Environment Record)**<br>
  스코프에 포함된 식별자를 등록하고 등록된 식별자에 바인딩된 값을 관리하는 저장소이다. 환경 레코드는 실행 가능한 코드의 종류에 따라 내용에 차이가 있다.

- **외부 렉시컬 환경에 대한 참조(Outer Lexical Environment Reference)**<br>
  외부 렉시컬 환경을 가리키는 참조를 저장한다. 외부 렉시컬 환경이란 해당 실행 컨텍스트를 생성한 실행 가능한 코드를 포함하는 상위 코드의 렉시컬 환경을 말한다. 이를 통해 단방향 링크드 리스트인 스코프 체인을 구현한다.

- **this 바인딩(This binding)**<br>
  렉시컬 환경의 this에 바인딩된 객체(ThisBinding)를 나타낸다. this 바인딩은 추상 연산 ResolveThisBinding을 통해 결정할 수 있다.


## 실행 컨텍스트의 생성과 식별자 검색 과정
``` javascript
var x = 1;
const y = 2;

function foo (a) {
  var x = 3;
  const y = 4;

  function bar (b) {
    const z = 5;
    console.log(a + b + x + y + z);
}
  bar(10);
}

foo(20); // 42
```
위 코드를 예시로 어떻게 실행 컨텍스트가 생성되고, 어떻게 코드 실행 결과가 관리되는지 그리고 어떻게 실행 컨텍스트를 통해 식별자를 검색하는지 살펴보자

<br>

### 1. 전역 객체 생성
전역 객체는 전역 코드가 평가되기 이전에 생성된다. 이때 전역 객체에는 전역 프로퍼티와 전역 함수, 표준 빌트인 객체가 추가되며 동작 환경(클라이언트 사이드 또는 서버 사이드)에 따라 클라이언트 사이드 Web API(DOM, BOM, Canvas, XMLHttpRequest, Fetch, requestAnimationFrame, SVG, Web Storage, Web Component, Web worker 등) 또는 특정 환경을 위한 호스트 객체를 포함한다.

전역 객체도 Object.prototype을 상속받는다. 즉, 전역 객체도 프로토타입 체인의 일원이다.

``` javascript
// Object.prototype.toString
window.toString(); // -> "[object Window]"

window.__proto__.__proto__.__proto__.__proto__ === Object.prototype; // -> true
```

<hr class="sub" />

### 2. 전역 코드 평가
소스 코드가 로드되면 자바스크립트 엔진은 전역 코드를 평가한다.

![context process](/images/javascript/context_process.jpg "context process")
<br>

#### 1. 전역 실행 컨텍스트를 생성<br>
먼저 실행 컨텍스트를 생성한다. 그리고 즉시 실행 컨텍스트 스택에 생성된 전역 실행 커텍스트를 푸시한다. 이때 전역 실행 컨텍스트는 실행 컨텍스트 스택의 최상위, 즉 실행 중인 실행 컨텍스트가 된다.

<hr>

#### 2. 전역 렉시컬 환경 생성<br>
전역 렉시컬 환경을 생성하고 전역 실행 컨텍스트의 LexicalEnvironment 컴포넌트와 VarialeEnvironment 컴포넌트에 바인딩한다.<br>
- 2.1. **전역 환경 레코드 생성**<br>
전역 환경 레코드는 객체 환경 레코드와 선언적 환경 레코드로 구성되어 있다. 객체 환경 레코드와 선언적 환경 레코드는 서로 협력하여 전역 스코프와 전역 객체를 관리한다.<br>
  - 2.1.1. **객체 환경 레코드 생성**<br>
  var 키워드로 선언된 전역 변수와 함수 선언문으로 정의된 전역 함수*는 객체 환경 레코드에 등록되고 관리된다. 객체 환경 레코드는 bindingObject라고 부르는 객체와 연결되는데 객체 환경 레코드에 등록한 식별자는 bindingObject의 프로퍼티가 된다. 그리고 객체 환경 레코드에서 식별자를 검색하면 bindingObject의 프로퍼티를 검색하여 반환한다. var 키워드로 선언한 변수는 “선언 단계”와 “초기화 단계”가 동시에 진행된다. 다시 말해, 전역 코드 평가 시점에 객체 환경 레코드에 바인딩된 bindingObject에 변수 식별자를 등록한 다음, 암묵적으로 undefined를 바인딩한다. 따라서 var 키워드로 선언한 변수는 코드 실행 단계(현 시점은 코드 실행 단계가 아니라 코드 평가 단계이다.)에서 변수 선언문 이전에도 참조할 수 있다. 단, 변수 선언문 이전에 참조한 변수의 값은 언제나 undefined이다. var 키워드로 선언한 변수에 할당한 함수 표현식도 이와 동일하게 동작한다. 이것이 변수 호이스팅이 발생하는 원인이다.<br>
  -  2.1.2. **선언적 환경 레코드 생성**<br>
  let, const 키워드로 선언된 전역 변수(let, const 키워드로 선언한 변수에 할당한 함수 표현식 포함)는 선언적 환경 레코드에 등록되고 관리된다. 예를들어  const 키워드로 선언한 변수이다. 따라서 “선언 단계”와 “초기화 단계”가 분리되어 진행한다. 따라서 초기화 단계, 즉 변수 할당문이 실행이 되기 이전까지 일시적 사각지대(Temporal Dead Zone; TDZ)에 빠지게 된다. let, const 키워드로 선언한 변수도 변수 호이스팅이 발생하는 것은 변함이 없다. 단, let, const 키워드로 선언한 변수는 변수 할당문이 실행이 되기 이전까지 일시적 사각지대에 빠지기 때문에 참조할 수 없다.

- 2.2. **외부 렉시컬 환경에 대한 참조 할당**<br>
  외부 렉시컬 환경에 대한 참조는 **현재 평가 중인 코드를 포함하는 외부 코드의 렉시컬 환경을 가리킨다.**이를 통해 스코프 체인을 구현한다. 예를들어 전역 렉시컬 환경의 외부 렉시컬 환경에 대한 참조에는 null을 할당한다. 이는 전역 렉시컬 환경이 스코프 체인의 최상위에 존재함을 의미한다.

- 2.3 this 바인딩
  전역 환경 레코드의 this에는 전역 객체가 바인딩 된다.

<hr class="sub" />

### 3. 전역 코드 실행
코드 평가가 이루어지고 실행 컨텍스트가 생성되고 코드의 실행이 이루어진다. 이때 코드가 순차적으로 실행되는데, 변수 할당문이 있다면 변수의 값을 할당한다.

<b>식별자를 검색할 때는 실행 중인 실행 컨텍스트의 렉시컬 환경에서 식별자를 검색한다.</b>

만약 실행 중인 실행 컨텍스트의 렉시컬 환경에서 식별자를 검색할 수 없으면 외부 렉시컬 환경에 대한 참조가 가리키는 렉시컬 환경으로 이동하여 식별자를 검색한다. 이것이 바로 스코프 체인의 동작 원리이다.

변수 할당문은 렉시컬 환경에 등록한 식별자를 검색하여 바인딩 값을 변경하는 것이다. 함수 호출은 렉시컬 환경에 등록한 식별자를 검색하여 바인딩된 함수 객체를 호출하는 것이다.

![context process2](/images/javascript/context_process2.jpg "context process2")

이처럼 실행 컨텍스트는 실행 가능한 코드를 평가하고 실행하기 위해 필요한 환경을 제공하고 코드의 실행 결과를 실제로 관리하는 영역이다.

<br>

함수가 호출되면 전역 코드의 실행을 일시 중단하고 해당 함수 내부로 코드의 제어권이 이동한다. 그리고 함수 코드를 평가하기 시작한다. 함수 코드 평가는 아래 순서로 진행된다.

``` javascript
var x = 1;
const y = 2;

function foo (a) {
  var x = 3;
  const y = 4;

  console.log(a + x + y);
}

foo(20); // 27
```

#### 1. 함수 실행 컨텍스트 생성
먼저 함수의 실행 컨텍스트를 생성한다. 생성된 함수 실행 컨텍스트는 함수 렉시컬 환경이 완성된 다음 실행 컨텍스트 스택에 푸시된다.

<hr />

#### 2. 함수 렉시컬 환경 생성
렉시컬 환경을 생성하고 함수 실행 컨텍스트의 LexicalEnvironment 컴포넌트와 VariableEnvironment 컴포넌트에 바인딩한다.

<br>

![function record](/images/javascript/function_record.jpg "function record")

- 2.1. **함수 환경 레코드 생성**<br>
  함수 렉시컬 환경을 구성하는 컴포넌트 중 하나인 함수 환경 레코드는 매개변수, arguments 객체, 함수 내에서 선언한 변수와 함수 정의를 등록하고 관리한다.

<br>

![context_process3](/images/javascript/context_process3.jpg "context_process3")

- 2.2. **외부 렉시컬 환경에 대한 참조 할당**<br>
외부 렉시컬 환경에 대한 참조에는 **해당 함수의 평가된 시점**에 실행 중인 실행 컨텍스트의 렉시컬 환경의 참조가 저장된다.

> 함수 객체의 내부 슬롯 [[Environment]]<br>
자바스크립트의 모든 함수는 함수 정의가 평가되어 함수 객체를 생성할때, <b>현재 실행 중인 실행 컨텍스트의 렉시컬 환경을 함수 객체의 내부 슬롯 [[Environment]]가 바로 렉시컬 스코프를 구현하는 메커니즘이다.</b>

<br>

- 2.3 **this 바인딩**<br>
일반 함수로 호출되었으면 this는 window를 가리킨다. 이제 전역 코드의 실행을 일시 중단하고 실행 컨텍스트 스택에 생성된 전역 실행 컨텍스트를 푸시한다. 이때 함수 실행 컨텍스트는 실행 컨텍스트 스택의 최상위, 즉 실행 중인 실행 컨텍스트가 된다.

<hr />

#### 3. 함수 코드 실행
함수의 내부 코드가 순차적으로 실행되기 시작한다. 매개 변수에 인수가 할당되고, 변수 할당문이 있다면 실행되어 지역 변수의 값이 할당된다.

![context_process4](/images/javascript/context_process4.jpg "context_process4")

<hr />

#### 4. 함수 코드 종료
함수가 종료하면 실행 컨텍스트 스택에서 함수 실행 컨텍스트가 팝(pop)되어 제거되고 전역 실행 컨텍스트가 실행 중인 실행 컨텍스트가 된다.

<hr class="sub" />

### 4. 전역 코드 실행종료
모든 함수가 종료하면 더 이상 실행할 전역 코드가 없으므로 전역 코드의 실행이 종료되고 전역 실행 컨텍스트도 실행 컨텍스트 스택에서 팝(pop)되어 실행 컨텍스트 스택에는 아무것도 남지 않는다.

## 실행 컨텍스트와 블록 레벨 스코프
var 키워드로 선언한 변수는 오로지 함수의 코드 블록만을 지역 스코프로 인정하는 함수 레벨 스코프를 따른다. 하지만 let과 const 키워드로 선언한 변수는 모든 코드 블록을 지역 스코프로 인정하는 블록 레벨 스코프를 따른다.

아래의 예제를 살펴보자
``` javascript
let x = 1;

if (true) {
  let x = 10;
  console.log(x); // 10
}

console.log(x); // 1
```
if 문이 실행되면 if 문의 블록 레벨 스코프를 생성해야 한다. 이를 위해 if 문을 위한 선언적 환경 레코드를 갖는 렉시컬 환경을 새롭게 생성하여 기존의 전역 렉시컬 환경을 교체한다. 이때 새롭게 생성된 if 문을 위한 렉시컬 환경의 외부 렉시컬 환경에 대한 참조는 교체된 이전의 전역 렉시컬 환경을 가리킨다.

![context block](/images/javascript/context_block.jpg "context block")

if 문 실행이 종료되면 if 문이 실행되기 이전의 렉시컬 환경으로 되돌린다.

![context block end](/images/javascript/context_block_end.jpg "context block end")

이는 if 문 뿐만이 아니라 모든 블록문에 적용된다.

for 문의 경우, <b>초기문에 let 키워드를 사용한 for 문은 반복될 때마다 새로운 렉시컬 환경을 생성한다.</b> 만약 for 문 내에서 정의된 함수가 있다면 이 함수의 상위 스코프는 for 문이 생성한 렉시컬 환경이다. 이때 함수의 상위 스코프는 for 문이 반복될 때 마다 식별자(초기화 변수 및 for 문 내 지역 변수 등)의 값을 유지해야 한다. 이를 위해 for 문이 반복될 때마다 독립적인 렉시컬 환경을 생성하여 식별자의 값을 유지한다.

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
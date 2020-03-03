---
title: dataType
date: "2019-10-13"
template: "post"
draft: false
slug: "/posts/javascript/datatype"
category: "Javascript"
tags:
  - "Primitive type"
  - "number"
  - "string"
  - "boolean"
  - "undefined"
  - "null"
  - "symbol"
description: "원시 타입과 객체 타입을 알아보자"
---
<span class="notice">
  <em>TIL 내용이므로 잘못된 내용은 댓글 부탁드립니다</em>
</span>

<div id="toc">

**:link:  Table Of Contents**

- [원시타입의 종류](#원시타입의-종류)
  - [숫자 타입(number)](#숫자-타입number)
      - [숫자 타입의 특별한 값](#숫자-타입의-특별한-값)
  - [문자열 타입(String)](#문자열-타입string)
      - [템플릿 리터럴](#템플릿-리터럴)
  - [불리언 타입(Boolean)](#불리언-타입boolean)
  - [undefined 타입](#undefined-타입)
  - [null 타입](#null-타입)
  - [symbol 타입](#symbol-타입)
- [객체 타입](/posts/javascript/Object)

</div>

## 원시타입의 종류

### 숫자 타입(number)

``` javascript
// 모두 숫자 타입이다.
var integer = 10;    // 정수
var double = 10.12;  // 실수
var negative = -20;  // 음의 정수
```

C나 Java의 경우, 정수와 실수를 구분하여 int, long, float, double 등과 같은 다양한 숫자 타입이 존재한다.<br>
하지만 자바스크립트는 하나의 숫자 타입(number)만 존재한다.

``` javascript
var binary = 0b01000001; // 2진수
var octal = 0o101;       // 8진수
var hex = 0x41;          // 16진수

// 표기법만 다를 뿐 모두 같은 값이다.
console.log(binary); // 65
console.log(octal);  // 65
console.log(hex);    // 65
console.log(binary === octal); // true
console.log(octal === hex);    // true
```

정수, 실수, 2진수, 8진수, 16진수 리터럴은 모두 메모리에 2진수로 저장된다. 자바스크립트는 2진수, 8진수, 16진수를 표현하기 위한 데이터 타입을 제공하지 않기 때문에 이들의 값을 참조하면 모두 10진수로 해석된다.

``` javascript
console.log(1 === 1.0); // true
console.log(4 / 2);     // 2
console.log(3 / 2);     // 1.5
```
자바스크립트의 숫자 타입은 정수만을 위한 타입이 없고 모든 수를 **실수**로 처리한다. 정수로 표시된다고 하더라도 사실은 **실수**인 것이다. 따라서 정수로 표시되는 수끼리 나누더라도 실수로 나올 수가 있다.

<br>

#### 숫자 타입의 특별한 값
숫자 타입은 3가지의 특별한 값들도 표현할 수 있다.

``` javascript
console.log(10 / 0); // Infinity : 양의 무한대
console.log(-10 / 0); // -Infinity : 음의 무한대
console.log(10 * 'String'); // NaN(Not a Number)
```

<hr class="sub" />

### 문자열 타입(String)
문자열(String)타입은 텍스트 데이터를 나타내는데 사용한다.<br>

>문자열은 **0개** 이상의 16bit 유니코드 문자(UTF-16)들의 집합으로 전세계 대부분의 문자를 표현할 수 있다.

``` javascript
var string;
string = '안녕하세요'; // 작은 따옴표
string = "안녕하세요"; // 큰 따옴표
string = `안녕하세요`; // 백틱 (ES6)

// 따옴표로 감싸지 않은 hello를 식별자로 인식한다.
var greeting = hello; // ReferenceError: hello is not defined
```

문자열은 작은 따옴표('), 큰 따옴표(") 또는 백틱(`)안에 텍스트를 넣어 생성한다. 다른 타입과 달리 문자열을 따옴표로 감싸는 이유는 __*키워드나 식별자와 같은 토큰과 구분하기 위함이다.*__ 만약 문자열을 따옴표로 감싸지 않는 경우 자바스크립트엔진은 이를 키워드나 식별자와 같은 토큰으로 인식한다.

#### 템플릿 리터럴
ES6부터 템플릿 리터럴이라고 불리는 새로운 문자열 표기법이 등장하였다.

등장이전 일반적인 문자열에서 줄바꿈이 허용되지 않았고 공백을 표현하기 위해서는 아래에 이스케이프 시퀀스를 사용해야만 했다.

<article class="board-tbl">

| 이스케이프 시퀀스 | 의미 |
| :------------- | :--- |
| `\0` | Null |
| `\b`| 백스페이스 |
| `\f` | 새로운 페이지 |
| `\n` | 개행(LF, Line Feed) |
| `\r` | 캐리지 리턴(CR, Carriage Return) |
| `\t` | 탭(수평) |
| `\v` | 탭(수직) |
| `\’` | 작은 따옴표 |
| `\”` | 큰 따옴표 |
| `\\` | 백슬래시 |

</article>

*예시로 알아보자*
``` javascript
var template = '<ul class="nav-items">\n';
template += '\t<li><a href="#home">Home</a></li>\n';
template += '\t<li><a href="#about">About</a></li>\n';
template += '</ul>';

console.log(template);

// <ul class="nav-items">
//   <li><a href="#home">Home</a></li>
//   <li><a href="#about">About</a></li>
// </ul>
```
위의 예시는 템플릿 리터럴(`)이 등장하기 이전 줄바꿈과 들여쓰기가 적용된 HTML 문자열을 이스케이프 시퀀스를 사용하여 작성했다

*템플릿 리터럴을 사용한 예시를 살펴보자*
``` javascript
const template = `<ul class="nav-items">
  <li><a href="#home">Home</a></li>
  <li><a href="#about">About</a></li>
</ul>`;

console.log(template);

// <ul class="nav-items">
//   <li><a href="#home">Home</a></li>
//   <li><a href="#about">About</a></li>
// </ul>
```
출력 값은 템플릿 리터럴을 사용한 것과 안한 것은 동일하다. 하지만, *템플릿 리터럴은 일반적인 문자열과 달리 여러 줄에 걸쳐 문자열을 작성할 수 있으며 템플릿 리터럴 내의 모든 공백은 있는 그대로 적용된다.*

**문자열은 +문자열 연산자를 사용해 연결할 수 있다.**

ES5에서의 문자열 연결
``` javascript
var first = 'Cheol-Hwan'
var last = 'Lee'

console.log('My name is' + first + ' ' + last + '.');
// My name is Cheol-Hwan Lee.
```

템플릿 리터럴은 +문자열 연산자를 사용하지 않아도 간단한 방법으로 새로운 문자열을 삽입할 수 있다.<br>
이를 **문자열 인터폴레이션(String Interpolation)**이라 한다.

``` javascript
var first = 'Cheol-Hwan'
var last = 'Lee'

console.log(`My name is ${first} ${last}.`);
// My name is Cheol-Hwan Lee.
```
문자열 인터폴레이션은 *__${...}__*으로 **표현식**으로 감싼다. 이때 *__표현식__ 의 평가 결과는 문자열로 강제 타입 변환된다.*

<hr class="sub" />

### 불리언 타입(Boolean)
논리적 참, 거짓을 나타내는 true와 false 뿐이다.
조건에 의해 프로그램의 흐름을 제어하는 조건문에서 자주 사용된다.
``` javascript
var foo = true;

console.log(foo); // true

foo = false;

console.log(foo); // false
```

<hr class="sub" />

### undefined 타입
undefined 타입은 undefined가 유일하다.<br>
선언 이후 명시적으로 값을 할당하지 않은 변수는 자바스크립트 엔진의 **암묵적 초기화**에 의해 undefined값을 가진다.<br>
따라서 선언은 되었지만 아직 값을 할당하지 않은 변수에 접근하면 undefined가 반환된다.

``` javascript
var foo;
console.log(foo); //undefined

foo = 10;

console.log(foo); // 10
```
이는 변수 선언에 의해 확보된 메모리 공간을 처음 할당이 이루어질 때까지 빈상태(대부분 쓰레기 값(Garbage value)이 들어 있다)로 내버려두지 않고 자바스크립트 엔진이 undefined로 초기화하기 때문이다.

> **선언(Declaration)과 정의(Definition)**<br>
일반적으로 정의란 개념은 어떤 대상을 명확하게 규정하는 것을 의미한다. 자바스크립트의 undefined에서 말하는 정의란 변수에 값을 할당하여 변수의 실체를 명확히 하는 것을 의미한다.<br>
자바스크립트는 변수를 선언하면 정의가 이루어지기 때문에 선언과 정의의 구분이 모호하다.<br>
자바스크립트에서 **선언**은 *식별자가 생성되었지만 값이 아직 할당되지 않은 상태를 말한다.*<br>
자바스크립트에서 **정의**는 *식별자가 생성되었고 값까지 할당되어 있는 상태를 의미한다.*

``` javascript
// 변수 선언. 내부적으로 undefined로 정의된다.
var foo;

// 변수 선언과 정의
var bar = 1;

// 함수 정의. 식별자가 암묵적으로 생성되고 함수 객체가 할당된다.
// 함수 호이스팅으로 인해 선언과 동시에 할당이 이루어짐.
function add {}
```

<hr class="sub" />

### null 타입
null타입의 값은 null이 유일하다.<br>
자바스크립트엔진은 대소문자를 구별하기때문에 null은 Null, NULL 등과 다르다.<br>
프로그래밍 언어에서의 null은 변수에 값이 없다는 것을 **의도적으로 명시(의도적 부재)할 때** 사용한다.

``` javascript
var foo = 'Lee';

// 이전에 할당되어 있던 값에 대한 참조를 제거. 변수 foo는 더이상 'Lee'를 참조하지 않는다.
foo = null;
```

함수가 유효한 값을 반환할 수 없는 경우, 명시적으로 null을 반환하기도 한다.

*예시를 들어보자*
``` javascript
<!DOCTYPE html>
<html>
<body>
  <script>
    var container = document.querySelector('.container');

    // HTML 문서에 container 클래스를 갖는 요소가 없다면 null을 반환한다.
    console.log(container); // null
  </script>
</body>
</html>
```

<hr class="sub" />

### symbol 타입
심볼은 ES6에서 새롭게 추가된 7번째 타입으로 변경 불가능한 원시타입(Primitive type)이다.<br>
심볼은 주로 이름의 충돌 위험이 없는 객체의 유일한 프로퍼티 키를 만들기 위해 사용한다.

심볼은 Symbol 함수를 호출해 생성한다. 이때 생성된 심볼 값은 다른 심볼 값들과 다른 유일한 심볼 값이다.

``` javascript
var key = Symbol('key');
console.log(typeof key); // symbol

var obj = {};

obj[key] = 'value';

console.log(obj[key]); // value
console.log(obj.key); // undefined
```

<hr class="sub" />

### 객체 타입
아래의 링크로 가면 자세히 확인할 수 있다.<br>
[객체란?](/posts/javascript/Object)

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

<div class="reference-site">

  **Reference**<br>

  [https://poiemaweb.com](https://poiemaweb.com)

</div>
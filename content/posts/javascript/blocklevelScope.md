---
title: let과 const
date: "2019-10-15"
template: "post"
draft: false
slug: "/posts/javascript/blocklevelScope"
category: "Javascript"
tags:
  - "blocklevel Scope"
  - "let"
  - "const"
description: "let, const를 알아보자"
---
<span class="notice">
  <em>TIL 내용이므로 잘못된 내용은 댓글 부탁드립니다</em>
</span>

## var 키워드로 선언한 변수의 문제점★

<b>크게 4가지로 생각해보았다.</b>
- 암묵적 전역 변수 (선언문을 쓰지 않고 할당했을때, var 키워드로 만들어진다.)★
- 함수레벨 스코프★
- 변수 호이스팅, 변수 선언문 이전에 찍어보면 undefined 를 반환한다.
- 전역 변수일때 재할당으로 인한 코드 가독성 및 상태 변화를 인지하기 어렵다

<br>

### 변수 중복 선언 허용
``` javascript
var x = 1;

// 아래 변수 선언문은 자바스크립트 엔진에 의해 var 키워드가 없는 것처럼 동작한다.
var x = 100;
console.log(x); // 100
```
var 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용한다.<br>
코드가 길다고 가정하고, 위에서 이미 동일한 변수이름으로 선언되있는 것을 모르고 변수를 중복 선언하면서 값까지 할당했다면 의도치 않게 먼저 선언된 변수값이 변경되는 부작용이 있어, 사용하지 않는 것을 권장한다.

<hr class="sub" />

### 함수 레벨 스코프
var 키워드로 선언한 변수는 오로지 함수 코드 블록만을 지역 스코프로 인정한다. 따라서 함수 외부에서 선언한 변수는 모두 전역 변수이다.

**코드 블록에서의 var 키워드 예시**
``` javascript
var x = 1;

if (true) {
  // var 키워드로 선언된 변수는 함수의 코드 블록 만을 지역 스코프로 인정한다.
  // 함수 밖에서 선언된 변수는 코드 블록 내에서 선언되었다 할 지라도 모두 전역 변수이다.
  // 따라서 x는 전역 변수이다. 이미 선언된 전역 변수 x가 있으므로 변수 x는 중복 선언된다.
  // 이는 의도치 않게 변수값이 변경되는 부작용을 발생시킨다.
  var x = 10;
}

console.log(x); // 10

var i = 10;

// for문에서 선언한 i는 전역 변수이다.
// 따라서 이미 선언된 전역 변수 i에 중복 선언되어 0의 값이 재할당 된다.
for (var i = 0; i < 5; i++) {
  console.log(i); // 0 1 2 3 4
}

// 의도치 않게 변수의 값이 변경되었다.
console.log(i) // 5
```

**함수 레벨 스코프 예시**
``` javascript
var num = 10;

function foo() {
  var num = 100;
  console.log(num);
}

foo(); // 100
console.log(num); // 10
```
var 키워드로 선언한 변수는 오로지 **함수**의 코드 블록만을 지역변수로 인정한다. 따라서 <b>함수 외부에서 선언한 변수는 모두 전역 변수이다.</b>

<hr class="sub" />

### 변수 호이스팅

``` javascript
var num = 10;

function foo() {
  console.log(num); // <- undefined 이때 num은 선언은 되었지만 할당이 아직 안 이루어진 상태이다
  var num = 100;
  console.log(num);
}

foo();
// ① 자바스크립트 엔진은 foo 함수가 호출되면 함수 내부에 있는 변수 선언을 한다.
// ② 한줄 한줄 코드를 읽는다.
// ③ foo안에 있는 console.log(num)은 참조 값을 찾게 되는데 이때 최상단이 아니라 문맥상 가장 가까운 곳부터 찾게된다.
// ④ 이때 num은 함수 foo안에 호이스팅 된 변수 num이다.

console.log(num); // 10
```

<br>

## let 키워드
위의 var 키워드의 단점을 보완하기 위해 ES6에서는 let과 const 키워드를 도입했다.

<br>

### 변수 중복 선언 금지
<b>동일 스코프 안에서 동일한 이름을 갖는 변수</b>를 **중복 선언**하면 문법 에러(SyntaxError)가 발생한다.

> var 키워드는 중복 선언시 재할당이 되었다.

<br>

``` javascript
var foo = 123;
// var 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용한다.
// 아래 변수 선언문은 자바스크립트 엔진에 의해 var 키워드가 없는 것처럼 동작한다.
var foo = 456;

let bar = 123;
// let이나 const 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용하지 않는다.
let bar = 456; // SyntaxError: Identifier 'bar' has already been declared
```

<hr class="sub" />

### 블록 레벨 스코프
var 키워드는 오로지 함수에서만 스코프가 발생했지만,
<b>let과 const 키워드는 모든 코드 블록(함수, if문, for문, while문, try/catch문 등)을 지역 스코프로 인정하는 블록 레벨 스코프(Block-level scope)</b>를 따른다.

``` javascript
let foo = 123; // 전역 변수

{ // 코드 블록이다.
  let foo = 456; // 지역 변수
  let bar = 456; // 지역 변수
}

console.log(foo); // 123
console.log(bar); // ReferenceError: bar is not defined
```
var 키워드와 다르게 스코프가 다르면 재할당이 이루어지지 않는다. 부모 스코프가 자식 스코프에 값을 참조가 불가능하다.
심지어 식별자 이름이 같아도 스코프가 다르면 별개의 변수가 되서 식별자 이름이 같아도 상관 없다. 코드 가독성에 있어서 사용을 안하는게 좋다.

> 식별자는 어떤 값을 구별하여 식별해낼 수 있는 고유한 이름을 말한다.

함수도 코드 블록이므로 스코프를 만든다. 이때 함수 내의 코드 블록은 함수 레벨 스코프에 중첩된다.

__*그림으로 알아보자*__
<br>

![blockLevelScope](/images/javascript/blockLevelScope.jpg "blockLevelScope")

<hr class="sub" />

### 변수 호이스팅★

``` javascript
console.log(foo); // ReferenceError: foo is not defined
let foo;
```
let 키워드로 선언한 변수를 변수 선언문 이전에 참조하면 참조 에러(ReferenceError)가 발생한다.

``` javascript
// 런타임 이전에 선언 단계가 실행된다.
// 아직 변수가 초기화되지 않았다. 따라서 변수 선언문 이전에 변수를 참조할 수 없다.
console.log(foo); // ReferenceError: foo is not defined

let foo; // 변수 선언문에서 초기화 단계가 실행된다.
console.log(foo); // undefined

foo = 1; // 할당문에서 할당 단계가 실행된다.
console.log(foo); // 1
```


<b>let 키워드로 선언한 변수는 선언단계와 초기화 단계가 분리되어 진행한다.</b>

- **런타임 이전**에 자바스크립트 엔진에 의해 암묵적으로 선언 단계가 먼저 진행된다.
- 이후 **런타임 환경에서 변수 선언문에 도달했을때** 그때 초기화 단계를 실행한다.

**선언단계부터 초기화 시작 시점(변수 선언문)**까지의 구간을 <b>일시적 사각지대(Temporal Dead Zone, TDZ)</b>라고 한다.

> __*var 키워드의 변수 호이스팅*__<br>
기존의 var 키워드는 런타임 이전에 자바스크립트 엔진에 의해 암묵적으로 **선언단계와 초기화단계가 한번에 진행 된다.**<br>
즉, var 키워드는 선언단계에서 스코프에 변수 식별자를 등록하여 자바스크립트 엔진에 변수의 존재를 알린다. 그리고 즉시 초기화 단계에서 undefined로 변수를 초기화한다. 따라서 var 키워드로 선언한 변수는 변수 선언문 이전에 변수에 접근하여도 스코프에 변수가 존재하기 때문에 에러가 발생하지 않고 undefined를 반환한다. 이후 런타임 환경에서 변수 할당문에 도달하면 비로소 값이 할당 됬다.

<br>

__*그림으로 비교해보자*__
<br>

![blockLevelScope](/images/javascript/blockLevelScope_2.jpg "blockLevelScope")

let 키워드로 선언한 변수는 변수 호이스팅이 <b>발생하지 않는 것처럼</b> 동작한다.

``` javascript
let foo = 1; // 전역 변수

{ // 호이스팅이 안됬다면 1이 나와야된다. 아래 console.log(foo)는 스코프에 존재하지 않아서 전역 변수를 참고하기 때문이다.
  console.log(foo); // ReferenceError: foo is not defined
  let foo = 2; // 지역 변수
}
```
호이스팅은 존재한다.<br>
let 키워드로 선언한 변수의 경우, 변수 호이스팅 발생하지 않는다면 위 예제는 전역 변수 foo의 값을 출력해야 한다. 하지만 let 키워드로 선언한 변수도 여전히 호이스팅이 발생하기 때문에 참조 에러(ReferenceError)가 발생한다.

자바스크립트는 ES6에서 도입된 let, const를 포함하여 모든 선언(var, let, const, function, function*, class 등)을 호이스팅한다.

<br>

## const(constant, 상수)
상수도 재할당 할 수 없는 __*변수*__ 이다.
<br>
<br>
let과 매우 흡사하므로 다른 점만 알아보겠다.
- 재할당을 할 수 없다.
- 재할당을 할 수 없으므로 <b>변수 선언과 동시에 값을 할당 하여야한다.</b>
- 일반적으로 상수 식별자 네이밍은 대문자 + SNAKE_CASE를 쓴다.

> 블록 레벨 스코프이고, 호이스팅도 한다.


``` javascript
const FOO; // SyntaxError: Missing initializer in const declaration
```
const 키워드로 선언한 변수는 반드시 선언과 동시에 할당이 이루어져야한다.

<br>

``` javascript
// 0.1은 변해서는 않되는 상수로서 사용될 값이다.
// 변수 이름을 대문자로 선언하여 상수를 저장하고 있음을 명확히 나타낸다.
const TAX_RATE = 0.1;

// const 키워드로 선언한 변수는 재할당이 금지된다.
// 상수는 재할당이 금지된 변수이다.
TAX_RATE = 0.2; // TypeError: Assignment to constant variable.
```
재할당이 금지된다.

<br>

``` javascript
{
  const TAX_RATE = 0.1;
  console.log(TAX_RATE); // 0.1
}
console.log(TAX_RATE); // ReferenceError: TAX_RATE is not defined
```
let 키워드로 선언한 변수와 마찬가지로 블록 레벨 스코프를 갖는다.

<br>

### const 키워드와 객체
const 키워드로 선언된 변수는 재할당이 금지된다. const 키워드로 선언된 변수에 원시 값을 할당한 경우, 원시 값은 변경할 수 없는 값(immutable value)이고 const 키워드에 의해 재할당이 금지되므로 할당된 값을 변경할 수 있는 방법이 없다.

const 키워드로 선언한 변수에 객체를 할당한 경우, 원시 값을 할당한 경우와 마찬가지로 변수나 객체로 재할당이 금지된다. 그러나 객체는 변경 가능한 값(mutable value)이다. 따라서 <b>const 키워드로 선언된 변수에 할당된 객체는 변경이 가능하다.</b>

``` javascript
const person = {
  name: 'Lee'
};

// 객체는 변경 가능한 값이다, 재할당이 아닌 객체프로퍼티의 갱신이다.
person.name = 'Kim';

console.log(person); // {name: "Kim"}
```
const 키워드는 재할당을 금지할 뿐 “불변(immutable)”을 의미하지는 않는다. 다시 말해, 새로운 객체를 재할당하는 것은 불가능하지만 객체의 내용(프로퍼티의 추가, 삭제, 프로퍼티 값의 변경)을 변경하는 것은 가능하다. *객체의 내용이 변경되더라도 변수에 할당된 주소값은 변경되지 않는다는 점을 생각하면 좀 더 이해하기 쉬울 것 같다.*

<br>

## 전역 객체와 변수 키워드
var 키워드로 선언한 모든 전역 변수는 window라는 전역 객체의 프로퍼티가 되지만,
let, const 키워드로 선언한 전역 변수는 window의 객체가 아니다.

**var**가 전역변수로 선언이 되면 변수의 생명주기는 예를 들어 브라우저 환경이라 가정했을경우, 생명주기는 <b>브라우저 종료될때 변수는 소멸한다.</b> 왜냐하면 var 키워드는 window라는 전역 객체의 프로퍼티가 되어있기 때문이다.

**let 또는 const**가 전역 변수로 선언이 되면 생명주기가 다르다. var 키워드와 다르게 window라는 전역 객체에 포함되지 않고 보이지 않는 개념적인 블록내에 존재하게 된다. 그리하여 <b>전역에 실행할 코드가 없으면 소멸한다.<b>

일반적으로
- 브라우저 환경일 경우 전역 객체는 window 객체
- Node.js 환경일 경우 전역 객체는 global 객체

``` javascript
// 이 예제는 브라우저 환경에서 실행시켜야 한다.

// 전역 변수
var x = 1;
// 암묵적 전역 변수
y = 2;
function foo() {}

// var 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티이다.
console.log(window.x);
// 전역 객체의 프로퍼티는 전역 변수처럼 사용할 수 있다.
console.log(x); // 1 // 전역 객체를 호출할때 window.을 생략해도 된다.

// 암묵적 전역 변수는 전역 객체의 프로퍼티이다.
console.log(window.y); // 2
console.log(y); // 2

// 함수 선언문으로 정의한 전역 함수는 전역 객체의 프로퍼티이다.
console.log(window.foo); // ƒ foo() {}
// 전역 객체의 프로퍼티는 전역 변수처럼 사용할 수 있다.
console.log(foo); // ƒ foo() {}
```

<br>
<br>
<br>
<br>
<br>
<br>

<div class="reference-site">

  **참고한 사이트**<br>

  [https://poiemaweb.com](https://poiemaweb.com)

</div>
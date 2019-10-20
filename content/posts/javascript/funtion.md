---
title: Function
date: "2019-10-13"
template: "post"
draft: false
slug: "/posts/javascript/Function"
category: "Javascript"
tags:
  - "Function"
description: "자바스크립트의 함수"
---
<span class="notice">
  <em>잘못된 정보가 있다면 댓글로 의견 부탁드립니다.</em>
</span>

## 함수란?
<b>여러가지의 실행할 문들을 코드 블록으로 감싼 하나의 실행단위이다.</b><br>
함수를 실행하는 것은 표현식이므로 값을 만든다. 값이므로 변수에 담을 수 있다는 의미이다.

- 함수 자체가 값이다.
- 자바스크립트의 함수는 일급 객체이다.
- 함수는 프로퍼티를 가지고 있다.
- 외부에 것(인수, argument)을 받아와 매개변수(인자, Parameter)로 들어오면 함수는 이것을 반환하여 반환 값(return value)을 뱉어낸다. 이 반환 값은 7개의 데이터 타입 중 하나이다.
- 함수의 코드 블록안에는 0개 이상의 문을 가지고 있다.
- 함수는 실행단위마다 나누어 짧게 짧게 쓰는 것이 유용하다.

> 같은 스코프내에는 동일한 이름의 변수를 선언할 수 없다. 스코프는 식별자를 찾는 규칙이다.

``` javascript
// 함수 정의
function add(x, y) {
  return x + y;
}

// 함수 호출
var result = add(2, 5);

// 함수 add에 인수 2, 5를 전달하면서 호출하면 7을 반환한다.
console.log(result); // 7
```

<br>

**순수함수와 비순수 함수**

``` javascript
// 순수 함수의 예
function add(x, y) {
  return x + y;
}

add(1, 2); // 3

// 비순수 함수의 예
var num = 0; // 현재 카운트를 나타내는 상태: increase 함수에 의해 변화한다.

function increase() {
  return ++num; // 외부 상태를 변경한다.
}

console.log(increase()); // 1
console.log(increase()); // 2
```

- 순수 함수
  - 동일한 인수(argument)가 전달되면 언제나 동일한 값을 반환하는 함수를 말한다.
  - 오직 인수에만 의존하여 반환값을 만든다.
  - 함수의 외부 상태를 변경하지 않는다.

- 비순수 함수
  - 함수의 외부 상태에 의존하여 외부 상태에 따라 반환 값이 달라진다.
  - 함수의 외부 상태를 변경하는 부수효과가 있다.

> 함수 외부 상태를 변경하면 상태 변화를 추적하기 어려워진다. 따라서 함수 외부 상태의 변경을 지양하는 순수 함수를 사용하는 것이 좋다.

<br>
<br>

## 함수의 재사용
동일한 작업을 반복적으로 수행해야 한다면 같은 코드를 중복해서 여러 번 작성하는 것이 아니라 미리 정의된 함수를 재사용하는 것이 효율적이다. 함수는 몇 번이든 호출할 수 있으므로 **코드의 재사용**이라는 측면에서 매우 유용하다.
**유지보수의 편의성을 높이고 실수를 줄여 코드의 신뢰성을 높인다.**

<br>
<br>

## 함수 리터럴
함수는 함수 리터럴로 생성할 수 있다. 함수 리터럴은 function 키워드, 함수 이름, 매개변수 목록 그리고 함수 몸체로 구성된다.
자바스크립트의 함수는 값이기 때문에 리터럴로 만드는 것이다. <b>일반 객체와 함수 객체의 차이는 함수 객체는 호출 할 수 있다는 점이다.</b>

``` javascript
function foo(a, b) {
  return a + b;
}
```

**함수 리터럴의 구성요소**

- **함수 이름**
  - 함수 이름은 식별자이므로 식별자 네이밍 규칙을 준수해야한다.
  - 함수 이름은 **함수 몸체 내에서만(주로 재귀 함수일때 사용)** 참조할 수 있는 식별자이다.
  - 함수 이름은 생략할 수 있다.(함수 선언문과 차이점)
  - 함수 이름이 있는 함수를 기명 함수(named function), 함수 이름이 없는 함수를 익명 함수(anonymous function)이라 한다.

- **매개변수(parameter) 목록**
  - 매개변수는 함수 외부에서 참조가 안된다.
  - 0개 이상의 매개변수(parameter)를 괄호로 감싸고 쉼표(,)로 구분한다.
  - 매개변수(parameter)에 인수(argument)가 할당된다.
  - 매개변수(parameter)는 함수 몸체 내에서 변수와 동일하게 취급된다. 따라서 매개변수(parameter)도 변수와 마찬가지로 식별자 네이밍 규칙을 준수해야한다.
  - 매개변수(parameter)는 함수가 **호출**되면 함수에 있는 문들이 한줄 한줄 실행되기 **이전에** 선언된다.

- **함수 몸체**
  - 함수가 호출되었을 때 일괄적으로 **실행될 문들을 하나의 실행 단위**로 정의한 코드 블록이다.
  - 함수 몸체는 **함수 호출**에 의해 실행된다.

<br>

### 함수 선언문 vs 함수 리터럴

``` javascript
// 함수 선언문
function foo() {}

// 함수리터럴
(function bar() {})
// ()는 함수리터럴로 평가되기 위한 그룹 연산자이다.
// 즉 표현식(값)이 와야 될 자리

foo // ƒ foo() {}

bar // ReferenceError: bar is not defined
    // 리터럴을 그룹 연산자 안의 값 평가를 마쳐서 변수에 저장이 된 것이 아니다.
```
구문은 똑같지만 비교 할 줄 알아야한다.

- **함수 선언문** : 표현식이 올 자리가 **아닌 곳**에 온 함수 리터럴은 **함수 선언문**으로 해석한다. 한마디로 표현식이 아닌 문이다. 함수 이름의 식별자로 함수 리터럴이 담아진다.

- **함수 리터럴** : 변수를 만든 것이 아니고 값(함수 객체)만 만드는 것이다. 그래서 **표현식이 올 자리**에 **함수 리터럴**이 온다. 값만 오기 때문에 호출할 수 있는 식별자가 없다.(명확하게 함수 리터럴을 변수에 할당했다면 자바스크립트 엔진은 이것을 함수 리터럴로 판단한다. 이를 함수 표현식이라 한다.)

<br>
<br>

## 함수 정의
함수 정의만으로 함수는 실행되지 않는다.<br>
함수를 정의하는 방법은 4가지가 있다.

### 함수 선언문

``` javascript
add(2,3) // 5

function add(x, y) {
  return x + y;
}

add(2,3) // 5
```
- *식별자* 가 있고, 표현식이 아닌 문이다.
- 코드 블록을 가지고 있다.
- 문이기 때문에 세미콜론(;)이 필요없다.
- 함수 호이스팅이 적용되어, <b>**런타임 이전 환경에서 선언과 동시에 함수 이름으로 암묵적으로 변수(식별자)가 생성되고 그 식별자에 함수 객체를 binding 해준다.(이때 코드 블록안에 문들이 실행되는 것은 아니다)**<b> 함수 이름이 식별자는 아니다.
- 함수 호이스팅으로 인해 어느 위치(함수 선언문 위쪽 포함)에서도 함수 호출이 가능하다.

<hr class="sub" />

### 함수 표현식(Function Expression)

``` javascript
add(2,3) // add is not a function

var add = function (x, y) {
  return x + y;
};

add(2,3) // 5
```
- 함수 식별자가 있어도 되고 없어도 된다.
- 함수 호이스팅 방식에 영향을 안 받는다.
- 변수 호이스팅 처럼 런타임 이전 환경에서 add가 먼저 선언되고 **런타임 환경에서 할당문을 만나면 그때 함수객체가 할당된다.**
- 할당된 이후에 호출이 가능하다. 할당 이전에 호출 시 undefined(변수와 같다)

``` javascript
var foo = function bar() {}; // 표현식에서 bar 식별자(함수 이름)는 별로 추천하지 않지만, 재귀함수를 사용할때는 사용한다 bar 식별자는 bar 함수 스코프 내에서만 쓸 수 있다.
```

- 위 경우엔 bar 함수 내부에서 밖에 인식이 안되기 때문에 외부에서 bar 식별자를 사용할 수 없다.
- 위에 이유로 일반적으로 함수리터럴에 네이밍을 붙이지 않는다.

<hr class="sub" />

### 함수 선언문과 함수 표현식의 생성시점과 호이스팅 비교

``` javascript
// 함수 참조
console.dir(add); // ƒ add(x, y)
console.dir(sub); // undefined

// 함수 호출
console.log(add(2, 5)); // 7
console.log(sub(2, 5)); // TypeError: sub is not a function

// 함수 선언문
function add(x, y) {
  return x + y;
}

// 함수 표현식
var sub = function (x, y) {
  return x - y;
};
```
위 예제처럼 함수 선언문으로 정의한 함수와 함수 표현식으로 정의한 함수의 생성 시점이 다르다.


<hr class="sub" />

### Function 생성자 함수(Function Constructor)
자바스크립트가 기본 제공하는 빌트인 함수인 Function 생성자 함수*는 매개변수 목록과 함수 몸체를 문자열로 전달받는다. new 연산자와 함께 호출하며 생성된 함수 객체를 반환한다. (사실 new 연산자 없이 호출하여도 결과는 동일하다.)

> 생성자함수(Constructor Function)<br>
생성자 함수는 객체를 생성하는 함수를 말한다. 객체를 생성하는 방식은 객체 리터럴 이외에 다양한 방법이 있다.<br>
자세한 내용은 [여기](/posts/javascript/constructor)에서 살펴볼 수 있다.

<br>

``` javascript
var add = new Function('x', 'y', 'return x + y');
```

<br>

- 마지막 argument 이전 argument까지 parameter로 판단한다.
- 마지막 argument를 함수 몸체에 들어갈 문들로 인식한다.

Function 생성자 함수로 생성한 함수는 함수 선언문이나 함수 표현식으로 생성한 함수와 다르게 동작한다. <b>Function 생성자 함수 방식으로 생성한 함수는 클로저를 생성하지 않는다.</b>

<hr class="sub" />

### 화살표 함수(Arrow Function): ES6

``` javascript
var add = (x, y) => x + y;
```
주로 콜백 함수를 만들때 주로 쓴다.

<br>
<br>

## 함수 호출
- 함수호출문은 표현식이다. 이유는 리턴 받은 값을 변수에 담아서 표현을 하고, 변수에 담을 수 있다는 것은 값이라는 것이다. 한마디로 함수호출문은 표현식이면서 값이다.
- 함수 내부에 선언한 변수(매개변수 포함)는 함수가 **호출**되면 함수에 있는 문들이 한줄 한줄 실행되기 이전에 선언된다.

<br>
<br>

## 인수(argument)와 매개변수(parameter)

``` javascript
function add(x, y) {
  return x + y;
}

console.log(add(2)); // 1+ y(undefined) = NaN
// 매개변수는 호출할때 변수 선언이 된다.
```

``` javascript
function add(x, y) {
  return x + y;
}

console.log(add(2, 5, 10)); // 7
// 함수 객체는 argument라는 객체를 가지고 있어 맨 마지막은 버려지지 않고 가지고 있다.
```
위 코드는 자바스크립트 문법상 어떠한 문제도 없으므로 자바스크립트 엔진은 아무런 이의 제기 없이 위 코드를 실행할 것이다. 이러한 상황이 발생하는 이유는

- 자바스크립트 함수는 매개변수와 인수의 개수가 일치하는지 확인하지 않는다.
- 자바스크립트는 동적 타입 언어이다. 따라서 자바스크립트 함수는 매개변수의 타입을 사전에 지정하지 않는다.

따라서 자바스크립트 함수는 적절한 인수가 전달되었는지 확인이 필요하다.
``` javascript
function add(x, y) {
  if (typeof x !== 'number' || typeof y !== 'number') {
    throw new TypeError('매개변수에 숫자 타입이 아닌 값이 할당되었습니다.');
  }

  return x + y;
}

console.log(add(2));        // TypeError: 매개변수에 숫자 타입이 아닌 값이 할당되었습니다.
console.log(add('a', 'b')); // TypeError: 매개변수에 숫자 타입이 아닌 값이 할당되었습니다.

// 이런 배보다 배꼽이 더 큰 현상이 일어나 요즘에 타입스크립트를 쓰는 추세이다.
```

<hr class="sub" />

### 매개변수(parameter)의 개수
매개변수(parameter)는 순서에도 의미가 있다.<br>
매개변수(parameter)는 0개 이상을 갖고 2개 이상일때 (,)로 구분한다. 매개변수의 이상적인 개수는 0개이다. 매개변수가 많으면 많을수록 호출시 순서를 신경을 많이 써야되는 불편함이 있다. 보통 4개 이상이면 보통 객체(자료 구조)로 넘겨준다.

예를들어 ajax 와 같다.

``` javascript
$.ajax({
  method: 'POST',
  url: '/user',
  data: { id: 1, name: 'Lee' },
  cache: false
});

// 하나의 객체로 넘긴다.
// 만약 4개의 값을 넘기려면 하나 하나마다 순서를 맞춰 줘야된다.
// 이렇게되면 argument처럼 입력 순서에 제약을 받지 않는다.
// 객체의 property 순서는 상관없고, property의 key가 중요하기 때문에 입력 순서와는 상관 없어져서 편의해진다.
// 객체를 변수를 묶지 않고, 한번에 argument로 넘기는 이유는 만약 변수로 담게되면 어느 순간 다른 값에 참조에 의한 전달로 인해 수정될 위험성이 있기 때문이다.
```

## 외부 상태의 변경과 함수형 프로그래밍
argument에서 parameter로 넘길때도
- 변수 할당처럼 값에 의한 전달(pass by value)과 참조에 의한 전달(call by value)은 같은 개념이다.
- 객체 또한 같이 참조 값을 넘겨준다. 그래서 객체의 변화에 추적이 어렵다.

``` javascript
function changeVal(primitive, obj) {
  primitive += 100;
  obj.name = 'Kim';
}

// 외부 상태
var num = 100;
var person = { name: 'Lee' };

console.log(num); // 100
console.log(person); // {name: "Lee"}

// 원시값은 값 자체가 복사되어 전달되고 객체는 참조값이 복사되어 전달된다.
changeVal(num, person);

// 원시 값은 원본이 훼손되지 않는다.
console.log(num); // 100

// 객체는 원본이 훼손된다.
console.log(person); // {name: "Kim"}
```

<br>
<br>

## 반환문
- 말 그대로 값을 반환하며 함수를 종료 시킨다.
- <b>함수 몸체 내부에서만</b> 사용할 수 있다.
- return 문이 없으면 암묵적으로 **undefined** 로 반환한다.
- return문은 필수가 아니다.

<br>

``` javascript
function multiply(x, y) {
  return x * y; // 값의 반환
}

// 함수는 반환값으로 평가된다.
var result = multiply(3, 5);

console.log(result); // 15

```
return문 뒤에 문은 실행되지 않는다.

<br>

__*리턴문 뒤에 개행을 했을 경우*__
``` javascript
function multiply(x, y) {
  // return 키워드와 반환값 사이에 줄바꿈이 있으면
  return // 개행이 이루어지면 자바스크립트 엔진은 세미콜론 자동 삽입 기능(ASI)에 의해 세미콜론이 추가된다.
  x * y; // 무시된다.
}

console.log(multiply(3, 5)); // undefined
```

<br>
<br>

## 즉시실행함수(IIFE)★
- 함수를 정의하면서 바로 호출한다.
- 일회성 함수이다.
- 많이 쓰인다.
- 클로저와 같이 쓰인다.

``` javascript
// 익명 즉시 실행 함수
(function () {
  var a = 3;
  var b = 5;
  return a * b;
}());
```
- 함수 리터럴로 평가되기 위해 그룹 연산자로 묶어주었다.
- 맨뒤에 ()는 함수 리터럴을 바로 호출하는 걸 의미한다.
- function 안에 변수가 되기 때문에 전역변수를 지역변수로 바꿀 수 있다.

*함수 선언문이 아닌 함수 리터럴로 평가되기 위한 방법*
``` javascript
(function () {
  // ...
}());  // 가장 일반적인 방식

(function () {
  // ...
})();

!function () {
  // ...
}();

+function () {
  // ...
}();
```
<br>
<br>

## 재귀 함수
- 자기 자신을 호출하는 함수이다.
- 탈출 조건을 주지 않으면 무한 루프가 된다.
- 일반적인 재귀함수는 for문이나 while문으로 대처할 수 있는 가능성이 있다.
- 중첩관계에 있는 뎁스를 딥 카피할때 사용
- 알고리즘 풀이에 많이 사용된다.

``` javascript
// 팩토리얼(계승)은 1부터 자신까지의 모든 양의 정수의 곱이다.
// n! = 1 * 2 * ... * (n-1) * n
function factorial(n) {
  // 탈출 조건: n이 1 이하일 때 재귀 호출을 멈춘다.
  if (n <= 1) return 1;
  return factorial(n - 1) * n;
}

console.log(factorial(0)); // 0! = 1
console.log(factorial(1)); // 1! = 1
console.log(factorial(2)); // 2! = 1 * 2 = 2
console.log(factorial(3)); // 3! = 1 * 2 * 3 = 6
console.log(factorial(4)); // 4! = 1 * 2 * 3 * 4 = 24
console.log(factorial(5)); // 5! = 1 * 2 * 3 * 4 * 5 = 120
```

<br>
<br>

## 중첩 함수(nested function)★
함수에도 상하위 관계(중첩 또는 외부관계)가 있다.
일반적으로 중첩 함수는 자신을 포함하는 외부 함수(outer function)을 돕는 헬퍼 함수(helper function)의 역할을 한다. 자신을 포함하고 있는 외부 함수의 밖에서는 중첩 함수를 호출할 수 없다.

``` javascript
function outer() {
  var x = 1;

  // 중첩 함수(외부에서 호출 못하니까 부품이라 생각하면 편하다.)
  function inner() {
    var y = 2;
    // 외부 함수의 변수를 참조할 수 있다.
    console.log(x + y); // 3
  }

  inner();
  // 중첩 함수의 변수를 참조할 수 없다.
  console.log(x + y); // ReferenceError: y is not defined
}

outer();
```

<br>
<br>

## 콜백함수★
- 나중에 호출되는 것을 의미한다.
- 콜백함수를 Argument로 전달 받는 고차 함수가 호출한다.

Ajax와 같이 외부에서 콜백함수를 못건들게 하려고.
선언하면서 줄거냐(유동) 중첩함수처럼 내부에 쓸거냐(고정)의 차이
내가 원하는 것을 주입 할 수 있고, 중첩함수는 고정 되있다.
예를들어 flag를 이용해서 if문으로 쓴거랑 비슷한 원리이다.

> 하나의 제품은 전달받는 고차 함수<br>
무언가를 만드는 기계가 콜백 함수

중첩함수와는 다르게 외부에서 바꿔서 껴주는 식, 콜백함수에 의해서 자신의 기능이 변한다.

*콜백함수를 사용하지 않을 경우의 예시*
``` javascript
function printToUpperCase() {
  var string = 'Hello';
  return string.toUpperCase();
}

console.log(printToUpperCase()); // HELLO

function printToLowerCase() {
  var string = 'Hello';
  return string.toLowerCase();
}

console.log(printToLowerCase()); // hello
```

*콜백함수를 사용했을때의 예시*
``` javascript
// 콜백 함수를 전달받는 함수
function print(f) {
  var string = 'Hello';
  // 미리 설계 되어 있어야된다.
  // 콜백 함수를 전달받는 함수가 콜백 함수의 호출 시기를 결정하고 호출
  return f(string);
}

// print 함수에 콜백 함수를 전달하면서 호출
var res1 = print(function (str) {
  return str.toUpperCase();
});

// print 함수에 콜백 함수를 전달하면서 호출
var res2 = print(function (str) {
  return str.toLowerCase();
});

// 다른 곳에서 안쓰려고(일회성) 사용하기 위해 print(function 자체를 넣은 것이다)

console.log(res1, res2); // HELLO hello
```

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

  **참고한 사이트**<br>

  [https://poiemaweb.com](https://poiemaweb.com)

</div>
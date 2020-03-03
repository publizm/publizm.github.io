---
title: 생성자 함수에 의한 객체생성
date: "2019-10-16"
template: "post"
draft: false
slug: "/posts/javascript/constructor"
category: "Javascript"
tags:
  - "new"
  - "생성자 함수"
description: "생성자 함수에 의한 객체 생성에 대해 알아보자"
---
<span class="notice">
  <em>TIL 내용이므로 잘못된 내용은 댓글 부탁드립니다</em>
</span>

<div id="toc">

**:link:  Table Of Contents**

- [Object 생성자 함수(built-in)](#object-생성자-함수built-in)
- [생성자 함수★★](#생성자-함수★★)
  - [객체 리터럴에 의한 객체 생성 방식](#객체-리터럴에-의한-객체-생성-방식)
  - [생성자 함수에 의한 객체 생성 방식](#생성자-함수에-의한-객체-생성-방식)
      - [this란?](#this란)
  - [내부 메소드 [[Call]]과 [[Construct]]](#내부-메소드-call과-construct)
      - [constructor와 non-constructor의 구분](#constructor와-non-constructor의-구분)
  - [생성자 함수의 인스턴스 생성과정★★](#생성자-함수의-인스턴스-생성과정★★)
      - [1. 인스턴스 생성과 this 바인딩](#1-인스턴스-생성과-this-바인딩)
      - [2. 인스턴스 초기화](#2-인스턴스-초기화)
      - [3. 인스턴스 반환](#3-인스턴스-반환)
  = [new 연산자](#new-연산자)
  - [new 연산자를 안 붙였을때의 방어코드](#new-연산자를-안-붙였을때의-방어코드)
      - [new.target(ES6)](#newtargetes6)
      - [instanceof(ES5)](#instanceofes5)
</div>

객체를 만드는 방법은 5가지가 있다.
- 객체 리터럴을 이용해 만드는 방법(Object.create)
- Object 생성자 함수
- 생성자 함수로 만드는 방법
- class를 이용한 방법

<br>

__생성자(constructor) 함수란?__<br>
<b>new 연산자와 함께 호출하여 객체(인스턴스)를 생성하는 함수를 말한다.</b>생성자 함수에 의해 생성된 객체를 인스턴스(instance)*라 한다.

생성자함수 또는 class는 원하는 내용을 담은 **객체의 설계서**라고 생각할 수 있다.

> **인스턴스**<br>
인스턴스는 객체가 메모리에 저장되어 실제로 존재하는 것에 초점을 맞춘 용어이다. 생성자 함수도 객체이기 때문에 생성자 함수나 클래스가 생성한 객체를 다른 객체와 구분하기 위해 인스턴스라고 부른다.


## Object 생성자 함수(built-in)
new 연산자와 함께 Object 생성자 함수를 호출하면 빈 객체를 생성하여 반환한다. 빈 객체를 생성한 이후 프로퍼티 또는 메소드를 추가하여 객체를 완성할 수 있다.

``` javascript
// 빈 객체의 생성
const person = new Object();

console.log(person); // {}

// 프로퍼티 추가
person.name = 'Lee';
person.sayHello = function () {
  console.log('Hi! My name is ' + this.name);
};

console.log(person); // {name: "Lee", sayHello: ƒ}
person.sayHello(); // Hi! My name is Lee
```
리턴 값으로 객체(인스턴스)를 반환한다.
생성자함수로 인해 새로 생긴 객체를 인스턴스라고 한다.

자바스크립트는 Object 생성자 함수 이외에도 String, Number, Boolean, Function, Array, Date, RegExp 등의 빌트인(intrinsic 내장) 생성자 함수를 제공한다.

``` javascript
// String 생성자 함수에 의한 String 객체 생성
const strObj = new String('Lee');
console.log(typeof strObj); // object
console.log(strObj);        // String {"Lee"}

// Number 생성자 함수에 의한 Number 객체 생성
const numObj = new Number(123);
console.log(typeof numObj); // object
console.log(numObj);        // Number {123}

// Boolean 생성자 함수에 의한 Boolean 객체 생성
const boolObj= new Boolean(true);
console.log(typeof boolObj); // object
console.log(boolObj);        // Boolean {true}

// Function 생성자 함수에 의한 Function 객체(함수) 생성
const func = new Function('x', 'return x * x');
console.log(typeof func); // function
console.dir(func);        // ƒ anonymous(x )

// Array 생성자 함수에 의한 Array 객체(배열) 생성
const arr = new Array(1, 2, 3);
console.log(typeof arr); // object
console.log(arr);        // (3) [1, 2, 3]

// RegExp 생성자 함수에 의한 RegExp 객체(정규 표현식) 생성
const regExp = new RegExp(/ab+c/i);
console.log(typeof regExp); // object
console.log(regExp);        // /ab+c/i

// Date 생성자 함수에 의한 Date 객체 생성
const date = new Date();
console.log(typeof date); // object
console.log(date);        // Tue Mar 19 2019 02:38:26 GMT+0900 (한국 표준시)
```
반드시 Object 생성자 함수를 사용해 빈 객체를 생성해야 하는 것은 아니다. 객체를 생성하는 방법은 객체 리터럴을 사용하는 것이 더 간편하다. Object 생성자 함수 방식은 특별한 이유가 없다면 그다지 유용해 보이지 않는다.

<br>

## 생성자 함수★★
객체 리터럴에 의한 객체 생성 방식의 장단점
- 직관적이고 간편하다
- 단 하나의 객체만을 생성한다.


__객체 리터럴에 의한 객체 생성 방식과 생성자 함수의 비교__<br>
객체 리터럴과 다른점은 <b>함수를 호출해서 객체를 만드는 것이다.</b> 객체 리터럴은 만들때마다 똑같은 객체를 만든다면 계속 작성해야하지만 생성자함수는 호출만 여러번 해주면되고, 또 for문으로 만들수도 있다. <b>같은 객체를 대량 생산할때 유용하다.</b>

<br>

### 객체 리터럴에 의한 객체 생성 방식

``` javascript
const circle1 = {
  radius: 5,
  getDiameter() {
    return 2 * this.radius;
  }
};

console.log(circle1.getDiameter()); // 10

const circle2 = {
  radius: 10,
  getDiameter() {
    return 2 * this.radius;
  }
};

console.log(circle2.getDiameter()); // 20
```
메소드는 같고 상태 데이터만 다른 경우이다. 객체 리터럴에 의한 객체 생성방식은 이러한 중복 현상이 생길때마다 코드를 매번 복사해서 상태 데이터만 바꿔서 써야되는 불편함이 있다.<br>
이럴 경우 생성자 함수를 사용하는 것이 유용하다.

<hr class="sub" />

### 생성자 함수에 의한 객체 생성 방식

``` javascript
// 생성자 함수
function Circle(radius) {
  // 생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
  this.radius = radius;
  this.getDiameter = function() {
    return 2 * this.radius;
  };
}

// 인스턴스의 생성
const circle1 = new Circle(5); // 반지름이 5인 Circle 객체를 생성
const circle2 = new Circle(10); // 반지름이 10인 Circle 객체를 생성

// 이때 circle1과 circle2의 객체는 서로 다른 객체이다.

console.log(circle1.getDiameter()); // 10
console.log(circle2.getDiameter()); // 20
```

생성자 함수에 의한 객체 생성 방식은 마치 객체(인스턴스)를 생성하기 위한 템플릿(클래스)처럼 생성자 함수를 사용하여 프로퍼티 구조가 동일한 객체 여러 개를 간편하게 생성할 수 있다.

<br>

여기서 필수로 알아야될 개념인 **this**가 있다.

#### this란?
객체 자신의 프로퍼티나 메소드를 참조하기 위한 <b>자기 참조 변수</b>이다.<br>
this가 가리키는 값, 즉 this 바인딩은 <b>함수 호출 방식에 따라 동적으로 결정된다</b>


<article class="board-tbl">

| 함수 호출 방식 | this가 가리키는 값 |
| :---: | :--- |
| 일반 함수로서 호출 | 전역 객체<br>- 클라이언트 환경(브라우저): window,<br>- 서버사이드 환경(node.js) : global |
| 메소드로서 호출 | 메소드를 호출한 객체 |
| 생성자 함수로서 호출 | 생성자 함수가 생성할 인스턴스 |

</article>

*예시를 보자*
``` javascript
// 함수는 다양한 방식으로 호출될 수 있다.
function foo() {
  console.log(this);
}

// 일반적인 함수로서 호출
// 전역 객체는 브라우저 환경에서는 window, Node.js 환경에서는 global을 가리킨다.
foo(); // window

// 메소드로서 호출
const obj = { foo }; // ES6 프로퍼티 축약 표현
obj.foo(); // obj

// 생성자 함수로서 호출
const inst = new foo(); // inst
```
생성자 함수는 이름 그대로 객체(인스턴스)를 생성하는 함수이다. 하지만 자바와 같은 클래스 기반 객체지향 언어의 생성자(constructor)와는 다르게 그 형식이 정해져 있는 것이 아니라 **일반 함수와 동일한 방법으로 생성자 함수를 정의하고 new 연산자와 함께 호출하면 해당 함수는 생성자 함수로 동작한다.**
만약 new 연산자와 함께 생성자 함수를 호출하지 않으면 생성자 함수가 아니라 일반 함수로 동작한다. 이 부분은 아래의 방어코드로 알아보자.

<hr class="sub" />

### 내부 메소드 [[Call]]과 [[Construct]]
함수 선언문 또는 함수 표현식으로 정의한 함수는 일반적인 함수로서 호출할 수 있는 것은 물론 생성자 함수로서 호출 할 수 있다.

**함수는 객체이므로 일반 객체와 동일하게 동작할 수 있다. 따라서, 함수 객체는 일반 객체의 내부 슬롯과 내부 메소드를 모두 가지고 있다.**

``` javascript
// 함수는 객체이다.
function foo() {}

// 함수는 객체이므로 프로퍼티를 소유할 수 있다.
foo.prop = 10;

// 함수는 객체이므로 메소드를 소유할 수 있다.
foo.method = function () {
  console.log(this.prop);
};

foo.method(); // 10

// 일반함수로 호출할때 call 내부함수 호출
foo();  > foo[[call]]();

// 생성자함수로 호출 할때 Constructor 내부 함수 호출
new foo(); > foo[[Construct]]();
```

함수 객체는 함수로서 동작하기 위해 일반 객체의 내부 슬롯과 내부 메소드와는 별개로 추가적으로 내부 슬롯과 내부 메소드를 가지고 있다.


내부 메소드 [[Call]]은 모든 함수에 존재한다.
내부 메소드인 [[Construct]]를 갖는 함수 객체를 **constructor**, [[Construct]]를 갖지 않는 함수 객체를 **non-constructor**라고 부른다. <b>한마디로 모든 함수 객체는 callerble이지만 모든 함수 객체가 constructor인 것은 아니다.</b>

callable은 호출할 수 있는 객체, 즉 함수를 말하며, constructor는 생성자 함수로서 호출할 수 있는 객체를 의미한다. 생성자 함수로서 호출할 수 있다는 것은 new 연산자(또는 super 연산자*)와 함께 호출하는 것을 의미한다.

함수가 일반적인 함수로서 호출되면 함수 객체의 내부 메소드 [[Call]]가 호출되고 new 연산자(또는 super 연산자*)와 함께 생성자 함수로서 호출되면 내부 메소드 [[Construct]]가 호출된다.

> **super 키워드**<br>
super는 ES6에서 도입된 클래스에서 부모 클래스를 참조(this와 유사하다)할 때 또는 부모 클래스의 생성자(constructor)를 호출할 때 사용한다.

<br>

#### constructor와 non-constructor의 구분
자바스크립트 엔진은 함수를 생성할 때, FunctionCreate이라는 추상 연산(abstract operation)을 사용한다.
추상 연산 FunctionCreate는 함수 정의가 평가될 때 호출된다. 이때 함수 정의 방식에 따라 FunctionCreate의 첫번째 매개변수 kind에 함수의 종류를 나타내는 문자열이 전달된다.

<article class="board-tbl">

| 구분 | 함수의 종류를 나타내는 문자열 |
| :--- | :---: |
| 일반 함수 정의(함수 선언문, 함수 표현식)를 평가할 때 | **Normal** |
| 화살표 함수 정의를 평가할 때 | **Arrow** |
| 메소드 정의를 평가할 때 | **Method** |

</article>

<br>

주의할 것은 ECMAScript 사양에서 메소드 정의로 인정하는 범위가 일반적인 메소드보다 좁다.

``` javascript
// 일반 함수 정의 : kind = 'Normal'
function foo() {}
const bar = function () {};
// 프로퍼티 x에 할당된 것은 일반 함수 정의이다. 메소드 정의로 인정하지 않는다.
const baz = {
  x: function () {}
};

// 일반 함수로 정의된 함수만이 constructor이다.
new foo(); // OK
new bar(); // OK
new baz.x(); // OK

// 화살표 함수 정의 : kind = 'Arrow'★
const arrow = () => {};

new arrow(); // TypeError: arrow is not a constructor

// 메소드 정의 : kind = 'Method'
// ES6의 메소드 축약 표현만을 메소드 정의로 인정한다.'★
const obj = {
  x() {}
};

new obj.x(); // TypeError: obj.x is not a constructor
```
일반적으로 프로퍼티의 값인 함수는 모두 메소드로 통칭한다. 하지만 ECMAScript 사양에서 “메소드 정의”란 ES6의 메소드 축약 표현만을 의미한다. 다시 말해 함수가 어디에 할당되어 있는지에 따라 메소드 정의인지를 판단하는 것이 아니라 함수 정의 방식에 따라 함수의 종류를 구분한다.

위 예제와 같이 <b>일반 함수로 정의된 함수만이 constructor이다. 함수의 종류가 Arrow, Method인 함수는 non-constructor가 된다. 즉, 일반 함수로 정의된 함수만이 생성자 함수로서 호출될 수 있다.</b>
method와 화살표 함수는 [[Construct]]가 없다. 즉, non-constructor로 new 연산자로 생성할 수 없다.
그래서 축약표현으로 표현한 것은 스펙상 메소드이기 때문에 new 연산자로 생성자 함수를 만들 수 없다.

<hr class="sub" />

### 생성자 함수의 인스턴스 생성과정★★

``` javascript
function Person(name) { // 생성자함수의 함수이름은 일반적으로 파스칼케이스로 한다.
  // 인스턴스 초기화
  console.log(this); // 프로퍼티 추가하기 전이니까 빈객체이다.
  this.name  = name; // <- *함수 내부이므로 : 가 아닌 =
  console.log(this); // 프로퍼티 추가 후
  this.sayHi = function () {
    console.log(`Hi My name is ${this.name}`);
  };

  console.log(this);
}

const me = new Person('Lee');
const you = new Person('kim');
// 1. 생성자함수로서 호출이 되면 function 선두에서 빈 객체를 만들고
// 2. 생성한 빈 객체를 this(인스턴스)에 바인딩한다.
// 3. 기술한 코드를 실행한다, this에 프로퍼티 추가한다.
// 4. return this(인스턴스)를 한다. 절대 개발자가 return문을 따로 주면 안된다.

console.log(me);
console.log(you);
```

<br>

#### 1. 인스턴스 생성과 this 바인딩
new 연산자와 생성자 함수를 이용해 식별자에 할당을 하면 암묵적으로 빈 객체가 생성된다. 이 빈 객체가 바로 생성자 함수가 생성한 인스턴스이다. 이때 <b>생성자 함수가 생성한 인스턴스의 프로토타입으로 생성자 함수의 prototype 프로퍼티가 가리키는 객체가 설정된다. 그리고 암묵적으로 생성된 빈 객체, 즉 인스턴스는 this에 바인딩*된다.</b> 생성자 함수 내부의 this가 생성자 함수가 생성할 인스턴스를 가리키는 이유가 바로 이것이다.

> **바인딩(binding)**<br>
바인딩이란 식별자와 값을 연결하는 과정을 의미한다. 예를 들어 변수는 할당에 의해 값이 바인딩 된다.

``` javascript
function Circle(radius) {
  // 1. 암묵적으로 빈 객체가 생성되고 this에 바인딩된다.
  console.log(this); // Circle {}
  console.log(Object.getPrototypeOf(this) === Circle.prototype); // true


  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}
```

<hr />

#### 2. 인스턴스 초기화
생성자 함수에 기술되어 있는 코드가 실행되어 this에 바인딩되어 있는 인스턴스를 초기화한다. 즉, <b>this에 바인딩되어 있는 인스턴스에 프로퍼티나 메소드를 추가하고 생성자 함수가 인수로 전달받은 초기값을 인스턴스 프로퍼티에 할당하여 초기화하거나 고정값을 할당한다.</b> 이 처리는 개발자가 기술한다.

``` javascript
function Circle(radius) {
  // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩된다.

  // 2. this에 바인딩되어 있는 인스턴스를 초기화한다.
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}
```

<hr />

#### 3. 인스턴스 반환
생성자 함수 내부의 모든 처리가 끝나면 <b>완성된 인스턴스를 바인딩 된 this가 암묵적으로 반환된다.</b>

``` javascript
function Circle(radius) {
  // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩된다.

  // 2. this에 바인딩되어 있는 인스턴스를 초기화한다.
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };

  // 3. 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다
}

// 인스턴스 생성. Circle 생성자 함수는 암묵적으로 this를 반환한다.
const circle = new Circle(1);
console.log(circle); // Circle {radius: 1, getDiameter: ƒ}
```

만약 this가 아닌 다른 객체를 <b>명시적으로 반환하면 this가 반환되지 못하고 return 문에 명시한 객체가 반환된다.</b>

``` javascript
function Circle(radius) {
  // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩된다.

  // 2. this에 바인딩되어 있는 인스턴스를 초기화한다.
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };

  // 3. 암묵적으로 this를 반환한다.
  // 명시적으로 객체를 반환하면 암묵적인 this 반환이 무시된다.
  return {};
}

// 인스턴스 생성. Circle 생성자 함수는 명시적으로 반환한 객체를 반환한다.
const circle = new Circle(1);
console.log(circle); // {}
```

명시적으로 <b>원시 값을 반환하면 원시 값 반환은 무시되고 암묵적으로 this가 반환된다.</b>

``` javascript
function Circle(radius) {
  // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩된다.

  // 2. this에 바인딩되어 있는 인스턴스를 초기화한다.
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };

  // 3. 암묵적으로 this를 반환한다.
  // 명시적으로 원시 값을 반환하면 원시 값 반환은 무시되고 암묵적으로 this가 반환된다.
  return 100;
}

// 인스턴스 생성. Circle 생성자 함수는 명시적으로 반환한 객체를 반환한다.
const circle = new Circle(1);
console.log(circle); // Circle {radius: 1, getDiameter: ƒ}
```

따라서 함수 내부에서 명시적으로 this가 아닌 다른 값을 반환하는 것은 생성자 함수의 기본 동작을 훼손한다. 생성자 함수 내부에서 return문은 반드시 생략해야한다.

<hr class="sub" />

### new 연산자
<b>new가 있는지 없는지에 따라 완전 동작이 달라진다.</b>
일반 함수와 생성자 함수에 특별한 형식적 차이는 없다. <b>new 연산자와 함께 함수를 호출하면 해당 함수는 생성자 함수로 동작한다.</b> 단, new 연산자와 함께 호출하는 함수는 non-constructor가 아닌 constructor이여야 한다.

``` javascript
// 생성자 함수
function Circle(radius) { // 전역 함수가 된다.
  this.radius = radius; // 전역 변수가 된다.
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

// new 연산자 없이 생성자 함수 호출하면 일반 함수로서 호출된다.
const circle = Circle(5);
console.log(circle); // undefined

// 일반 함수 내부의 this는 전역 객체 window를 가리킨다.
console.log(radius); // 5
console.log(getDiameter()); // 10

circle.getDiameter();
// TypeError: Cannot read property 'getDiameter' of undefined
```

<hr class="sub" />

### new 연산자를 안 붙였을때의 방어코드

#### new.target(ES6)
new.target은 this와 유사하게 모든 함수 내부에서 암묵적인 지역 변수와 같이 사용되며 메타 프로퍼티(meta propery)라고 부른다. IE는 new.target을 지원하지 않으므로 주의하기 바란다.

함수 내부에서 new.target를 사용하면 new 연산자와 함께 함수가 호출되었는지 확인할 수 있다. 함수가 new 연산자와 함께 호출되면 함수 내부의 new.target은 함수 자신을 가리킨다. new 연산자 없이 호출된 함수 내부의 new.target은 undefined이다.

``` javascript
// 생성자 함수
function Circle(radius) {
  // 이 함수가 new 연산자와 함께 호출되지 않았다면 new.target은 undefined이다.
  if (!new.target) { // new 붙였는지 안 붙였는지 체크, 없다면 (!undefined === true)
    // new 연산자와 함께 호출하여 생성된 인스턴스를 반환한다.
    return new Circle(radius);
  }

  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

// new 연산자 없이 생성자 함수를 호출하여도 생성자 함수로서 호출된다.
const circle = Circle(5);
console.log(circle.getDiameter());
```

<hr />

#### instanceof(ES5)
``` javascript
// Scope-Safe Constructor Pattern
function Circle(radius) {
  // 생성자 함수가 new 연산자와 함께 호출되면 함수의 선두에서 빈 객체를 생성하고
  // this에 바인딩한다. 이때 this와 Circle은 프로토타입에 의해 연결된다.

  // 이 함수가 new 연산자와 함께 호출되지 않았다면 이 시점의 this는 전역 객체 window를 가리킨다.
  // 즉, this와 Circle은 프로토타입에 의해 연결되지 않는다.
  if (!(this instanceof Circle)) { // this가 Circle을 만들었는지 체크
    // new 연산자와 함께 호출하여 생성된 인스턴스를 반환한다.
    return new Circle(radius);
  }

  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

// new 연산자 없이 생성자 함수를 호출하여도 생성자 함수로서 호출된다.
const circle = Circle(5);
console.log(circle.getDiameter()); // 10
```
new 연산자와 함께 생성자 함수에 의해 생성된 객체(인스턴스)는 프로토타입에 의해 생성자 함수와 연결된다. 이를 이용해 new 연산자와 함께 호출되었는지를 확인할 수 있다

<br>
<br>
<br>
<br>
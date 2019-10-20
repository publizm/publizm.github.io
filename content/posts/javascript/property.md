---
title: Property
date: "2019-10-16"
template: "post"
draft: false
slug: "/posts/javascript/property"
category: "Javascript"
tags:
  - "property"
description: "프로퍼티 정의"
---
<span class="notice">
  <em>TIL 내용이므로 잘못된 내용은 댓글 부탁드립니다</em>
</span>

__*객체의 프로퍼티를 간단히 리마인드 해보자.*__<br>

``` javascript
const person = {
  name: 'Lee',
  getName() { // ES6 문법, ECMA 스크립트 이를 스펙에서는 메소드라 부른다

    return person.name;
    // 위의 문제점은 객체 이름이 바뀌면 식별자를 바꿔야 된다는 문제점이 있다.
    // 일반적으로 this(자기 참조 변수)를 쓴다.

    return this.name; // 앞의 this를 '내가 속해있는 객체의' 라고 해석하면 읽기 수월하다.
  },

  getName: function () { // ES5문법, ECMA 스크립트 이를 스펙에서는 함수라 부른다

  }
};

person.getName(); // <- 함수를 호출한 것
// 메소드를 호출 했을때 해당 원하는 값이 출력은 안된다
// 왜냐하면 return this.name; 즉, this.name이라는 값을 저장하지 않았기 때문이다.
// 마침표(.)를 찍는 것은 앞에 있는 식별자가 객체라는 것을 의미한다.
// 반환 값으로 this.name이라는 값을 받았으니 person.getName()은 표현식인 문이 된다.

person.getName; // <- ()가 없다. 즉, 함수를 참조하는 것(예를 들어 콜백함수일때 참조를 보내준다.)

const name = person.getName(); // 표현식인 문을 담아준다.

console.log(name); // Lee
```

*객체의 프로퍼티란*
- 객체의 속성을 나열한다.
- 객체 속성의 집합이다.
- 객체를 프로퍼티로 추상화 할 수있다.

*프로퍼티의 키:<br>*
문자열 또는 빈 문자열, 심볼이 올 수 있다. (식별자 네이밍 규칙을 따르면 자동적으로 문자열로 변환해준다.)

*프로퍼티의 값:<br>*
객체의 상태(state)를 의미(대변)한다. 변수 또한 마찬가지로 변수의 값은 상태를 저장하는 것이다. 자바스크립트가 값으로 취급할 수 있는 모든 값이 올 수 있다.

*함수(es5),메소드(es6):<br>*
객체의 상태 값을 조작하는 행위이다.

## 프로퍼티 정의
프로퍼티에서에도 attribute의 값이 있다. 프로퍼티 정의란 프로퍼티 attribute의 값을 정의하여 프로퍼티의 상태를 **관리하는 것**을 말한다.

<b>자바스크립트 엔진은 프로퍼티를 생성(**객체 리터럴의 평가 또는 프로퍼티 동적 생성**)할 때, 프로퍼티의 상태를 나타내는 프로퍼티 Attribute를 기본값으로 자동 정의한다.</b>

> 프로퍼티 Arrtibute를 참조하는 방법<br>
프로퍼티 어트리뷰트는 <b>Object.getOwnPropertyDescriptor</b> 메소드를 사용해 참조할 수 있다. 이 메소드는 프로퍼티 어트리뷰트 정보를 제공하는 객체인 프로퍼티 디스크립터(PropertyDescriptor)를 반환한다.

``` javascript
const person = {
  name: 'Lee',
  getName() {
    return this.name;
  },
};

const name = person.getName();

console.log(name);

console.log(Object.getOwnPropertyDescriptors(person)); // getOwnPropertyDescriptor - PropertyDescriptor를 리턴해준다.

// getOwnPropertyDescriptor의 출력 값
// {
//   name: {
//     value: 'Lee', // value가 있는 프로퍼티를 데이터 프로퍼티라 한다.
//     writable: true,
//     enumerable: true, // 열거할 수 있는가(for in문 에서 객체를 나열할때 노출 시킬지 여부)
//     configurable: true // 위 설정들을 수정 가능한지 여부
//   },
//   getName: {
//     value: [Function: getName],
//     writable: true,
//     enumerable: true,
//     configurable: true
//   }
// }
```
프로퍼티가 동적 생성될 때 자바스크립트 엔진은 프로퍼티 어트리뷰트를 기본값으로 정의한다. 이미 정의된 프로퍼티 어트리뷰트를 재정의하는 것도 가능하다.

## 프로퍼티의 종류
프로퍼티는 데이터 프로퍼티와 접근자 프로퍼티로 구분할 수 있다.

- 데이터 프로퍼티(Data property)<br>
  키와 값으로 구성된 일반적인 프로퍼티다.

- 접근자 프로퍼티(Accessor property)<br>
  자체적으로는 값을 갖지 않고, 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수(Accessor function)로 구성된 프로퍼티다.

``` javascript
const person = {
  // 데이터 프로퍼티
  firstName: 'Cheol-hwan',
  lastName: 'Lee',

  // fullName은 접근자 함수로 구성된 접근자 프로퍼티이다.
  // getter 함수
  get fullName() { // get은 참조, 접근자 프로퍼티의 이름이다. 인수가 없어야되고 리턴문이 있어야 된다.
    return `${this.firstName} ${this.lastName}`;
  },

  // setter 함수
  set fullName(firstName) { // <- set 인수가 있어야되고 리턴문이 없어야된다.
    this.firstName = firstName;
  }

  // getter, setter를 사용하지않은 방법
  // firstName과 lastName을 합침
  // getFullName() {
  //   return `${this.firstName} ${this.lastName}`;
  // }
};

// 데이터 프로퍼티를 통한 프로퍼티 값의 참조
console.log(person.firstName + ' ' + person.lastName); // Cheol-hwan Lee

// 접근자 프로퍼티를 통한 프로퍼티 값의 저장, setter가 실행된다
person.fullName = 'Cheol-Su';


// 접근자 프로퍼티를 통한 프로퍼티 값의 참조
// 접근자 프로퍼티 fullName에 접근하면 getter가 호출된다
console.log(person.fullName); // Cheol-Su Lee
// fullName이란 프로퍼티키를 가지고 객체에 가서 프로퍼티 타입을 체크한다. 프로퍼티의 내용이 틀린 거로 찾는다(value의 여부), 데이터 프로퍼티라면 값을 리턴해준다.

console.log(Object.getOwnPropertyDescriptors(person));

// getOwnPropertyDescriptor의 출력 값
// XXXX Lee
// {
//   firstName: {
//     value: 'XXXX',
//     writable: true,
//     enumerable: true,
//     configurable: true
//   },
//   lastName: {
//     value: 'Lee',
//     writable: true,
//     enumerable: true,
//     configurable: true
//   },
//   fullName: {
//     get: [Function: get fullName],
//     set: [Function: set fullName],
//     enumerable: true,
//     configurable: true
//   }
// }
```
person 객체의 firstName과 lastName 프로퍼티는 일반적인 데이터 프로퍼티다. 메소드 앞에 get, set이 붙은 메소드가 있는데 이것들이 바로 getter와 setter 함수이고 getter/setter 함수의 이름 fullName이 접근자 프로퍼티이다. 접근자 프로퍼티는 자체적으로 값(value 프로퍼티 어트리뷰트)을 가지지 않으며 다만 데이터 프로퍼티의 값을 읽거나 저장할 때 관여할 뿐이다.

__*접근자 프로퍼티와 데이터 프로퍼티 구별 방법은 다음과 같다.*__
``` javascript
// 일반 객체의 __proto__는 접근자 프로퍼티이다.
Object.getOwnPropertyDescriptor(Object.prototype, '__proto__');
// {get: ƒ, set: ƒ, enumerable: false, configurable: true}

// 함수 객체의 prototype은 데이터 프로퍼티이다.
Object.getOwnPropertyDescriptor(function() {}, 'prototype');
// {value: {…}, writable: true, enumerable: false, configurable: false}
```


## 프토퍼티 Attribute
모든 프로퍼티, 즉 데이터 프로퍼티와 접근자 프로퍼티는 자신의 상태와 동작을 정의한 내부 슬롯/메소드를 가지고 있다. 이들을 프로퍼티 어트리뷰트(property attribute)라 한다. 이 프로퍼티 어트리뷰트는 자바스크립트 엔진이 프로퍼티를 생성할 때, 기본값으로 자동 정의된다. 이후 정의된 프로퍼티 어트리뷰트를 설정하는 것으로 각각의 프로퍼티의 세부 동작(프로퍼티 값의 변경 가능 여부, 열거 가능 여부, 재정의 가능 여부)을 제어할 수 있다.

<br>

*데이터 프로퍼티의 프로퍼티 Arrtibute*
<article class="board-tbl">

| 프로퍼티 어트리뷰트 | 설명 | 프로퍼티 디스크립터 객체의 프로퍼티 |
| :---: | :---:  | :---: |
| **[[Value]]** | - 프로퍼티 키로 프로퍼티 값에 접근하면 내부 메소드 [[Get]]에 의해 반환되는 값이다.<br>- 프로퍼티 키로 프로퍼티 값을 저장하면 [[Value]]에 값을 저장한다. 이때 프로퍼티가 없으면 프로퍼티를 생성하고 생성된 프로퍼티의 [[Value]]에 값을 저장한다. | **value** |
| [[Writable]] | - 프로퍼티 값의 변경 가능 여부를 나타내며 불리언 값을 갖는다.<br>- [[Writable]]의 값이 false인 경우, 해당 프로퍼티의 [[Value]]의 값을 변경할 수 없다. | writable |
| [[Enumerable]] | - 프로퍼티의 열거 가능 여부를 나타내며 불리언 값을 갖는다.<br>- [[Enumerable]]의 값이 false인 경우, 해당 프로퍼티는 for…in 문이나 Object.keys 메소드 등으로 열거할 수 없다. | enumerable |
| [[Configurable]] | - 프로퍼티의 재정의 가능 여부를 나타내며 불리언 값을 갖는다.<br>- [[Configurable]]의 값이 false인 경우, 해당 프로퍼티의 삭제, 프로퍼티 어트리뷰트 값의 변경이 금지된다. 단, [[Writable]]이 true인 경우, [[Value]]의 변경과 [[Writable]]을 false로 변경하는 것은 허용된다. | configurable |

</article>

<br>

*접근자 프로퍼티의 프로퍼티 Arrtibute*

<article class="board-tbl">

| 프로퍼티 어트리뷰트 | 설명 | 	프로퍼티 디스크립터 객체의 프로퍼티 |
| :---: | :---: | :---: |
| **[[Get]]** | 접근자 프로퍼티를 통해 데이터 프로퍼티의 값을 읽을 때 호출되는 접근자 함수이다. 즉, 접근자 프로퍼티 키로 프로퍼티 값에 접근하면 프로퍼티 어트리뷰트 [[Get]]의 값, 즉 getter 함수가 호출되고 그 결과가 프로퍼티 값으로 반환된다. | **get** |
| **[[Set]]** | 접근자 프로퍼티를 통해 데이터 프로퍼티의 값을 저장할 때 호출되는 접근자 함수이다. 즉, 접근자 프로퍼티 키로 프로퍼티 값을 저장하면 프로퍼티 어트리뷰트 [[Set]]의 값, 즉 setter 함수가 그 결과가 프로퍼티 값으로 저장된다. | **set** |
| [[Enumerable]] | 데이터 프로퍼티의 [[Enumerable]]와 같다. | enumerable |
| [[Configurable]] | 데이터 프로퍼티의 [[Configurable]]와 같다. | configurable |

</article>

<br>

## 내부 슬롯/메소드
내부 슬롯(Internal slot)과 내부 메소드(Internal method)는 ECMAScript 스펙에서 요구하는 객체와 관련된 내부 상태와 내부 동작을 정의한 것이다. 다시 말해, 내부 슬롯과 내부 메소드는 자바스크립트 엔진이 코드를 실행하는 알고리즘을 설명하기 위해 ECMAScript 스펙에서 사용하는 의사 프로퍼티(Pseudo property)와 의사 메소드(Pseudo method)이다.

내부 슬롯과 내부 메소드는 자바스크립트 엔진의 내부 구현 사양을 정의한 것으로 자바스크립트 엔진은 ECMAScript 스펙에서 정의한 내부 슬롯과 내부 메소드의 사양을 충실히 만족시키는 것이 요구될 뿐 이를 외부로 노출시키지는 않는다.

즉, **내부 슬롯과 내부 메소드는 객체의 프로퍼티가 아니다. 따라서 내부 슬롯과 내부 메소드는 이용자가 직접적으로 접근하거나 호출할 수 있는 방법을 원칙적으로 제공하지 않는다.** 단, 일부 내부 슬롯과 내부 메소드(의 구현체)에 간접적으로 접근할 수 있는 수단은 있다.(예를들어  getOwnPropertyDescriptors)

> __구분하기__<br>
[[(Get)]]: 내부 메소드(네이밍이 주로 동사)<br>
[[(value)]]: 내부 슬롯(네이밍이 주로 명사)<br>
[[prototype]]: 메소드<br>
__ proto __: 접근자 프로퍼티(access property)


*모든 객체가 갖고 있는 내부 메소드 [[GET]]의 작동 원리를 간단히 알아보자.*
``` javascript
const person = {
  name: 'Lee'
}

console.log(person.name);
```

우리가 흔히 프로퍼티의 값을 불러오는 방식이다. 하지만 내부에선 아래와 같은 일이 이루어진다.

① 프로퍼티 키가 유효한지 확인한다. 프로퍼티 키는 문자열 또는 심볼이어야 한다.<br>
② 프로토타입 체인*에서 프로퍼티를 검색한다.<br>
③ 검색된 프로퍼티가 "데이터 프로퍼티(Data property)"라면 프로퍼티 값, 즉 데이터 프로퍼티의 프로퍼티 어트리뷰트 [[Value]]의 값을 그대로 반환한다.<br>
④ 만약 프로퍼티가 "접근자 프로퍼티(Accessor property)"라면 접근자 프로퍼티의 프로퍼티 어트리뷰트 [[Get]]의 값, 즉 getter 함수를 호출하여 그 결과를 반환한다.

*모든 객체가 갖고 있는 내부 메소드 [[SET]]의 작동 원리를 간단히 알아보자.*
``` javascript
const person = {
  name: 'Lee'
}

person.name = 'Kim';
```

① 프로퍼티 키가 유효한지 확인한다. 프로퍼티 키는 문자열 또는 심볼이어야 한다.<br>
② 프로토타입 체인*에서 프로퍼티를 검색한다.<br>
③ 검색된 프로퍼티가 "데이터 프로퍼티(Data property)"라면 객체 외부 슬롯의 값을 재할당한다.<br>
④ 만약 프로퍼티가 "접근자 프로퍼티(Accessor property)"라면 [[SET]]에서 할당한 값을 설정한다.

> <b>프로포타입과 프로토타입 체인</b><br>
**프로토타입**은 어떤 객체의 상위(부모) 객체의 역할을 하는 객체이다. 프로토타입은 하위(자식) 객체에게 자신의 프로퍼티와 메소드를 상속한다. 프로토타입 객체의 프로퍼티나 메소드를 상속받은 하위 객체는 자신의 프로퍼티 또는 메소드인 것처럼 자유롭게 사용할 수 있다.<br>
프로토타입 체인은 프로토타입이 단방향 링크드 리스트 형태로 연결되어 있는 상속 구조를 말한다. 객체의 프로퍼티나 메소드에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티 또는 메소드가 없다면 프로토타입 체인을 따라 프로토타입의 프로퍼티나 메소드를 차례대로 검색한다.


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
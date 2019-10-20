---
title: About Javascript Object
date: "2019-10-11"
template: "post"
draft: false
slug: "/posts/javascript/Object"
category: "Javascript"
tags:
  - "Object"
  - "Property Key"
  - "Property Value"
  - "Method"
description: "about Javasciprt Object"
---
<span class="notice">
  <em>TIL 이므로 잘못된 내용은 댓글 부탁드립니다</em>
</span>

## 객체란?
자바스크립트는 프로토타입 기반 객체지향 언어이며 <b>자바스크립트를 이루고 있는 거의 '모든 것'이 객체</b>이다.
객체는 재산(프로퍼티)를 갖는다.
원시 타입을 제외한 나머지 값들(함수, 배열, 정규표현식 등)은 모두 객체이다.

**원시 타입**
- **하나의 값**만을 나타낸다.
- 변경 **불가능한** 값(immutable value)

**객체 타입**
- 다양한 타입의 값(원시 타입의 값 또는 다른 객체)들을 **하나의 단위로 구성한 복합적인 자료구조**
- 변경 **가능한** 값(mutable value)

<b>자바스크립트의 객체는 키(key)와 값(value)으로 구성된 프로퍼티(Property)들의 집합이다.</b>

__*그림으로 알아보자*__
![object](/images/javascript/object.png "object")

자바스크립트는 **일급 객체**으므로 값으로 취급할 수 있다.<br>
따라서 프로퍼티 값으로 함수를 사용할 수도 있다.

__*그림으로 알아보자*__
![object](/images/javascript/object_2.png "object")

> 위 메소드안에 있는 'this'는 프로퍼티 위에 있는 식별자(counter)를 가리키는 참조 변수이다.

위 그림과 같이 객체는 프로퍼티와 메소드로 구성된 집합체이다.

- 프로퍼티: 객체의 **상태**를 나타내는 값(data)
- 메소드: 프로퍼티(상태)를 참조하고 **조작**할 수 있는 동작

이와 같이 객체는 객체의 상태를 나타내는 값(프로퍼티)과 프로퍼티를 참조하고 조작할 수 있는 동작(메소드)를 모두 포함할 수 있기 때문에 상태와 동작을 하나의 단위로 구조화할 수 있어 유용하다.

## 객체 리터럴에 의한 객체 생성
> C++과 Java와 같은 클래스 기반 객체지향 언어는 클래스를 사전에 정의하고 필요한 시점에 new 연산자와 함께 생성자를 호출하여 인스턴스를 생성하는 방식으로 객체를 생성한다<br>
**인스턴스란**<br>
클래스 또는 생성자 함수에 의해 생성되어 메모리에 저장된 실체를 말한다. 객체 지향 프로그래밍에서 객체는 클래스와 인스턴스를 포함한 개념이다. 클래스는 인스턴스를 생성하기 위한 템플릿 역할을 한다. 인스턴스는 객체가 메모리에 저장되어 실제로 존재하는 것에 초점을 맞춘 용어이다.

자바스크립트는 **프로토타입 기반 객체지향 언어**로서 클래스 기반 객체지향 언어와는 다른 다양한 객체 생성 방법이 존재한다.

- 객체 리터럴
- Object 생성자 함수
- 생성자 함수
- Object.create 메소드
- 클래스(ES6)

위 객체 생성 방법 중에서 가장 일반적이고 간단한 방법은 **객체 리터럴**을 사용하는 방법이다

<b>객체 리터럴은 중괄호({...})내에 **0개 이상의 프로퍼티**를 정의한다. 변수에 할당이 이루어지는 시점에 객체 리터럴은 해석되고 그 결과 객체가 생성된다. </b>0개 이상이라고 앞서 말했듯이 중괄호 내에 프로퍼티를 정의하지 않으면 변수(변수는 undefined)와는 달리 빈 객체가 생성된다.

``` javascript
var obj = {}; // 빈객체
console.log(typeof obj); // object
console.log(obj); // {}


// 할당이 이루어지는 시점에 객체 리터럴이 해석되고 그 결과 객체가 생성된다.
console.log(person); // undefined

var person = {
  name: 'Lee',
  sayHello: function () {
    console.log('Hello! My name is ${this.name}.');
  }
};

console.log(typeof person); // object
console.log(person); // {name: "Lee", sayHello: ƒ}

```

객체 리터럴의 중괄호는 코드 블록을 의미하지 않음에 주의하자.<br>코드 블록의 닫는 중괄호 뒤에는 세미콜론(;)을 붙이지 않는다.<br>하지만 **객체 리터럴은 표현식**이다.<br>
따라서 **객체 리터럴의 닫는 중괄호 뒤에는 세미콜론(;)**을 붙인다.

## 프로퍼티
객체는 프로퍼티들의 집합이며 키와 값으로 구성된다.
프로퍼티를 나열할 때는 **쉼표(,)**로 구분한다.

- 프로퍼티 키: 빈 문자열을 포함하는 모든 문자열 또는 Symbol값, 권장하지 않는 네이밍(숫자 타입을 사용하면 자바스크립트 엔진이 형변환을 해준다. 예약어, 식별자 네이밍 규칙을 준수하지 않은 네이밍)
- 프로퍼티 값: 자바스크립트에서 사용할 수 있는 모든 값

>키와 값의 할당은 =이 아닌 :이라는 것을 주의하자.

<br>

### 프로퍼티 키
프로퍼티 키는 식별자 역할을 하지만 반드시 식별자 네이밍 규칙을 따라야 하는 것은 아니다.<br>
단 식별자 네이밍 규칙을 준수한 프로퍼티 키와 그렇지 않은 프로퍼티 키는 미묘한 사이가 있다.

프로퍼티 키는 문자열 이므로 따옴표로 묶어야 한다. 하지만 식별자 네이밍 규칙을 준수한 이름, 자바스크립트에서 사용 가능한 유효한 이름인 경우, 따옴표를 생략할 수 있다.
반대로, **식별자 네이밍 규칙을 따르지 않은 이름에는 반드시 따옴표를 사용하여야 한다.**

``` javascript
var person = {
  fitst_name: 'Cheol-hwan', // 유효한 이름
  last-name: 'Lee' // 유효하지 않는 이름


  'last-name': 'Lee' // 변경
}
```

위 예제를 살펴보면. first_name은 식별자 네이밍 규칙을 준수하고 있지만 last-name은 식별자 네이밍 규칙을 준수하고 있지 않다.(특수문자(_,$를 제외한) 사용금지) 따라서 따옴표를 생략할 수 없다. 자바스크립트 엔진은 last-name을 last를 식별자로 인식하고 - 연산자가 있는 표현식으로 인식하기 때문이다.

``` javascript
var foo = {
  name: 'Lee',
  name: 'Kim'
};

console.log(foo); // {name: "Kim"}
```

이미 존재하는 프로퍼티 키를 중복 선언하면 나중에 선언한 프로퍼티가 먼저 선언한 프로퍼티를 덮어쓴다.
이때 에러가 발생하지 않는다는 점을 주의하자

<br>

#### 프로퍼티 접근
프로퍼티 값에 접근하려면 마침표(.)를 사용하는 **마침표 표기법** 또는 대괄호([...])를 사용하는 **대괄호 표기법**을 사용한다.

``` javascript
var person = {
  name: 'Lee'
};

// 마침표 표기법에 의한 프로퍼티 접근
console.log(person.name); // Lee

// 대괄호 표기법에 의한 프로퍼티 접근
console.log(person['name']); // Lee
```
대괄호 표기법을 사용하는 경우, 대괄호 내부에 지정하는 프로퍼티 키는 자바스크립트 엔진은 대괄호 내의 따옴표로 감싸지 않은 이름을 프로퍼티 키로 인식하지 않고 식별자로 인식하기 때문에 반드시 따옴표로 감싼 문자열이어야 한다. 프로퍼티 키에 식별자 네이밍 규칙을 준수하지 않았다면 반드시 대괄호 표기법을 사용해야 한다.

``` javascript
var person = {
  name: 'Lee'
};

console.log(person.age); // undefined
```
객체에 존재하지 않는 프로퍼티에 접근하면 **undefined**를 반환한다. 이때 ReferenceError가 발생하지 않는 것에 주의하자.

<hr class="sub" />

### 프로퍼티 값
프로퍼티의 값으로는 자바스크립트에서 사용할 수 있는 모든 값이 올 수있다.

<br>

#### 프로퍼티 값 갱신
이미 존재하는 프로퍼티에 값을 할당하면 프로퍼티 값이 갱신된다.
``` javascript
var person = {
  name: 'Lee'
};

// person 객체에 name 프로퍼티가 존재하므로 name 프로퍼티의 값이 갱신된다.
person.name = 'Kim';

console.log(person); // {name: "Kim"}
```

<hr class="sub"/>

### 프로퍼티 동적 생성
존재하지 않는 프로퍼티에 값을 할당하면 프로퍼티가 동적으로 생성되어 추가되고 프로퍼티 값이 할당된다.

``` javascript
var person = {
  name: 'Lee'
};

// person 객체에는 address 프로퍼티가 존재하지 않는다.
// 따라서 person 객체에 address 프로퍼티가 동적으로 생성되고 값이 할당된다.
person.address = 'Seoul';

console.log(person); // {name: "Lee", address: "Seoul"}
```

<hr class="sub" />

### 프로퍼티 삭제
delete 연산자는 객체의 프로퍼티를 삭제한다. 만약 존재하지 않는 프로퍼티를 삭제하면 아무런 에러없이 무시된다. 가비지 컬렉터로 인해 자연스레 소멸되므로 프로퍼티 강제 권장하지 않는다.<br>
delete로 프로퍼티를 삭제한다고 하여 메모리 공간에 공간이 늘어나는 건 아니다.

<br>
<br>

## 메소드
자바스크립트에서 사용할 수 있는 모든 값을 프로퍼티 값으로 사용할 수 있다.<br>
그래서 함수 또한 프로터퍼티의 값으로 가질 수 있다.<br>
프로퍼티의 값이 함수일 경우, 일반 함수와 구분하기 위해 메소드(Method)라 부른다.

``` javascript
var circle = {
  radius: 5, // 프로퍼티

  getDiameter: function () { // 메소드
    return 2 * this.radius; // this는 circle를 가리킨다.
  }
};

console.log(circle.getDiameter());
```
메소드 내부에서 사용한 this 키워드는 객체 자신을 가리키는 참조변수이다.

<br>
<br>

## ES6에서 추가된 객체 리터럴의 확장 기능

### 프로퍼티 축약 표현

``` javascript
// ES5
var x = 1, y = 2;

var obj = {
  x: x,
  y: y
};

console.log(obj); // {x: 1, y: 2}

// ES6
let x = 1, y = 2;

// 프로퍼티 축약 표현
const obj = { x, y };

console.log(obj); // {x: 1, y: 2}
```

ES6에서는 프로퍼티 값으로 변수를 사용하는 경우, 변수 이름과 프로퍼티 키가 동일한 이름일 때, 프로퍼티 키를 생략할 수 있다. 이때 프로퍼티 키는 변수 이름으로 자동 생성된다.

### 프로퍼티 키 동적 생성

``` javascript
// ES5
var prefix = 'prop';
var i = 0;

var obj = {};

// 프로퍼티 키 동적 생성
obj[prefix + '-' + ++i] = i;
obj[prefix + '-' + ++i] = i;
obj[prefix + '-' + ++i] = i;

console.log(obj); // {prop-1: 1, prop-2: 2, prop-3: 3}

// ES6
const prefix = 'prop';
let i = 0;

// 객체 리터럴 내부에서 프로퍼티 키 동적 생성
var obj = {
  [`${prefix}-${++i}`]: i,
  [`${prefix}-${++i}`]: i,
  [`${prefix}-${++i}`]: i
};

console.log(obj); // {prop-1: 1, prop-2: 2, prop-3: 3}
```

ES6에서는 객체 리터럴 내부에서도 프로퍼티 키를 동적으로 생성할 수 있다.

### 메소드 축약 표현
``` javascript
// ES5
var obj = {
  name: 'Lee',
  sayHi: function() {
    console.log('Hi! ' + this.name);
  }
};

obj.sayHi(); // Hi! Lee

// ES6
const obj = {
  name: 'Lee',
  // 메소드 축약 표현
  sayHi() {
    console.log('Hi! ' + this.name);
  }
};

obj.sayHi(); // Hi! Lee
```

ES6에서는 메소드를 정의할 때, function 키워드를 생략한 축약 표현을 사용할 수 있다.

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

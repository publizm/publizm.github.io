---
title: 디스트럭처링 할당(비구조화 할당)
date: "2019-11-01"
template: "post"
draft: false
slug: "/posts/javascript/Destructuring"
category: "Javascript"
tags:
  - "Destructuring"
  - "Arrow"
  - "Object"
description: "디스트럭처링 할당에 대해 알아보자"
---
<span class="notice">
  <em>TIL 내용이므로 잘못된 내용은 댓글 부탁드립니다</em>
</span>

<div id="toc">

**:link:  Table Of Contents**

- [디스트럭처링 할당이란 ?](#디스트럭처링-할당이란-)
  - [배열 디스트럭처링 할당](#배열-디스트럭처링-할당)
      - [ES5에서의 할당](#es5에서의-할당)
      - [ES6 디스트럭처링 할당](#es6-디스트럭처링-할당)
      - [배열에서의 Rest 프로퍼티(Rest Property)](#배열에서의-rest-프로퍼티rest-property)
  - [객체 디스트럭처링 할당](#객체-디스트럭처링-할당)
      - [ES5에서의 할당](#es5에서의-할당-1)
      - [ES6 디스트럭처링 할당](#es6-디스트럭처링-할당-1)
      - [객체에서의 Rest 프로퍼티(Rest Property)](#객체에서의-rest-프로퍼티rest-property)

</div>

## 디스트럭처링 할당이란 ?
구조화된 배열 또는 객체를 Destructuring(비구조화, 구조파괴)하여 1개 이상의 변수에 개별적으로 할당하는 것을 말한다. <b>배열 또는 객체 리터럴에서 필요한 값만을 추출하여 변수에 할당할 때 유용하다.</b>

<br>

### 배열 디스트럭처링 할당

#### ES5에서의 할당

``` javascript
// ES5
var arr = [1, 2, 3];

var one   = arr[0];
var two   = arr[1];
var three = arr[2];

console.log(one, two, three); // 1 2 3
```

<hr />

#### ES6 디스트럭처링 할당

ES6의 배열 디스트럭처링 할당은 배열의 각 요소를 배열로부터 추출하여 1개 이상의 변수에 할당한다. 이때 **할당 기준은 배열의 인덱스이다. 즉, 순서대로 할당된다.**

``` javascript
const arr = [1, 2, 3];

// ES6 배열 디스트럭처링 할당
// 변수 one, two, three를 선언하고 배열 arr을 디스트럭처링하여 할당한다.
// 이때 할당 기준은 배열의 인덱스이다.
const [one, two, three] = arr;

console.log(one, two, three); // 1 2 3
```

<br>

배열 디스트럭처링 할당을 위해서는 할당 연산자 왼쪽에 값을 할당 받을 변수를 선언해야 한다. 이때 여러 개의 변수를 배열 리터럴 형태로 선언한다.

``` javascript
let x, y;
[x, y] = [1, 2];

// 위의 문과 아래의 문은 동치이다.
const [x, y] = [1, 2];

// 여러 개의 변수를 배열 형태로 선언하면 반드시 우변에 배열을 할당해야 한다.
const [x, y];
// -> SyntaxError: Missing initializer in destructuring declaration
```

<br>

배열 디스트럭처링 할당의 기준은 배열의 인덱스이다. 즉, 순서대로 할당된다. 이때 **변수의 개수와 배열 요소의 개수가 반드시 일치할 필요는 없다.**

``` javascript
let x, y, z;

[x, y] = [1, 2];
console.log(x, y); // 1 2

[x, y] = [1];
console.log(x, y); // 1 undefined

[x, y] = [1, 2, 3];
console.log(x, y); // 1 2

[x, , z] = [1, 2, 3];
console.log(x, z); // 1 3
```
<br>

배열 디스트럭처링 할당을 위한 변수에 기본값을 설정할 수 있다.

``` javascript
let x, y, z;

// 기본값
[x, y, z = 3] = [1, 2];
console.log(x, y, z); // 1 2 3

// 기본값보다 할당된 값이 우선한다.
[x, y = 10, z = 3] = [1, 2];
console.log(x, y, z); // 1 2 3
```

<hr />

#### 배열에서의 Rest 프로퍼티(Rest Property)
배열 디스트럭처링 할당을 위한 변수에 Rest 파라미터와 유사하게 Rest 프로퍼티(Rest Property) …을 사용할 수 있다. Rest 프로퍼티는 Rest 파라미터와 마찬가지로 반드시 마지막에 위치해야 한다.

> Rest 프로퍼티는 스프레드 프로퍼티와 함께 2019년 11월 현재 Rest/Spread 프로퍼티는 TC39 프로세스의 stage 4(Finished) 단계에 제안되어 있다.

``` javascript
// Rest 프로퍼티
const [x, ...y] = [1, 2, 3];
console.log(x, y); // 1 [ 2, 3 ]
```

<hr class="sub" />

### 객체 디스트럭처링 할당

#### ES5에서의 할당
객체의 각 프로퍼티를 객체로부터 디스트럭처링하여 변수에 할당하기 위해서는 프로퍼티 키를 사용해야 한다.

``` javascript
// ES5
var user = { firstName: 'CheolHwan', lastName: 'Lee' };

var firstName = user.firstName;
var lastName  = user.lastName;

console.log(firstName, lastName); // CheolHwan Lee
```

<hr />

#### ES6 디스트럭처링 할당
객체의 각 프로퍼티를 객체로부터 추출하여 1개 이상의 변수에 할당한다. 배열 디스트럭처링 할당과 마찬가지로 객체 디스트럭처링 할당을 위해서는 할당 연산자 왼쪽에 값을 할당 받을 변수를 선언해야 한다.

이를 위해 **여러 개의 변수를 객체 리터럴 형태로 선언한다. 이때 할당 기준은 프로퍼티 키이다. 즉, 순서는 의미가 없으며 변수 이름과 프로퍼티 키가 일치하면 할당된다.**

``` javascript
const user = { firstName: 'Cheolhwan', lastName: 'Lee' };

// ES6 객체 디스트럭처링 할당
// 변수 lastName, firstName을 선언하고 객체 user를 디스트럭처링하여 할당한다.
// 이때 프로퍼티 키를 기준으로 디스트럭처링 할당이 이루어진다. 순서는 의미가 없다.
const { lastName, firstName } = user;

console.log(firstName, lastName); // Cheolhwan Lee
```

<br>

객체의 프로퍼티 키와 다른 변수 이름으로 프로퍼티 값을 할당 받으려면 아래와 같이 변수를 선언한다.

``` javascript
const user = { firstName: 'Cheolhwan', lastName: 'Lee' };

// ES6 객체 디스트럭처링 할당
// 프로퍼티 키를 기준으로 디스트럭처링 할당이 이루어진다.
// 프로터티 키가 lastName인 프로퍼티 값을 ln에 할당한다.
// 프로터티 키가 firstName인 프로퍼티 값을 fn에 할당한다.
const { lastName: ln, firstName: fn } = user;

console.log(fn, ln); // Cheolhwan Lee
```

<br>

객체 디스트럭처링 할당을 위한 변수에 기본값을 설정할 수 있다.

``` javascript
const { firstName = 'Cheolhwan', lastName } = { lastName: 'Lee' };
console.log(firstName, lastName); // Cheolhwan Lee

const { firstName: fn = 'Cheolhwan', lastName: ln } = { lastName: 'Lee' };
console.log(fn, ln); // Cheolhwan Lee
```

<br>

객체 디스트럭처링 할당은 프로퍼티 키로 객체에서 필요한 프로퍼티 값만을 추출할 수 있다.

``` javascript
const todo = { id: 1, content: 'HTML', completed: true };

// todo 객체로부터 id 프로퍼티만을 추출한다.
const { id } = todo;
console.log(id); // 1
```

<br>

배열의 요소가 객체인 경우, 배열 디스트럭처링 할당과 객체 디스트럭처링 할당을 혼용할 수 있다.

``` javascript
const todos = [
  { id: 1, content: 'HTML', completed: true },
  { id: 2, content: 'CSS', completed: false },
  { id: 3, content: 'JS', completed: false }
];

// todos 배열의 두번째 요소인 객체로부터 id 프로퍼티만을 추출한다.
const [, { id }] = todos;
console.log(id); // 2
```

<br>

중첩 객체의 경우는 아래와 같이 사용한다.

``` javascript
const user = {
  name: 'Lee',
  address: {
    zipCode: '03068',
    city: 'Seoul'
  }
};

const { address: { city } } = user;
// 또는
const { city } = user.address;

console.log(city); // 'Seoul'
```

<hr />

#### 객체에서의 Rest 프로퍼티(Rest Property)
객체 디스트럭처링 할당을 위한 변수에 Rest 파라미터와 유사하게 Rest 프로퍼티 …을 사용할 수 있다. Rest 프로퍼티는 Rest 파라미터와 마찬가지로 반드시 마지막에 위치해야 한다.

> Rest 프로퍼티는 스프레드 프로퍼티와 함께 2019년 11월 현재 Rest/Spread 프로퍼티는 TC39 프로세스의 stage 4(Finished) 단계에 제안되어 있다.

``` javascript
// Rest 프로퍼티
const { x, ...rest } = { x: 1, y: 2, z: 3 };
console.log(x, rest); // 1 { y: 2, z: 3 }
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

  **Reference**<br>

  [https://poiemaweb.com](https://poiemaweb.com)

</div>
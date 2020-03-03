---
title: spread
date: "2019-10-30"
template: "post"
draft: false
slug: "/posts/javascript/spread"
category: "Javascript"
tags:
  - "spread"
description: "ES6의 스프레드 문법에 대해 알아보자"
---

<div id="toc">

**:link:  Table Of Contents**

- [스프레드문법](#스프레드-문법★)
- [함수 호출문의 인수 목록에서 사용하는 경우](#함수-호출문의-인수-목록에서-사용하는-경우)
- [배열 리터럴 내부에서 사용하는 경우](#배열-리터럴-내부에서-사용하는-경우)
  - [concat](#concat)
  - [push](#push)
  - [splice](#splice)
  - [배열 복사](#배열-복사slice)
  - [유사 배열 객체를 배열로 변환](#유사-배열-객체를-배열로-변환)
- [객체 리터럴 내부에서 사용하는 경우](#객체-리터럴-내부에서-사용하는-경우)

</div>

## 스프레드 문법★

> 하나로 뭉쳐 있는 여러 값들의 집합을 펼쳐서(전개, 분산하여, spread) <b>개별적인 값들의 목록으로 만든다.</b>


``` javascript
// ...[1, 2, 3]는 [1, 2, 3]을 개별 요소로 분리한다(→ 1, 2, 3)
console.log(...[1, 2, 3]) // 1 2 3

// 문자열은 이터러블이다.
console.log(...'Hello'); // H e l l o

// Map과 Set은 이터러블이다.
console.log(...new Map([['a', '1'], ['b', '2']])); // [ 'a', '1' ] [ 'b', '2' ]
console.log(...new Set([1, 2, 3])); // 1 2 3

// 이터러블이 아닌 일반 객체는 스프레드 문법의 대상이 될 수 없다.
console.log(...{ a: 1, b: 2 });
// TypeError: Found non-callable @@iterator
```

- 피연산자를 연산하여 값을 생성하는 연산자가 아니다.
- for…of 문으로 순회할 수 있는 이터러블에 한정된다.

<br>

``` javascript
const list = ...arr; // SyntaxError: Unexpected token ...
```

<b>스프레드 문법의 결과물은 단독으로 사용할 수 없고, 아래와 같이 쉼표로 구분한 값의 목록을 사용하는 문에서 사용한다.</b>

1. 함수 호출문의 인수 목록

```code
foo(...[1,2,3]) => foo(1, 2, 3)
```

2. 배열 리터럴의 요소 목록

``` javascript
const arr = [1, 2, 3]
const sumArr = [0, ...arr];

console.log(sumArr); // [0, 1, 2, 3]

```
3. 객체 리터럴의 프로퍼티 목록 (2019년 11월 현재 Stage 4 제안)

``` javascript
const a = {a: 1, b: 2};
const b = {x: 2, ...a};

console.log(b); // {x: 2, a: 1, b: 2}
```

<br>

**:exclamation: 주의할 점**<br>
매개변수에 사용할 경우 Spread가 아닌 Rest파라미터(인수들의 목록을 배열로 묶어준다)이므로 착각하지 말 것.

**Rest 파라미터**

``` javascript
// ES5의 call함수를 이용하여 가변인자 배열을 받는다.
function sum_es5() {
  // 유사 배열 객체인 arguments 객체를 배열로 변환한다.
  var array = Array.prototype.slice.call(arguments);

  return array.reduce(function (pre, cur) {
    return pre + cur;
  });
}

console.log(sum_es5(1, 2, 3, 4, 5)); // 15

// Rest 파라미터 사용시
function sum(...args) {
  // Rest 파라미터 args에는 배열 [1, 2, 3, 4, 5]이 할당된다.
  return args.reduce((pre, cur) => pre + cur);
}
console.log(sum(1, 2, 3, 4, 5)); // 15
```

<br>

## 함수 호출문의 인수 목록에서 사용하는 경우

요소값들의 집합인 배열을 펼쳐서 개별적인 값들의 목록으로 만든 후, 이를 함수의 인수 목록으로 전달해야 하는 경우가 있다.

``` javascript
const arr = [1, 2, 3];

// 배열 arr의 요소 중에서 최대값을 구하기 위해 Math.max를 사용한다.
const maxValue = Math.max(arr);

console.log(maxValue); // NaN
```

Math.max()는 가변인수함수로서 숫자가 아닌 배열을 인수로 전달하면 최대 값을 구할 수 없다. 배열을 넣어주려면 아래와 같이 넣어주어야된다.

- apply를 이용한 방법

``` javascript
var arr = [1, 2, 3];

// apply 함수의 2번째 인수(배열)는 apply 함수가 호출하는 함수의 인수 목록이다.
// 따라서 배열이 펼쳐져서 인수로 전달되는 효과가 있다.
var maxValue = Math.max.apply(null, arr); // Math.max.apply(null, arr) 정적 메소드는 this가 필요 없기 때문에 null을 넣어준다

console.log(maxValue); // 3
```

- 스프레드 기법을 이용한 방법

``` javascript
const arr = [1, 2, 3];

// 스프레드 문법을 사용하여 배열 arr을 1, 2, 3으로 펼쳐서 Math.max에 전달한다.
// Math.max(...[1, 2, 3])는 Math.max(1, 2, 3)과 같다.
const maxValue = Math.max(...arr);

console.log(maxValue); // 3
```

매개 변수에 ...을 쓰면 스프레드 문법이 아닌 rest파라미터로 읽는다.
<b>rest파라미터는 스프레드 문법과는 다르게 풀어져 있는 것은 배열로 묶어주는 반대의 개념인 것을 주의해야된다.</b> 위치도 매개변수 가장 마지막에 올 수 있다.

``` javascript
// Rest 파라미터는 인수들의 목록을 배열로 전달받는다.
function foo(param, ...rest) {
  console.log(param); // 1
  console.log(rest);  // [ 2, 3 ]
}

// 스프레드 문법은 배열과 같은 이터러블을 펼쳐서 개별적인 값들의 목록을 만든다.
// [1, 2, 3] -> 1, 2, 3
foo(...[1, 2, 3]);
```

<hr class="sub" />

## 배열 리터럴 내부에서 사용하는 경우

### concat

- ES5

``` javascript
// ES5
var arr = [1, 2].concat([3, 4]);
console.log(arr); // [1, 2, 3, 4]
```
concat이라는 함수를 호출 하지 않고, 리터럴만으로도 할 수 있다. 스프레드 문법을 사용하면 별도의 메소드를 사용하지 않고 배열 리터럴 만으로 기존의 배열 요소들을 새로운 배열의 일부로 만들 수 있다.


- 스프레드 문법

``` javascript
// ES6
const arr = [...[1, 2], 3, 4];
console.log(arr); // [1, 2, 3, 4]
```

스프레드 문법은 Rest 파라미터와 달리 <b>중복 사용이 가능하다.</b>

``` javascript
// ES6
const arr = [...[1, 2], ...[3, 4]];
console.log(arr); // [1, 2, 3, 4]
```

<hr class="sub" />

### push
사용을 권장하지는 않지만 push를 이용하던 방식을 스프레드 문법으로 쉽게 풀 수 있다.

- ES5

``` javascript
// ES5
var arr1 = [1, 2];
var arr2 = [3, 4];

Array.prototype.push.apply(arr1, arr2);

console.log(arr1); // [1, 2, 3, 4]
```

- 스프레드 문법

``` javascript
// ES6
const arr1 = [1, 2];
const arr2 = [3, 4];

// arr1.push(3, 4)와 같다.
arr1.push(...arr2);

console.log(arr1); // [1, 2, 3, 4]
```

<hr class="sub" />

### splice

기존의 배열에 다른 배열의 요소들을 삽입하려면 splice 메소드를 사용한다.

- ES5

```javascript
// ES5
var arr1 = [1, 4];
var arr2 = [2, 3];

// apply 메소드의 2번째 인수는 배열이다. 이것은 인수 목록으로 splice 메소드에 전달된다.
// [1, 0].concat(arr2) → [1, 0, 2, 3]
// arr1.splice(1, 0, 2, 3) → arr1[1]부터 0개의 요소를 제거하고
// 그자리(arr1[1])에 새로운 요소(2, 3)를 삽입한다.
Array.prototype.splice.apply(arr1, [1, 0].concat(arr2));

console.log(arr1); // [1, 2, 3, 4]
```

- 스프레드 문법

```javascript
// ES6
const arr1 = [1, 4];
const arr2 = [2, 3];

arr1.splice(1, 0, ...arr2);

console.log(arr1); // [1, 2, 3, 4]
```

<hr class="sub" />

### 배열 복사(slice)

- ES5

```javascript
// ES5
var origin  = [1, 2];
var copy = origin.slice();

console.log(copy); // [1, 2]
console.log(copy === origin); // false
```

- 스프레드 문법

```javascript
// ES6
const origin = [1, 2];
const copy = [...origin];

console.log(copy); // [1, 2]
console.log(copy === origin); // false
```

원본 배열의 각 요소를 **얕은 복사(shallow copy)**하여 새로운 복사본을 생성한다.

<hr class="sub" />

### 유사 배열 객체를 배열로 변환

유사 배열 객체(Array-like object)를 배열로 변환하는 일반적인 방법은 slice 메소드를 apply 함수로 호출하는 방법이 있다.

- ES5

```javascript
// ES5
function sum() {
  // 유사 배열 객체인 arguments를 배열로 변환
  var args = Array.prototype.slice.apply(arguments);

  return args.reduce(function (pre, cur) {
    return pre + cur;
  }, 0);
}

console.log(sum(1, 2, 3)); // 6
```

- 스프레드 문법

```javascript
// ES6
function sum() {
  // 유사 배열 객체인 arguments를 배열로 변환
  const args = [...arguments];

  return args.reduce((pre, cur) => pre + cur, 0);
}

console.log(sum(1, 2, 3)); // 6
```

<br>

## 객체 리터럴 내부에서 사용하는 경우

```javascript
// 스프레드 프로퍼티
const n = { x: 1, y: 2, ...{ a: 3, b: 4 } };
console.log(n); // { x: 1, y: 2, a: 3, b: 4 }

// Rest 프로퍼티
const {x, ...rest} = {x: 1, y: 2, z: 3};
console.log(x, rest); // 1 { y: 2, z: 3 }
```

객체 리터럴의 프로퍼티 목록에서 스프레드 문법을 사용할 수 있는 스프레드 프로퍼티는 Rest 프로퍼티와 함께 2019년 11월 현재 TC39 프로세스의 stage 4(Finished) 단계에 제안되어 있다.

스프레드 문법의 대상은 이터러블이어야 하지만 스프레드 프로퍼티 제안은 객체리터럴 내부에서 스프레드 문법의 사용을 허용한다.

- 스프레드 도입 이전 객체 병합(Object.assign)

```javascript
// 객체의 병합
// 프로퍼티가 중복되는 경우, 뒤에 위치한 프로퍼티가 우선권을 갖는다.
const merged = Object.assign({}, { x: 1, y: 2 }, { y: 10, z: 3 }); // 앞의 {}는 완전히 다른 객체를 만들겠다. 라는 의미
console.log(merged); // { x: 1, y: 10, z: 3 }

// 특정 프로퍼티 변경
const changed = Object.assign({}, { x: 1, y: 2 }, { y: 100 });
console.log(changed); // { x: 1, y: 100 }

// 프로퍼티 추가
const added = Object.assign({}, { x: 1, y: 2 }, { z: 0 });
console.log(added); // { x: 1, y: 2, z: 0 }
```

- 스프레드 문법

```javascript
// 객체의 병합
// 프로퍼티가 중복되는 경우, 뒤에 위치한 프로퍼티가 우선권을 갖는다.
const merged = { ...{ x: 1, y: 2 }, ...{ y: 10, z: 3 } };
console.log(merged); // { x: 1, y: 10, z: 3 }

// 특정 프로퍼티 변경
const changed = { ...{ x: 1, y: 2 }, y: 100 };
// changed = { ...{ x: 1, y: 2 }, ...{ y: 100 } }
console.log(changed); // { x: 1, y: 100 }

// 프로퍼티 추가
const added = { ...{ x: 1, y: 2 }, z: 0 };
// added = { ...{ x: 1, y: 2 }, ...{ z: 0 } }
console.log(added); // { x: 1, y: 2, z: 0 }
```

<br>
<br>
<br>
<br>
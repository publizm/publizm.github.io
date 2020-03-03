---
title: 배열(Array)
date: "2019-10-24"
template: "post"
draft: false
slug: "/posts/javascript/Array"
category: "Javascript"
tags:
  - "Array"
description: "배열에 대해서 알아보자"
---
<span class="notice">
  <em>TIL 내용이므로 잘못된 내용은 댓글 부탁드립니다</em>
</span>

<div id="toc">

**:link:  Table Of Contents**

- [배열이란?](#배열이란)
  - [객체와 배열의 차이점](#객체와-배열의-차이점을-알아보자)
- [밀집배열과 희소배열](#자바스크립트의-배열은-일반적인-배열이-아니다)
  - [밀집배열](#일반적인-배열밀집-배열)
  - [희소배열](#자바스크립트의-배열희소배열)
- [length 프로퍼티](#length-프로퍼티와-희소-배열)
- [배열 생성](#배열-생성)
  - [배열 리터럴](#배열-리터럴)
  - [Array 생성자 함수](#array-생성자-함수)
  - [Array.of](#arrayof)
  - [Array.from](#arrayfrom)
- [배열 요소의 참조](#배열-요소의-참조)
- [배열 요소의 추가와 갱신](#배열-요소의-추가와-갱신)
- [배열 요소 삭제](#배열-요소-삭제)
- [배열 메소드★](#배열-메소드★)
  - [Array.isArray](#arrayisarray)
  - [Array.prototype.push](#arrayprototypepush)
  - [Array.prototype.pop](#arrayprototypepop)
  - [Array.prototype.unshift](#arrayprototypeunshift)
  - [Array.prototype.shift](#arrayprototypeshift)
  - [Array.prototype.concat](#arrayprototypeconcat)
  - [Array.prototype.splice](#arrayprototypesplice)
  - [Array.prototype.slice](#arrayprototypeslice)
  - [Array.prototype.indexOf★](#arrayprototypeindexof★)
  - [Array.prototype.join](#arrayprototypejoin)
  - [Array.prototype.reverse](#arrayprototypereverse)
  - [Array.prototype.fill](#arrayprototypefill)
  - [Array.prototype.includes](#arrayprototypeincludes)
- [배열 고차 함수★★](#배열-고차-함수★★)
  - [Array.prototype.sort](#arrayprototypesort)
  - [Array.prototype.forEach ★★](#arrayprototypeforeach-★★)
  - [Array.prototype.map ★★](#arrayprototypemap-★★)
  - [Array.prototype.filter ★★](#arrayprototypefilter-★★)
  - [Array.prototype.reduce ★★](#arrayprototypereduce-★★)
  - [Array.prototype.some](#arrayprototypesome)
  - [Array.prototype.every](#arrayprototypeevery)
  - [Array.prototype.find](#arrayprototypefind)
  - [Array.prototype.findIndex](#arrayprototypefindindex)

</div>


## 배열이란?
순서가 있는 여러개의 값을 묶은 하나의 자료구조다.
자바스크립트에서의 배열이라는 타입은 존재하지 않는다. 즉 배열은 객체이다. 어떻게 보면 객체라는 타입내에 함수와 배열은 객체의 서브타입이라고 생각 할 수 있다.

배열이 가지고 있는 값을 **요소(element)**라고 부른다. <b>자바스크립트에서의 배열은 해시테이블*로 구성된 특수한 객체이다.</b> 특수한 객체이기 때문에 자바스크립트에서 값으로 인정하는 **모든 값**은 배열의 요소가 될 수 있다.

> **해시테이블이란?**<br>
해시 함수를 통해 해시값을 생성하여 프로퍼티 키(배열의 인덱스)를 맵핑한다.<br>
해시값을 주소 값으로 삼아 프로퍼티 키와 값을 저장해서 쓰는 자료구조.

<br>

``` javascript
const arr = [1, 2, 3];

console.log(Object.getOwnPropertyDescriptors(arr));

// === arr['0'] , === arr[0]
/*
{
  '0': { value: 1, writable: true, enumerable: true, configurable: true },
  '1': { value: 2, writable: true, enumerable: true, configurable: true },
  '2': { value: 3, writable: true, enumerable: true, configurable: true },
  length: { value: 3, writable: true, enumerable: false, configurable: false }
}
*/
```
일반 객체와 생긴것만 다를뿐 객체와 같다. 자바스크립트의 배열은 엄밀히 말해 일반적 의미의 배열이 아니다. 자바스크립트의 배열은 일반적인 배열의 동작을 흉내낸 특수한 객체이다.

<br>

### 객체와 배열의 차이점을 알아보자
**객체**
- 순서의 의미가 없다
- 키 값으로 데이터를 찾는다.
- 요소로 접근시 ['문자열']로 작성해야한다.

**배열**
- 순서(index)의 의미가 있다
- 순서로 데이터를 찾는다.
- 순회(for문)하기가 객체보다 편리하다.
- 요소에 접근할때는 [인덱스]로 접근한다. 이때 인덱스는  정수이다.


<article class="board-tbl">

| 구분 | 객체 | 배열 |
| :---: | :---: | :---:|
| 구조 | 프로퍼티 키와 프로퍼티 값 | 인덱스와 요소 |
| 값의 참조 | 프로퍼티 키 | 인덱스 |
| 값의 순서 | ✗ | ○ |
| length 프로퍼티 | ✗ | ○ |

</article>


## 자바스크립트의 배열은 일반적인 배열이 아니다
일반적인 배열(밀집배열)차이와 자바스크립트의 배열(희소배열)의 특징을 구분해보자.<br>
<br>

### 일반적인 배열(밀집 배열)
동일한 크기의 메모리 공간이 빈틈없이 연속적으로 나열된 자료 구조이며, 배열의 요소는 하나의 타입으로 통일되어 있다(그래서 동일한 크기의 메모리 공간을 쓸 수 있다고 생각한다).

- 연속적으로 이어져 있어 인덱스를 통해 **단 한번의 연산으로 임의의 요소에 접근할 수있다. 이는 매우 효율적이며 고속으로 동작한다.**
- 요소를 삽입하거나 삭제하는 경우, 요소를 연속적으로 유지하기 위해 요소를 이동시켜야하는 단점있다.

<hr class="sub" />

### 자바스크립트의 배열(희소배열)
요소를 위한 각각의 메모리 공간은 동일한 크기를 갖지 않고, 연속적으로 이어져 있지 않을 수 있다. 일반적인 배열의 동작을 흉내낸 특수한 객체이다.
- 인덱스를 프로퍼티 키로 갖고 배열의 요소는 프로퍼티 값이다.
- 요소에는 자바스크립트에서 사용할 수 있는 **모든 값**이 올 수 있다.
- **length 프로퍼티를 갖는다**.
- 해시 테이블로 구성되어 있다.
- 인덱스로 배열 요소에 접근할때 일반적인 배열보다 느릴 수 밖에 없는 구조적인 단점이 있다.
- 요소를 삽입하거나 삭제하는 경우에는 일반적인 배열보다 빠른 성능을 가진다.
- 인덱스를 프로퍼티 키로 갖는 객체이기 때문에 객체와 같이 존재하지 않는 요소에 참조하면 undefined를 반환한다.

**:bulb:Tips**<br>
자바스크립트의 배열은 배열의 요소로 접근할때 일반적인 배열(밀집배열)보다 느릴 수 밖에 없는 구조적인 단점이 있다고 했다. 하지만 이를 보완하기 위해 자바스크립트의 벤더사들은 배열의 요소들이 일정한 타입이라면 밀집배열처럼 암묵적으로 동작하도록 하는 등 많은 최적화에 노력을 기울이고 있다.

## length 프로퍼티와 희소 배열
length 프로퍼티는 요소의 개수, 배열의 길이를 나타내는 정수를 값으로 갖는다. **length 프로퍼티의 값은 배열에 요소를 추가하거나 삭제하면 자동 갱신된다.**

length 프로퍼티의 값은 요소의 개수, 즉 배열의 길이를 바탕으로 결정되지만 임의의 숫자 값을 명시적으로 할당할 수도 있다.

이때 현재의 length 프로퍼티 값보다 작은 숫자 값을 할당하면 배열의 길이가 줄어든다.
``` javascript
const arr = [1, 2, 3, 4, 5];

// length 프로퍼티에 현재 length 프로퍼티 값보다 작은 숫자 값을 할당
arr.length = 3;

// 배열의 길이가 줄어든다.
console.log(arr); // [1, 2, 3]
```

length 프로퍼티 값보다 큰 숫자 값을 할당하는 경우이다. 이때 length 프로퍼티 값은 변경되지만 실제로 배열의 길이가 늘어나지는 않는다.

``` javascript
const arr = [1];

// length 프로퍼티에 현재 length 프로퍼티 값보다 큰 숫자 값을 할당
arr.length = 3;

// length 프로퍼티 값은 변경되지만 실제로 배열의 길이가 늘어나지는 않는다.
console.log(arr.length); // 3
console.log(arr); // [1, empty × 2]
```
empty × 2는 실제로 추가된 배열의 요소(실제 공간을 확보하지 않았다)가 아니다. 즉, arr[1]과 arr[2]에는 값이 존재하지 않는다.

``` javascript
console.log(Object.getOwnPropertyDescriptors(arr));
/*
{
  '0': { value: 1, writable: true, enumerable: true, configurable: true },
  length: { value: 3, writable: true, enumerable: false, configurable: false }
}
*/
```
length 프로퍼티값과 실제 배열 요소의 개수가 다른 것을 희소배열이라 한다.(= 배열의 요소가 연속적으로 위치하지 않고 일부가 비어있는 배열)자바스크립트는 희소 배열을 문법적으로 허용한다. 위 예제는 배열의 뒷부분만이 비어 있어서 요소가 연속적으로 위치하는 것처럼 보일 수 있으나 중간이나 앞 부분이 비어 있을 수도 있다.
즉, 희소배열을 만들면 안되고, 밀집 배열처럼 쓰는 것이 이상적이다.

## 배열 생성

### 배열 리터럴
- 0개 이상의 요소를 쉼표로 구분하여 대괄호[]로 묶는다.
- 프로퍼티 이름이 없고 값만 존재
- 비어있는 배열 리터럴을 만들면 length 프로퍼티 값이 0 인 빈배열이 생성

``` javascript
const arr = [1, 2, 3];
console.log(arr.length); // 3

const arr = [];
console.log(arr.length); // 0
```

배열리터럴에 요소를 생략하면 희소 배열이 생성된다.
``` javascript
const arr = [1, , 3]

// 희소 배열은 length는 배열의 실제 요소 개수보다 언제나 크다.
console.log(arr.length); // 3
console.log(arr);        // [1, empty, 3]
console.log(arr[1]);     // undefined
```
위 예제의 배열은 인덱스가 1인 요소를 갖지 않는다. arr[1]이 undefined인 이유는 사실은 객체인 arr에 프로퍼티 키가 ‘1’인 프로퍼티가 존재하지 않기 때문이다.

<hr class="sub" />

### Array 생성자 함수
Array 생성자 함수는 전달된 인수의 개수에 따라 다르게 작동한다.

*전달된 인수가 1개이고 숫자인 경우, 인수를 length 프로퍼티의 값으로 갖는 배열을 생성*, 이때 생성된 배열은 희소 배열이다. length 프로퍼티의 값은 0이 아니지만 실제로 배열의 요소는 존재하지 않는다.
``` javascript
const arr = new Array(10);

console.log(arr); // [empty × 10]
console.log(arr.length); // 10
```

전달된 인수가 없는 경우, 빈 배열을 생성한다.
``` javascript
const empty = new Array();

console.log(empty); // []
```

2개 이상이거나 숫자가 아닌 경우, 인수를 요소로 갖는 배열을 생성한다.
``` javascript
// 전달된 인수가 1개이지만 숫자가 아니면 인수를 요소로 갖는 배열을 생성한다.
const arr1 = new Array({});

console.log(arr1); // [{}]

// 전달된 인수가 2개 이상이면 인수를 요소로 갖는 배열을 생성한다.
const arr2 = new Array(1, 2, 3);

console.log(arr2); // [1, 2, 3]
```

new 연산자와 함께 호출되지 않더라도, 배열을 생성하는 생성자함수로 동작한다. Array 생성자 함수 내부에서 new.target을 확인하기 때문이다.
``` javascript
const arr = Array(1, 2, 3);
console.log(arr); // [1, 2, 3]
```

<hr class="sub" />

### Array.of
전달된 인수를 요소로 갖는 배열을 생성한다.
*Array 생성자 함수와는 다르게 전달된 인수가 1개이고 숫자더라도 인수를 요소로 갖는 배열을 생성한다.*

``` javascript
const arr = Array.of(1);
const arr2 = Array.of('string', 'number');

console.log(arr); // [1]
console.log(arr2); // (2) ['string', 'number']
```

<hr class="sub" />

### Array.from
**유사 배열 객체(array-like object) 또는 이터러블 객체(iterable object)**를 변환하여 새로운 배열을 생성한다.

``` javascript
const arr = Array.from('Hello'); // 이터러블 객체
const arr2 = Array.from({ length: 3, 0: 'a', 1: 'b', 2: 'c' });// 유사배열 객체

console.log(arr); // (5) ["H", "e", "l", "l", "o"]
console.log(arr2); // (3) ["a", "b", "c"]
```

두번째 인수로 전달한 함수를 통해 값을 만들면서 요소를 채울 수 있다. 두번째 인수로 전달한 함수는 첫번째 인수에 의해 생성된 배열의 요소 값과 인덱스를 순차적으로 전달받아 새로운 요소를 생성할 수 있다.
``` javascript
// Array.from의 두번째 인수로 배열의 모든 요소에 대해 호출할 함수를 전달할 수 있다.
// 이 함수는 첫번째 인수에 의해 생성된 배열의 요소값과 인덱스를 순차적으로 전달받아 호출된다.
const arr = Array.from({length: 5}, function (a, i) {return i;}); // length가 있고 프로퍼티 키가 숫자로 되있는 애들을 유사배열객체라 한다.
// length 가 5인 희소배열을 만들고, 매개 변수에 인수를 전달하면서 콜백함수를 호출한다. v는 요소, i는 index, 희소배열이라 v는 요소는 없다
// from에게 함수를 전달하여 5번 호출하게 한다

console.log(arr); // (5) [0, 1, 2, 3, 4]
```

<br>

## 배열 요소의 참조
대괄호 표기법[]을 사용한다.

대괄호 안에는 인덱스가 와야한다. 정수로 평가되는 표현식이라면 인덱스로 사용할 수 있다.
``` javascript
const arr = [1, 2];

// 인덱스가 0인 요소를 참조
console.log(arr[0]); // 1
// 인덱스가 1인 요소를 참조
console.log(arr[1]); // 2
```

배열은 사실 인덱스를 프로퍼티 키로 갖는 객체이기 때문에 객체와 같이 존재하지 않는 요소에 참조하면 undefined가 반환된다.
``` javascript
const arr = [1, 2];

// 인덱스가 2인 요소를 참조
// 배열 arr에 인덱스가 2인 요소는 존재하지 않는다.
console.log(arr[2]); // undefined
```

<br>

## 배열 요소의 추가와 갱신
객체와 같이 배열도 동적으로 추가할 수 있다. 요소가 존재하지 않는 인덱스의 배열 요소에 값을 할당하면 새로운 요소가 추가되며, 이때 length 프로퍼티값은 자동 갱신된다.

- 현재 배열의 length 프로퍼티 값보다 큰 인덱스로 새로운 요소를 추가하면 희소 배열이 된다.
- 인덱스로 요소에 접근하여 명시적으로 값을 할당하지 않은 요소는 생성되지 않는다.
- 이미 요소가 존재하는 요소에 값을 재할당하면 요소값이 갱신된다.

``` javascript
const arr = [0];

// 배열 요소의 추가
arr[1] = 1;

console.log(arr); // [ 0, 1 ]
console.log(arr.length); // 2

// 현재 배열의 length 프로퍼티 값보다 큰 인덱스로 새로운 요소를 추가하면 희소 배열이 된다.
arr[100] = 100;

console.log(arr); // [0, 1, empty × 98, 100]
console.log(arr.length); // 101

// 인덱스로 요소에 접근하여 명시적으로 값을 할당하지 않은 요소는 생성되지 않는다.
console.log(Object.getOwnPropertyDescriptors(arr));
/*
{
  '0': { value: 0, writable: true, enumerable: true, configurable: true },
  '1': { value: 1, writable: true, enumerable: true, configurable: true },
  '100': { value: 100, writable: true, enumerable: true, configurable: true },
  length: { value: 101, writable: true, enumerable: false, configurable: false }
*/


// 이미 요소가 존재하는 요소에 값을 재할당하면 요소값이 갱신된다.
// 요소값의 갱신
arr[1] = 10;

console.log(arr); // [0, 10, empty × 98, 100]
```

- 인덱스는 요소의 위치를 나타내므로 반드시 0 이상의 정수(또는 정수 형태의 문자열)를 사용하여야 한다. 만약 정수 이외의 값을 인덱스처럼 사용하면 요소가 생성되는 것이 아니라 프로퍼티가 생성된다. 이때 추가된 프로퍼티는 length 프로퍼티의 값에 영향을 주지 않는다.


``` javascript
const arr = [];

// 배열 요소의 추가
arr[0] = 1; // 객체를 동적으로 생성할때 대괄호 표기법은 문자열로 전달해야하지만, 숫자일 경우 암묵적으로 ''를 붙여 문자열로 변환한다.
arr['1'] = 2;

// 프로퍼티 추가
arr['foo'] = 3;
arr[1.1] = 4;
arr[-1] = 5;

console.log(arr); // [1, 2, foo: 3, 1.1: 4, -1: 5]

// 프로퍼티는 length에 영향을 주지 않는다.
console.log(arr.length); // 2
```

<br>

## 배열 요소 삭제
delete 연산자는 객체의 프로퍼티를 삭제한다. 이때 배열은 희소 배열이 되며 length 프로퍼티 값은 변하지 않는다. 따라서 희소배열을 만드는 delete 연산자는 사용하지 않는 것이 좋다.
``` javascript
const arr = [1, 2, 3];

// 배열 요소의 삭제
delete arr[1];
console.log(arr); // [1, empty, 3]

// length 프로퍼티에 영향을 주지 않는다. 즉, 희소 배열이 된다.
console.log(arr.length); // 3
```

희소배열을 만들지 않으면서 특정요소를 완전히 삭제하려면 Array.prototype.splice 메소드를 사용하자
``` javascript
const arr = [1, 2, 3];

// Array.prototype.splice(삭제를 시작할 인덱스, 삭제할 요소수)
// arr[1]부터 1개의 요소를 제거
arr.splice(1, 1);
console.log(arr); // [1, 3]

// length 프로퍼티에 변경이 반영된다.
console.log(arr.length); // 2
```

<br>

## 배열 메소드★
배열은 결과물을 반환하는 2가지 패턴이 존재한다.
2가지 패턴이 있으므로, 일관성 있는 코드로 작성을 하기위해 accessor method를 쓰는 것을 추천한다.
- 원본 배열을 직접 변경하는 메소드(mutator method)
  - 반드시 원본 배열을 할당한 변수로 접근해서 메소드를 실행 시켜야한다.
  - 비순수 함수로서 외부 환경을 바꾼다.
  - 사용을 자제하는 것이 좋다.
  - push, pop, unshift, shift, splice, reverse, fill, sort

- 새로운 배열을 생성하여 반환하는 메소드(accessor method)
  - 반드시 리턴 값을 받아줘야된다.
  - 원본은 안바뀐다.
  - concat, slice, join, includes, forEach★, map★, filter★, reduce★, some, every, find, findIndex

### Array.isArray
Array.isArray 정적 메소드로서 주어진 인수가 배열이면 true, 배열이 아니면 false를 반환한다.

``` javascript
Array.isArray([]); // true
Array.isArray([1, 2]); //true
Array.isArray(new Array()); // true
Array.isArray([{}]); // true

Array.isArray(); // false
Array.isArray({}); // false
Array.isArray(null); // false
Array.isArray(1); // false
Array.isArray('Array'); // false
Array.isArray(true); // false
Array.isArray(false); // false
```

<hr class="sub" />

### Array.prototype.push
<br>

![array](/images/javascript/array.jpg "array")
<br>
인수로 전달받은 모든 값을 원본 배열의 <b>마지막에 요소로 추가하고 변경된 length 값을 반환한다.</b> push 메소드는 원본 배열을 직접 변경한다.

``` javascript
const arr = [1, 2];

let result = arr.push(3, 4);

console.log(result); // 4
console.log(arr); // (4) [1, 2, 3, 4]
```
push 메소드는 배열의 마지막에 요소를 추가하므로 **같은방법으로 length 프로퍼티를 사용해서 직접 요소를 추가할 수 있다. 이 방법이 push 메소드보다 빠르다.**

``` javascript
const arr = [1, 2]; // length: 2, index: 0, 1

arr[arr.length] = 3; // === arr[2] = 3;

console.log(arr); // (3) [1, 2, 3]
```

<hr class="sub" />

### Array.prototype.pop
<br>

![array](/images/javascript/array.jpg "array")
<br>
<b>원본 배열에서 마지막 요소를 제거하고 제거한 요소를 반환한다.</b> 인수를 전달하지 않는다. **원본 배열이 빈 배열이라면 undefined를 반환한다.** pop 메소드는 원본 배열을 직접 변경한다.

``` javascript
const arr = [1, 2, 3];

const result = arr.pop();

console.log(result); // 3
console.log(arr); // (2) [1, 2]
```
pop 메소드와 push 메소드를 사용하면 **스택**을 쉽게 구현할 수 있다.

> 스택(stack)은 데이터를 마지막에 밀어 넣고, 마지막에 밀어 넣은 데이터를 먼저 꺼내는 <b>후입선출</b> 방식의 자료 구조이다.

``` javascript
const Stack = (function () {
  function Stack(array = []) {
    if (!Array.isArray(array)) {
      throw new TypeError(`${array} is not an array.`);
    }
    this.array = array;
  }

  Stack.prototype.push = function (value) {
    return this.array.push(value);
  };

  Stack.prototype.pop = function () {
    return this.array.pop();
  };

  return Stack;
}());

const stack = new Stack([1, 2]);

console.log(stack); // [1, 2]

stack.push(3);
console.log(stack); // [1, 2, 3]

stack.pop(); // -> 3
console.log(stack); // [1, 2]
```

<hr class="sub" />

### Array.prototype.unshift
<br>

![array](/images/javascript/array.jpg "array")
<br>
unshift 메소드는 <b>인수로 전달받은 모든 값을 원본 배열(this)의 선두에 요소로 추가하고 변경된 length 값을 반환한다.</b> unshift 메소드는 원본 배열을 직접 변경한다.

``` javascript
const arr = [1, 2];

// 인수로 전달받은 모든 값을 원본 배열의 선두 요소로 추가하고 변경된 length 값을 반환한다.
let result = arr.unshift(3, 4);
console.log(result); // 4

// unshift 메소드는 원본 배열을 직접 변경한다.
console.log(arr); /// (4) [3, 4, 1, 2]
```

unshift 메소드는 원본 배열(this)을 직접 변경하는 부수 효과가 있다. 따라서 unshift 메소드보다는 ES6의 Spread 문법을 사용하는 편이 좋다.
``` javascript
const arr = [1, 2];

// ES6 Spread 문법
const newArr = [3, ...arr];

console.log(newArr); // [3, 1, 2]
```

<hr class="sub" />

### Array.prototype.shift
<br>

![array](/images/javascript/array.jpg "array")
<br>
원본 배열의 <b>첫번째 요소를 제거하고 제거한 요소를 반환한다.</b> 원본 배열이 빈 배열이면 undefined를 반환한다. shift 메소드는 원본 배열을 직접 변경한다.

``` javascript
const arr = [1, 2];

// 원본 배열에서 첫번째 요소를 제거하고 제거한 요소를 반환한다.
let result = arr.shift();
console.log(result);

// shift 메소드는 원본 배열을 직접 변경한다.
console.log(arr); // [2]
```

pop 메소드와 shift 메소드를 사용하면 큐를 쉽게 구현할 수 있다.

> 큐(queue)는 데이터를 마지막에 밀어 넣고 가장 먼저 밀어 넣은 데이터를 먼저 꺼내는 <b>선입 선출</b> 방식의 자료 구조이다.

``` javascript
const Queue = (function () {
  function Queue(array = []) {
    if (!Array.isArray(array)) {
      throw new TypeError(`${array} is not an array.`)
    }
    this.array = array;
  }

  Queue.prototype.push = function (value) {
    return this.array.push(value);
  };

  Queue.prototype.shift = function () {
    return this.array.shift();
  };

  return Queue;
}());

const queue = new Queue([1, 2]);
console.log(queue); // [1, 2]

queue.shift(); // -> 1
console.log(queue); // [2]

queue.push(3);
console.log(queue); // [2, 3]
```

<hr class="sub" />

### Array.prototype.concat
concat 메소드는 <b>인수로 전달된 값들(배열 또는 값)을 원본 배열의 마지막 요소로 추가한 새로운 배열을 반환한다. 만약 인수로 전달하는 값이 배열인 경우, 배열을 해체하여 새로운 배열의 요소로 추가한다.</b> 이때, 원본 배열은 변경되지 않는다.

``` javascript
const arr1 = [1, 2];
const arr2 = [3, 4];

// 배열 arr2를 원본 배열 arr1의 마지막 요소로 추가한 새로운 배열을 반환
let result = arr1.concat(3);
console.log(result); // [1, 2, 3]

// 숫자를 원본 배열 arr1의 마지막 요소로 추가한 새로운 배열을 반환
result = arr1.concat(arr2);
console.log(result); // [1, 2, 3, 4]

// 배열 arr2와 숫자를 원본 배열 arr1의 마지막 요소로 추가한 새로운 배열 반환
result = arr1.concat(arr2, 5);
console.log(result); // [1, 2, 3, 4, 5]

// 원본 배열은 바뀌지 않는다.
console.log(arr1); // [1, 2]
```
push와 unshift 메소드는 concat 메소드로 대체할 수 있다. push와 unshift 메소드는 concat 메소드는 유사하게 동작하지만 미묘한 차이가 있다.

- push와 unshift 메소드는 원본 배열(this)을 직접 변경하지만 concat 메소드는 원본 배열(this)을 변경하지 않고 새로운 배열을 반환한다. 따라서 push와 unshift 메소드를 사용할 경우, 원본 배열을 반드시 변수에 할당해야 하며 concat 메소드를 사용할 경우, 반환값을 반드시 변수에 할당 받아야 한다.

``` javascript
const arr1 = [3, 4];

// unshift 메소드는 원본 배열을 직접 변경한다.
arr1.unshift(1, 2);
// unshift 메소드를 사용할 경우, 원본 배열을 반드시 변수에 할당해야 결과를 확인할 수 있다.
console.log(arr1); // [1, 2, 3, 4]

// push 메소드는 원본 배열을 직접 변경한다.
arr1.push(5, 6);
// push 메소드를 사용할 경우, 원본 배열을 반드시 변수에 할당해야 결과를 확인할 수 있다.
console.log(arr1); // [1, 2, 3, 4, 5, 6]

// unshift와 push 메소드는 concat 메소드로 대체할 수 있다.
const arr2 = [3, 4];

// concat 메소드는 원본 배열을 변경하지 않고 새로운 배열을 반환한다.
// arr1.unshift(1, 2)를 아래와 같이 대체할 수 있다.
let result = [1, 2].concat(arr2);
console.log(result); // [1, 2, 3, 4]

// arr1.push(5, 6)를 아래와 같이 대체할 수 있다.
result = result.concat(5, 6);
console.log(result); // [1, 2, 3, 4, 5, 6]
```
- 인수로 전달받은 값이 배열인 경우, push와 unshift 메소드는 배열을 그대로 원본 배열(this)의 마지막/첫번째 요소로 추가하지만 concat 메소드는 인수로 전달받은 배열을 해체하여 새로운 배열의 마지막 요소로 추가한다.

``` javascript
const arr = [3, 4];

// unshift와 push 메소드는 인수로 전달받은 배열을 그대로 원본 배열의 요소로 추가한다
arr.unshift([1, 2]);
arr.push([5, 6]);
console.log(arr); // [[1, 2], 3, 4,[5, 6]]

// concat 메소드는 인수로 전달받은 배열을 해체하여 새로운 배열의 요소로 추가한다
let result = [1, 2].concat([3, 4]);
result = result.concat([5, 6]);

console.log(result); // [1, 2, 3, 4, 5, 6]
```

concat 메소드는 ES6의 Spread 문법으로 대체할 수 있다.

``` javascript
let result = [1, 2].concat([3, 4]);
console.log(result); // [1, 2, 3, 4]

// concat 메소드는 ES6의 Spread 문법으로 대체할 수 있다.
result = [...[1, 2], ...[3, 4]];
console.log(result); // [1, 2, 3, 4]
```

<hr class="sub" />

### Array.prototype.splice
<b>원본 배열(this)의 중간에 요소를 추가하거나 중간에 있는 요소를 제거하는 경우 splice 메소드를 사용한다.</b> splice 메소드는 3개의 매개변수가 있으며 원본 배열을 직접 변경한다.

> 배열.(Start, deleteCount, Items);
- start: 원본 배열의 요소를 제거하기 시작할 인덱스이다. 만약 start만 정의한다면 원본 배열의 start부터 모든 요소를 제거한다.
- deleteCount(옵션): 제거하기 시작할 인덱스 start부터 제거할 요소의 개수
- items(옵션): 제거한 위치에 삽입될 요소들의 목록이다.

<br>

splice 메소드에 3개의 인수를 빠짐없이 전달하면 첫번째 인수, 즉 시작 인덱스부터 두번째 인수, 즉 제거할 요소의 개수만큼 원본 배열에서 요소를 제거한다. 그리고 세번째 인수, 즉 제거한 위치에 삽입할 요소들을 삽입한다.
``` javascript
const arr = [1, 2, 3, 4];

// 원본 배열의 인덱스 1부터 2개의 요소를 제거하고 그 자리에 새로운 요소 20, 30을 삽입한다.
const result = arr.splice(1, 2, 20, 30);

// 제거한 요소가 배열로 반환된다.
console.log(result); // [2, 3]
// splice 메소드는 원본 배열을 직접 변경한다.
console.log(arr); // [1, 20, 30, 4]
```

splice 메소드의 두번째 인수, 즉 제거할 요소의 개수를 0으로 지정하면 아무런 요소도 제거하지 않고 새로운 요소들을 삽입한다.

``` javascript
const arr = [1, 2, 3, 4];

// 원본 배열의 인덱스 1부터 0개의 요소를 제거하고 그 자리에 새로운 요소 100을 삽입한다.
const result = arr.splice(1, 0, 100);

// 원본 배열이 변경된다.
console.log(arr); // [1, 100, 2, 3, 4]
// 제거한 요소가 배열로 반환된다.
console.log(result); // []
```

splice 메소드의 세번째 인수, 즉 제거한 위치에 추가할 요소들의 목록을 전달하지 않으면 원본 배열에서 지정된 요소만을 제거한다.

``` javascript
const arr = [1, 2, 3, 4];

// 원본 배열의 인덱스 1부터 2개의 요소를 제거한다.
const result = arr.splice(1, 2);

// 원본 배열이 변경된다.
console.log(arr); // [1, 4]
// 제거한 요소가 배열로 반환된다.
console.log(result); // [2, 3]
```
splice 메소드의 두번째 인수, 즉 제거할 요소의 개수를 생략하면 첫번째 인수로 전달된 시작 인덱스부터 모든 요소를 제거한다.
``` javascript
const arr = [1, 2, 3, 4];

// 원본 배열의 인덱스 1부터 모든 요소를 제거한다.
const result = arr.splice(1);

// 원본 배열이 변경된다.
console.log(arr); // [1]
// 제거한 요소가 배열로 반환된다.
console.log(result); // [2, 3, 4]
```

<hr class="sub" />

### Array.prototype.slice
<b>slice 메소드는 인수로 전달된 범위의 요소들을 복사하여 반환한다.</b>
원본 배열은 변경되지 않는다. slice 메소드는 2개의 매개변수를 갖는다.
slice는 **얕은 복사**를 한다. 깊은 복사를 하려면 재귀함수를 써야한다(퍼포먼스에 영향을 끼쳐 재귀함수 대신 라이브러리(lodash의 deepClone)를 쓰는 것을 추천한다)

> <b>얕은 복사와 깊은 복사</b><br>
객체를 프로퍼티 값으로 갖는 객체의 경우, 얕은 복사는 한 단계까지만 복사하는 것을 말하고 깊은 복사는 객체에 중첩되어 있는 객체까지 모두 복사하는 것을 말한다.
얕은 복사와 깊은 복사로 생성된 객체는 원본과는 다른 객체이다. 즉, 원본과 복사본은 참조값이 다른 별개의 객체이다. 하지만 얕은 복사는 객체에 중첩되어 있는 객체의 경우, 참조값을 복사하고 깊은 복사는 객체에 중첩되어 있는 객체까지 모두 복사하여 원시 값처럼 완전한 복사본을 만든다는 차이가 있다.

<br>

> 배열.slice(Start, End)

- start: 복사를 시작할 인덱스이다. 지정한 값까지의 인덱스를 자르고 나머지를 반환한다. slice(-2)는 배열의 마지막 2개의 요소를 반환한다.
- end(옵션): 복사를 종료할 인덱스이다. *이 인덱스에 해당하는 요소는 복사되지 않는다.* 기본값은 length 값이다.

slice 메소드는 첫번째 매개변수 start에 해당하는 인덱스를 갖는 요소부터 매개변수 end에 해당하는 인덱스를 가진 요소 이전(__*end 미포함*__)까지 요소들을 복사하여 반환한다.
``` javascript
const arr = [1, 2, 3];

// arr[0]부터 arr[1] 이전(arr[1] 미포함)까지 복사하여 반환한다.
let result = arr.slice(0, 1);
console.log(result); // [1]

// arr[1]부터 arr[2] 이전(arr[2] 미포함)까지 복사하여 반환한다.
result = arr.slice(1, 2);
console.log(result); // [2]

// 원본은 변경되지 않는다.
console.log(arr); // [1, 2, 3]
```

slice 메소드의 두번째 인수를 생략하면 첫번째 인수에 해당하는 인덱스부터 모든 요소를 복사하여 반환한다.
``` javascript
const arr = [1, 2, 3];

// arr[1]부터 이후의 모든 요소를 복사하여 반환한다.
const result = arr.slice(1);
console.log(result); // [2, 3]

slice 메소드의 첫번째 인수가 음수인 경우, 배열의 끝부터 요소를 복사하여 반환한다.
const arr = [1, 2, 3];

// 전달된 인수가 음수인 경우, 배열의 끝부터 요소를 복사하여 반환한다.
let result = arr.slice(-1);
console.log(result); // [3]

result = arr.slice(-2);
console.log(result); // [2, 3]
```

**slice 메소드의 인수를 모두 생략하면 원본 배열의 새로운 복사본을 생성하여 반환한다.**
``` javascript
const arr = [1, 2, 3];

// 인수를 생략하면 원본 배열의 복사본을 생성하여 반환한다.
const copy = arr.slice(); // 새로 만들었으니 주소가 다르다★
console.log(copy); // [1, 2, 3]
console.log(copy === arr); // false

// 이때 생성된 복사본은 얕은 복사(shallow copy)를 통해 생성된다.
const todos = [
  { id: 1, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 3, content: 'Javascript', completed: false }
];

// 앝은 복사(shallow copy)
const _todos = todos.slice();
// const _todos = [...todos];

// _todos와 todos는 참조값이 다른 별개의 객체를 가리킨다.
console.log(_todos === todos); // false

// 배열의 요소는 참조값이 같다. 즉, 얕은 복사되었다.
console.log(_todos[0] === todos[0]); // true
```

slice 메소드가 복사본을 생성하는 것을 이용하여 arguments, HTMLCollection, NodeList와 같은 유사 배열 객체(Array-like Object)를 배열로 변환할 수 있다.
``` javascript
function sum() {
  // 유사 배열 객체를 배열로 변환(ES5)
  var arr = Array.prototype.slice.call(arguments); // this를 argument로 바꿔서 호출한다.
  console.log(arr); // [1, 2, 3]

  return arr.reduce(function (pre, cur) {
    return pre + cur;
  }, 0);
}

console.log(sum(1, 2, 3)); // 6
```

ES6의 Spread 문법을 사용하여 유사 배열 객체를 배열로 변환 하는 방법
```javascript
function sum() {
  // 유사 배열 객체를 배열로 변환(ES6 Spread 문법)
  const arr = [...arguments ];
  console.log(arr); // [1, 2, 3]

  return arr.reduce((pre, cur) => pre + cur, 0);
}

console.log(sum(1, 2, 3)); // 6
```


<hr class="sub" />

### Array.prototype.indexOf★
indexOf 메소드는 원본 배열(this)에서 <b>인수로 전달된 요소를 검색하여 인덱스를 반환한다.</b>

- 중복되는 요소가 있는 경우, 해당 중복 값의 인덱스(중복되는 값이 2개 이상일 경우 첫번째 인덱스 값)를 반환한다.
- 해당하는 요소가 없는 경우, **-1**을 반환한다.

``` javascript
const arr = [1, 2, 2, 3];

// 배열 arr에서 요소 2를 검색하여 첫번째 인덱스를 반환
arr.indexOf(2);    // -> 1
// 배열 arr에서 요소 4가 없으므로 -1을 반환
arr.indexOf(4);    // -1
// 두번째 인수는 검색을 시작할 인덱스이다. 두번째 인수를 생략하면 처음부터 검색한다.
arr.indexOf(2, 2); // 2
```

배열에 요소가 있는지 없는지 여부를 확인하기 위해서 주로 사용한다.

``` javascript
const foods = ['apple', 'banana'];

// foods 배열에 'orange' 요소가 존재하는지 확인
if (foods.indexOf('orange') === -1) {
  // foods 배열에 'orange' 요소가 존재하지 않으면 'orange' 요소를 추가
  foods.push('orange');
}

console.log(foods); // ["apple", "banana", "orange"]
```

indexOf 메소드 대신 ES7에서 새롭게 도입된 Array.prototype.includes 메소드를 사용하면 보다 가독성이 좋다.
``` javascript
const foods = ['apple', 'banana'];

// ES7: Array.prototype.includes
// foods 배열에 'orange' 요소가 존재하는지 확인
if (!foods.includes('orange')) {
  // foods 배열에 'orange' 요소가 존재하지 않으면 'orange' 요소를 추가
  foods.push('orange');
}

console.log(foods); // ["apple", "banana", "orange"]
```

<hr class="sub" />

### Array.prototype.join
join 메소드는 원본 배열(this)의 __모든 요소를 문자열로 변환한 후, 인수로 전달받은 값, 즉 구분자(separator)로 연결한 *문자열*을 반환한다.__ 구분자는 생략 가능하며 기본 구분자는 ‘,’이다.

``` javascript
const arr = [1, 2, 3, 4];

// 기본 구분자는 ','이다.
// 원본 배열 arr의 모든 요소를 문자열로 변환한 후, 기본 구분자 ','로 연결한 문자열을 반환
let result = arr.join();
console.log(result); // '1,2,3,4';

// 원본 배열 arr의 모든 요소를 문자열로 변환한 후, 빈문자열로 연결한 문자열을 반환
result = arr.join('');
console.log(result); // '1234'

// 원본 배열 arr의 모든 요소를 문자열로 변환한 후, 구분자 ':'로 연결한 문자열을 반환
result = arr.join(':');
console.log(result); // '1:2:3:4'
```

<hr class="sub" />

### Array.prototype.reverse
reverse 메소드는 <b>원본 배열의 요소 순서를 반대로 변경한다. 반환값은 변경된 배열이다.</b> 이때 원본 배열이 변경된다.

``` javascript
const arr = [1, 2, 3];
const result = arr.reverse();

// reverse 메소드는 원본 배열을 직접 변경한다.
console.log(arr); // [3, 2, 1]
// 반환값은 변경된 배열이다.
console.log(result); // [3, 2, 1]
```

<hr class="sub" />

### Array.prototype.fill
ES6에서 새롭게 도입된 fill 메소드는 <b>인수로 전달 받은 값을 요소로 배열의 처음부터 끝까지 채운다.</b> 이때 원본 배열이 변경된다.

> 배열.fill(채울 값, Start Index, End index)
첫번째 인수  - 채울 값
두번째 인수 - 채우기 시작할 인덱스
세번째 인수 - 채우기를 멈출 인덱스를 전달할수 있다.


``` javascript
const arr = [1, 2, 3];

// 인수로 전달 받은 값 0을 요소로 배열의 처음부터 끝까지 채운다.
arr.fill(0);

// fill 메소드는 원본 배열을 직접 변경한다.
console.log(arr); // [0, 0, 0]
```

두번째 인수로 요소 채우기를 시작할 인덱스를 전달할 수 있다.
``` javascript
const arr = [1, 2, 3];

// 인수로 전달 받은 값 0를 요소로 배열의 인덱스 1부터 끝까지 채운다.
arr.fill(0, 1);

// fill 메소드는 원본 배열을 직접 변경한다.
console.log(arr); // [1, 0, 0]
```

세번째 인수로 요소 채우기를 멈출 인덱스를 전달할 수 있다.
``` javascript
const arr = [1, 2, 3, 4, 5];

// 인수로 전달 받은 값 0를 요소로 배열의 인덱스 1부터 3 이전(인덱스 3 미포함)까지 채운다.
arr.fill(0, 1, 3);

// fill 메소드는 원본 배열을 직접 변경한다.
console.log(arr); // [1, 0, 0, 4, 5]
```

fill 메소드를 사용하면 배열을 생성하면서 특정 값으로 요소를 채울 수 있다.
``` javascript
const arr = new Array(3);
console.log(arr); // [empty × 3]

// 인수로 전달 받은 값 1을 요소로 배열의 처음부터 끝까지 채운다.
const result = arr.fill(1);

// fill 메소드는 원본 배열을 직접 변경한다.
console.log(result); // [1, 1, 1]
// fill 메소드는 원본 배열을 직접 변경한다.
console.log(arr); // [1, 1, 1]
```

fill 메소드로 요소를 채울 경우, **모든 요소를 하나의 값만으로 채울 수 밖에 없다는 단점이 있다.** Array.from을 사용하면 두번째 인수로 전달한 함수를 통해 값을 만들면서 요소를 채울 수 있다. 두번째 인수로 전달한 함수는 첫번째 인수에 의해 생성된 배열의 요소값과 인덱스를 순차적으로 전달받아 새로운 요소를 생성할 수 있다.

``` javascript
// 인수로 전달받은 정수만큼 요소를 생성하고 0부터 1씩 증가하면 요소를 채운다.
function generateSequences(length = 0) {
  return Array.from(new Array(length), (v, i) => i);
}

console.log(generateSequences(3)); // [0, 1, 2]
```

<hr class="sub" />

### Array.prototype.includes
ES7에서 새롭게 도입된 includes 메소드는 <b>배열 내에 인수로 전달받은 값을 가진 요소가 포함되어 있는지 확인하여 **boolean값**을 반환한다.</b> 두번째 인수로 검색을 시작할 인덱스를 전달할 수 있다.

``` javascript
const arr = [1, 2, 3];

// 배열에 요소 2가 포함되어 있는지 확인한다.
let result = arr.includes(2);
console.log(result); // true

// 배열에 요소 100이 포함되어 있는지 확인한다.
result = arr.includes(100);
console.log(result); // false

// 두번째 인수로 검색을 시작할 인덱스를 전달할 수 있다.
// 배열에서 요소 1가 포함되어 있는지 인덱스 1부터 확인한다.
result = arr.includes(1, 1);
console.log(result); // false
```
배열에서 인수로 전달된 요소를 검색하여 인덱스를 반환하는 indexOf 메소드를 사용하여도 배열 내에 특정 요소가 포함되어 있는지 확인할 수 있다. 하지만 indexOf 메소드는 결과값 -1을 비교해 보아야 하고 배열에 NaN이 포함되어 있는지 확인할 수 없는 문제가 있다

``` javascript
console.log([NaN].indexOf(NaN) !== -1); // false
console.log([NaN].includes(NaN)); // true
```

## 배열 고차 함수★★
고차 함수(High Order Function, HOF)는 함수를 인수로 전달받거나 함수를 반환하는 함수를 말한다. 다시 말해, 고차 함수는 파라미터로 받은 함수를 필요한 시점에 호출하거나 클로저를 생성하여 반환한다.
대부분의 배열의 고차함수들은 내부적으로 for문이 작동한다.

### Array.prototype.sort
sort 메소드는 배열의 요소를 적절하게 정렬한다. 원본 배열을 직접 변경하며 **정렬된 배열을 반환**한다. sort 메소드는 기본적으로 오름차순으로 요소를 정렬한다. 숫자뿐만아니라 영어, 한글 문자열인 요소도 정렬된다. **기본 정렬 순서는 문자열 Unicode 코드 포인트 순서에 따른다.**

``` javascript
const fruits = ['Banana', 'Orange', 'Apple'];

// 오름차순(ascending) 정렬
fruits.sort()

// sort 메소드는 원본 배열을 직접 변경한다.
console.log(fruits); // ['Apple', 'Banana', 'Orange']
```

한글 문자열인 요소도 오름차순으로 정렬된다.
``` javascript
const fruits = ['바나나', '오렌지', '사과']

// 오름차순(ascending) 정렬
fruits.sort();

// sort 메소드는 원본 배열을 직접 변경한다.
conole.log(fruits); // ['바나나', '사과', '오렌지']
```

sort 메소드는 기본적으로 오름차순으로 요소를 정렬한다. 따라서 내림차순으로 요소를 정렬하려면 sort 메소드로 오름차순으로 정렬한 후, reverse 메소드를 사용하여 요소의 순서를 뒤집는다.
``` javascript
const fruits = ['Banana', 'Orange', 'Apple'];

// 오름차순(ascending) 정렬
fruits.sort();

// sort 메소드는 원본 배열을 직접 변경한다.
console.log(fruits); // ['Apple', 'Banana', 'Orange']

// 내림차순(descending) 정렬
fruits.reverse();

// reverse 메소드도 원본 배열을 직접 변경한다.
console.log(fruits); // ['Orange', 'Banana', 'Apple']
```

문자열 요소들로 이루어진 배열의 정렬은 아무런 문제가 없다. 하지만 숫자 요소들로 이루어진 배열을 정렬할 때는 주의가 필요하다.

``` javascript
const points = [40, 100, 1, 5, 2, 25, 10];

points.sort();

// 숫자 요소들로 이루어진 배열은 의도한 대로 정렬되지 않는다.
// sort는 요소들을 문자열로 변환해서 unicode의 대소를 비교한다.
console.log(points); // [1, 10, 100, 2, 25, 40, 5]
```
기본 정렬 순서는 <b>문자열 Unicode 코드 포인트 순서에 따른다.</b> 배열의 요소가 숫자 타입 일지라도 배열의 요소를 일시적으로 문자열로 반환한 후 정렬한다.

따라서 숫자요소를 정렬하기 위해서는 sort 메소드에 정렬 순서를 정의하는 비교함수를 인수로 전달한다. 비교함수를 생략하면 각 요소는 일시적으로 문자열로 변환되어 Unicode 코드 포인트 순서에 따라 정렬된다.
``` javascript
const points = [40, 100, 1, 5, 2, 25, 10];

// 숫자 배열 오름차순 정렬
// 비교 함수의 반환값이 0보다 작은 경우, a를 우선하여 정렬한다.
// sort에 보조 함수로 넘겨 준다. a, b의 이름은 상관 없이 sort 로직은 인수의 순서로 인식한다.
points.sort(function (a, b) { return a - b; });
// ES6 화살표 함수
// points.sort((a, b) => a - b);
console.log(points); // [1, 2, 5, 10, 25, 40, 100]

// 숫자 배열에서 최소값 취득
console.log(points[0]); // 1

// 숫자 배열 내림차순 정렬
// 비교 함수의 반환값이 0보다 큰 경우, b를 우선하여 정렬한다.
points.sort(function (a, b) { return b - a; });
// ES6 화살표 함수
// points.sort((a, b) => b - a);
console.log(points); // [100, 40, 25, 10, 5, 2, 1]

// 숫자 배열에서 최대값 취득
console.log(points[0]); // 100
```

객체를 요소로 갖는 배열을 정렬하는 예제는 아래와 같다.
``` javascript
const todos = [
  { id: 4, content: 'JavaScript' },
  { id: 1, content: 'HTML' },
  { id: 2, content: 'CSS' }
];

// 비교 함수
function compare(key) {
  return function (a, b) {
    // 프로퍼티 값이 문자열인 경우, - 산술 연산으로 비교하면 NaN이 나오므로 비교 연산을 사용한다.
    // 문자열로 변환 후 Unicode 코드 포인트 순서를 비교
    return a[key] > b[key] ? 1 : (a[key] < b[key] ? -1 : 0); // 핵심
  };
}

// id를 기준으로 정렬
todos.sort(compare('id'));
console.log(todos);
/*
[
  { id: 1, content: 'HTML' },
  { id: 2, content: 'CSS' },
  { id: 4, content: 'JavaScript' }
]
*/

// content를 기준으로 정렬
todos.sort(compare('content'));
console.log(todos);
/*
[
  { id: 2, content: 'CSS' },
  { id: 1, content: 'HTML' },
  { id: 4, content: 'JavaScript' }
]
*/
```

<hr class="sub" />

### Array.prototype.forEach ★★
> forEach(요소값, 인덱스, this => {}, this)

조건문이나 반복문은 로직의 흐름을 이해하기 어렵게 한다. For문 같은 경우 반복을 위한 변수를 선언해야하며 증감식과 조건식으로 이루어져 잇어서 함수형 프로그래밍이 추구하는 바와 맞지 않는다.

forEach 메소드는 for문을 대체할 수 있는 메소드이다. <b>배열을 순회하며 배열의 각 요소에 대하여 인수로 전달된 콜백 함수를 실행한다.</b>
``` javascript
const numbers = [1, 2, 3];
let pows = [];

// for 문으로 순회
for (let i = 0; i < numbers.length; i++) {
  pows.push(numbers[i] ** 2);
}

console.log(pows); // [1, 4, 9]

pows = [];

// forEach 메소드로 순회
numbers.forEach(item => pows.push(item ** 2));

console.log(pows); // [1, 4, 9]
```

forEach 메소드의 첫번째 인수인 콜백함수를 호출하면서 (요소값, 인덱스, this)의 인수를 전달한다, 두번째 인수로는 this를 전달한다. 이는 생략할 수 있다.
``` javascript
[1, 2, 3].forEach((item, index, self) => {
  console.log(`요소값: ${item}, 인덱스: ${index}, this: ${self}`);
});
/*
요소값: 1, 인덱스: 0, this: 1,2,3
요소값: 2, 인덱스: 1, this: 1,2,3
요소값: 3, 인덱스: 2, this: 1,2,3
*/
```

forEach 메소드는 원본 배열(this)을 변경하지 않는다. 하지만 <b>콜백 함수가 원본 배열(this)을 변경할 수는 있다.</b>
``` javascript
const numbers = [1, 2, 3];

// forEach 메소드는 원본 배열(this)을 변경하지 않는다.
// 하지만 콜백 함수가 원본 배열(this)을 변경할 수는 있다.
// 원본 배열을 직접 변경하려면 콜백 함수의 3번째 인자(this)를 사용한다.
numbers.forEach((item, index, self) => self[index] = Math.pow(item, 2));

console.log(numbers); // [1, 4, 9]
```

forEach 메소드의 반환값은 언제나 undefined이다.
``` javascript
const result = [1, 2, 3].forEach(console.log);

console.log(result); // undefined
```

forEach 메소드의 동작을 이해하기 위해 forEach 메소드의 폴리필을 살펴보자.
``` javascript
// 만약 Array.prototype에 forEach 메소드가 존재하지 않으면 폴리필을 추가한다.
if (!Array.prototype.forEach) {
  Array.prototype.forEach = function (callback, thisArg) {
    // 전달받은 첫번째 인수가 함수가 아니면 TypeError를 발생시킨다.
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }

    // this로 사용할 두번째 인수가 전달받지 못하면 this로 전역 객체를 사용한다.
    thisArg = thisArg || window;

    // for 문으로 배열을 순회하면서 콜백 함수를 호출한다.
    for (var i = 0; i < this.length; i++) {
      // call 메소드를 통해 두번째 인수가 전달받은 this를 전달하면서 콜백 함수를 호출한다.
      // 이때 콜백 함수의 인수로 배열 요소, 인덱스, 배열 자신을 전달한다.
      callback.call(thisArg, this[i], i, this);
    }
  };
}
```
이처럼 forEach 메소드도 내부에서는 반복문(for 문)을 통해 배열을 순회할 수 밖에 없다. 단, **반복문을 메소드 내부로 은닉하여 로직의 흐름을 이해하기 쉽게 하고 복잡성을 해결한다.**

forEach 메소드는 for 문과는 달리 break, continue 문을 사용할 수 없다. 다시 말해, <b>배열의 모든 요소를 빠짐없이 모두 순회하며 중간에 순회를 중단할 수 없다.</b>
``` javascript
// forEach 메소드는 for 문과는 달리 break 문을 사용할 수 없다.
[1, 2, 3].forEach(function (item) {
  console.log(item);
  if (item > 1) break; // SyntaxError: Illegal break statement
});

// forEach 메소드는 for 문과는 달리 continue 문을 사용할 수 없다.
[1, 2, 3].forEach(function (item) {
  console.log(item);
  if (item > 1) continue;
  // SyntaxError: Illegal continue statement: no surrounding iteration statement
});
```

희소 배열의 존재하지 않는 요소는 순회 대상에서 제외된다.
``` javascript
// 희소 배열
const arr = [1, , 3];

// for 문으로 희소 배열을 순회
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]); // 1, undefined, 3
}

// forEach 메소드는 희소 배열의 존재하지 않는 요소를 순회 대상에서 제외한다.
arr.forEach(v => console.log(v)); // 1, 3
```

forEach 메소드의 콜백 함수는 일반 함수로 호출되므로 콜백 함수 내부의 this는 전역 객체를 가리킨다. 콜백 함수 내부의 this와 multiply 메소드 내부의 this를 일치시키려면 forEach 메소드에 두번째 인수로 forEach 메소드 내부에서 this로 사용될 객체를 전달한다.
``` javascript
class Numbers {
  numberArray = [];

  multiply(arr) {
    arr.forEach(function (item) {
      // 외부에서 this를 전달하지 않으면 this는 전역 객체를 가리킨다.
      this.numberArray.push(item * item);
    }, this); // forEach 메소드 내부에서 this로 사용될 객체를 전달
  }
}

const numbers = new Numbers();
numbers.multiply([1, 2, 3]);
console.log(numbers.numberArray); // [1, 4, 9]
```

보다 나은 방법은 ES6의 화살표 함수를 사용하는 것이다.
``` javascript
class Numbers {
  numberArray = [];

  multiply(arr) {
    // 화살표 함수 내부에서 this를 참조하면
    // 상위 컨텍스트, 즉 multiply 메소드 내부의 this를 그대로 참조한다.
    arr.forEach(item => this.numberArray.push(item * item));
  }
}

const numbers = new Numbers();
numbers.multiply([1, 2, 3]);
console.log(numbers.numberArray); // [1, 4, 9]
```

<hr class="sub" />

### Array.prototype.map ★★
배열의 각 요소에 대하여 <b>인수로 전달된 콜백 함수를 실행한다. 그리고 콜백 함수의 반환한 값들이 요소로서 추가된 새로운 배열을 반환한다.</b> 이때 원본 배열은 변경되지 않는다.
``` javascript
const numbers = [1, 4, 9];

// 배열을 순회하며 배열의 각 요소에 대하여 인수로 전달된 콜백 함수를 실행한다.
// 그리고 콜백 함수의 반환한 값들이 요소로서 추가된 새로운 배열을 반환한다.
const roots = numbers.map(item => Math.sqrt(item));

// 위 코드의 축약 표현은 아래와 같다.
// const roots = numbers.map(Math.sqrt);

// map 메소드는 새로운 배열을 반환한다
console.log(roots);   // [ 1, 2, 3 ]
// map 메소드는 원본 배열은 변경하지 않는다
console.log(numbers); // [ 1, 4, 9 ]
```
forEach 메소드는 배열을 순회하며 요소 값을 참조하여 무언가를 하기 위한 함수이며 map 메소드는 배열을 순회하며 요소 값을 다른 값으로 맵핑하기 위한 함수이다. 따라서 map 메소드가 생성하여 반환하는 새로운 배열의 length는 map 메소드를 호출한 배열, 즉 this의 length와 반드시 일치한다.

map 메소드의 콜백 함수는 요소값, 인덱스, map 메소드를 호출한 배열, 즉 this를 전달 받을 수 있다.
``` javascript
// map 메소드는 콜백 함수를 호출하면서 3개(요소값, 인덱스, this)의 인수를 전달한다.
[1, 2, 3].map((item, index, self) => {
  console.log(`요소값: ${item}, 인덱스: ${index}, this: ${self}`);
  return item;
});
/*
요소값: 1, 인덱스: 0, this: 1,2,3
요소값: 2, 인덱스: 1, this: 1,2,3
요소값: 3, 인덱스: 2, this: 1,2,3
*/
```

map 메소드에 두번째 인수로 map 메소드 내부에서 this로 사용될 객체를 전달할 수 있다.
``` javascript
const Prefixer = (function(){
	function Constructor(prefix) {
		this.prefix = prefix;
	}

	Constructor.prototype.prefixArray = function(arr) {
		return arr.map(function (item) {
			return this.prefix + item;
		}, this);
	}

	return Constructor
}());
const pre = new Prefixer('-webkit-');
const preArr = pre.prefixArray(['linear-gradient', 'border-radius']);
console.log(preArr); // ['-webkit-linear-gradient', '-webkit-border-radius']
```

ES6의 화살표 함수를 사용하는 것이다.
``` javascript
class Prefixer {
  constructor(prefix) {
    this.prefix = prefix;
  }

  prefixArray(arr) {
    // 화살표 함수 내부에서 this를 참조하면
    // 상위 컨텍스트, 즉 multiply 메소드의 this를 그대로 참조한다.
    return arr.map(item => this.prefix + item);
  }
}

const pre = new Prefixer('-webkit-');
const preArr = pre.prefixArray(['linear-gradient', 'border-radius']);
console.log(preArr);
// ['-webkit-linear-gradient', '-webkit-border-radius']
```

<hr class="sub" />

### Array.prototype.filter ★★
filter 메소드는 배열을 순회하며 배열의 각 요소에 대하여 인수로 전달된 콜백 함수를 실행한다. 그리고 <b>콜백 함수의 실행 결과가 true인 배열 요소의 값만을 추출한 새로운 배열을 반환한다.</b> 이때 원본 배열은 변경되지 않는다. <b>배열에서 특정 요소만을 필터링 조건으로 추출하여 새로운 배열을 만들고 싶을 때 사용한다.</b>

``` javascript
const numbers = [1, 2, 3, 4, 5];

// 홀수만을 필터링한다 (1은 true로 평가된다)
const odds = numbers.filter(item => item % 2);

console.log(odds); // [1, 3, 5]
```

filter 메소드는 배열의 특정 요소를 추출하기 위해 사용할 수 있지만 배열의 특정 요소를 제거하기 위해 사용할 수도 있다.

``` javascript
const Users = (function(){
	function Users() {
		this.users = [
            { id: 1, name: 'Lee' },
            { id: 2, name: 'Kim' }
		];
	}

	Users.prototype.findById = function(id) {
		console.log(this);
		return this.users.filter(user => user.id === id);
	}

	Users.prototype.remove = function(id) {
		this.users = this.users.filter(user => user.id !== id);
	}

	return Users
}());

const users = new Users();

let user = users.findById(1);
console.log(user); // [{ id: 1, name: 'Lee' }]

users.remove(1);

user = users.findById(1);
console.log(user); // []
```

<hr class="sub" />

### Array.prototype.reduce ★★
배열을 순회하며 <b>콜백 함수의 이전 반환값과 배열의 각 요소에 대하여 인수로 전달된 콜백 함수를 실행하여
하나의 결과값을 반환한다.</b> 이때 원본 배열은 변경되지 않는다.

reduce(콜백함수(초기값 또는 이전 반환 값, 요소값, 인덱스. this), 초기값)
초기값은 생략이 가능하지만 생략하지 않고 전달하는 것이 더 안전하다.

``` javascript
// 1부터 4까지 누적을 구한다.
const sum = [1, 2, 3, 4].reduce((pre, cur, index, self) => pre + cur, 0);

console.log(sum); // 10
```
첫번째 인수로 전달받은 콜백 함수는 4개의 인수를 전달받아 배열의 length만큼 총 4회 호출된다. 이때 콜백 함수로 전달되는 인수와 반환값은 아래와 같다.

<article class="board-tbl">
  <table>
    <thead>
      <tr>
        <th style="text-align: center" rowspan="2">구분</th>
        <th style="text-align: center" colspan="4">콜백 함수에 전달된 인수</th>
        <th style="text-align: center" rowspan="2">콜백 함수의 반환값</th>
      </tr>
      <tr class="radius-none">
        <th style="text-align: center">pre</th>
        <th style="text-align: center">cur</th>
        <th style="text-align: center">index</th>
        <th style="text-align: center">self</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="text-align: center">첫번째 순회</td>
        <td style="text-align: center">0 (초기값)</td>
        <td style="text-align: center">1</td>
        <td style="text-align: center">0</td>
        <td style="text-align: center">[1, 2, 3, 4]</td>
        <td style="text-align: center">1 (pre + cur)</td>
      </tr>
      <tr>
        <td style="text-align: center">두번째 순회</td>
        <td style="text-align: center">1</td>
        <td style="text-align: center">2</td>
        <td style="text-align: center">1</td>
        <td style="text-align: center">[1, 2, 3, 4]</td>
        <td style="text-align: center">3 (pre + cur)</td>
      </tr>
      <tr>
        <td style="text-align: center">세번째 순회</td>
        <td style="text-align: center">3</td>
        <td style="text-align: center">3</td>
        <td style="text-align: center">2</td>
        <td style="text-align: center">[1, 2, 3, 4]</td>
        <td style="text-align: center">6 (pre + cur)</td>
      </tr>
      <tr>
        <td style="text-align: center">네번째 순회</td>
        <td style="text-align: center">6</td>
        <td style="text-align: center">4</td>
        <td style="text-align: center">3</td>
        <td style="text-align: center">[1, 2, 3, 4]</td>
        <td style="text-align: center">10 (pre + cur)</td>
      </tr>
    </tbody>
  </table>
</article>

초기값과 첫번째 요소를 콜백 함수에게 인수로 전달하면서 호출하고 다음 순회에는 콜백 함수의 반환값과 두번째 요소를 콜백 함수의 인수로 전달하면서 호출한다. 이러한 과정을 반복하여 reduce 메소드는 단일값을 반환한다.

<b>reduce 메소드는 배열을 순회하며 단일값을 구해야 하는 경우에 사용한다.</b><br>
reduce 메소드의 다양한 활용 방법에 대해 살펴보자.

- 평균 구하기

``` javascript
const values = [1, 2, 3, 4, 5, 6];

const average = values.reduce((pre, cur, i, self) => {
  // 마지막 순회인 경우, 누적값으로 평균을 구해 반환
  // 마지막 순회가 아닌 경우, 누적값을 반환
  return i === self.length - 1 ? (pre + cur) / self.length : pre + cur;
}, 0);

console.log(average); // 3.5
```
<br>

- 최대값 구하기

``` javascript
const values = [1, 2, 3, 4, 5];

const max = values.reduce((pre, cur) => (pre > cur ? pre : cur), 0);
console.log(max); // 5
```
하지만 Math.max 메소드를 사용하는 방법이 보다 직관적이다.
``` javascript
const values = [1, 2, 3, 4, 5];

const max = Math.max(...values);
// const max = Math.max.apply(null, values);

console.log(max); // 5
```

- 중복된 요소의 개수 구하기

``` javascript
const fruits = ['banana', 'apple', 'orange', 'orange', 'apple'];

const count = fruits.reduce((pre, cur) => {
  // 첫번째 순회: pre => {}, cur => 'banana'
  // 빈 객체에 요소값을 프로퍼티 키로 추가하고 프로퍼티 값을 할당
  // 만약 프로퍼티 값이 undefined이면 0으로 초기화
  pre[cur] = (pre[cur] || 0) + 1;
  return pre;
}, {});

console.log(count); // { banana: 1, apple: 2, orange: 2 }
```

- 중첩 배열 평탄화

``` javascript
const values = [1, [2, 3], 4, [5, 6]];

const flatten = values.reduce((pre, cur) => pre.concat(cur), []);
// [1] => [1, 2, 3] => [1, 2, 3, 4] => [1, 2, 3, 4, 5, 6]

console.log(flatten); // [1, 2, 3, 4, 5, 6]
```

- 중복 요소 제거

``` javascript
const values = [1, 2, 1, 3, 5, 4, 5, 3, 4, 4];

const result = values.reduce((pre, cur, i, self) => {
  // 순회중인 요소의 인덱스가 자신의 인덱스라면 처음 순회하는 요소이다.
  // 이 요소만 배열에 담아 반환한다.
  // 순회중인 요소의 인덱스가 자신의 인덱스가 아니라면 중복된 요소이다.
  // 3번째 순회: [1, 2], 1, 2, [1, 2, 1, 3, 5, 4, 5, 3, 4, 4]
  // if ([1, 2, 1, 3, 5, 4, 5, 3, 4, 4].indexOf(1) === 2) => if(0 === 2)
  if (self.indexOf(cur) === i) pre.push(cur);
  return pre;
}, []);

console.log(result); // [1, 2, 3, 5, 4]
```
하지만 filter 메소드를 사용하는 방법이 보다 직관적이다.
``` javascript
const values = [1, 2, 1, 3, 5, 4, 5, 3, 4, 4];

// 순회중인 요소의 인덱스가 자신의 인덱스라면 처음 순회하는 요소이다. 이 요소만 반환한다.
const result = values.filter((v, i, self) => self.indexOf(v) === i);
console.log(result); // [1, 2, 3, 5, 4]
```

<hr class="sub" />

### Array.prototype.some
some 메소드는 배열을 순회하며 요소 중 <b>하나라도 콜백 함수의 테스트를 통과하면 true, 모든 요소가 콜백 함수의 테스트를 통과하지 못하면 false를 반환한다.</b>

some 메소드의 콜백 함수는 요소값, 인덱스, 메소드를 호출한 배열, 즉 this를 전달 받을 수 있다.

``` javascript
// 배열의 요소 중에 10보다 큰 요소가 1개 이상 존재하는지 확인
let result = [5, 10, 15].some(item => item > 10);
console.log(result); // true

// 배열의 요소 중에 0보다 작은 요소가 1개 이상 존재하는지 확인
result = [5, 10, 15].some(item => item < 0);
console.log(result); // false

// 배열의 요소 중에 'banana'가 1개 이상 존재하는지 확인
result = ['apple', 'banana', 'mango'].some(item => item === 'banana');
console.log(result); // true
```

some 메소드에 두번째 인수로 some 메소드 내부에서 this로 사용될 객체를 전달할 수 있다.

<hr class="sub" />

### Array.prototype.every
every 메소드는 배열을 순회하며 <b>모든 요소가 콜백 함수의 테스트를 통과하면 true, 요소 중 하나라도 콜백 함수의 테스트를 통과하지 못하면 false를 반환한다.</b>

``` javascript
// 배열의 모든 요소가 3보다 큰지 확인
let result = [5, 10, 15].every(item => item > 3);
console.log(result); // true

// 배열의 모든 요소가 10보다 큰지 확인
result = [5, 10, 15].every(item => item > 10);
console.log(result); // false
```
every 메소드에 두번째 인수로 every 메소드 내부에서 this로 사용될 객체를 전달할 수 있다.

<hr class="sub" />

### Array.prototype.find
ES6에서 새롭게 도입된 find 메소드는 배열을 순회하며 각 요소에 대하여 <b>인수로 전달된 콜백 함수를 실행하여 그 결과가 참인 **첫번째** 요소를 반환한다. 콜백 함수의 실행 결과가 참인 요소가 존재하지 않는다면 **undefined**를 반환한다.<b>

``` javascript
const users = [
  { id: 1, name: 'Lee' },
  { id: 2, name: 'Kim' },
  { id: 2, name: 'Choi' },
  { id: 3, name: 'Park' }
];

// id가 2인 요소를 반환한다.
const result = users.find(item => item.id === 2);

// Array#find는 배열이 아니라 요소를 반환한다.
console.log(result); // {id: 2, name: 'Kim'}
```
filter 메소드는 콜백 함수의 실행 결과가 true인 요소만을 추출한 새로운 배열을 반환한다. 따라서 filter의 반환값은 언제나 배열이다. 하지만 find 메소드는 콜백 함수를 실행하여 그 결과가 참인 첫번째 요소를 반환하므로 find의 결과값은 해당 요소값이다.

``` javascript
// Array#filter는 배열을 반환한다.
[1, 2, 2, 3].filter(item => item === 2); // -> [2, 2]

// Array#find는 요소를 반환한다.
[1, 2, 2, 3].find(item => item === 2); // -> 2
```

<hr class="sub" />

### Array.prototype.findIndex
ES6에서 새롭게 도입된 findIndex 메소드는 배열을 순회하며 <b>각 요소에 대하여 인수로 전달된 콜백 함수를 실행하여 그 결과가 참인 첫번째 요소의 인덱스를 반환한다. 콜백 함수의 실행 결과가 참인 요소가 존재하지 않는다면 **-1**를 반환한다.</b>

``` javascript
const users = [
  { id: 1, name: 'Lee' },
  { id: 2, name: 'Kim' },
  { id: 2, name: 'Choi' },
  { id: 3, name: 'Park' }
];

function predicate(key, value) {
  // key와 value를 기억하는 클로저를 반환
  return item => item[key] === value;
}

// Array#findIndex는 콜백 함수를 실행하여 그 결과가 참인 첫번째 요소의 인덱스를 반환한다.
// id가 2인 요소의 인덱스를 구한다.
let index = users.findIndex(predicate('id', 2));
console.log(index); // 1

// name이 'Park'인 요소의 인덱스를 구한다.
index = users.findIndex(predicate('name', 'Park'));
console.log(index); // 3
```
<br>
<br>
<br>
<br>
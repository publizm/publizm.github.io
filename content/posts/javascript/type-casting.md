---
title: 타입변환(Type Casting)
date: "2019-10-10"
template: "post"
draft: false
slug: "/posts/javascript/TypeCasting"
category: "Javascript"
tags:
  - "Type"
  - "명시적 타입변환(Explicit coercion)"
  - "암묵적 타입변환(Implicit coercion)"
description: "Type Casting에 대해서 알아보자"
---
<span class="notice">
  <em>TIL 이므로 잘못된 내용은 댓글 부탁드립니다</em>
</span>

<div id="toc">

**:link:  Table Of Contents**

- [타입 변환이란?](#타입-변환이란)
- [암묵적 타입 변환](#암묵적-타입-변환)
  - [문자열 타입으로 변환](#문자열-타입으로-변환)
      - [ES6에 도입된 템플릿 리터럴](#es6에-도입된-템플릿-리터럴)
  - [숫자 타입으로 변환](#숫자-타입으로-변환)
      - [산술 연산자](#산술-연산자)
      - [비교 연산자](#비교-연산자)
      - [+단항 연산자](#단항-연산자)
  - [불리언 타입으로 변환](#불리언-타입으로-변환)
- [명시적 타입 변환](#명시적-타입-변환)
  - [문자열 타입으로 변환](#문자열-타입으로-변환-1)
  - [숫자 타입으로 변환](#숫자-타입으로-변환-1)
  - [불리언 타입으로 변환](#불리언-타입으로-변환-1)
- [단축 평가★](#단축-평가★)

</div>

## 타입 변환이란?
자바스크립트의 모든 값은 타입이 있다.<br>
값의 타입은 개발자의 의도에 의해 다른 타입으로 변환할 수 있다. 개발자가 의도적으로 값의 타입을 변환하는 것을 **명시적 타입 변환(Explicit coercion) 또는 타입 캐스팅(Type casting)** 이라 한다.

``` javascript
var num = 10;

// 명시적 타입 변환
// 숫자를 문자열로 타입 캐스팅한다.
var str = num.toString();
console.log(typeof str, str); // string, 10

// 변수 num의 값이 변경된 것은 아니다.
console.log(typeof num, num); // number, 10
```
**동적 타입 언어인 자바스크립트는 개발자의 의도와는 상관 없이 자바스크립트 엔진에 의해 암묵적으로 타입이 자동 변환되기도 한다.** <br>
이를 **암묵적 타입 변환(Implicit coercion) 또는 타입 강제 변환(Type coercion)** 이라고 한다.

``` javascript
var num = 10;

// 암묵적 타입 변환
// 문자열 연결 연산자는 숫자 타입 num의 값을 바탕으로 새로운 문자열을 생성한다.
var str = x + '';
console.log(typeof str, str) // string, 10

// 변수 num의 값이 변경된 것은 아니다.
console.log(typeof x, x); // number, 10
```

명시적 타입 변환과 암묵적 타입 변환 모두 기존 값을 직접 변경하는 것은 아니다.<br>
변수의 값이 원시 타입(숫자,문자열, boolean, undefined, null, symbol)의 값인 경우, 변수 값을 변경하려면 재할당 이외에는 변경할 방법이 없다.
<br>
<br>

## 암묵적 타입 변환
자바스크립트 엔진은 표현식을 평가할 때 코드의 문맥을 고려하여 암묵적 타입 변환을 실행한다.

``` javascript
// 피연산자가 모두 문자열 타입이여야 하는 문맥
'10' + 2 // '102'

// 피연산자가 모두 숫자 타입이여야하는 문맥
5 * '10' // 50

// 피연산자 또는 표현식이 불리언 타입이여야하는 문맥
!0 // true , 0 은 falsy적 성향이 강하다.
if (1) {
  // 실행
}
```
자바스크립트 엔진은 표현식을 평가할 때 코드의 문맥에 부합하지 않는 다양한 상황이 발생했을때 가급적 에러를 발생시키지 않도록 암묵적 타입 변환을 통해 표현식을 평가한다.

> 암묵적 타입 변환이 발생하면 문자열, 숫자, 불리언과 같은 원시 타입 중 하나로 타입을 자동 변환한다.

<br>

*타입별로 암묵적 타입 변환이 어떻게 되는지 알아보자.*

<br>

### 문자열 타입으로 변환

``` javascript
1 + '2' // '12'
```

**+ 연산자**는 피연산자 중 **하나 이상이 문자열**이므로 **문자열 연결 연산자**로 동작한다.<br>문자열 연결 연산자의 모든 피연산자는 코드의 문맥상 모두 문자열 타입이여야 한다.<br>
자바스크립트 엔진은 문자열 연산자 표현식을 평가하기 위해 문자열 연결 연산자의 피연산자 중에서 문자열 타입이 아닌 피연산자를 암묵적 타입 변환한다.
<br>

``` javascript
// 숫자 타입
0 + ''          // '0'
-0 + ''         // '-0'
1 + ''          // '1'
-1 + ''         // '-1'
NaN + ''        // 'NaN'
Infinity + ''   // 'Infinity'
-Infinity + ''  // '-Infinity'

// 불리언 타입
true + ''       // 'true'
false + ''      // 'false'

// null 타입
null + ''       // 'null'

// undefined
undefined + ''  // 'undefined'

// Symbol 타입
(Symbol()) + '' // Uncaught TypeError: Cannot convert a Symbol value to a string

// 객체 타입
({}) + ''           // '[object Object]'
Math + ''           // "[object Math]"
[] + ''             // ""
[10, 20] + ''       // "10,20"
(function(){}) + '' // "function(){}"
Array + ''          // "function Array() { [native code] }"
```

<br>

#### ES6에 도입된 템플릿 리터럴
**템플릿 리터럴(`)**의 **문자열 인터폴레이션**은 표현식의 평가 결과를 문자열 타입으로 암묵적 타입 변환한다.
``` javascript
console.log(`1 + 1 = ${1 + 1}`); // '1 + 1 = 2'
```

자바스크립트 엔진은 문자열 타입이 아닌 값을 문자열 타입으로 암묵적 타입 변환을 수행할 때 이와 같이 동작한다.

<hr class="sub" />

### 숫자 타입으로 변환
#### 산술 연산자
``` javascript
1 - '1'   // 0
1 * '10'  // 10
1 / 'one' // NaN
```
**산술 연산자**의 역할은 숫자 값을 만드는 것이다. 따라서 산술 연산자의 모든 피연산자는 **코드의 문맥상 모두 숫자 타입**이여야한다.<br>
피연산자를 숫자 타입으로 변환할 수 없는 경우는 산술 연산을 수행할 수 없으므로 표현식의 평가 결과는 NaN이 된다.

<br>

#### 비교 연산자
``` javascript
'1' > 0 // true
```
**비교 연산자**의 역할은 불리언 값을 만드는 것이다.<br>
**> 연산자**는 피연산자의 크기를 비교하므로 모든 피연산자는 코드의 문맥 상 모두 숫자 타입이여야 한다.

<br>

#### +단항 연산자
``` javascript
// 문자열 타입
+''             // 0
+'0'            // 0
+'1'            // 1
+'string'       // NaN

// 불리언 타입
+true           // 1
+false          // 0

// null 타입
+null           // 0

// undefined
+undefined      // NaN, 주의 falsy 값인데 0이 아닌 NaN

// Symbol 타입
+Symbol()       // TypeError: Cannot convert a Symbol value to a number

// 객체 타입
+{}             // NaN
+[]             // 0
+[10, 20]       // NaN
+(function(){}) // NaN
```
**+ 단항 연산자**는 피연산자가 숫자 타입의 값이 아니면 숫자 타입의 값으로 암묵적 타입 변환을 수행한다.

<hr class="sub" />

### 불리언 타입으로 변환
if문이나 for문과 같은 제어문 또는 삼항 조건 연산자의 조건식은 불리언 값, 즉 놀리적 참, 거짓을 반환해야하는 표현식이다.

``` javascript
if('')    console.log('1');
if(true)  console.log('2');
if(0)  console.log('3');
if('abc')  console.log('4');
if(null)  console.log('5');

// 2, 4
```
자바스크립트 엔진은 조건식의 평가 결과를 불리언 타입으로 암묵적 타입 변환한다.
<br>

**Truthy 값과 Falsy 값**<br>
자바스크립트 엔진은 불리언 타입이 아닌 값을 Truthy값 또는 Falsy값으로 구분한다.<br>
즉, Truthy값은 true로, Falsy값은 false로 반환한다.

아래는 Falsy 값을 소개한다.<br>
아래의 항목 외 나머지는 거의 Truthy 값이라 생각하면 될 것 같다.

- **false**
- **undefined**
- **null**
- **0, -0**
- **NaN**
- **''(빈문자열)**

<br>

## 명시적 타입 변환
개발자의 의도에 의해 명시적으로 타입을 변경하는 방법은 다양하다.<br>
- 표준 빌트인 생성자 함수(String, Number, Boolean)를 new 연산자 없이 호출하는 방법
- 자바스크립트에서 제공하는 빌트인 메소드를 사용하는 방법
- 암묵적 타입 변환을 이용한 방법.

<br>

### 문자열 타입으로 변환
문자열 타입이 아닌 값을 문자열 타입으로 변환하는 방법은

- String 생성자 함수를 new 연산자 없이 호출하는 방법
- Object.prototype.toString 메소드를 사용하는 방법
- 문자열 연결 연산자를 이용하는 방법

``` javascript
// 1. String 생성자 함수를 new 연산자 없이 호출하는 방법
// 숫자 타입 => 문자열 타입
console.log(String(1));        // "1"
console.log(String(NaN));      // "NaN"
console.log(String(Infinity)); // "Infinity"

// 불리언 타입 => 문자열 타입
console.log(String(true));     // "true"
console.log(String(false));    // "false"


// 2. Object.prototype.toString 메소드를 사용하는 방법
// 숫자 타입 => 문자열 타입
console.log((1).toString());        // "1"
console.log((NaN).toString());      // "NaN"
console.log((Infinity).toString()); // "Infinity"

// 불리언 타입 => 문자열 타입
console.log((true).toString());     // "true"
console.log((false).toString());    // "false"



// 3. 문자열 연결 연산자를 이용하는 방법(암묵적 타입 변환)
// 숫자 타입 => 문자열 타입
console.log(1 + '');        // "1"
console.log(NaN + '');      // "NaN"
console.log(Infinity + ''); // "Infinity"

// 불리언 타입 => 문자열 타입
console.log(true + '');     // "true"
console.log(false + '');    // "false"
```

<hr class="sub" />

### 숫자 타입으로 변환
숫자 타입이 아닌 값을 숫자 타입으로 변환하는 방법은
- Number 생성자 함수를 new 연산자 없이 호출하는 방법
- parseInt, parseFloat 함수를 사용하는 방법(문자열만 숫자 타입으로 변환 가능)
- (+) 단항 연결 연산자를 이용하는 방법
- ( * ) 산술 연산자를 이용하는 방법

``` javascript
// 1. Number 생성자 함수를 new 연산자 없이 호출하는 방법
// 문자열 타입 => 숫자 타입
console.log(Number('0'));     // 0
console.log(Number('-1'));    // -1
console.log(Number('10.53')); // 10.53

// 불리언 타입 => 숫자 타입
console.log(Number(true));    // 1
console.log(Number(false));   // 0


// 2. parseInt, parseFloat 함수를 사용하는 방법(문자열만 변환 가능)
// 문자열 타입 => 숫자 타입
console.log(parseInt('0'));       // 0
console.log(parseInt('-1'));      // -1
console.log(parseFloat('10.53')); // 10.53


// 3. + 단항 연결 연산자를 이용하는 방법
// 문자열 타입 => 숫자 타입
console.log(+'0');     // 0
console.log(+'-1');    // -1
console.log(+'10.53'); // 10.53

// 불리언 타입 => 숫자 타입
console.log(+true);    // 1
console.log(+false);   // 0


// 4. * 산술 연산자를 이용하는 방법
// 문자열 타입 => 숫자 타입
console.log('0' * 1);     // 0
console.log('-1' * 1);    // -1
console.log('10.53' * 1); // 10.53
// 불리언 타입 => 숫자 타입

console.log(true * 1);    // 1
console.log(false * 1);   // 0
```

<hr class="sub" />

### 불리언 타입으로 변환

1. Boolean 생성자 함수를 new 연산자 없이 호출하는 방법
2. !부정 논리 연산자를 두번 사용하는 방법

``` javascript
// 1. Boolean 생성자 함수를 new 연산자 없이 호출하는 방법
// 문자열 타입 => 불리언 타입
console.log(Boolean('x'));       // true
console.log(Boolean(''));        // false
console.log(Boolean('false'));   // true

// 숫자 타입 => 불리언 타입
console.log(Boolean(0));         // false
console.log(Boolean(1));         // true
console.log(Boolean(NaN));       // false
console.log(Boolean(Infinity));  // true

// null 타입 => 불리언 타입
console.log(Boolean(null));      // false

// undefined 타입 => 불리언 타 입
console.log(Boolean(undefined)); // false

// 객체 타입 => 불리언 타입
console.log(Boolean({}));        // true
console.log(Boolean([]));        // true


// 2. ! 부정 논리 연산자를 두번 사용하는 방법
// 문자열 타입 => 불리언 타입
console.log(!!'x');       // true
console.log(!!'');        // false
console.log(!!'false');   // true

// 숫자 타입 => 불리언 타입
console.log(!!0);         // false
console.log(!!1);         // true
console.log(!!NaN);       // false
console.log(!!Infinity);  // true

// null 타입 => 불리언 타입
console.log(!!null);      // false

// undefined 타입 => 불리언 타입
console.log(!!undefined); // false

// 객체 타입 => 불리언 타입
console.log(!!{});        // true
console.log(!![]);        // true
```

<br>
<br>

## 단축 평가★
논리합(||) 연산자와 논리곱(&&) 연산자의 연산 결과는 불리언 값이 아닐 수도 있다. 이 두 연산자는 언제나 **피연산자 중 어느 한쪽 값을 반환한다**라는 것이다.

> 대부분의 연산자가 그렇듯 논리합(||)연산자와 논리곱(&&)연산자는 왼쪽에서 오른쪽으로 평가가 진행된다.

<br>

``` javascript
'Cat' && 'Dog' // 'Dog'
```
논리곱 연산자 **&&**는 두개의 피연산자가 **모두 true**로 평가될 때 true를 반환한다.

``` javascript
'Cat' || 'Dog' // 'Cat'
```
논리합 연산자 **||**는 두개의 피연산자 중 하나만 true로 평가되어도 true를 반환한다.
<br>
<br>

논리곱 연산자 **&&** 논리합 연산자 **||**는 아래와 같이 **논리 평가를 결정한 피연산자를 그대로 반환한다. 이를 단축 평가(Short-Circuit evaluation)라 부른다.**

<article class="board-tbl">

| 단축 평가 표현식 | 평가 결과 |
| :------------- | :------ |
| true ll anything | **true** |
| false ll anything | **anything** |
| true && anything | **anything** |
| false && anything | **false** |

</article>

<br>

단축 평가는 아래와 같은 상황에서 방어적 코드로서 유용하게 사용된다.

- 객체가 null인지 확인하고 프로퍼티를 참조할때

``` javascript
var elem = null;

console.log(elem.value); // TypeError: Cannot read property 'value' of null
console.log(elem && elem.value); // null

// 객체는 키(key)과 값(value)으로 구성된 프로퍼티(Property)들의 집합이다. 만약 객체가 null인 경우, 객체의 프로퍼티를 참조하면 타입 에러(TypeError)가 발생한다. 이때 단축 평가를 사용하면 에러를 발생시키지 않는다.
```

- 함수 매개변수에 기본값을 설정할때

``` javascript
// 단축 평가를 사용한 매개변수의 기본값 설정
function getStringLength(str) {
  str = str || '';
  return str.length;
}

getStringLength();     // 0
getStringLength('hi'); // 2

// ES6의 매개변수의 기본값 설정
function getStringLength(str = '') {
  return str.length;
}

getStringLength();     // 0
getStringLength('hi'); // 2
```

함수를 호출할때 인수를 전달하지 않으면 매개변수는 undefined를 갖는다. 이때 단축 평가를 사용하여 매개변수의 기본값을 설정하면 undefined로 인해 발생할 수 있는 에러를 방지할 수 있다.

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

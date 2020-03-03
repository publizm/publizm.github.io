---
title: 함수형 프로그래밍(Functional Programming)
date: "2019-12-07"
template: "post"
draft: false
slug: "/posts/Etc/FunctionalProgramming"
category: "Etc"
tags:
  - "Functional Programming"
  - "FP"
description: "함수형 프로그래밍에 대해서 알아보자"
---
<span class="notice">
  <em>TIL 이므로 잘못된 내용은 댓글 부탁드립니다</em>
</span>

<div id="toc">

**:link:  Table Of Contents**

- [프로그래밍 패러다임](#프로그래밍-패러다임)
- [함수형 프로그래밍이란?](#함수형-프로그래밍이란)
  - [함수형 프로그래밍의 장점](#함수형-프로그래밍의-장점)
  - [함수형 프로그래밍의 단점](#함수형-프로그래밍의-단점)
- [함수형 프로그래밍의 필요개념 6가지](#함수형-프로그래밍의-필요개념-6가지)
  - [1급 객체](#1급-객체)
  - [고차 함수(High Order Function)](#고차-함수high-order-function)
  - [불변성](#불변성)
  - [순수 함수(Pure function)](#순수-함수pure-function)
  - [데이터 변환방법](#데이터-변환방법)
  - [합성함수(Function composition)](#합성함수function-composition)
- [결론](#결론)

</div>

## 프로그래밍 패러다임
프로그래밍 패러다임은 프로그래머에게 프로그래밍의 관점을 갖게하고 결정하는 역할을 한다.

- 명령형 프로그래밍<br>
  프로그래밍의 상태와 상태를 변경시키는 구문의 관점에서 연산을 설명하는 방식, 알고리즘을 명시하고 목표는 명시 하지 않는다.
  - 절차지향 프로그래밍<br>
    수행되어야 할 연속적인 계산 과정을 포함하는 방식(C, C++)
  - 객체지향 프로그래밍<br>
    객체들의 집합으로 프로그램의 상호작용을 표현(C++, Java, C#)

- <b>선언형 프로그래밍</b><br>
  어떤 방법으로 해야 하는지(How)를 나타내기보다 무엇(Way)과 같은지를 설명하는 방식, 알고리즘을 명시하지 않고 목표만 명시한다.
  - <b>함수형 프로그래밍</b><br>
    순수 함수를 조합하고 소프트웨어를 만드는 방식(클로저, 하스켈, 리스프)


## 함수형 프로그래밍이란?
계산을 수학적 함수의 조합으로 생각하는 방식을 말한다. **일반적인 프로그래밍 언어에서 함수가 특정 동작을 수행하는 역할을 담당하는 것과는 반대되는 개념으로, 함수를 수행해도 함수 외부의 값이 변경될 수 없다.**

### 함수형 프로그래밍의 장점
명령형이나 객체지향 코드보다 간결하고 예측하기 쉬우며, 이에 따라 테스트가 더 쉬워진다.
함수형 프로그램은 순수 함수를 사용하여 부수 효과(side effect)가 전혀 없다.<br>
함수 호출은 그 함수의 결과를 계산하는 것 외에 다른 효과는 없기 때문에, 버그의 주요 원인을 제거할 수 있고, 함수의 실행 순서는 중요하지 않게 된다.

<br>

### 함수형 프로그래밍의 단점
- 상태가 없다

<br>

## 함수형 프로그래밍의 필요개념 6가지
1) 1급 객체<br>
2) 고차 함수(High Order Function<br>
3) 불변성<br>
4) 순수 함수(Pure Function)<br>
5) 데이터 변환 방법
6) 합성 함수(Function composition)



<br>

### 1급 객체

1급 객체란 다음과 같은 조건을 만족하는 객체를 의미한다.

- 변수나 데이터 구조안에 담을 수 있어야된다.
- Parameter(매개변수)로 전달할 수 있어야된다.
- 반환값(return value)로 사용할 수 있어야한다.
- 할당에 사용된 이름과 관계없이 고유한 구별이 가능해야한다.
- 동적으로 Property 할당이 가능해야한다.

> 자바스크립트에서의 함수는 위의 조건을 모두 만족하므로 1급 객체(1급 함수)로 불린다.

<hr class="sub" />

### 고차 함수(High Order Function)
람다 계산법에서 만들어진 용어로 아래 조건을 만족하는 함수를 의미한다.
- 함수에 함수를 Parameter(매개변수)로 전달할 수 있어야한다.
- 함수의 반환값(return value)로 사용할 수 있어야한다.

> 람다 대수(λ代數, 영어: lambda calculus) 또는 λ-대수 또는 람다 계산(λ計算) 또는 람다 계산법(λ計算法)은 추상화와 함수 적용 등의 논리 연산을 다루는 형식 체계이다.<br>[위키백과](https://ko.wikipedia.org/wiki/%EB%9E%8C%EB%8B%A4_%EB%8C%80%EC%88%98)

> 고차 함수는 1급 함수의 부분 집합이다.<br>
> 리액트의 고차 컴포넌트(HOC)는 컴포넌트를 사용하여 위의 조건을 만족하는 컴포넌트를 말한다.


<hr class="sub" />

### 불변성
함수형 프로그래밍에서는 데이터가 변할 수 없다. 이를 불변성 데이터라한다.(단, 자바스크립트는 가능하며 일반적으로 불가능한 언어들이 있다)<br>
**데이터 변경이 필요한 경우, 원본 데이터 구조를 변경하지 않고 그 데이터의 복사본을 만들어 그 일부를 변경하고, 변경한 복사본을 사용하여 작업을 한다.**

예를 들어보자

``` javascript
// 불변하지 않는 데이터
function rateColor(color, rating) {
  color.rating = rating;
  return color;
}

console.log(rateColor(color_lawn, 5), rating) // 5
console.log(color_lawn.rating) // 5

// 불변성 데이터
function rateColor(color, rating) {
  return Object.assign({}, color, {rating: rating})
}

console.log(rateColor(color_lawn, 5), rating) // 5
console.log(color_lawn.rating) // 0 변화지 않는다
```

> const 키워드와 불변은 구분해야한다. const에 할당된 값이 객체라면 변경이 가능하다.


<hr class="sub" />

### 순수 함수(Pure function)
순수 함수란 함수형 프로그래밍에 필요한 개념으로 아래 조건을 만족하는 함수를 뜻한다.

- 동일한 입력에는 항상 같은 값을 반환해야 한다.
- 함수의 실행은 프로그램의 실행에 영향을 미치지 않아야한다.<br>
  즉, 부수효과(Side Effect)가 없어야한다.(예를들어 함수 내부에서 Argument의 값을 변경하거나 프로그램 상태를 변경하는 것)

순수함수를 사용하는 것에 장점은 순수 함수를 호출하면 프로그램의 어떠한 변화가 없고, 입력 값에 대한 결과를 예상할 수 있어 테스트하기 용이하다.

``` javascript
// 비순수 함수, DOM을 변경하는 부수효과(Side Effect)를 발생시킨다.
function Header(title) {
  const $h1 = document.createElement('h1');
  $h1.innetText = title;
  document.body.appendChild($h1);
}

// 순수 함수, 부수효과를 발생시키지 않으며 DOM을 변경하는 책임은 애플리케이션의 다른 부분에 위임한다.
const Header = (props) => <h1>{props.title}</h1>
```

<hr class="sub" />

### 데이터 변환방법
- 함수형 프로그래밍은 데이터 변경이 불가능하기 때문에 기존 데이터의 복사본을 만들어 주는 도구들이 필요하다.
- 자바스크립트에서는 map, filter, reduce 등 데이터 복사본을 만들기 위한 함수들을 제공한다.


<hr class="sub" />

### 합성함수(Function composition)
새로운 함수를 만들거나 계산하기 위해 둘 이상의 함수를 조합하는 과정을 의미한다.

함수형 프로그램은 여러 작은 순수 함수들로 이루어져있어 이 함수들을 연쇄적으로 또는 병렬로 호출해서 더 큰 함수를 만드는 과정으로 전체 프로그램을 구축해야한다.

메소드 체이닝 방식의 합성 함수
``` javascript
const sum = (a, b) => a + b;
const square = x => x * x;
const addTen = x => x + 10;

const computeNumbers = addTen(square(sum(3, 5))); // 64

// compose는 함수를 연쇄적으로 호출하며 반환값을 전달한다.
const compose = (...fns) =>
  fns.reduce((prevFn, nextFn) =>
    (...arg) => nextFn(prevFn(...args)),
    value => value
  );


// compose의 사용
const compute = compose(
  addTen,
  square,
  sum
);

compute(3, 5); // 74
```

## 결론
함수형 프로그래밍은 순수 함수를 조합하고 공유 상태, 변경 가능한 데이터(mutable data) 및 부작용(side Effect)를 피하여 소프트웨어를 만드는 프로세스이다.
함수형 프로그래밍은 명령형이 아닌 선언형이며 애플리케이션의 상태는 순수 함수를 통해 전달된다.

<br>
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

  [규성님의 velog](https://velog.io/@kyusung/%ED%95%A8%EC%88%98%ED%98%95-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D-%EC%9A%94%EC%95%BD),
  [위키백과](https://ko.wikipedia.org/wiki/%EB%9E%8C%EB%8B%A4_%EB%8C%80%EC%88%98)

</div>
---
title: Keyword 정리
date: "2019-10-04"
template: "post"
draft: false
slug: "/posts/Etc/Keyword"
category: "Etc"
tags:
  - "Keyword"
description: "Keyword 정리"
---
<span class="notice">
  <em>TIL 이므로 잘못된 내용은 댓글 부탁드립니다</em>
</span>

<div id="toc">

**:link:  Table Of Contents**

- [부호체계](#부호체계)
- [컴파일러와 인터프리터](#컴파일러와-인터프리터)
- [Javascirpt와 ECMAScript](#javascirpt와-ecmascript)
- [클라이언트와 서버](#클라이언트와-서버)
  - [클라이언트](#클라이언트)
  - [서버](#서버)
  - [프로토콜](#프로토콜)
- [일급객체](#일급-객체)

</div>

## 부호체계
> 컴퓨터의 기본 저장 단위는 바이트(byte)이다.

문자나 기호의 집합을 컴퓨터에서 저장하거나 통신 목적으로 사용할 경우에는 컴퓨터가 인식할 수 없는 문자나 기호를 부호로 바꾸어야한다.
그리하여 아스키코드와 ANSI코드 유니코드가 탄생하였다.

- **아스키코드**<br>
1960년대 미국에서 정의한 표준화한 7bit 부호체계이다.
컴퓨터의 기본 저장 단위는 1byte(8bit)라 하였는데
7bit를 사용하는 이유는 나머지 1bit는 통신에러 검출(Parity Bit)를 위해 사용하기 때문이다.
7bit를 사용하기 때문에 2<sup>7</sup> 즉, 128개의 고유한 값만 사용한다.
http는 아스키코드로 만들어져있다.

- **ANSI 코드**<br>
7bit를 사용하는 아스키코드에 다른 언어를 표현하기에는 부족함을 느껴 1bit를 추가한 8bit의 아스키코드가 나왔다.
2<sup>8</sup> = 256개의 문자를 쓸 수 있게 되었다.
이를 ANSI코드라 불렀다.

- **유니코드**<br>
ANSI코드를 사용하는데 있어 비유럽 국가 특히 한국,중국, 일본과 같은 문자가 많은 국가에서는 1byte(8bit)로는 부족함을 느껴 만들어진 코드이다.

최초에는 2byte로 정의하여 65536개의 문자를 담을 수 있었지만, 쓰지 않는 고어, 아프리카 토속어 등등 모든 문자를 담기에는 부족하여
유니코드 3.0부터 보충언어판을 정의하여 상위대행과 하위해행을 할당한 뒤 이 둘의 조합으로 1024x1024 = 1,048,576 약 백만자가 넘는 문자를 추가로 정의했다.

인코딩 방식으로는 UTF-7, UTF-8, UTF-16, UTF-32 인코딩 등이 있다.

<br>
<br>

## 컴파일러와 인터프리터
인간이 이해할 수 있는 약속된 구문으로 구성된 프로그래밍 언어를 사용하여 프로그램을 작성한 것을 컴퓨터가 이해할 수 있는 기계어로 변환하여 주는 일종의 번역기

<article class="board-tbl">

| 컴파일러(번역가) | 인터프리터(동시 통역가) |
| :------ | :-------- |
| 소스 코드 전체를 한번에 머신코드(CPU가 바로 실행할 수 있는 기계어)로 변환 후 실행한다 | 한 줄씩 중간 코드인 바이트 코드(특정한 하드웨어가 아니라 가상 머신에서 실행하도록 만든 바이너리 코드)로 변환한 후 실행한다. |
| 실행 파일을 생성한다 | 실행 파일을 생성하지 않는다 |
| 컴파일 단계와 실행 단계가 분리되어 있다. 명시적인 컴파일 단계를 거쳐 명시적으로 실행파일을 실행한다 | 인터프리트 단계와 실행 단계가 분리되어 있지 않고, 한줄씩 바이트 코드로 변환하고 즉시 실행한다 |
| 실행에 앞서 컴파일은 단 한번 수행된다 | 코드가 실행될 때마다 인터프리트 과정이 반복 수행된다 |
| 컴파일과 실행 단계가 분리되어 있으므로 코드 실행 속도가 빠르다 | 인터프리트 단계와 실행 단계가 분리되어 있지 않고 반복 수행되므로 코드 실행 속도가 비교적 느리다 |
| 대표언어: C, C++ | 대표언어: 자바스크립트 |

</article>

<br>
<br>

## Javascirpt와 ECMAScript

- **Javascript**<br>
Client-side Web APIs(DOM, BOM, SVG, Web Storage)와 ECMAScript에서 정한 표준 사양을 포함하고 지원하는 프로그래밍 언어를 의미한다.

- **ECMAScript**<br>
ECMA 인터내셔널의 ECMA-262 기술 규격에 정의된 표준화된 스크립트 프로그래밍 언어이다.

<br>
<br>

## 클라이언트와 서버

### 클라이언트
서비스를 받는 입장 서버에 데이터를 인터넷을 통해 요청(request)하는 입장<br>
데이터를 받아 파싱을 통해 트리를 구조하고 이를 화면에 그린다.

<hr class="sub" />

### 서버
클라이언트가 요청한 패킷(데이터를 일정 크기로 자른 것)을 인터넷을 통해 주는(response) 입장

> 웹서버는 클라이언트에서 root로 요청이 오면 index.html을 주도록 암묵적으로 설계되어있다. 그래서 우리가 흔히 쓰는 메인페이지 html 이름을 index.html로 지정하는 것이다.

<hr class="sub" />

### 프로토콜
데이터를 어떻게 전달해줄지 정하는 통신 규약<br>
[여기서](/posts/Etc/Protocol) 확인해보자.

<br>
<br>

## 일급 객체
일급 객체는 다음과 같은 조건을 만족해야한다.
1. 무명의 리터럴로 생성할 수 있다. 즉, 런타임에 생성이 가능하다.
2. 변수나 자료구조(객체,배열 등)에 저장할 수 있다
3. 함수의 매개 변수에 전달할 수 있다.
4. 함수의 결과값으로 반환할 수 있다.

자바스크립트의 함수는 위와 같은 조건을 모두 만족하므로 일급 객체이다.

``` javascript
// 1. 함수는 무명의 리터럴로 생성할 수 있다.
// 2. 함수는 변수에 저장할 수 있다.
// 런타임(할당 단계)에 함수 리터럴이 평가되어 함수 객체가 생성되고 변수에 할당된다.
const increase = function (num) {
  return ++num;
};

const decrease = function (num) {
  return --num;
};

// 2. 함수는 객체에 저장할 수 있다.
const predicates = { increase, decrease };

// 3. 함수의 매개 변수에게 전달할 수 있다.
// 4. 함수의 반환값으로 사용할 수 있다.
function makeCounter(predicate) {
  let num = 0;

  return function () {
    num = predicate(num);
    return num;
  };
}

// 3. 함수는 매개 변수에게 함수를 전달할 수 있다.
const increaser = makeCounter(predicates.increase);
console.log(increaser()); // 1
console.log(increaser()); // 2

// 3. 함수는 매개 변수에게 함수를 전달할 수 있다.
const decreaser = makeCounter(predicates.decrease);
console.log(decreaser()); // -1
console.log(decreaser()); // -2
```
<br>
<br>
<br>
<br>
<br>
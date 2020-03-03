---
title: 동적 타이핑(dynamicTyping)
date: "2019-10-13"
template: "post"
draft: false
slug: "/posts/javascript/dynamicTyping"
category: "Javascript"
tags:
  - "dynamicTyping"
  - "Static type"
  - "Dynamic type"
description: "동적 타입 언어와 정적 타입 언어에 대해 알아보자"
---
<span class="notice">
  <em>TIL 내용이므로 잘못된 내용은 댓글 부탁드립니다</em>
</span>

<div id="toc">

**:link:  Table Of Contents**

- [정적 타입 언어(Static/Strong type)](#정적-타입-언어staticstrong-type)
- [동적 타입 언어](#동적-타입-언어)

</div>

## 정적 타입 언어(Static/Strong type)
정적 타입 언어는 *[변수](/posts/javascript/variable)를 선언할때 변수에 할당할 수 있는 값의 종류, 즉 데이터 타입을 사전에 선언해야한다.* 이를 명시적 타입 선언이라 한다.

C에서 정수 타입의 변수를 선언하는 예시이다.
``` c
// 변수 c에는 1byte 정수 타입의 값(-128 ~ 127)만을 할당할 수 있다.
char c;

// 변수 num에는 4byte 정수 타입의 값(-2,124,483,648 ~ 2,124,483,647)만을 할당할 수 있다.
int num;
```

__*정적 타입 언어는 변수의 타입을 변경할 수 없으며 변수에 선언한 타입에 맞는 값만을 할당할 수 있다.*__<br>
정적 타입 언어는 컴파일 시점에 타입 체크(선언한 데이터 타입에 맞는 값을 할당했는지 여부)를 수행한다. 만약 타입 체크를 통과하지 못했다면 에러를 발생시키고 프로그램의 실행 자체를 막는다. 이를 통해 타입의 일관성을 강제하여 보다 안정적인 코드의 구현을 통해 런타임에 발생하는 에러를 줄인다.

> 대표적인 정적 타입 언어는<br>
C, C++, Java, Kotlin, Go, Haskell, Rust, Scala 등이 있다.

## 동적 타입 언어
변수를 선언할때 데이터 타입을 선언하지 않는다. 다만 var, let, const 키워드를 사용해 변수를 선언할 뿐이다. 자바스크립트의 변수는 정적타입 언어와 같이 미리 선언한 데이터 타입의 값만을 할당할 수 있는 것이 아니다. 어떠한 *데이터 타입의 값이라도 자유롭게 할당할 수 있다.*

*typeof 연산자를 이용하여 확인해보자*

```javascript
var foo;
console.log(typeof foo);  // undefined

foo = 3;
console.log(typeof foo);  // number

foo = 'Hello';
console.log(typeof foo);  // string

foo = true;
console.log(typeof foo);  // boolean

foo = null;
console.log(typeof foo);  // object

foo = Symbol();
console.log(typeof foo);  // symbol

foo = {};
console.log(typeof foo);  // object

foo = [];
console.log(typeof foo);  // object = 배열도 객체이다.

foo = function () {};
console.log(typeof foo);  // function
```
위에서 볼 수 잇듯이 변수의 데이터 타입을 반환하는 것이 아니라 변수에 **할당된 값의 데이터 타입을 반환하는 것이다.**

__*자바스크립트의 변수는 선언이 아닌 할당에 의해 타입이 결정된다. 그리고 재할당에 의해 변수의 타입은 언제든지 동적으로 변할 수 있다.*__<br>

이러한 특징을 **동적 타이핑(Dynamic typing)**이라 하며 자바스크립트를 정적 타입 언어와 구별하기 위해 동적타입 언어(Dynamic/Weak type)언어라 부른다.

> 대표적인 동적타입 언어는<br>
Javascript, Python, PHP, Ruby, Lisp, Perl 등이 있다.

<br>
<br>
<br>
<br>
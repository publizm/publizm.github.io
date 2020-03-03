---
title: 원시 값과 객체의 비교
date: "2019-10-12"
template: "post"
draft: false
slug: "/posts/javascript/Primitive_Reference"
category: "Javascript"
tags:
  - "Primitive"
  - "Reference"
description: "원시 값과 객체에 대해서 알아보자"
---
<span class="notice">
  <em>TIL 이므로 잘못된 내용은 댓글 부탁드립니다</em>
</span>

<div id="toc">

**:link:  Table Of Contents**

- [데이터 타입이란?](#데이터-타입이란)
  - [데이터 타입의 분류(ES6 기준)](#데이터-타입의-분류es6-기준)
  - [데이터 타입이 필요한 이유](#데이터-타입이-필요한-이유)
- [원시 타입의 값과 객체 타입의 값의 비교](#원시-타입의-값과-객체-타입의-값의-비교)
- [원시 타입의 값(Immutable value)](#원시-타입의-값immutable-value--원시-값)
  - [변경 불가능한 값](#변경-불가능한-값)
  - [값에 의한 전달(Pass by value)](#값에-의한-전달pass-by-value)
- [객체(참조) 타입의 값(mutable value)](#객체참조-타입의-값mutable-value--객체)
  - [변경 가능한 값](#변경-가능한-값)
  - [참조에 의한 전달](#참조에-의한-전달)

</div>

## 데이터 타입이란?
데이터 타입이란 값의 종류를 말한다.<br>
자바스크립트의 **모든 값**은 데이터 타입을 갖는다.<br>
자바스크립트는 7가지의 데이터 타입이 존재한다.

<br>

### 데이터 타입의 분류(ES6 기준)
- 원시 타입(Primitive type)
  - 숫자(number)타입: 숫자(정수, 실수)
  - 문자열(string)타입: 문자열
  - 불리언(boolean)타입: 논리적 참(true)과 거짓(false)
  - undefined타입: 선언은 되었지만 값을 할당하지 않은 변수에 암묵적으로 할당되는 값
  - null타입: 값이 없다는 것을 의도적으로 명시할 때 사용하는 값
  - Symbol타입: ES6에서 새롭게 추가된 타입
- 객체 타입(object/Reference type)
  - 객체
  - 함수(Function)
  - 배열(Array)

<hr class="sub" />

### 데이터 타입이 필요한 이유
- 값을 **저장**할 때 확보해야 하는 **메모리 공간의 크기**를 결정하기 위해
- 값을 **참조**할 때 한번에 읽어 들여야 할 **메모리 공간의 크기**를 결정하기 위해
- 메모리에서 읽어 들인 **2진수**를 어떻게 **해석**해야할지를 결정하기 위해

> **값이란?**<br>
더 이상 평가할 수 없는 하나의 표현식이다.<br>
값은 프로그래밍 언어에 따라 유효한 값이 정해져 있다.<br>
자바스크립트는 7가지 종류의 값, 다시 말해 7가지의 데이터 타입의 값이 있다.

<br>
<br>

## 원시 타입의 값과 객체 타입의 값의 비교

**원시 타입의 값(Immutable value), (= 원시 값)**
- 원시 타입의 값, 즉 원시 값은 **변경 불가능한 값**(Immutable value)이다.
- 원시 값을 변수에 할당하면 변수(식별자)에는 **실제 값**이 저장된다.
- 원시 값을 갖는 변수(식별자)를 다른 변수(식별자)에 할당하면 원본의 **원시 값**이 복사되어 전달된다.(**값에 의한 전달(Pass by value)**)

**객체(참조) 타입의 값(mutable value), (= 객체)**
- 객체(참조) 타입의 값, 즉 객체는 **변경 가능한 값**(mutable value)이다.
- 객체를 변수에 할당하면 변수(식별자)에는 **참조 값**이 저장된다.
- 객체를 가리키는 변수(식별자)를 다른 변수(식별자)에 할당하면 원본 의 **참조 값**이 복사되어 전달된다.(**참조에 의한 전달(Pass by reperence)**)

<br>
<br>

## 원시 타입의 값(Immutable value), (= 원시 값)

### 변경 불가능한 값
값을 변경할 수 없다는 것은 재할당을 할 수 없다는 의미와는 다르다.<br>
변수는 새로운 값을 재할당하는 것으로 변수의 값을 변경할 수 있다. 변수의 상대 개념인 상수는 재할당이 금지된 변수를 말한다.

원시 값을 할당한 변수에 새로운 원시 값을 재할당하면 변수를 재할당되기 전의 값이 저장된 메모리 안의 원시 값을 자체 수정하는 것이 아니라 새로운 메모리 공간을 확보하고 재할당한 원시 값을 저장한 후, 변수는 새롭게 재할당한 원시 값을 가리킨다. 이렇게되면 변수가 참조하던 메모리공간의 주소가 바뀐다.

__*그림으로 알아보자*__
![Primitive value](/images/til/memory.jpg "Primitive value")

변수가 참조한 메모리 공간의 주소를 변경한 이유는 변수에 할당된 원시 값이 변경 불가능한 값이기 때문이다.  따라서 변수의 값을 변경하기 위해 원시 값을 재할당하면 새로운 메모리 공간을 확보하고 재할당한 값을 저장한 후, 변수가 참조하던 메모리 공간의 주소를 변경한다. 원시 값의 이러한 특성을 불변성(immutability)이라 한다.

<br>
<br>

### 값에 의한 전달(Pass by value)

``` javascript
var score = 80;
var copy = score;

copy = 100;

console.log(score); // 80
```

변수에 변수를 할당하는 경우, 할당되는 변수(score)가 원시 값을 갖는 변수라면 할당 받는 변수(copy)에게는 할당되는 변수(score)의 원시 값이 복사되어 전달된다.
이를 **값에 의한 전달(Pass by value)**라고 한다.

__*그림으로 알아보자*__
![Primitive value](/images/til/memory_copy.jpg "Primitive value")

복사되어 전달되기 때문에 할당 받는 변수(copy)가 갖는 메모리 공간은 할당되는 변수(score)와 다른 메모리 공간을 사용하기 때문에 할당 받은 값을 변경해도 할당되는 변수(score)는 아무런 영향을 받지 않는다.

__*그림으로 알아보자*__
![Primitive value](/images/til/memory_change.jpg "Primitive value")

<br>

## 객체(참조) 타입의 값(mutable value), (= 객체)
객체는 프로퍼티의 개수가 정해져 있지 않고 동적으로 추가되고 삭제할 수 있다. 또한 프로퍼티의 값에도 제약이 없다. 따라서 객체는 원시 값과 같이 확보해야 할 메모리 공간의 크기를 사전에 정해 둘 수 없다.

> 객체는 *할당* 이 이루어지는 시점에 객체 리터럴이 해석되고 그 결과 객체가 생성된다.

### 변경 가능한 값
객체(참조) 타입의 값, 즉 객체는 변경 가능한 값(mutable value)이다.

``` javascript
var person = {
  name: 'Lee'
};
```
원시 값을 할당한 변수는 원시 값 자체를 값으로 갖는다고 했다.<br>
반면에 객체를 할당한 변수는 **참조 값(Reference value)**을 값으로 갖는다. 여기서 말하는 참조 값이란 생성된 **객체가 저장된 메모리 공간의 주소, 그 자체**이다.

> 객체리터럴 생김새가 블록문(코드 블록) 같지만 엄연한 표현식이다.<br> 따라서 객체 리터럴의 닫는 중괄호({...})뒤에는 항상 세미콜론(;)이 붙여야한다.

__*그림으로 알아보자*__
![reference value](/images/til/memory_object.jpg "reference value")

위 그림을 보면 객체를 할당한 변수가 확보한 메모리 공간에는 생성된 객체가 실제로 저장된 메모리 공간의 주소가 저장되어 있다. 이 값을 참조 값이라 한다. 변수는 이 참조 값을 통해 객체에 접근할 수 있다.

``` javascript
// 할당이 이루어지는 시점에 객체 리터럴이 해석되고 그 결과 객체가 생성된다.
var person = {
  name: 'Lee'
};

// person 변수에 저장되어 있는 참조값으로 실제 객체에 접근하여 그 객체를 반환한다.
console.log(person.name); // {name: "Lee"}
```

원시 값을 갖는 변수의 값을 변경하려면 재할당 외에는 다른 방법이 없다고 했다. 하지만 객체는 생성된 이후에도 프로퍼티를 동적으로 추가할 수 있고 프로퍼티 값을 갱신할 수 도 있으며, 프로퍼티 자체를 삭제할 수 있다. 한마디로 **객체는 변경할 수 있는 값이다.**

``` javascript
var person = {
  name: 'Lee'
};

// 프로퍼티 값 갱신
person.name = 'Kim';

// 프로퍼티 동적 추가
person.address = 'Seoul';

console.log(person); // {name: "Kim", address: "Seoul"}
```

__*그림으로 알아보자*__
![reference value](/images/til/memory_add.jpg "reference value")

이렇듯 객체는 크기가 매우 클수도 있고 프로퍼티 값이 객체일 수도 있어서 원시 값처럼 복사(Deep copy)하는 것에 생성하는 비용이 많이 든다. 따라서 메모리를 효율적으로 사용하기 위해 객채는 변경 가능한 값으로 디자인되어 있다.

하지만 객체는 이러한 구조적 단점에 따른 부작용이 있다.<br>
그것은 원시 값과는 다르게 **여러 개의 식별자가 하나의 객체를 공유할 수 있다**는 것이다.

### 참조에 의한 전달

``` javascript
var person = {
  name: 'Lee'
};

// 참조 값을 복사
var copy = person;
```

객체를 가리키는 변수(원본, person)를 다른 변수(사본, copy)에 할당하면 **원본의 참조 값**이 복사되어 전달된다. 이를 **참조에 의한 전달(Pass by reference)**라 한다.

__*그림으로 알아보자*__
![reference value](/images/til/memory_reference.jpg "reference value")

위 그림처럼 원본 person을 사본 copy에 할당하면 원본 person의 참조 값을 복사하여 copy에 저장한다. 다시말해 원본 person과 사본 copy는 모두 동일한 객체를 가리키고 있다.<br>
이것은 두개의 식별자가 하나의 객체를 공유한다는 것을 의미한다. 따라서 원본 또는 사본 어느 한쪽이 객체를 변경하거나 추가 또는 삭제하게되면 **서로 영향을 주고 받는다.**

``` javascript
var person = {
  name: 'Lee'
};

// 참조 값을 복사. copy와 person은 동일한 객체를 참조한다.
var copy = person;

// copy와 person은 같은 참조 값을 갖는다.
console.log(copy === person); // true

// copy를 통해 객체를 변경한다.
copy.name = 'Kim';

// person을 통해 객체를 변경한다.
person.address = 'Seoul';

// copy와 person은 같은 동일한 가리키고 있다.
// 따라서 어느 한쪽에서 객체를 변경하면 서로 영향을 주고 받는다.
console.log(person); // {name: "Kim", address: "Seoul"}
console.log(copy);   // {name: "Kim", address: "Seoul"}
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
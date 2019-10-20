---
title: this
date: "2019-10-20"
template: "post"
draft: false
slug: "/posts/javascript/this"
category: "Javascript"
tags:
  - "this"
description: "this에 대해서 알아보자"
---
<span class="notice">
  <em>TIL 이므로 잘못된 내용은 댓글 부탁드립니다</em>
</span>

동작(Behavior)인 메소드는 자신이 속한 객체의 상태를 나타내는 데이터인 상태 데이터, 즉 프로퍼티를 참고하고 상태를 변경할 수 있어야 한다. 이때 메소드가 자신이 속한 객체의 프로퍼티를 참조하려면 먼저 자신이 속한 객체를 가리키는 식별자를 참조할 수 있어야한다.

객체 리터럴 방식으로 생성한 객체의 경우, 메소드 내부에서 메소드 자신이 속한 객체를 가리키는 식별자를 재귀적으로 참조 할 수 있다.

예를들어
``` javascript
const circle = {
  radius: 5,
  getDiameter() {
    // 이 메소드가 자신이 속한 객체의 프로퍼티나 다른 메소드를 참조하려면
    // 자신이 속한 객체 circle을 참조 할 수 있어야 한다.
    return 2 * circle.radius;
  }
};

console.log(circle.getDiameter()); // 10
```
getDiameter 메소드 내에서 메소드 자신이 속한 객체를 가리키는 식별자 circle을 참조하고 있다. 이 참조 표현식이 평가되는 시점은 getDiameter 메소드가 호출되어 함수 몸체가 실행되는 시점이다.

객체 리터럴의 경우 할당 단계에서 평가된다. 따라서 getDiameter 메소드가 호출되는 시점에는 이미 객체 리터럴이 이미 평가가 완료되어 객체가 생성되었고 식별자 circle에 객체에 할당된 이후이다. 따라서 메소드 내부의 식별자 circle을 참조 할 수 있다.

*하지만 자기 자신이 속한 객체를 재귀적으로 참조하는 방식은 바람직하지 않다.*<br>
예를 들어 생성자 함수 방식으로 인스턴스를 생성하는 경우에는

``` javascript
function Circle(radius) {
  this.radius = radius;
}

Circle.prototype.getDiameter = function() {
  return 2 * ???.radius;
};

const circle = new Circle(2);
```

생성자 함수 내부에서는 프로퍼티 또는 메소드를 추가하기 위해 자신이 생성할 인스턴스를 참조할 수 있어야 한다. 하지만 생성자 함수에 의한 객체 생성 방식은 먼저 생성자 함수를 정의하고, new 연산자와 함께 생성자 함수를 호출하는 단계가 추가로 필요하다. 한마디로 생성자 함수로 인스턴스를 생성하려면 먼저 생성자 함수가 존재해야한다.

생성자 함수를 정의하는 시점에는 아직 인스턴스를 생성하기 이전이므로 생성자 함수가 생성할 인스턴스를 가리키는 식별자를 알 수 없다.

이러한 이유들 때문에 this(자기 참조 변수) 키워드가 필요한 것이다.

## this★★
- **객체 자신의 프로퍼티나 메소드를 참조하기 위한 자기 참조 변수이다.**
- this는 어떤 값을 가지고 있기 때문에 식별자인 키워드이다.
- this가 가리키는 값은 **함수 호출 방식에 의해 동적으로 결정되기 때문에 함수가 호출될때 결정된다.**
- this는 어디서든지 참조가 가능하다.

> *바인딩(binding)*<br>
바인딩이란 식별자와 값을 연결하는 과정을 의미한다. 예를들어 변수는 할당에 의해 값이 바인딩 된다.

this를 사용하여 위의 객체 리터럴 방식의 예제와 생성자 함수 방식의 예제를 수정해보면

``` javascript
// 객체 리터럴
const circle = {
  radius: 5,
  getDiameter() {
    // this는 메소드를 호출한 객체를 가리킨다.
    return 2 * this.radius;
  }
};

console.log(circle.getDiameter()); // 10

// 생성자 함수
function Circle(radius) {
  // this는 생성자 함수가 생성할 인스턴스를 가리킨다.
  this.radius = radius;
}

Circle.prototype.getDiameter = function () {
  // this는 생성자 함수가 생성할 인스턴스를 가리킨다.
  return 2 * this.radius;
};

// 인스턴스 생성
const circle = new Circle(5);
console.log(circle.getDiameter()); // 10
```
이와 같이 미리 선언 및 할당 되있더라도 this에 바인딩될 객체는 함수 호출 시점에 결정되므로 동적으로  사용할 수 있게 된다.

<br>

## 함수 호출 방식과 this 바인딩
this가 가리키는 값, 즉 this 바인딩은 함수의 호출 방식, 즉 함수가 어떻게 호출되었는지에 따라 동적으로 결정된다.

> 렉시컬 스코프와 this 바인딩은 결정 시기가 다르다.<br>
함수의 상위 스코프를 결정하는 방식인 <b>렉시컬 스코프는 함수 정의가 평가되어 함수 객체가 생성되는 시점</b>에 상위 스코프를 결정한다.<br>
<b>this에 바인딩될 객체는 함수 호출 시점</b>에 결정된다.

*결론부터 말하면*
<article class="board-tbl">

| 함수 호출 방식 | this 바인딩 |
| :--- | :--- |
| 일반 함수 호출 | 전역 객체(window 또는 global) |
| 메소드 호출 | 메소드 호출한 객체(=== .앞에 있는 객체) |
| 생성자 함수 호출 | 생성자함수가 (미래에) 생성할 인스턴스 |
| Function.prototype.apply/call/bind 메소드에 의한 간접 호출 | Function.prototype.apply/call/bind 메소드에 인자로 전달한 객체 |

</article>

<br>

``` javascript
// 일반함수로 호출
foo();
// this === 전역객체 window
// 콜백함수는 보통 일반함수로 호출되지만 고차함수 마음이다.
// 중첩함수도 보통 일반함수로 호출하지만 다른식으로 호출되기도 한다.

// 생성자함수로 호출
new foo();
// this === 생성자 함수가 생성할 인스턴스

// 메소드로 호출
o.foo();
// this === 메소드를 호출한 객체(= .앞에 있는 객체)
// foo라는 메소드가 어디에 소속되있는지는 관심없다.
// 메소드 내부에서 this를 쓸 일이 있을 수 있다(property를 참조하게된다면)
// ESLint는 this를 안 쓰게 되면 에러가 난다.
// ESLint는 this를 안쓸거면 정적 메소드를 하라고 경고를 준다.

// 간접함수로 호출
foo.call(x);
// 인수로 전달한 것이 this가 된다.
```
함수를 정의하는 방식과 호출하는 방식은 일치하지 않는다. 자바스크립트엔진은 함수를 어떻게 호출하는지 방식에 따라 this가 달라진다.

<br>

### 일반함수 호출
기본적으로 this에는 <b>전역 객체(Global object)</b>가 바인딩된다.

``` javascript
function foo() {
  console.log("foo's this: ", this);  // window
  function bar() {
    console.log("bar's this: ", this); // window
  }
  bar(); // 어디서 호출되는 것은 상관 없다. 어떤식으로 호출되는지가 다르다. 중첩 함수를 일반 함수로 호출하면 함수 내부의 this에는 전역 객체가 바인딩된다.
}
foo();
```
this는 객체의 프로퍼티나 메소드를 참조하기 위한 자기 참조 변수이므로 객체를 생성하지 않는 일반 함수에서 this는 의미가 없다.

중첩함수를 일반 함수 호출로 하였을 경우
``` javascript
const obj = {
  value: 100,
  foo() {
    // obj.foo()로 호출하면 this는 obj이다.
    console.log("foo's this: ", this);  // {value: 100, foo: ƒ}
    console.log("foo's this.value: ", this.value); // 100

    // 메소드 내에서 정의한 중첩 함수
    // obj.foo()로 호출해서 bar()로 중첩으로 호출하면 this는 window로 잡는다 이건 javascript의 명백한 설계오류다.
    function bar() {
      console.log("bar's this: ", this); // window
      console.log("bar's this.value: ", this.value); // 1
    }

    bar(); // 일반호출
    // 메소드 내에서 정의한 중첩 함수도 일반 함수로 호출되면
    // 중첩 함수 내부의 this에는 전역 객체가 바인딩된다.
  }
};

const f = obj.foo; // 함수 객체를 f에 할당했다.

f(); // 메소드로 선언해도 호출을 일반 호출로 하면 this는 window
```
메소드 내에서 정의한 중첩 함수도 일반 함수로 호출되면 중첩 함수 내부의 this에는 전역 객체가 바인딩된다.

콜백함수를 예를들면
``` javascript
var value = 1;

const obj = {
  value: 100,
  foo() {
    console.log("foo's this: ", this); // {value: 100, foo: ƒ}
    // 콜백 함수 내부의 this에는 전역 객체가 바인딩된다.
    setTimeout(function () {
      console.log("callback's this: ", this); // window
      console.log("callback's this.value: ", this.value); // 1
    }, 100); // 일반함수로 호출되어 this는 window
  }
};

obj.foo();
```
콜백함수는 일반 함수로 호출되어서 콜백함수안의 this는 전역객체, 즉 window를 가리키고 있다.

위와 같은 문제의 해결 방법은 2가지가 있다.
``` javascript
var value = 1;

const obj = {
  value: 100,
  foo() {
    // this 바인딩(obj)를 변수 that에 할당한다.
    const that = this;

    // 콜백 함수 내부에서 this 대신 that을 참조한다.
    setTimeout(function () {
      console.log(that.value); // 100
    }, 100);
  }
};

obj.foo();

// 다른 방식(선호)
// bind는 function.prototype에 있는 메소드 한마디로 .bind앞에는 함수가 와야된다.
var value = 1;

const obj = {
  value: 100,
  foo() {
    // 콜백 함수에 명시적으로 this를 바인딩한다.
    setTimeout(function () {
      console.log(this.value); // 100
    }.bind(this), 100); // setTimeout함수의 this에 bind(인수) 즉 외부에 있는 this(obj)를 this를 바인딩한다.
    //
  }
};

obj.foo();
```

<hr class="sub" />

### 메소드 호출
<b>메소드 내부의 this는 메소드를 호출한 객체</b>, 즉 메소드 이름 앞의 마침표(.) 연산자 앞에 기술한 객체에 바인딩된다.

``` javascript
const person = {
  name: 'Lee',
  getName() {
    // 메소드의 this는 메소드를 호출한 객체에 바인딩된다.
    return this.name;
  }
};

// 메소드 getName을 호출한 객체는 person이다.
console.log(person.getName());
```
주의할 것은 **메소드 내부의 this는 메소드를 소유한 객체가 아닌 메소드를 호출한 객체에 바인딩되는 것이다.**

``` javascript
const person = {
  name: 'Lee',
  getName() {
    // 메소드의 this는 메소드를 호출한 객체에 바인딩된다.
    return this.name;
  }
};

const anotherPerson = {
  name: 'Kim'
};
// 메소드 getName을 anotherPerson 객체의 메소드로 할당
anotherPerson.getName = person.getName;

// 메소드 getName을 호출한 객체는 anotherPerson이다.
console.log(anotherPerson.getName()); // kim

// 메소드 getName을 변수에 할당
const getName = person.getName;

// 메소드 getName을 일반 함수로 호출
console.log(getName()); // ''
// => getName 함수 내부에서 참조한 this.name은 window.name과 같다
// window.name은 브라우저 창의 이름을 나타내는 빌트인 프로퍼티이다. window.name의 값은 ‘’이다.
// 만약 Node.js 환경에서 실행하면 undefined가 출력된다.
```
이처럼 메소드 내부의 this는 메소드를 호출한 객체에 바인딩된다.

<hr class="sub" />

### 생성자함수의 this
생성자함수가 생성할 인스턴스가 this인 이유는
new랑 함수를 함께 생성하면
함수내에서 new가 this로 바인딩 되기때문이다.
결과적으로 생성자 함수 내부의 this에는 생성자 함수가 (미래에) 생성할 인스턴스가 바인딩된다라고 해석할 수 있다.

``` javascript
// 생성자 함수
function Circle(radius) {
  // 생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

// 인스턴스의 생성
// 반지름이 5인 Circle 객체를 생성
const circle1 = new Circle(5);
// 반지름이 10인 Circle 객체를 생성
const circle2 = new Circle(10);

console.log(circle1.getDiameter()); // 10
console.log(circle2.getDiameter()); // 20
```

<hr class="sub" />

### Function.prototype.apply/call/bind 메소드에 의한 간접 호출★

#### Function.prototype.apply/call
apply, call 메소드는 인수로 this와 인수 리스트를 전달받아 함수를 호출한다. apply와 call 메소드는 Function.prototype의 메소드이다. 즉, apply와 call 메소드는 Function 생성자 함수를 constructor 프로퍼티로 가리키는 모든 함수가 상속받아 사용할 수 있다.

apply와 call 메소드의 사용방법은 다음과 같다.

**Function.prototype.apply**
``` javascript
// 주어진 this 바인딩과 인수 리스트 배열을 사용하여 함수를 호출한다.
// thisArg - this로 사용될 객체
// argsArray - 함수에게 전달할 인수 리스트의 배열 또는 유사 배열 객체
// returns 호출된 함수의 반환값
Function.prototype.apply(thisArg[, argsArray])
```

**Function.prototype.call**
``` javascript
// 주어진 this 바인딩과 인수 리스트를 사용하여 함수를 호출한다.
// thisArg - this로 사용될 객체
// arg1, arg2, ... - 함수에게 전달할 인수 리스트
// returns 호출된 함수의 반환값
Function.prototype.call (thisArg[, arg1[, arg2[, ...]]])
```

apply와 call을 사용해보자
``` javascript
function getThisBinding() {
  return this;
}

// this로 사용할 객체
const thisArg = { a: 1 };

console.log(getThisBinding()); // window

console.log(getThisBinding.apply(thisArg, [1, 2, 3]));
// apply는 내부에서 getThisBinding를 호출한다. 함수를 호출하면서 인수값을 this로 바꾼다.
// 만약 호출하는 함수가 파라미터가 있다면 2번째 인수에 배열로 전달한다.
// Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
// { a: 1 }

console.log(getThisBinding.call(thisArg, 1, 2, 3));
// call는 내부에서 getThisBinding를 호출한다. 함수를 호출하면서 인수값을 this로 바꾼다.
// 만약 호출하는 함수가 파라미터가 있다면 2번째 인수부터 ,로 구분하여 전달한다(가변 인자 함수).
// Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
// { a: 1 }
```
pply와 call 메소드는 호출할 함수에 인수를 전달하는 방식만 다를 뿐 this로 사용할 객체를 전달하면서 함수를 호출하는 것은 동일하다.

데이터를 어떻게 가지고 있는지 달라진다.<br>
apply - 배열일 경우<br>
call - 동적생성일 경우

``` javascript
function convertArgsToArray() {
  console.log(arguments);

  // arguments 객체를 배열로 변환
  // slice: 배열의 특정 부분에 대한 복사본을 생성한다.
  // 두번째 인수가 없기 때문에 둘다 사용가능하다.
  const arr = Array.prototype.slice.apply(arguments);
  // const arr = Array.prototype.slice.call(arguments);
  // argument가 배열은 아니지만 this에 argument를 할당한다.
  // 객체가 배열로 바뀌어 나온다.
  console.log(arr);

  return arr;
}

// 알아둘 것
// 함수가 Array.prototype을 못쓰는 이유는 프토로타입 체인이 다르기 떄문이다.
convertArgsToArray(1, 2, 3); // [ 1, 2, 3 ] 인수는 자료구조가 아니고, 콤마로 구분되어진 값일 뿐이다.
```

<hr />

#### Function.prototype.bind
Function.prototype.bind 메소드는 apply와 call 메소드와는 달리 함수를 호출하지 않고 this로 사용할 객체만을 전달한다.

``` javascript
function getThisBinding() {
  return this;
}

// this로 사용할 객체
const thisArg = { a: 1 };

// bind 메소드는 함수에 this로 사용할 객체를 전달한다.
// bind 메소드는 함수를 호출하지는 않는다.
console.log(getThisBinding.bind(thisArg)); // getThisBinding
// bind 메소드는 함수를 호출하지는 않으므로 명시적으로 호출해야 한다.
console.log(getThisBinding.bind(thisArg)()); // {a: 1}
```
bind 메소드는 메소드의 this와 메소드 내부의 중첩 함수 또는 콜백 함수의 this가 불일치하는 문제를 해결하기 위해 유용하게 사용된다. 아래 예제를 살펴보자.

``` javascript
function Person(name) {
  this.name = name;
}

Person.prototype.doSomething = function (callback) {
  // ①
  callback();
};

function foo() {
  console.log(this.name); // ②
}

const person = new Person('Lee');

person.doSomething(foo); // ''
// =>  window.name은 브라우저 창의 이름을 나타내는 빌트인 프로퍼티이다. window.name의 기본값은 ''이다.
// 만약 Node.js 환경에서 실행하면 undefined가 출력된다.
```
콜백 함수 foo가 호출되기 이전인 ①의 시점에서 this는 doSomething 메소드를 호출한 객체, 즉 person 객체를 가리킨다. 그러나 콜백 함수 foo가 일반 함수로서 호출된 ②의 시점에서 this는 전역 객체 window를 가리킨다. 따라서 foo 함수 내부에서 참조한 this.name은 window.name과 같다.

따라서 콜백 함수 내부의 this를 콜백 함수를 호출하는 외부 함수 내부의 this와 일치시켜 주어야 한다.

``` javascript
function Person(name) {
  this.name = name;
}

Person.prototype.doSomething = function (callback) {
  // ①
  callback.bind(this)(); // this는 생성자 함수 Person을 가리킨다. 생성자 함수는 생성자함수가 생성할 인스턴스를 this로 보기 때문이다.
  // callback.apply(this);
  // callback.call(this);
};

function foo() {
  console.log(this.name); // ②
}

const person = new Person('Lee');

person.doSomething(foo); // Lee
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

  **참고한 사이트**<br>

  [https://poiemaweb.com](https://poiemaweb.com)

</div>

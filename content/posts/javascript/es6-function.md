---
title: ES6 함수의 추가기능
date: "2019-11-01"
template: "post"
draft: false
slug: "/posts/javascript/ES6-Function"
category: "Javascript"
tags:
  - "ES6"
  - "Arrow Function"
  - "Method"
  - "Rest Paremeter"
description: "ES6 함수(화살표 함수)의 추가기능(rest 등)을 알아보자"
---
<span class="notice">
  <em>TIL 내용이므로 잘못된 내용은 댓글 부탁드립니다</em>
</span>

<div id="toc">

**:link:  Table Of Contents**

- [ES6 이전의 함수](#es6-이전의-함수)
- [ES6에서의 함수](#es6에서의-함수)
  - [메소드](#메소드)
  - [화살표 함수(Arrow Function)](#화살표-함수arrow-function)
      - [화살표 함수 정의](#화살표-함수-정의)
          - [매개변수 선언](#1-매개변수-선언)
          - [함수 몸체 정의](#2-함수-몸체-정의)
      - [화살표 함수와 일반 함수의 차이](#화살표-함수와-일반-함수의-차이)
          - [this](#this)
          - [super](#super)
          - [arguments](#arguments)
      - [Rest 파라미터](#rest-파라미터)
          - [기본 문법](#기본-문법)
          - [Rest 파라미터와 arguments 객체](#rest-파라미터와-arguments-객체)
  - [매개변수의 기본값](#매개변수의-기본값)

</div>

## ES6 이전의 함수
ES6 이전까지 자바스크립트의 함수는 다른 프로그래밍 언어와는 다르게 사용목적에 따라 명확한 구분없이 다양한 목적으로 사용되었다.

1. 함수는 일반적인 함수로서 호출할 수 있다.
2. new 연산자와 함께 호출하여 인스턴스를 생성할 수 있는 생성자 함수로서 호출할 수 있다.
3. 객체에 바인딩되어 메소드로서 호출할 수 있다.

``` javascript
var foo = function () {
  return 1;
};

// 일반적인 함수로서 호출
foo(); // -> 1

// 생성자 함수로서 호출
new foo(); // -> foo {}

// 메소드로서 호출
var obj = { a: foo };
obj.a(); // -> 1
```

ES6 이전까지의 모든 함수는 callable이며 constructor이다. 따라서 모든 함수가 생성자 함수로서 역할을 할 수 있다.

``` javascript
// 프로퍼티 f에 할당된 것은 일반 함수이다.
var obj = {
  x: 10,
  f: function () { return this.x; }
};

// 프로퍼티 f에 할당된 함수를 메소드로서 호출
console.log(obj.f()); // 10

// 프로퍼티 f에 할당된 함수를 일반 함수로서 호출
var bar = obj.f;
console.log(bar()); // undefined

// 프로퍼티 f에 할당된 함수를 생성자 함수로서 호출
console.log(new obj.f()); // f {}
```

객체에 바인딩된 함수를 생성자 함수로 호출하는 경우가 흔치 않지만 문법상 가능하다는 것은 성능면에서도 문제가 있다. 한마디로 모든 함수가 의도치 않게 prototype 프로퍼티에 바인딩된 프로토타입 객체를 생성한다는 것을 의미한다.

## ES6에서의 함수
위와 같은 문제를 해결하기 위해 ES6에서는 사용 목적에 따라 함수를 3가지 종류로 명확히 구분하였다.

<article class="board-tbl">

| ES6 함수의 구분    | constructor | prototype | super | arguments |
| :----------------- | :---------: | :-------: | :---: | :-------: |
| 일반 함수(Normal)  |      ○      |     ○     |   ✗   |     ○     |
| 메소드(Method)     |      ✗      |     ✗     |   ○   |     ○     |
| 화살표 함수(Arrow) |      ✗      |     ✗     |   ✗   |     ✗     |

</article>

일반 함수는 함수 선언문이 함수 표현식으로 정의한 함수를 말하며 ES6 이전의 함수와 차이가 없다. 하지만 ES6의 메소드와 화살표 함수는 ES6 이전의 함수와 명확한 차이가 있다.

<b>ES6에서 말하는 일반 함수는 constructor이지만 ES6의 메소드와 화살표 함수는 non-constructor이다.</b>

<br>

### 메소드

``` javascript
const obj = {
  x: 1,
  // foo는 메소드이다.
  foo() { return this.x; },
  // bar에 바인딩된 함수는 메소드가 아닌 일반 함수이다.
  bar: function() { return this.x; }
};

console.log(obj.foo()); // 1
console.log(obj.bar()); // 1
```

ES6 사양에서 메소드는 메소드 축약 표현으로 정의된 함수만을 의미한다.

1. 인스턴스를 생성할 수 없는 non-constructor이다.
2. non-constructor이기 때문에 생성자함수로서 호출할 수 없다.
3. prototype 프로퍼티도 없고, 프로토타입 객체도 생성되지 않는다.
4. 내부 슬롯 [[HomeObject]]*를 갖기 때문에 super 키워드를 사용할 수 있다.

<br>

> **[[HomeObject]]**<br>
내부 슬롯 [[HomeObject]]를 사용하여 수퍼 클래스의 메소드를 참조할 수 있다.

<br>

``` javascript
const base = {
  name: 'Lee',
  sayHi() {
    return `Hi! ${this.name}`;
  }
};

const derived = {
  __proto__: base,
  // ES6 메소드이다. [[HomeObject]]를 갖는다.
  sayHi() {
    return `${super.sayHi()}. how are you doing?`;
  }
};

console.log(derived.sayHi()); // Hi! Lee. how are you doing?
```

<hr class="sub" />

### 화살표 함수(Arrow Function)
익명함수 표현식의 단축 표현이다. 기존의 함수와 다르게 동작하여 모든 상황에서 함수를 사용할 수 있는 것은 아니다.

<br>

#### 화살표 함수 정의

##### 1. 매개변수 선언

``` javascript
// 매개 변수가 여러 개인 경우, 소괄호 () 안에 매개 변수를 선언한다.
(x, y) => { ... }

// 매개 변수가 한 개인 경우, 소괄호 ()를 생략할 수 있다.
x => { ... }

// 매개 변수가 없는 경우, 소괄호 ()를 생략할 수 없다.
() => { ... }
```

<br>

##### 2. 함수 몸체 정의


-&nbsp;함수 몸체가 한줄의 문으로 구성된다면 함수 몸체를 감싸는 중괄호 {}를 생략할 수 있다. **이때 문은 암묵적으로 반환된다.**

``` javascript
x => x * x;
// 위 표현과 동일하다.
x => { return x * x; }

// 매개 변수가 없는 화살표 함수
const now = () => Date.now();
now(); // -> 1567061352352

// 함수 표현식
var now = function() {
  return Date.now();
};
now(); // -> 1567061352352

// 매개 변수가 한 개인 화살표 함수
const identity = value => value;

// 함수 표현식
var identity = function(value) {
  return value;
};

// 매개 변수가 여러 개인 화살표 함수
const sum = (a, b) => a + b;

// 함수 표현식
var sum = function(a, b) {
  return a + b;
};
```

<br>

-&nbsp; 여러 줄의 문으로 구성된다면 중괄호 {}를 생략할 수 없다. **이때 반환값이 있다면 명시적으로 해야한다.**

``` javascript
// 화살표 함수
const sum = (a, b) => {
  const result = a + b;
  return result;
};

// 함수 표현식
var sum = function (a, b) {
  const result = a + b;
  return result;
};
```

<br>

-&nbsp; 객체 리터럴을 반환하는 경우, 객체 리터럴을 소괄호 ()로 감싸 주어야 한다.

``` javascript
() => { return { a: 1 }; }
// 위 표현과 동일하다.
() => ({ a: 1 })

// 화살표 함수
const create = (id, content) => ({ id, content });

// 함수 표현식
var create = function (id, content) {
  return { id, content };
};

create(1, 'Javscript'); // -> { id: 1, content: 'Javscript' }
```

<br>

-&nbsp; 즉시실행함수(IIFE)로 사용할 수 있다.

``` javascript
const person = (name => ({
  sayHi() { return `Hi? My name is ${name}`; }
}))('Lee');

console.log(person.sayHi()); // Hi? My name is Lee
```

<br>

-&nbsp; 일급객체이므로 고차함수의 인수로 전달할 수 있다, 함수 표현식 보다 더 간결하여 가독성이 좋은 장점이 있고, this가 바인딩되는 방식도 다르다.

``` javascript
// ES5
[1, 2, 3].map(function (v) {
  return v * 2;
});

// ES6
[1, 2, 3].map(v => v * 2); // -> [ 2, 4, 6 ]
```

<hr />

#### 화살표 함수와 일반 함수의 차이★

1. 인스턴스를 생성할 수 없는 non-constructor이다.
2. 중복된 [매개 변수](/posts/javascript/Function) 이름을 선언할 수 없다.
3. 함수 자체의 this, arguments, super, new.target 바인딩을 갖지 않는다. **상위 컨텍스트의 this, arguments, super, new.target를 참조한다.**

<hr />

#### this★★
화살표 함수는 다른 함수의 인수로 전달되어 중첩 함수(콜백 함수)로 사용되는 경우가 많다.

화살표 함수는 일반함수로 사용했을 경우 중첩 함수 내부의 this가 외부 함수의 this와 다르기 때문에 발생하는 문제를 해결하기 위해 의도적으로 설계된 것이다.

this 바인딩은 함수의 호출 방식, 즉 함수가 어떻게 호출되었는지에 따라 동적으로 결정된다.

``` javascript
class Prefixer {
  constructor(prefix) {
    this.prefix = prefix;
  }

  prefixArray(arr) {
    // ①
    // 인수로 전달된 배열 arr을 순회하며 배열의 모든 요소에 prefix를 추가한다.
    return arr.map(function (item) {
      return this.prefix + ' ' + item; // ②
      // -> TypeError: Cannot read property 'prefix' of undefined
    });
  }
}

const prefixer = new Prefixer('Hi');
console.log(prefixer.prefixArray(['Lee', 'Kim']));
```
위 예제를 실행했을 때 기대하는 결과는 [ 'Hi Lee', 'Hi Kim' ]이다. 하지만 TypeError가 발생한다.

프로토타입 메소드 내부인 ①에서 this는 메소드를 호출한 객체(위 예제의 경우 prefixer 객체)를 가리킨다. 그런데 Array.prototype.map의 인수로 전달한 콜백 함수의 내부인 ②에서 this는 전역 객체를 가리킨다. 이는 콜백 함수가 일반 함수로 호출되기 때문이다. 이러한 문제가 중첩 함수 내부의 this 문제이다.
<br>

<br>

<b>ES5에서의 방어하는 코드</b>

1. 메소드를 호출한 prefixer 객체를 가리키는 this를 일단 회피시킨 다음 콜백 함수 내부에서 사용한다.

``` javascript
prefixArray(arr) {
  const that = this;
  return arr.map(function (item) {
    return that.prefix + ' ' + item;
  });
}
```

2. Array.prototype.map의 2번째 매개변수에 메소드를 호출한 prefixer 객체를 가리키는 this를 전달한다.

``` javascript
prefixArray(arr) {
  return arr.map(function (item) {
    return this.prefix + ' ' + item;
  }, this);
}
```

3. Function.prototype.bind 메소드를 사용하여 메소드를 호출한 prefixer 객체를 가리키는 this를 바인딩한다.

``` javascript
prefixArray(arr) {
  return arr.map(function (item) {
    return this.prefix + ' ' + item;
  }.bind(this));
}
```

<br>

<b>ES6의 화살표 함수</b>

``` javascript
class Prefixer {
  constructor(prefix) {
    this.prefix = prefix;
  }

  prefixArray(arr) {
    return arr.map(item => `${this.prefix} ${item}`);
  }
}
const prefixer = new Prefixer('Hi');
prefixer.prefixArray(['Lee', 'Kim']); // -> ['Hi Lee', 'Hi Kim']
```

**화살표 함수 내부에서 this를 참조하면 상위 컨텍스트의 this를 그대로 참조한다. 이를 Lexical this라 한다.** 이는 마치 렉시컬 스코프와 같이 화살표 함수의 this가 함수가 정의된 위치에 의해 결정된다는 것을 의미한다.


**화살표 함수가 화살표 함수의 중첩 함수인 경우, 부모 화살표 함수가 참조하는 상위 컨텍스트의 this를 참조한다. 즉, 화살표 함수가 중첩 함수인 경우, 상위 스코프에 존재하는 가장 가까운 함수 중에서 화살표 함수가 아닌 부모 함수의 this를 참조한다.** 만약 화살표 함수가 전역 함수라면 화살표 함수의 this는 전역 객체를 가리킨다.

``` javascript
// 화살표 함수는 함수 자체의 this 바인딩이 없다.
// 전역 함수 foo의 상위 컨텍스트는 전역이다.
// 화살표 함수 foo의 this는 전역 객체를 가리킨다.
const foo = () => console.log(this);
foo(); // window

// 중첩 함수 foo의 상위 컨텍스트는 즉시 실행 함수이다.
// 화살표 함수 foo의 this는 즉시 실행 함수의 this를 가리킨다.
(function () {
  const foo = () => console.log(this);
  foo();
}).call({ a: 1 }); // { a: 1 }

// 함수 foo는 화살표 함수를 반환한다.
// 반환된 화살표 함수의 this는 즉시 실행 함수의 this를 가리킨다.
(function () {
  const foo = () => () => console.log(this);
  foo()();
}).call({ a: 1 }); // { a: 1 }

// increase 프로퍼티에 할당한 화살표 함수의 상위 컨텍스트는 전역이다.
// increase 프로퍼티에 할당한 화살표 함수의 this는 전역 객체를 가리킨다.
const counter = {
  num: 1,
  increase: () => ++this.num
};

console.log(counter.increase()); // NaN
```

화살표 함수 내부의 this는 Function.prototype.call, Function.prototype.applay, Function.prototype.bind 메소드를 사용하여 변경할 수 없다.

``` javascript
window.x = 1;

const normal = function () { return this.x; };
const arrow = () => this.x;

console.log(normal.call({ x: 10 })); // 10
console.log(arrow.call({ x: 10 }));  // 1
```

화살표 함수가 Function.prototype.call, Function.prototype.applay, Function.prototype.bind 메소드를 사용할 수 없다는 의미는 아니다. 단지 **화살표 함수의 this는 일단 결정된 이후 변경할 수 없고 언제나 유지된다.**

``` javascript
const add = (a, b) => a + b;

console.log(add.call(null, 1, 2));    // 3
console.log(add.apply(null, [1, 2])); // 3
console.log(add.bind(null, 1, 2)());  // 3
```

**메소드를 화살표 함수로 정의하는 것은 피해야 한다.**

``` javascript
// Bad
const person = {
  name: 'Lee',
  sayHi: () => console.log(`Hi ${this.name}`)
};

// 전역 객체 window에는 빌트인 프로퍼티 name이 존재한다.
// sayHi에 할당된 화살표 함수 내부의 this는 전역 객체를 가리키므로
// 이 예제를 브라우저에서 실행하면 빈문자열을 갖는 window.name이 출력된다.
person.sayHi(); // Hi
```

프로퍼티에 할당한 화살표 함수 내부의 this는 메소드를 호출한 객체를 가리키지 않고 상위 컨텍스트인 전역 객체를 가리킨다. 따라서 화살표 함수로 메소드를 정의하는 것은 바람직하지 않다. 따라서 ES6 메소드 정의를 사용하는 것이 좋다.

``` javascript
// Good
const person = {
  name: 'Lee',
  sayHi() {
    console.log(`Hi ${this.name}`);
  }
};

person.sayHi(); // Hi Lee
```

프로토타입 객체에 화살표 함수를 할당하는 경우도 동일한 문제가 발생한다.

``` javascript
// Bad
function Person(name) {
  this.name = name;
}

Person.prototype.sayHi = () => console.log(`Hi ${this.name}`);

const person = new Person('Lee');
// 이 예제를 브라우저에서 실행하면 빈문자열을 갖는 window.name이 출력된다.
person.sayHi(); // Hi
```

<b>프로토타입 객체에는 ES6 메소드 정의를 사용할 수 없으므로 일반 함수를 할당한다</b>

``` javascript
// Good
function Person(name) {
  this.name = name;
}

Person.prototype.sayHi = function () { console.log(`Hi ${this.name}`); };

const person = new Person('Lee');
person.sayHi(); // Hi Lee
```

<hr />

#### super
화살표 함수는 함수 자체의 super 바인딩이 없다. 따라서 화살표 함수 내부에서 super를 참조하면 상위 컨텍스트의 super를 참조한다.

``` javascript
class Base {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    return `Hi! ${this.name}`;
  }
}

class Derived extends Base {
  // super 키워드는 ES6 메소드 내에서만 사용 가능하다.
  // 화살표 함수는 함수 자체의 super 바인딩이 없다.
  // 화살표 함수 foo의 상위 컨텍스트는 constructor이다.
  // 화살표 함수 foo의 super는 constructor의 super를 가리킨다.
  // 클래스 필드 정의 제안으로 클래스 필드에 화살표 함수를 할당한다.
  sayHi = () => `${super.sayHi()} how are you doing?`;
}

const derived = new Derived('Lee');
console.log(derived.sayHi()); // Hi! Lee how are you doing?
```
super는 내부 슬롯 [[HomeObject]]를 갖는 ES6 메소드만이 사용할 수 있는 키워드이다. 위 예제의 sayHi 클래스 필드에 할당한 화살표 함수는 ES6 메소드가 아니지만 상위 컨텍스트의 super를 그대로 참조하기 때문에 super 참조가 가능하다.

sayHi 클래스 필드에 할당한 화살표 함수의 상위 컨텍스트는 constructor이며 화살표 함수의 super는 constructor의 super와 같다.

<hr />

#### arguments
화살표 함수는 함수 자체의 arguments 바인딩이 없다. 따라서 화살표 함수 내부에서 arguments를 참조하면 상위 컨텍스트의 arguments를 참조한다.

``` javascript
(function () {
  // 화살표 함수는 함수 자체의 arguments 바인딩이 없다.
  // 중첩 함수 foo의 상위 컨텍스트는 즉시 실행 함수이다.
  // 화살표 함수 foo의 arguments는 실행 함수의 arguments를 가리킨다.
  const foo = () => console.log(arguments); // [Arguments] { '0': 1, '1': 2 }
  foo(3, 4);
}(1, 2));

// 전역 함수 foo의 상위 컨텍스트는 전역이다.
// 전역에는 arguments 객체가 없다. arguments 객체는 함수 내부에서만 유효하다.
const foo = () => console.log(arguments);
foo(1, 2); // ReferenceError: arguments is not defined
```

arguments 객체는 매개변수 개수를 확정할 수 없는 가변 인자 함수를 구현할 때 유용하게 사용된다. 하지만 화살표 함수에서는 arguments 객체를 사용할 수 없다. 상위 컨텍스트의 arguments 객체를 참조할 수는 있지만 화살표 함수 자신에게 전달된 인수 목록을 확인할 수 없으므로 화살표 함수로 가변 인자 함수를 구현해야 할 때는 반드시 rest 파라미터를 사용해야 한다.


<hr class="sub" />

### Rest 파라미터
Rest 파라미터(Rest Parameter, 나머지 매개변수)는 매개변수 이름 앞에 세개의 점 …을 붙여서 정의한 매개변수를 의미한다. <b>Rest 파라미터는 함수에 전달된 인수들의 목록을 배열로 전달받는다.</b>

- 함수에 전달된 인수들은 순차적으로 파라미터와 Rest 파라미터에 할당된다.
- 먼저 선언된 파라미터에 할당된 인수를 제외한 나머지 인수들이 모두 배열에 담겨 할당된다. 따라서 **Rest 파라미터는 반드시 마지막 파라미터이어야 한다.**
- Rest 파라미터는 단 하나만 선언할 수 있다.
- Rest 파라미터는 함수 정의 시 선언한 매개변수 개수를 나타내는 함수 객체의 length 프로퍼티에 영향을 주지 않는다.

<br>

#### 기본 문법

``` javascript
function foo(...rest) {
  // 매개변수 rest는 인수들의 목록을 배열로 전달받는 Rest 파라미터이다.
  console.log(rest); // [ 1, 2, 3, 4, 5 ]
  // 매개변수 rest에는 배열이 할당된다.
  console.log(Array.isArray(rest)); // true
}

foo(1, 2, 3, 4, 5);



function foo(param, ...rest) {
  console.log(param); // 1
  console.log(rest);  // [ 2, 3, 4, 5 ]
}

foo(1, 2, 3, 4, 5);

function bar(param1, param2, ...rest) {
  console.log(param1); // 1
  console.log(param2); // 2
  console.log(rest);   // [ 3, 4, 5 ]
}

bar(1, 2, 3, 4, 5);



function foo( ...rest, param1, param2) { }

foo(1, 2, 3, 4, 5);
// SyntaxError: Rest parameter must be last formal parameter



function foo(...rest1, ...rest2) { }

foo(1, 2, 3, 4, 5);
// SyntaxError: Rest parameter must be last formal parameter



function foo(...rest) {}
console.log(foo.length); // 0

function bar(x, ...rest) {}
console.log(bar.length); // 1

function baz(x, y, ...rest) {}
console.log(baz.length); // 2
```

<hr />

#### Rest 파라미터와 arguments 객체
ES5에서는 인자의 개수를 사전에 알 수 없는 가변 인자 함수의 경우, arguments 객체를 통해 인수를 확인한다.

> <b>arguments</b><br>
함수 호출 시 전달된 인수(argument)들의 정보를 담고 있는 순회 가능한(iterable) 유사 배열 객체(array-like object)이며 함수 내부에서 지역 변수처럼 사용할 수 있다.

<br>

``` javascript
// 매개변수의 개수를 사전에 알 수 없는 가변 인자 함수
function sum() {
  // 가변 인자 함수는 arguments 객체를 통해 인수를 전달받는다.
  console.log(arguments);
}

sum(1, 2); // { length: 2, '0': 1, '1': 2 }
```

가변 인자 함수는 파라미터를 통해 인수를 전달받는 것이 불가능하므로 arguments 객체를 활용하여 인수를 전달받는다. 하지만 arguments 객체는 유사 배열 객체이므로 배열 메소드를 사용하려면 Function.prototype.call 메소드를 통해 this를 변경하여 배열 메소드를 호출해야한다.

``` javascript
function sum() {
  // 유사 배열 객체인 arguments 객체를 배열로 변환한다.
  var array = Array.prototype.slice.call(arguments);

  return array.reduce(function (pre, cur) {
    return pre + cur;
  });
}

console.log(sum(1, 2, 3, 4, 5)); // 15
```

*ES6에서는 rest 파라미터를 사용하여 가변 인자의 목록을 배열로 직접 전달받을 수 있다. 이를 통해 유사 배열인 arguments 객체를 배열로 변환하는 번거로움을 피할 수 있다.*

``` javascript
function sum(...args) {
  // Rest 파라미터 args에는 배열 [1, 2, 3, 4, 5]이 할당된다.
  return args.reduce((pre, cur) => pre + cur);
}
console.log(sum(1, 2, 3, 4, 5)); // 15
```

일반 함수와 메소드는 Rest 파라미터와 arguments 객체를 모두 사용할 수 있다. 하지만 화살표 함수는 함수 자체의 arguments 객체를 갖지 않는다. 따라서 화살표 함수로 가변 인자 함수를 구현해야 할 때는 반드시 rest 파라미터를 사용해야 한다.

``` javascript
var normalFunc = function () {};
console.log(normalFunc.hasOwnProperty('arguments')); // true

const arrowFunc = () => {};
console.log(arrowFunc.hasOwnProperty('arguments')); // false
```

<br>

### 매개변수의 기본값
함수를 호출할 때 매개변수의 개수만큼 인수를 전달하는 것이 바람직하지만 그렇지 않은 경우에도 에러가 발생하지는 않는다. 자바스크립트 엔진이 함수의 매개변수의 개수와 인수의 개수를 체크하지 않기 때문이다. 인수가 부족한 경우, 매개변수의 값은 undefined이다.

``` javascript
function sum(x, y) {
  return x + y;
}

console.log(sum(1)); // 1+ undefined = NaN
```

따라서 매개변수에 적절한 인수가 전달되었는지 함수 내부에서 확인할 필요가 있다. 즉, 방어 코드가 필요하다.

``` javascript
function sum(x, y) {
  // 인수가 전달되지 않아 매개변수의 값이 undefined인 경우, 기본값을 할당한다.
  x = x || 0;
  y = y || 0;

  return x + y;
}

console.log(sum(1));    // 1
console.log(sum(1, 2)); // 3
```

ES6에서는 매개변수 기본값을 사용하여 함수 내에서 수행하던 인수 체크 및 초기화를 간소화할 수 있다. 매개변수 기본값은 매개변수에 인수를 전달하지 않았을 경우에만 유효하다.

``` javascript
function sum(x = 0, y = 0) {
  return x + y;
}

console.log(sum(1));    // 1
console.log(sum(1, 2)); // 3
```

매개변수 기본값은 함수 정의 시 선언한 매개변수 개수를 나타내는 함수 객체의 length 프로퍼티와 arguments 객체에 영향을 주지 않는다.

``` javascript
function foo(x, y = 0) {
  console.log(arguments);
}

console.log(foo.length); // 1

sum(1);    // Arguments { '0': 1 }
sum(1, 2); // Arguments { '0': 1, '1': 2 }
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
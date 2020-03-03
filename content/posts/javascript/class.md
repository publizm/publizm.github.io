---
title: Class
date: "2019-10-28"
template: "post"
draft: false
slug: "/posts/javascript/Class"
category: "Javascript"
tags:
  - "Class"
  - "super"
description: "Class에 대해서 알아보자"
---
<span class="notice">
  <em>TIL 내용이므로 잘못된 내용은 댓글 부탁드립니다</em>
</span>

<div id="toc">

**:link:  Table Of Contents**

- [클래스의 구조](#클래스의-구조)
- [클래스 정의](#클래스-정의)
  - [클래스 vs 생성자 함수](#클래스-vs-생성자-함수)
- [클래스 호이스팅](#클래스-호이스팅)
- [인스턴스 생성](#인스턴스-생성)
- [메소드](#메소드)
  - [constructor( )](#constructor-)
      - [constructor와 생성자 함수의 차이](#constructor는-생성자-함수와-유사하지만-몇가지-차이가-있다)
  - [프로토타입 메소드](#프로토타입-메소드)
      - [생성자 함수에서의 프로토타입 메소드 생성](#생성자-함수에서의-프로토타입-메소드-생성)
      - [클래스에서의 프로토타입 메소드 생성](#클래스에서의-프로토타입-메소드-생성)
  - [정적 메소드](#정적-메소드)
      - [생성자함수에서의 정적 메소드](#생성자함수에서의-정적-메소드)
      - [클래스에서의 정적 메소드](#클래스에서의-정적-메소드)
      - [정적 메소드 vs 프로토타입 메소드](#정적-메소드-vs-프로토타입-메소드)
      - [클래스에서 정의한 메소드의 특징](#클래스에서-정의한-메소드의-특징)
- [클래스의 인스턴스 생성 과정](#클래스의-인스턴스-생성-과정)
- [프로퍼티](#클래스의-인스턴스-생성-과정)
  - [인스턴스 프로퍼티](#인스턴스-프로퍼티)
  - [접근자 프로퍼티](#접근자-프로퍼티)
  - [클래스 필드](#클래스-필드)
      - [클래스 필드 정의 제안](#클래스-필드-정의-제안)
      - [private 필드 정의 제안](#private-필드-정의-제안)
      - [static 필드 정의 제안](#static-필드-정의-제안)
- [상속에 의한 클래스 확장](#상속에-의한-클래스-확장)
  - [클래스 상속과 생성자 함수 상속](#클래스-상속과-생성자-함수-상속)
  - [extends 키워드](#extends-키워드)
  - [동적 상속](#동적-상속)
  - [서브 클래스의 constructor](#서브-클래스의-constructor)
  - [super 키워드](#super-키워드)
      - [super 호출](#super-호출)
      - [super 참조](#super-참조)
  - [상속 클래스의 인스턴스 생성 과정](#상속-클래스의-인스턴스-생성-과정)

</div>

> 클래스는 객체를 만드는 용도로 쓰이며 함수이다.<br>
> ES6에서 새롭게 도입된 클래스는 기존 프로토타입 기반 객체지향 프로그래밍보다 Java나 C#과 같은 클래스 기반 객체지향 프로그래밍에 익숙한 프로그래머가 보다 빠르게 학습할 수 있도록 클래스 기반 객체지향 프로그래밍 언어와 매우 흡사한 새로운 객체 생성 매커니즘을 제시하고 있다.

## 클래스의 구조

``` javascript
// 클래스 선언문
class 클래스명 {
  // 생성자
  constructor(name) {

  }

  // 프로토타입 메소드
  함수명() {
  }

  // 정적 메소드
  static 함수명() {
  }
}
```

<br>
<br>

## 클래스 정의
클래스 이름은 파스칼 케이스로 사용하는 것이 일반적이다.

``` javascript
// 클래스 선언문
class Person {}
```

함수와 마찬가지로 표현식으로 클래스를 정의할 수도 있으며, 이름을 가질 수도 안 가질수도 있다.

``` javascript
// 익명 클래스 표현식
const Person = class {};

// 기명 클래스 표현식
const Person = class MyClass {};
```

표현식으로 정의할 수 있다는 것은 클래스가 값으로 사용할 수 있는 일급 객체라는 것을 의미한다.

> **일급객체**<br>
> -무명의 리터럴로 생성할 수 있다. 즉, 런타임에 생성이 가능하다.<br>
> -변수나 자료 구조(객체, 배열 등)에 저장할 수 있다.<br>
> -함수의 매개 변수에게 전달할 수 있다.<br>
> -함수의 반환값으로 사용할 수 있다.

<br>

``` javascript
// 클래스 선언문
class Person {
  // 생성자
  constructor(name) {
    // 인스턴스 생성 및 초기화
    this.name = name; // name 프로퍼티는 public하다.
  }

  // 프로토타입 메소드
  sayHi() {
    console.log(`Hi! My name is ${this.name}`);
  }

  // 정적 메소드
  static sayHello() {
    console.log('Hello!');
  }
}

// 인스턴스 생성
const me = new Person('Lee');

// 인스턴스의 프로퍼티 참조
console.log(me.name); // Lee
// 프로토타입 메소드 호출
me.sayHi(); // Hi! My name is Lee
// 정적 메소드 호출
Person.sayHello(); // Hello!
```

이를 생성자 함수와 비교해보면

![classvsconstructor](/images/javascript/classvsconstructor.jpg "classvsconstructor")

클래스 정의와 생성자 함수에 의한 인스턴스 생성 방식은 형태적인 면에서 매우 비슷하다.

<br>

### 클래스 vs 생성자 함수
클래스는 생성자 함수와 매우 유사하게 동작하지만 차이점이 있다.
1. <b>클래스는 new 연산자를 사용하지 않고 호출하면 에러가 발생한다.</b>하지만 생성자 함수는 new 연산자를 사용하지 않고 호출하면 일반 함수로서 호출된다.
2. 클래스는 상속을 지원하는 <b>extentds와 super 키워드</b>를 제공한다.
3. <b>클래스는 호이스팅이 발생하지 않는 것처럼 동작한다.</b> 하지만 함수 선언문으로 정의된 생성자 함수는 함수 호이스팅이 발생한다.
4. <b>클래스의 모든 코드는 암묵적으로 strict 모드가 지정되어 실행되며 strict 모드를 해지할 수 없다.</b> 하지만 생성자 함수는 암묵적으로 strict 모드가 지정되지 않는다.
5. <b>클래스는 상속을 통해 기존의 클래스를 확장할 수 있는 문법이 기본적으로 제공되지만 생성자 함수는 그렇지 않다.</b>

이처럼 클래스는 생성자 함수보다 좀 더 엄격하다.

<br>
<br>

## 클래스 호이스팅
> 클래스는 클래스 정의 이전에 참조할 수 없다.<br>
> 클래스도 호이스팅이 된다. (단, let , const 처럼 일시적 사각지대에 빠지게 된다.)

``` javascript
const Person = '';

{
  // 호이스팅이 발생하지 않는다면 ''가 출력되어야 한다.
  console.log(Person);
  // ReferenceError: Cannot access 'Person' before initialization

// 클래스 선언문
  class Person {}
}
```
클래스 선언문 이전에 일시적 사각지대(Temporal Dead Zone; TDZ)에 빠지기 때문에 호이스팅이 발생하지 않는 것처럼 동작한다.

즉, let이나 const와 동일하다.

<br>
<br>

## 인스턴스 생성

> 클래스의 정의는 함수다. (typeof시 함수로 찍힌다.)<br>
> 클래스는 인스턴스를 생성하는 생성자 함수이며 new 연산자와 함께 호출되어 인스턴스를 생성한다.

클래스는 인스턴스를 생성하는 것이 존재 이유이므로 반드시 new 연산자와 함께 호출하여야 한다.

``` javascript
class Person {}

// new 연산자 없이 호출하면 타입 에러가 발생한다.
const me = Person();
// TypeError: Class constructor Foo cannot be invoked without 'new'
```

<br>
<br>

## 메소드
클래스 몸체({...}))에는 0개 이상의 메소드만을 선언할 수 있다.
- constructor(생성자)
- 프로토타입 메소드
- 정적 메소드

<br>

### constructor( )
인스턴스를 생성하고 초기화하기 위한 특수한 메소드이다.

``` javascript
class Person {
  // 생성자
  constructor(name) {
    // 인스턴스 생성 및 초기화
    this.name = name;
  }
}

// 클래스는 함수이다.
console.log(typeof Person); // function

// 인스턴스 생성
const me = new Person('Lee');
```

<br>

#### constructor는 생성자 함수와 유사하지만 몇가지 차이가 있다.
1. constructor는 이름을 변경할 수 없다.
2. constructor는 클래스 내에 **한개**만 존재해야한다.
3. constructor를 생략할 수 있다(이 점은 아래의 예제를 통해 살펴보자)
4. constructor는 별도의 반환문을 갖지 않아야 한다. new 연산자와 함께 클래스가 호출되면 생성자 함수와 동일하게 암묵적으로 this, 즉 인스턴스를 반환하기 때문이다.

<br>

``` javascript
class Person {}
```

constructor를 생략하면 클래스에 아래와 같이 디폴트 constructor가 암묵적으로 정의된다.

``` javascript
class Person {
// constructor는 생략하면 암묵적으로 디폴트 constructor가 정의된다.
  constructor() {}
}

// 빈 객체가 생성된다.
const me = new Person();
console.log(me); // Person {}
```
constructor를 생략한 클래스는 빈 객체를 생성한다. 프로퍼티가 추가되어 초기화된 인스턴스를 생성하려면 constructor 내부에서 this에 인스턴스 프로퍼티를 추가한다.

``` javascript
class Person {
  constructor() {
    // 인스턴스 초기화
    this.name = 'Lee';
    this.address = 'Seoul';
  }
}

// 인스턴스 프로퍼티가 추가된다.
const me = new Person();
console.log(me); // Person {name: "Lee", address: "Seoul"}
```

<hr class="sub" />

### 프로토타입 메소드

<br>

#### 생성자 함수에서의 프로토타입 메소드 생성
생성자 함수를 사용하여 인스턴스를 생성하는 경우, 프로토타입 메소드를 생성하기 위해서는 아래와 같이 명시적으로 프로토타입에 메소드를 추가해야 한다.

``` javascript
// 생성자 함수
function Person(name) {
  this.name = name;
}

// 프로토타입 메소드
Person.prototype.sayHi = function () {
  console.log(`Hi! My name is ${this.name}`);
};

const me = new Person('Lee');
me.sayHi(); // Hi! My name is Lee
```

<hr />

#### 클래스에서의 프로토타입 메소드 생성
클래스 몸체에서 정의한 메소드는 클래스의 prototype 프로퍼티에 메소드를 추가하지 않아도 기본적으로 프로토타입 메소드가 된다.

``` javascript
class Person {
  // 생성자
  constructor(name) {
    // 인스턴스 생성 및 초기화
    this.name = name;
  }

  // 프로토타입 메소드
  sayHi() {
    console.log(`Hi! My name is ${this.name}`);
  }
}

const me = new Person('Lee');
me.sayHi(); // Hi! My name is Lee
```

![class_prototypemethod](/images/javascript/class_prototypemethod.jpg "class_prototypemethod")

<hr class="sub" />

### 정적 메소드
정적(static) 메소드는 인스턴스를 생성하지 않아도 호출할 수 있는 메소드를 말한다.

<br>

#### 생성자함수에서의 정적 메소드
생성자 함수의 경우, 정적 메소드를 생성하기 위해서는 명시적으로 생성자 함수에 메소드를 추가해야 한다.

``` javascript
// 생성자 함수
function Person(name) {
  this.name = name;
}

// 정적 메소드
Person.sayHi = function () {
  console.log('Hi!');
};

// 정적 메소드 호출
Person.sayHi(); // Hi!
```

<hr />

#### 클래스에서의 정적 메소드
클래스 몸체에서 정의한 메소드에 static 키워드를 붙이면 정적 메소드(클래스 메소드)가 된다.
``` javascript
class Person {
  // 생성자
  constructor(name) {
    // 인스턴스 생성 및 초기화
    this.name = name;
  }

  // 정적 메소드
  static sayHi() {
    console.log('Hi!');
  }
}
```
위 Person 클래스는 아래와 같이 프로토타입 체인을 생성한다.

![static_method](/images/javascript/static_method.jpg "static_method")

정적 메소드는 클래스 자신의 메소드가 된다.

프로토타입 메소드처럼 인스턴스로 호출하지 않고 <b>클래스로 호출한다.</b>
``` javascript
Person.sayHi() // Hi!
```

<b>정적 메소드는 인스턴스로 호출할 수 없다.</b>

``` javascript
// 인스턴스 생성
const me = new Person('Lee');
me.sayHi(); // TypeError: me.sayHi is not a function
```

<hr />

#### 정적 메소드 vs 프로토타입 메소드
1. 정적 메소드와 프로토타입 메소드가 속해 있는 프로토타입 체인이 다르다.
2. 정적 메소드는 클래스로 호출하고 프로토타입 메소드는 인스턴스로 호출한다.
3. 정적 메소드는 인스턴스 프로퍼티를 참조할 수 없지만 프로토타입 메소드는 인스턴스 프로퍼티를 참조할 수 있다.


##### 정적 메소드
``` javascript
class Square {
  // 정적 메소드
  static area(width, height) {
    return width * height;
  }
}

console.log(Square.area(10, 10)); // 100

const square = new Square();
square.area(); // TypeError: square.area is not a function
```

만약 인스턴스 프로퍼티를 참조해야 한다면 정적 메소드 대신 프로토타입 메소드를 사용해야 한다.

##### 프로토타입 메소드
``` javascript
class Square {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  // 프로토타입 메소드
  area() {
    return this.width * this.height;
  }
}

const square = new Square(10, 10);
console.log(square.area()); // 100
```

> 메소드 내부에서 인스턴스 프로퍼티를 참조해야 할 필요가 있다면 this를 사용해야 하며 이러한 경우, 프로토타입 메소드로 정의해야 한다. 하지만 메소드 내부에서 인스턴스 프로퍼티를 참조해야 할 필요가 없다면 this를 사용하지 않아도 된다.

<hr />

#### 클래스에서 정의한 메소드의 특징
1. function 키워드를 생략한 메소드 축약 표현을 사용한다
2. 객체 리터럴과는 다르게 클래스에 메소드를 정의할 때는 <b>콤마가 필요 없다.</b>
3. 암묵적으로 strict 모드로 실행된다.
4. 열거 가능 여부를 나타내며 불리언 값을 갖는 프로퍼티 어트리뷰트 [[Enumerable]]의 값이 false이다.
5. 내부 메소드 [[Construct]]를 갖지 않는 non-constructor이다. 따라서 new 연산자와 함께 호출할 수 없다.

<br>

## 클래스의 인스턴스 생성 과정

1. **인스턴스 생성과 this 바인딩**<br>
-암묵적으로 빈객체가 생성된다.<br>
-클래스가 생성한 인스턴스의 프로토타입으로 클래스의 prototype 프로퍼티가 가리키는 객체가 설정된다.<br>
-인스턴스는 빈객체(this)에 바인딩 된다.

2. **인스턴스 초기화**<br>
-constructor에 기술되어 있는 코드가 실행되어 this에 바인딩되어 있는 인스턴스를 초기화한다.<br>
-this에 바인딩되어 있는 인스턴스에 프로퍼티를 추가한다.<br>
-constructor가 인수로 전달받은 초기값으로 인스턴스의 프로퍼티를 초기화한다.

3. **프로토타입 / 정적 메소드 추가**<br>
클래스 몸체에 프로토타입 메소드가 존재하면<br>
-클래스의 prototype 프로퍼티가 가리키는 객체에 메소드로 추가된다.<br>
-클래스 몸체에 정적 메소드가 존재하면 클래스에 메소드로 추가된다.

4. **인스턴스 반환**<br>
-클래스의 모든 처리가 끝나면 완성된 인스턴스가 바인딩된 this와 함께 암묵적으로 반환된다.

``` javascript
class Person {
  // 생성자
  constructor(name) {
    // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩된다.
console.log(this); // Person {}
    console.log(Object.getPrototypeOf(this) === Person.prototype); // true

    // 2. this에 바인딩되어 있는 인스턴스를 초기화한다.
    this.name = name;

    // 4. 완성된 인스턴스가 바인딩된 this와 함께 암묵적으로 반환된다.
  }

  // 3. 프로토타입 메소드는 클래스의 prototype에 메소드로 추가된다.
  sayHi() {
    console.log(`Hi! My name is ${this.name}`);
  }

  // 3. 정적 메소드는 클래스에 메소드로 추가된다.
  static sayHello() {
    console.log('Hello!');
  }
}
```

<br>

## 프로퍼티

### 인스턴스 프로퍼티
인스턴스 프로퍼티는 construnctor 내부에서 정의해야 한다.

``` javascript
class Person {
  constructor(name) {
    // 인스턴스 프로퍼티
    this.name = name;
  }
}

const me = new Person('Lee');
console.log(me); // Person {name: "Lee"}
```
constructor 내부 코드가 실행되기 이전에 constructor 내부의 this에는 이미 클래스가 암묵적으로 생성한 인스턴스인 빈 객체가 바인딩되어 있다. 그리고 constructor 내부에서 this에 인스턴스 프로퍼티를 추가한다. 이로써 클래스가 암묵적으로 생성한 빈 객체, 즉 인스턴스에 프로퍼티가 추가되어 인스턴스가 초기화된다.

<hr class="sub" />

### 접근자 프로퍼티
접근자 프로퍼티(Accessor property)는 자체적으로는 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수(Accessor function)로 구성된 프로퍼티다.

``` javascript
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  // fullName은 접근자 함수로 구성된 접근자 프로퍼티이다.
  // getter 함수
  get fullName() {
    return this.firstName + ' ' + this.lastName;
  }

  // setter 함수
  set fullName(name) {
    [this.firstName, this.lastName] = name.split(' ');
  }
}

const me = new Person('CheolHwan', 'Lee');

// 데이터 프로퍼티를 통한 프로퍼티 값의 참조.
console.log(`${me.firstName} ${me.lastName}`); // CheolHwan Lee

// 접근자 프로퍼티를 통한 프로퍼티 값의 저장
// 접근자 프로퍼티 fullName에 값을 저장하면 setter 함수가 호출된다.
me.fullName = 'Heegun Lee';
console.log(me); // {firstName: "Heegun", lastName: "Lee"}

// 접근자 프로퍼티를 통한 프로퍼티 값의 참조
// 접근자 프로퍼티 fullName에 접근하면 getter 함수가 호출된다.
console.log(me.fullName); // Heegun Lee

// fullName는 접근자 프로퍼티이다.
// 접근자 프로퍼티는 get, set, enumerable, configurable 프로퍼티 어트리뷰트를 갖는다.
console.log(Object.getOwnPropertyDescriptor(Person.prototype, 'fullName'));
// {get: ƒ, set: ƒ, enumerable: false, configurable: true}
```
접근자 프로퍼티는 자체적으로는 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수(Accessor function), 즉 getter 함수와 setter 함수로 구성되어 있다.

<hr class="sub" />

### 클래스 필드
> 클래스 필드(필드 또는 멤버)는 클래스 기반 객체지향 언어에서 클래스가 생성할 인스턴스의 프로퍼티를 가리키는 용어

클래스필드는 클래스 내에 필드형태로 문을 넣는 것을 말한다. this에 클래스 필드를 바인딩해서는 안된다. 클래스 필드에서는 this를 사용해선 안된다.

#### 클래스 필드 정의 제안
클래스 몸체에서 클래스 필드를 정의할 수 있는 클래스 필드 정의(Class field definitions) 제안은 아직 ECMAScript의 정식 표준 사양으로 승급 되지 않았다.

하지만 최신 브라우저(Chrome 72 이상)와 최신 Node.js(버전 12 이상)는 표준 사양으로 승급이 확실시되는 이 제안을 미리 구현해 놓았다.

따라서 최신 브라우저와 최신 Node.js에서는 아래 예제와 같이 클래스 필드를 클래스 몸체에 정의할 수 있다.

``` javascript
class Person {
  // 클래스 필드 정의
  name = 'Lee';
}

const me = new Person('Lee');
console.log(me); // Person {name: "Lee"}
```
클래스 몸체에서 클래스 필드를 정의하는 경우, this에 클래스 필드를 바인딩해서는 안된다. this는 클래스의 constructor와 메소드 내에서만 유효하다.

``` javascript
class Person {
  // this에 클래스 필드를 바인딩해서는 안된다.
  this.name = ''; // SyntaxError: Unexpected token .
}
```

클래스 필드에 초기값을 할당하지 않으면 **undefined**를 갖는다.

``` javascript
class Person {
  // 클래스 필드를 초기화하지 않으면 undefined를 갖는다.
  name;
}

const me = new Person();
console.log(me); // Person {name: undefined}
```

인스턴스를 생성할 때, 외부의 초기값으로 클래스 필드를 초기화해야 할 필요가 있다면 constructor에서 클래스 필드를 초기화해야 한다.

``` javascript
class Person {
  name;

  constructor(name) {
    // 클래스 필드 초기화.
    this.name = name;
  }
}

const me = new Person('Lee');
console.log(me); // Person {name: "Lee"}
```
클래스 필드는 고정값을 가지고 있는 경우에 사용하도록 한다. 왜냐하면 값을 넘겨받는 경우라면 클래스 필드로 넘겨 받을 수 없기 때문에 이때는 consrtuctor에 만드는 것이 좋기 때문이다.

<hr />

#### private 필드 정의 제안
constructor 내부에서 this를 통해 정의한 인스턴스 프로퍼티는 인스턴스를 통해 클래스 외부에서 언제나 참조할 수 있다. 즉, 언제나 public이다.

ES6의 클래스는 다른 객체지향 언어처럼 private, public, protected 키워드와 같은 접근 제한자(access modifier)를 지원하지 않는다.

생성자 함수에서는 클로저를 사용하여 private한 프로퍼티를 흉내낼 수 있었다. 단 private한 프로퍼티를 흉내낸 자유 변수에 접근하면 에러가
발생하지 않고 undefined를 반환하므로 아쉬움이 남는다.

``` javascript
// ES5
var Person = (function () {
  // 자유 변수이며 private하다
  var _name = '';

  // 생성자 함수
  function Person(name) { _name = name; }

  // 프로토타입 메소드. 이 메소드는 클로저이다.
  Person.prototype.sayHi = function () {
    console.log('Hi! My name is ' + _name);
  };

  // 생성자 함수를 반환
  return Person;
}());

// 인스턴스 생성
var me = new Person('Lee');

// _name에 접근할 수 없다.
console.log(me); // Person {}
console.log(me._name); // undefined
```

2019년 10월 현재 TC39 프로세스의 stage 3(candidate)에는 private 필드를 정의할 수 있는 새로운 표준 사양이 제안되어 있다. 표준 사양으로 승급이 확실시 되는 이 제안도 최신 브라우저(Chrome 74 이상)과 최신 최신 Node.js(버전 12 이상)에 이미 구현되어 있다.

 private 필드의 선두에는 #을 붙여준다. private 필드를 참조할 때도 #을 붙어주어야 한다.

 ``` javascript
 class Person {
  // private 필드 정의
  #name = '';

  constructor(name) {
// private 필드 참조
    this.#name = name;
  }
}

const me = new Person('Lee');

// private 필드 #name은 클래스 외부에서 참조할 수 없다.
console.log(me.#name);
// SyntaxError: Private field '#name' must be declared in an enclosing class
 ```

<br>

private 필드는 반드시 클래스 몸체에 정의해야 한다. private 필드를 직접 constructor에 정의하면 에러가 발생한다.
``` javascript
class Person {
  constructor(name) {
    // private 필드는 클래스 몸체에서 정의해야 한다.
    this.#name = name;
    // SyntaxError: Private field '#name' must be declared in an enclosing class
  }
}
```


<br>

public 필드는 어디서든지 참조할 수 있지만 private 필드는 클래스 내부에서만 참조할 수 있다.

<article class="board-tbl">

| 접근 가능성                 | public | private |
| :-------------------------- | :----: | :-----: |
| 클래스 내부                 |   ○    |    ◯    |
| 자식 클래스 내부            |   ◯    |    ✗    |
| 클래스 인스턴스를 통한 접근 |   ◯    |    ✗    |

</article>

즉, 부모 클래스를 포함한 클래스 외부에서 private 필드에 직접 접근할 수 있는 방법은 없다. 다만 접근자 프로퍼티를 통해 간접적으로 접근하는 방법은 유효하다.

``` javascript
class Person {
  // private 필드 정의
  #_name = '';

  constructor(name) {
    this.#_name = name;
  }

  // name은 접근자 프로퍼티이다.
  get name() {
    // private 필드를 참조하여 trim한 다음 반환한다.
    return this.#_name.trim();
  }
}

const me = new Person(' Lee ');

console.log(me.name); // "Lee"
```

<br>

private 필드는 반드시 클래스 몸체에 정의해야 한다. private 필드를 직접 constructor에 정의하면 에러가 발생한다.

``` javascript
class Person {
  constructor(name) {
    // private 필드는 클래스 몸체에서 정의해야 한다.
    this.#name = name;
    // SyntaxError: Private field '#name' must be declared in an enclosing class
  }
}
```

<hr />

#### static 필드 정의 제안

클래스에는 static 메소드를 정의할 수 있다. 하지만 static 필드를 정의할 수는 없었다. 하지만 static public 필드, static private 필드, static private 메소드를 정의할 수 있는 새로운 표준 사양인 “Static class features”이 2019년 11월 현재, TC39 프로세스의 stage 3(candidate)에 제안되어 있다. 이 제안 중에 static public/private 필드는 2019년 11월 현재, 최신 브라우저(Chrome 72 이상)과 최신 Node.js(버전 12 이상)에 이미 구현되어 있다.

``` javascript
class MyMath {
  // static public 필드 정의
  static PI = 22 / 7;

  // static private 필드 정의
  static #num = 10;

  // static 메소드
  static increment() {
    return ++MyMath.#num;
  }
}

console.log(MyMath.PI); // 3.142857142857143
console.log(MyMath.increment()); // 11
```

<br>

## 상속에 의한 클래스 확장

### 클래스 상속과 생성자 함수 상속
프로토타입 기반 상속은 프로토타입 체인에 의해 객체의 리소스를 상속받는 개념이지만 <b>상속에 의한 클래스 확장은 기존의 클래스를 상속받아 새로운 클래스를 확장하여 정의하는 것이다.</b>

![class_inherit](/images/javascript/class_inherit.jpg "class_inherit")

Animal 클래스를 Bird라는 클래스에 상속해보자.
``` javascript
class Animal {
  constructor(age, weight) {
    this.age = age;
    this.weight = weight;
  }

  eat() { return 'eat'; }

  move() { return 'move'; }
}

class Bird extends Animal {
  fly() { return 'fly'; }
}

const bird = new Bird(1, 5);

console.log(bird); // Bird {age: 1, weight: 5}
console.log(bird instanceof Bird); // true
console.log(bird instanceof Animal); // true

console.log(bird.eat());  // eat
console.log(bird.move()); // move
console.log(bird.fly());  // fly
```

![class_inherit](/images/javascript/class_inherit2.jpg "class_inherit")

<b>클래스는 상속을 통해 다른 클래스를 확장할 수 있는 문법인 extends 키워드가 기본적으로 제공된다.</b> extends 키워드를 사용한 클래스 확장은 간편하고 직관적이다.

<hr class="sub" />

### extends 키워드
상속을 통해 클래스를 확장하려면 extends 키워드를 사용하여 상속받을 클래스를 정의한다.

``` javascript
// 수퍼(파생/부모) 클래스
class Base {}

// 서브(파생/자식) 클래스
class Derived extends Base {}
```

extends 키워드의 역할은 수퍼 클래스와 서브 클래스 간의 상속 관계를 설정하는 것이다. 클래스도 프로토타입을 통해 상속 관계를 구현한다.

![chain](/images/javascript/class_inherit3.jpg "chain")

<b>수퍼 클래스와 서브 클래스는 인스턴스의 프로토타입 체인 뿐만이 아니라, 클래스 간의 프로토타입 체인도 생성한다. 이를 통해 프로토타입 메소드, 정적 메소드 모두 상속이 가능하다.</b>

<hr class="sub" />

### 동적 상속
extends 키워드는 생성자 함수를 상속받아 클래스를 확장할 수도 있다. 단, **extends 키워드 앞에는 반드시 클래스가 와야 한다.**

``` javascript
function Base(a) {
  this.a = a;
}

// 생성자 함수를 상속받는 서브 클래스
class Derived extends Base {}

const derived = new Derived(1);
console.log(derived); // Derived {a: 1}
```

extends 키워드 다음에는 <b>클래스뿐만이 아니라 [[Construct]] 내부 메소드를 갖는 함수 객체를 반환하는 모든 표현식을 사용할 수 있다.</b> 이를 통해 동적으로 상속받을 대상을 결정할 수 있다.

``` javascript
function Base1() {}

class Base2 {}

let condition = true;

// 조건에 따라 동적으로 상속 대상을 결정하는 서브 클래스
class Derived extends (condition ? Base1 : Base2) {}

const derived = new Derived();
console.log(derived); // Derived {}

console.log(derived instanceof Base1); // true
console.log(derived instanceof Base2); // false
```

<hr class="sub" />

### 서브 클래스의 constructor
서브클래스에 constructor를 생략하면 클래스에 아래와 같이 Default constructor가 암묵적으로 정의된다.

args는 new 연산자와 함께 클래스를 호출할 때 전달한 인수의 리스트이다.

<b>super()는 수퍼 클래스의 constructor(super-constructor)를 호출하여 인스턴스를 생성한다.</b>

``` javascript
constructor(...args) { super(...args); }
```

수퍼 클래스와 서브 클래스 모두 constructor를 생략해보자.
``` javascript
// 수퍼 클래스
class Base {}

// 서브 클래스
class Derived extends Base {}
```

이렇게되면 자바스크립트 엔진은 암묵적으로 defulat constructor를 정의한다.

``` javascript
// 수퍼 클래스
class Base {
  constructor() {}
}

// 서브 클래스
class Derived extends Base {
  constructor() { super(); }
}

const derived = new Derived();
console.log(derived); // Derived {}
```
위 예제와 같이 수퍼 클래스와 서브 클래스 모두 constructor를 생략하면 빈객체가 생성된다. 프로퍼티를 소유하는 인스턴스를 생성하려면 constructor 내부에서 인스턴스에 프로퍼티를 추가해야 한다.

<hr class="sub" />

### super 키워드
<b>super 키워드는 함수처럼 호출할 수도 있고 this와 같은 식별자처럼 참조할 수 있는 특수한 키워드이다.</b>

- super를 호출하면 수퍼 클래스의 constructor(super-constructor)를 호출한다.
- super를 참조하면 수퍼 클래스의 메소드를 호출할 수 있다.

<br>

#### super 호출
수퍼 클래스의 constructor 내부에서 추가한 프로퍼티를 그대로 갖는 인스턴스를 생성한다면 서브 클래스의 constructor를 생략할 수 있다.

이때 new 연산자와 함께 서브 클래스를 호출하면서 전달한 인수는 모두 <b>서브 클래스에 암묵적으로 정의된 디폴트 constructor의 super 호출을 통해 수퍼 클래스의 constructor에게 전달된다.</b>

``` javascript
// 수퍼 클래스
class Base {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }
}

// 서브 클래스
class Derived extends Base {
  // 아래와 같이 암묵적으로 디폴트 constructor가 정의된다.
  // constructor(...args) { super(...args); }
}

const derived = new Derived(1, 2);
console.log(derived); // Derived {a: 1, b: 2}
```

수퍼 클래스에서 추가한 프로퍼티와 서브 클래스에서 추가한 프로퍼티를 갖는 인스턴스를 생성한다면 서브 클래스의 constructor를 생략할 수 없다.

이때 new 연산자와 함께 서브 클래스를 호출하면서 전달한 인수 중에서 수퍼 클래스의 constructor에게 전달할 필요가 있는 인수는 서브 클래스의 constructor에서 호출한 super를 통해 전달한다.

``` javascript
// 수퍼 클래스
class Base {
  constructor(a, b) { // ④
    this.a = a;
    this.b = b;
  }
}

// 서브 클래스
class Derived extends Base {
  constructor(a, b, c) { // ②
    super(a, b); // ③
    this.c = c;
  }
}

const derived = new Derived(1, 2, 3); // ①
console.log(derived); // Derived {a: 1, b: 2, c: 3}
```
new 연산자와 함께 Derived 클래스를 호출하면서 전달한 인수(①)는 Derived 클래스의 constructor(②)에게 전달되고 super 호출(③)을 통해 Base클래스의 constructor(④)에게 전달된다.

<br>

##### <b>super 호출시 주의사항</b>
1. **서브 클래스에서 constructor를 생략하지 않는 경우, 서브 클래스의 constructor에서는 반드시 super를 호출해야 한다.**

``` javascript
class Base {}

class Derived extends Base {
  constructor() {
    // ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
    console.log('constructor call'); // X

    super(console.log('constructor call')) // O
  }
}

const derived = new Derived();
```

2. **서브 클래스의 constructor에서 super를 호출하기 전에는 this를 참조할 수 없다.**

``` javascript
class Base {}

class Derived extends Base {
  constructor() {
    // ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
    this.a = 1;
    super();
  }
}

const derived = new Derived(1);
```

3. **super는 반드시 서브 클래스의 constructor에서만 호출한다. 서브 클래스가 아닌 클래스 또는 함수에서 호출하면 에러를 발생시킨다.**

``` javascript
class Base {
  constructor() {
    super(); // SyntaxError: 'super' keyword unexpected here
  }
}

function Foo() {
  super(); // SyntaxError: 'super' keyword unexpected here
}
```

<hr />

#### super 참조
메소드 내에서 super를 참조하면 수퍼 클래스의 메소드를 호출할 수 있다.

1. **서브 클래스의 프로토타입 메소드 내에서 super.prop는 수퍼 클래스의 프로토타입 메소드 prop를 가리킨다.**

``` javascript
// 수퍼 클래스
class Base {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    return `Hi! ${this.name}`;
  }
}

// 서브 클래스
class Derived extends Base {
  sayHi() {
    // super.getName은 수퍼 클래스의 프로토타입 메소드를 가리킨다.
    return `${super.sayHi()}. how are you doing?`;
  }
}

const derived = new Derived('Lee');
console.log(derived.sayHi()); // Hi! Lee. how are you doing?
```

위 예제는 아래 예제와 동일하게 동작한다.

``` javascript
// 수퍼 클래스
class Base {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    return `Hi! ${this.name}`;
  }
}

class Derived extends Base {
  sayHi() {
    // __super는 Derived의 sayHi가 바인딩된 객체의 프로토타입을 가리킨다.
    // sayHi는 Derived.prototype에 바인딩되었으므로 __super는 Base.prototype을 가리킨다.
    const __super = Object.getPrototypeOf(Derived.prototype);
    return `${__super.sayHi.call(this)} how are you doing?`;
  }
}
```

super는 자신이 바인딩되어 있는 객체의 프로토타입을 가리킨다. 위 예제에서 Derived 클래스의 sayHi는 Derived.prototype에 바인딩되어 있고 super는 Derived.prototype의 프로토타입인 Base.prototype을 가리킨다. 따라서 super.sayHi는 Base.prototype.sayHi를 가리킨다. 단, super.sayHi, 즉 Base.prototype.sayHi를 호출할 때 call 메소드를 사용해 this를 전달하여야 한다. Base.prototype.sayHi에는 name 프로퍼티가 존재하지 않기 때문이다.

*객체 리터럴에서도 super 참조를 사용할 수 있다. 단, ES6의 메소드 축약 표현으로 정의된 함수만 가능하다.*

``` javascript
const base = {
  name: 'Lee',
  sayHi() {
    return `Hi! ${this.name}`;
  }
};

const derived = {
  __proto__: base, // __proto__ 접근자 프로퍼티로 상속 연결
  sayHi() {
    return `${super.sayHi()}. how are you doing?`;
  }
};

console.log(derived.sayHi()); // Hi! Lee. how are you doing?
```

<br>

2. **서브 클래스의 정적 메소드 내에서 super.sayHi는 수퍼 클래스의 정적 메소드 sayHi를 가리킨다.**

``` javascript
// 수퍼 클래스
class Base {
  static sayHi() {
    return 'Hi!';
  }
}

// 서브 클래스
class Derived extends Base {
  static sayHi() {
    // super.sayHi는 수퍼 클래스의 정적 메소드를 가리킨다.
    return `${super.sayHi()} how are you doing?`;
  }
}

console.log(Derived.sayHi()); // Hi! how are you doing?
```

<hr class="sub" />

### 상속 클래스의 인스턴스 생성 과정
직사각형을 나타내는 Rectangle 클래스와 상속을 통해 Rectangle 클래스를 확장한 ColorRectangle 클래스를 정의해 보자.

``` javascript
// 수퍼 클래스
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }

  toString() {
    return `width = ${this.width}, height = ${this.height}`;
  }
}

// 서브 클래스
class ColorRectangle extends Rectangle {
  constructor(width, height, color) {
    super(width, height);
    this.color = color;
  }

  // 메소드 오버라이딩
  toString() {
    return super.toString() + `, color = ${this.color}`;
  }
}

const colorRectangle = new ColorRectangle(2, 4, 'red');
console.log(colorRectangle); // Rectangle { width: 2, height: 4, color: 'red' }

// 상속을 통해 getArea 메소드를 호출
console.log(colorRectangle.getArea()); // 8
// 오버라이딩된 toString 메소드를 호출
console.log(colorRectangle.toString()); // width = 2, height = 4, color = red
```

서브 클래스(ColorRectangle)가 new 연산자와 함께 호출되면 아래의 과정을 통해 인스턴스를 생성한다.

<br>

**1. 서브 클래스의 super 호출**<br>
자바스크립트 엔진은 클래스를 평가할 때, 수퍼 클래스와 서브 클래스를 구분하기 위해 내부 슬롯 [[ConstructorKind]]를 갖는다. 다른 클래스를 상속받지 않는 클래스(그리고 생성자 함수)는 내부 슬롯 [[ConstructorKind]]의 값이 “base”로 설정되지만 다른 클래스를 상속받는 서브 클래스는 내부 슬롯 [[ConstructorKind]]의 값이 “derived”로 설정된다. 이를 통해 수퍼 클래스와 서브 클래스는 new 연산자와 함께 호출되었을 때의 동작이 구분된다.

다른 클래스를 상속받지 않는 클래스(그리고 생성자 함수)는 new 연산자와 함께 호출되었을 때 암묵적으로 빈 객체, 즉 인스턴스를 생성하고 이를 this에 바인딩한다.

하지만 <b>서브 클래스는 암묵적으로 빈 객체, 즉 인스턴스를 생성하지 않고 인스턴스 생성을 수퍼 클래스에게 위임한다.</b> 이것이 바로 서브 클래스의 constructor에서 반드시 super를 호출해야하는 이유이다.

서브 클래스(ColorRectangle)가 new 연산자와 함께 호출되면 서브 클래스 constructor 내부의 super 키워드가 함수처럼 호출된다. super를 호출하면 수퍼 클래스의 constructor(super-constructor)가 호출된다. 좀 더 정확히 말하자면 수퍼 클래스가 평가되어 생성된 함수 객체의 코드가 실행되기 시작한다.

실제로 인스턴스를 생성하는 주체는 수퍼 클래스이므로 수퍼 클래스의 constructor를 호출하는 super가 호출되지 않으면 인스턴스를 생성할 수 없기 때문에 서브 클래스 constructor 내부에 super 호출이 없으면 에러가 발생한다.

<br>

**2. 수퍼 클래스의 인스턴스 생성과 this 바인딩**<br>
수퍼 클래스가 실행되기 시작하여 암묵적으로 빈 객체를 생성한다. 이 빈 객체가 바로 (아직 완성되지는 않았지만) 클래스가 생성한 인스턴스이다. 그리고 암묵적으로 생성된 빈 객체, 즉 인스턴스는 this에 바인딩된다. 따라서 수퍼 클래스의 constructor 내부의 this는 생성된 인스턴스를 가리킨다.

``` javascript
// 수퍼 클래스
class Rectangle {
  constructor(width, height) {
    // 암묵적으로 빈 객체, 즉 인스턴스가 생성되고 this에 바인딩된다.
    console.log(this); // ColorRectangle {}
    // new 연산자와 함께 호출된 함수, 즉 new.target은 ColorRectangle이다.
    console.log(new.target); // ColorRectangle
...
}
```

이때 인스턴스는 수퍼 클래스가 생성한 것이다. 하지만 new 연산자와 함께 호출된 클래스가 서브 클래스라는 것이 중요하다. 즉, new 연산자와 함께 호출된 함수를 가리키는 new.target은 서브클래스를 가리킨다. 따라서 인스턴스는 new.target이 가리키는 서브 클래스가 생성한 것으로 처리된다.

*생성된 인스턴스의 프로토타입은 수퍼 클래스의 prototype 프로퍼티가 가리키는 객체(Rectangle.prototype)가 아니라 new.target, 즉 서브 클래스의 prototype 프로퍼티가 가리키는 객체(ColorRectangle.prototype)이다.*

``` javascript
// 수퍼 클래스
class Rectangle {
  constructor(width, height) {
    // 암묵적으로 빈 객체, 즉 인스턴스가 생성되고 this에 바인딩된다.
    console.log(this); // ColorRectangle {}
    // new 연산자와 함께 호출된 함수, 즉 new.target은 ColorRectangle이다.
    console.log(new.target); // ColorRectangle

    // 생성된 인스턴스의 프로토타입으로 ColorRectangle.prototype가 설정된다.
    console.log(Object.getPrototypeOf(this) === ColorRectangle.prototype); // true
    console.log(this instanceof ColorRectangle); // true
    console.log(this instanceof Rectangle); // true
...
}
```

<br>

**3. 수퍼 클래스의 인스턴스 초기화**<br>
수퍼 클래스의 constructor가 실행되어 this에 바인딩되어 있는 인스턴스를 초기화한다. 즉, this에 바인딩되어 있는 인스턴스에 프로퍼티를 추가하고 constructor가 인수로 전달받은 초기값으로 인스턴스의 프로퍼티를 초기화한다.

``` javascript
// 수퍼 클래스
class Rectangle {
  constructor(width, height) {
    // 암묵적으로 빈 객체, 즉 인스턴스가 생성되고 this에 바인딩된다.
    console.log(this); // ColorRectangle {}
    // new 연산자와 함께 호출된 함수, 즉 new.target은 ColorRectangle이다.
    console.log(new.target); // ColorRectangle

    // 생성된 인스턴스의 프로토타입으로 ColorRectangle.prototype가 설정된다.
    console.log(Object.getPrototypeOf(this) === ColorRectangle.prototype); // true
    console.log(this instanceof ColorRectangle); // true
    console.log(this instanceof Rectangle); // true

    // 인스턴스 초기화
    this.width = width;
    this.height = height;

    console.log(this); // ColorRectangle {width: 2, height: 4}
  }
...
}
```

<br>

**4. 수퍼 클래스의 프로토타입 / 정적 메소드 추가**<br>
수퍼 클래스 몸체에 프로토타입 메소드가 존재하면 수퍼 클래스의 prototype 프로퍼티가 가리키는 객체에 메소드로 추가된다. 수퍼 클래스 몸체에 정적 메소드가 존재하면 클래스에 메소드로 추가된다.

<br>

**5. 서브 클래스 constructor로의 복귀와 this 바인딩**<br>
super의 호출이 종료되고 컨트롤이 서브 클래스 constructor로의 복귀한다. 이때 <b>super가 반환한 인스턴스가 this에 바인딩된다.</b> super 호출이 종료하기 전에는 this를 참조할 수 없다. 서브 클래스는 별도의 인스턴스를 생성하지 않고 super가 반환한 인스턴스를 this에 바인딩하여 그대로 사용한다.

``` javascript
// 서브 클래스
class ColorRectangle extends Rectangle {
  constructor(width, height, color) {
    super(width, height);

    // super가 반환한 인스턴스가 this에 바인딩된다.
    console.log(this); // ColorRectangle {width: 2, height: 4}
...
}
```

<br>

**6. 서브 클래스의 인스턴스 초기화**<br>
super 호출 이후, 서브 클래스의 constructor에 기술되어 있는 인스턴스 초기화가 실행된다. 즉, this에 바인딩되어 있는 인스턴스에 프로퍼티를 추가하고 constructor가 인수로 전달받은 초기값으로 인스턴스의 프로퍼티를 초기화한다.

<br>

**7. 인스턴스 반환**<br>
클래스의 모든 처리가 끝나면 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.

``` javascript
// 서브 클래스
class ColorRectangle extends Rectangle {
  constructor(width, height, color) {
    super(width, height);

    // super가 반환한 인스턴스가 this에 바인딩된다.
    console.log(this); // ColorRectangle {width: 2, height: 4}

    // 인스턴스 초기화
    this.color = color;

    // 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.
    console.log(this); // ColorRectangle {width: 2, height: 4, color: "red"}
  }
...
}
```

<br>
<br>
<br>
<br>
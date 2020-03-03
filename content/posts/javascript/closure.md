---
title: Closure
date: "2019-10-28"
template: "post"
draft: false
slug: "/posts/javascript/Closure"
category: "Javascript"
tags:
  - "Closure"
  - "Scope"
  - "[[Environment]]"
  - "Lexical Environment"
description: "클로저에 대해서 알아보자"
---
<span class="notice">
  <em>TIL 내용이므로 잘못된 내용은 댓글 부탁드립니다</em>
</span>

<div id="toc">

**:link:  Table Of Contents**

- [렉시컬 스코프](#렉시컬-스코프)
- [함수 객체의 내부 슬롯 [[Environment]]](#함수-객체의-내부-슬롯-environment)
- [클로저와 렉시컬 환경](#클로저와-렉시컬-환경)
- [클로저의 활용](#클로저의-활용)
- [자주 발생하는 실수](#자주-발생하는-실수)

</div>

클로저는 상태를 안전하게 유지하기 위해 사용한다. 즉, 상태가 의도치 않게 변경되지 않도록 안전하게 은닉(Information hiding)한다. 그리고 이전 상태를 기억하다가 상태가 변경되면 최신 상태(state)를 유지한다. 자바스크립트에서 모든 함수는 클로저라고 할 수 있다.

클로저를 이해하기 위해서는 렉시컬 스코프와 내부 슬롯을 이해해야 수월하다.

먼저 렉시컬 스코프부터 확인 해보자.

## 렉시컬 스코프
<b>자바스크립트는 함수를 어디서 호출했는지가 아니라 어디에 정의했는지에 따라 상위 스코프를 결정한다. 이를 렉시컬 스코프라한다.</b>

*아래의 예제를 살펴보자*
``` javascript
const x = 1;

function foo() {
  const x = 10;
  bar();
}

function bar() {
  console.log(x);
}

foo(); // ?
bar(); // ?
```
위 예제의 함수 foo와 함수 bar는 모두 전역에서 정의된 함수이다. **함수의 상위 스코프는 함수를 어디서 정의했는지에 따라 결정하므로 함수 foo와 함수 bar의 상위 스코프는 전역이다.** 따라서 함수를 어디서 호출하든지 함수의 상위 스코프 결정에는 어떠한 영향도 끼치지 않는다.

<b>스코프의 실체는 결국 실행 컨텍스트의 렉시컬 환경이다.</b> 렉시컬 환경은 자신의 **"외부 렉시컬 환경에 대한 참조"**를 통해 상위 렉시컬 환경과 연결된다. 이것이 바로 스코프 체인이다. 한마디로 함수의 상위 스코프를 결정한다 === 렉시컬 환경의 외부 렉시컬 환경에 대한 참조에 저장할 참조 값을 결정한다.

<b>렉시컬 환경의 "외부 렉시컬 환경에 대한 참조"에 저장할 참조값, 즉 상위 스코프에 대한 참조는 함수 정의가 평가되는 시점에 함수가 정의된 환경(위치)에 의해 결정된다. 이것이 바로 렉시컬 스코프이다.</b>

<br>

## 함수 객체의 내부 슬롯 [[Environment]]
함수가 정의된 환경(위치)과 호출되는 환경(위치)는 다를 수 있다. 따라서 렉시컬 스코프가 가능하려면 함수는 자신이 호출되는 환경과는 상관없이 자신이 정의된 환경, 즉 상위 스코프를 기억해야 한다. 이를 위해 <b>함수는 자신의 내부 슬롯[[Environment]]에 자신이 정의된 환경, 즉 상위 스코프의 참조를 저장한다.</b>

따라서 **함수는 함수 정의가 평가되어 객체를 생성할때, 자신이 정의된 환경(위치)에 의해 결정된 상위 스코프의 참조를 함수 객체 자신의 내부 슬롯[[Environment]]에 저장한다. 이때 저장된 상위 스코프의 참조는 현재 실행중인 실행 컨텍스트의 렉시컬 환경을 가리킨다.**

<b>함수 객체의 내부 슬롯 [[Environment]]에 저장한 현재 실행 중인 실행 컨텍스트의 렉시컬 환경의 참조가 바로 상위 스코프이다. 또한 자신이 호출되었을 때 생성될 함수 렉시컬 환경의 “외부 렉시컬 환경에 대한 참조”에 저장될 참조값이다. 함수 객체는 내부 슬롯 [[Environment]]에 저장한 렉시컬 환경의 참조, 즉 상위 스코프를 자신이 존재하는 한 기억한다.</b>

``` javascript
const x = 1;

function foo() {
  const x = 10;

  // 상위 스코프는 함수 정의 환경(위치)에 따라 결정된다.
  // 함수 호출 위치와 상위 스코프는 아무런 관계가 없다.
  bar();
}

// 함수 bar는 자신의 상위 스코프, 즉 전역 렉시컬 환경을 기억한다.
function bar() {
  console.log(x);
}

foo(); // ?
bar(); // ?
```
위 예제의 bar 함수가 호출된 시점의 실행 컨텍스트는 다음과 같다.

![environment](/images/javascript/environment.jpg "environment")

함수 foo와 함수 bar는 모두 전역에서 함수 선언문으로 정의되었다. 따라서 함수 foo와 함수 bar는 모두 전역 코드가 평가되는 시점에 평가되어 함수 객체를 생성하고 전역 객체 window의 프로퍼티가 된다. 이때 생성된 함수 객체의 내부 슬롯 [[Environment]]에는 함수 정의가 평가된 시점, 즉 전역 코드 평가 시점에 실행 중인 실행 컨텍스트의 렉시컬 환경인 전역 렉시컬 환경의 참조가 저장된다.

함수가 호출되면 함수 내부로 코드의 제어권이 이동한다. 그리고 함수 코드를 평가하기 시작한다. 함수 코드 평가는 아래 순서로 진행된다.

``` code
1. 함수 실행 컨텍스트 생성
2. 함수 렉시컬 환경 생성
  2.1. 함수 환경 레코드 생성
  2.2. 외부 렉시컬 환경에 대한 참조 할당
  2.3. this 바인딩
```

이때 함수 렉시컬 환경의 구성 요소인 외부 렉시컬 환경에 대한 참조에는 함수 객체의 내부 슬롯 [[Environment]]에 저장된 렉시컬 환경의 참조가 할당된다. 즉, 함수 객체의 내부 슬롯 [[Environment]]에 저장된 렉시컬 환경의 참조는 바로 함수의 상위 스코프를 의미한다. 이것이 바로 함수 정의 위치에 따라 상위 스코프를 결정하는 렉시컬 스코프의 실체이다.

<br>

## 클로저와 렉시컬 환경

``` javascript
const x = 1;

// ①
function outer() {
  const x = 10;
  const inner = function () { console.log(x); }; // ②
  return inner;
}

// 함수 outer를 호출하면 중첩 함수 inner를 반환한다.
// 그리고 함수 outer의 실행 컨텍스트는 실행 컨텍스트 스택에서 pop된다.
const innerFunc = outer(); // ③
innerFunc(); // ④ 10
```

함수 outer를 호출(③)하면 함수 outer는 중첩 함수 inner를 반환하고 생명 주기(life cycle)를 마감한다. 즉, 함수 outer의 호출이 종료하면 함수 outer의 실행 컨텍스트는 실행 컨텍스트 스택에서 제거(pop)된다. 이때 함수 outer의 지역 변수 x와 변수값 10을 저장하고 있던 함수 outer 실행 컨텍스트가 제거되었으므로 함수 outer의 지역 변수 x 또한 생명 주기를 마감한다. 따라서 함수 outer의 지역 변수 x는 더 이상 유효하지 않게 되어 변수 x에 접근할 수 있는 방법은 달리 없어 보인다.

그러나 위 코드의 실행 결과(④)는 함수 outer의 지역 변수 x의 값인 10이다. 이미 생명 주기가 종료되어 실행 컨텍스트 스택에서 제거된 함수 outer의 지역 변수 x가 다시 부활이라도 한 듯이 동작하고 있다.

이처럼 <b>자신을 포함하고 있는 외부 함수보다 중첩 함수가 더 오래 유지되는 경우, 외부 함수 밖에서 중첩 함수를 호출하더라도 외부 함수의 지역 변수에 접근할 수 있는데 이러한 함수를 클로저(closure)라고 부른다.</b>

inner 함수는 자신이 평가될 때 자신이 정의된 위치에 의해 결정된 상위 스코프를 [[Environment]] 내부 슬롯에 저장한다. 이때 저장된 상위 스코프는 함수가 존재하는 한 유지된다.

outer 함수가 평가되어 함수 객체를 생성할 때(①) 현재 실행 중인 실행 컨텍스트의 렉시컬 환경, 즉 전역 렉시컬 환경을 outer 함수 객체의 [[Environment]] 내부 슬롯에 상위 스코프로서 저장한다.

![closure scope](/images/javascript/closure_scope.jpg "closure scope")

outer 함수를 호출하면 outer 함수의 렉시컬 환경이 생성되고 앞서 outer 함수 객체의 [[Environment]] 내부 슬롯에 저장된 전역 렉시컬 환경을 outer 함수 렉시컬 환경의 “외부 렉시컬 환경에 대한 참조”에 할당한다.

그리고 중첩 함수 inner가 평가된다.(② inner 함수는 함수 표현식으로 정의하였기 때문에 런타임에 평가된다.) <b>이때 중첩 함수 inner은 자신의 [[Environment]] 내부 슬롯에 현재 실행 중인 실행 컨텍스트의 렉시컬 환경, 즉 outer 함수의 렉시컬 환경을 상위 스코프로서 저장한다.</b>

![closure scope2](/images/javascript/closure_scope2.jpg "closure scope2")

outer 함수의 실행이 종료하면 inner 함수를 반환하면서 outer 함수의 생명 주기는 종료한다.(③) 즉, outer 함수의 실행 컨텍스트가 실행 컨텍스트 스택에서 제거된다. <b>이때 outer 함수의 실행 컨텍스트는 실행 컨텍스트 스택에서 제거되지만 outer 함수의 렉시컬 환경까지 소멸하는 것은 아니다. outer 함수의 렉시컬 환경은 inner 함수의 [[Environment]] 내부 슬롯에 의해 참조되고 있으므로 가비지 켈렉션의 대상이 되지 않기 때문이다.</b>

![closure scope3](/images/javascript/closure_scope3.jpg "closure scope3")

outer 함수가 반환한 inner 함수를 호출(④)하면 inner 함수의 실행 컨텍스트가 생성되고 실행 컨텍스트 스택에 push된다. 그리고 렉시컬 환경의 외부 렉시컬 환경에 대한 참조에는 inner 함수 객체의 [[Environment]] 내부 슬롯에 저장되어 있는 참조값이 할당된다.

![closure scope4](/images/javascript/closure_scope4.jpg "closure scope4")

중첩 함수 inner는 외부 함수 outer보다 더 오래 생존하였다. 이때 <b>함수는 외부 함수의 생존 여부(실행 컨텍스트의 생존 여부)와 상관없이 자신이 정의된 위치에 의해 결정된 상위 스코프를 기억한다.</b>

이처럼 중첩 함수 inner의 내부에서는 상위 스코프를 참조할 수 있으므로 상위 스코프의 식별자를 참조할 수 있고 식별자의 값을 변경할 수도 있다.

자바스크립트의 모든 함수는 상위 스코프를 기억하므로 이론 적으로 모든 함수는 클로저이다. 하지만 일반적으로 모든 함수를 클로저라고 하지는 않는다.

<br>
<br>

## 클로저의 활용
**클로저는 상태를 안전하게 유지하기 위해 사용한다.** 즉, 상태가 의도치 않게 변경되지 않도록 안전하게 은닉(Information hiding)한다. 그리고 이전 상태를 기억하다가 상태가 변경되면 최신 상태(state)를 유지한다.
<br>

아래의 예제들은 버튼을 클릭할때마다 카운터하는 예제이다.<br>
예제들을 살펴보며 잘못된 점이 무엇인지, 왜 클로저를 사용해야하는지를 알아보자.

``` html
<!DOCTYPE html>
<html>
<body>
  <button class="increase">+</button>
  <span class="counter">0</span>

  <script>
    // 카운트 상태를 유지하기 위한 전역 변수
    let num = 0;

    const $counter = document.querySelector('.counter');

    // 버튼이 클릭되면 전역 변수 num을 1 증가 시킨다.
    const increase = function () {
      $counter.textContent = ++num; // 상태 변화
    };

    document.querySelector('.increase').onclick = increase;
  </script>
</body>
</html>
```

:heavy_exclamation_mark: **위 코드의 문제점**<br>
위 코드는 원하는 대로 잘 동작한다. 하지만 **num이라는 변수가 전역 변수로 노출되어 있어 누구나 접근이 가능하여 의도치 않게 변경될 가능성이 매우 높다.**

변수 num을 접근하지 못하게 하기위해 변수 num을 상태를 변경하는 함수인 increase안에 넣어보자.
``` html
<!DOCTYPE html>
<html>
<body>
  <button class="increase">+</button>
  <span class="counter">0</span>

  <script>
    const $counter = document.querySelector('.counter');

    const increase = function () {
      // 카운트 상태를 유지하기 위한 지역 변수
      let num = 0;
      $counter.textContent = ++num; // 상태 변경
    };

    document.querySelector('.increase').onclick = increase;
  </script>
</body>
</html>
```

:heavy_exclamation_mark: **위 코드의 문제점**<br>
전역 변수 num을 이벤트 핸들러 increase에 넣어 변수의 함수 레벨 스코프를 활용하여 지역변수화 시켰다. 이제 전역 변수 num은 increase의 지역변수가 되어 increase에서만 변경이 가능하게되었다.

하지만 여기서 또 문제가 발생했다. 함수선언문 내부는 함수 선언시가 아니라 함수 실행시에 값을 읽는다. 즉, 함수를 호출할때마다 num이 초기값 0으로 초기화되어 계속 1만 찍힐 수 밖에 없게 된다.

그렇다면 increase 함수를 즉시실행함수(IIFE)로 변경하고, return으로 상태를 변경하는 익명 함수 선언문만 return 해주면 어떨까?
``` html
<!DOCTYPE html>
<html>
<body>
  <button class="increase">+</button>
  <span class="counter">0</span>

  <script>
    const $counter = document.querySelector('.counter');

    // 버튼이 클릭되면 자유 변수 num을 1 증가 시킨다.
    const increase = (function () {
      // 카운트 상태를 유지하기 위한 자유 변수
      let num = 0;

      return function () {
        $counter.textContent = ++num; // 상태 변경
      };
    }());

    document.querySelector('.increase').onclick = increase;
  </script>
</body>
</html>
```
:heavy_check_mark: **위 코드는 잘 작동한다**<br>
자바스크립트가 실행되면 즉시실행함수가 호출되고, 즉시실행함수가 반환한 함수가 increase에 할당된다. increase에 할당된 함수는 자신이 정의된 위치에 상위스코프인 즉시실행함수의 렉시컬 환경을 참조할 수 있게되므로, num은 increase에 할당된 함수를 제외하고는 참조할 수 없게된다.

이제 decrease 버튼도 추가해보자

``` html
<!DOCTYPE html>
<html>
<body>
  <button class="increase">+</button>
  <span class="counter">0</span>
  <button class="decrease">-</button>

  <script>
    const $counter = document.querySelector('.counter');

    const counter = (function () {
      // 카운트 상태를 유지하기 위한 자유 변수
      let num = 0;

      // 클로저를 메소드로 갖는 객체를 반환한다.
      // 객체 리터럴은 스코프를 만들지 않는다.
      // 따라서 아래 메소드들의 상위 스코프는 즉시 실행 함수의 스코프이다.
      return {
        // num: 0, // 프로퍼티는 public이므로 정보 은닉이 되지 않는다.
        increase() {
          $counter.textContent = ++num; // 상태 변경
        },
        decrease() {
          if (num <= 0) return;
          $counter.textContent = --num; // 상태 변경
        }
      };
    }());

    document.querySelector('.increase').onclick = counter.increase;
    document.querySelector('.decrease').onclick = counter.decrease;
  </script>
</body>
</html>
```
위 코드에서 즉시실행함수가 반환하는 객체리터럴은 함수 실행 단계에서 평가되어 객체가 된다. 이때 객체의 메소드인 함수도 함수 객체로 생성된다. **객체 리터럴의 중괄호는 코드 블록이 아니므로 별도의 스코프를 생성하지 않는다.**

**increase,decrease 메소드의 상위스코프는 메소드가 평가되는 시점에 실행중인 실행 컨텍스트 즉, 즉시실행함수의 실행 컨텍스트의 렉시컬환경이다** 따라서 increase와 decrease 메소드는 num을 참조할 수 있다.


:heavy_exclamation_mark: 위 코드는 클로저 기능을 잘 수행할 수 있다. 그러나, 반환되는 메소드가 존재하므로 만약 생성자 함수를 통해 여러 생성자를 만들게 된다면 같은 기능을 하는 메소드가 생성자마다 동일하게 존재하게되 비효율적이다.

Prototype을 활용하여 위의 문제를 해결해보자.

``` html
<!DOCTYPE html>
<html>
<body>
  <button class="increase">+</button>
  <span class="counter">0</span>
  <button class="decrease">-</button>

  <script>
    const $counter = document.querySelector('.counter');

    const Counter = (function () {
      // ① 카운트 상태를 유지하기 위한 자유 변수
      let num = 0;

      function Counter() {
        // this.num = 0; // ② 프로퍼티는 public이므로 정보 은닉이 되지 않는다.
      }

      Counter.prototype.increase = function () {
        $counter.textContent = ++num;
      };

      Counter.prototype.decrease = function () {
        if (num <= 0) return;
        $counter.textContent = --num;
      };

      return Counter;
    }());

    const counter = new Counter();

    document.querySelector('.increase').onclick = counter.increase;
    document.querySelector('.decrease').onclick = counter.decrease;
  </script>
</body>
</html>
```
위 예제의 num(①)은 생성자 함수 Counter가 생성할 인스턴스의 프로퍼티가 아니라 즉시 실행 함수 내에서 선언된 변수다. 만약 num이 생성자 함수 Counter가 생성할 인스턴스의 프로퍼티라면(②) 인스턴스를 통해 외부에서 접근이 가능한 public 프로퍼티가 된다. 하지만 즉시 실행 함수 내에서 선언된 변수 num은 인스턴스를 통해 접근할 수 없으며 즉시 실행 함수 외부에서도 접근할 수 없는 은닉된 변수이다.

생성자 함수 Counter는 increase, decrease 메소드를 프로토타입을 통해 상속받는 인스턴스를 생성한다. 이 메소드들은 모두 자신의 함수 정의가 평가되어 함수 객체가 될 때, 실행 중인 실행 컨텍스트, 즉 즉시 실행 함수 실행 컨텍스트의 렉시컬 환경을 기억하는 클로저이다. 따라서 프로토타입을 통해 상속되는 프로토타입 메소드일지라도 즉시 실행 함수의 자유 변수 num을 참조할 수 있다. 다시 말해, 변수 num의 값은 increase, decrease 메소드만이 변경할 수 있다. 이러한 클로저의 특징을 사용해 클래스 기반 언어의 private 키워드를 흉내낼 수 있다.

변수 값은 누군가에 의해 언제든지 변경될 수 있어 오류 발생의 근본적 원인이 될 수 있다. 상태 변경이나 가변(mutable) 데이터를 피하고 불변성(Immutability)을 지향하는 함수형 프로그래밍에서 부수 효과(Side effect)를 최대한 억제하여 오류를 피하고 프로그램의 안정성을 높이기 위해 클로저는 적극적으로 사용된다.


위와 같은 카운터 기능을 함수형 프로그래밍에서 클로저를 활용하여 연습해보자.

``` javascript
// 함수를 인수로 전달받고 함수를 반환하는 고차 함수
// 이 함수가 반환하는 함수는 카운트 상태를 유지하기 위한 자유 변수 counter을 기억하는 클로저다.
function makeCounter(predicate) {
  // 카운트 상태를 유지하기 위한 자유 변수
  let counter = 0;

  // 클로저를 반환
  return function () {
    // 인수로 전달 받은 보조 함수에 상태 변경을 위임한다.
    counter = predicate(counter);
    return counter;
  };
}

// 보조 함수
function increase(n) {
  return ++n;
}

// 보조 함수
function decrease(n) {
  return --n;
}

// 함수로 함수를 생성한다.
// makeCounter 함수는 보조 함수를 인수로 전달받아 함수를 반환한다
const increaser = makeCounter(increase); // ①
console.log(increaser()); // 1
console.log(increaser()); // 2

// increaser 함수와는 별개의 독립된 렉시컬 환경을 갖기 때문에 카운터 상태가 연동하지 않는다.
const decreaser = makeCounter(decrease); // ②
console.log(decreaser()); // -1
console.log(decreaser()); // -2
```

:heavy_exclamation_mark: **위 코드의 문제점**<br>
**함수 makeCounter를 호출해 함수를 반환할 때 반환된 함수는 자신만의 독립된 렉시컬 환경을 갖는다.** 위 예제에서는 총 2번의 makeCounter를 호출 했으므로 반환된 함수가 2개이고 또한 각 독립된 렉시컬 환경을 갖게된다.

즉, 변수 increaser와 변수 decreaser에 할당된 함수는 각각 자신만의 독립된 렉시컬 환경을 갖기 때문에 카운트를 유지하기 위한 자유 변수 counter를 공유하지 않아 카운터의 증감이 연동되지 않는다.

따라서 독립된 카운터가 아니라 연동하여 증감이 가능한 카운터를 만들려면 렉시컬 환경을 공유하는 클로저를 만들어야 한다. 이를 위해서는 makeCounter 함수를 두번 호출하지 말아야 한다.

![clouser_lexical_environment](/images/javascript/clouser_lexical_environ.jpg "clouser_lexical_environment")

<b>해결하는 방법은 2가지 방법이 있다.</b>

1. makeCounter 함수를 변수에 할당하여 한번만 호출하여 사용하는 방법

``` javascript
// 이 함수가 반환하는 함수는 카운트 상태를 유지하기 위한 자유 변수 counter을 기억하는 클로저다.
function makeCounter() {
  // 카운트 상태를 유지하기 위한 자유 변수
  let counter = 0;

  // 함수를 인수로 전달받는 클로저를 반환
  return function (predicate) {
    // 인수로 전달 받은 보조 함수에 상태 변경을 위임한다.
    counter = predicate(counter);
    return counter;
  };
}

// 보조 함수
function increase(n) {
  return ++n;
}

// 보조 함수
function decrease(n) {
  return --n;
}

const counter = makeCounter();

console.log(counter(increase)); // 1
console.log(counter(increase)); // 2

console.log(counter(decrease)); // 1
console.log(counter(decrease)); // 0
```

2. 즉시실행함수를 이용하는 방법

``` javascript
// 함수를 반환하는 고차 함수
// 이 함수가 반환하는 함수는 카운트 상태를 유지하기 위한 자유 변수 counter을 기억하는 클로저다.
const counter = (function () {
  // 카운트 상태를 유지하기 위한 자유 변수
  let counter = 0;

  // 함수를 인수로 전달받는 클로저를 반환
  return function (predicate) {
    // 인수로 전달 받은 보조 함수에 상태 변경을 위임한다.
    counter = predicate(counter);
    return counter;
  };
}());

// 보조 함수
function increase(n) {
  return ++n;
}

// 보조 함수
function decrease(n) {
  return --n;
}

// 보조 함수를 전달하여 호출
console.log(counter(increase)); // 1
console.log(counter(increase)); // 2

// 자유 변수를 공유한다.
console.log(counter(decrease)); // 1
console.log(counter(decrease)); // 0
```

<br>
<br>

## 자주 발생하는 실수

``` javascript
var arr = [];

for (var i = 0; i < 5; i++) {
  arr[i] = function () { // ①
    return i;
  };
}

for (var j = 0; j < arr.length; j++) {
  console.log(arr[j]()); // ②
}
```
②에서 결과가 0, 1, 2, 3, 4를 출력할 거 라고 생각했다면 완전히 틀렸다. 정답은 5만 5번 출력한다. 이유는 ①에서 i는 var키워드로 선언되어 블록 레벨 스코프가 아닌 함수 레벨 스코프이다. 즉, 전역 변수이다. 그래서 ①에서 순회하며 i는 5가 되고 ②에서 arr을 호출 했을 때, return으로 순회를 다 돌고 5가 되버린 i를 리턴하는 것이다.

즉시실행함수를 이용해 클로저로 활용해서 원하는 결과값을 얻어보자.

``` javascript
var arr = [];

for (var i = 0; i < 5; i++){
  arr[i] = (function (id) { // ①
    return function () {
      return id;
    };
  }(i));
}

for (var j = 0; j < arr.length; j++) {
  console.log(arr[j]());
}
```
즉시 실행 함수는 전역 변수 i에 현재 할당되어 있는 값을 인수로 전달받아 매개 변수 id에 할당한 후 중첩 함수를 반환하고 종료된다. 즉시 실행 함수가 반환한 함수는 배열 요소에 순차적으로 저장된다.

이때 즉시 실행 함수의 매개 변수 id는 즉시 실행 함수가 반환한 함수의 상위 스코프에 존재하며 즉시 실행 함수가 반환한 함수에 의해 참조되므로 자유 변수가 되어 즉시 실행 함수가 반환한 함수에 의해 그 값이 유지된다.

결론은 위 예제는 자바스크립트의 함수 레벨 스코프 특성으로 인해 for 문의 초기화 문에서 var 키워드로 선언한 변수가 전역 변수가 되기 때문에 발생하는 현상이다. ES6의 let 키워드를 사용하면 이와 같은 번거로움이 깔끔하게 해결된다.

``` javascript
const arr = [];

for (let i = 0; i < 3; i++) {
  arr[i] = () => i;
}

for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]()); // 0 1 2
}
```

초기화 문에서 let 키워드로 선언한 변수를 사용하면 for 문이 반복될 때마다 for 문 코드 블록의 새로운 렉시컬 환경이 생성된다. 만약 for 문 내에서 정의된 함수가 있다면 이 함수의 상위 스코프는 for 문이 반복될 때마다 생성된 for 문 코드 블록의 새로운 렉시컬 환경이다.

함수의 상위 스코프는 for 문이 반복될 때 마다 식별자(초기화 변수 및 for 문 내 지역 변수 등)의 값을 유지해야 한다. 이를 위해 for 문이 반복될 때마다 독립적인 렉시컬 환경을 생성하여 식별자의 값을 유지한다.

![closure_for](/images/javascript/closure_for.jpg "closure_for")

① 초기화 문에 let 키워드로 선언한 변수를 사용한 for 문이 평가되면 먼저 새로운 렉시컬 환경(LOOP Lexical Environment)을 생성하고 초기화 문의 식별자와 값을 등록한다. 그리고 새롭게 생성된 렉시컬 환경을 현재 실행 중인 실행 컨텍스트의 렉시컬 환경으로 교체한다.

②, ③, ④ for 문의 반복이 시작되면 새로운 렉시컬 환경(PER-ITERATION Lexical Environment)을 생성하고 반복 시의 for 문 코드 블록 내의 식별자와 값(증감문 반영 이전)을 등록한다. 그리고 새롭게 생성된 렉시컬 환경을 현재 실행 중인 실행 컨텍스트의 렉시컬 환경으로 교체한다.

⑤ for 문의 반복이 모두 종료되면 for 문이 실행되기 이전의 렉시컬 환경을 실행 중인 실행 컨텍스트의 렉시컬 환경으로 되돌린다.

이처럼 var 키워드로 사용하지 않은 ES6의 반복문(for…in 문, for…of 문, while 문 등)은 반복할 때마다 새로운 렉시컬을 생성하여 반복할 당시의 상태를 마치 스냅샷을 찍는 것처럼 저장한다. 단, 이는 반복문 내부에서 함수 정의가 존재할 때 의미가 있다. 반복문 내부에 함수 정의가 없는 반복문이 생성하는 새로운 렉시컬은 반복 직후, 아무도 참조하지 않기 때문에 가비지 컬렉션의 대상이 된다.

<br>

### 결론은 클로저는 일반적으로 2가지의 조건이 요구된다고 생각한다.
1. 상위(전역 X) 함수의 식별자를 참조하고 있는가?
2. 상위(전역 X) 함수보다 더 오래 살아있는가?

클로저의 단점은 **참조에 의해 가비지 컬렉터가 메모리를 삭제하지 못하므로, 메모리의 손해가 생긴다.**

이러한 조건에 부합하는 중첩함수를 우리는 클로저라 한다.
<br>
<br>
<br>
<br>
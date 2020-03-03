---
title: 제어문
date: "2019-10-14"
template: "post"
draft: false
slug: "/posts/javascript/control-flow"
category: "Javascript"
tags:
  - "if...else"
  - "for"
  - "switch"
  - "while"
  - "do...while"
description: "Javascript의 제어문을 알아보자"
---
<span class="notice">
  <em>TIL 내용이므로 잘못된 내용은 댓글 부탁드립니다</em>
</span>

<div id="toc">

**:link:  Table Of Contents**

- [제어문이란?](#제어문이란)
- [블록문](#블록문)
- [조건문](#조건문)
  - [if…else문](#ifelse문)
  - [switch문](#switch문)
- [반복문](#반복문)
    - [for문](#for문)
    - [while문](#while문)
    - [do…while문](#do…while문)
- [break문](#break문)
- [continue문](#continue문)

</div>

## 제어문이란?
제어문은 주어진 조건에 따라 코드 블록을 실행하거나 반복 실행할때 사용한다.<br>
일반적으로 코드는 위에서 아래 방향으로 순차적으로 진행되지만, 제어문을 사용하면 코드의 실행 흐름을 인위적으로 제어할 수 있다.

하지만 인위적으로 제어한다는 것은 위에서 아래로 순차적으로 진행하는 직관적인 코드의 흐름을 혼란스럽게하여 가독성을 해치는 단점이 있다.

<br>

## 블록문
블록문은 0개 이상의 문을 중괄호로 그룹화한 것으로 코드 블록 또는 블록이라 부른다.<br>
자바스크립트에서는 코드 블록을 하나의 실행단위로 취급한다.

블록문은 단독으로 사용할 수 있으나, 일반적으로 제어문이나 함수 선언문 등에서 사용한다.

일반적으로 문의 끝에는 세미콜론(;)을 붙이지만, **블록문의 끝에는 세미콜론(;)을 붙이지 않는다.**

``` javascript
{
  var foo = 10;
  console.log(foo);
}

// 제어문
var x = 0;
while (x < 10) {
  x++;
}

// 함수 선언문
function func(a, b) {
  return a + b;
}
```

<br>

## 조건문

조건문은 주어진 조건식의 평가 결과에 따라 코드 블록의 실행을 결정한다.<br>
조건식은 boolean 값으로 평가될 수 있는 표현식이다.


### if...else문
주어진 조건식(boolean 값으로 평가될 수 있는 표현식)의 평가 결과(논리적 참, 거짓)에 따라 실행할 코드 블록을 결정한다. **만약 평가 결과가 boolean 값이 아니라면 boolean 값으로 강제로 타입변환되어 논리적 참, 거짓을 구별한다.**

``` javascript
if (조건식) {
  // 조건이 true일 경우 실행할 코드 블록
} else {
  // 조건이 false일 경우 실행할 코드 블록
}
```

위의 코드는 참, 거짓 2가지 경우의 조건을 평가하는 조건문이다.

만약 조건식을 여러개로 추가하고 싶다면 else if문을 사용하면 된다.

``` javascript
if (조건식1) {
  // 조건식1이 참이면 실행할 코드 블록
} else if (조건식2) {
  // 조건식2가 참이면 실행할 코드 블록
} else {
  // 조건식 1, 2 모두 부합하지 않다면 실행할 코드 블록
}
```

else if문과 else문은 옵션으로 사용할 수도 있고 사용하지 않을 수도 잇다. if문과 else문은 2번 이상 사용할 수 없지만, else if문은 여러 번 사용할 수 있다.

``` javascript
if (조건식) {
  // 조건식이 참이면 실행할 코드 블록
}

if (조건식1) {
  // 조건식1이 참이면 실행할 코드 블록
} else if (조건식2) {
  // 조건식2가 참이면 실행할 코드 블록
} else if (조건식3){
  // 조건식3이 참이면 실행할 코드 블록
} else {
  // 조건식 1, 2, 3 모두 부합하지 않다면 실행할 코드 블록
}
```

만약 코드 블록안의 문이 하나뿐이라면 중괄호를 생략할 수 있다.

``` javascript
var num = 2;
var kind;

if (num > 0)       kind = '양수';
else if (num < 0)  kind = '음수';
else               kind = '0';

console.log(kind); // 양수
```

대부분의 if...else문은 삼항 조건 연산자로 바꿔쓸 수 있다.

``` javascript
// x가 짝수이면 문자열 '짝수'를 반환하고 홀수이면 문자열 '홀수'를 반환한다.
var x = 2;
var result;

if (x % 2) { // 2 % 2는 0이고 0은 false로 취급된다
  result = '홀수';
} else {
  result = '짝수';
}

console.log(result); // 짝수
```

위의 코드를 삼항 조건 연산자로 바꿔보자

``` javascript
// x가 짝수이면 문자열 '짝수'를 반환하고 홀수이면 문자열 '홀수'를 반환한다.
var x = 2;

// 0은 false로 취급된다.
var result = x % 2 ? '홀수' : '짝수';

console.log(result); // 짝수
```

위 예제는 두가지 경우의 수(‘홀수’ 또는 ‘짝수’)를 갖는 경우이다. 만약 세가지 경우의 수(양수, 음수, 영)를 갖는 경우는 아래와 같이 바꿔 쓸 수 있다.

``` javascript
var num = 2;

// 0은 false로 취급된다.
var kind = num ? (num > 0 ? '양수' : '음수') : '영';

console.log(kind); // 양수
```

<b>num > 0 ? '양수' : '음수'</b>는 표현식이다. 즉, 삼항 연산자는 값으로 평가되는 표현식을 만든다. 하지만 if…else 문은 표현식이 아닌 문이다. 따라서 **삼항 조건 연산자 표현식은 값처럼 사용할 수 있기 때문에 변수에 할당할 수 있다. 하지만 if…else 문은 값처럼 사용할 수 없기 때문에 변수에 할당할 수 없다는 차이가 있다.**

<hr class="sub" />

### switch문
switch문은 주어진 **표현식**을 평가하여 그 값과 일치하는 표현식을 갖는 case 문으로 실행 순서로 이동시킨다.

case문은 상황(case)을 의미하는 표현식을 지정하고 **콜론(:)**으로 마친다. 그리고 그 뒤에 실행할 문들을 지정한다.

switch문의 표현식과 일치하는 표현식을 갖는 case문이 없다면 실행 순서는 default 문으로 이동한다. default문은 옵션이므로 사용할 수도 있고, 사용하지 않을 수도 있다.

``` javascript
switch (표현식) {
  case 표현식1:
    // switch문의 표현식과 표현식1이 일치하면 실행될 문;
    break;
  case 표현식2:
    // switch문의 표현식과 표현식2가 일치하면 실행될 문;
    break;
  default:
    // switch문의 표현식과 일치하는 표현식을 갖는 case문이 없을 때 실행될 문;
}
```

if...else문과 switch문의 차이점

**if...else문**
- 조건식은 반드시 boolean 값으로 평가된다.
- 논리적 참, 거짓에 따라 코드 블록을 결정


**switch문**
- 표현식은 boolean값 보다는 문자열, 숫자 값인 경우가 많다.
- 다양한 case에 따라 코드 블록을 결정

아래의 예제를 살펴보자. switch문의 표현식인 변수 month의 평가 결과인 숫자 11과 일치하는 case문으로 실행순서가 이동한다.

``` javascript
// 월을 영어로 변환한다. (11 → 'November')
var month = 11;
var monthName;

switch (month) {
  case 1:
    monthName = 'January';
  case 2:
    monthName = 'February';
  case 3:
    monthName = 'March';
  case 4:
    monthName = 'April';
  case 5:
    monthName = 'May';
  case 6:
    monthName = 'June';
  case 7:
    monthName = 'July';
  case 8:
    monthName = 'August';
  case 9:
    monthName = 'September';
  case 10:
    monthName = 'October';
  case 11:
    monthName = 'November';
  case 12:
    monthName = 'December';
  default:
    monthName = 'Invalid month';
}

console.log(monthName); // Invalid month
```

그런데 위 예제를 실행하면 monthName에 November라는 문자열이 할당이 안되어있다. 이는 switch문의 표현식의 평가 결과와 일치하는 case문으로 실행순서가 이동하여 문을 실행한 것은 맞지만, 문을 실행한 후 switch문을 탈출하지 않고 switch문이 끝날 때까지 이후의 모든 case문과 default문을 실행했기 때문이다. 이를 **폴스루(fall through)**라 한다.

이러한 이유는 case문에 해당하는 문의 마지막에 break문을 사용하지 않았기 때문이다. break 키워드로 구성된 break문은 코드 블록에서 탈출하는 역할을 한다. break문이 없다면 case문의 표현식과 일치하지 않더라도 실행 순서는 다음 case문으로 연이어 이동한다.

``` javascript
// 월을 영어로 변환한다. (11 → 'November')
var month = 11;
var monthName;

switch (month) {
  case 1:
    monthName = 'January';
    break;
  case 2:
    monthName = 'February';
    break;
  case 3:
    monthName = 'March';
    break;
  case 4:
    monthName = 'April';
    break;
  case 5:
    monthName = 'May';
    break;
  case 6:
    monthName = 'June';
    break;
  case 7:
    monthName = 'July';
    break;
  case 8:
    monthName = 'August';
    break;
  case 9:
    monthName = 'September';
    break;
  case 10:
    monthName = 'October';
    break;
  case 11:
    monthName = 'November';
    break;
  case 12:
    monthName = 'December';
    break;
  default:
    monthName = 'Invalid month';
}

console.log(monthName); // November
```
default 문에는 break 문을 생략하는 것이 일반적이다. default 문은 switch 문의 가장 마지막에 위치하므로 default 문의 실행이 종료하면 switch 문을 빠져나간다. 따라서 별도로 break 문이 필요 없다.

break 문을 생략한 폴스루(fall through)가 유용한 경우도 있다. 아래 예제와 같이 폴스루를 활용해 여러 개의 case 문을 하나의 조건으로 사용할 수도 있다. 아래는 윤년인지 판별해서 2월의 일수를 계산하는 예제다.

``` javascript
var year = 2000; // 2000년은 윤년으로 2월이 29일이다.
var month = 2;
var days = 0;

switch (month) {
  case 1: case 3: case 5: case 7: case 8: case 10: case 12:
    days = 31;
    break;
  case 4: case 6: case 9: case 11:
    days = 30;
    break;
  case 2:
    // 윤년 계산 알고리즘
    // 1. 년도가 4로 나누어 떨어지는 해는 윤년(2000, 2004, 2008, 2012, 2016, 2020…)
    // 2. 그 중에서 년도가 100으로 나누어 떨어지는 해는 평년(2000, 2100, 2200...)
    // 3. 그 중에서 년도가 400으로 나누어 떨어지는 해는 윤년(2000, 2400, 2800...)
    days = ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) ? 29 : 28;
    break;
  default:
    console.log('Invalid month');
}

console.log(days); // 29
```

switch 문은 case, default, break 등 다양한 키워드를 사용해야 하고 상황에 따라 실행될 코드 블록이 중괄호로 묶어 있지 않으며 폴스루가 발생하는 등 문법도 복잡하다.

<br>

## 반복문
주어진 조건식의 평가 결과가 참인 경우 코드 블록을 실행한다. 그 후 조건식을 다시 검사하여 여전히 참인 경우 조건식이 거짓일 때까지 반복하여 실행한다.

### for문
for문은 조건식이 거짓으로 판별될 때까지 코드 블록을 반복 실행한다.

``` javascript
for (변수 선언문 또는 할당문; 조건식; 증감식) {
  조건식이 참인 경우 반복 실행될 문;
}
```

for문이 어떤식으로 작동하는지 예제와 그림을 통해 자세히 알아보자.

``` javascript
for (var i = 0; i < 2; i++) {
  console.log(i);
}
```

![for](/images/javascript/for.jpg "for")

위 예제의 for 문은 변수 i가 0으로 초기화된 상태에서 시작하여 i가 2보다 작을 때까지 코드 블록을 2번 반복 실행한다.

1. for 문을 실행하면 가장 먼저 변수 선언문 var i = 0이 실행된다. 변수 선언문은 단 한번만 실행된다.
2. 변수 선언문의 실행이 종료되면 조건식으로 실행 순서가 이동한다. 현재 변수 i는 0이므로 조건식의 평가 결과는 true다.
3. 조건식의 평가 결과가 true이므로 실행 순서가 코드 블록으로 이동하여 실행된다. 증감문으로 실행 순서가 이동하는 것이 아니라 코드 블록으로 실행 순서가 이동하는 것에 주의하자.
4. 코드 블록의 실행이 종료하면 증감식으로 실행 순서가 이동한다. 증감식 i++가 실행되어 i는 1이 된다.
5. 증감식 실행이 종료되면 다시 조건식으로 실행 순서가 이동한다. 변수 선언문으로 실행 순서가 이동하는 것이 아니라 조건식으로 실행 순서가 이동하는 것에 주의하자. 변수 선언문은 단 한번만 실행된다. 현재 변수 i는 1이므로 조건식의 평가 결과는 true다.
6. 조건식의 평가 결과가 true이므로 실행 순서가 코드 블록으로 이동하여 실행된다.
7. 코드 블록의 실행이 종료하면 증감식으로 실행 순서가 이동한다. 증감식 i++가 실행되어 i는 2가 된다.
8. 증감식 실행이 종료되면 다시 조건식으로 실행 순서가 이동한다. 현재 변수 i는 2이므로 조건식의 평가 결과는 false다. 조건식의 평가 결과가 false이므로 for 문의 실행이 종료된다.

이때 변수 i는 for문이 종료한 시점에서 2라는 점을 주의하도록하자. 많이 놓치는 부분이다.

**for문의 변수 선언문, 조건식, 증감식은 모두 옵션이므로 반드시 사용할 필요는 없다.** 하지만 어떤 식도 선언하지 않으면 무한루프가 된다.

``` javascript
for() {
  ...
  // 무한루프
}
```

<hr class="sub" />

### while문

주어진 조건식의 평가 결과가 참이면 코드 블록을 계속해서 반복 실행한다. 조건문의 평가 결과가 거짓이 되면 실행을 종료한다. 만약 조건식의 평가 결과가 boolean값이 아니라면 boolean값으로 강제 타입변환하여 논리적 참, 거짓을 구별한다.

``` javascript
var count = 0;

// count가 3보다 작을 때까지 코드 블록을 계속 반복 실행한다.
while (count < 3) {
  console.log(count);
  count++;
} // 0 1 2
```

조건식의 평가 결과가 언제나 참이면 무한루프가 된다.

``` javascript
// 무한루프
while (true) { ... }
```


무한루프를 탈출하기 위해서는 코드 블럭 내에 if 문으로 탈출 조건을 만들고 break 문으로 코드 블럭을 탈출한다.

``` javascript
var count = 0;

// 무한루프
while (true) {
  console.log(count);
  count++;
  // count가 3이면 코드 블록을 탈출한다.
  if (count === 3) break;
} // 0 1 2
```

<hr class="sub" />

### do...while문

do…while 문은 코드 블록을 먼저 실행하고 조건식을 평가한다. 따라서 코드 블록은 무조건 한번 이상 실행된다.

``` javascript
var count = 0;

// count가 3보다 작을 때까지 코드 블록을 계속 반복 실행한다.
do {
  console.log(count);
  count++;
} while (count < 3); // 0 1 2
```

## break문
break문은 코드 블록을 탈출한다. 좀 더 정확히 표현하자면 코드 블록을 탈출하는 것이 아니라 레이블 문, 반복문(for, for…in, for…of, while, do…while) 또는 switch문의 코드 블록을 탈출한다. 레이블 문, 반복문, switch문의 코드 블록 이외에 break 문을 사용하면 SyntaxError(문법 에러)가 발생한다.

``` javascript
if (true) {
  break; // Uncaught SyntaxError: Illegal break statement
}
```

<br>

**:bulb:레이블문이란?**<br>
식별자가 붙은 문을 말한다. 레이블 문은 프로그램의 실행 순서를 제어하기 위해 사용한다. 사실 switch 문의 case 문과 default 문도 레이블 문이다. 레이블 문을 탈출하려면 break 문에 레이블 식별자를 지정한다.

``` javascript
// foo라는 식별자가 붙은 레이블 블록문
foo: {
  console.log(1);
  break foo; // foo 레이블 블록문을 탈출한다.
  console.log(2);
}

console.log('Done!');
```

중첩된 for 문의 내부 for 문에서 break 문을 실행하면 내부 for 문을 탈출하여 외부 for 문으로 진입한다. 이때 내부 for 문이 아닌 외부 for 문을 탈출하려면 레이블 문을 사용한다.

``` javascript
// outer라는 식별자가 붙은 레이블 for 문
outer: for (var i = 0; i < 3; i++) {
  for (var j = 0; j < 3; j++) {
    // i + j === 3이면 outer라는 식별자가 붙은 레이블 for 문을 탈출한다.
    if (i + j === 3) break outer;
    console.log('inner ' + j);
  }
}

console.log('Done!');
```

<br>

## continue문
continue문은 반복문의 코드 블록 실행을 현 지점에서 중단하고 반복문의 증감식으로 이동한다. break 문처럼 반복문을 탈출하지는 않는다.

``` javascript
var string = 'Hello World.';
var search = 'l';
var count = 0;

// 문자열은 유사배열이므로 for 문으로 순회할 수 있다.
for (var i = 0; i < string.length; i++) {
  // 'l'이 아니면 현 지점에서 실행을 중단하고 반복문의 증감식으로 이동한다.
  if (string[i] !== search) continue;
  count++; // continue 문이 실행되면 이 문은 실행되지 않는다.
}

console.log(count); // 3

// 참고로 String.prototype.match 메소드를 사용해도 같은 동작을 한다.
const regexp = new RegExp(search, 'g');
console.log(string.match(regexp).length); // 3
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
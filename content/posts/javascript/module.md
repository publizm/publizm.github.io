---
title: Module
date: "2019-12-21"
template: "post"
draft: false
slug: "/posts/javascript/Module"
category: "Javascript"
tags:
  - "Module"
  - "export"
  - "import"
description: "모듈에 대해 알아보자"
---
<span class="notice">
  <em>TIL 내용이므로 잘못된 내용은 댓글 부탁드립니다</em>
</span>

<div id="toc">

**:link:  Table Of Contents**

- [모듈이란?](#모듈이란)
- [모듈 스코프](#모듈-스코프)
- [export 키워드](#export-키워드)
- [import 키워드](#import-키워드)

</div>

## 모듈이란?
애플리케이션을 구성하는 개별적 요소로서 재사용 가능한 코드조각을 의미한다. 모듈은 세부사항을 캡슐화하고 공개가 필요한 API만을 외부에 노출한다.

일반적으로 모듈은 파일 단위로 분리되어 있으며 애플리케이션은 필요에 따라 명시적으로 모듈을 로드하여 사용한다. 즉, 모듈은 개별적으로 존재하다가 애플리케이션의 로드에 의해 애플리케이션의 일원이 된다.

모듈은 기능별로 분리되어 작성되므로 코드의 단위를 명확히 분리하여 애플리케이션을 구성할 수 있고, 재사용성이 좋아서 개발 효율성과 유지보수 효율을 높일 수 있다.

ES6에서는 클라이언트 사이드 자바스크립트에서도 동작하는 모듈 기능을 추가하였다.

script에 <b>type="module"</b> arrtibute를 추가하면 로드된 자바스크립트 파일은 모듈로서 동작한다. ES6 모듈의 파일 확장자는 모듈임을 명확히 하기 위해 .mjs를 사용하도록 권장한다.

``` html
<script type="module" src="lib.mjs"></script>
<script type="module" src="app.mjs"></script>
```

하지만 IE를 포함한 구형 브라우저는 ES6 모듈을 지원하지 않고, 브라우저의 ES6 모듈 기능을 사용하더라도 트랜스파일링이나 번들링이 필요하는 점 등의 이유로 아직 까지는 Webpack 등의 모듈 번들러를 사용하는 것이 일반적이다.

<br>

## 모듈 스코프
ES6 모듈 기능을 사용하지 않으면 분리된 자바스크립트 파일에 독자적인 스코프를 갖지 않고 하나의 전역을 공유한다.

<b>foo.js</b>

``` javascript
var x = 'foo';

// 변수 x는 전역변수이다.
console.log(window.x); // foo
```

<b>bar.js</b>

``` javascript
// foo.js에서 선언한 전역 변수 x와 중복된 선언이다.
var x = 'bar';

// 변수 x는 전역 변수이다.
// foo.js에서 선언한 전역 변수 x의 값이 재할당되었다.
console.log(window.x); // bar
```

``` html
<!DOCTYPE html>
<html>
<body>
  <script src="foo.js"></script>
  <script src="bar.js"></script>
</body>
</html>
```
위에서 얘기했듯 모듈의 기능을 사용하지 않은 자바스크립트의 파일을 로드하면 로드된 자바스크립트는 하나의 전역을 공유한다. 따라서 foo.js에서 선언한 변수 x와 bar.js에서 선언한 변수 x는 중복 선언되어 의도치 않게 변수 x의 값이 덮어 써진다.

**ES6 모듈은 자체의 스코프를 제공하여 독자적인 모듈 스코프를 갖는다. 따라서 모듈 내에서 var 키워드로 선언한 변수는 더이상 전역 변수가 아니며 window 객체(전역 객체)의 프로퍼티도 아니게 된다.**

``` html
<!DOCTYPE html>
<html>
<body>
  <script type="module" src="foo.mjs"></script>
  <script type="module" src="bar.mjs"></script>
</body>
</html>
```

<b>foo.js</b>

``` javascript
var x = 'foo';

// x는 전역변수도 아니고, 전역 객체의 프로퍼티도 아니다.
console.log(window.x); // foo
```

<b>bar.js</b>

``` javascript
console.log(x); // ReferenceError: x is not defined
```

<br>

## export 키워드
모듈은 독자적인 모듈 스코프를 갖기 때문에 모듈 안에서 선언한 모든 식별자는 기본적으로 해당 모듈 내에서만 참조할 수 있다. 만약 모듈안에서 선언한 식별자를 외부에 공개하여 다른 모듈들이 참조할 수 있게 하고 싶다면 export 키워드를 사용한다.

변수, 함수, 클래스 모두 export할 수 있다.

<b>lib.mjs</b>

``` javascript
// 변수의 공개
export const pi = Math.PI;

// 함수의 공개
export function square(x) {
  return x * x;
}

// 클래스의 공개
export class Person {
  constructor(name) {
    this.name = name;
  }
}
```

선언문 앞에 매번 export 키워드를 붙이는 것이 싫다면 export 대상을 모아 하나의 객체로 구성하여 한번에 export할 수도 있다.

<b>lib.mjs</b>

``` javascript
const pi = Math.PI;

function square(x) {
  return x * x;
}

class Person {
  constructor(name) {
    this.name = name;
  }
}

// 변수, 함수 클래스를 하나의 객체로 구성하여 공개
export { pi, square, Person };
```

## import 키워드
모듈에서 공개(export)한 대상을 로드하려면 import 키워드를 사용한다.
모듈이 export한 식별자로 import하며 ES6의 모듈의 파일 확장자를 생략할 수 없다.


<b>app.mjs</b>

``` javascript
// 같은 폴더 내의 lib.mjs 모듈을 로드.
// lib.mjs 모듈이 export한 식별자로 import한다.
// ES6 모듈의 파일 확장자를 생략할 수 없다.
import { pi, square, Person } from './lib.mjs';

console.log(pi);         // 3.141592653589793
console.log(square(10)); // 100
console.log(new Person('Lee')); // Person { name: 'Lee' }
```

모듈이 export한 식별자를 각각 지정하지 않고 하나의 이름으로 한꺼번에 import할 수도 있다. 이때 import되는 식별자는 as 뒤에 지정한 이름의 객체에 프로퍼티로 할당된다.

<b>app.mjs</b>

``` javascript
import * as lib from './lib.mjs';

console.log(lib.pi);         // 3.141592653589793
console.log(lib.square(10)); // 100
console.log(new lib.Person('Lee')); // Person { name: 'Lee' }
```

이름을 변경하여 import할 수도 있다.

<b>app.mjs</b>

``` javascript
import { pi as PI, square as sq, Person as P } from './lib.mjs';

console.log(PI);    // 3.141592653589793
console.log(sq(2)); // 4
console.log(new P('Kim')); // Person { name: 'Kim' }
```

**모듈에서 하나만을 export할 때는 default 키워드를 사용할 수 있다.**

<b>lib.mjs</b>

``` javascript
export default function (x) {
  return x * x;
}
```

**하지만 default를 사용하는 경우, var, let, const는 사용할 수 없다.**

<b>lib.mjs</b>

``` javascript
export default () => {};
// => OK

export default const foo = () => {};
// => SyntaxError: Unexpected token 'const'
```

default 키워드와 함께 export한 모듈은 {} 없이 임의의 이름으로 import한다.

<b>lib.mjs</b>

``` javascript
// app.mjs
import square from './lib.mjs';

console.log(square(3)); // 9
```



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
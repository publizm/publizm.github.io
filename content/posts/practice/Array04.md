---
title: 새로운 요소 추가
date: "2019-10-24"
template: "post"
draft: false
slug: "/posts/practice/Array04"
category: "Practice"
tags:
  - "Array.prototype.unshift"
  - "Array.prototype.concat"
description: "배열과 친해지기"
---
<span class="notice">
  <em>좀 더 좋은 방법이 있다면 댓글로 공유 부탁드립니다.</em>
</span>

## 새로운 요소 추가
- 새로운 요소(예를 들어 { id: 4, content: 'Test', completed: false })를 인수로 전달하면 todos의 선두에 새로운 요소를 추가하는 함수를 작성하라.
- 단, Array#push는 사용하지 않도록 하자.

``` javascript
let todos = [
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: false }
];

function addTodo(newTodo) {
  // concat을 이용한 방식
  todos = [newTodo].concat(todos);

  // 스프레드 문법 이용한 방식
  // todos = [newTodo, ...todos];

  // unshift를 이용한 방식
  // todos.unshift(newTodo);
}

addTodo({ id: 4, content: 'Test', completed: false });

console.log(todos);
/* 기대값
[
  { id: 4, content: 'Test', completed: false },
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: false }
]
*/
```

<br>
<br>
<br>
<br>
<br>
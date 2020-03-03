---
title: 특정 요소의 프로퍼티 값 반전
date: "2019-10-25"
template: "post"
draft: false
slug: "/posts/practice/Array06"
category: "Practice"
tags:
  - "Array.prototype.map"
  - "Array.prototype.find"
description: "배열과 친해지기"
---
<span class="notice">
  <em>좀 더 좋은 방법이 있다면 댓글로 공유 부탁드립니다.</em>
</span>

## 특정 요소의 프로퍼티 값 반전
- todos에서 대상 요소의 id를 인수로 전달하면 해당 요소의 completed 프로퍼티 값을 반전하는 함수를 작성하라.

``` javascript
let todos = [
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: false }
];

function toggleCompletedById(id) {
  todos.map(todo => todo.id === id ? todo.completed = !todo.completed : todo);

  // todo.map(todo => todo.id === id ? Object.assign(todo, {completed: !todo.completed}) : todo); 원본 배열을 바꾼다.

  // todos.map(todo => todo.id === id ? {...todo, completed : !todo.completed} : todo)

  // 잘못된 방식
  // let selectedTodo = todos.find(todo => todo.id === id);
  // selectedTodo.completed = !selectedTodo.completed;
  // Object.assign([], todos, selectedTodo);
}


toggleCompletedById(2);
console.log(todos);

// console.log(todos);
/* 기대값
[
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: false },
  { id: 1, content: 'Javascript', completed: false }
]
*/
```

<br>
<br>
<br>
<br>
<br>
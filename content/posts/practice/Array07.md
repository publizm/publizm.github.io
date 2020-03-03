---
title: 모든 요소의 프로퍼티 값을 true로 설정
date: "2019-10-26"
template: "post"
draft: false
slug: "/posts/practice/Array07"
category: "Practice"
tags:
  - "Array.prototype.map"
description: "배열과 친해지기"
---
<span class="notice">
  <em>좀 더 좋은 방법이 있다면 댓글로 공유 부탁드립니다.</em>
</span>

## 모든 요소의 프로퍼티 값을 true로 설정
- todos의 모든 요소의 completed 프로퍼티 값을 true로 설정하는 함수를 작성하라.
- hint) 기존 객체의 특정 프로퍼티를 변경/추가하여 새로운 객체를 생성하려면 Object.assign 또는 Spread 문법을 사용한다.

``` javascript
let todos = [
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: false }
];

function toggleCompletedAll() {
  todos = todos.map(todo => !todo.complted ? ({ ...todo, completed: true }) : todo);

  // todos = todos.map(todo => ({ ...todo, completed: true }));
}

toggleCompletedAll();
console.log(todos);
/*
[
  { id: 3, content: 'HTML', completed: true },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: true }
]
*/
```

<br>
<br>
<br>
<br>
<br>
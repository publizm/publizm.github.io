---
title: 특정 요소 삭제
date: "2019-10-24"
template: "post"
draft: false
slug: "/posts/practice/Array05"
category: "Practice"
tags:
  - "Array.prototype.filter"
description: "배열과 친해지기"
---
<span class="notice">
  <em>좀 더 좋은 방법이 있다면 댓글로 공유 부탁드립니다.</em>
</span>

## 특정 요소 삭제
- todos에서 삭제할 요소의 id를 인수로 전달하면 해당 요소를 삭제하는 함수를 작성하라.

``` javascript
let todos = [
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: false }
];

function removeTodo(id) {
  todos = todos.filter(item => item.id !== id);
}

removeTodo(2);

console.log(todos);

/* 기대값
[
  { id: 3, content: 'HTML', completed: false },
  { id: 1, content: 'Javascript', completed: false }
]
*/
```

<br>
<br>
<br>
<br>
<br>
---
title: 프로퍼티의 값이 true인 요소의 갯수 구하기
date: "2019-10-26"
template: "post"
draft: false
slug: "/posts/practice/Array08"
category: "Practice"
tags:
  - "Array.prototype.filter"
description: "배열과 친해지기"
---
<span class="notice">
  <em>좀 더 좋은 방법이 있다면 댓글로 공유 부탁드립니다.</em>
</span>

## 프로퍼티의 값이 true인 요소의 갯수 구하기
- todos에서 완료(completed: true)한 할일의 갯수를 구하는 함수를 작성하라.
- 단, for 문, Array#forEach는 사용하지 않도록 하자.

``` javascript
const todos = [
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: false }
];

function countCompletedTodos() {
  return todos.filter(todo => todo.completed).length;
}

console.log(countCompletedTodos()); // 1
```

<br>
<br>
<br>
<br>
<br>
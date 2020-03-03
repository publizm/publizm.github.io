---
title: id 프로퍼티의 값 중에서 최대값 구하기
date: "2019-10-26"
template: "post"
draft: false
slug: "/posts/practice/Array09"
category: "Practice"
tags:
  - "Number.isInteger"
  - "Math.sqrt"
  - "Math.pow"
description: "배열과 친해지기"
---
<span class="notice">
  <em>좀 더 좋은 방법이 있다면 댓글로 공유 부탁드립니다.</em>
</span>

## id 프로퍼티의 값 중에서 최대값 구하기
todos의 id 프로퍼티의 값 중에서 최대값을 함수를 작성하라.
단, for 문, Array#forEach는 사용하지 않도록 하자.

``` javascript
const todos = [
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: false }
];

function getMaxId() {
  return Math.max(...todos.map(todo => todo.id));
  // return Math.max.apply(null, todos.map(todo => todo.id));
}

console.log(getMaxId()); // 3
```

<br>
<br>
<br>
<br>
<br>
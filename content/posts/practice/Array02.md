---
title: 특정 프로퍼티 값 추출
date: "2019-10-22"
template: "post"
draft: false
slug: "/posts/practice/Array02"
category: "Practice"
tags:
  - "Array.prototype.map"
description: "배열과 친해지기"
---
<span class="notice">
  <em>좀 더 좋은 방법이 있다면 댓글로 공유 부탁드립니다.</em>
</span>

## 특정 프로퍼티 값 추출
- 요소의 프로퍼티(id, content, completed)를 문자열 인수로 전달하면 todos의 각 요소 중 해당 프로퍼티의 값만을 추출한 배열을 반환하는 함수를 작성하라.
- 단, for 문이나 Array#forEach는 사용하지 않도록 하자.

``` javascript
const todos = [
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: false }
];

function getValues(key) {
  return todos.map(todo => todo[key]);
}

console.log(getValues('id'));
console.log(getValues('content'));
console.log(getValues('completed'));

// 기대값
// console.log(getValues('id')); [3, 2, 1]
// console.log(getValues('content')); [ 'HTML', 'CSS', 'Javascript' ]
// console.log(getValues('completed')); [ false, true, false ]
```

<br>
<br>
<br>
<br>
<br>
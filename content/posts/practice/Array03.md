---
title: 프로퍼티 정렬
date: "2019-10-23"
template: "post"
draft: false
slug: "/posts/practice/Array03"
category: "Practice"
tags:
  - "Array.prototype.sort"
  - "Array.prototype.slice"
description: "배열과 친해지기"
---
<span class="notice">
  <em>좀 더 좋은 방법이 있다면 댓글로 공유 부탁드립니다.</em>
</span>

## 프로퍼티 정렬
- 요소의 프로퍼티(id, content, completed)를 문자열 인수로 전달하면 todos의 요소를 정렬하는 함수를 작성하라.
- 단, todos는 변경되지 않도록 하자.

``` javascript

const todos = [
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: false }
];



function sortBy(key) {
  const _todos = todos.slice();
  // const _todos = [...todos];
  return _todos.sort((a, b) => a[key] > b[key] ? 1 : (a[key] < b[key] ? -1 : 0));
  // 잘못된 방식
  // function compare(key) {
  //   return function (a, b) {
  //     return a[key] > b[key] ? 1 : (a[key] < b[key] ? -1 : 0);
  //   };
  // }

  // return _todos.sort(compare(key));
}

console.log(sortBy('id'));
/* 기대값
[
  { id: 1, content: 'Javascript', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 3, content: 'HTML', completed: false }
]
*/
console.log(sortBy('content'));
/* 기대값
[
  { id: 2, content: 'CSS', completed: true },
  { id: 3, content: 'HTML', completed: false },
  { id: 1, content: 'Javascript', completed: false }
]
*/
console.log(sortBy('completed'));
/* 기대값
[
  { id: 3, content: 'HTML', completed: false },
  { id: 1, content: 'Javascript', completed: false },
  { id: 2, content: 'CSS', completed: true }
]
*/
```

<br>
<br>
<br>
<br>
<br>
---
title: 배열을 이용한 Html 생성
date: "2019-10-22"
template: "post"
draft: false
slug: "/posts/practice/Array01"
category: "Practice"
tags:
  - "Array.prototype.forEach"
description: "배열과 친해지기"
---
<span class="notice">
  <em>좀 더 좋은 방법이 있다면 댓글로 공유 부탁드립니다.</em>
</span>

## html 생성
- 아래 배열을 사용하여 html을 생성하는 함수를 작성하라.

``` javascript

const todos = [
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: false }
];

function render() {
  let html = '';

  // todos.forEach(todo => {
  //   html += `
  //   <li id="${todo.id}">
  //     <label><input type="checkbox" ${todo.completed ? 'checked' : ''}>${todo.content}</label>
  //   </li>
  //   `;
  // });

    // 디스트럭처링
    todos.forEach(({ id, content, completed }) => {
      html += `
      <li id="${id}">
        <label><input type="checkbox" ${completed ? 'checked' : ''}>${content}</label>
      </li>
      `;
    });
  return html;
}

// 기대값
// <li id="3">
//   <label><input type="checkbox">HTML</label>
// </li>
// <li id="2">
//   <label><input type="checkbox" checked>CSS</label>
// </li>
// <li id="1">
//   <label><input type="checkbox">Javascript</label>
// </li>

console.log(render());
```

<br>
<br>
<br>
<br>
<br>
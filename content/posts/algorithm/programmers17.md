---
title: 자연수 뒤집어 배열로 만들기(프로그래머스)
date: "2019-12-15"
template: "post"
draft: false
slug: "/posts/algorithm/programmers17"
category: "algorithm"
tags:
  - "algorithm"
description: "알고리즘 연습하기"
---
<span class="notice">
  <em>좀 더 좋은 방법이 있다면 댓글로 공유 부탁드립니다.</em>
</span>

## 자연수 뒤집어 배열로 만들기
자연수 n을 뒤집어 각 자리 숫자를 원소로 가지는 배열 형태로 리턴해주세요. 예를들어 n이 12345이면 [5,4,3,2,1]을 리턴합니다.

<br>

### 제한사항
- n은 10,000,000,000이하인 자연수입니다.

<hr class="sub" />

### 입출력 예

<article class="board-tbl">

| n      | return |
| ------ | :----: |
| 12345 | [5, 4, 3, 2, 1] |

</article>

<hr class="sub" />

### 풀이

``` javascript
function solution(n) {
  const result = [];
  const arr = ('' + n).split('').reverse();

  for (let i = 0; i < arr.length; i++) {
    result.push(+arr[i]);
  }

  return result;
}
```

<br>
<br>
<br>
<br>
<br>
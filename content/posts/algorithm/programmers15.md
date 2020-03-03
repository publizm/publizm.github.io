---
title: x만큼 간격이 있는 n개의 숫자(프로그래머스)
date: "2019-12-14"
template: "post"
draft: false
slug: "/posts/algorithm/programmers15"
category: "algorithm"
tags:
  - "algorithm"
description: "알고리즘 연습하기"
---
<span class="notice">
  <em>좀 더 좋은 방법이 있다면 댓글로 공유 부탁드립니다.</em>
</span>

## x만큼 간격이 있는 n개의 숫자
함수 solution은 정수 x와 자연수 n을 입력 받아, x부터 시작해 x씩 증가하는 숫자를 n개 지니는 리스트를 리턴해야 합니다.<br>
다음 제한 조건을 보고, 조건을 만족하는 함수, solution을 완성해주세요.

<br>

### 제한사항
- x는 -10000000 이상, 10000000 이하인 정수입니다.
- n은 1000 이하인 자연수입니다.

<hr class="sub" />

### 입출력 예

<article class="board-tbl">

| x    | n    | answer       |
| ---- | ---- | ------------ |
| 2    | 5    | [2, 4, 6, 8, 10] |
| 4    | 3    | [4, 8, 12]     |
| -4   | 2    | [-4, -8]     |

</article>

<hr class="sub" />

### 풀이

``` javascript
function solution(x, n) {
  const result = [];
  for (let i = 1; i <= n; i++) {
    result.push(x * i);
  }

  return result;
}
```

<br>
<br>
<br>
<br>
<br>
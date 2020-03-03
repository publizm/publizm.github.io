---
title: 정수 내림차순으로 배치하기(프로그래머스)
date: "2019-12-14"
template: "post"
draft: false
slug: "/posts/algorithm/programmers16"
category: "algorithm"
tags:
  - "algorithm"
description: "알고리즘 연습하기"
---
<span class="notice">
  <em>좀 더 좋은 방법이 있다면 댓글로 공유 부탁드립니다.</em>
</span>

## 정수 내림차순으로 배치하기
함수 solution은 정수 n을 매개변수로 입력받습니다.<br>
n의 각 자릿수를 큰것부터 작은 순으로 정렬한 새로운 정수를 리턴해주세요.<br>
예를들어 n이 118372면 873211을 리턴하면 됩니다.

<br>

### 제한사항
- n은 1이상 8000000000 이하인 자연수입니다.

<hr class="sub" />

### 입출력 예

<article class="board-tbl">

| n      | return |
| ------ | :----: |
| 118372 | 873211 |

</article>

<hr class="sub" />

### 풀이

``` javascript
function solution(n) {
  const arr = ('' + n).split('');
  const result = arr.sort().reverse().join('');
  return +result;
}
```

<br>
<br>
<br>
<br>
<br>
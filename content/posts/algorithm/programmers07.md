---
title: 나누어 떨어지는 숫자 배열(프로그래머스)
date: "2019-12-06"
template: "post"
draft: false
slug: "/posts/algorithm/programmers07"
category: "algorithm"
tags:
  - "algorithm"
description: "알고리즘 연습하기"
---
<span class="notice">
  <em>좀 더 좋은 방법이 있다면 댓글로 공유 부탁드립니다.</em>
</span>

## 나누어 떨어지는 숫자 배열
array의 각 element 중 divisor로 나누어 떨어지는 값을 오름차순으로 정렬한 배열을 반환하는 함수, solution을 작성해주세요.<br>
divisor로 나누어 떨어지는 element가 하나도 없다면 배열에 -1을 담아 반환하세요.

<br>

### 제한사항
- arr은 자연수를 담은 배열입니다.
- 정수 i, j에 대해 i ≠ j 이면 arr[i] ≠ arr[j] 입니다.
- divisor는 자연수입니다.
- array는 길이 1 이상인 배열입니다.

<hr class="sub" />

### 입출력 예

<article class="board-tbl">

| arr           | divisor | return        |
| ------------- | ------- | ------------- |
| [5, 9, 7, 10] | 5       | [5, 10]       |
| [2, 36, 1, 3] | 1       | [1, 2, 3, 36] |
| [3, 2, 6]     | 10      | [ -1 ]        |

</article>

<hr class="sub" />

### 풀이

``` javascript
function solution(arr, divisor) {
  let result = [];
  result = arr.filter(item => item % divisor === 0);
  return result.length ? result.sort((pre, cur) => pre - cur) : [-1];
}
```

<br>
<br>
<br>
<br>
<br>
---
title: 제일 작은 수 제거하기(프로그래머스)
date: "2019-12-13"
template: "post"
draft: false
slug: "/posts/algorithm/programmers14"
category: "algorithm"
tags:
  - "algorithm"
description: "알고리즘 연습하기"
---
<span class="notice">
  <em>좀 더 좋은 방법이 있다면 댓글로 공유 부탁드립니다.</em>
</span>

## 제일 작은 수 제거하기
정수를 저장한 배열, arr 에서 가장 작은 수를 제거한 배열을 리턴하는 함수, solution을 완성해주세요.<br>
단, 리턴하려는 배열이 빈 배열인 경우엔 배열에 -1을 채워 리턴하세요.<br>
예를들어 arr이 [4, 3, 2, 1]인 경우는 [4, 3, 2]를 리턴 하고, [ 10 ]면 [ -1 ]을 리턴 합니다.

<br>

### 제한사항
- arr은 길이 1 이상인 배열입니다.
- 인덱스 i, j에 대해 i ≠ j이면 arr[ i ] ≠ arr[ j ] 입니다.

<hr class="sub" />

### 입출력 예

<article class="board-tbl">

| arr       | return  |
| --------- | ------- |
| [4, 3, 2, 1] | [4, 3, 2] |
| [ 10 ]      | [ -1 ]    |

</article>

<hr class="sub" />

### 풀이

``` javascript
function solution(arr) {
  const result = [];
  const min = Math.min(...arr);

  if (arr.length === 1) {
    result.push(-1);
    return result;
  }

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== min) result.push(arr[i]);
  }

  return result;
}
```

<br>
<br>
<br>
<br>
<br>
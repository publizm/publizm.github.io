---
title: 같은 숫자는 싫어(프로그래머스)
date: "2019-12-04"
template: "post"
draft: false
slug: "/posts/algorithm/programmers05"
category: "algorithm"
tags:
  - "algorithm"
description: "알고리즘 연습하기"
---
<span class="notice">
  <em>좀 더 좋은 방법이 있다면 댓글로 공유 부탁드립니다.</em>
</span>

## 같은 숫자는 싫어
배열 arr가 주어집니다.<br>
배열 arr의 각 원소는 숫자 0부터 9까지로 이루어져 있습니다.<br>
이때, 배열 arr에서 연속적으로 나타나는 숫자는 하나만 남기고 전부 제거하려고 합니다.<br>
단, 제거된 후 남은 수들을 반환할 때는 배열 arr의 원소들의 순서를 유지해야 합니다.

<br>

### 제한사항
- 배열 arr의 크기 : 1,000,000 이하의 자연수
- 배열 arr의 원소의 크기 : 0보다 크거나 같고 9보다 작거나 같은 정수

<hr class="sub" />

### 입출력 예

<article class="board-tbl">

| arr                 | answer            |
| --------------------- | ----------------- |
| [1, 1, 3, 3, 0, 1, 1] | [1, 3, 0, 1] |

</article>

<hr class="sub" />

### 풀이

``` javascript
function solution(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== arr[i - 1]) result.push(arr[i]);
  }

  return result
}
```

<br>
<br>
<br>
<br>
<br>
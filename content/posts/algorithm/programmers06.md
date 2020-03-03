---
title: 행렬의 덧셈(프로그래머스)
date: "2019-12-05"
template: "post"
draft: false
slug: "/posts/algorithm/programmers06"
category: "algorithm"
tags:
  - "algorithm"
description: "알고리즘 연습하기"
---
<span class="notice">
  <em>좀 더 좋은 방법이 있다면 댓글로 공유 부탁드립니다.</em>
</span>

## 행렬의 덧셈
행렬의 덧셈은 행과 열의 크기가 같은 두 행렬의 같은 행, 같은 열의 값을 서로 더한 결과가 됩니다.<br>
2개의 행렬 arr1과 arr2를 입력받아, 행렬 덧셈의 결과를 반환하는 함수, solution을 완성해주세요.

<br>

### 제한사항
- 행렬 arr1, arr2의 행과 열의 길이는 500을 넘지 않습니다.

<hr class="sub" />

### 입출력 예

<article class="board-tbl">

| arr1          | arr2          | return        |
| ------------- | ------------- | ------------- |
| [[1, 2],[2, 3]] | [[3, 4],[5, 6]] | [[4, 6],[7, 9]] |
| [[ 1 ],[ 2 ]]     | [[ 3 ],[ 4 ]]     | [[ 4 ],[ 6 ]]     |

</article>

<hr class="sub" />

### 풀이

``` javascript
function solution(arr1, arr2) {
  let result = [];
  for (let i = 0; i < arr1.length; i++) {
    const newArr = arr1[i].map((arr, index, self) => {
      return arr + arr2[i][index];
    });
    result.push(newArr);
  }
  return result;
}
```

<br>
<br>
<br>
<br>
<br>
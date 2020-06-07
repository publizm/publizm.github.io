---
title: 알고리즘 이론 연습(버블정렬)
date: "2020-01-15"
template: "post"
draft: false
slug: "/posts/algorithm/bubble_sort"
category: "algorithm"
tags:
  - "algorithm"
  - "bubble sort"
description: "알고리즘 공부하기"
---
<span class="notice">
  <em>좀 더 좋은 방법이 있다면 댓글로 공유 부탁드립니다.</em>
</span>

## 기본 정렬 알고리즘 - 버블정렬
1. 두 인접한 데이터를 비교하여 앞에 있는 데이터가 뒤에 있는 데이터보다 크면, 자리를 바꾸는 정렬 알고리즘

<br>

<hr class="sub" />

### 입출력 예제

<article class="board-tbl">

| array                            | result |
| ---------------------------- | ------ |
| [2, 7, 3]                    | [2, 3, 7]      |
| [5, 4, 1, 2]                 | [1, 2, 4, 5]      |

</article>

<hr class="sub" />

### 풀이

``` javascript
// 중복없는 난수 배열 만드는 함수
function randomArray(array, length) {
  const n = Math.floor(Math.random() * (length * 2)) + 1;

  if (array.length < length) {
    if (array.indexOf(n) < 0) array.push(n);
    return randomArray(array, length);
  } else {
    return array;
  }
}

// 버블정렬 로직
function solution(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let swap = false;
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swap = true;
      }
    }
    if (!swap) return arr;
  }
}

console.log(solution(randomArray([], 10)));
```

만약 정렬이 필요없는 배열이 들어왔을 경우는 대비하여 swap이란 변수를 만들어 swap이 이루어지면 true/false를 주어 체크하였다.

정렬이 없을 경우에는 swap 변수는 변하지 않으므로 false값을 유지하게되어 1턴만 돌고 return이 되는 방식이다.

<br>
<br>
<br>
<br>
<br>
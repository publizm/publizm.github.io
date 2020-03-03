---
title: 알고리즘 이론 연습(선택정렬)
date: "2020-01-17"
template: "post"
draft: false
slug: "/posts/algorithm/selection_sort"
category: "algorithm"
tags:
  - "algorithm"
  - "selection sort"
description: "알고리즘 공부하기"
---
<span class="notice">
  <em>좀 더 좋은 방법이 있다면 댓글로 공유 부탁드립니다.</em>
</span>

## 기본 정렬 알고리즘 - 선택정렬

다음과 같은 순서를 반복하여 정렬하는 알고리즘

1. 주어진 데이터 중, 최소값을 찾음
2. *해당 최소값을 데이터 맨 앞에 위치한 값과 교체함.
3. 맨 앞의 위치를 뺀 나머지 데이터를 동일한 방법으로 반복

<br>

<hr class="sub" />

### 입출력 예제

<article class="board-tbl">

| array                            | result |
| ---------------------------- | ------ |
| [5, 4, 3, 1]                 | [1, 3, 4, 5]      |
| [5, 1, 2]                    | [1, 2, 5]      |

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

// 선택정렬 로직
function solution(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let lowest = i;

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[lowest] > arr[j]) lowest = j;
    }

    [arr[i], arr[lowest]] = [arr[lowest], arr[i]];
  }
  return arr;
}

console.log(solution(randomArray([], 10)));
```

<br>
<br>
<br>
<br>
<br>
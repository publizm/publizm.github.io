---
title: 알고리즘 이론 연습(삽입정렬)
date: "2020-01-14"
template: "post"
draft: false
slug: "/posts/algorithm/insertion_sort"
category: "algorithm"
tags:
  - "algorithm"
  - "insertion sort"
description: "알고리즘 공부하기"
---
<span class="notice">
  <em>좀 더 좋은 방법이 있다면 댓글로 공유 부탁드립니다.</em>
</span>

## 기본 정렬 알고리즘 - 삽입정렬
1. 삽입 정렬은 두번째 인덱스부터 시작
2. 해당 인덱스(key 값) 앞에 있는 데이터(B)부터 비교해서 key 값이 더 작으면, B값을 뒤 인덱스로 복사
3. 2번 사항을 key값이 더 큰 데이터를 만날때까지 반복 수행, 그리고 큰 데이터를 만난 위치 바로 뒤에 key 값을 이동

<br>

<hr class="sub" />

### 입출력 예제

<article class="board-tbl">

| array                            | result |
| ---------------------------- | ------ |
| [5, 3, 2]                    | [2, 3, 5]      |
| [5, 3, 2, 4]                 | [2, 3, 5, 6]      |

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

// 삽입정렬 로직
function solution(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j >= 0; j--) {
      if (arr[j] < arr[j - 1]) {
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      } else {
        break;
      }
    }
  }
  return arr;
}

console.log(solution(randomArray([], 5)));
```

다양한 결과 값을 보기 위해 난수를 중복없이 만들어 주는 함수를 만들어서 작업했다.<br>
턴 횟수는 배열의 길이 - 1로 잡았고, 기준점은 턴의 변수의 + 1로 잡아 0이랑 같을때까지 - 하여 순환 횟수를 턴의 수와 같게 하였다

<br>
<br>
<br>
<br>
<br>
---
title: 콜라츠 추측(프로그래머스)
date: "2019-12-12"
template: "post"
draft: false
slug: "/posts/algorithm/programmers13"
category: "algorithm"
tags:
  - "algorithm"
description: "알고리즘 연습하기"
---
<span class="notice">
  <em>좀 더 좋은 방법이 있다면 댓글로 공유 부탁드립니다.</em>
</span>

## 콜라츠 추측
1937년 Collatz란 사람에 의해 제기된 이 추측은, 주어진 수가 1이 될때까지 다음 작업을 반복하면, 모든 수를 1로 만들 수 있다는 추측입니다.<br>
작업은 다음과 같습니다.

``` code
1-1. 입력된 수가 짝수라면 2로 나눕니다.
1-2. 입력된 수가 홀수라면 3을 곱하고 1을 더합니다.
2. 결과로 나온 수에 같은 작업을 1이 될 때까지 반복합니다.
```

예를 들어, 입력된 수가 6이라면 6 → 3 → 10 → 5 → 16 → 8 → 4 → 2 → 1 이 되어 총 8번 만에 1이 됩니다.<br>
위 작업을 몇 번이나 반복해야하는지 반환하는 함수, solution을 완성해 주세요.<br>
단, 작업을 500번을 반복해도 1이 되지 않는다면 –1을 반환해 주세요.

<br>

### 제한사항
- 입력된 수, num은 1 이상 8000000 미만인 정수입니다.

<hr class="sub" />

### 입출력 예

<article class="board-tbl">

| n      | result |
| ------ | ------ |
| 6      | 8      |
| 16     | 4      |
| 626331 | -1     |

</article>

<hr class="sub" />

### 풀이

``` javascript
function solution(num) {
  let count = 0;
  for (let i = 0; i <= 500; i++) {
    if (num === 1) break;

    if (num % 2) {
      count++;
      num = num * 3 + 1;
    } else {
      count++;
      num = num / 2;
    }
  }

  count === 501 ? count = -1 : count;

  return count;
}
```

나중에 재귀함수를 이용해서 풀어봐야겠다.

<br>
<br>
<br>
<br>
<br>
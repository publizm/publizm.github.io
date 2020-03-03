---
title: 예산(프로그래머스)
date: "2019-12-10"
template: "post"
draft: false
slug: "/posts/algorithm/programmers10"
category: "algorithm"
tags:
  - "algorithm"
description: "알고리즘 연습하기"
---
<span class="notice">
  <em>좀 더 좋은 방법이 있다면 댓글로 공유 부탁드립니다.</em>
</span>

## 예산
S사에서는 각 부서에 필요한 물품을 지원해 주기 위해 부서별로 물품을 구매하는데 필요한 금액을 조사했습니다.<br>
그러나, 전체 예산이 정해져 있기 때문에 모든 부서의 물품을 구매해 줄 수는 없습니다.<br>
그래서 최대한 많은 부서의 물품을 구매해 줄 수 있도록 하려고 합니다.

물품을 구매해 줄 때는 각 부서가 신청한 금액만큼을 모두 지원해 줘야 합니다.<br>
예를 들어 1,000원을 신청한 부서에는 정확히 1,000원을 지원해야 하며, 1,000원보다 적은 금액을 지원해 줄 수는 없습니다.

부서별로 신청한 금액이 들어있는 배열 d와 예산 budget이 매개변수로 주어질 때, 최대 몇 개의 부서에 물품을 지원할 수 있는지 return 하도록 solution 함수를 완성해주세요.

<br>

### 제한사항
- d는 부서별로 신청한 금액이 들어있는 배열이며, 길이(전체 부서의 개수)는 1 이상 100 이하입니다.
- d의 각 원소는 부서별로 신청한 금액을 나타내며, 부서별 신청 금액은 1 이상 100,000 이하의 자연수입니다.
- budget은 예산을 나타내며, 1 이상 10,000,000 이하의 자연수입니다.

<hr class="sub" />

### 입출력 예

<article class="board-tbl">

| d           | budget | result |
| ----------- | ------ | ------ |
| [1, 3, 2, 5, 4] | 9      | 3      |
| [2, 2, 3, 3]   | 10     | 4      |

</article>

<hr class="sub" />

### 풀이

``` javascript
function solution(d, budget) {
  let sum = 0;
  let count = 0;
  d.sort((a, b) => a - b);

  for (let i = 0; i < d.length; i++) {
    count++
    sum += d[i]

    if (sum <= budget) continue;

    count--;
  }
  return count;
}
```

처음에 접근할때 완전탐색으로 접근하여서 너무 고민이 많았던 문제였다, 하지만 생각보다 쉽게 해결할 수 있었다.
d의 원소 값을 계속 더 해주면서 count를 올리고, budget의 값보다 컷을때 - 시켜 카운트를 맞춰서 풀었다.
sort를 sort() 이렇게도 오름차순으로 정렬되지만 10, 11, 12 이런식의 10이상의 숫자가 들어오게되면 Unicode 포인트가 2보다 작게되어 위와 같이 sorting을 했다.
통과는 했지만 다시 한번 봐야될 것 같다.

<br>
<br>
<br>
<br>
<br>
---
title: 모의고사(프로그래머스)
date: "2019-12-20"
template: "post"
draft: false
slug: "/posts/algorithm/programmers21"
category: "algorithm"
tags:
  - "algorithm"
description: "알고리즘 연습하기"
---
<span class="notice">
  <em>좀 더 좋은 방법이 있다면 댓글로 공유 부탁드립니다.</em>
</span>

## 모의고사
수포자는 수학을 포기한 사람의 준말입니다.<br>
수포자 삼인방은 모의고사에 수학 문제를 전부 찍으려 합니다.<br>
수포자는 1번 문제부터 마지막 문제까지 다음과 같이 찍습니다.

1번 수포자가 찍는 방식: 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, ...<br>
2번 수포자가 찍는 방식: 2, 1, 2, 3, 2, 4, 2, 5, 2, 1, 2, 3, 2, 4, 2, 5, ...<br>
3번 수포자가 찍는 방식: 3, 3, 1, 1, 2, 2, 4, 4, 5, 5, 3, 3, 1, 1, 2, 2, 4, 4, 5, 5, ...

1번 문제부터 마지막 문제까지의 정답이 순서대로 들은 배열 answers가 주어졌을 때, 가장 많은 문제를 맞힌 사람이 누구인지 배열에 담아 return 하도록 solution 함수를 작성해주세요.

<br>

### 제한사항
- 시험은 최대 10,000 문제로 구성되어있습니다.
- 문제의 정답은 1, 2, 3, 4, 5중 하나입니다.
- 가장 높은 점수를 받은 사람이 여럿일 경우, return하는 값을 오름차순 정렬해주세요.

<hr class="sub" />

### 입출력 예

<article class="board-tbl">

| answers     | return  |
| ----------- | ------- |
| [1, 2, 3, 4, 5] | [ 1 ]     |
| [1, 3, 2, 4, 2] | [1, 2, 3] |

</article>

<hr class="sub" />

### 풀이

``` javascript
function solution(answers) {
  const a = [1, 2, 3, 4, 5];
  const b = [2, 1, 2, 3, 2, 4, 2, 5];
  const c = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];
  const winner = [];
  let aAnswerCount = 0;
  let bAnswerCount = 0;
  let cAnswerCount = 0;

  for (let i = 0; i < answers.length; i++) {
    if (i >= a.length) {
      if (a[i % a.length] === answers[i]) aAnswerCount++;
    } else {
      if (a[i] === answers[i]) aAnswerCount++;
    }
  }

  for (let j = 0; j < answers.length; j++) {
    if (j >= b.length) {
      if (b[j % b.length] === answers[j]) bAnswerCount++;
    } else {
      if (b[j] === answers[j]) bAnswerCount++;
    }
  }

  for (let z = 0; z < answers.length; z++) {
    if (z >= c.length) {
      if (c[z % c.length] === answers[z]) cAnswerCount++;
    } else {
      if (c[z] === answers[z]) cAnswerCount++;
    }
  }

  const max = Math.max(aAnswerCount, bAnswerCount, cAnswerCount);

  if (max === aAnswerCount) winner.push(1);
  if (max === bAnswerCount) winner.push(2);
  if (max === cAnswerCount) winner.push(3);

  return winner;
}
```

정답의 길이가 패턴보다 길었을때 체크를 하는데 있어서, 계속 패턴의 length를 빼는 식으로 작업을 해서 몇몇 테스트케이스에서 실패를 했다.

생각해보니 패턴이 아주 짧다면? 을 가정하니까 length를 빼는 식은 옳지 않다고 판단했고, 어떻게 하면 패턴 length보다 커졌을때 length의 인덱스를 다시 처음부터 탐색할 수 있을까 고민하다 length를 나누게되면 그 나머지 값을 반환하는 식을 깨달았고 그걸 적용하니 통과했다.

<br>
<br>
<br>
<br>
<br>
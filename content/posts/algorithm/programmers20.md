---
title: 체육복(프로그래머스)
date: "2019-12-19"
template: "post"
draft: false
slug: "/posts/algorithm/programmers20"
category: "algorithm"
tags:
  - "algorithm"
description: "알고리즘 연습하기"
---
<span class="notice">
  <em>좀 더 좋은 방법이 있다면 댓글로 공유 부탁드립니다.</em>
</span>

## 체육복
점심시간에 도둑이 들어, 일부 학생이 체육복을 도난당했습니다.<br>
다행히 여벌 체육복이 있는 학생이 이들에게 체육복을 빌려주려 합니다.<br>
학생들의 번호는 체격 순으로 매겨져 있어, 바로 앞번호의 학생이나 바로 뒷번호의 학생에게만 체육복을 빌려줄 수 있습니다.<br>
예를 들어, 4번 학생은 3번 학생이나 5번 학생에게만 체육복을 빌려줄 수 있습니다.<br>
체육복이 없으면 수업을 들을 수 없기 때문에 체육복을 적절히 빌려 최대한 많은 학생이 체육수업을 들어야 합니다.

전체 학생의 수 n, 체육복을 도난당한 학생들의 번호가 담긴 배열 lost, 여벌의 체육복을 가져온 학생들의 번호가 담긴 배열 reserve가 매개변수로 주어질 때, 체육수업을 들을 수 있는 학생의 최댓값을 return 하도록 solution 함수를 작성해주세요.

<br>

### 제한사항
- 전체 학생의 수는 2명 이상 30명 이하입니다.
- 체육복을 도난당한 학생의 수는 1명 이상 n명 이하이고 중복되는 번호는 없습니다.
- 여벌의 체육복을 가져온 학생의 수는 1명 이상 n명 이하이고 중복되는 번호는 없습니다.
- 여벌 체육복이 있는 학생만 다른 학생에게 체육복을 빌려줄 수 있습니다.
- 여벌 체육복을 가져온 학생이 체육복을 도난당했을 수 있습니다. 이때 이 학생은 체육복을 하나만 도난당했다고 가정하며, 남은 체육복이 하나이기에 다른 학생에게는 체육복을 빌려줄 수 없습니다.

<hr class="sub" />

### 입출력 예

<article class="board-tbl">

| n    | lost   | reserve   | return |
| ---- | ------ | --------- | ------ |
| 5    | [2, 4] | [1, 3, 5] | 5      |
| 5    | [2, 4] | [ 3 ]       | 4      |
| 3    | [ 3 ]    | [ 1 ]       | 2      |

</article>

<hr class="sub" />

### 풀이

``` javascript
function solution(n, lost, reserve) {
  const student = new Array(n).fill(true);
  const newR = [];

  for (let x = 0; x < reserve.length; x++) {
    if (!lost.includes(reserve[x])) {
      newR.push(reserve[x]);
    } else {
      lost.splice(lost.indexOf(reserve[x]), 1);
    }
  }

  for (let i = 1; i <= lost.length; i++) {
    student[lost[i - 1] - 1] = false;
  }

  for (let j = 0; j < newR.length; j++) {
    if (newR[j] - newR[j + 1] === 2 || newR[j] - newR[j + 1] === -2)  {
      student[newR[j]] = true;
      student[newR[j] - 2] = true;
    }

    if (student[newR[j] - 1]) {
      if (student[newR[j]]) {
        if (student[newR[j] - 2] === false) {
          student[newR[j] - 2] = true;
        } else {
          student[newR[j]] = true;
        }
      } else {
          if (student[newR[j]] === undefined) {
            if (student[newR[j] - 2] === false) {
              student[newR[j] - 2] = true;
            }
          } else if (student[newR[j]] === false) {
            student[newR[j]] = true;
          }
      }
    }
  }

  return student.filter(member => member).length;
}
```

통과는 했는데..... 너무 난해한 코드이다.. 나중에 리펙토링해야겠다

<br>
<br>
<br>
<br>
<br>
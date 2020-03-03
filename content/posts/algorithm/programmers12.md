---
title: 시저 암호(프로그래머스)
date: "2019-12-11"
template: "post"
draft: false
slug: "/posts/algorithm/programmers12"
category: "algorithm"
tags:
  - "algorithm"
description: "알고리즘 연습하기"
---
<span class="notice">
  <em>좀 더 좋은 방법이 있다면 댓글로 공유 부탁드립니다.</em>
</span>

## 시저 암호
어떤 문장의 각 알파벳을 일정한 거리만큼 밀어서 다른 알파벳으로 바꾸는 암호화 방식을 시저 암호라고 합니다.<br>
예를 들어 AB는 1만큼 밀면 BC가 되고, 3만큼 밀면 DE가 됩니다. z는 1만큼 밀면 a가 됩니다.<br>
문자열 s와 거리 n을 입력받아 s를 n만큼 민 암호문을 만드는 함수, solution을 완성해 보세요.

<br>

### 제한사항
- 공백은 아무리 밀어도 공백입니다.
- s는 알파벳 소문자, 대문자, 공백으로만 이루어져 있습니다.
- s의 길이는 8000이하입니다.
- n은 1 이상, 25이하인 자연수입니다.

<hr class="sub" />

### 입출력 예

<article class="board-tbl">

| s     | n    | result |
| ----- | ---- | ------ |
| AB    | 1    | BC     |
| z     | 1    | a      |
| a B z | 4    | e F d  |

</article>

<hr class="sub" />

### 풀이

``` javascript
function solution(s, n) {
  // 정답
  let result = '';
  for (let i = 0; i < s.length; i++) {
    if (s[i] === ' ') {
      result += ' ';
      continue;
    }

    let code = s[i].charCodeAt();
    let sum = code + n;

    // 대문자
    if (code >= 65 && code <= 90) {
      sum > 90 ? result += String.fromCharCode(64 + sum - 90) : result += String.fromCharCode(sum);
    }

    // 소문자
    if (code >= 97 && code <= 122) {
      sum > 122 ? result += String.fromCharCode(96 + sum - 122) : result += String.fromCharCode(sum);
    }
  }

  return result;

// 유니코드에 대한 내장함수를 이용하여 for문 풀이 - 예제 3개는 성공, 나머지 테스트 케이스 실패
// for (let word of s) {
//     if (word === ' ') {
//         result += ' ';
//         continue;
//     }

//     let code = word.charCodeAt();

//     if (code === 90 || code === 122) {
//         if (word.charCodeAt() === 90) code = 65 - 1;
//         if (word.charCodeAt() === 122) code = 97 - 1;
//     }
//     result += String.fromCharCode(code + n);
// }

// return result;
}
```

초반에 접근을 너무 단순하게 하였다. z 다음에 a가 온다라고만 접근하여, z만 처리했다.
거기에 포커스가 잡혀있는 상태에서 코드작업을 진행하였는데 결과론적으론 첫 예제에 있는 테스트는 성공했지만, 이후 여러 테스트케이스에서는 실패가 나왔다

이유를 곰곰히 생각해보니 만약 y가 있고 n의 값이 4일 경우 y는 c로 교체되야된다. 이 부분을 놓쳤다.

너무 단순하게 생각하여 접근하지말고, 앞으론 다양한 경우의 수를 생각한 다음 접근해야겠다.

<br>
<br>
<br>
<br>
<br>
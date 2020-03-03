---
title: 직사각형 별찍기(프로그래머스)
date: "2019-12-10"
template: "post"
draft: false
slug: "/posts/algorithm/programmers11"
category: "algorithm"
tags:
  - "algorithm"
description: "알고리즘 연습하기"
---
<span class="notice">
  <em>좀 더 좋은 방법이 있다면 댓글로 공유 부탁드립니다.</em>
</span>

## 예산
이 문제에는 표준 입력으로 두 개의 정수 n과 m이 주어집니다.<br>
별(*) 문자를 이용해 가로의 길이가 n, 세로의 길이가 m인 직사각형 형태를 출력해보세요.

<br>

### 제한사항
- n과 m은 각각 1000 이하인 자연수입니다.

<hr class="sub" />

### 풀이

``` javascript
process.stdin.setEncoding('utf8');
process.stdin.on('data', data => {
  const n = data.split(" ");
  const a = Number(n[0]), b = Number(n[1]);
  let result = '';
  for (var j = 0; j < b; j++) {
    for (var i = 0; i < a; i++){
        result += '*';
    }
    result += '\n';
  }
  console.log(result);
})

// *****
// *****
// *****
```

<br>
<br>
<br>
<br>
<br>
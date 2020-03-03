---
title: 가운데 글자 가져오기(프로그래머스)
date: "2019-12-03"
template: "post"
draft: false
slug: "/posts/algorithm/programmers02"
category: "algorithm"
tags:
  - "algorithm"
description: "알고리즘 연습하기"
---
<span class="notice">
  <em>좀 더 좋은 방법이 있다면 댓글로 공유 부탁드립니다.</em>
</span>

## 가운데 글자 가져오기
단어 s의 가운데 글자를 반환하는 함수, solution을 만들어 보세요. 단어의 길이가 짝수라면 가운데 두글자를 반환하면 됩니다.

<br>

### 제한사항
- s는 길이가 1 이상, 100이하인 스트링입니다.

<hr class="sub" />

### 입출력 예

<article class="board-tbl">

| s     | return |
| ----- | ------ |
| abcde | c      |
| qwer  | we     |

</article>

<hr class="sub" />

### 풀이

``` javascript
function solution(s) {
  const half = Math.floor(s.length / 2);
  return s.length % 2 ? s.substring(half, half + 1) : s.substring(half - 1, half + 1);
}
```

substring을 쓰게되면 end 값의 이전까지의 문자를 가져오는데 여기서 + 1함으로서 포함시켜 출력

<br>
<br>
<br>
<br>
<br>
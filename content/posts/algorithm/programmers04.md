---
title: 서울에서 김서방 찾기(프로그래머스)
date: "2019-12-04"
template: "post"
draft: false
slug: "/posts/algorithm/programmers04"
category: "algorithm"
tags:
  - "algorithm"
description: "알고리즘 연습하기"
---
<span class="notice">
  <em>좀 더 좋은 방법이 있다면 댓글로 공유 부탁드립니다.</em>
</span>

## 서울에서 김서방 찾기
String형 배열 seoul의 element중 Kim의 위치 x를 찾아, 김서방은 x에 있다는 String을 반환하는 함수, solution을 완성하세요.<br>
seoul에 Kim은 오직 한 번만 나타나며 잘못된 값이 입력되는 경우는 없습니다.

<br>

### 제한사항
- seoul은 길이 1 이상, 1000 이하인 배열입니다.
- seoul의 원소는 길이 1 이상, 20 이하인 문자열입니다.
- Kim은 반드시 seoul 안에 포함되어 있습니다.

<hr class="sub" />

### 입출력 예

<article class="board-tbl">

| seoul                 | return            |
| --------------------- | ----------------- |
| [Jane, Kim] | 김서방은 1에 있다 |

</article>

<hr class="sub" />

### 풀이

``` javascript
function solution(seoul) {
  return `김서방은 ${seoul.indexOf('Kim')}에 있다`
}
```

<br>
<br>
<br>
<br>
<br>
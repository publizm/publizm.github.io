---
title: 문자열 내림차순으로 배치하기(프로그래머스)
date: "2019-12-08"
template: "post"
draft: false
slug: "/posts/algorithm/programmers09"
category: "algorithm"
tags:
  - "algorithm"
description: "알고리즘 연습하기"
---
<span class="notice">
  <em>좀 더 좋은 방법이 있다면 댓글로 공유 부탁드립니다.</em>
</span>

## 문자열 내림차순으로 배치하기
문자열 s에 나타나는 문자를 큰것부터 작은 순으로 정렬해 새로운 문자열을 리턴하는 함수, solution을 완성해주세요.<br>
s는 영문 대소문자로만 구성되어 있으며, 대문자는 소문자보다 작은 것으로 간주합니다.

<br>

### 제한사항
- str은 길이 1 이상인 문자열입니다.

<hr class="sub" />

### 입출력 예

<article class="board-tbl">

| s       | return  |
| ------- | ------- |
| Zbcdefg | gfedcbZ |

</article>

<hr class="sub" />

### 풀이

``` javascript
function solution(s) {
  return [...s].sort().reverse().join('');
}
```

① 매개변수 s로 받은 문자열을 스프레드 문법으로 풀어서 배열을 만든다.<br>
② 해당 배열을 sort 메소드로 정렬시켜준다.<br>
③ sort 메소드는 기본적으로 오름차순으로 정렬시키는데, 해당 문제에서는 내림차순으로 정렬시켜야되므로 reverse 메소드를 이용하여 순서를 뒤짚는다.<br>
④ sort 메소드를 사용하기위해 배열로 만들었던 string을 join 메소드로 하여금 다시 문자열로 바꾸어주어 return한다.

<br>
<br>
<br>
<br>
<br>
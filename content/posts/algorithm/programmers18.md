---
title: 자릿수 더하기(프로그래머스)
date: "2019-12-16"
template: "post"
draft: false
slug: "/posts/algorithm/programmers18"
category: "algorithm"
tags:
  - "algorithm"
description: "알고리즘 연습하기"
---
<span class="notice">
  <em>좀 더 좋은 방법이 있다면 댓글로 공유 부탁드립니다.</em>
</span>

## 자릿수 더하기
자연수 N이 주어지면, N의 각 자릿수의 합을 구해서 return 하는 solution 함수를 만들어 주세요.<br>
예를들어 N = 123이면 1 + 2 + 3 = 6을 return 하면 됩니다.

<br>

### 제한사항
- N의 범위 : 100,000,000 이하의 자연수

<hr class="sub" />

### 입출력 예

<article class="board-tbl">

| N    | answer |
| ---- | ------ |
| 123  | 6      |
| 987  | 24     |

</article>

<hr class="sub" />

### 풀이

``` javascript
function solution(n) {
    return ('' + n).split('').reduce((pre, cur) => {
        pre = parseInt(pre) + parseInt(cur);
        return pre
    }, 0);
}
```

최초에 reduce에 초기값을 안넣고 돌렸을때 테스트 케이스 20번에서 실패가 나왔다. 고민을 해봤을때 한자리 수를 넣었을때 다음 값이 없을때 더 하는게 없어 초기값을 0을 넣어줘야되겠다고 판단하여 넣었더니 통과했다.

<br>
<br>
<br>
<br>
<br>
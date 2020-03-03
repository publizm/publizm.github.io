---
title: 알고리즘 이론 연습(재귀용법)
date: "2020-01-18"
template: "post"
draft: false
slug: "/posts/algorithm/recursive_call"
category: "algorithm"
tags:
  - "algorithm"
  - "recursive_call"
description: "알고리즘 공부하기"
---
<span class="notice">
  <em>좀 더 좋은 방법이 있다면 댓글로 공유 부탁드립니다.</em>
</span>

## 재귀 용법이란?
- 함수 안에서 동일한 함수를 호출하는 형태
- 주로, 재귀호출하며 함수의 인수에 숫자를 줄여준다든지, 배열의 길이를 줄인다는지의 방법을 사용하여 원하는 결과값을 도출

<br>

### 연습 1
1부터 num까지의 곱이 출력되게 만들어라

### 풀이

``` javascript
function multiple(num) {
  // 반복문을 활용한 방법
  // let result = 1;
  // for (let i = num; i > 0; i--) {
  //   result *= i;
  // }
  // return result;

  // 재귀함수 활용
  if (num > 1) return num * multiple(num - 1);
  return num;
}

console.log(multiple(10));
```

<br>

### 연습 2
숫자가 들어 있는 배열이 주어졌을때, 배열의 합을 리턴하는 함수를 만들어라

``` javascript
// 중복없는 난수 배열 만드는 함수
function randomArray(array, length) {
  const n = Math.floor(Math.random() * (length * 2)) + 1;

  if (array.length < length) {
    if (array.indexOf(n) < 0) array.push(n);
    return randomArray(array, length);
  } else {
    return array;
  }
}

function sum(arr) {
  if (arr.length > 1) return arr[0] + sum(arr.slice(1));
  return arr[0];
}

console.log(sum(randomArray([], 10)));
```

<br>

### 연습 3
순서를 거꾸로 읽어도 제대로 읽는 것과 같은 단어와 문장(회문)을 판별할 수 있는 함수를 만들어라

예시<br>
MOTOR(X), LEVEL(O)

``` javascript
function palindrome(str) {
  if (str.length <= 1) return true;
  if (str[0] === str[str.length - 1]) return palindrome(str.slice(1, -1));
  return false;
}

console.log(palindrome('level'));
```

<br>

### 연습 4
정수 n에 대해 n이 홀수이면 3 x n + 1을 하고, 짝수이면 n을 2로 나눠 n이 1이 될 때까지 반복한다.<br>
위의 과정에 n이 1이 되는 과정을 모두 출력하는 함수를 만들어라

``` javascript
function processing(n) {
  console.log(n);

  if (n === 1) return n;

  if (n % 2) return processing(3 * n + 1);
  else return processing(n / 2);
}

processing(3);
```

<br>
<br>
<br>
<br>
<br>
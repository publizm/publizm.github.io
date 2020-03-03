---
title: Counter
date: "2019-11-05"
template: "post"
draft: false
slug: "/posts/practice/Counter"
category: "Practice"
tags:
  - "Counter"
description: "counter를 연습해보자"
---
<span class="notice">
  <em>좀 더 좋은 방법이 있다면 댓글로 공유 부탁드립니다.</em>
</span>

![counter](/images/practice/counter.gif "counter")

**요구 사항**<br>
최소값은 0이다. 즉, 0과 양수만으로 카운트한다..
<br>

``` html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Counter</title>
  <style>
    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 130px;
      margin: 20px auto;
      font-size: 24px;
      color: #3f51b5;
    }

    button {
      padding: 5px 10px;
      font-size: 24px;
      border-radius: 5px;
      color: #3f51b5;
      border-color: #3f51b5;
      outline: none;
      cursor: pointer;
    }

    .counter {
      width: 50px;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <button class="increase">+</button>
    <div class="counter">0</div>
    <button class="decrease">-</button>
  </div>

  <script>
    const $increase = document.querySelector('.increase');
    const $decrease = document.querySelector('.decrease');

    const counter = (function () {
      let number = 0;
      let $counter = document.querySelector('.counter');

      return {
        increase() {
          number++;
          $counter.textContent = number;
        },

        decrease() {
          if (!number) return;
          number--;
          $counter.textContent = number;
        }
      }
    }());

    $increase.onclick = () => {
      counter.increase();
    };

    $decrease.onclick = () => {
      counter.decrease();
    };
  </script>
</body>
</html>
```

<br>
<br>
<br>
<br>
<br>
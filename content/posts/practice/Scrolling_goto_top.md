---
title: Scrolling goto top
date: "2019-11-06"
template: "post"
draft: false
slug: "/posts/practice/Scrollinggototop"
category: "Practice"
tags:
  - "Scrolling goto top"
description: "Scroll goto top을 연습해보자"
---
<span class="notice">
  <em>좀 더 좋은 방법이 있다면 댓글로 공유 부탁드립니다.</em>
</span>

![Scrolling goto top](/images/practice/scrolling-goto-top.gif "Scrolling goto top")

<br>

``` html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>scrolling-goto-top</title>
  <style>
    @import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400);
    @import url(https://use.fontawesome.com/releases/v5.5.0/css/all.css);

    body {
      font-family: 'Open Sans';
      font-weight: 300;
      background-color: #d6e1e5;
    }

    h1 {
      font-weight: 300;
      text-align: center;
      color: #dB5b33;
    }

    .scoll-icon {
      display: none;
      position: fixed;
      left: 50%;
      bottom: 20px;
      font-size: 36px;
      cursor: pointer;
      animation: glow 4s infinite;
    }

    @keyframes glow {
      0% {
        opacity: 1;
      }

      50% {
        opacity: 0.3;
        transform: translateY(10px);
      }
    }
  </style>
</head>
<body>
  <h1>JavaScript Scrolling goto top</h1>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
  </p>
  .
  .
  .

  <div class="scoll-icon fa fa-angle-double-up"></div>

  <script>
    const $topButton = document.querySelector('.scoll-icon');

    window.onscroll = () => {
      window.scrollY > 0 ? $topButton.style.display = 'block' : $topButton.style.display = 'none';
    };

    $topButton.onclick = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
---
title: Toggle side nav
date: "2019-11-06"
template: "post"
draft: false
slug: "/posts/practice/Togglesidenav"
category: "Practice"
tags:
  - "ToggleSideNav"
description: "ToggleSideNav 연습해보자"
---
<span class="notice">
  <em>좀 더 좋은 방법이 있다면 댓글로 공유 부탁드립니다.</em>
</span>

![Toggle Nav](/images/practice/toggle-side-nav.gif "Toggle Nav")

**요구 사항**<br>
자바스크립트를 사용하여 버튼이 클릭되었을 때 사이드 내비게이션이 토글되도록 구현한다.

<br>

``` html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Toggle side nav</title>
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css">
  <style>
    html, body {
      height: 100%;
      margin: 0;
    }

    .container {
      position: relative;
      overflow-x: hidden;
      width: 100%;
      height: 100%;
    }

    .main, .side-nav {
      position: absolute;
      top: 0;
      height: 100%;
      transition: transform 0.8s;
    }

    .main {
      left: 0;
      width: 100%;
      background: antiquewhite;
    }

    .side-nav {
      left: -300px;
      width: 300px;
      background: rebeccapurple;
    }

    .active > .main,
    .active > .side-nav {
      transform: translate3d(300px, 0, 0);
    }

    .toggle {
      font-size: 2em;
      color: maroon;
      margin: 10px;
      cursor: pointer;
      transition: transform 0.5s;
    }

    .active .toggle {
      transform: rotate(180deg);
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="side-nav"></div>
    <div class="main">
      <i class="toggle fas fa-arrow-circle-right"></i>
    </div>
  </div>
  <script>
    const $container = document.querySelector('.container');
    const $navBtn = document.querySelector('.toggle');

    $navBtn.onclick = () => $container.classList.toggle('active');
  </script>
</body>
</html>
```

<br>
<br>
<br>
<br>
<br>
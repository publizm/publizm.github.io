---
title: Toggle Display
date: "2019-11-06"
template: "post"
draft: false
slug: "/posts/practice/Toggledisplay"
category: "Practice"
tags:
  - "Toggle Display"
description: "Toggle Display 연습해보자"
---
<span class="notice">
  <em>좀 더 좋은 방법이 있다면 댓글로 공유 부탁드립니다.</em>
</span>

![Toggle display](/images/practice/toggle-button.gif "Toggle display")

**요구 사항**<br>
Light/Dark 상태(true: Light / false: Dark)를 서버로부터 가져온다고 가정한다.

<br>

``` html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Light / Dark Mode - Toggle button</title>
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400" rel="stylesheet">
  <link href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" rel="stylesheet">
  <style>
    body {
      font-family: 'Open Sans';
      font-weight: 300;
    }

    body.dark {
      background: #232323;
    }

    .title {
      color: #db5b33;
      font-weight: 300;
      text-align: center;
    }

    .toggle-button {
      position: relative;
      width: 100px;
      height: 50px;
      margin: 0 auto;
    }

    /* 토글 버튼 내부의 원 */
    .toggle-button .toggle-button-switch {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 46px;
      height: 46px;
      background-color: #fff;
      border-radius: 100%;
      cursor: pointer;
      z-index: 100;
      transition: transform 0.3s;
    }

    /* 토글 버튼의 바탕 */
    .toggle-button .toggle-button-text {
      overflow: hidden;
      background-color: #3dbf87;
      border-radius: 25px;
      box-shadow: 2px 2px 5px 0 rgba(50, 50, 50, 0.75);
      transition: background-color 0.3s;
    }

    .dark .toggle-button .toggle-button-switch {
      transform: translateX(calc(100% + 4px));
    }

    .dark .toggle-button .toggle-button-text {
      background: #fc3164;
    }

    /* 토글 버튼의 텍스트 */
    .toggle-button .toggle-button-text-on,
    .toggle-button .toggle-button-text-off {
      float: left;
      width: 50%;
      height: 100%;
      line-height: 50px;
      font-family: Lato, sans-serif;
      font-weight: bold;
      color: #fff;
      text-align: center;
    }
  </style>
</head>
<body>
  <h1 class="title">Light / Dark Mode - Toggle Button</h1>

  <div class="toggle-button">
    <div class="toggle-button-switch"></div>
    <div class="toggle-button-text">
      <div class="toggle-button-text-on"><i class="far fa-sun fa-lg"></i></div>
      <div class="toggle-button-text-off"><i class="far fa-moon fa-lg"></i></div>
    </div>
  </div>

  <script>
    let mode = true;

    const $body = document.querySelector('body');
    const $toggleButton = document.querySelector('.toggle-button');

    $toggleButton.onclick = () => {
      mode = !mode;
      $body.classList.toggle('dark', !mode);
    };

    window.onload = () => $body.classList.toggle('dark', !mode);
  </script>
</body>
</html>
```

<br>
<br>
<br>
<br>
<br>
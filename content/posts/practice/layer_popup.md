---
title: Layer Popup
date: "2019-11-06"
template: "post"
draft: false
slug: "/posts/practice/LayerPopup"
category: "Practice"
tags:
  - "Layer Popup"
description: "Layer Popup을 연습해보자"
---
<span class="notice">
  <em>좀 더 좋은 방법이 있다면 댓글로 공유 부탁드립니다.</em>
</span>

![popup ui](/images/practice/popup-ui.gif "popup ui")

<br>

``` html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Popup</title>
  <style>
    @import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400);

    body {
      font-family: 'Open Sans';
      font-weight: 300;
      background-color: #D6E1E5;
    }

    h1 {
      color: #db5b33;
      font-weight: 300;
      text-align: center;
    }

    /* CSS 작성 바랍니다. */
    .popup {
      display: none;
      position: fixed;
      top: 50%;
      left: 50%;
      z-index: 2;
      padding: 20px;
      background: #ffffff;
      box-shadow: 0 0 10px 5px rgba(0, 0, 0, .3);
      transform: translate(-50%, -50%);
    }

    .popup.open {
      display: block;
    }

    .popup input {
      height: 20px;
      border: 1px solid #cccccc;
    }

    .btn-close {
      position: absolute;
      top: 20px;
      right: 20px;
      border: none;
      background: none;
      font-size: 18px;
    }

    .overlay {
      display: none;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1;
      background: rgba(0, 0, 0, .3);
    }

    .overlay.open {
      display: block;
    }
  </style>
</head>
<body>
  <h1>JavaScript Popup</h1>

  <div class="popup">
    <h1>JavaScript Popup</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
    <button class="btn-close">X</button>
    <input type="text">
    <button class="btn-ok">OK</button>
    <button class="btn-cancel">Cancel</button>
  </div>
  <div class="overlay"></div>

  <button class="toggle-popup">show popup</button>

  <p class="popup-message"></p>
  <script>
    const $toggle = document.querySelector('.toggle-popup');
    const $popup = document.querySelector('.popup');
    const $popupInput = document.querySelector('.popup > input');
    const $overlay = document.querySelector('.overlay');
    const $message = document.querySelector('.popup-message');

    const addMessage = content => {
      $message.textContent = content;
    };

    const popupOpen = () => {
      $popup.classList.add('open');
      $overlay.classList.add('open');
    };

    const popupClose = () => {
      $popup.classList.remove('open');
      $overlay.classList.remove('open');
    };

    // Event
    $toggle.onclick = () => {
      popupOpen();
    };

    $popupInput.onkeyup = ({ target, keyCode }) => {
      const content = target.value.trim();
      if (content === '' || keyCode !== 13) return;

      addMessage(content);

      target.value = '';
      popupClose();
    };

    $popup.onclick = ({ target }) => {
      const classList = target.classList;

      if (classList.contains('btn-cancel') || classList.contains('btn-close')) {
        popupClose();
      } else if (classList.contains('btn-ok')) {
        const content = $popupInput.value.trim();
        if (content === '') return alert('입력하세요');

        addMessage(content);
        $popupInput.value = '';
      }
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
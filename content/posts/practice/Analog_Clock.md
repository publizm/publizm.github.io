---
title: Analog Clock
date: "2019-11-06"
template: "post"
draft: false
slug: "/posts/practice/AnalogClock"
category: "Practice"
tags:
  - "Analog Clock"
description: "Analog Clock 연습해보자"
---
<span class="notice">
  <em>좀 더 좋은 방법이 있다면 댓글로 공유 부탁드립니다.</em>
</span>

![Analog Clock](/images/practice/analog-clock.gif "Analog Clock")

**요구 사항**<br>
현재 시간을 표시하여야 한다.

<br>

``` html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Analog Clock</title>
  <style>
    @import url('https://fonts.googleapis.com/css?family=Source+Code+Pro');

    .analog-clock {
      position: relative;
      margin: 100px auto 0;
      width: 200px;
      height: 200px;
      background-color: aliceblue;
      border-radius: 50%;
    }

    .hand {
      position: absolute;
      left: 50%;
      width: 1px;
      height: 100px;
      transform-origin: 100% 100%;
    }

    .hour {
      top: 50%;
      background-color: #f44336;
      height: 70px;
      margin: -70px 0 0;
    }

    .minute {
      background-color: #3f51b5;
    }

    .second {
      background-color: #9e9e9e;
    }

    .center-circle {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      width: 12px;
      height: 12px;
      background-color: black;
      border-radius: 50%;
    }

    .digital-clock {
      position: absolute;
      top: 350px;
      left: 50%;
      transform: translate3d(-50%, 0, 0);
      font-size: 2em;
      font-family: 'Source Code Pro', monospace;
    }
  </style>
</head>
<body>
  <div class="clock">
    <div class="analog-clock">
      <div class="hour hand"></div>
      <div class="minute hand"></div>
      <div class="second hand"></div>
      <div class="center-circle"></div>
    </div>
    <div class="digital-clock"></div>
  </div>

  <script>

    // ①
    // const $digital = document.querySelector('.digital-clock');
    // const $hour = document.querySelector('.hour');
    // const $minute = document.querySelector('.minute');
    // const $second = document.querySelector('.second');
    // let secondAng = null;
    // let minuteAng = null;
    // let hourAng = null;


    // const render = () => {
    //   const date = new Date();
    //   secondAng = date.getSeconds() * 6;
    //   minuteAng = date.getMinutes() * 6;
    //   hourAng = date.getHours() * 30;

    //   $digital.textContent = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()}`;

    //   $second.style.transform = `rotate(${secondAng}deg)`;
    //   $minute.style.transform = `rotate(${minuteAng}deg)`;
    //   $hour.style.transform = `rotate(${hourAng}deg)`;
    // };

    // setInterval(function () {
    //   render();
    // }, 10);

    // ②
    const date = new Date();
    let second = date.getSeconds();
    let minute = date.getMinutes();
    let hour = date.getHours();

    const $digital = document.querySelector('.digital-clock');
    const $hour = document.querySelector('.hour');
    const $minute = document.querySelector('.minute');
    const $second = document.querySelector('.second');

    const print = () => {
      $second.style.transform = `rotate(${second * 6}deg)`;
      $minute.style.transform = `rotate(${minute * 6}deg)`;
      $hour.style.transform = `rotate(${hour * 30}deg)`;

      $digital.textContent = `${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}:${second < 10 ? '0' + second : second}`;
    };

    const currentTime = () => {
      second += 1;

      if (second > 60) {
        second = 0;
        minute += 1;
        if (minute > 60) {
          minute = 0;
          hour += 1;
          if (hour > 23) {
            hour = 0;
          }
        }
      }
      print();
    };

    const render = () => {
      setInterval(() => {
        currentTime();
      }, 1000);
    };

    window.onload = () => {
      print();
      render();
    };
  </script>
</body>
</html>
```

① 메모리를 계속 사용해서 퍼포먼스가 안 좋다고 판단하였다.<br>
② 최초 render만 현재 시간을 불러와서 setInterval을 이용하여 조작하였다.

<br>
<br>
<br>
<br>
<br>
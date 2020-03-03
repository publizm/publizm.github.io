---
title: Stop Watch
date: "2019-11-06"
template: "post"
draft: false
slug: "/posts/practice/StopWatch"
category: "Practice"
tags:
  - "Stop Watch"
description: "Stop Watch 연습해보자"
---
<span class="notice">
  <em>좀 더 좋은 방법이 있다면 댓글로 공유 부탁드립니다.</em>
</span>

![Stop Watch](/images/practice/stop-watch.gif "Stop Watch")

**요구 사항**<br>
버튼을 처음 클릭하면 스톱워치가 시작하고 버튼을 다시 클릭하면 일시 정지와 시작을 반복한다.

<br>

``` html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Stop watch</title>
  <style>
    @import url('https://fonts.googleapis.com/css?family=Source+Code+Pro');

    .stop-watch {
      font-family: 'Source Code Pro', monospace;
      text-align: center;
      font-size: 3em;
      padding: 30px;
    }

    .control {
      width: 300px;
      padding: 5px;
      margin-top: 15px;
      font-size: 36px;
      font-weight: bold;
      border: 2px solid #f44336;
      border-radius: 4px;
      cursor: pointer;
      outline: none;
    }

    .control:focus {
      background: #f44336;
      color: aliceblue;
    }
  </style>
  <title>Stop watch</title>
</head>
<body>
  <div class="stop-watch">
    <div class="display">00:00:00</div>
    <button class="control">Start</button>
  </div>
  <script>
    const $display = document.querySelector('.display');
    const $button = document.querySelector('.control');
    let minute = 0;
    let second = 0;
    let miliSecond = 0;

    let flag = false;
    let run = null;

    const print = () => {
      $display.textContent = `${minute < 10 ? '0' + minute : minute}:${second < 10 ? '0' + second : second}:${miliSecond < 10 ? '0' + miliSecond : miliSecond}`
    };

    const addmiliSecond = () => {
      miliSecond += 1;

      if (miliSecond === 100) {
        miliSecond = 0;
        second += 1;

        if (second === 60) {
          second = 0;
          minute += 1;
        }
      }
      print();
    };

    $button.onclick = () => {
      flag = !flag;
      if (flag) {
        run = setInterval(function () {
          addmiliSecond();
        }, 10);
        $button.textContent = 'Stop';
      } else {
        clearInterval(run);
        $button.textContent = 'Start';
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
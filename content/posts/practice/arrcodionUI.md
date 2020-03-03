---
title: arrcodionUI
date: "2019-12-30"
template: "post"
draft: false
slug: "/posts/practice/arrcodionUI"
category: "Practice"
tags:
  - "arrcodionUI"
description: "arrcodionUI 연습해보자"
---
<span class="notice">
  <em>좀 더 좋은 방법이 있다면 댓글로 공유 부탁드립니다.</em>
</span>

![accordion-ui](/images/practice/accordion-ui.gif "accordion-ui")

**요구 사항**<br>

1. 대상 요소의 height는 알 수 없다. 하지만 어떤 height라도 동작해야 한다.
2. CSS animation/transition를 이용하여 슬라이드 효과를 구현한다.
3. CSS animation/transition은 적절한 타이밍을 유지해야 한다. 다시 말해 열고 닫히는 타이밍이 같아야 한다.
4. 라이브러리를 사용하지 않고 Vanilla javascript로 구현한다.

<br>

``` html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>Accordion Menu</title>
  <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
  <link href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" rel="stylesheet">

  <style>
    *, *:before, *:after {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html, body {
      height: 100%;
    }

    body {
      background-image: linear-gradient(20deg, #08aeea 0%, #2af598 100%);
      font-family: 'Open Sans', Arial, Helvetica, Sans-serif, Verdana, Tahoma;
    }

    ul {
      list-style-type: none;
    }

    h1 {
      color: #fff;
      font-size: 2.5rem;
      text-align: center;
      padding: 50px 0;
    }

    .accordion {
      width: 100%;
      max-width: 360px;
      margin: 0 auto 50px;
      background: #fff;
      border-radius: 4px;
    }


    .accordion:last-child {
      margin-bottom: 0;
    }

    .accordion .menu {
      position: relative;
      padding: 15px 15px 15px 45px;
      color: #4d4d4d;
      font-weight: bold;
      border-bottom: 1px solid #ccc;
      cursor: pointer;
      transition: all 0.4s ease;
    }

    .accordion li:last-child .menu {
      border-bottom: 0;
    }

    .accordion li i {
      position: absolute;
      top: 1.2rem;
      left: 1rem;
      color: #595959;
      transition: all 0.4s ease;
    }

    .accordion li i.fa-chevron-down {
      right: 1rem;
      left: auto;
    }

    .accordion li.active i.fa-chevron-down {
      transform: rotate(180deg);
    }

    .accordion li.active .menu {
      color: #b63b4d;
    }

    .accordion li.active i {
      color: #b63b4d;
    }

    .submenu {
      height: 0;
      overflow: hidden;
      background: #444359;
      font-size: 14px;
      transition: height 0.4s ease;
    }

    .submenu li {
      border-bottom: 1px solid #4b4a5e;
    }

    .accordion li:last-child .submenu {
      border-radius: 0 0 4px 4px;
    }

    .accordion li:last-child .submenu li:last-child {
      border-bottom: 0;
    }

    .submenu a {
      display: block;
      text-decoration: none;
      color: #d9d9d9;
      padding: 12px;
      padding-left: 42px;
      transition: all 0.25s ease-in-out;
    }

    .submenu a:hover {
      background: #b63b4d;
      color: #fff;
    }
  </style>
</head>

<body>
  <h1>Accordion Menu</h1>

  <ul id="accordion" class="accordion">
    <li class="active">
      <div class="menu"><i class="fa fa-code"></i>Front-end<i class="fa fa-chevron-down"></i></div>
      <ul class="submenu">
        <li><a href="#">HTML</a></li>
        <li><a href="#">CSS</a></li>
        <li><a href="#">Javascript</a></li>
      </ul>
    </li>
    <li>
      <div class="menu"><i class="fa fa-mobile"></i>Responsive web<i class="fa fa-chevron-down"></i></div>
      <ul class="submenu">
        <li><a href="#">Tablets</a></li>
        <li><a href="#">Mobiles</a></li>
        <li><a href="#">Desktop</a></li>
      </ul>
    </li>
    <li>
      <div class="menu"><i class="fa fa-globe"></i>Web Browser<i class="fa fa-chevron-down"></i></div>
      <ul class="submenu">
        <li><a href="#">Chrome</a></li>
        <li><a href="#">Firefox</a></li>
        <li><a href="#">Safari</a></li>
      </ul>
    </li>
  </ul>

  <ul id="accordion2" class="accordion">
    <li class="active">
      <div class="menu"><i class="fa fa-code"></i>Front-end<i class="fa fa-chevron-down"></i></div>
      <ul class="submenu">
        <li><a href="#">HTML</a></li>
        <li><a href="#">CSS</a></li>
        <li><a href="#">Javascript</a></li>
      </ul>
    </li>
    <li>
      <div class="menu"><i class="fa fa-mobile"></i>Responsive web<i class="fa fa-chevron-down"></i></div>
      <ul class="submenu">
        <li><a href="#">Tablets</a></li>
        <li><a href="#">Mobiles</a></li>
        <li><a href="#">Desktop</a></li>
      </ul>
    </li>
    <li>
      <div class="menu"><i class="fa fa-globe"></i>Web Browser<i class="fa fa-chevron-down"></i></div>
      <ul class="submenu">
        <li><a href="#">Chrome</a></li>
        <li><a href="#">Firefox</a></li>
        <li><a href="#">Safari</a></li>
      </ul>
    </li>
  </ul>
</body>
<script>
  class Accordion {
    constructor(options) {
      this.config = Accordion.mergeConfig(options);
      this.$accordion = document.querySelector(this.config.selector);
    }

    static mergeConfig(options) {
      // 기본 옵션
      const config = {
        selector: '#accordion',
        multi: true
      };

      return { ...config, ...options };
    }

    onInit(thisArccordion) {
      const activeArr = thisArccordion.querySelectorAll('.active');
      if (activeArr.length) {
        activeArr.forEach(elem => {
          const $submenu = elem.querySelector('.submenu');
          $submenu.style.height = $submenu.scrollHeight +'px';
        });
      }
    }

    onClick(e, $ul) {
      if (!e.target.classList.contains('menu')) return;

      const $target = e.target;
      const $li = $target.parentNode;
      const $submenu = $li.querySelector('.submenu');

      if (this.config.multi) {
        $li.classList.toggle('active');
        $submenu.style.height = $li.classList.contains('active') ? $submenu.scrollHeight + 'px' : '0';
      } else {
        [...$ul.children].forEach(elem => {
          elem.classList.remove('active');
          elem.querySelector('.submenu').style.height = 0;
        });

        $li.classList.toggle('active');
        $submenu.style.height = $submenu.scrollHeight + 'px';
      }
    }
  }

  window.onload = function () {
    const accordion = new Accordion({ selector: '#accordion', multi: true });
    const accordion2 = new Accordion({ selector: '#accordion2', multi: false });

    accordion.onInit(accordion.$accordion);
    accordion2.onInit(accordion2.$accordion);

    accordion.$accordion.addEventListener('click', function (e) {
      accordion.onClick(e, accordion.$accordion)
    });

    accordion2.$accordion.addEventListener('click', function (e) {
      accordion2.onClick(e, accordion2.$accordion)
    });
  };
</script>
</html>
```

![accordion-ui-complete](/images/practice/accordion-ui-complete.jpg "accordion-ui-complete")

기능구현은 완료했으나 뭔가 코드를 더 줄일 수 있을 것 같다.

<br>
<br>
<br>
<br>
<br>
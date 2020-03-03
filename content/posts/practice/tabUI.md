---
title: tab UI
date: "2019-11-07"
template: "post"
draft: false
slug: "/posts/practice/tabUI"
category: "Practice"
tags:
  - "tab UI"
description: "tab UI 연습해보자"
---
<span class="notice">
  <em>좀 더 좋은 방법이 있다면 댓글로 공유 부탁드립니다.</em>
</span>

![tab UI](/images/practice/tabs-ui.gif "tab UI")

**요구 사항**<br>
- 탭을 구성하는 데이터를 전달해 Tabs UI를 생성한다.
- 라이브러리를 사용하지 않고 Vanilla javascript로 구현한다.
- ES6의 class로 구현한다.

<br>

``` html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700" rel="stylesheet">
  <link href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" rel="stylesheet">
  <title>Tabs</title>
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
      font-family: 'Open Sans', Sans-serif;
    }

    .tabs {
      min-width: 320px;
      max-width: 800px;
      padding: 50px;
      margin: 50px auto;
      background: #fff;
      border-radius: 4px;
    }

    .tab {
      display: inline-block;
      margin: 0 0 -1px;
      padding: 15px 25px;
      text-align: center;
      color: #555;
      border: 1px solid transparent;
      cursor: pointer;
    }

    .icon {
      margin-right: 10px;
    }

    .tab.active {
      border: 1px solid #ddd;
      border-top: 2px solid #f44336;
      border-bottom: 1px solid #fff;
    }

    .tab-content {
      padding: 20px;
      border: 1px solid #ddd;
      line-height: 1.6rem;
    }
  </style>
</head>
<body>
  <div class="tabs">
    <!--
    <ul class="tab-group">
      <li id="1" class="tab active">
        <i class="icon fab fa-html5"></i>HTML
      </li>
      <li id="2" class="tab">
        <i class="icon fab fa-css3"></i>CSS
      </li>
      <li id="3" class="tab">
        <i class="icon fab fa-js-square"></i>JavaScript
      </li>
    </ul>
    <div class="tab-content-group">
      <div class="tab-content">
        <strong>HTML(HyperText Markup Language)</strong> is the most basic building block of the Web.
        It describes and defines the content of a webpage along with the basic layout of the webpage.
        Other technologies besides HTML are generally used to describe a web page's
        appearance/presentation(CSS) or functionality/ behavior(JavaScript).
      </div>
    </div>
    -->
  </div>
  <script>
  class Tab {
    constructor(tabsData) {
      this.tabsData = tabsData;
      this.tabState = 1; // tab id
      this.$tabs = document.querySelector('.tabs');
    }

    render() {
      this.$tabs.innerHTML = `
        <ul class="tab-group"></ul>
        <div class="tab-content-group"></div>`;

      const $ul = document.querySelector('.tabs ul');
      const $content = document.querySelector('.tabs .tab-content-group');

      this.tabsData.forEach(({ id, title, iconClass, content }) => {
        $ul.innerHTML += `
          <li id="${id}" class="tab ${this.tabState === id ? 'active' : ''}">
            <i class="icon fab fa-${iconClass}"></i>${title}
          </li>`;
      });

      // ①
      // const content = this.tabsData.filter(data => data.id === this.tabState);

      // $content.innerHTML += `
      //   <div class="tab-content">
      //     <div>${content[0].content}</div>
      //   </div>`;
    }

    changeContent(id) {
      this.tabState = +id;
      this.render();
    }
  }

  window.onload = function () {
    const tab = new Tab([
      {
        id: 1,
        title: 'HTML',
        iconClass: 'fab fa-html5',
        content: `<strong>HTML(HyperText Markup Language)</strong> is the most basic building block of the Web.
          It describes and defines the content of a webpage along with the basic layout of the webpage.
          Other technologies besides HTML are generally used to describe a web page's
          appearance/presentation(CSS) or functionality/ behavior(JavaScript).`
      },
      {
        id: 2,
        title: 'CSS',
        iconClass: 'fab fa-css3',
        content: `<strong>Cascading Style Sheets(CSS)</strong> is a stylesheet language used to describe
          the presentation of a document written in HTML or XML (including XML dialects
          such as SVG, MathML or XHTML). CSS describes how elements should be rendered on screen,
          on paper, in speech, or on other media.`
      },
      {
        id: 3,
        title: 'JavaScript',
        iconClass: 'fab fa-js-square',
        content: `<strong>JavaScript(JS)</strong> is a lightweight interpreted or JIT-compiled programming
          language with first-class functions. While it is most well-known as the scripting
          language for Web pages, many non-browser environments also use it, such as Node.js,
          Apache CouchDB and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm,
          dynamic language, supporting object-oriented, imperative, and declarative
          (e.g. functional programming) styles.`
      }
    ]);

    tab.render();

    tab.$tabs.onclick = ({ target }) => {
      if (!target.classList.contains('tab')) return;

      tab.changeContent(target.id);
    };
  };
  </script>
</body>
</html>
```

<br>

### ① 수정
``` javascript
const content = this.tabsData.filter(data => data.id === this.tabState);

$content.innerHTML += `
  <div class="tab-content">
    <div>${content[0].content}</div>
  </div>`;
```

content 변수안에는 [{...}] 이런식으로 배열안에 객체가 들어 있다.
실질적으로 filter로 state와 맞는 콘텐츠는 하나만 필터링이 되는데
innerHTMl 들어가는 content text가 content[0], 이런식으로 배열안에 인덱스 값을 찾고난 후
그 요소 안에 객체를 접근하는 방식이 읽기 어려운 코드로 만드는 것 같았다.

<br>

**수정내용**
일단 Tab 클래스안에 요소를 가공해줄 static 메소드를 생성했다.

``` javascript
static filter(current) {
  return current.content;
}
```

그리고 이전 innerHtml 할당 방식을

``` javascript
$content.innerHTML += `
  <div class="tab-content">
    <div>${Tab.filter(...currentContent)}</div>
  </div>`;
```

이런식으로 스프레드문법로 풀어서 인수로 전달한 값을 static 메소드로 전달하여 값을 반환했다.

<br>
<br>
<br>
<br>
<br>
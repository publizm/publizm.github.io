---
title: About Javascript Attribute
date: "2019-09-29"
template: "post"
draft: false
slug: "/posts/javascript/async-defer"
category: "Javascript"
tags:
  - "Javascript"
  - "defer"
  - "async"
description: "attribute of javascript"
---
## Javascript의 async와 defer 속성

웹 브라우저는 **Html**을 랜더링하는 과정에서 **CSS** 또는 **Javascript**를 만나면 **동기**적으로 처리한다.
한마디로 웹 페이지를 읽는데있어서 해당 내용을 해석하고 실행되기전에는 이후에 나오는 내용을 처리 하지 않는다.
이부분은 화면의 랜더링 속도에 영향을 줄 수 있다.

**Javascript**의 경우 대부분 화면 출력과 관련되기 보다 화면에 출력된 요소를 기능적으로 처리하는 것에 관련된 경우가 많다.
웹앱 등의 경우 출력과 직접적인 관련이 있을 수 있으나 이 또한 기본적인 화면이 출력된 이후에 처리되는 것이 웹 페이지를 빠르게 랜더링하는데 유리하기 때문에 처리를 지연하는 것이 좋다.

일반적으로 사용할때

``` html
<html>
  <head>
      <link rel="stylesheet" href="css">
      <script src="script">
        // 작은 스크립트
      </script>
  </head>
  <body>
    <script src="script">
      // 외부 스크립트 혹은 큰 스크립트
    </script>
  </body>
</html>
```

위와 같이 **script**태그는 어디든지 배치될 수 있으며 **위에서 아래로 HTML 문서를 읽는 브라우저들의 특성**상 만약 **head**부분에 용량이 큰 **script**가 배치가 될 경우 페이지 렌더링이 시작되기 전에 head 태그에 배치된 스크립트가 다운로드되고, 파싱(Parsing)되고 실행되게 된다. 한마디로 용량이 큰 **script** 파일을 **head**부분에 배치하게 된다면 **body** 렌더링이 시작되기전에 스크립트 실행하는데 많은 시간을 할애 할 수 있다.
이러한 이유로 **body**의 마지막에 **script**를 배치하는 것을 추천한다.
**html** 페이지의 **body** 내용이 모두 렌더링된 후에 **script**를 다운받기 시작하니 사용자 관점에서 보이는 페이지 로딩시간을 줄일 수 있다.

<br>
<br>

## 일반적인 실행

<br>

![Standard Parsing IMG](/images/javascript/standard_parsing.jpg "standard_parsing")


<br>

기본적으로 **&lt;script&gt;**는 **인라인 코드**의 경우 즉시 해석되고 실행될 수 있지만 그렇지 않은 경우는 해당 파일을 가져올 때까지 **HTML**문서의 구문 분석을 **중단**한다.<br>
스크립트를 가져 와서 실행하기 위해 HTML 구문 분석이 **<u>일시 중지</u>**되므로 HTML이 화면에 출력되는 시간이 길어진다.


<br>
<br>

## async 속성을 추가한 경우의 실행

<br>

![async Parsing IMG](/images/javascript/async_parsing.jpg "async_parsing")

<br>

async 속성은 브라우저에 스크립트 파일이 비동기적으로 실행될 수 있음을 나타내기 위해 사용된다.<br>
**(이때 스크립트 파일은 외부에 위치한 스크립트 파일에서만 사용할 수 있다.)**
HTML 구문 분석기는 스크립트 태그에 도달한 지점에서 스크립트를 가져오고 실행하기 위해 Html parsing을 일시 중지 할 필요가 없다.<br>
따라서 HTML 구문 분석과 병행하여 스크립트를 가져온 후 스크립트가 **준비될때마다 즉시 실행을 한다** 그러므로 **실행의 순서가 중요한 스크립트들에 async를 사용할때는 유의해야한다.**

예를 들면

``` html
<html>
  <head>
    <script async src="long.js"></script>
    <script async src="short.js"></script>
  </head>
  <body>
    위와 같이 long.js와 short.js를 불러왔다고 가정하면
    일단 구문분석기는 html과 script를 같이 불러오게된다.
    이때 long.js 가 순서는 먼저 있지만, short.js가 더 빨리 준비가 되어서 실행이 되기때문에
    long.js와 short.js는 작성 순서대로 실행되지 않게 된다.
    그래서 실행의 순서가 주용한 스크립트들에 async를 사용할때 유의해야된다.
  </body>
</html>
```

**:bulb:Tips**<br>
HTML5 spec에 **asnyc=false**이 추가됬다.<br>
이는 속성 지정시 호출순서대로 실행되도록 하는 속성이다.<br>
**async속성의 default값은 true이다.**

<br>

##### :zap: 지원하는 브라우저 및 버전
<article class="browser-tbl">

|  **속성**  | ![chrome](/icons/chrome.jpg "chrome") | ![ie edge](/icons/edge.jpg "ie edge") | ![ie](/icons/ie.jpg "ie") | ![firefox](/icons/firefox.jpg "firefox") | ![safari](/icons/safari.jpg "safari") | ![opera](/icons/opera.jpg "opera") |
| :---:  | :---: | :---: | :---: | :---: | :---: | :---: |
| __[async]__ | 1.0~ | O | 10.0~ | O | O | O |

</article>

<br>
<br>

## defer 속성을 추가한 경우의 실행

<br>

![defer Parsing IMG](/images/javascript/defer_parsing.jpg "defer_parsing")

<br>

defer 속성은 HTML 구문 분석이 완전히 완료되면 스크립트 파일을 실행하도록 지시하기위해 사용한다.<br>
**async** 속성과 같이 HTML 구문분석이 실행되는 동안 파일을 다운로드 한다.<br>
이는 **async** 속성과 동일하나 **defer** 속성은 HTML 구문분석이 완료되기 전에 스크립트 다운로드가 완료 되더라도 **구문분석이 완료될때까지 스크립트를 실행하지 않는다는 점**, **호출순서대로 실행된다는 점**에서 차이점이 있다.<br>

<br>

예를 들면

``` html
<html>
  <head>
    <script defer src="long.js"></script>
    <script defer src="short.js"></script>
  </head>
  <body>
    위와 같이 long.js와 short.js를 불러왔다고 가정하면
    일단 구문분석기는 html과 script를 같이 불러오게된다.
    이때 async 속성은 호출순서와는 상관없이 빨리 다운로드가 완료된 short.js가 먼저 실행되었지만,
    defer 속성은 다운로드가 short.js가 먼저 되었다하더라도 호출순서가 더 빠른 long.js 먼저 실행하게 된다.
  </body>
</html>
```

<br>

##### :zap: 지원하는 브라우저 및 버전
<article class="browser-tbl">

|  **속성**  | ![chrome](/icons/chrome.jpg "chrome") | ![ie edge](/icons/edge.jpg "ie edge") | ![ie](/icons/ie.jpg "ie") | ![firefox](/icons/firefox.jpg "firefox") | ![safari](/icons/safari.jpg "safari") | ![opera](/icons/opera.jpg "opera") |
| :---:  | :---: | :---: | :---: | :---: | :---: | :---: |
| __[defer]__ | O | O | 10.0~ | 3.5~ | O | O |

</article>

<br>
<br>

## 언제 사용할 것인가?

일반적으로 스크립트 실행과 async, defer 속성을 결정하기 위해서는 몇가지 확인해야할 사항이 있다.
<br>
<br>

### 1. **&lt;script&gt;** 요소는 어디에 있는가?

**&lt;script&gt;**요소가 문서의 맨 끝(이를테면 &lt;/body&gt;)에 있지 않으면 스크립트의 비동기 및 지연 실행이 더 중요하다.<br>
HTML 구문분석기는 **&lt;html&gt;** 요소부터 닫히는데까지 순서대로 파싱되는데 외부 소스 Javascript 파일이 닫는 &lt;/body&gt; 요소 바로 앞에 있다면, async 또는 defer 속성을 사용하는 것이 큰 효과가 없다.

<hr class="sub" />

### 2. 해당 스크립트가 종속성이 있는가?

다른 파일에 종속적이지 않거나 종속성 자체가 없는 스크립트 파일이라면 파일의 어느 지점에서 실행되는지 정확할 필요가 없기 때문에 async 속성이 유용하다.

<hr class="sub" />

### 3. 스크립트가 완전히 구문이 분석된 DOM에 의존하는가?
DOM과의 상호 작용이 필요한 기능이 포함되어 있거나 페이지에 포함된 다른 파일에 대한 종속성이 있을 수 있다. 이러한 경우 스크립트를 실행하기 전에 DOM을 완전히 해석해야 정삭적인 동작을 할 수 있는데, 일반적으로는 이렇게 DOM 조작을 하는 스크립트가 있는 파일은 &lt;/body&gt; 끝 부분에 DOM이 다 파싱된 후에 동작하도록 했었다. 그러나 javascirpt 파일을 다른 위치에 배치를 해야되는 상황이 있다면 defer 속성을 사용하여 해결 할 수 있다.

<br>
<br>
<br>
<br>
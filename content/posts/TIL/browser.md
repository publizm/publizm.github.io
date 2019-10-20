---
title: 웹 브라우저는 어떻게 동작할까?
date: "2019-10-04"
template: "post"
draft: false
slug: "/posts/TIL/Browser"
category: "TIL"
tags:
  - "Browser"
description: "How a Browser works?"
---
<span class="notice">
  <em>TIL 이므로 잘못된 내용은 댓글 부탁드립니다</em>
</span>

## 웹 브라우저는 어떻게 동작할까?
> 우리가 흔히 사용하는 브라우저를 동작원리를 이해보자.

- 우리는 어느 사이트를 방문하기 위해 당연한 듯이 주소창에 홈페이지의 도메인(서버를 식별할 수 있는 서버의 이름)을 적는다.

- 사용자 컴퓨터의 브라우저(클라이언트)가 원하는 사이트의 서버에 데이터를 **인터넷을 통해** 요청(request)을 한다.

- 요청을 받은 서버는 데이터 패킷 단위로 쪼갠 파일을 **인터넷을 통해** 전달(response)한다.

- 브라우저는 렌더링 엔진을 이용해 메모리에 있는 데이터를 읽어드려서 브라우저가 코드를 이해하고 사용할 수 있는 구조로 만든다. 이를 파싱이라 한다.

<br>

__*그림으로 알아보자*__
![browser works](/images/til/browser_works.jpg "browser works")

<br>
<br>
<br>

## 서버로 받은 데이터를 클라이언트는 어떻게 처리할까?
> HTML과 CSS는 렌더링 엔진이 처리하고, Javascript는 자바스크립트 엔진이 처리한다.

__*그림으로 알아보자*__
![browser engine works](/images/til/browser_engine_works.jpg "browser engine works")

 - 브라우저는 서버로 부터 받은 패킷 데이터를 다운로드하여 읽어들인다.
 - 랜더링엔진에 HTML 파서가 HTML부터 파싱을 시작하는데, 위에서 아래로 읽어들인다.
 - HTML 문서를 읽는 도중에 link로 연결된 CSS를 발견하면 렌더링엔진에 CSS 파서가 CSS를 파싱을 시작한다. 이때 HTML DOM tree를 만드는 작업을 일시 중단한다.
 - 파싱중에 script 태그를 만나면, 다시 파싱과 DOM tree를 중단하고, JavaScript 엔진에게 렌더링 권한을 넘겨 load, parse 하고 Syntax tree를 만든 후에 바이트 코드로 변환하여 인터프리터를 통해 실행한다. 이때 DOM 수정 또는 CSS 수정이 있다면 Dom tree와 CSSOM tree를 수정해주고 결합하여 Render tree로 결합되어 화면에 painting한다. 자바스크립트의 실행이 완료되면 다시 HTML 파서로 제어 권한을 넘겨서 브라우저가 중지했던 시점부터 DOM 생성을 재개한다.
   - 자바스크립트 엔진의 파싱 과정
       - 자바스크립트엔진은 자바스크립트 소스코드를 토크나이저를 통해 **토크나이징(단순한 문자열인 소스 코드를 어휘 분석하여 의미를 갖는 코드의 최소 단위인 토큰들로 분리하는 것)**을 하게 된다.
       - 토크나이징을 진행한 코드를 파서를 통해 **파싱(토큰들의 집합을 구문 분석하는 것)을 하여 AST(Abstract Syntax Tree, 추상적 구문 트리)**를 생성한다.
       - 생성된 AST는 인터프리터가 실행할 수 있는 중간 코드인 **바이트 코드**로 변환되어 인터프리터에 의해 실행된다.
 - Script 태그의 위치에 따라 블로킹이 생겨 DOM 생성이 지연될수도 있다. HTML이 DOM객체로 변환되기 이전에 JavaScript가 실행되면 블로킹이된다. 따라서 Script태그 위치는 중요하다.
 - DOM tree, CSSOM tree가 만들어지면, 둘이 합쳐져 Render tree를 만들고, Render tree를 기반으로 painting이 시작되고 웹페이지가 표시된다.

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

<div class="reference-site">

  **참고한 사이트**<br>

  [https://poiemaweb.com](https://poiemaweb.com)

</div>
---
title: SPA란?
date: "2019-12-13"
template: "post"
draft: false
slug: "/posts/Etc/SPA"
category: "Etc"
tags:
  - "SPA(Single Page Application)"
description: "SPA(Single Page Application)를 알아보자"
---
<span class="notice">
  <em>TIL 이므로 잘못된 내용은 댓글 부탁드립니다</em>
</span>

<div id="toc">

**:link:  Table Of Contents**

- [SPA란](#spa란)
- [SPA의 단점](#spa의-단점)

</div>

## SPA란?
Single Page Application의 약자이다. 말 그대로, 페이지가 1개인 애플리케이션을 의미한다.

기존 전통적인 웹 애플리케이션은 여러 페이지로 구성되어 있었다. 유저가 어느 페이지를 요청할 때 마다 새로고침되고, 페이지를 로딩할 때 마다 서버로부터 리소스를 전달받아 파싱 후 렌더링했었다.

요즘 웹 애플리케이션은 제공되는 정보가 많기 때문에 속도적인 측면에서 문제가 있고, 이를 해소하기 위해 캐싱과 압축을 해서 서비스를 제공하는데 이는 퍼포먼스를 문제를 완벽하게 해소할 수 없어서 리액트와 같은 라이브러리 또는 프레임워크를 사용해서 뷰 렌더링을 유저의 브라우저가 담당하도록 하고, 애플리케이션을 브라우저에 로드한 다음 정말 필요한 데이터만 전달받아 보여주는 식으로 흘러가고 있다.

싱글페이지라고해서 화면이 한 종류 밖에 있는 것이 아니고, 페이지가 싱글이고 주소만 바뀌는 형태이다. 주소에 따라 뷰에 데이터를 필요한 화면을 렌더링 해주는 방식이다.

한마디로 SPA는 주소가 싱글이 아니라, 페이지가 싱글이고 주소만 바꾸는 형태이다.

## SPA의 단점
앱의 규모가 커지면 자바스크립트 파일 사이즈가 너무 커진다는 것이다. 왜냐하면 유저가 실제로 방문하지 않을수도 있는 페이지에의 렌더링 관련 스크립트도 불러오기 때문이다.

리액트 라우터같이 브라우저측에서 자바스크립트를 사용하여 라우트를 관리하는 것의 잠재적인 단점은, 자바스크립트를 실행하지 않는 일반 크롤러에선 페이지의 정보가 제대로 받아가지 못한다는 점이 있다. 때문에 구글, 네이버, 다음 등 검색엔진에 페이지가 검색결과에 잘 나타나지 않을 수 있어 SEO 측면에서 안 좋을 수 있다. 또, 자바스크립트가 실행될때까지 페이지가 비어있기 때문에, 아주 짧은 시간동안 흰 페이지가 그대로 노출될 수 있다는 단점이 있다.


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

  **Reference**<br>

  [야무9님의 Github](https://github.com/yamoo9/cj-olive-networks/wiki/%EC%A0%81%EC%9D%91%ED%98%95-%EC%9B%B9-%EB%94%94%EC%9E%90%EC%9D%B8-VS-%EB%B0%98%EC%9D%91%ED%98%95-%EC%9B%B9-%EB%94%94%EC%9E%90%EC%9D%B8)

</div>
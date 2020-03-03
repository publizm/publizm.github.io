---
title: React 프로젝트 만들기
date: "2019-12-11"
template: "post"
draft: false
slug: "/posts/react/setting"
category: "React"
tags:
  - "React"
description: "React 프로젝트 생성하는법에 대해 알아보자"
---
<span class="notice">
  <em>TIL 내용이므로 잘못된 내용은 댓글 부탁드립니다</em>
</span>

## 리액트 프로젝트 만들기
터미널 혹은 Git Bash에서 다음 명령어를 실행해보자

``` bash
$ npx create-react-app 생성할_프로젝트_디렉토리명
```

이때 디렉토리명으로 대문자는 사용이 안된다는 점을 주의하자.

해당 프로젝트 디렉토리명으로 디렉터리가 생기고 그 안에 리액트 프로젝트가 생성된다.

<br>

다음 리액트 프로젝트가 담긴 생성한 디렉토리로 이동해보자

``` bash
$ cd 생성된_프로젝트_디렉토리명
```

<br>

디렉토리에 이동 후 다음과 같은 명령어를 입력해보자

``` bash
$ npm start
```

<br>

위의 명령어를 치면 터미널 혹은 bash에 다음과 같은 화면이 노출된다.

![react npm start](/images/react/react_npm_start.jpg "react npm start")

명령어가 완료되면 다음과 같이 브라우저에 **localhost:3000** 이 자동으로 열리고, 다음과 같은 화면이 노출된다.


만약 위의 이미지와 같은 메시지가 나온 상태인데 페이지가 자동으로 열리지 않고 노출되지 않는다면 브라우저에서 직접 **localhost:3000** 을 입력하면 다음과 같은 화면이 보일 것이다


짜잔!!

![react create app](/images/react/create_view.jpg "react create app")


드디어 리액트의 세계로 빠질 준비가 되었다

<br>
<br>
<br>
<br>
---
title: React 환경변수 정의
date: "2019-12-13"
template: "post"
draft: false
slug: "/posts/react/env"
category: "React"
tags:
  - "env"
description: "React 프로젝트의 환경변수 설정에 대해 알아보자"
---
<span class="notice">
  <em>TIL 내용이므로 잘못된 내용은 댓글 부탁드립니다</em>
</span>

<div id="toc">

**:link:  Table Of Contents**

- [.env 파일](#env-파일)
- [환경변수 설정 규칙](#환경변수-설정-규칙)
  - [변수명은 반드시 ‘REACT＿APP­＿‘으로 시작되어야한다.](#변수명은-반드시-react＿app%C2%AD＿으로-시작되어야한다)
  - [.env 파일 결정 및 우선순위](#env-파일-결정-및-우선순위)
- [JS에서의 사용법](#js에서의-사용법)

</div>

## .env 파일
외부 파일(.env)에 환경변수를 정의하여 변수로 받아오는 이유는 보안과 유지보수에 용이하기 때문이다.

.env 파일은 프로젝트의 최상위 루트에 파일을 만들어놓는다.

## 환경변수 설정 규칙
<br>

### 변수명은 반드시 'REACT＿APP­＿'으로 시작되어야한다.
create-react-app에서는 보안이 필요한 환경변수의 유출을 미연에 방지하기 위해 REACT_APP_으로 시작되지 않는 환경변수는 무시한다.

<hr class="sub" />

### .env 파일 결정 및 우선순위
package.json의 script에 따라 불러오는 .env 파일이 결정된다. 왼쪽으로 갈수록 우선 순위가 높다.

- npm start: .env.development.local, .env.development, .env.local, .env
- npm run build: .env.production.local, .env.production, .env.local, .env
- npm test: .env.test.local, .env.test, .env

## JS에서의 사용법

<b>.js</b>

``` javascript
const params = {
  key: process.env.REACT_APP_지정한 변수,
}
```

process.env.REACT＿APP＿는 예약어이므로, 다른 이름은 사용하면 React가 인식하지 않는다.

process.env는 실행시 로드되기 때문에 .env의 설정을 바꾸게 되면 React 프로젝트를 다시 구동해야된다.

<b>.env</b>

``` code
REACT_APP_지정할 변수=값
```

다른방법으로는 npm start할때 사용하는 방법도 있다.(참고)

``` bash
($env:REACT_APP_지정할 변수 = 값) -and (npm start)
```
이 방법은 npm start할때 함께 선언해줘야되는데 여러개를 선언할때는 (,)로 구분할 수 있다.

매번 npm start할때 선언해주므로 번거로움이 있어 .env 파일을 설정할 수 없을때 사용하도록 하자

<br>
<br>
<br>
<br>
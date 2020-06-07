---
title: 쿠키와 웹 스토리지
date: "2020-01-02"
template: "post"
draft: false
slug: "/posts/Etc/Cookie_Storage"
category: "Etc"
tags:
  - "쿠키와 웹 스토리지"
description: "쿠키와 웹 스토리지에 대해 알아보자"
---
<span class="notice">
  <em>TIL 이므로 잘못된 내용은 댓글 부탁드립니다</em>
</span>

<div id="toc">

**:link:  Table Of Contents**

- [쿠키](#쿠키)
  - [Seesion cookies](#seesion-cookies)
  - [Persistent cookie](#persistent-cookie)
  - [사용법](#사용법)
      - [setCookie 함수](#setcookie-함수)
      - [getCookie 함수](#getcookie-함수)
- [웹 스토리지](#웹-스토리지)
  - [로컬스토리지](#로컬스토리지)
  - [세션스토리지](#세션스토리지)
- [결론](#결론)

</div>

모두 클라이언트에 대한 정보를 저장하기 위해 사용한다.

## 쿠키

**쿠키는 다음과 같은 특징이 있다.**

1. 약 4KB의 적은 용량
2. 모든 HTTP 요청과 함께 서버 정보를 다시 전달한다. 서버로 데이터를 전송하기 때문에 만약 사용자의 정보가 쿠키에 저장된다면 서버에 사용자의 정보를 전달해주므로 쿠키는 사용자의 동의가 필요하다.
3. **만료기한이 있는 키-값**으로 이루어진 저장소이다.
5. **문자열**만 저장할 수 있다.

주로 쓰이는 곳은 유저가 검색한 것을 기억하거나 페이지 간 이동했을때 로그인 상태를 유지하는데에 사용되었다. 만약 **서버쪽 사용이 필수적이고 잦다면 로컬 저장소가 아닌 클라이언트와 서버와의 인터렉션이 좀 더 효과적인 쿠키를 사용하는 것이 좋다**

<br>

### Seesion cookies

- 만료일을 포함하지 않는다. 즉, 브라우저나 탭이 열려있는 동안만 저장
- 브라우저나 탭이 열려있는 동안만 저장하므로, 은행이나 개인정보 같은 것을 저장하는데 사용될 수 있다.

<hr class="sub" />

### Persistent cookie

- 만료일을 가진다.
- 만료일까지 유저의 디스크에 저장되어 만료일이 지나면 삭제된다.

<hr class="sub" />

### 사용법

쿠키의 생김새는 다음과 같이 생겻다

``` javascript
document.cookie = '키=값; expires=Thu, 01 jan 2020 00:00:00 UTC; path=/;
```

<br>

간단하게 사용법을 알아보자. cookie는 일반적으로 함수를 만들어서 더 쉽게 저장하거나 가져오는 방법을 사용한다.

#### setCookie 함수

일단 쿠키를 만드는 방법을 알아보자.

``` javascript
function setCookie(cookieName, cookieValue, exdays) {
  let cuttentDate = new Date();
  cuttentDate.setTime(cuttentDate.getTime() + exdays * 60 * 60 * 24 * 1000); // 60 * 60 * 24 * 1000 날짜단위로 유효기간을 설정하기 위한 계산
  const expires = 'exprires=' + cuttentDate.toUTCString();
  document.cookie = cookieName + '=' + cookieValue + ';' + expires + 'path=/';
}
```

setCookie라는 함수를 만들고 매개변수로 (cookieName, cookieValue, exdays)를 받는다 이 매개변수에는 (쿠키이름, 쿠키 값, 만료일)을 넣어준다.

``` javascript
document.cookie = cookieName + '=' + cookieValue + ';' + expires + 'path=/';
```

이때 path의 의미는 경로를 지정하게되면 특정 경로에서만 쿠키를 사용하겠다는 의미인데, 주로 메인페이지 팝업에서의 오늘 하루 보지 않기 기능에 사용하면 유용할 것 같다. 메인 페이지 팝업은 메인페이지에서만 유효하고 다른 페이지에서 필요 없으므로 메인 페이지만 설정하여 불필요한 데이터를 낭비를 줄일 수 있다.

username을 publee로 갖는 쿠키를 하루동안만 저장해보자.

``` javascript
setCookie('username', 'publee', 1);
```

이렇게 설정을 하면 위에서 언급한 Persistent cookie가 되고, 만료기간이 만료되면 쿠키는 자동으로 삭제된다. 만약 만료기간에 제한을 두지 않는다면 브라우저나 탭을 끄면 해당 쿠키는 삭제가 된다.

개발자 도구에서 한번 확인해보자

![setCookie](/images/etc/set_cookie.jpg "setCookie")

<hr />

#### getCookie 함수

``` javascript
function getCookie(cookieName) {
  var x, y;
  var val = document.cookie.split(';');

  for (var i = 0; i < val.length; i++) {
    x = val[i].substr(0, val[i].indexOf('='));
    y = val[i].substr(val[i].indexOf('=') + 1);
    x = x.replace(/^\s+|\s+$/g, ''); // 앞과 뒤의 공백 제거하기
    if (x == cookieName) {
      return unescape(y); // unescape로 디코딩 후 값 리턴
    }
  }
}
```

위와 같이 getCookie함수를 만들고 실행해보자

``` javascript
console.log(getCookie('username')); // publee
```

getCookie 내부에는 다소 복잡한 로직이 있는데 중간 중간 cookie의 생김새를 console.log로 출력해보면 로직이 이해가 될 것이다.

``` javascript
function getCookie(cookieName) {
  var x, y;
  console.log(document.cookie); // username=publee; gender=male
  var val = document.cookie.split(';');

  console.log(val); // (2) ["username=publee", "gender=male"]

  for (var i = 0; i < val.length; i++) {
    x = val[i].substr(0, val[i].indexOf('='));
    y = val[i].substr(val[i].indexOf('=') + 1);
    x = x.replace(/^\s+|\s+$/g, ''); // 앞과 뒤의 공백 제거하기
    if (x == cookieName) {
      return unescape(y); // unescape로 디코딩 후 값 리턴
    }
  }
}

setCookie('username', 'publee', 1); // username=publee를 저장
setCookie('gender', 'male', 1); // gender=male을 저장
console.log(getCookie('username')); // publee
```

<br>

## 웹 스토리지

쿠키는 HTTP 요청이 있을때마다 서버에 정보를 전달하여 불필요한 데이터를 낭비하는 단점과 저장할 수 있는 용량이 작다는 점(쿠키는 약 4KB의 용량 제한)을 보완(웹 스토리지는 약 5MB의 용량 제한)하기 위해 HTML5에 추가되었다.

**웹 스토리지는 다음과 같은 특징이 있다.**

1. window의 객체이다
2. 약 5MB 용량 크기
3. HTTP 요청시 서버로는 전송이 되지 않는다.(서버에 클라이언트에 대한 데이터를 저장하지 않는다)
4. Storage객체를 상속받기 때문에 메소드가 공통적으로 존재한다.
5. 값으로는 **문자열, 불리언, 숫자, null, undefined 등이 올 수 있지만, 모두 문자열로 변환되어 저장된다.**

<br>

```javascript
localStorage.setItem(키, 값) // 저장
localStorage.getItem(키, 값) // 조회
localStorage.removeItem(키) // 삭제
localStorage.clear() // 전체 삭제
```

객체를 저장하는 경우

```javascript
localStorage.setItem('object', { a: 'b' });
localStorage.getItem('object'); // [object Object]
```

객체로 저장이 되지 않고 위에서 언급했듯이 문자열로 변환되어 저장이된다.

객체를 저장하기위해서는

```javascript
localStorage.setItem('object', JSON.stringify({ a: 'b' }));
JSON.parse(localStorage.getItem('object')); // { a: 'b' }
```

먼저 저장할 객체를 JSON.stringify하여 JSON 문자열로 바꿔주고

불러올때 JSON.parse를 통하여 다시 객체화 시켜주면 된다.

<br>

### 로컬스토리지
사용자가 삭제하지 않는 이상 브라우저에 계속 남아 있다. 한마디로 이전에 저장되었던 정보를 이용 할 수 있으므로 활용도가 높다.

<hr class="sub" />

### 세션스토리지
윈도우나 브라우저 탭을 닫을 경우 제거된다.

<br>

## 결론

웹 스토리지는 완벽하게 쿠키를 보완하기 위해 탄생된게 아니다, 쿠키와 스토리지 기능을 적절하게 사용하면 웹 개발을 훨씬 편리하게 할 수 있을 것 같다.

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
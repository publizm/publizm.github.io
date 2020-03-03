---
title: 비동기식 처리 모델과 Ajax
date: "2019-11-07"
template: "post"
draft: false
slug: "/posts/javascript/Ajax"
category: "Javascript"
tags:
  - "Ajax(Asynchronous JavaScript and XML)"
  - "Client Side"
  - "Server Side"
description: "비동기식 처리 모델과 Ajax에 대해 알아보자"
---
<span class="notice">
  <em>TIL 내용이므로 잘못된 내용은 댓글 부탁드립니다</em>
</span>

<div id="toc">

**:link:  Table Of Contents**

- [Client와 Server와의 통신](#client와-server와의-통신)
  - [Ajax란](#ajax란)
- [JSON (Javascript Object Notaion)](#json-javascript-object-notaion)
  - [JSON.stringify](#jsonstringify)
  - [JSON.parse](#jsonparse)
- [XMLHttpRequest](#xmlhttprequest)
  - [Ajax request](#ajax-request)
      - [XMLHttpRequest.open](#xmlhttprequestopen)
      - [XMLHttpRequest.send](#xmlhttprequestsend)
      - [XMLHttpRequest.setRequestHeader](#xmlhttprequestsetrequestheader)
  - [Ajax response](#ajax-response)
- [데이터를 받는 서버와 REST API로 통신하는 서버가 서로 다를 경우](#데이터를-받는-서버와-rest-api로-통신하는-서버가-서로-다를-경우same-origin이-아닐-경우)
  - [동일출처원칙을 우회하는 방법](#동일출처원칙을-우회하는-방법)

</div>

## Client와 Server의 통신
브라우저에서 웹 페이지를 요청하거나 링크를 클릭하면 브라우저와 서버와의 통신에 의해 화면 갱신이 발생한다.

서버는 요청받은 페이지(HTML)을 반환하는데 이때 HTML에서 로드하는 CSS나 Javascript 파일들도 같이 반환된다. 클라이언트의 요청에 따라 서버는 정적인 파일을 반환할 수 있고, 서버 사이드 프로그램이 만들어낸 파일이나 데이터를 반환할 수 있다. 서버로부터 웹 페이지가 반환되면 클라이언트(예를들어 브라우저)는 이를 렌더링하여 화면에 표시한다.

조금 디테일하게 설명하자면,<br>
서버는 하드디스크에 있는 파일을 읽은 후(= 메모리에 올린 후) 파일을 **아스키코드**로 변환해서 패킷 단위로 랜선을 통해 클라이언트로 흘려보낸다. **한마디로 데이터는 아스키코드(문자열)로만 랜선을 통해서 주고 받을 수 있다.**

![traditional-webpage-lifecycle_01](/images/javascript/traditional-webpage-lifecycle_01.jpg "traditional-webpage-lifecycle_01")

Request/Response는 파일 단위로 실시된다. 한마디로 html, css, js 파일은 한번에 Request/Response되는 것이 아니라 <b>각각의 파일 단위로 Request/Response된다는 점을 주의하자.</b>

<br>

### Ajax란(Asynchronous Javascript And Xml)
- 자바스크립트를 이용해서 **비동기적**으로 서버와 브라우저가 데이터를 교환할 수 있는 통신 방식을 의미한다.
- 웹페이지가 반환되면 화면 전체를 갱신해야하는데 일부만 갱신하고도 동일한 효과를 볼 수 있게 한다.
- 갱신이 필요한 부분 일부만 로드하여 갱신하므로 빠른 퍼포먼스와 부드러운 화면 표시효과를 기대할 수 있다.

<br>

## JSON (Javascript Object Notaion)
클라이언트와 서버는 데이터 교환이 필요하다. 이때 JSON 포맷을 이용한다.

**JSON의 특징**
- 클라이언트와 서버 간 데이터 교환을 위한 데이터 포맷을 말한다.
- 일반 텍스트 포맷보다 효과적인 데이터 구조화가 가능하다
- XML 포맷보다 가볍고 사용하기 간편하며 가독성도 좋다.
- 자바스크립트의 객체 리터럴과 매우 흡사하게 생겼다. 하지만 **JSON은 순수한 텍스트로 구성된 규칙이 있는 데이터 구조이다.**


``` JSON
{
  "name": "Lee",
  "gender": "male",
  "age": 20,
  "alive": true
}
```

**키는 반드시 큰따옴표(작은 따옴표 X)로 감싸줘야 한다.**

<br>

### JSON.stringify
**객체를 JSON 형식의 문자열로 변환한다.**

``` javascript
const o = { name: 'Lee', gender: 'male', age: 20 };

// 객체 => JSON 형식의 문자열
const strObject = JSON.stringify(o);
console.log(typeof strObject, strObject);
// string {"name":"Lee","gender":"male","age":20}

// 객체 => JSON 형식의 문자열 + prettify
const strPrettyObject = JSON.stringify(o, null, 2);
console.log(typeof strPrettyObject, strPrettyObject);
/*
string {
  "name": "Lee",
  "gender": "male",
  "age": 20
}
*/

// replacer
// 값의 타입이 Number이면 필터링되어 반환되지 않는다.
function filter(key, value) {
  // undefined: 반환하지 않음
  return typeof value === 'number' ? undefined : value;
}

// 객체 => JSON 형식의 문자열 + replacer + prettify
const strFilteredObject = JSON.stringify(o, filter, 2);
console.log(typeof strFilteredObject, strFilteredObject);
/*
string {
  "name": "Lee",
  "gender": "male"
}
*/

const arr = [1, 5, 'false'];

// 배열 객체 => 문자열
const strArray = JSON.stringify(arr);
console.log(typeof strArray, strArray); // string [1,5,"false"]

// replacer
// 모든 값을 대문자로 변환된 문자열을 반환한다
function replaceToUpper(key, value) {
  return value.toString().toUpperCase();
}

// 배열 객체 => 문자열 + replacer
const strFilteredArray = JSON.stringify(arr, replaceToUpper);
console.log(typeof strFilteredArray, strFilteredArray); // string "1,5,FALSE"
```

<hr class="sub" />

### JSON.parse
**JSON 데이터를 가진 문자열을 객체로 변환한다.**

><b>서버로부터 브라우저로 전송된 JSON 데이터는 문자열이다.</b><br>
이 문자열을 객체로서 사용하려면 객체화하여야 하는데 이를 역직렬화(Deserializing)이라 한다.

``` javascript
const o = { name: 'Lee', gender: 'male', age: 20 };
const arr = [1, 5, 'false'];

// JSON 형식의 문자열 => 객체
const obj = JSON.parse(strObject);
console.log(typeof obj, obj); // object { name: 'Lee', gender: 'male' }

// 문자열 => 배열 객체
const objArray = JSON.parse(strArray);
console.log(typeof objArray, objArray); // object [1, 5, "false"]
```
배열이 JSON 형식의 문자열로 변환되어 있는 경우 JSON.parse는 문자열을 배열 객체로 변환한다. 배열의 요소가 객체인 경우 배열의 요소까지 객체로 변환한다.

## XMLHttpRequest
웹 브라우저와 서버 사이에 데이터를 전송하는 객체 폼의 API이다.<br>
XMLHttpRequest 는 이름으로만 봐서는 XML만 받아올 수 있을 것 같아 보이지만, 모든 종류의 데이터를 받아오는데 사용할 수 있다.

**Ajax를 사용하기 위해 XHTMLHttpRequest 객체를 반드시 선언해주어야한다.**

브라우저는 <b>XMLHttpRequest 객체를 이용하여 Ajax 요청을 생성하고 전송한다.</b> 서버가 브라우저의 요청에 대해 응답을 반환하면 같은 XMLHttpRequest 객체가 그 결과를 처리한다.

<br>

### Ajax request
다음은 Ajax 요청 처리의 예이다.

``` javascript
// XMLHttpRequest 객체의 생성
const xhr = new XMLHttpRequest();
// 비동기 방식으로 Request를 오픈한다
xhr.open('GET', '/users');
// Request를 전송한다
xhr.send();
```

<br>

#### XMLHttpRequest.open
<b>서버로의 요청을 준비한다.</b>

``` javascript
XMLHttpRequest.open(method, url[, async])
```

<br>

<article class="board-tbl">

| 매개변수 | 설명  |
| :----- | :---- |
| **method**   | HTTP method (“GET”, “POST”, “PUT”, “DELETE” 등) |
| url      | 요청을 보낼 URL |
| async    | 비동기 조작 여부. 옵션으로 default는 true이며 비동기 방식으로 동작한다. |

</article>

<hr />

#### XMLHttpRequest.send
<b>준비된 요청을 서버에 전달한다.</b>

![HTTP_request+response_message](/images/javascript/HTTP_request+response_message.gif "HTTP_request+response_message")

서버로 전송하는 데이터는 GET, POST 메소드에 따라 그 전송 방식이 차이가 있다.
<br>

##### GET
- **URL의 일부분인 쿼리문자열(query string)로 데이터를 서버로 전송한다.**
- URL에 노출되므로 보안상 이슈가 있다.
- 쿼리문자열로 데이터를 넘기기 때문에 payLoad가 필요없다.
- 부분조회 : /todos/1
- 전체조회 : /todos

> 쿼리문자열 방식<br>
localhost:3000/todos?name=value&name=value

``` javascript
xhr.send(null);
// xhr.send('string');
// xhr.send(new Blob()); // 파일 업로드와 같이 바이너리 컨텐트를 보내는 방법
// xhr.send({ form: 'data' });
// xhr.send(document);
```
**만약 요청 메소드가 GET인 경우, send 메소드의 인수는 무시되고 request body은 null로 설정된다.**

<br>

##### POST
- 데이터(payLoad)를 urlencoded방식(Request Body에 담아서)으로 전송한다.
- 보통 백엔드 개발자와 약속한 방식으로 보낸 데이터(payload) 내용을 DB에 저장한 후 약속된 방식으로 합친 내용으로 다시 응답해준다.
- 위의 내용으로 인해 **반드시 payLoad가 있어야 된다.**

<hr />

#### XMLHttpRequest.setRequestHeader
<b>HTTP Request Header의 값을 설정한다.</b><br>
**setRequestHeader 메소드는 반드시 XMLHttpRequest.open 메소드 호출 이후에 호출해야한다.**

<br>

##### Content-type
request body에 담아 전송할 데이터의 **MIME-type의 정보를 표현**한다.

> MIME-type 이란?<br>
클라이언트에게 전송된 문서의 다양성을 알려주기 위한 메커니즘이다 웹에서 파일의 확장자는 별 의미가 없다. 그러므로, 각 문서와 함께 올바른 MIME 타입을 전송하도록, 서버가 정확히 설정하는 것이 중요하다. <b>브라우저들은 리소스를 내려받았을 때 해야 할 기본 동작이 무엇인지를 결정하기 위해 대게 MIME 타입을 사용한다.</b>

<br>

자주 사용되는 MIME-type을 살펴보자.

<article class="board-tbl">

| 타입 | 서브타입 |
| :----- | :----- |
| text 타입 | text/plain, text/html, text/css, text/javascript |
| Application 타입 | application/json, application/x-www-form-urlencode |
| File을 업로드하기 위한 타입 | multipart/formed-data |

</article>

<br>

``` javascript
// json으로 전송하는 경우
xhr.open('POST', '/users');

// 클라이언트가 서버로 전송할 데이터의 MIME-type 지정: json
xhr.setRequestHeader('Content-type', 'application/json');

const data = { id: 3, title: 'JavaScript', author: 'Park', price: 5000};

xhr.send(JSON.stringify(data));


// x-www-form-urlencoded으로 전송하는 경우
xhr.open('POST', '/users');

// 클라이언트가 서버로 전송할 데이터의 MIME-type 지정: x-www-form-urlencoded
// application/x-www-form-urlencoded는 key=value&key=value...의 형태로 전송
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

const data = { title: 'JavaScript', author: 'Park', price: 5000};

xhr.send(Object.keys(data).map(key => `${key}=${data[key]}`).join('&'));
// escaping untrusted data
// xhr.send(Object.keys(data).map(key => `${key}=${encodeURIComponent(data[key])}`).join('&'));
```

<br>

##### Accept
HTTP 클라이언트가 서버에 요청할 때 서버가 센드백할 데이터의 MIME-type을 Accept로 지정할 수 있다.

다음은 서버가 센드백할 데이터의 MIME-type을 지정하는 예이다.

``` javascript
// 서버가 센드백할 데이터의 MIME-type 지정: json
xhr.setRequestHeader('Accept', 'application/json');
```
Accept 헤더를 설정하지 않으면, send 메소드가 호출될 때 Accept 헤더가 * / *으로 전송된다.

<hr class="sub" />

### Ajax response
Ajax 응답 처리를 의미한다.

다음은 Ajax 응답 처리의 예이다.

``` javascript
// XMLHttpRequest 객체의 생성
const xhr = new XMLHttpRequest();

// XMLHttpRequest.readyState 프로퍼티가 변경(이벤트 발생)될 때마다 onreadystatechange 이벤트 핸들러가 호출된다.
xhr.onreadystatechange = function (e) {
  // readyStates는 XMLHttpRequest의 상태(state)를 반환
  // readyState: 4 => DONE(서버 응답 완료)
  if (xhr.readyState !== XMLHttpRequest.DONE) return;

  // status는 response 상태 코드를 반환 : 200 => 정상 응답
  if(xhr.status === 200) {
    console.log(xhr.responseText);
  } else {
    console.log('Error!');
  }
};
```

서버에 Request를 전송하면 서버는 Response를 반환한다. 하지만 언제 Response가 클라이언트에 도달하는지는 알 수 없다.  **XMLHttpRequest.onreadystatechange는 Response가 클라이언트에 도달하여 발생된 이벤트를 감지하고 Request에 어떠한 변화가 발생한 경우마다 콜백 함수를 실행하여 준다.**즉, 이벤트는 XMLHttpRequest.readyState 프로퍼티가 변경된 경우 발생한다.

``` javascript
// XMLHttpRequest 객체의 생성
var xhr = new XMLHttpRequest();
// 비동기 방식으로 Request를 오픈한다
xhr.open('GET', 'data/test.json');
// Request를 전송한다
xhr.send();

// XMLHttpRequest.readyState 프로퍼티가 변경(이벤트 발생)될 때마다 콜백함수(이벤트 핸들러)를 호출한다.
xhr.onreadystatechange = function (e) {
  // 이 함수는 Response가 클라이언트에 도달하면 호출된다.
};
```

**XMLHttpRequest 객체는 response가 클라이언트에 도달했는지를 추적할 수 있는 프로퍼티를 제공한다.** 이 프로퍼티가 바로 XMLHttpRequest.readyState이다.

<b>XMLHttpRequest.readyState</b>

<article class="board-tbl">

| Value | State | Description |
| :---: | :---- | :---- |
|   0   | UNSENT | XMLHttpRequest.open() 메소드 호출 이전 |
|   1   | OPENED | XMLHttpRequest.open() 메소드 호출 완료 |
|   2   | HEADERS_RECEIVED | XMLHttpRequest.send() 메소드 호출 완료 |
|   3   | LOADING | 서버 응답 중(XMLHttpRequest.responseText 미완성 상태) |
|   **4**   | DONE | 서버 응답 완료 |

</article>

<br>

``` javascript
// XMLHttpRequest 객체의 생성
var xhr = new XMLHttpRequest();
// 비동기 방식으로 Request를 오픈한다
xhr.open('GET', 'data/test.json');
// Request를 전송한다
xhr.send();

// XMLHttpRequest.readyState 프로퍼티가 변경(이벤트 발생)될 때마다 콜백함수(이벤트 핸들러)를 호출한다.
xhr.onreadystatechange = function (e) {
  // 이 함수는 Response가 클라이언트에 도달하면 호출된다.

  // readyStates는 XMLHttpRequest의 상태(state)를 반환
  // readyState: 4 => DONE(서버 응답 완료)
  if (xhr.readyState !== XMLHttpRequest.DONE) return;

  // status는 response 상태 코드를 반환 : 200 => 정상 응답
  if(xhr.status === 200) {
    console.log(xhr.responseText);
  } else {
    console.log('Error!');
  }
};
```
XMLHttpRequest의.readyState가 4인 경우, 서버 응답이 완료된 상태이므로 이후 XMLHttpRequest.status가 200(정상 응답)임을 확인하고 정상인 경우, XMLHttpRequest.responseText를 취득한다. <b>XMLHttpRequest.responseText에는 서버가 전송한 데이터가 담겨 있다.</b>

<br>

## 데이터를 받는 서버와 REST API로 통신하는 서버가 서로 다를 경우(same origin이 아닐 경우)
요청에 의해 웹페이지가 전달된 서버와 동일한 도메인의 서버로 부터 전달된 데이터는 문제없이 처리할 수 있다. 하지만 보안상의 이유로 다른 도메인(http와 https, 포트가 다르면 다른 도메인으로 간주한다)으로의 요청(크로스 도메인 요청)은 제한된다.

> 예를 들어<br>
기업 페이지에서 구글 지도 API를 사용하고 싶어서 데이터를 요청하는 경우 이때 기업 페이지의 서버에는 구글 지도의 API 데이터가 없다라는 점을 생각하면 이해하기 쉽다.

이를 동일출처원칙(Same-origin policy)라고 한다.

![cdr](/images/javascript/cdr.jpg "cdr")

<br>

### 동일출처원칙을 우회하는 방법

1. **웹서버의 프록시 파일**<br>
서버에 원격 서버로부터 데이터를 수집하는 별도의 기능을 추가한다. 이를 프록시(Proxy)라 한다.

2. **JSONP**<br>
script 태그의 원본 주소에 대한 제약은 존재하지 않는데 이것을 이용하여 다른 도메인의 서버에서 데이터를 수집하는 방법이다. 자신의 서버에 함수를 정의하고 다른 도메인의 서버에 얻고자 하는 데이터를 인수로 하는 함수 호출문을 로드하는 것이다.

![comparison_between_ajax_and_jsonp](/images/javascript/comparison_between_ajax_and_jsonp.png "comparison_between_ajax_and_jsonp")

3. **Cross-Origin Resource Sharing(CORS)**<br>
HTTP 헤더에 추가적으로 정보를 추가하여 브라우저와 서버가 서로 통신해야 한다는 사실을 알게하는 방법이다. W3C 명세에 포함되어 있지만 최신 브라우저에서만 동작하며 서버에 HTTP 헤더를 설정해 주어야 한다.

Node.js로 구현한 서버의 경우, CORS package를 사용하면 간단하게 Cross-Origin Resource Sharing을 구현할 수 있다.

``` javascript
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})
```


<br>
<br>
<br>
<br>
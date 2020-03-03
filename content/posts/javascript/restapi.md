---
title: REST API
date: "2019-11-09"
template: "post"
draft: false
slug: "/posts/javascript/RESTAPI"
category: "Javascript"
tags:
  - "RESTAPI"
description: "REST API에 대해 알아보자"
---
<span class="notice">
  <em>TIL 내용이므로 잘못된 내용은 댓글 부탁드립니다</em>
</span>

<div id="toc">

**:link:  Table Of Contents**

- [REST란?](#rest란)
  - [RESTful이란?](#restful이란)
- [REST API 중심 규칙](#rest-api-중심-규칙)
- [HTTP Method](#http-method)
- [REST API의 구성](#rest-api의-구성)
- [REST API의 사용예시](#rest-api의-사용예시)
  - [1.json-server](#1-json-server)
  - [2. GET](#2-get)
  - [3. POST](#3-post)
  - [4. PUT](#4-put)
  - [5. PATCH](#5-patch)
  - [6. DELETE](#6-delete)

</div>

## REST란?
REST(Representational State Transfer)는 WWW(World Wide Web)과 같은 **분산 하이퍼미디어 시스템을 위한 소프트웨어 아키텍처의 한 형식이다.**

REST는 네트워크 아키텍처 원리의 모음이다.

> 네트워크 아키텍처 원리<br>
자원을 정의하고 자원에 대한 주소를 지정하는 방법 전반을 일컫는다.

<br>

### RESTful이란?
REST의 기본 원칙을 성실히 지킨 서비스 디자인을 “RESTful”이라고 표현한다.<br>

:exclamation: REST의 기본 원칙 따르지 않더라도 에러가 발생하진 않으나, 협업을 위해서 지켜야한다.

<br>
<br>

## REST API 중심 규칙

1. **URI**: 정보의 자원을 표현해야 한다. 이때, 동사보다는 명사를 사용한다.

``` code
# bad
GET /getTodos/1
GET /todos/show/1

# good
GET /todos/1
```

2. **HTTP Method**: 자원에 대한 행위 정의

``` code
# bad
GET /todos/delete/1

# good
DELETE /todos/1
```

<br>
<br>

##  HTTP Method
주로 5가지의 Method를 사용하여 **CRUD(Create, Read, Update, Delete)**를 구현한다.

<article class="board-tbl">

| Method | Action         | 역할                     |
| :----- | :------------- | :----------------------- |
| [GET](#2-get) | index/retrieve | 모든/특정 리소스를 조회 |
| [POST](#3-post) | create | 리소스를 생성 |
| [PUT](#4-put) | update all | **리소스의 전체를 갱신** |
| [PATCH](#5-patch) | update | **리소스의 일부를 갱신** |
| [DELETE](#6=delete) | delete | 리소스를 삭제 |

</article>

<br>
<br>

## REST API의 구성
REST API는 자원(Resource), 행위(Verb), 표현(Representations)의 3가지 요소로 구성된다.<br>
REST는 자체 표현 구조(Self-descriptiveness)로 구성되어 REST API만으로 요청을 이해할 수 있다.

<article class="board-tbl">

| 구성 요소 | 내용 | 표현 방법 |
| :---- | :---- | :---- |
| Resource | 자원 | HTTP URI |
| Verb | 자원에 대한 행위 | HTTP Method |
| Representations | 자원에 대한 행위의 내용 | HTTP Message Pay Load |
</article>

## REST API의 사용예시

<br>

### 1. json-server

먼저 빈 폴더를 만들어서 json-server를 install해보자

``` bash
$ mkdir rest-api-exam && cd rest-api-exam
$ npm init -y
$ npm install json-server
```

db.json 파일을 아래와 같이 생성한다.

``` json
{
  "todos": [
    { "id": 1, "content": "HTML", "completed": false },
    { "id": 2, "content": "CSS", "completed": true },
    { "id": 3, "content": "Javascript", "completed": false }
  ]
}
```

아래와 같이 package.json을 수정한다.

``` json
{
  "name": "rest-api-exam",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "start": "json-server --watch db.json --port 5000"
  },
  "dependencies": {
    "json-server": "^0.15.0"
  }
}
```

json-server를 실행한다. 포트는 5000을 사용한다.

``` bash
$ npm start
```

<hr class="sub">

### 2. GET
리소스를 조회, 검색할때 사용한다.

아래의 예시는 todos 리소스에서 모든 todo를 조회한다.

``` bash
$ curl -X GET http://localhost:5000/todos
```

![rest_get](/images/javascript/rest_get_terminal.jpg "rest_get")

클라이언트에서 GET 요청을 보낼때마다 서버에서는 로그가 뜨는걸 확인해볼 수 있다.

Javascript에서 GET하는 방법

``` javascript
const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:5000/todos');
xhr.send();

xhr.onreadystatechange = function (e) {
  if (xhr.readyState !== XMLHttpRequest.DONE) return;

  if(xhr.status === 200) { // 200: OK => https://httpstatuses.com
    console.log(xhr.responseText);
  } else {
    console.log("Error!");
  }

};
```

todos 리소스에서 id를 사용하여 특정 todo를 조회할 수 있다.

``` bash
$ curl -X GET http://localhost:5000/todos/1

# 출력화면
# {
#   "id": 1,
#   "content": "HTML",
#   "completed": false
# }
```

Javascript로 todos 리소스에서 id를 사용하여 특정 todo 조회
``` javascript
const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:5000/todos/1');
xhr.send();

xhr.onreadystatechange = function (e) {
  if (xhr.readyState !== XMLHttpRequest.DONE) return;

  if(xhr.status === 200) {
    console.log(xhr.responseText);
  } else {
    console.log("Error!");
  }
};
```

<hr class="sub">

### 3. POST
리소스에 새로운 리소스 생성할 때 사용한다.

아래의 예시는 todos 리소스에 새로운 todo를 생성한다.

``` bash
$ curl -X POST http://localhost:5000/todos -H "Content-Type: application/json" -d '{"id": 4, "content": "Angular", "completed": true}'

# 출력화면
# {
#   "id": 4,
#   "content": "Angular",
#   "completed": true
# }
```

db.json에 추가되는 것을 확인할 수 있다.
``` json
{
  "todos": [
    {
      "id": 1,
      "content": "HTML",
      "completed": false
    },
    {
      "id": 2,
      "content": "CSS",
      "completed": true
    },
    {
      "id": 3,
      "content": "Javascript",
      "completed": false
    },
    {
      "id": 4,
      "content": "Angular",
      "completed": true
    }
  ]
}
```

Javascript에서 POST하는 방법
``` javascript
const xhr = new XMLHttpRequest();
xhr.open('POST', 'http://localhost:5000/todos');
xhr.setRequestHeader('Content-type', 'application/json');
xhr.send(JSON.stringify({ id: 4, content: 'Angular', completed: true }));

xhr.onreadystatechange = function (e) {
  if (xhr.readyState !== XMLHttpRequest.DONE) return;

  if(xhr.status === 201) { // 201: Created
    console.log(xhr.responseText);
  } else {
    console.log("Error!");
  }
};
```

<hr class="sub">

### 4. PUT
특정 리소스의 전체를 갱신할 때 사용한다.

아래의 예시는 todos 리소스에서 id를 사용하여 todo를 특정하여 id를 제외한 리소스 전체를 갱신한다.

``` bash
$ curl -X PUT http://localhost:5000/todos/4 -H "Content-Type: application/json" -d '{"id": 4, "content": "React", "completed": false}'

# 출력화면
# {
#   "content": "React",
#   "completed": false,
#   "id": 4
# }
```
db.json에 4번째 리소스 중 content에 React와 complete에 false로 변경되었음을 확인할 수 있다.
``` json
{
  "todos": [
    {
      "id": 1,
      "content": "HTML",
      "completed": false
    },
    {
      "id": 2,
      "content": "CSS",
      "completed": true
    },
    {
      "id": 3,
      "content": "Javascript",
      "completed": false
    },
    {
      "id": 4,
      "content": "React",
      "completed": false
    }
  ]
}
```

Javascript에서 PUT하는 방법

``` javascript
const xhr = new XMLHttpRequest();
xhr.open('PUT', 'http://localhost:5000/todos/4');
xhr.setRequestHeader('Content-type', 'application/json');
xhr.send(JSON.stringify({ id: 4, content: 'React', completed: false }));

xhr.onreadystatechange = function (e) {
  if (xhr.readyState !== XMLHttpRequest.DONE) return;

  if(xhr.status === 200) {
    console.log(xhr.responseText);
  } else {
    console.log("Error!");
  }
};
```

<hr class="sub">

### 5. PATCH
PATCH는 특정 리소스의 일부를 갱신할 때 사용한다.

아래의 예시는 todos 리소스의 id를 사용하여 todo를 특정하여 completed만을 true로 갱신한다.

``` bash
$ curl -X PATCH http://localhost:5000/todos/4 -H "Content-Type: application/json" -d '{"completed": true}'

# 출력화면
# {
#   "id": 4,
#   "content": "React",
#   "completed": true
# }
```

db.json에 4번째 리소스의 completed값이 true로 갱신된 것을 확인할 수 있다.

``` json
{
  "todos": [
    {
      "id": 1,
      "content": "HTML",
      "completed": false
    },
    {
      "id": 2,
      "content": "CSS",
      "completed": true
    },
    {
      "id": 3,
      "content": "Javascript",
      "completed": false
    },
    {
      "id": 4,
      "content": "React",
      "completed": true
    }
  ]
}
```

Javascript에서 PATCH하는 방법

``` javascript
const xhr = new XMLHttpRequest();
xhr.open('PATCH', 'http://localhost:5000/todos/4');
xhr.setRequestHeader('Content-type', 'application/json');
xhr.send(JSON.stringify({ completed: true }));

xhr.onreadystatechange = function (e) {
  if (xhr.readyState !== XMLHttpRequest.DONE) return;

  if(xhr.status === 200) {
    console.log(xhr.responseText);
  } else {
    console.log("Error!");
  }
};
```

<hr class="sub">

### 6. DELETE
DELETE는 특정 리소스의 삭제할 때 사용한다.
아래의 예시는 todos 리소스에서 id를 사용하여 todo를 특정하고 삭제한다.

``` bash
$ curl -X DELETE http://localhost:5000/todos/4

# 출력화면
# {}
```

db.json에서 id값에 해당하는 todo가 삭제되었음을 확인할 수 있다.

``` javascript
{
  "todos": [
    {
      "id": 1,
      "content": "HTML",
      "completed": false
    },
    {
      "id": 2,
      "content": "CSS",
      "completed": true
    },
    {
      "id": 3,
      "content": "Javascript",
      "completed": false
    }
  ]
}
```

Javascript에서 DELETE하는 방법

```javascript
const xhr = new XMLHttpRequest();
xhr.open('DELETE', 'http://localhost:5000/todos/4');
xhr.send();

xhr.onreadystatechange = function (e) {
  if (xhr.readyState !== XMLHttpRequest.DONE) return;

  if(xhr.status === 200) {
    console.log(xhr.responseText);
  } else {
    console.log("Error!");
  }
};
```

<br>
<br>
<br>
<br>
---
title: axios
date: "2019-12-12"
template: "post"
draft: false
slug: "/posts/javascript/Axios"
category: "Javascript"
tags:
  - "Axios"
description: "axios에 대해 알아보자"
---
<span class="notice">
  <em>TIL 내용이므로 잘못된 내용은 댓글 부탁드립니다</em>
</span>

<div id="toc">

**:link:  Table Of Contents**

- [Axios란?](#axios란)
  - [장점](#장점)
- [설치 및 사용법](#설치-및-사용법)
  - [설치하는 방법](#설치하는-방법)
  - [사용방법](#사용방법)
  - [메소드](#메소드)
      - [axios.get(url[, config])](#axiosgeturl-config)
      - [axios.post(url[, data[, config]])](#axiosposturl-data-config)

</div>

## Axios란?
HTTP 통신을 하는데 유용한 Javascript 라이브러리이며, 주로 async/await과 함께 사용한다<br>
axios는 브라우저와 Node.js 환경에서 모두 사용할 수 있다<br>
axios는 Promise 기반의 API이다.

### 장점
- 하위 브라우저 호환
- 직접 XMLHttpRequest를 다룰 필요없이 요청할 수 있다.
- 요청을 중단시킬 수 있다.
- 응답 시간 초과를 설정하는 방법이 있다.
- JSON 데이터 자동변환(Fetch에서는 변환을 따로 해줬어야하는 불편함이 있었다)

## 설치 및 사용법


### 설치하는 방법
npm으로 설치하는 방법

``` bash
npm install axios
```

yarn으로 설치하는 방법

``` bash
yarn add axios
```

CDN으로 로드하는 방법

``` html
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

<hr class="sub" />

### 사용방법

우선 axios는 아래와 같이 간단하게 HTTP요청을 할 수 있다.

``` javascript
axios({
  method: 'get',
  url: '...'
  data: {
    ...: '...'
  }
})
```

위 처럼 옵션에 method와 url, data들을 정의해서 사용할 수 있고,<br>
메소드를 분리하여 사용할 수 있다

<hr class="sub">

### 메소드
메소드의 종류에는 여러가지가 있는데 주로 사용하는 것들만 설명하고,<br>
자세한 정보는 [axios 문서](https://www.npmjs.com/package/axios)에서 확인할 수 있다.

<br>

#### axios.get(url[, config])
get요청은 특정 url에 있는 데이터를 요청하는 것이다.

async/await을 사용하여 데이터를 받아 후속처리하는 방법

``` javascript
const getData = async () => {
  try {
    const res = await axios.get('url');
    data = res.data;
    render(data);
  } catch(err) {
    console.error(err)
  }
};
```

asyns/await을 사용하지 않는다면 then으로 후속처리 메소드를 작성해주어야 한다.

``` javascript
const getData = () => {
  axios.get('url')
    .then(res => data = res.data)
    .then(render)
    .catch(err => console.error(err));
};
```

이런식으로 promise를 받아서 변수에 담아서 활용할 수 있다.

그리고 또 get 요청시 매개변수를 추가할 수 있다.

해당 요청을 보낼 예시 url은

``` code
https://www.axiostest.com/?member=publee
```

이제 요청을 보내보자

``` javascript
axios.get('https://www.axiostest.com/', {
  params = {
    member: 'publee'
  }
})

```

위 코드는 뭔가 재사용이 어려워보이니 변수에 담아 매개변수에 넣어 사용해보겠다.

``` javascript
const params = {
  member: 'publee'
}

axios.get('https://www.axiostest.com/', { params })
```

<hr />

#### axios.post(url[, data[, config]])
post를 사용할때는 payload가 매개변수에 담겨야된다.

사용법은 payload를 제외하고는 get과 사용법이 같다.

async/await을 사용하여 데이터를 받아 후속처리하는 방법

``` javascript
const addData = async (content) => {
  try {
    const res = await axios.post('url', content);
    data = res.data;
    render(data);
  } catch(err) {
    console.error(err)
  }
};
```

asyns/await을 사용하지 않는다면 then으로 후속처리 메소드를 작성해주어야 한다.

``` javascript
const addData = content => {
  axios.post('url', content)
    .then(res => data = res.data)
    .then(render)
    .catch(err => console.error(err));
};
```

<br>

왠만하면 axios를 사용할때 try/catch를 사용하여 후속처리를 해주는 것이 좋을것 같다.<br>
이유는 try/catch try안에서 오류가 나면 오류를 건너뛰고 다음 코드의 순서가 보장이 되는데

**try/catch가 없을 경우 에러가 나면 그 코드에서 중지되므로 try/catch를 사용해주는 것이 좋다.**<br>
하나의 try 안에서 비동기 처리가 몇개가 존재한다면 에러가 나면 catch문으로 넘어가 다음 코드를 실행하지 않으므로, 중요한 비동기 작업이라면 비동기 코드 단위별로 try/catch 사용해주는 것이 좋다.





<br>
<br>
<br>
<br>
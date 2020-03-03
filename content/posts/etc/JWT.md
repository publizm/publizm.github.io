---
title: JWT(Json Web Token)에 대해 알아보자
date: "2020-01-09"
template: "post"
draft: false
slug: "/posts/Etc/JWT"
category: "Etc"
tags:
  - "JWT(Json Web Token)"
description: "JWT(Json Web Token)에 대해 알아보자"
---
<span class="notice">
  <em>TIL 이므로 잘못된 내용은 댓글 부탁드립니다</em>
</span>

로그인을 구현하기 앞서 JWT에 대해서 알아보자

백엔드에서는 클라이언트가 보낸 데이터를 원본 그대로라고 절대 믿어서는 안된다. 이유는 바로 클라이언트에서 보내는 데이터는 위/변조가 가능하기때문이다. 그러면 클라이언트가 보내는 데이터가 안전하다라는 것을 어떻게 신뢰할 수 있을까?

바로 데이터의 기밀성과, 무결성을 보장해주면 된다.

> **기밀성**<br>
> 데이터 자체를 노출시키지 않는 것(=암호화)<br>
> **무결성**<br>
> 데이터가 원본 그대로 전달되는 것

## JWT

### JWT 란?
Json Web Token은 JSON 객체를 사용하여 정보를 안전하게 전송하기 위한 자체적인 방법을 정의하는 표준(RFC 7519)이다.

JWT는 필요한 모든 정보를 자체적으로 지니고 있고, JWT 시스템에서 발급된 토큰은, 토큰에 대한 기본정보, 전달할 정보 그리고 토큰이 검증됐다는 것을 증명해주는 암호화된 키(signature)를 포함하고 있다.

그러면 JWT는 어느 상황에 쓰일까?

- **허가**<br>
JWT를 사용하기 위한 가장 일반적인 시나이오이다. 사용자가 로그인한 후 각 후속 요청에는 JWT가 포함되어 사용자는 이 토큰으로 허용되는 경로, 서비스 및 리소스를 액세스 할 수 있다. 즉, 서버가 클라이언트에게서 요청을 받을때 마다, 해당 토큰이 유효한지 인증됐는지를 검증하고, 유저가 요청한 작업에 권한이 있는지 확인하여 작업을 처리한다.

- **정보 교환**<br>
JWT는 당사자 간에 안전하게 정보를 전송하는 좋은 방법이다. 공용/개인 키 쌍을 사용하여 JWT에 서명할 수 있기 때문에 정보를 보낸이가 바뀌지 않았는지, 정보가 도중에 조작되지 않았는지 검증할 수 있다. 왜냐하면 서명은 header와 payload로 계산되기 때문이다.

**하지만 JWT는 암호화(기밀성)가 목적이 아닌 데이터의 위/변조 여부(무결성)를 보장하는 목적이라는 것을 명심하자.** 이유는 토큰을 가지고 [JWT.io](https://jwt.io/)로 이동하여 Debugger의 Encoded 인풋에 토큰을 입력해보자 그러면 세부내용을 확인할 수 있다. 이처럼 토큰만 탈취할 수 있다면 손쉽게 세부내용을 확인할 수 있다.

<hr class="sub" />

### JWT 사용법

#### 설치

우선 패키지매니저를 이용하여 JWT를 설치해보자

``` bash
npm i jsonwebtoken
```

<hr />

#### 토큰 생성

``` javascript
// import jwt from 'jsonwebtoken';
const jwt = require('jsonwebtoken');

const token = jwt.sign({ name: 'publee' }, 'SECRET_KEY'); // 토큰을 만든다.
const token = jwt.sign({ name: 'publee' }, 'SECRET_KEY', { expiresIn: 604800 }); // expiresIn: 604800 = 1 week
```

sign 메소드를 사용하여 데이터에 대해 서명을 해준다(토큰을 생성해준다)

- 첫번째 파라미터 : 위/변조를 방지하고 싶은 데이터를 정의
- 두번째 파라미터 : KEY 값, 백엔드 개발자와 협의하여 만든다. 이유는 클라이언트에서 검증(verify)를 하기 위해서는 키 값이 필요하기 때문이다.(노출되어 있으면 안되므로 주로 .env파일에 저장하여 사용)
- 세번째 파라미터[ 옵션 ] : 토큰이 존재할 수 있는 만료기한을 지정한다. 단위는 1초 단위이다.

<hr />

#### 검증
권한을 확인하는 메소드이다. 이때 생성했을때와 키값과 일치해야한다. 프론트엔드 개발자가 주로 사용하는 메소드이다.

``` javascript
const decoded = jwt.verify('token', 'SECRET_KEY');
```

verify 메소드를 사용하여 권한을 확인할 수 있다.

- 첫번째 파라미터 : token 값을 전달한다.(토큰은 주로 쿠키에 저장되어 있으므로 cookies의 속성을 참조하면 된다.)
- 두번째 파라미터 : secret key값을 작성한다.

이렇게 호출하면 토큰에 해당하는 데이터가 decode되어 return 됩니다.

<hr />

#### 디코드
토큰에 담겨져 있는 데이터의 원본을 decode 할 수 있는 메소드이다. verify와 같지 않나? 라고 생각하겠지만 verify와 같이 데이터 원본을 확인할 수 있는 것은 동일하고, 데이터의 무결성(위/변조 방지)를 보장할 수 없다.

``` javascript
const decoded = jwt.decode('token');
```

- 파라미터는 토큰만 필요하다.

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

</div>
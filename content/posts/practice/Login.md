---
title: JWT를 이용한 로그인 구현하기
date: "2020-01-10"
template: "post"
draft: false
slug: "/posts/practice/Login"
category: "Practice"
tags:
  - "JWT"
description: "JWT를 이용하여 로그인을 구현해보자"
---

![login_preview](/images/practice/login_preview.gif "login_preview")

디렉토리 구조

![practice_login_directory](/images/practice/practice_login_directory.jpg "practice_login_directory")

위와 같이 디렉토리 구조를 잡았다.

먼저 라우터 설정부터 해주자.

## 라우터 설정

<b>App.js</b>

``` jsx
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './Main';
import './App.css';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import User from './components/User';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route path="/user" component={User} />
        <Route path="/" component={Main} />
      </Switch>
    </Router>
  );
};

export default App;
```

각각 라우터를 설정해주었다. 그러면 메인화면을 작업해보자.

## 메인

<b>Main.js</b>

``` jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Main = () => {
  return (
    <>
      <ul className="navigation">
        <li>
          <Link to="/signup">회원가입 바로가기</Link>
        </li>
        <li>
          <Link to="/signin">로그인 바로가기</Link>
        </li>
      </ul>
      <h2>메인입니다</h2>
    </>
  );
};

export default Main;
```

메인화면에서는 회원가입과 로그인을 바로 이동할 수 있도록 작업해주었다.

![practice_login_main](/images/practice/practice_login_main.jpg "practice_login_main")

많이 촌스러운 UI이지만.... 연습용이니 패스하자!

일단 메인화면을 구현했고 회원가입 화면를 작업해보자

## 회원가입

<b>components > SignUp > index.jsx</b>

``` jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signUp } from '../../libs/api';

const SignUp = props => {
  const { handleSubmit, register, watch, errors } = useForm();
  const [alreadyExist, setAlreadyExist] = useState(false);

  const onSubmit = async values => {
    const { success, msg } = await signUp(values);
    console.log(success, msg); // true "Successful created new user."
    if (success) {
      props.history.push('/signin');
    } else if (msg === 'Username already exists.') {
      setAlreadyExist(true);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <legend>회원가입</legend>
        {alreadyExist && '이미 존재하는 아이디입니다.'}
        <div className="col">
          <label htmlFor="username">이메일</label>
          <input
            type="text"
            id="username"
            name="username"
            ref={register({
              required: '필수 입력사항 입니다.',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: '유효하지 않는 이메일 형식입니다.',
              },
              maxLength: {
                value: 20,
                message: '글이 넘침',
              },
            })}
            placeholder="이메일을 입력해주세요"
          />
          <p className="notice">{errors.username && errors.username.message}</p>
        </div>
        <div className="col">
          <label htmlFor="password1">비밀번호</label>
          <input
            type="password"
            id="password1"
            name="password1"
            ref={register({
              required: '필수 입력사항 입니다.',
            })}
            placeholder="비밀번호를 입력해주세요"
          />
        </div>
        <div className="col">
          <label htmlFor="password2">비밀번호 확인</label>
          <input
            type="password"
            name="password2"
            id="password2"
            ref={register({
              required: '필수입력사항 입니다.',
              validate: value => {
                return value === watch('password1');
              },
            })}
            placeholder="비밀번호를 입력해주세요"
          />
          <p className="notice">
            {errors.password2 && '비밀번호가 일치하지 않습니다.'}
          </p>
        </div>
      </fieldset>
      <button type="submit" className="submit-btn">
        확인
      </button>
    </form>
  );
};

export default SignUp;
```

![practice_login_join](/images/practice/practice_login_join.jpg "practice_login_join")


일단 form 데이터 체크를 수월하게 하기 위해 react-hook-form 이라는 커스텀 훅 모듈을 사용하였다. react-hook-form에 대한 설명은 주제에 맞지 않으니 패스하고, **확인** 버튼을 누르게 되면 form의 onSubmit이라는 React의 내장 props에 onSubmit이라는 함수를 넣어주었다, handleSubmit은 라이브러리의 함수이다. 우리는 onSubmit 함수의 내부 동작에만 신경쓰면 될 것 같다.

values에는 username과 password1, password2 이렇게 객체형태로 담겨져 있는데 이것을 signUp이라는 함수에 인수로 넣어 호출해준다.

이 signUp에 왜 await이 붙어 있는걸로 보아 해당 함수 내에는 비동기 처리가 있을 것이다. signUp 함수는 lib > api.js에 작성해주었다.

<b>lib > api.js</b>

``` jsx
import axios from 'axios';

export const signUp = async ({ username, password1: password }) => {
  const { data } = await axios.post('http://localhost:4000/api/signup', {
    username,
    password,
  });
  return data;
};
```

이렇게 signUp 함수는 values를 파라미터로 받아서 객체 디스트럭처링을 통해서 usename과 password를 받았는데 password1만 받았다. 그 이유는 password1, password2는 회원가입시 비밀번호 재확인을 구현하기 위해 2개의 값이 필요했던 것이기 때문에 두개의 값은 동일하므로 하나의 값만 사용하여 password라는 변수에 담아주었다.

그리고 axios를 통해 post로 해당 서버에 username과 password가 담긴 payload를 담아 요청했다. 아직 까진 JWT에 관한 내용은 없으니 간단히 설명하고 넘어가겠다.

이렇게 하여 회원가입이 완료되면 route의 history.push를 통하여 로그인 화면으로 UI가 전환된다.

## 로그인

<b>components > SignIn > index.jsx</b>

``` jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signIn } from '../../libs/api';
import Cookies from 'js-cookie';

const SignIn = props => {
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = async ({ username, password }) => {
    const { success, token } = await signIn({ username, password });
    if (success) {
      Cookies.set('session', token.split(' ')[1]);

      props.history.push('/user');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <legend>로그인</legend>
        <div className="col">
          <label htmlFor="username">이메일</label>
          <input
            type="text"
            id="username"
            name="username"
            ref={register({
              required: '필수 입력사항 입니다.',
            })}
            placeholder="이메일을 입력해주세요"
          />
          <p className="notice">{errors.username && '필수 입력사항입니다.'}</p>
        </div>
        <div className="col">
          <label htmlFor="password1">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            ref={register({
              required: '필수 입력사항 입니다.',
            })}
            placeholder="비밀번호를 입력해주세요"
          />
          <p className="notice">{errors.password && '필수 입력사항입니다.'}</p>
        </div>
      </fieldset>
      <button type="submit" className="submit-btn">
        로그인
      </button>
    </form>
  );
};

export default SignIn;
```

![practice_login_login](/images/practice/practice_login_login.jpg "practice_login_login")

우리가 여기서 주의깊게 봐야할 부분은

``` jsx
const onSubmit = async ({ username, password }) => {
  const { success, token } = await signIn({ username, password });
  if (success) {
    Cookies.set('session', token.split(' ')[1]);

    props.history.push('/user');
  }
};
```

이 함수이다. 이 함수는 아까 회원가입과 유사한데, signIn 메소드에서 return되는 값이 회원가입때와는 다른 모양이다. 한번 signIn 함수를 살펴보자. signIn 함수도 libs > api.js에 정의하였다.

``` jsx
export const signIn = async ({ username, password }) => {
  const { data } = await axios.post('http://localhost:4000/api/signin', {
    username,
    password,
  });
  return data;
};
```

근데 위에 signUp의 로직과 다를게 없다..그럼 결국 백엔드에서 처리하는 것이 다른 것이라고 판단할 수 있다. 근데 의문이 하나 든다. 데이터를 받아오는 것 뿐인데 왜 get 메소드가 아닌 post 메소드를 썻을까? 이유는 form 데이터이기 때문이다. form 데이터에 get을 하게 되면 URL에 폼의 내용을 추가하여 서버에 송신하는 방법이므로 보안 문제로 인해 적합하지 않아 데이터를 노출시키지 않는 post메소드를 사용했다.

그럼 백엔드에서 우리의 요청에 대한 결과로 무엇을 주었을까 확인해보자.

``` jsx
const onSubmit = async ({ username, password }) => {
  // const { success, token } = await signIn({ username, password });
  // 아래와 같이 변경해서 console.log를 찍어보았다.

  const data = await signIn({ username, password });
  console.log(data);
};
```

![practice_login_token](/images/practice/practice_login_token.jpg "practice_login_token")

이렇게 sucess값과 token 값을 백엔드 쪽에서 넘겨주었다 우리는 이것을 보통 **session**이라는 명칭으로 쿠키에 저장해둔다. 이때 백엔드 개발자쪽에서 프론트에 데이터를 넘겨주기전에 쿠키에 먼저 담아주었다면, 프론트쪽은 별도로 쿠키에 세션을 담을 필요가 없고 history.push로 다음 화면을 보여주면된다.

그리고 만약 쿠키를 담아주지 않았다면, 프론트쪽에서 session을 쿠키에 저장해주어야하는데 위의 예제는 쿠키에 프론트엔드 개발자가 담는 과정을 연습해보았다.

``` jsx
Cookies.set('session', token.split(' ')[1]);
```

쿠키는 Cookise.set(키, 값, [ 만료기한 ]])으로 저장이 가능하다.

- 첫번째 파라미터 : name을 설정 해주어야 한다. 1번째 파라미터의 이름은 암묵적으로 session이라고 정해주는 관습이 있다.
- 두번째 파라미터 : 첫번째 파라미터의 값을 적어준다
- 세번째 파라미터 : 쿠키도 만료기한을 설정해줄 수 있다. 기한을 생략할 경우 session cookie로 설정된다.


쿠키는 get과 set 메소드로 읽고 저장할 수 있는데 위의 코드를 보면 split으로 띄어쓰기 부분을 기준점으로 문자열을 잘라주었다. 이유는 띄어쓰기 다음이 token 값이기 때문이다. session의 이름으로 Cookie에 저장해주고 user 화면으로 전환시켰다.


## 로그아웃
<b>components > User > index.jsx</b>

``` jsx
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { signOut } from '../../libs/api';
import jwt from 'jsonwebtoken';

const User = props => {
  const session = Cookies.get('session');
  const [username, setUsername] = useState('');
  const key = process.env.REACT_APP_JWT_KEY;

  useEffect(() => {
    const decoded = jwt.verify(session, key);
    setUsername(decoded.username);
  }, []);

  const logOut = () => {
    signOut(session);
    Cookies.remove('session');
    props.history.push('/');
  };
  return (
    <>
      <h2>유저 페이지</h2>
      <h3 className="greeting">
        <span className="name">{username}</span>님 어서오세요
      </h3>
      <button className="signout-btn" onClick={logOut}>
        로그아웃
      </button>
    </>
  );
};

export default User;
```

![practice_login_user](/images/practice/practice_login_user.jpg "practice_login_user")

``` jsx
const session = Cookies.get('session');
const key = process.env.REACT_APP_JWT_KEY;

useEffect(() => {
  const decoded = jwt.verify(session, key);
  setUsername(decoded.username);
}, []);
```

위에서 볼 수 있듯이 key 값은 암호화를 하기 위해 .env파일에 상수로 저장하여 이를 가져와서 사용하는 식으로 하여 노출을 피했다.

그리고 쿠키에 담긴 session을 불러와서 verify메소드의 인수로 키값과 함께 넘겨주었다.

그러면 검증이 완료 되었을때는 어떤 데이터가 있을까?

![practice_login_de](/images/practice/practice_login_de.jpg "practice_login_de")

위와 같이 검증이 완료되었다면 해당 session에 담긴 token 값이 decode되어 반환되는 것을 확인할 수 있다.

만약 올바른 키 값이 아니라면??

![practice_login_de2](/images/practice/practice_login_de2.jpg "practice_login_de2")

위와 같이 signature 값이 올바르지 않다고 에러를 낸다.

이와 같이 JWT는 무결성을 보장할 수 있다.

다음은 로그아웃 기능을 살펴보자

``` jsx
const logOut = () => {
  signOut(session);
  Cookies.remove('session');
  props.history.push('/');
};
```

signOut 함수는 libs > api.js에 작성했다.

<b>lis > api.js</b>

``` jsx
export const signOut = async session => {
  const headers = {
    Authorization: `jwt ${session}`,
  };

  const { data } = await axios.get('http://localhost:4000/api/signout', {
    headers,
  });

  return data;
};
```

signOut 함수에서 인수로 넘겨준 session을 파라미터로 받아서 headers 객체의 Authorization키의 값으로 넣어주었다.

headers 객체의 Authorization키의 값은 백엔드에서 지정해놓은 header의 값이다. 이는 상황에 따라 바뀔 수 있다.

그리고 JWT 토큰이 담긴 header와 함께 get을 요청한다. 이때 JWT토큰을 넘겨주는 이유는 서버쪽에서 해당 토큰을 지정하여 삭제를 해야되기 때문에 토큰 값을 받아 처리한 후 처리결과를 리턴해준다.

![practice_login_logout](/images/practice/practice_login_logout.jpg "practice_login_logout")

또 signOut 내부의 비동기 처리가 있는데

``` jsx
const logOut = () => {
  signOut(session);
  Cookies.remove('session');
  props.history.push('/');
};
```

왜 signOut함수를 호출하는 logOut함수에는 async/await을 안 붙여줬을까? 이유는 처리순서에 딱히 의존하지 않기 때문이다. 로그아웃을 하면 해당 서버는 토큰을 삭제해주고, 클라이언트에서는 Cookie에 담긴 세션 값을 삭제해준다. 만약 서버에서 Cookie를 저장하고 삭제를 한다면 클라이언트에서는 따로 처리할 필요 없이 history.push로 원하는 화면으로 이동시켜주면 된다.

다음은 검증을 통해서 권한이 없는 페이지를 접속했을때 리다이렉팅 시키는 기능을 추가해보겠다.

우선 검증을 해주는 커스텀 Hook을 만들자

<b>lis > hooks.js</b>

``` jsx
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

export const useAuthed = () => {
  const [authed, setAuthed] = useState(() => {
    try {
      const session = Cookies.get('session');
      const key = process.env.REACT_APP_JWT_KEY;
      const res = jwt.verify(session, key);
      return res;
    } catch (err) {
      return false;
    }
  });

  return authed;
};
```

authed라는 상태를 만들어 verify된 세션의 값을 리턴해주는 함수로 초기화해주었다. 리턴 값은 jwt verify과정에서 오류가 나면 false를 리턴하도록 try/catch문으로 넣어서 체크하였다.

이제 테스트를 위해 기존의 코드를 수정해보자.

<b>components > User > index.jsx</b>

``` jsx
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { signOut } from '../../libs/api';
import jwt from 'jsonwebtoken';

const User = props => {
  const session = Cookies.get('session');
  const [username, setUsername] = useState('');
  const key = process.env.REACT_APP_JWT_KEY;

  useEffect(() => {
    const decoded = jwt.verify(session, key);
    setUsername(decoded.username);
  }, []);

  const logOut = () => {
    signOut(session);
    Cookies.remove('session');
    props.history.push('/');
  };
  return (
    <>
      <h2>유저 페이지</h2>
      <h3 className="greeting">
        <span className="name">{username}</span>님 어서오세요
      </h3>
      <button className="signout-btn" onClick={logOut}>
        로그아웃
      </button>
    </>
  );
};

export default User;
```

유저 페이지에서 화면에 사용자이름을 노출하기 위해 verify를 통해 decode하여 보여주었다.

하지만 다음과 같이 수정할 수 있다.

``` jsx
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { signOut } from '../../libs/api';
import { useAuthed } from '../../libs/hooks';

const User = props => {
  console.log('user', props);
  const [username, setUsername] = useState('');
  // Authed로 인해 User에서 따로 verify를 할 필요가 없어졌다.
  const { username: user } = useAuthed();

  useEffect(() => {
    setUsername(user);
  }, []);

  const logOut = () => {
    const session = Cookies.get('session');

    signOut(session);
    Cookies.remove('session');
    props.history.push('/');
  };
  return (
    <>
      <h2>유저 페이지</h2>
      <h3 className="greeting">
        <span className="name">{username}</span>님 어서오세요
      </h3>
      <button className="signout-btn" onClick={logOut}>
        로그아웃
      </button>
    </>
  );
};

export default User;
```

``` jsx
const { username: user } = useAuthed();
```

useAuthed 커스텀 Hook을 호출하면 초기 값으로 지정해준 함수가 실행되어 검증 결과를 return하는데, 만약 검증이 성공한다면 해당 session에 저장되어있는 토큰이 decoded되어 return이 될 것이고, 실패한다면 false가 return 될 것을 예측할 수 있다.

![login_authed](/images/practice/login_authed.gif "login_authed")

이제 useAuthed로 활용할 수 있는게 무엇이 있을까? 바로 라우팅에 활용할 수 있을 것 같다.

로그인이나 회원가입 페이지는 이미 로그인되어 있는 상태에서는 접속할 필요가 없을테니, 로그인 상태에서 회원가입 페이지나 로그인 페이지를 접속했을 시 경고창을 띄어보는 연습을 해보자.

``` jsx
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Main from './Main';
import './App.css';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import User from './components/User';
import { useAuthed } from './libs/hooks';

const AuthedRoute = ({ component: Component, ...rest }) => {
  const isAuthed = useAuthed();
  return (
    <Route
      render={props => {
        if (isAuthed) {
          return <Component {...rest} {...props} />;
        } else {
          return <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />;
        }
      }}
    />
  );
};

const UnAuthedRoute = ({ component: Component, ...rest }) => {
  const isAuthed = useAuthed();
  return (
    <Route
      {...rest}
      render={props => {
        if (isAuthed) {
          if (rest.path === '/signup') {
            alert('이미 회원가입이 되어있습니다.');
            return <Redirect to={{ pathname: '/', state: { from: props.location } }} />;
          } else if (rest.path === '/signin') {
            alert('이미 로그인이 되어있습니다.');
            return <Redirect to={{ pathname: '/', state: { from: props.location } }} />;
          }
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};

const App = () => {
  return (
    <Router>
      <Switch>
        <UnAuthedRoute path="/signup" component={SignUp} />
        <UnAuthedRoute path="/signin" component={SignIn} />
        <AuthedRoute path="/user" component={User} />
        <Route path="/" component={Main} />
      </Switch>
    </Router>
  );
};

export default App;
```

AuthedRoute, UnAuthedRoute 컴포넌트를 만들어 내부에서 useAuthed 커스텀 hook을 이용하여 검증을 한 후 만약 검증된 값이 true라면 해당 Route에 연결된 컴포넌트를 노출시켜주고, false라면 Route의 Redirect을 사용하여 실행해주었다.

``` jsx
const AuthedRoute = ({ component: Component, ...rest }) => {}

const UnAuthedRoute = ({ component: Component, ...rest }) => {}
```

이런식으로 props로 component를 받았는데 이때 React에서 컴포넌트명은 파스칼케이스로 네이밍을 해야하므로 component의 키값을 Component 변수에 담아 사용하고 그 뒤에 prop로는 무엇이 넘어올지 확실할 수 없으니 재사용을 위해서 rest 파라미터를 사용하였다.


이렇게 검증결과를 이용하여 화면에 ui를 구성하거나, 리다이렉트시키는 기능까지 마췄다.

JWT는 암호화를 위한 것이 아닌 무결성을 체크한다는 것을 잊지말자.



<br>
<br>
<br>
<br>
<br>
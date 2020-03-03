---
title: React Router
date: "2019-12-14"
template: "post"
draft: false
slug: "/posts/react/router"
category: "React"
tags:
  - "React"
  - "React Router"
  - "React Router DOM"
description: "React Router에 대해 알아보자"
---
<span class="notice">
  <em>TIL 내용이므로 잘못된 내용은 댓글 부탁드립니다</em>
</span>

<div id="toc">

**:link:  Table Of Contents**

- [React Router](#react-router)
  - [프로젝트 구성하기](#프로젝트-구성하기)
  - [각 컴포넌트 작성](#각-컴포넌트-작성)
  - [라우트 설정](#라우트-설정)
- [파라미터와 쿼리](#파라미터와-쿼리)
  - [URL Params](#url-params)
  - [Query](#query)
- [라우터의 부가기능](#라우터의-부가기능)
  - [history 객체](#history-객체)
  - [withRouter HoC](#withrouter-hoc)
  - [NavLink](#navlink)

</div>

## React Router
React Router는 서드파티 라이브러리로서, 가장 많이 사용되고 있는 라이브러리이다.(페이스북 공식 라우팅 라이브러리는 존재하지 않다) 이 라이브러리는 클라이언트 사이드에서 이뤄지는 라우팅을 간단하게 해주고, 서버 사이드 렌더링도 도와주는 도구들이 포함되어 있다.

### 프로젝트 구성하기

먼저 실습할 프로젝트를 구성해보자

``` bash
npx create-react-app router-practice
```

그 다음 해당 디렉토리로 이동해보자

``` bash
cd router-practice
```

해당 디렉토리 폴더 구조를 구성해보자

![react_router_structor](/images/react/react_router_structor.jpg "react_router_structor")



구조를 확인하였으면 React Router를 설치해보자

``` bash
npm install react-router-dom --save
```

<hr class="sub" />

### 각 컴포넌트 작성
라우터 구성할 준비가 끝났으니 이제 각각의 파일에 코드를 작성해보자

<b>src/pages/Home.js</b>

``` jsx
import React from 'react'

const Home = () => {
  return (
    <div>
      Home
    </div>
  )
}

export default Home;
```

<b>src/pages/About.js</b>

``` jsx
import React from 'react'

const About = () => {
  return (
    <div>
      About
    </div>
  )
}

export default About;
```

<b>src/pages/Profile.js</b>

``` jsx
import React from 'react'

const Profile = () => {
  return (
    <div>
      Profile
    </div>
  )
}

export default Profile;
```

이제 각 컴포넌트 작성은 끝났다

<hr class="sub" />

### 라우트 설정

<b>./App.js</b>

``` jsx
import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { Home, About, Profile } from './pages';

class App extends Component {
  render () {
    return (
      <>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/profile" component={Profile} />
          </Switch>
        </Router>
        <Link to=""></Link>
      </>
    );
  }
}

export default App;
```

as는 react-router-dom 라이브러리의 BrowserRouter를 Router로 사용한다는 의미이다.

먼저 react-router-dom의 주요 컴포넌트를 정리해보자

- **BrowserRouter**: 어떤 주소에서 어떤 컴포넌트를 쓰겟다 선언(라우트의 집합이다라고 생각하면 된다)
- **Switch**: 여러가지 조건에서 첫번째 조건이 맞으면 다음 조건까지 보지 않고 실행을 멈춘다.(javascript 문법이랑 같다), 아무것도 일치하지 않았을 경우 보여줄 Not Found 페이지를 구현할 수 있다.
- **Route**: path를 지정하는데 쿼리스트링(예를들면, www.test.com/?v= 에서 .com/ 이후)을 따로 정의하지 않아야된다, conponent에 요청시 보여줄 컴포넌트를 지정해주면된다.
- **Link**: 클릭하면 다른 주소로 이동시키는 react router 컴포넌트이다. 리액터 라우터를 사용시엔 일반 &lt;a href="..."&gt; 태그를 사용하면 안된다. 만약 사용시 onClick 이벤트에 e.preventDefault()를 호출하여 따로 자바스크립트로 주소를 변환 시켜주어야 한다. e.preventDefault()는 태그의 기본 기능을 해제하는 함수이다. a 태그의 기본적인 속성은 페이지를 이동시키면서, 페이지를 아예 새로 불러오게한다. 그러면 리액트앱에서는 리액트 앱이 가지고 있는 상태들도 초기화되고, 렌더링된 컴포넌트들도 모두 사라지고 새로 렌더링하게 된다. 그걸 막기위해 e.preventDefault()를 사용하는데 이 부분도 매번 해줘야되므로 Link 컴포넌트를 사용한다. **Link 컴포넌트는 HTML5 History API를 사용하여 브라우저의 주소만 바꿀뿐 페이지를 새로 불러오진 않는다.**


근데 첫번째 라우트인 exact가 붙어있다. 이것은 무엇이냐면 주어진 경로와 정확히 맞아 떨어져야만 설정한 컴포넌트를 보여준다. Switch는 자바스크립트 문법과 같이 나열된 조건들 중에 하나라도 맞아떨어진다면 즉시 라우팅 하고 끝낸다. 그래서 만약 exact를 생략하고 두번째 라우터 /about을 요청하게 되면 /이 먼저 조건에 부합하여 /이 먼저 노출될 것이다.

일단 exact를 붙인 상태에서 한번 확인을 한 후, exact를 제거하여 확인해보자

Root 접근

![react_router_home](/images/react/router_home.jpg "react_router_home")

정상적으로 잘 작동한다.

<br>

About 접근

![react_router_about](/images/react/router_about.jpg "react_router_about")

정상적으로 잘 작동한다.

<br>

Profile 접근

![react_router_Profile](/images/react/router_profile.jpg "router_profile")

정상적으로 잘 작동한다.

<br>

**이제 위에서 말한 exact을 삭제한 후 실행해보자.**

About 접근

![react_router_about2](/images/react/router_about2.jpg "react_router_about2")

<br>

Profile 접근

![react_router_Profile2](/images/react/router_profile2.jpg "router_profile2")

앞서 얘기했듯이 Route의 첫번째 라우트인 /가 먼저 조건에 부합하여 선택되어 두번째, 세번째 라우터 설정인 About과 Profile에 접근이 힘들어졌다.

이럴때는 exact를 사용하는 방법이 있고, Switch의 차례대로 조건을 체크하는 특징을 살려서 순서만으로도 해결할 수 있다.

이제 Switch 특징을 살려서 확인해보자.

일단 Route를 설정하는 파일을 아래와 같이 수정해보자

<b>./App.js</b>

``` jsx
import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { Home, About, Profile } from './pages';

class App extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/profile" component={Profile} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    );
  }
}

export default App;
```

이렇게 공통적으로 포함하고있는 path="/"가 설정된 라우트를 맨 아래로 내리게되면 정상적으로 작동한다.

<br>

## 파라미터와 쿼리

페이지 주소를 정의할때, 우리는 유동적인 값을 전달해야 할때가 있다. 이는 파라미터와 쿼리로 나누어지는데

``` code
파라미터: /profile/publee
쿼리: /watch?some=abcdefg
```

일반적으로 파라미터는 특정 id나 이름을 가지고 조회를 할 때 사용하고, 쿼리는 어떤 키워드를 검색하거나 요청을 할 때 필요한 옵션을 전달할 때 사용된다.

<br>

### URL Params

**예시코드**
``` code
http://test.com/profile/publee
```

profile 페이지에서 해당 파라미터를 사용해보자.

위 코드에서 profile/publee 이렇게 뒷부분에 username을 넣어줄때 해당 값을 받아오는 방법은

**Route 설정**
``` jsx
<Route path="/profile/:username" component={Profile} />
```

위와 같이 Router를 설정해주고

**profile**
``` jsx
import React from 'react';

const Profile = props => {
  const { username } = props.match.params;
  console.log(username) // publee

  return (
    <div>
      {username}
    </div>
  )
}

export defualt Profile
```

파라미터를 받아올땐 match 안에 있는 params를 참조한다. match 객체안에는 현재의 주소가 Route 컴포넌트에서 정한 규칙과 어떻게 일치하는지에 대한 정보가 들어 있다.

이때 주의할 점은 원하는 params를 받기위해서 Route에 등록된 변수명(:username)과 동일한 네이밍을 해줘야된다.

다른 방법으로는 react-router-dom의 커스텀 훅 useParams를 사용하여 params를 꺼내올 수 있다.

``` jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const Profile = props => {
  const { username } = useParams();
  console.log(username) // publee

  return (
    <div>
      {username}
    </div>
  )
}

export defualt Profile
```

useParams를 사용할 수 있는 것은 react-router-dom이 내부적으로 Context API를 사용하기 때문에 전역적으로 사용이 가능하다.

<hr class="sub" />

### Query

Watch 페이지에서 쿼리를 받아보자.

**예시코드**
``` code
http://test.com/watch?some=abcdefg
```

쿼리는 라우트 컴포넌트에게 props로 전달되는 location 객체에 있는 **search** 값에서 읽어올 수 있다.

location 객체는 현재 앱이 갖고 있는 주소에 대한 정보를 지니고 있다.

아래는 location 객체이다.

``` code
{
  pathname: "/watch",
  search: "?some=abcdefg",
  hash: "",
  state: undefined,
  key: "qbqby9",
}

```

하지만 search 값은 문자열 형태로 되어있어, 사용하기위해 객체로 변환하는건 개발자가 해야한다.

먼저 자바스크립트의 내장함수인 URLSearchParams를 사용해보자

``` javascript
const searchParams = new URLSearchParams(props.location.search);

console.log(searchParams);
```

결과는

``` code
URLSearchParams {}
```

위와 같이 리턴된다.

이유는 퍼블릭하지 않기 때문이다. 그래서 get함수를 이용하여 꺼낸다.

``` javascript
const searchParams = new URLSearchParams(props.location.search);
const name = searchParams.get('some');
console.log(searchParams); // abcdefg
```

이렇게 get함수를 사용하여 location.search에 있는 문자열을 필터링할 수 있다.

하지만 IE에서 호환이 안된다는 점에 있어.

대부분 query-string 라이브러리를 사용한다.

``` bash
npm i query-string --save
```

설치 후 import 시켜준다.

``` jsx
import qs from 'query-string'
```

이제 location 객체를 변환해보자.

``` jsx
console.log(qs.parse(props.location.search)); // { some: abcdefg }
const { some } = qs.parse(props.location.search)
```

이런식으로 쿼리를 받을 수 있다.

props.location.search을 props를 통해서가 아닌 useLocation Hook을 이용하여 사용할 수도 있다.

``` javascript
const location = useLocation();
const { some } = queryString.parse(location.search);
```

useLocation 사용할 수 있는 것은 react-router-dom이 내부적으로 Context API를 사용하기 때문에 전역적으로 사용이 가능하다



<br>

## 라우터의 부가기능

### history 객체
history 객체는 Route로 사용된 컴포넌트에게 match, location와 함께 전달되는 props 중 하나이다. 이 객체를 통해서 우리가 컴포넌트 내 사용할 메소드에서 직접 접근할 수 있다.

- 뒤로가기
- 특정 path로 이동
- 이탈 방지

등..

사용법 예시

``` jsx
import React, { useEffect } from 'react';

function HistorySample({ history }) {
  const goBack = () => {
    history.goBack(); // 뒤로하기
  };

  const goHome = () => {
    history.push('/'); // root로 이동하기
  };

  useEffect(() => {
    const unblock = history.block('정말 떠나실건가요?');
    return () => {
      unblock();
    };
  }, [history]);

  return (
    <div>
      <button onClick={goBack}>뒤로가기</button>
      <button onClick={goHome}>홈으로</button>
    </div>
  );
}

export default HistorySample;
```

이렇게 history 객체를 사용하면 조건부로 다른 주소로 변경이 가능하고, 이탈을 alery을 통하여 막을 수 있다.

props로 전달받지 않고 useHistory Hook을 사용하여 history 객체를 사용할 수도 있다.

``` jsx
import React, { useEffect } from 'react';

function HistorySample() {
  const history = useHistory();
  const goBack = () => {
    history.goBack(); // 뒤로하기
  };

  const goHome = () => {
    history.push('/'); // root로 이동하기
  };

  useEffect(() => {
    const unblock = history.block('정말 떠나실건가요?');
    return () => {
      unblock();
    };
  }, [history]);

  return (
    <div>
      <button onClick={goBack}>뒤로가기</button>
      <button onClick={goHome}>홈으로</button>
    </div>
  );
}

export default HistorySample;
```

useHistory를 사용할 수 있는 것은 react-router-dom이 내부적으로 Context API를 사용하기 때문에 전역적으로 사용이 가능하다.

<hr class="sub" />

### withRouter HOC

Route 컴포넌트가 아닌 컴포넌트에서 match / location / history를 사용해야 할 때 사용한다.

> HOC(High Order Component)<br>
> Input으로 컴포넌트를 전달받고 props를 설정하여 Output으로 prop가 설정된 컴포넌트를 리턴하는 함수

``` jsx
import React from 'react';
import { withRouter } from 'react-router-dom';
const WithRouterSample = ({ location, match, history }) => {
  return (
    <div>
      <h4>location</h4>
      <button onClick={() => history.push('/')}>홈으로</button>
    </div>
  );
};

export default withRouter(WithRouterSample);
```

<hr class="sub" />

### NavLink
현재 경로와 Link 에서 사용하는 경로가 일치하는 경우 특정 스타일 혹은 클래스를 적용 할 수 있는 컴포넌트이다.

특정 스타일 적용하는 예제

``` jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sample = () => {
  return (
    <ul>
      <li>
        <NavLink
          to="/profiles"
          activeStyle={{ background: 'black', color: 'white' }}
        >
          profiles
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          activeStyle={{ background: 'black', color: 'white' }}
        >
          about
        </NavLink>
      </li>
    </ul>
  );
};
```

스타일이 아닌 특정 클래스를 적용하고 싶다면

```javascript
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sample = () => {
  return (
    <ul>
      <li>
        <NavLink
          to="/profiles"
          activeClassName="on"
        >
          profiles
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          activeClassName="on"
        >
          about
        </NavLink>
      </li>
    </ul>
  );
};
```

<br>
<br>
<br>
<br>
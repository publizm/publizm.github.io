---
title: 문자열 형태의 html 렌더링하기
date: "2019-12-26"
template: "post"
draft: false
slug: "/posts/react/htmlRendering"
category: "React"
tags:
  - "React"
  - "줄바꿈 처리"
  - "string to html"
description: "문자열 형태의 html을 렌더링하는 방법에 대해 알아보자"
---
<span class="notice">
  <em>TIL 내용이므로 잘못된 내용은 댓글 부탁드립니다</em>
</span>

React에서는 cross-site scripting(XSS) 공격을 막기 위해 렌더링 메소드 내부에서 html태그가 담겨 있는 string 형태를 렌더링하면, 태그로 인식이 안되고 문자열 그대로 렌더링되게 된다.

만약 이런 코드가 있다고 가정해 보자

``` jsx
import React from 'react';

const Test = () => {
  let codes = "<script>console.log('Hello world')</script>";
  return <div>{codes}</div>;
}

export default Test;
```

**결과화면**

![html_rendering_01](/images/react/html_rendering_01.jpg "html_rendering_01")

만약 위 문자열에 태그가 적용된 상태로 렌더링이 된다면, 사용자가 임의로 웹페이지에 스크립트를 먹일 수 있게되어 취약점이 생길 것이다.

React에선 이 같은 취약점을 차단하기 위해서 텍스트형태로만 렌더링하게 설정되어 있다.

하지만 dangerouslySetInnerHTML을 속성 값으로 넣어줌으로써 텍스트를 태그로 렌더링 시킬 수 있는데, 이 속성은 직접 HTML을 설정할 수 있지만 위험하다는 것을 상기시키기 위해 키를 사용한다. 이 키를 사용할때는 XSS 공격의 별도의 대비를 하는 것이 좋다.

사용법은 아래의 코드와 같다

``` jsx
import React from 'react';

const Test = () => {
  let codes = '<b>Hello world</b>';
  return <div dangerouslySetInnerHTML={{ __html: codes }}></div>;
}

export default Test;
```

**결과화면**

![html_rendering_02](/images/react/html_rendering_02.jpg "html_rendering_02")

<br>

다른 상황으로는

![html_rendering_03](/images/react/html_rendering_03.jpg "html_rendering_03")

위와 같이 textarea에 입력된 값이 enter키로 줄바꿈이 있는 댓글이라 가정하고, 해당 등록 버튼을 눌러 textarea의 value 값을 html로 렌더링해보면

<br>

![html_rendering_04](/images/react/html_rendering_04.jpg "html_rendering_04")

이렇게 원하는대로 줄바꿈이 일어나지 않을 것이다. 그래서 생각한게 개행의 의미를 담고 있는 이스케이프 시퀀스 <b>'\n'</b>을 <b>&lt;br&gt;</b>로 변환해주면 되지 않을까? 라는 생각이 든다

<br>

일단 변환을 해보자.

변환을 위해 정규표현식과 String.Prototype.replace 메소드를 사용(replace(/\n/g, '&lt;br/&gt;')) 해보았다.

![html_rendering_05](/images/react/html_rendering_05.jpg "html_rendering_05")

개행문자가 <b>&lt;br&gt;</b>로 변환은 되었다. 하지만 문자열로 렌더링되어 그대로 노출된다.

<br>

위와 같은 상황에서 위에서 언급했던 dangerouslySetInnerHTML를 사용할 수 있지만 이보다 더 좋은 방법이 있다.
바로 map을 사용하는 것이다.

<br>

개행문자 \n을 기준으로 문자열을 배열로 나누어보자.<br>
문자열을 배열로 사용하는 것에는 split을 사용해보자.
그럼 아까와 같은 문자열이 아래의 배열 처럼 나눠질 것이다.

![html_rendering_06](/images/react/html_rendering_06.jpg "html_rendering_06")

그럼 위의 배열을 map 함수를 이용해서 랜더링해주자.

``` jsx
{
  str.split('\n').map(cmt => {
    return (<p>{cmt}</p>)
  })
}
```

**결과화면**

![html_rendering_07](/images/react/html_rendering_07.jpg "html_rendering_07")


<br>
<br>
<br>
<br>
<br>
<br>
<div class="reference-site">

  **Reference**<br>

  [velopert님의 블로그](https://velopert.com/1896)

</div>
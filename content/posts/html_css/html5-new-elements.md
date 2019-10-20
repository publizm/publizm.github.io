---
title: HTML5 New Elements
date: "2019-09-22"
template: "post"
draft: false
slug: "/posts/html/html5-new-elements/"
category: "HTML"
tags:
  - "HTML5"
description: "Html5 New elements"
---
<span class="notice">
  <em>HTML5에서 새롭게 등장한 Element들을 알아보자</em>
</span>

## New Sections

### header
``` html
<header>
    보통 웹 문서의 맨 윗부분에 있으며
    웹 사이트 이름, 글로벌 링크(로그인, 회원가입, 사이트맵, 언어 선택 등)으로
    구성된 영역이다.
</header>
```

- 브라우저가 헤더영역을 인식할 수 있게되면 스크린리더의 내비게이션과 검색엔진의 색인에 도움을 줄 수 있다.
- **&lt;section&gt;**이나 **&lt;article&gt;**내에 **&lt;header&gt;**가 존재할 수 있다. (이때는 **&lt;section&gt;,&lt;article&gt;**에 대한 **&lt;header&gt;**가 된다.)
- **&lt;header&gt;**가 나타나기전까진 **&lt;div id="header"&gt;**와 같이 쓰였다.<br>
하지만 위의 같은 방식으로 할때는 스크린리더가 헤더영역이라는 것을 인식을 못하여 헤더역할의 제 기능을 못하게된다. 이때 **[role="banner"]** 속성을 이용하자 완벽히는 아니지만 비슷한 역할을 부여하고 있는 것을 의미한다.

<br>

##### :zap: 지원하는 브라우저 및 버전
<article class="browser-tbl">

|  **tag**  | ![chrome](/icons/chrome.jpg "chrome") | ![ie edge](/icons/edge.jpg "ie edge") | ![ie](/icons/ie.jpg "ie") | ![firefox](/icons/firefox.jpg "firefox") | ![safari](/icons/safari.jpg "safari") | ![opera](/icons/opera.jpg "opera") |
| :---:  | :---: | :---: | :---: | :---: | :---: | :---: |
| __header__ | 5.0~ | O | 9.0~ | 4.0~ | 4.1~ | 11.1~ |

</article>

<hr class="sub" />

### footer
``` html
<footer>
    웹 문서의 맨 아랫부분에 있으며
    보통 저자 정보, 관련 링크, 저작권 등의 내용을 포함한다.
</footer>
```

- 보통 꼬리말 역할을 하는데, 본문과의 관련성은 있지만 본문에는 담기 어려운 내용을 담는다
- **&lt;section&gt;**이나 **&lt;article&gt;**내에 **&lt;footer&gt;**가 존재할 수 있다. (이때는 **&lt;section>,<article&gt;**에 대한 **&lt;footer&gt;**가 된다.)
- **&lt;footer&gt;**가 나타나기전까진 **&lt;div id="footer"&gt;**와 같이 쓰였다.<br>
하지만 위의 같은 방식으로 할때는 스크린리더가 푸터영역이라는 것을 인식을 못하여 푸터역할의 제 기능을 못하게된다. 이때 **[role="contentinfo"]** 속성을 이용하자 완벽히는 아니지만 비슷한 역할을 부여하고 있는 것을 의미한다.

<br>

##### :zap: 지원하는 브라우저 및 버전
<article class="browser-tbl">

|  **tag**  | ![chrome](/icons/chrome.jpg "chrome") | ![ie edge](/icons/edge.jpg "ie edge") | ![ie](/icons/ie.jpg "ie") | ![firefox](/icons/firefox.jpg "firefox") | ![safari](/icons/safari.jpg "safari") | ![opera](/icons/opera.jpg "opera") |
| :---:  | :---: | :---: | :---: | :---: | :---: | :---: |
| __footer__ | 5.0~ | O | 9.0~ | 4.0~ | 4.1~ | 11.1~ |

</article>

<hr class="sub" />

### section
``` html
<section>
    <h1>Section Title</h1>
    문서 또는 애플리케이션의 절(섹션)을 의미한다.
</section>
```

- 문서 또는 애플리케이션의 절(섹션)을 의미한다.
- 개요(**outline**)을 생성하는 섹셔닝 콘텐츠이다.
- 각 절을 주제에 따라 나눈 것으로 각 **&lt;section&gt;**의 주제는 서로 구분되어야 한다.
- 문서의 구조를 시멘틱하게 하기 위해 헤딩(**h1 ~ h6**)을 포함하는 것을 권장한다.
- 독립적인 영역이라 섹션내에 **&lt;header&gt;**와 **&lt;footer&gt;**를 둘 수 있다
- 스크린리더 사용자는 섹션 단위로 이동할 수 있으므로 문서내 이동이 수월해지고, 검색엔진은 특정 섹션 중심으로 색인 활동을 할 수 있으므로 검색엔진 최적화에도 효율성을 높일 수 있다.
- 스타일링 목적만으로 컨테이너를 사용할때는 section 보다 div요소를 사용하는 것을 권장한다.

<br>

##### :zap: 지원하는 브라우저 및 버전
<article class="browser-tbl">

|  **tag**  | ![chrome](/icons/chrome.jpg "chrome") | ![ie edge](/icons/edge.jpg "ie edge") | ![ie](/icons/ie.jpg "ie") | ![firefox](/icons/firefox.jpg "firefox") | ![safari](/icons/safari.jpg "safari") | ![opera](/icons/opera.jpg "opera") |
| :---:  | :---: | :---: | :---: | :---: | :---: | :---: |
| __section__ | 5.0~ | O | 9.0~ | 4.0~ | 4.1~ | 11.1~ |

</article>

<hr class="sub" />

### article
``` html
<article>
    <h1>Article Title</h1>
    독립적인 배포와 재 사용이 가능한 완결형 요소를 의미한다.
    포럼 게시물, 잡지 또는 뉴스 기사, 블로그 본문, 상호작용 위젯 등
    독립적인 내용이 올 수 있다.
</article>
```

- 개요(**outline**)을 생성하는 섹셔닝 콘텐츠이다.
- 문서의 구조를 시멘틱하게 하기 위해 헤딩(**h1 ~ h6**)을 포함하는 것을 권장한다.
- 독립적인 영역이라 섹션내에 **&lt;header&gt;**와 **&lt;footer&gt;**를 둘 수 있다
- **&lt;section&gt;** 요소가 관련 있는 내용을 묶는 역할이라면 **&lt;article&gt;** 요소는 관련있는 내용중에서 독립적으로 구성된 글을 별도로 묶는 역할이다.<br>
그래서 **&lt;section&gt;**안에서도 **&lt;article&gt;**이 올 수 있다.

<br>

##### :zap: 지원하는 브라우저 및 버전
<article class="browser-tbl">

|  **tag**  | ![chrome](/icons/chrome.jpg "chrome") | ![ie edge](/icons/edge.jpg "ie edge") | ![ie](/icons/ie.jpg "ie") | ![firefox](/icons/firefox.jpg "firefox") | ![safari](/icons/safari.jpg "safari") | ![opera](/icons/opera.jpg "opera") |
| :---:  | :---: | :---: | :---: | :---: | :---: | :---: |
| __article__ | 5.0~ | O | 9.0~ | 4.0~ | 4.1~ | 11.1~ |

</article>

<hr class="sub" />

### nav
``` html
<nav>
    <h1>Navigation Title</h1>
    다른 페이지 또는 현재 페이지의 일부를 링크하는 주된 탐색 섹션이다.
</nav>
```

- 개요(**outline**)을 생성하는 섹셔닝 콘텐츠이다.
- 문서의 구조를 시멘틱하게 하기 위해 헤딩(**h1 ~ h6**)을 포함하는 것을 권장한다.
- 브라우저가 네비게이션 영역을 알 수 있게 되면 스크린리더의 내비게이션과 검색엔진의 색인에도 도움을 줄 수 있다.

<br>

##### :zap: 지원하는 브라우저 및 버전
<article class="browser-tbl">

|  **tag**  | ![chrome](/icons/chrome.jpg "chrome") | ![ie edge](/icons/edge.jpg "ie edge") | ![ie](/icons/ie.jpg "ie") | ![firefox](/icons/firefox.jpg "firefox") | ![safari](/icons/safari.jpg "safari") | ![opera](/icons/opera.jpg "opera") |
| :---:  | :---: | :---: | :---: | :---: | :---: | :---: |
| __nav__ | 5.0~ | O | 9.0~ | 4.0~ | 4.1~ | 11.1~ |

</article>

<hr class="sub" />

### aside
``` html
<aside>
    <h1>Navigation Title</h1>
    배너, 용어 설명, 관련 상품 등
    본문 내용과 직접적인 관련성이 적거나 없는
    내용으로 구성된다.
</aside>
```

- 페이지의 주된 내용과 관련이 약해서 구분할 필요가 있는 섹션.
- 개요(**outline**)을 생성하는 섹셔닝 콘텐츠이다.
- aside 요소로 구성된 것을 검색엔진은 무시하고 본문 위주로 색인을 진행할 수 있고 스크린리더 사용자는 해당 영역이 어떤 성격의 영역인지 신속하게 파악할 수 있으므로 곧바로 다른 영역으로 이동할 수도 있다.

##### :zap: 지원하는 브라우저 및 버전
<article class="browser-tbl">

|  **tag**  | ![chrome](/icons/chrome.jpg "chrome") | ![ie edge](/icons/edge.jpg "ie edge") | ![ie](/icons/ie.jpg "ie") | ![firefox](/icons/firefox.jpg "firefox") | ![safari](/icons/safari.jpg "safari") | ![opera](/icons/opera.jpg "opera") |
| :---:  | :---: | :---: | :---: | :---: | :---: | :---: |
| __aside__ | 5.0~ | O | 9.0~ | 4.0~ | 4.1~ | 11.1~ |

</article>

<br>
<br>

## New grouping content

### main
``` html
<main role="main">
    문서의 핵심 주제 또는 애플리케이션의 핵심 기능과
    직접적으로 관련있는 콘텐츠 영역을 의미한다.
</main>

<div role="main">
    main태그는 ie에서 지원이 불가하여 role 속성을 이용하여
    역할을 부여
</div>
```

- 페이지마다 반복되지 않는 내용을 포함해야 한다.
- 섹셔닝 콘텐츠는 아니기 때문에 개요(**outline**)를 형성하지 않는다.
- 하나의 페이지 안에서 한번만 선언할 수 있다.
- **&lt;header&gt;**, **&lt;footer&gt;**, **&lt;article&gt;**, **&lt;nav&gt;**, **&lt;aside&gt;** 요소의 자식이 될 수 없다.
- **&lt;main&gt;** 요소는 대부분의 인터넷 익스플로러 11 이하를 제외한 브라우저에서 지원합니다. 따라서 "main" ARIA role 속성을 **&lt;main&gt;** 요소에 추가해 인터넷 익스플로러에서도 접근성을 확보하는 편이 좋습니다.

<br>

##### :zap: 지원하는 브라우저 및 버전
<article class="browser-tbl">

|  **tag**  | ![chrome](/icons/chrome.jpg "chrome") | ![ie edge](/icons/edge.jpg "ie edge") | ![ie](/icons/ie.jpg "ie") | ![firefox](/icons/firefox.jpg "firefox") | ![safari](/icons/safari.jpg "safari") | ![opera](/icons/opera.jpg "opera") |
| :---:  | :---: | :---: | :---: | :---: | :---: | :---: |
| __main__ | 26.0~ | 12.0~ | X | 21.0~ | 7.0~ | 16.0~ |

</article>

<hr class="sub" />

### figure
``` html
<figure>
    문서의 주된 흐름을 위해 참조되는
    독립적인 완결형 요소로서
    삽화 설명, 도표, 사진, 코드 등 일반적인 내용을 포함할 수 있다.
</figure>
```

- 자식 요소를 포함할 수 있으므로 **&lt;img&gt;**, **&lt;canvas&gt;**, **&lt;video&gt;**, **&lt;code&gt;** 요소 등 다양한 형식의 요소를 같은 주제로 묶어서 표시할 수 있다.
- 선택적으로 처음 또는 마지막에 **&lt;figcaption&gt;** 요소를 자식 요소로 포함할 수 있고 또는 생략할 수 있다.

<br>

##### :zap: 지원하는 브라우저 및 버전
<article class="browser-tbl">

|  **tag**  | ![chrome](/icons/chrome.jpg "chrome") | ![ie edge](/icons/edge.jpg "ie edge") | ![ie](/icons/ie.jpg "ie") | ![firefox](/icons/firefox.jpg "firefox") | ![safari](/icons/safari.jpg "safari") | ![opera](/icons/opera.jpg "opera") |
| :---:  | :---: | :---: | :---: | :---: | :---: | :---: |
| __figure__ | 8.0~ | O | 9 | 4.0~ | 5.1~ | 11.0~ |

</article>

<hr class="sub" />

### figcaption
``` html
<figure>
    <figcaption>
        부모 figure 요소의 내용에 대한 설명 또는 범례를 의미한다.
    </figcaption>
</figure>
```

- 반드시 위치는 **처음 또는 마지막**에 위치해야하고 또는 생략할 수 있다.
- figure안에서 **한번**만 사용할 수 있다.

<br>

**:bulb: &lt;figcaption&gt;** 와 **&lt;img&gt;의 alt=""**

- **&lt;figcaption&gt;** 요소는 도표와 함께 제공되는 상황에서 제목을 표시하기 위한 것이다.
- **alt**는 도표가 없는 상황에서 도표를 표시하기 위한 것이다.

<br>

##### :zap: 지원하는 브라우저 및 버전
<article class="browser-tbl">

|  **tag**  | ![chrome](/icons/chrome.jpg "chrome") | ![ie edge](/icons/edge.jpg "ie edge") | ![ie](/icons/ie.jpg "ie") | ![firefox](/icons/firefox.jpg "firefox") | ![safari](/icons/safari.jpg "safari") | ![opera](/icons/opera.jpg "opera") |
| :---:  | :---: | :---: | :---: | :---: | :---: | :---: |
| __figcaption__ | 8.0~ | O | 9 | 4.0~ | 5.1~ | 11.0~ |

</article>
<br>
<br>
<br>
<br>
<br>
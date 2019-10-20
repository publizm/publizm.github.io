---
title: About CSS Counter
date: "2019-10-03"
template: "post"
draft: false
slug: "/posts/css/css-counter"
category: "CSS"
tags:
  - "CSS"
  - "content"
  - "counter"
  - "counter-reset"
  - "counter-increment"
description: "CSS Counter Attribute"
---
<span class="notice">
  <em>CSS의 content 속성을 활용하는 방법을 알아보자.</em>
</span>

## content 요소란?
content 속성은 ::before 및 ::after 유사 요소 와 함께 생성 된 내용을 삽입하는 데 사용된다.


##### :zap: 지원하는 브라우저 및 버전
<article class="browser-tbl">

|  **속성**  | ![chrome](/icons/chrome.jpg "chrome") | ![ie edge](/icons/edge.jpg "ie edge") | ![ie](/icons/ie.jpg "ie") | ![firefox](/icons/firefox.jpg "firefox") | ![safari](/icons/safari.jpg "safari") | ![opera](/icons/opera.jpg "opera") |
| :---:  | :---: | :---: | :---: | :---: | :---: | :---: |
| __[content]__ | O | O | 8.0~ | 3.5~ | O | 4.0~ |

</article>

<br>
<br>

## counter 속성 사용법
counter 속성을 html문서에 쓰지 않고, css로 숫자를 생성하면서 자동으로 번호를 매길 수 있게 한다.
counter를 쓸때는 counter-reset 속성과 counter-increment 속성을 함께 사용해야 한다.

<br>

### counter-reset
counter-reset은 카운터 이름과 시작값을 설정하는 속성이다.

``` css
target {counter-reset: 카운터이름 숫자;}
/*
  숫자의 디폴트 값은 0이고, 음수값도 가능하다.
*/
```

<br>

##### :zap: 지원하는 브라우저 및 버전
<article class="browser-tbl">

|  **속성**  | ![chrome](/icons/chrome.jpg "chrome") | ![ie edge](/icons/edge.jpg "ie edge") | ![ie](/icons/ie.jpg "ie") | ![firefox](/icons/firefox.jpg "firefox") | ![safari](/icons/safari.jpg "safari") | ![opera](/icons/opera.jpg "opera") |
| :---:  | :---: | :---: | :---: | :---: | :---: | :---: |
| __[counter-reset]__ | 2.0~ | 12.0~ | 8.0~ | 1.0~ | 3.0~ | 9.2~ |

</article>

<hr class="sub" />

### counter-increment
counter-reset으로 설정한 값을 증가시키는 역할

``` css
target {counter-increment: 카운터이름 증가할 숫자 단위;}

/* 예시 */
parent {counter-reset: count 0;}
children {counter-increment: count;} /* 설정하지 않으면 기본값에서 1씩 증가 */
children {counter-increment: count -1;} /* -1씩 감소 */
children {counter-increment: count 1 count2 -1;} /* count는 1씩 증가, count2는 -1씩 감소 */
```

<br>

##### :zap: 지원하는 브라우저 및 버전
<article class="browser-tbl">

|  **속성**  | ![chrome](/icons/chrome.jpg "chrome") | ![ie edge](/icons/edge.jpg "ie edge") | ![ie](/icons/ie.jpg "ie") | ![firefox](/icons/firefox.jpg "firefox") | ![safari](/icons/safari.jpg "safari") | ![opera](/icons/opera.jpg "opera") |
| :---:  | :---: | :---: | :---: | :---: | :---: | :---: |
| __[counter-reset]__ | 2.0~ | 12.0~ | 8.0~ | 1.0~ | 3.0~ | 9.2~ |

</article>

<br>
<br>

## counter-reset과 counter-increment 사용예시

##### 결과화면
![counter_ex](/images/css/counter.jpg "counter_ex")

``` html
  <ul>
    <li>
      리스트
      <ul>
        <li>리스트 리스트</li>
        <li>리스트 리스트</li>
        <li>리스트 리스트</li>
      </ul>
    </li>
    <li>리스트</li>
    <li>리스트</li>
  </ul>
```

``` css
  ul {
    counter-reset: number;
  }

  ul > li::before {
    counter-increment: number;
    content: counter(number) '.';
  }

  ul > li > ul {
  counter-reset: number2;
  }

  ul > li > ul > li::before {
    counter-increment: number 0 number2;
    content: counter(number) '-' counter(number2);
  }
```

<br>
<br>
<br>
<br>

<div class="reference-site">

  **참고한 사이트**<br>
  <https://aboooks.tistory.com/261>

</div>
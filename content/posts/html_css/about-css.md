---
title: About CSS (Cascading Style Sheets)
date: "2019-09-09"
template: "post"
draft: false
slug: "/posts/css/about-css/"
category: "CSS"
tags:
  - "CSS"
description: "Characteristic of CSS and What is there in CSS Selector"
---
## CSS의 상속관계

## :pencil2: 상속이란?
상위태그에 적용한 특정 스타일이 하위에도 반영되는 것을 말한다.

상속되는 속성은 다음과 같다.
**`Font`**에 관한 CSS속성 (font-family, font-weight, font-size, line-height, color ...)

상속되지 않는 속성은 다음과 같다.
**`box-model`**에 관한 속성 (width, height, margin, padding, border, background ...), position ...

<hr />

## :pencil2: Cascading이란?
CSS에서는 우선순위에 따른 점수가 존재한다.
따라서 해당 점수들에 합산에 따라 적용 우선순위가 결정된다.
이러한 CSS의 특징을 **`Cascading`**이라 한다.

우선 순위를 알아보자.

- 기본적으로 **뒤에 오는 css**가 우선순위가 높다.
- 우선순위가 같다면 **개수가 많은 css**가 우선순위가 높다.

그리고 __!important > inline style attribute > id(#) > class(.) > tag > *(Universal Selector)__ 순으로 우선순위가 정해집니다.

**:bulb:*Tips***<br>
*!important*와 *inline style arrtibute*는 **최후의 수단**이라 생각하는게 좋고, 사용을 자제하는 것이 좋다.
이유는 *!important*와 *inline style attribute*는 스타일의 자연스런 흐름을 무시하고 강제하여 적용하게 되어, 혼란을 야기할 수 있기 때문이다.


<hr />

## :pencil2: CSS 선택자
<br>
<article class="board-tbl">

|  속성  |  내용 |  IE9~  |  IE8  |  IE7  |
| :---:  | :--- | :---: | :---: | :---: |
| __*__ | 모든 요소를 선택 | O | O | O |
| __#id__ | 해당 ID값으로 지정된 요소를 선택 | O | O | O |
| __.class__ | 해당 Class값으로 지정된 요소를 선택 | O | O | O |
| __E__ | tag 요소 선택 | O | O | O |
| __E:link__ | 방문하지 않은 Element를 선택 | O | O | O |
| __E:visited__ | 방문한 Element를 선택 | O | O | O |
| __E:hover__ | 마우스가 Element에 올라가 있는 상태의 Element를 선택 | O | O | O |
| __E:focus__ | 마우스가 Focus되어 머물러 있는 동안 해당 Element를 선택 | O | O | No support |
| __E:first-line__ | 해당 Element 요소의 첫번째 라인을 선택 | O | O | O |
| __E:first-letter__ | 해당 Element 요소의 첫번째 문자를 선택 | O | O | O |
| __E[foo]__ | [foo] 속성이 포함된 Element를 선택 | O | O | O |
| __E[foo="bar"]__ | [foo] 속성의 값이 'bar'와 일치하는 Element를 선택 | O | O | O |
| __E[foo~="bar"]__ | [foo] 속성의 값이 'bar'를 포함하는 Element를 선택 | O | O | O |
| __E[foo｜="en"]__ | [foo] 속성의 값이 'en' 또는 'en~'으로 시작되는 Element를 선택 | O | O | O |
| __E:lang(en)__ | Html lang 속성의 값이 'en'으로 지정된 Element를 선택 | O | O | No support |
| __E:before__ | Element 요소 전에 생성된 요소를 선택 | O | O | No support |
| __E:after__ | Element 요소 후에 생성된 요소 선택 | O | O | No support |
| __E>F__ | Element 요소의 자식인 F요소를 선택 | O | O | O |
| __E+F__ | Element 요소의 뒤의 F요소를 선택 | O | O | O |
| __E~F__ | Element 요소의 앞에 F요소가 존재한다면 F요소를 선택 | O | O | O |
| __E[foo^="bar"]__ | [foo] 속성의 값이 'bar'로 정확하게 시작하는 요소 선택 | O | O | O |
| __E[foo$="bar"]__ | [foo] 속성의 값이 'bar'로 정확하게 끝나는 요소 선택 | O | O | O |
| __E[foo*="bar"]__ | [foo] 속성의 값이 'bar'를 포함하는 요소 선택 | O | O | O |
| __E:root__ | 문서의 최상위 루트 요소 선택 | O | No support | No support |
| __E:first-child__ | 첫번째 자식 요소가 Element라면 선택 | O | O | O |
| __E:last-child__ | Element 요소 중 마지막 자식의 Element를 선택 | O | O | No support |
| __E:nth-child(n)__ | Element의 N번째 요소 선택 | O | O | No support |
| __E:nth-child(n + *)__ | Element의 * 이상의 Element를 선택 | O | No support | No support |
| __E:nth-child(-n + *)__ | Element의 * 이하의 Element를 선택 | O | No support | No support |
| __E:nth-last-child(n)__ | 뒤로부터 지정된 순서와 일치하는 요소가 Element라면 선택 | O | O | No support |
| __E:nth-of-type(n)__ | Element 요소 중 앞에서 부터 순서가 일치하는 n번째 Element 선택 | O | O | No support |
| __E:nth-last-of-type(n)__ | Element 요소 중 끝으로부터 순서가 일치하는 n번째 Element 선택 | O | O | O |
| __E:first-of-type__ | Element 요소 중 첫번째 Element 선택 | O | O | No support |
| __E:last-of-type__ | Element 요소 중 마지막 Element 선택 | O | O | No support |
| __E:only-child__ | Element가 유일한 자식이면 선택 | O | O | No support |
| __E:only-of-type__ | Element가 같은 타입이면 선택 | O | O | No support |
| __E:empty__ | 텍스트 및 공백을 포함하여 빈 자식을 가진 Element를 선택 | O | O | No support |
| __E:target__ | Element의 URL의 대상이면  | O | O | No support |
| __E:enabled__ | 활성화된 폼 컨트롤 Element요소를 선택 | O | O | No support |
| __E:disabled__ | 비활성화된 폼 컨트롤 Element요소를 선택 | O | O | No support |
| __E:checked__ | 선택된 폼 컨트롤(radio, checkbox)를 선택 | O | O | No support |
| __E:not(s)__ | s요소가 아닌 E요소를 선택 | O | O | No support |
| __E[href*="sample"]__ | 별표는 입력값이 속성값 안 어딘가에 존재한다면 적용 ex)sample.co.kr(O), sample.co.kr(O), sample.net(O), sam.com(X) | O | O | O |
| __E[href*=".jpg"]__ | 이미지(.jpg로 끝나는 url)로 링크가 걸린 a태그를 선택 | O | O | O |

</article>
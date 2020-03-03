---
title: Type of HTML Elements
date: "2019-09-13"
template: "post"
draft: false
slug: "/posts/html/block-and-inline-elements/"
category: "HTML"
tags:
  - "HTML"
  - "block Elements"
  - "Inline Elements"
description: "Differences by Element type"
---

<div id="toc">

**:link:  Table Of Contents**

- [개요](#html-block-요소와-inline-요소)
  - [inline-요소](#inline-요소)
  - [Block 요소](#block-요소)

</div>

## HTML Block 요소와 inline 요소
HTML의 태그에는 크게 블록요소와 인라인 요소로 나누어진다.<br>
이 부분은 CSS에 있어 큰 영향을 미친다.

<br>

### inline 요소
**인라인요소**는 인라인 요소안에 다른 인라인요소를 포함 할 수 있지만 블록 요소는 포함 할 수 없다. **inline** 요소는 말 그대로 컨텐츠의 크기만 갖게 되어 CSS의 **width**와 **height** 속성이 적용이 안되는 점을 주의하자

<hr class="sub" />

### Block 요소
**블록요소**는 모든 인라인 요소를 포함할 수 있고 다른 블록요소도 포함할 수 있다. 블록요소 넓이는 기본적으로 해당 블록요소를 포함한 상위 컨텐츠박스의 넓이를 가진다. **block** 요소는 **vertical-align**이 적용되지 않는 점을 주의하자

<article class="board-tbl">

|  type  |  elements |
| :---:  | :------- |
| __Block-level__  | header, nav, main, section, div, article, aside, footer, ul, li, ol, dl, dt, dd, hgroup, h1 ~ h6, p, table, form, fieldset, figure, figcaption, address, blockquote, detail, dialog, pre, hr |
| __inline-level__  | a, embed, samp, abbr, i, script, acronym, iframe, select,<br> audio(컨트롤 요소를 설정했을 경우), img, slot, input, small, b, ins, span, bdi, kbd, strong, bdo, label, sub, big, map, sup, br, mark, svg, button, meter, template, canvas, noscript, textarea, cite, object, time, code, output, u, data, picture, tt, datalist, progress, var, del, q, video, dfn, ruby, wbr, em, s|

</article>

<br>
<br>
<br>
<br>
<br>
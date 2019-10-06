---
title: CSS Display Flex
date: "2019-09-21"
template: "post"
draft: false
slug: "/posts/css/CSS-Flex/"
category: "CSS"
tags:
  - "CSS"
  - "Flex"
  - "Flex-container"
  - "Flex-item"
description: "About CSS3 Flex"
---

## Flex 속성에 대해서 알아보자.

## :pencil2: Flex 란?
**`display inline-block`** 속성과 **`float`** 속성 그리고 **`position`** 속성만으로도 어느정도의 레이아웃 구현이 가능했다.<br>
하지만 데스크탑만 쓰던 시대가 아닌 모바일 시대가 오며 유연한 형태의 레이아웃이 요구되어지면서 Flex가 탄생하게 되었는데, Flex는 요소의 크기가 불분명하거나 동적으로 바뀌는 상황에도, 각 요소를 정렬할 수 있는 효율적인 방법을 제공한다.<br>
하지만 이는 아직 모든 브라우저에 호환이 되고 있지않다.

<hr />


## :pencil2: Flex Attribute
Flex는 `Container`와 `Items` 두가지의 개념으로 나뉜다.<br>
Container는 Items를 감싸는 부모요소이며, 각 Item을 정렬하기 위해서 Container가 필수이다.


**:heavy_exclamation_mark:*Tips***<br>
Container와 Item에 사용할 수 있는 속성이 구분되어 있음에 주의해야한다.<br>
<br>

**Container**에는 *`display`*, *`flex-flow(flex-direction, flex-wrap)`*, *`justify-content`*, *`align-content`*, *`align-items`* 속성을 사용할 수 있고,<br>
<br>

**items**에는 *`order`*, *`flex(flex-grow, flex-shrink, flex-basis)`*, *`align-self`* 속성을 사용할 수 있다.

### :clipboard: Flex Container Attribute
Flex Conatiner에 사용할 수 있는 속성들은 다음과 같다.

<article class="board-tbl">

|  Attribute  |  explanation |
| :---:  | :------- |
| **display** | Flex Container를 정의 |
| **flex-flow** | flex-direction과 flex-wrap의 단축 속성 |
| **flex-direction** | Flex Items의 메인 축을 설정 |
| **flex-wrap** | Flex Item의 여러 줄 묶음(줄바꿈) 설정 |
| **justify-content** | 메인 축의 정렬 방법을 설정 |
| **align-content** | 교차 축의 정렬 방법을 설정(2줄 이상) |
| **align-items** | 교차 축에서 Items의 정렬 방법을 설정(1줄) |

</article>

<br>
<br>

### :pushpin: display

**display** 속성으로 Flex Container를 정의한다.

<article class="board-tbl">

|  값  | explanation |
| :--: | :-- |
| **flex** | Block 특성의 Flex Container를 정의 |
| **inline-flex** | inline 특성의 Flex Container를 정의 |

</article>

<br>

**flex**로 지정된 Flex Container는 Block 요소와 같은 성향을 가지고,<br>
**inline-flex**로 지정된 Flex Container는 inline(inline block) 요소와 같은 성향을 가진다

여기서의 성향은 items가 그 성향을 가지게 되는 것이 아니라, **Flex Container**가 가지게 된다라는 점을 유의해야된다.

<br>
<br>

### :pushpin: flex-flow

**단축 속성**으로 Flex items의 **메인 축(main-axis)**을 설정하고 **Items의 여러 줄 묶음(줄바꿈)**을 설정한다.

<article class="board-tbl">

|  Attribute  | explanation | default |
| :--: | :-- | :-----: |
| **flex-direction** | **Items**의 메인 축을 설정 | **`row`** |
| **flex-wrap** | **Items**의 여러 줄 묶음(줄바꿈)을 설정 | **`nowrap`** |

</article>

<br>

#### :mag: flex-direction
Items의 메인 축(main-axis)를 설정한다.

<article class="board-tbl">

|  값  | explanation |
| :--: | :-- |
| **row**(default) | **Items**를 메인 축을 수평축(왼쪽에서 오른쪽)으로 표시
| **row-reverse** | **Items**를 `row`로 정렬하되 순서를 반대로 표시 |
| **column** | **Items**를 메인 축을 수직 축(위에서 아래)으로 표시 |
| **column-reverse** | **Items**를 `column`으로 정렬하되 순서를 반대로 표시 |

</article>

##### :bulb: 메인 축과 교차 축
**`row`**는 Items의 메인 축을 **수평 축**으로 표시하고, 수평이 메인 축이되며 교차 축은 수직이 된다.<br>
**`column`**은 Items의 메인 축을 **수직 축**으로 표시하고, 수직이 메인 축이되며 교차 축은 수평이 된다.
이러한 속성은 **`justify-content`** 속성과 **`align-items`** **`align-content`** 속성을 사용할 시 주의해야 할 점입니다.


#### :mag: flex-wrap
**Items**의 여러 줄 묶음(줄바꿈)을 설정한다.

<article class="board-tbl">

|  값  | explanation |
| :--: | :-- |
| **nowrap**(default) | 모든 **Items**를 줄바꿈을 하지 않고 한 줄로 표시한다 |
| **wrap** | **Items**를 한 줄에 보여줄 수 없을 경우 줄바꿈을 한다 |
| **wrap-reverse** | **Items**를 wrap의 역 방향으로 여러 줄로 묶어준다 |

</article>
<br>

기본적으로 Items는 한 줄(nowrap)에서만 표시되고 줄 바꿈되지 않는다.
이는 지정된 크기(메인 축에 따라 **width** 나 **height**)를 무시하고 한 줄 안에서만 가변한다.
줄바꿈을 원한다면 **`wrap`**을 선언해주어야 한다.

<br>
<br>

### :pushpin: justify-content
**메인 축**에 의한 **items의 정렬 방법**을 설정한다.
사용 시 flex-direction 속성의 값을 고려해야한다.

<article class="board-tbl">

|  값  | explanation |
| :--: | :-- |
| **flex-start**(default) | **Items**를 **메인 축**의 시작점으로 정렬 |
| **flex-end** | **Items**를 **메인 축**의 끝 점으로 정렬 |
| **center** | **Items**를 **메인 축**의 가운데 정렬 |
| **space-between** | **시작점과 끝점에 items를 배치**하고, 나머지 items 사이의 Gutter(여백)은 비율에 맞게 고르게 할당됨 |
| **space-around** | Container의 **양쪽 끝 Gutter(여백)**과 Item 사이사이의 Gutter(여백)을 고르게 할당 하여 정렬시킴 |

</article>

<br>

### :pushpin: align-content
**교차 축**에 의한 **items의 정렬 방법**을 설정한다.
사용 시 flex-direction 속성의 값을 고려해야한다.

##### :exclamation: 사용시 주의할 점
**`flex-wrap`** 속성을 통해 Items가 **여러 줄이상(`wrap`) 이고 여백이 있을 경우**만 사용할 수 있다.
**Items**가 **한 줄(`nowrap`)**일 경우 **`align-items`** 속성을 사용해야한다.

<article class="board-tbl">

|  값  | explanation |
| :--: | :-- |
| **stretch**(default) | **Container**의 교차 축을 채우기 위해 Items(**width, height 값이 auto일 경우**)를 늘린다 |
| **flex-start** | **Items**를 **교차축**의 시작점으로 정렬 |
| **flex-end** | **Items**를 **교차축**의 끝 점으로 정렬 |
| **center** | **Items**를 **교차 축**의 가운데 정렬 |
| **space-between** | **시작점과 끝점에 items를 배치**하고, 나머지 items 사이의 Gutter(여백)은 비율에 맞게 고르게 할당됨 |
| **space-around** | Container의 **양쪽 끝 Gutter(여백)**과 Item 사이사이의 Gutter(여백)을 고르게 할당 하여 정렬시킴 |

</article>

<br>

### :pushpin: align-items
**교차 축**에 의한 **items의 정렬 방법**을 설정한다.
사용 시 flex-direction 속성의 값을 고려해야한다.

##### :exclamation: 사용시 주의할 점
Items가 **`flex-wrap`**을 통해 여러 줄(**`wrap`**)일 경우에는 **`align-content`**속성을 우선한다.

<article class="board-tbl">

|  값  | explanation |
| :--: | :-- |
| **stretch**(default) | **Container**의 교차 축을 채우기 위해 Items(**width, height 값이 auto일 경우**)를 늘린다 |
| **flex-start** | **Items**를 **교차축**의 시작점으로 정렬 |
| **flex-end** | **Items**를 **교차축**의 끝 점으로 정렬 |
| **center** | **Items**를 **교차 축**의 가운데 정렬 |
| **baseline** | **Items**를 **문자 기준선**에 정렬 |

</article>

##### :bulb: 시작점(flex-start)와 끝점(flex-end)
메인 축이나 교차 축의 시작하는 지점과 끝나는 지점을 지칭한다.<br>
이는 **`flex-direction`**의 값에 따라 시작점과 끝점이 달라진다.

<hr/>

### :clipboard: Flex Items Attribute
Flex Items에 사용할 수 있는 속성들은 다음과 같다.

<article class="board-tbl">

|  Attribute  |  explanation |
| :---:  | :------- |
| **order** | Flex Item의 순서를 설정 |
| **flex** | flex-grow, flex-shrink, flex-basis의 단축 속성 |
| **flex-grow** | Flex Item의 증가 너비 비율을 설정 |
| **flex-shirink** | Flex Item의 감소 너비 비율을 설정 |
| **flex-basis** | Flex Item의 (공간 배분 전) 기본 너비 설정 |
| **align-self** | 교차 축에서 Items의 정렬 방법을 설정 |

</article>


### :pushpin: order
**Items**의 **순서**를 설정한다.<br>
**Items**의 숫자를 지정하고 숫자가 클수록 순서가 밀린다. (z-index의 반대개념이라 생각하면 이해하기 수월하다)<br>
**음수(-)**가 허용된다.

HTML 구조와 상관없이 순서를 변경할 수 있어, 반응형 디자인 또는 시멘틱한 마크업 구조를 작업할 수 있다.

<article class="board-tbl">

|  값  |  explanation | default |
| :---:  | :------- | :--------: |
| **number** | Item의 순서를 설정 | **`0`** |

</article>


### :pushpin: flex
Item의 너비(**증가**, **감소**, **기본 너비**)를 설정하는 단축속성이다.

<article class="board-tbl">

|  Attribute  |  explanation | default |
| :---:  | :------- | :--------: |
| **flex-grow** | Item의 증가 너비 비율을 설정 | **`0`** |
| **flex-shrink** | Item의 감소 너비 비율을 설정 | **`1`** |
| **flex-shrink** | Item의 (공간 배분 전) 기본 너비 설정 | **`auto`** |

</article>

<br>

``` css
.item {
    flex: 1 1 100px; /* 증가너비 감소너비 기본너비 */
    flex: 1 1; /* 증가너비 감소너비 */
    flex: 1 100px; /* 증가너비 기본너비 (단위를 사용하게 되면 flex-basis가 적용된다) */
}
```


##### :exclamation: 사용시 주의할 점
**`flex-grow`**를 제외한 개별 속성은 생략이 가능하다.<br>
만약 **`flex: 1;`**로 작성하면 **`flex-grow: 1;`**과 같다<br>
그러면 **`shrink와 basis`**의 값은 default값이 적용되는 걸로 판단되지만 결과는 다르다.<br>
**`flex-basis`**의 기본 값은 **`auto`**이지만 단축 속성인 **`flex`**에서 **`basis`**값을 생략하게 되면 **`0`** 값이 적용된다.


#### :mag: flex-grow
Item의 증가 너비 비율을 설정한다.<br>
숫자가 크면 더 많은 너비를 가진다.<br>
Item이 가변 너비가 아니거나, 값이 0일 경우 효과가 없다.

<article class="board-tbl">

|  값  |  explanation | default |
| :---:  | :------- | :--------: |
| **number** | Item의 증가 너비 비율을 설정 | **`0`** |

</article>

<br>

**:bulb: ex)**<br>
모든 Items의 총 증가 너비(**`flex-grow`**)에서 각 Item의 증가 너비의 비율 만큼 너비를 가질 수 있다.<br>
Item이 3개이고 **`flex-grow`**를 각각 **1**, **2**, **1** 이라고 가정하면<br>
첫번째 Item은 총 너비의 25%(1/4)을,<br>
두번째 Item은 총 너비의 50%(2/4)을,<br>
세번째 Item은 총 너비의 25%(1/4)을 각각 가지게 된다.

#### :mag: flex-shrink

Item이 감소하는 너비의 비율을 설정한다<br>
숫자가 크면 더 많은 너비가 감소한다.<br>
Item이 가변 너비가 아니거나, 값이 0일 경우 효과가 없다.

<article class="board-tbl">

|  값  |  explanation | default |
| :---:  | :------- | :--------: |
| **number** | Item의 감소 너비 비율을 설정 | **`0`** |

</article>

<br>

**:bulb: ex)**<br>
감소 너비(**`flex-shrink`**)는 요소의 너비에 영향을 받기때문에 계산하기 까다롭다.<br>
영향을 받는 요소의 너비는 **`width`**, **`height`**, **`flex-basis`** 등 너비가 지정된 경우를 말한다.<br>
**Flex Conatiner**의 너비가 줄어 Items의 너비에 영향을 미칠 경우에, **영향을 미치기 시작한 지점부터 줄어든 거리 만큼** 감소 너비 비율에 맞게 **Item의 너비**가 줄어든다.

예를 들어 **Flex Container**가 너비가 줄어 Item의 너비에 영향을 미치기 시작한 시점 부터 실제 줄어든 거리가 **`90px`**이라 가정했을때,<br>
**너비가 같은** Item이 2개이고 지정된 감소 너비가 각각 **`1`**과 **`2`**라면,<br>
첫번째 Item은 **`90px`**의 1/3인 **`30px`**만큼 너비가 감소하고,<br>
두번째 Item은 **`90px`**의 2/3인 **`60px`**만큼 너비가 감소하게된다.
<br>

다른 예시로 **Flex Container**의 너비가 줄어 Item의 너비에 영향을 미치기 시작한 시점 부터 실제 줄어든 거리가 **`90px`**이라 가정했을때,<br>
**너비가 다른** Item이 2개이고 요소 너비는 각각 **`200`**과 **`100`**이고,<br>
지정된 감소 너비가 각각 **`2`**와 **`1`**이라면,
**`200 * 2 = 400`** 과 **`100 * 1 = 100`** 즉 감소 너비는 4:1 비율이며,<br>
첫번째 Item은 **`90px`**의 4/5인 **`72px`**만큼 너비가 감소하고,<br>
두번째 Item은 **`90px`**의 1/5인 **`18px`**만큼 너비가 감소하게된다.

#### :mag: flex-basis
Item의 (공간 배분 전) 기본 너비를 설정한다.<br>
값이 **`auto`**일 경우 **`width`**, **`height`** 등의 속성으로 Item의 너비를 설정할 수 있다.

<article class="board-tbl">

|  값  |  explanation |
| :---:  | :------- |
| **auto**(default) | 가변 Item과 같은 너비 |
| **단위** | **`px`**, **`em`**, **`vw`** 등 단위로 지정 |

</article>

### :pushpin: align-self
교차 축에서 개별 Item의 정렬 방법을 설정한다.<br>

**`align-items`**는 Flex Container내 **모든 Items**의 정렬 방법을 설정했지만, **일부 Item**만 정렬 방법을 변경하려고 할 경우 사용한다.<br>
다시 말하면 **`align-items`** 속성보다 우선한다.

<article class="board-tbl">

|  값  |  explanation |
| :---:  | :------- |
| **auto**(default) | Flex Container의 **`align-items`** 속성을 상속받음 |
| **stretch** | Flex Container의 교차 축을 채우기 위해 Item을 늘림 |
| **flex-start** | Item을 각 줄의 시작점(flex-start)로 정렬 |
| **flex-end** | Item을 각 줄의 끝점(flex-end)로 정렬 |
| **center** | Item을 가운데 정렬 |
| **baseline** | Item을 문자 기준선에 정렬 |

</article>

<hr/>

## :heavy_exclamation_mark: Flex CrossBrowsing Issue

### Webkit Browser ISSUE
웹킷 계열 브라우저에서는 폼 컨트롤 요소가 flex-item이 되지 않기 때문에 폼 컨트롤 요소가 flex-item이 되게 하려면 **`-webkit-appearance: none;`** 처리를 해야한다.

**:bulb:*Tips***<br>
이 문제는 안드로이드뿐만 아니라 웹킷 계열 브라우저인(Chrome, Safari) 공통의 문제이다.

### Android 2.1 ~ 4.3 Issue
Android 2.1 ~ 4.3 브라우저는 2009년 플렉스 명세에 **`webkit`** 접두사를 붙여야 지원할 수 있다.<br>
지원하는 속성 수가 최신 표준에 비해 적고 속성 전체 목록을 확인해 보면 단축 속성은 지원하지 않는다.<br>
Android 4.4 이후 버전부터는 최신 표준 명세를 지원하고 있으며 제조사 접두어는 필요없다.

### IE 10 Issue
IE 9 이하 버전 브라우저에서는 플렉스 명세를 지원하지 않는다.<br>
IE 10 브라우저는 2012년의 플렉스 명세를 지원한다.<br>
IE 10 브라우저를 지원하려면 2012년 플렉스 속성에 **`-ms-`** 제조사 접두어를 붙여야한다.

<hr/>

## :wrench: Android 2.1 ~ 4.3 + IE 10 지원하기
**Android 2.1 ~ 4.3 브라우저와 IE 10 브라우저**가 공통으로 지원하지 **않는** 속성은<br>
**`flex-flow`**, **`jutify-content: space-around`**, **`align-self`**, **`align-content`** 속성이다.<br>

IE 10 브라우저는 표준 명세의 **`flex-grow`**, **`flex-shrink`**, **`flex-basis`** 속성을 지원하지 않고, 단축 속성인 **`-ms-flex: 0 1 auto;`** 속성과 값을 지원한다.

아래는 안드로이드 2.1 ~ 4.3 브라우저와 IE 10 브라우저에 모두 대응하기 위해 정리된 코드이다.

```css
{ // 플렉스 컨테이너에 적용. 플렉스 컨테이너 생성.
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
{ // 플렉스 아이템에 적용. 확장 지수 설정.
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex-grow: 1;
}
{ // 플렉스 컨테이너에 적용. 주축 row 설정.
    -webkit-box-orient: horizontal;
    -ms-flex-direction: row;
    flex-direction: row;
}
{ // 플렉스 컨테이너에 적용. 주축 column 설정.
    -webkit-box-orient: vertical;
    -ms-flex-direction: column;
    flex-direction: column;
}
{ // 플렉스 컨테이너에 적용. 주축 row-reverse 설정.
    -webkit-box-orient: horizontal;
    -webkit-box-direction: reverse;
    -ms-flex-direction: row-reverse;
    flex-direction: row-reverse;
}
{ // 플렉스 컨테이너에 적용. 주축 column-reverse 설정.
    -webkit-box-orient: vertical;
    -webkit-box-direction: reverse;
    -ms-flex-direction: column-reverse;
    flex-direction: column-reverse;
}
{ // 플렉스 컨테이너에 적용. 감싸기(줄바꿈) 금지 설정.
    -webkit-box-lines: single;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
}
{ // 플렉스 컨테이너에 적용. 감싸기(줄바꿈) 설정.
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
}
{ // 플렉스 아이템에 적용. 아이템 정렬 순서 설정.
    -ms-flex-order: 1;
    order: 1;
}
{ // 플렉스 컨테이너에 적용. 아이템 주축 start 정렬.
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
}
{ // 플렉스 컨테이너에 적용. 아이템 주축 end 정렬.
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    justify-content: flex-end;
}
{ // 플렉스 컨테이너에 적용. 아이템 주축 center 정렬.
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
}
{ // 플렉스 컨테이너에 적용. 아이템 주축 space-between 정렬.
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
}
{ // 플렉스 컨테이너에 적용. 아이템 교차축 start 정렬.
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
}
{ // 플렉스 컨테이너에 적용. 아이템 교차축 end 정렬.
    -webkit-box-align: end;
    -ms-flex-align: end;
    align-items: flex-end;
}
{ // 플렉스 컨테이너에 적용. 아이템 교차축 center 정렬.
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}
{ // 플렉스 컨테이너에 적용. 아이템 교차축 stretch 정렬.
    -webkit-box-align: stretch;
    -ms-flex-align: stretch;
    align-items: stretch;
}
{ // 플렉스 컨테이너에 적용. 아이템 교차축 baseline 정렬.
    -webkit-box-align: baseline;
    -ms-flex-align: baseline;
    align-items: baseline;
}
```
<br>
<br>
<br>
<div class="reference-site">

  **인용한 사이트**<br>

  [https://naradesign.github.io/article/flex-browser-compatibility.html](https://naradesign.github.io/article/flex-browser-compatibility.html "나라디자인 flex 관련 article")<br>
  [https://heropy.blog/2018/11/24/css-flexible-box/](https://heropy.blog/2018/11/24/css-flexible-box/ "HEROPY Tech css Flex(Flexible Box) 완벽가이드")

</div>
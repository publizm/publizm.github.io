---
title: HTML Form
date: "2019-09-16"
template: "post"
draft: false
slug: "/posts/html/html-Form/"
category: "HTML"
tags:
  - "HTML"
  - "Form"
  - "Input"
  - "Button"
description: "Html Form"
---

## Form 관련 요소에 대해서 알아보자.

폼의 범위를 정의할 때는 form요소를 사용한다.<br>
form 요소의 속성으로는 폼의 내용을 처리하는 서버의 URL을 지정하기 위한 action과 폼의 내용을 처리하는 방법인 method가 있고, 사용 형식은 다음과 같다.

<hr/>

## :pencil2: Form

```html
<form action="서버 URL"
      method="GET 또는 POST"
      name="폼 이름"
      accept-charset="utf-8"
      autocomplete="on"
      novalidate="novalidate"
      target="_blank">
      내용
</form>
```
- **`action`**="URL": 폼의 내용을 처리하기 위한 서버의 URL(필수)
- **`method`**="**GET** 또는 **POST**"
    - **`GET`**: action 속성에 지정한 URL에 폼의 내용을 추가하여 서버에 송신하는 방식으로 form을 지정할 때 기본값으로 설정되어 있다. Get방식은 데이터의 길이가 짧을 경우 적합하고, POST 방식보다 처리 속도가 약간 빠르다.
    - **`POST`**: 데이터의 긴 경우에 적합하며, 보안 문제때문에 데이터값을 노출시킬 수 없을때 사용한다.
- **`accept-charset`**: 폼 전송에 사용할 문자 인코딩 지정(문자 인코딩 값을 둘 이상 지정 가능하며, 이때 문자 인코딩 값을 공백으로 구분하여 선언)
- **`autocomplete`**: 자동 완성 기능의 활성화 여부(on, off값 지정)
- **`enctype`**: 폼 전송 데이터의 MIME 타입
- **`name`**: 폼의 이름
- **`novalidate`**: 폼 전송 시 입력 데이터 값의 검증을 수행하지 않음(논리 속성)
- **`target`**: 폼의 전송 값을 처리할 대상

<hr/>

## :pencil2: Fieldset, legend 요소

**fieldset**: 폼 요소를 그룹핑 하여 구조적으로 만들기 위해 사용<br>
**legend**: 폼 서식이 어떠한 성격인지 제목 형식으로 알려 줄 수 있고, fieldset 요소의 자식 요소로 한번만 지정 할 수 있다.

**:bulb:*Tips***<br>
HTML5에서 fieldset 요소에 새롭게 추가된 속성인 form 속성을 사용하면 form 요소 안에 반드시 fieldset 요소를 포함시키기 않아도 해당 form 요소와 연결할 수 있다.
연결 방법은 form요소에는 id값을 지정하고, fieldset 요소에는 속성으로 form을 지정하여 해당 속성 값으로 연결하고자 하는 form요소의 id값을 지정하면 된다.

```html
<form action="서버 URL"
      method="GET 또는 POST"
      id="formID"
      name="폼 이름"
      accept-charset="utf-8"
      autocomplete="on"
      novalidate="novalidate"
      target="_blank">
</form>
<fieldset form="formID">
  내용
</fieldset>
```

<hr/>

## :pencil2: label

**폼의 구조화**하고 **접근성**을 높일 수 있는 요소이다.<br>
label 요소는 각 **폼 서식의 연관 관계와 설명을 추가하는 역할**을 담당한다.<br>
스크린 리더의 경우 폼 서식이 레이블과 인접하지 않는 경우에도 인식할 수 있도록 지원한다.<br>
웹접근성 측면에서도 중요한 요소로, 다양한 폼 서식의 설명을 의미한다.

label 요소로 연관 관계를 설명할 수 있는 요소로는 **`button`**, **`input`**, **`keygen`**, **`meter`**, **`output`**, **`progress`**, **`select`**, **`textarea`** 요소가 있다.

연관 관계를 설명할때는 **for 속성**을 사용한다.<br>
해당 연관 관계를 맺는 요소는 **id 속성** 값을 지정하여 연결한다.

**:bulb:*Tips***<br>
폼 서식을 설명할 때 <u>label요소를 사용하는 것(명시적 방법)이 어려울 경우</u>에는 **title** 속성을 사용할 수 있다.


```html

<form action="서버 URL"
      method="GET 또는 POST"
      id="formID"
      name="폼 이름"
      accept-charset="utf-8"
      autocomplete="on"
      novalidate="novalidate"
      target="_blank">

      <fieldset>
        <legend>폼 타이틀</legend>
        <!-- 명시적 label -->
        <label for="userName">이름</label>
        <input type="text" id="userName" name="name" value="value">
        <!-- //명시적 label -->
      </fieldset>

      <fieldset>
        <legend>폼 타이틀</legend>
        <!-- 암시적 label -->
        <label>
          이름
          <input type="text" name="name" value="value">
        </label>
        <!-- //암시적 label -->
      </fieldset>

      <fieldset>
        <legend>폼 타이틀</legend>
        <!-- label 요소를 사용하는 것이 어려울 경우 -->
        <input type="email" title="email">
        <!-- //label 요소를 사용하는 것이 어려울 경우 -->
      </fieldset>
</form>

```

<hr/>

## :pencil2: Input
여러 타입의 폼 서식을 마크업할때 사용한다.<br>

#### :pushpin: type="text"
한 줄 글상자를 나타낼 때 사용한다.

```html
<label for="userName">이름</label>
<input type="text" id="userName" name="userName">
```

##### :zap: 지원하는 브라우저 및 버전
<article class="browser-tbl">

|  **속성**  | ![chrome](/icons/chrome.jpg "chrome") | ![ie edge](/icons/edge.jpg "ie edge") | ![ie](/icons/ie.jpg "ie") | ![firefox](/icons/firefox.jpg "firefox") | ![safari](/icons/safari.jpg "safari") | ![opera](/icons/opera.jpg "opera") |
| :---:  | :---: | :---: | :---: | :---: | :---: | :---: |
| __[type="text"]__ | 1.0~ | O | O | 1.0~ | 1.0~ | O |

</article>

<hr/>

#### :pushpin: type="password"
text 타입과 동일한 렌더링 결과가 나오지만, 입력 값을 화면에 출력하지 않는 형태로 나타나기때문에 클라이언트 환경에서 해당 값을 보이지 않도록 할 때 사용한다.

```html
<label for="userPw">비밀번호</label>
<input type="password" id="userPw" name="userPw">
```

##### :zap: 지원하는 브라우저 및 버전
<article class="browser-tbl">

|  **속성**  | ![chrome](/icons/chrome.jpg "chrome") | ![ie edge](/icons/edge.jpg "ie edge") | ![ie](/icons/ie.jpg "ie") | ![firefox](/icons/firefox.jpg "firefox") | ![safari](/icons/safari.jpg "safari") | ![opera](/icons/opera.jpg "opera") |
| :---:  | :---: | :---: | :---: | :---: | :---: | :---: |
| __[type="password"]__ | 1.0~ | O | 2.0~ | 1.0~ | 1.0~ | 2.0~ |

</article>

<hr/>

#### :pushpin: type="month"
date 타입과 동일하지만, 날짜가 아닌 월을 입력하고자 할 때 사용한다
사용할 수 있는 속성도 date타입과 같다.

```html
<label for="month">월 선택</label>
<input type="month"
       min="2019-01-01"
       max="2019-12-31"
       ster="3"
       id="month"
       name="month">
```

##### :zap: 지원하는 브라우저 및 버전
<article class="browser-tbl">

|  **속성**  | ![chrome](/icons/chrome.jpg "chrome") | ![ie edge](/icons/edge.jpg "ie edge") | ![ie](/icons/ie.jpg "ie") | ![firefox](/icons/firefox.jpg "firefox") | ![safari](/icons/safari.jpg "safari") | ![opera](/icons/opera.jpg "opera") |
| :---:  | :---: | :---: | :---: | :---: | :---: | :---: |
| __[type="month"]__ | 20.0~ | 12.0~ | X | X | X | 11.0~ |

</article>

<hr/>

#### :pushpin: type="week"
월이 아닌 주 단위로 입력하고자 할 때 사용한다.
속성은 date 및 month 타입과 같다.

```html
<label for="week">주 선택</label>
<input type="week"
       min="2019-01-01"
       max="2019-12-31"
       ster="2"
       id="week"
       name="week">
```

##### :zap: 지원하는 브라우저 및 버전
<article class="browser-tbl">

|  **속성**  | ![chrome](/icons/chrome.jpg "chrome") | ![ie edge](/icons/edge.jpg "ie edge") | ![ie](/icons/ie.jpg "ie") | ![firefox](/icons/firefox.jpg "firefox") | ![safari](/icons/safari.jpg "safari") | ![opera](/icons/opera.jpg "opera") |
| :---:  | :---: | :---: | :---: | :---: | :---: | :---: |
| __[type="week"]__ | 20.0~ | 12.0~ | X | X | X | 11.0~ |

</article>

<hr/>

#### :pushpin: type="time"
시, 분, 초 등의 시간을 입력하고자 할 때 사용한다.
속성은 date 및 month, week 타입과 같다.

```html
<label for="time">시간 선택</label>
<input type="time"
       min="09:00:00"
       max="24:00:00"
       ster="1800"
       id="time"
       name="time">
```

##### :zap: 지원하는 브라우저 및 버전
<article class="browser-tbl">

|  **속성**  | ![chrome](/icons/chrome.jpg "chrome") | ![ie edge](/icons/edge.jpg "ie edge") | ![ie](/icons/ie.jpg "ie") | ![firefox](/icons/firefox.jpg "firefox") | ![safari](/icons/safari.jpg "safari") | ![opera](/icons/opera.jpg "opera") |
| :---:  | :---: | :---: | :---: | :---: | :---: | :---: |
| __[type="time"]__ | 20.0~ | 12.0~ | X | 57.0~ | X | 10.0~ |

</article>

<hr/>

#### :pushpin: type="datetime-local"
타임 존이 없는 날짜와 시간을 입력하고자 할 때 사용한다.<br>
이 점을 제외하고는 datetime 타입과 동일하다.

```html
<label for="datetime">시간 선택</label>
<input type="datetime-local"
       min="2019-01-01T00:00:00Z"
       max="2019-12-31T00:00:00Z"
       ster="2"
       id="datetime"
       name="datetime">
```

##### :zap: 지원하는 브라우저 및 버전
<article class="browser-tbl">

|  **속성**  | ![chrome](/icons/chrome.jpg "chrome") | ![ie edge](/icons/edge.jpg "ie edge") | ![ie](/icons/ie.jpg "ie") | ![firefox](/icons/firefox.jpg "firefox") | ![safari](/icons/safari.jpg "safari") | ![opera](/icons/opera.jpg "opera") |
| :---:  | :---: | :---: | :---: | :---: | :---: | :---: |
| __[type="datetime-local"]__ | 20.0~ | 12.0~ | X | X | X | 11.0~ |

</article>

<hr/>

#### :pushpin: type="checkbox"
체크 박스 입력 서식을 제공하고자 할 때 사용한다.<br>
속성인 checked 속성을 지정하면 해당 체크박스가 미리 선택된 상태로 렌더링된다.

```html
<label for="checkbox">선택</label>
<input type="checkbox" id="checkbox" checked>
```

##### :zap: 지원하는 브라우저 및 버전
<article class="browser-tbl">

|  **속성**  | ![chrome](/icons/chrome.jpg "chrome") | ![ie edge](/icons/edge.jpg "ie edge") | ![ie](/icons/ie.jpg "ie") | ![firefox](/icons/firefox.jpg "firefox") | ![safari](/icons/safari.jpg "safari") | ![opera](/icons/opera.jpg "opera") |
| :---:  | :---: | :---: | :---: | :---: | :---: | :---: |
| __[type="checkbox"]__ | O | O | O | O | O | O |

</article>

<hr/>

#### :pushpin: type="radio"
라디오 버튼 입력 서식을 제공하고자 할 때 사용한다.<br>
속성인 checked 속성을 지정하면 해당 라디오 버튼이 미리 선택된 상태로 렌더링된다.

```html
<label for="radio1">선택1</label>
<input type="radio" id="radio1" name="radio-group" checked>

<label for="radio2">선택2</label>
<input type="radio" id="radio2" name="radio-group">
```

##### :zap: 지원하는 브라우저 및 버전
<article class="browser-tbl">

|  **속성**  | ![chrome](/icons/chrome.jpg "chrome") | ![ie edge](/icons/edge.jpg "ie edge") | ![ie](/icons/ie.jpg "ie") | ![firefox](/icons/firefox.jpg "firefox") | ![safari](/icons/safari.jpg "safari") | ![opera](/icons/opera.jpg "opera") |
| :---:  | :---: | :---: | :---: | :---: | :---: | :---: |
| __[type="radio"]__ | O | O | O | O | O | O |

</article>

<hr/>

#### :pushpin: type="file"
로컬의 파일을 업로드할 수 있는 서식을 제공한다.<br>
file 타입에 accept 속성을 사용하여 서버쪽에서 수신할 수 있는 파일 형식을 지정할 수 있다.<br>
또한 논리 속성인 multiple 속성을 사용하여 여러개의 파일을 선택하도록 할 수 있다.

```html
<label for="files">파일선택</label>
<input type="file"
       id="files"
       name="files"
       accept="image/*"
       multiple>
```

##### :zap: 지원하는 브라우저 및 버전
<article class="browser-tbl">

|  **속성**  | ![chrome](/icons/chrome.jpg "chrome") | ![ie edge](/icons/edge.jpg "ie edge") | ![ie](/icons/ie.jpg "ie") | ![firefox](/icons/firefox.jpg "firefox") | ![safari](/icons/safari.jpg "safari") | ![opera](/icons/opera.jpg "opera") |
| :---:  | :---: | :---: | :---: | :---: | :---: | :---: |
| __[type="file"]__ | 1.0~ | O | O | 1.0~ | 1.0~ | 1.0~ |

</article>

<hr/>

#### :pushpin: type="hidden"
웹 브라우저 화면에 나타나지 않으며, 자바스크립트를 이용하지 않으면 내용을 변경할 수 없는 숨긴 서식이다.<br>
타입의 name 속성에 charset 값을 지정하면, 해당 폼의 문자 인코딩 값이 서버로 전달된다.

```html
<label for="hiddenbox">폼의 문자 인코딩</label>
<input type="hidden" name="_charset_">
```

##### :zap: 지원하는 브라우저 및 버전
<article class="browser-tbl">

|  **속성**  | ![chrome](/icons/chrome.jpg "chrome") | ![ie edge](/icons/edge.jpg "ie edge") | ![ie](/icons/ie.jpg "ie") | ![firefox](/icons/firefox.jpg "firefox") | ![safari](/icons/safari.jpg "safari") | ![opera](/icons/opera.jpg "opera") |
| :---:  | :---: | :---: | :---: | :---: | :---: | :---: |
| __[type="hidden"]__ | 1.0~ | O | O | 1.0~ | 1.0~ | 2.0~ |

</article>

<hr/>

#### :pushpin: type="submit"
전송 버튼을 나타낸다.<br>
폼 데이터를 서버로 전송하는 역할을 하고, value 속성에 버튼에 표시될 문자열을 입력할 수 있다.

```html
<input type="submit" value="확인">
```

##### :zap: 지원하는 브라우저 및 버전
<article class="browser-tbl">

|  **속성**  | ![chrome](/icons/chrome.jpg "chrome") | ![ie edge](/icons/edge.jpg "ie edge") | ![ie](/icons/ie.jpg "ie") | ![firefox](/icons/firefox.jpg "firefox") | ![safari](/icons/safari.jpg "safari") | ![opera](/icons/opera.jpg "opera") |
| :---:  | :---: | :---: | :---: | :---: | :---: | :---: |
| __[type="submit"]__ | 1.0~ | O | O | 1.0~ | 1.0~ | O |

</article>

<hr/>

#### :pushpin: type="reset"
리셋 버튼을 나타낸다.<br>
폼의 데이터를 모두 초기화하는 역할을 하며, value 속성에 버튼에 표시될 문자열을 입력할 수 있다.

```html
<input type="reset" value="초기화">
```

##### :zap: 지원하는 브라우저 및 버전
<article class="browser-tbl">

|  **속성**  | ![chrome](/icons/chrome.jpg "chrome") | ![ie edge](/icons/edge.jpg "ie edge") | ![ie](/icons/ie.jpg "ie") | ![firefox](/icons/firefox.jpg "firefox") | ![safari](/icons/safari.jpg "safari") | ![opera](/icons/opera.jpg "opera") |
| :---:  | :---: | :---: | :---: | :---: | :---: | :---: |
| __[type="reset"]__ | 1.0~ | O | O | 1.0~ | 1.0~ | O |

</article>

<hr/>

#### :pushpin: type="button"
단순 버튼으로 자바스크립트 등을 실행하기 위한 용도로 사용된다.<br>
value 속성에 버튼에 표시될 문자열을 입력할 수 있다.

```html
<input type="button" value="실행">
```

##### :zap: 지원하는 브라우저 및 버전
<article class="browser-tbl">

|  **속성**  | ![chrome](/icons/chrome.jpg "chrome") | ![ie edge](/icons/edge.jpg "ie edge") | ![ie](/icons/ie.jpg "ie") | ![firefox](/icons/firefox.jpg "firefox") | ![safari](/icons/safari.jpg "safari") | ![opera](/icons/opera.jpg "opera") |
| :---:  | :---: | :---: | :---: | :---: | :---: | :---: |
| __[type="button"]__ | 1.0~ | O | O | 1.0~ | 1.0~ | O |

</article>

<hr/>

#### :pushpin: type="image"
submit 타입과 마찬가지로 전송 버튼 역할을 하고, 다른 점은 버튼에 사용할 이미지를 지정할 수 있다.<br>
src 속성을 사용하여 버튼 이미지를 지정할 수 있고, alt 속성을 사용하면 해당 버튼 이미지의 대체 텍스트를 제공할 수 있다.<br>

**:exclamation:주의해야할 점**<br>
image 타입에서는 src속성과 alt속성이 필수이다.

```html
<input type="image" src="images/button-img.jpg" alt="전송">
```

##### :zap: 지원하는 브라우저 및 버전
<article class="browser-tbl">

|  **속성**  | ![chrome](/icons/chrome.jpg "chrome") | ![ie edge](/icons/edge.jpg "ie edge") | ![ie](/icons/ie.jpg "ie") | ![firefox](/icons/firefox.jpg "firefox") | ![safari](/icons/safari.jpg "safari") | ![opera](/icons/opera.jpg "opera") |
| :---:  | :---: | :---: | :---: | :---: | :---: | :---: |
| __[type="image"]__ | O | O | O | O | O | O |

</article>

<hr/>

### HTML5 부터 추가된 타입

#### :pushpin: type="email"
한 줄 글상자와 동일하며, 입력 값이 이메일을 입력하기 위한 것임을 의미한다.<br>
입력할 수 있는 값은 이메일 주소만 가능하다. 만약 부적절한 이메일 주소가 입력될 경우 폼 전송 시 에러 메시지를 출력한다.

**:bulb:*Tips***<br>
모바일 디바이스 환경에서 영문 및 숫자 입력 모드로 제공된다.

```html
<label for="userEmail">이메일 주소</label>
<input type="email" id="userEmail" name="userEmail">
```

##### :zap: 지원하는 브라우저 및 버전
<article class="browser-tbl">

|  **속성**  | ![chrome](/icons/chrome.jpg "chrome") | ![ie edge](/icons/edge.jpg "ie edge") | ![ie](/icons/ie.jpg "ie") | ![firefox](/icons/firefox.jpg "firefox") | ![safari](/icons/safari.jpg "safari") | ![opera](/icons/opera.jpg "opera") |
| :---:  | :---: | :---: | :---: | :---: | :---: | :---: |
| __[type="email"]__ | 5.0~ | O | 10.0~ | O | O | 11.0~ |

</article>

<hr/>

#### :pushpin: type="search"
text 타입과 구별하여 표시하기 위한 목적으로 등장하였고, text타입과 별 차이가 없다.<br>
다만 줄바꿈을 포함한 문자열 값이 입력될 경우 줄바꿈을 제거한다.<br>

```html
<label for="keyword">검색</label>
<input type="search" id="keyword" name="keyword">
```

##### :zap: 지원하는 브라우저 및 버전
<article class="browser-tbl">

|  **속성**  | ![chrome](/icons/chrome.jpg "chrome") | ![ie edge](/icons/edge.jpg "ie edge") | ![ie](/icons/ie.jpg "ie") | ![firefox](/icons/firefox.jpg "firefox") | ![safari](/icons/safari.jpg "safari") | ![opera](/icons/opera.jpg "opera") |
| :---:  | :---: | :---: | :---: | :---: | :---: | :---: |
| __[type="search"]__ | 5.0~ | 12.0~ | 10.0~ | 4.0~ | 5.0~ | 10.6~ |

</article>

<hr/>

#### :pushpin: type="tel"
text 타입과 동일하며, 입력 값이 전화번호를 위한 것임을 의미한다.<br>
줄바꿈을 포함한 문자열 값이 입력될 경우 줄바꿈을 제거한다.

**:bulb:*Tips***<br>
모바일 디바이스 환경에서 숫자 입력 모드로 제공된다.

```html
<label for="phone">전화번호</label>
<input type="tel" id="phone" name="phone">
```

##### :zap: 지원하는 브라우저 및 버전
<article class="browser-tbl">

|  **속성**  | ![chrome](/icons/chrome.jpg "chrome") | ![ie edge](/icons/edge.jpg "ie edge") | ![ie](/icons/ie.jpg "ie") | ![firefox](/icons/firefox.jpg "firefox") | ![safari](/icons/safari.jpg "safari") | ![opera](/icons/opera.jpg "opera") |
| :---:  | :---: | :---: | :---: | :---: | :---: | :---: |
| __[type="tel"]__ | O | O | 10.0~ | O | O | 11.0~ |

</article>

<hr/>

#### :pushpin: type="url"
text 타입과 동일하며, 입력 값이 URL을 위한 것임을 의미한다.<br>
줄바꿈을 포함한 문자열이 들어올 경우에 웹 브라우저가 이를 제거한다.<br>
URL 타입에 입력할 수 있는 값은 **절대경로** URL만 가능하다. 만약 부적절한 URL을 입력할 경우 폼 전송시 에러 메시지를 출력한다.

**:bulb:*Tips***<br>
모바일 디바이스 환경에서 영문 및 숫자 입력 모드로 제공된다.

```html
<label for="homePage">홈페이지</label>
<input type="url" id="homePage" name="homePage">
```

##### :zap: 지원하는 브라우저 및 버전
<article class="browser-tbl">

|  **속성**  | ![chrome](/icons/chrome.jpg "chrome") | ![ie edge](/icons/edge.jpg "ie edge") | ![ie](/icons/ie.jpg "ie") | ![firefox](/icons/firefox.jpg "firefox") | ![safari](/icons/safari.jpg "safari") | ![opera](/icons/opera.jpg "opera") |
| :---:  | :---: | :---: | :---: | :---: | :---: | :---: |
| __[type="url"]__ | 1.0 | O | 10.0~ | O | O | 11.0~ |

</article>

<hr/>

#### :pushpin: type="number"
숫자를 입력하고자 할 때 사용한다.<br>
max, min 속성을 사용하여 최소값과 최대값을 지정할 수 있으며, step 속성을 사용하여 입력 단위를 지정할 수 있다.

```html
<label for="userAge">연령</label>
<input type="number"
       min="0"
       max="150"
       step="10"
       id="userAge"
       name="userAge">대
```

##### :zap: 지원하는 브라우저 및 버전
<article class="browser-tbl">

|  **속성**  | ![chrome](/icons/chrome.jpg "chrome") | ![ie edge](/icons/edge.jpg "ie edge") | ![ie](/icons/ie.jpg "ie") | ![firefox](/icons/firefox.jpg "firefox") | ![safari](/icons/safari.jpg "safari") | ![opera](/icons/opera.jpg "opera") |
| :---:  | :---: | :---: | :---: | :---: | :---: | :---: |
| __[type="number"]__ | O | O | 10.0~ | O | O | O |

</article>

<hr/>

#### :pushpin: type="range"
숫자를 입력하고자 할 때 사용한다.<br>
동일하게 숫자를 입력할 때 사용하는 **number** 타입과의 차이점은 슬라이더 형태의 UI로 렌더링 된다는 점이다.<br>
**number**와 같이 min, max, step 속성을 지정할 수 있다.

```html
<label for="satisfaction">만족도</label>
<input type="range"
       min="0"
       max="100"
       step="5"
       id="satisfaction"
       name="satisfaction">점
```

##### :zap: 지원하는 브라우저 및 버전
<article class="browser-tbl">

|  **속성**  | ![chrome](/icons/chrome.jpg "chrome") | ![ie edge](/icons/edge.jpg "ie edge") | ![ie](/icons/ie.jpg "ie") | ![firefox](/icons/firefox.jpg "firefox") | ![safari](/icons/safari.jpg "safari") | ![opera](/icons/opera.jpg "opera") |
| :---:  | :---: | :---: | :---: | :---: | :---: | :---: |
| __[type="range"]__ | 4.0~ | 12.0~ | 10.0~ | 23.0~ | 3.1~ | 11.0~ |

</article>

<hr/>

#### :pushpin: type="date"
날짜를 입력하고자 할 때 사용한다.<br>
사용시 웹 브라우저에서 날짜를 입력할 수 있는 입력 폼을 함께 제공한다.<br>
min, max 속성을 사용하여 입력 날짜의 범위를 지정할 수 도 있다.

**:bulb:*Tips***<br>
예를들어 **min="2019-01-01" max="2019-12-31"**이라고 입력한다면,<br>
입력한 날짜는 2019년 01월 01일부터 2019년 12월 31일까지로 제한된다<br>
또 **step** 속성을 사용하면 최소 단위를 변경 할 수 있다<br>
**step** 속성의 기본 값은 **"1일"**로 설정되어 있지만, 7일 단위로 변경하고 싶다면 **step="7"**로 지정하면 된다.

```html
<label for="reservationDate">예약가능 일</label>
<input type="date"
       min="2019-01-01"
       max="2019-12-31"
       step="7"
       id="reservationDate"
       name="reservationDate">
```

##### :zap: 지원하는 브라우저 및 버전
<article class="browser-tbl">

|  **속성**  | ![chrome](/icons/chrome.jpg "chrome") | ![ie edge](/icons/edge.jpg "ie edge") | ![ie](/icons/ie.jpg "ie") | ![firefox](/icons/firefox.jpg "firefox") | ![safari](/icons/safari.jpg "safari") | ![opera](/icons/opera.jpg "opera") |
| :---:  | :---: | :---: | :---: | :---: | :---: | :---: |
| __[type="date"]__ | 20.0~ | 12.0~ | X | 57.0~ | X | 11.0~ |

</article>

<hr/>

#### :pushpin: type="color"
색상을 입력하고자 할 때 사용한다

**:bulb:*Tips***<br>
아직 모든 웹 브라우저가 지원하고 있지 않지만, 일부 웹 브라우저에선 Color Picker 형태의 UI로 렌더링 된다.

```html
<label for="chooseColor">색상선택</label>
<input type="color"
       min="0"
       max="100"
       step="10"
       id="chooseColor"
       name="chooseColor">
```

##### :zap: 지원하는 브라우저 및 버전
<article class="browser-tbl">

|  **속성**  | ![chrome](/icons/chrome.jpg "chrome") | ![ie edge](/icons/edge.jpg "ie edge") | ![ie](/icons/ie.jpg "ie") | ![firefox](/icons/firefox.jpg "firefox") | ![safari](/icons/safari.jpg "safari") | ![opera](/icons/opera.jpg "opera") |
| :---:  | :---: | :---: | :---: | :---: | :---: | :---: |
| __[type="color"]__ | 20.0~ | 14.0~ | X | 29.0~ | 10.0~ | 12.0~ |

</article>

## :pencil2: button
일반적으로 클릭할수 있는 버튼을 나타낸다.

- **`submit`** : 폼 데이터를 서버로 전송한다.
- **`reset`** : 모든 제어되고 있는 값을 초기 값으로 리셋한다.
- **`button`** : 디폴트로 지정된 행동은 없다, 이벤트를 실행시켰을때 발생되는 element 이벤트와 연관 되어있는 클라이언트 script를 가질 수 있다.

**:bulb:*Tips***<br>
만약에 속성을 지정하지 않았다면 **submit**이 디폴트 값이고 다른 속성 값을 지정하였다면 빈 값에 동적으로 적용된다.
따로 서버에 내용을 전송할 필요가 없을 경우 form 태그 안에 포함이 안되어도 된다.

```html
  <button type="submit">제출</button>
  <button type="reset">리셋</button>
  <button type="button">버튼</button>

  <!--
    button안에 이미지나 텍스트를 넣기 어려운 경우
    aria-label 속성을 이용하여 대체 텍스트를 넣어준다.
    그럼 SEO관점이나, 접근성에 효율적이다.
   -->
  <button type="button" aria-label="이전"></button>
  <button type="button" aria-label="다음"></button>
```
<br>

<div class="reference-site">

  **참고한 사이트**<br>

  [https://seulbinim.github.io/WSA/form.html#input-요소](https://seulbinim.github.io/WSA/form.html#input-요소 "슬비님 Github 블로그")
  [https://developer.mozilla.org/ko/docs/Web/HTML/Element/button](https://developer.mozilla.org/ko/docs/Web/HTML/Element/button "MDN")

</div>
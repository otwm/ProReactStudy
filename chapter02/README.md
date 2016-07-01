#Dom 추상화의 내부

##리액트의 이벤트
실제로 하나의 이벤트가 dom에 연결 되는 것이며, 핸들러는 매핑 되는 듯 하다.
cf)
[MDN 메모리 누수](https://developer.mozilla.org/ko/docs/Web/JavaScript/Memory_Management)
[넥스트리 메모리 누수](http://www.nextree.co.kr/p7363/)

JSX는 실제 html의 이벤트 API는 이용하지 않는다. 또한 반드시 **낙타** 표기법을 이용하니 알아두자.
##JSX 자세히 살펴보기
JSX는 자바스크립트 코드 안에 선언적인 XML스타일의 구문을 작성할 수 있게 해주는 리액트의 선택적 자바스크립트 구분확장이다.
html과 유사하지만, 다른 XML태그 집합을 사용하는 것도 있다.(네이티브 등)
트랜스파일을 거치면서 script 코드로 변환된다.

* 트리형 요소를 쉽게 표현.(<== 이것이 존재 이유인듯.)
* 태그특성은 모두 낙타 표기법.
* 기타 xhtml 문법에 맞게(?)(열고 닫기 등)
* 모든 사향은 Dom api 기반(class(x), className(0)) (!!JSX는 html이 아닌 자바스크립트의 구문 확장이다.)

### 단일 루트 노드
ex)
```jsx
return (
    <h1>Hello1</h1>
    <h1>Hello2</h1>
)
// X

return (
    <div>
        <h1>Hello1</h1>
        <h1>Hello2</h1>
    </div>
)
//O
```
### 조건절
ex)
```jsx
return (
    <h1 className={ if(condition){"abc"} }>Hello1</h1>
)
// X

return (
    <h1 className={ condition?"abc":"" }>Hello1</h1>
)
//O

return (
    { condition?
        <h1 className="abc">Hello1</h1>
        : null
    }
)
//O

render(){
    let className;
    if(condition){
        className = "abc";
    }
    return (
        <div className={className}>Hello1</h1>
    )
}
//O
```
(내 생각엔) 마지막 것이 제일 나은 듯.

###공백
{"   "}
### 주석
<!-- comment -->(x)
/** comment */(x)

### 동적 HTML 렌더링

**리액트는 [XSS](http://www.kisa.or.kr/uploadfile/201312/201312161355109566.pdf) 공격 방지 기능이 기본적으로 내장되어 있다.**
![오 이런!!! 지자스](https://pbs.twimg.com/media/CYfJeWsUEAAeNz8.jpg)
==>> 그래서 노드 동적생성하는 것은 그다지 추천하지 않는다.
==>> xss 보호기능을 끄려면 dangerouslySetInnerHTML을 이요한다.

###JSX를 배제하고 리액트 이용
그래도 된다.(왜?? 뭣하러??)

```javascript
R.p({},
  'The live example is the same. The only difference is that we render to ',
  R.code({},
    'mountNode'
  ),
  ', ' +
  'which is just the DOM node for the example.'
)
```
왜 JSX를 써야하는 가를 보여주는 코드??


### 요소 팩토리
예제

### 인라인 스타일링
예제
참조)
[리액트를 이해하다 7편](http://blog.coderifleman.com/post/123886912084/reactjs%EB%A5%BC-%EC%9D%B4%ED%95%B4%ED%95%98%EB%8B%A47)

### 폼 처리
#### 제어 컴포넌트
상태 제어되는 컴퍼넌트
예제
##### 특수사례
* TextArea : 일관성을 위해 value 속성을 사용.(html과 다름)
* Select : 역시 value 속성 사용 가능하다.

#### 비제어 컴포넌트
상태 **안** 제어되는 컴퍼넌트
예제

### 가상 DOM의 작동 방식

##칸반 앱: 카드가 열려있는지 여부 확인
실습




##정리


## 기타
**[zapier react tutorial](https://zapier.com/engineering/react-js-tutorial-guide-gotchas/)**
[js oop](https://github.com/dotNetTree/I-Konow-JS/blob/master/oop-in-js/01_java_to_js.md)
[virtual dom에 대한 이해](https://gist.github.com/sebmarkbage/fcb1b6ab493b0c77d589#file-react-terminology-md)

## 남은 과제들
* [es6, react.Component]구체적으로 생성자 안에 super 하는 일은 무엇인가?

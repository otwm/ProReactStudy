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
#### 제어 컴포넌트(Controlled Component)
Controlled Component는 State에 따라 값을 관리하는 Componenet 입니다. 이를 이용해 텍스트 필드를 재작성합니다.

예제
##### 특수사례
* TextArea : 일관성을 위해 value 속성을 사용.(html과 다름)
* Select : 역시 value 속성 사용 가능하다.

#### 비제어 컴포넌트(UnControlled Component)
UnControlled Componenent는 반대로 값을 관리하지 않는 컴포넌트로 초기값을 설정한 값은 defaultValue로 지정합니다. 이 경우는 앞 절에서처럼 onChange()에서 항상 값을 state에 반영해도 되고, 반영하고 싶을 때만 DOM에서 value를 취득하여 갱신하는 것도 가능합니다.

예제

````javascript
var LiveText = React.createClass({
  getInitialState() {
    return {
      textValue: "initial value"
    };
  },
  changeText(e) {
    this.setState({textValue: this.refs.inputText.getDOMNode().value });
  },
  render() {
    return (
      <div>
        <p>{this.state.textValue}</p>
        <input type="text" ref="inputText" defalutValue="initial value" />
        <button onClick={this.changeText}>change</button>
      </div>
    );
  }
});
````

### 가상 DOM의 작동 방식
> 애플리케이션 개발자가 VIRTUAL DOM을 직접 신경 쓰는 경우는 key 속성 지정과 성능 향상의 목적으로 shouldComponentUpdate()를 구현할 때입니다.  

* [react 공식 사이트 virtual dom](https://facebook.github.io/react/docs/glossary.html)
* [virtual dom과 dom의 차이](http://reactkungfu.com/2015/10/the-difference-between-virtual-dom-and-dom/)
* [state of virtual dom](https://blog.jscrambler.com/state-virtual-dom/)
* [Learning Virtual DOM and React Diff Algorithm](http://www.oyecode.com/2015/09/reactjs-learning-virtual-dom-and-react.html)
* [virtual dom의 좋은 점](http://blog.coderifleman.com/post/122771353444/reactjs%EB%A5%BC-%EC%9D%B4%ED%95%B4%ED%95%98%EB%8B%A44)

### 키
virtual dom에서 반복되는 요소들을 다룰 시 성능을 높이기 위해 key 속성을 이용하는 것이 좋다.

### ref
컴퍼넌트 내부에 하위 노드나 컴퍼넌트에 접근하고 싶을 때 사용할 수 있다.
그러나 대부분의 경우 실제 DOM을 조작하는 것보다 리액트 모델 안에서 더 깔끔하게 코드를 구성할
수 있는 방법이 있따!!!

예제
##칸반 앱: 카드가 열려있는지 여부 확인
실습

##정리



## 기타
**[zapier react tutorial](https://zapier.com/engineering/react-js-tutorial-guide-gotchas/)**
[js oop](https://github.com/dotNetTree/I-Konow-JS/blob/master/oop-in-js/01_java_to_js.md)
[virtual dom에 대한 이해](https://gist.github.com/sebmarkbage/fcb1b6ab493b0c77d589#file-react-terminology-md)

## 남은 과제들
* [es6, react.Component]구체적으로 생성자 안에 super 하는 일은 무엇인가?

## 설명
* 칸반 소스를 가지고 2장 설명
* 공식 문서 보기
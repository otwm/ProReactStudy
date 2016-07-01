<div class="inner-content">[Edit on GitHub](https://github.com/facebook/react/tree/master/docs/docs/ref-10-glossary.md)

# React (Virtual) DOM Terminology

In React's terminology, there are five core types that are important to distinguish:
리액트 기술 상에서 주요하게 구분되는 5가지 핵심 형태가 있다.

*   [ReactElement / ReactElement Factory](#react-elements)
*   [ReactNode](#react-nodes)
*   [ReactComponent / ReactComponent Class](#react-components)

## <a class="anchor" name="react-elements"></a>React Elements [#](#react-elements)

The primary type in React is the `ReactElement`. It has four properties: `type`, `props`, `key` and `ref`. It has no methods and nothing on the prototype.
리액트 상의 주요 타입은 리액트 요소이다. 그것은 `type`, `props`, `key` 과 `ref`의 4가지 프로퍼티를 가지고 있다. 리액트 요소는 메서드나 프로토타입이 존재하지 않는다.

You can create one of these objects through `React.createElement`.
당신은 React.createElement를 통해 이것을 생성할 수 있다.

<div class="highlight">

    var root = React.createElement('div');

</div>

To render a new tree into the DOM, you create `ReactElement`s and pass them to `ReactDOM.render` along with a
regular DOM `Element` (`HTMLElement` or `SVGElement`). `ReactElement`s are not to be confused with DOM `Element`s.
A `ReactElement` is a light, stateless, immutable, virtual representation of a DOM `Element`. It is a virtual DOM.

DOM에 새로운 트리를 렌더하기 위해 리액트 요소를 생성하고 ReactDOM.render으로 정규 DOM 요소(html 요소 또는 svg 요소)를 받을 수 있다.
리액트 요소를 DOM 요소와 혼돈하지 마라. 리액트 요소는 DOM 요소의 경량, 무상태, 불별, 가상의 표현이다. 그것은 가상 DOM이다.

<div class="highlight">

    ReactDOM.render(root, document.getElementById('example'));

</div>

To add properties to a DOM element, pass a properties object as the second argument and children to the third argument.
DOM 요소에 프로퍼티를 추가하기 위해, 두번째 인자에 프로퍼티 객체를 받고 세번째 인자에 자식을 받아라.
<div class="highlight">

    var child = React.createElement('li', null, 'Text Content');
    var root = React.createElement('ul', { className: 'my-list' }, child);
    ReactDOM.render(root, document.getElementById('example'));

</div>

If you use React JSX, then these `ReactElement`s are created for you. So this is equivalent:
만약 당신이 React JSX를 사용한다면, 리엑트 요소가 생성될 것이며, 이것과 동일하다.
<div class="highlight">

    var root = <ul className="my-list">
                 <li>Text Content</li>
               </ul>;
    ReactDOM.render(root, document.getElementById('example'));

</div>

### <a class="anchor" name="factories"></a>Factories [#](#factories)

A `ReactElement`-factory is simply a function that generates a `ReactElement` with a particular `type` property. React has a built-in helper for you to create factories. It's effectively just:
리액트 팩토리는 특정 타입 프로퍼티의 리액트 요소를 생성하는 간단한 함수 이다. 리엑트는 팩토리 생성을 위한 내장 헬퍼를 가지고 있다. 그건 효과적으로 단지 :
<div class="highlight">

    function createFactory(type) {
      return React.createElement.bind(null, type);
    }

</div>

It allows you to create a convenient short-hand instead of typing out `React.createElement('div')` all the time.
언제나 React.createElement('div') 이렇게 타이핑 하는 대신 편의적으로 짧게 작성이 가능하다.
<div class="highlight">

    var div = React.createFactory('div');
    var root = div({ className: 'my-div' });
    ReactDOM.render(root, document.getElementById('example'));

</div>

React already has built-in factories for common HTML tags:
리엑트는 이미 공통 HTML 태그에 대한 내장 팩토리를 가지고 있다.
<div class="highlight">

    var root = React.DOM.ul({ className: 'my-list' },
                 React.DOM.li(null, 'Text Content')
               );

</div>

If you are using JSX you have no need for factories. JSX already provides a convenient short-hand for creating `ReactElement`s.
만약 당신이 JSX를 사용하고 있다면 팩토리는 필요가 없다. JSX는 이미 리엑트 요소를 생성시키는 편의적인 단축어를 제공한다.
## <a class="anchor" name="react-nodes"></a>React Nodes [#](#react-nodes)

A `ReactNode` can be either:

*   `ReactElement`
*   `string` (aka `ReactText`)
*   `number` (aka `ReactText`)
*   Array of `ReactNode`s (aka `ReactFragment`)

These are used as properties of other `ReactElement`s to represent children. Effectively they create a tree of `ReactElement`s.

## <a class="anchor" name="react-components"></a>React Components [#](#react-components)

You can use React using only `ReactElement`s but to really take advantage of React, you'll want to use `ReactComponent`s to create encapsulations with embedded state.

A `ReactComponent` Class is simply just a JavaScript class (or "constructor function").

<div class="highlight">

    var MyComponent = React.createClass({
      render: function() {
        ...
      }
    });

</div>

When this constructor is invoked it is expected to return an object with at least a `render` method on it. This object is referred to as a `ReactComponent`.

<div class="highlight">

    var component = new MyComponent(props); // never do this

</div>

Other than for testing, you would normally _never_ call this constructor yourself. React calls it for you.

Instead, you pass the `ReactComponent` Class to `createElement` you get a `ReactElement`.

<div class="highlight">

    var element = React.createElement(MyComponent);

</div>

OR using JSX:

<div class="highlight">

    var element = <MyComponent />;

</div>

When this is passed to `ReactDOM.render`, React will call the constructor for you and create a `ReactComponent`, which is returned.

<div class="highlight">

    var component = ReactDOM.render(element, document.getElementById('example'));

</div>

If you keep calling `ReactDOM.render` with the same type of `ReactElement` and the same container DOM `Element` it always returns the same instance. This instance is stateful.

<div class="highlight">

    var componentA = ReactDOM.render(<MyComponent />, document.getElementById('example'));
    var componentB = ReactDOM.render(<MyComponent />, document.getElementById('example'));
    componentA === componentB; // true

</div>

This is why you shouldn't construct your own instance. Instead, `ReactElement` is a virtual `ReactComponent` before it gets constructed. An old and new `ReactElement` can be compared to see if a new `ReactComponent` instance should be created or if the existing one should be reused.

The `render` method of a `ReactComponent` is expected to return another `ReactElement`. This allows these components to be composed. Ultimately the render resolves into `ReactElement` with a `string` tag which instantiates a DOM `Element` instance and inserts it into the document.

React 0.14 introduced [stateless functional components](/react/blog/2015/10/07/react-v0.14.html#stateless-functional-components) as an alternative way of defining components. Instead of being a class, it is a simple function that accepts props and is expected to return a `ReactElement`.

## <a class="anchor" name="formal-type-definitions"></a>Formal Type Definitions [#](#formal-type-definitions)

### <a class="anchor" name="entry-point"></a>Entry Point [#](#entry-point)

<div class="highlight">

    ReactDOM.render = (ReactElement, HTMLElement | SVGElement) => ReactComponent;

</div>

### <a class="anchor" name="nodes-and-elements"></a>Nodes and Elements [#](#nodes-and-elements)

<div class="highlight">

    type ReactNode = ReactElement | ReactFragment | ReactText;

    type ReactElement = ReactComponentElement | ReactDOMElement;

    type ReactDOMElement = {
      type : string,
      props : {
        children : ReactNodeList,
        className : string,
        etc.
      },
      key : string | boolean | number | null,
      ref : string | null
    };

    type ReactComponentElement<TProps> = {
      type : ReactClass<TProps> | ReactFunctionalComponent<TProps>,
      props : TProps,
      key : string | boolean | number | null,
      ref : string | null
    };

    type ReactFragment = Array<ReactNode | ReactEmpty>;

    type ReactNodeList = ReactNode | ReactEmpty;

    type ReactText = string | number;

    type ReactEmpty = null | undefined | boolean;

</div>

### <a class="anchor" name="classes-and-components"></a>Classes and Components [#](#classes-and-components)

<div class="highlight">

    type ReactClass<TProps> = (TProps) => ReactComponent<TProps>;

    type ReactComponent<TProps> = {
      props : TProps,
      render : () => ReactElement
    };

    type ReactFunctionalComponent<TProps> = (TProps) => ReactElement;

</div>

<div class="docs-prevnext">[← Prev](/react/docs/webcomponents.html)</div>

</div>
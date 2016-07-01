/**
 * 커스텀 팩토리 예제
 */
import React, {Component} from 'react';
import {render} from 'react-dom';

/**
 * 그리팅
 */
class Greeting extends Component {
    render() {
        return (<span>hi</span>);
    }
}

var dom = React.DOM;
var greeting = React.createFactory(Greeting);


render(
    dom.div({id: "greeting-container", className: "container"},
        greeting({name: "World"})
    ),
    document.getElementById('root')
);

/**
 * 인라인 스타일링 예제
 */

const style = {
    container: {
        backgroundColor: "#ddd",
        width: 900
    }
}

class Container extends Component {
    render() {
        return (
            <div style={style.container}>test</div>
        );
    }
}

render(
    <Container/>, document.getElementById('second')
);

/**
 *  폼 제어 컴포넌트
 */

class Search extends Component {

    constructor() {
        super();
        this.state = {
            searchTerm: "React"
        };
    }

    handleChange(event) {
        this.setState({searchTerm: event.target.value});
        if (console)console.log(this.state.searchTerm);
    }

    render() {
        return (
            <div>
                SearchTerm :
                <input type="search" value={this.state.searchTerm}
                       onChange={this.handleChange.bind(this)}/>
            </div>
        );
    }
}

render(
    <Search/>, document.getElementById('third')
);

/**
 *  폼 비제어 컴포넌트
 */

class NotControlledSearch extends Component {

    constructor() {
        super();
    }

    handleSubmit(event) {
        console.log(event.target.name.value);
        console.log(event.target.email.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="formGroup">
                    Name : <input name="name" type="text"/>
                </div>
                <div className="formGroup">
                    E-mail : <input name="email" type="email"/>
                </div>
                <button type="submit">Submit</button>
            </form>
        );
    }
}

render(
    <NotControlledSearch/>, document.getElementById('forth')
);
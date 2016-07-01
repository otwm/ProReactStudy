import React, {Component} from 'react';
import {render} from 'react-dom';

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

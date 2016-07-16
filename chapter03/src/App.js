import React, {Component} from 'react';
import {render} from 'react-dom';

class Greeter extends Component {
    render() {
        return (
            <h1>{this.props.salutation}</h1>
        )
    }
}

render(<Greeter salutation="Hello World"/>, document.getElementById('root'));
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Hello extends Component {
    render() {
        return (
            React.DOM.form({className: "commentForm"},
                React.DOM.input({type: "text", placeholder: "Name"}),
                React.DOM.input({type: "text", placeholder: "Comment"}),
                React.DOM.input({type: "submit", placeholder: "Post"})
            )
        );
    }
}

ReactDOM.render(<Hello/>, document.getElementById('root'));
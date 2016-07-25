import React, {PropTypes, Component} from 'react';
import {DragSource} from 'react-dnd';

class Snack extends Component {
    render() {
        const {name} = this.props;

        const style = {
            opacity: 1
        };

        return (
            <div className="snack" style={style}>
                {name}
            </div>
        )
    }
}

Snack.propTypes = {
    name: PropTypes.string.isRequired
};
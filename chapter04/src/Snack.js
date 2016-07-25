import React, {PropTypes, Component} from 'react';
import {DragSource} from 'react-dnd';

const snackSpec = {
    beginDrag(props){
        return {
            name: props.name
        };
    },
    endDrag(props, monitor){
        const dragItem = monitor.getItem();
        const dropResult = monitor.getDropResult();

        if (dropResult) {
            console.log(`You dropped ${dragItem.name} into ${dropResult.name}`);
        }
    }
};

let collect = (connect, monitor)=> {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
};

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

export default DragSource('snack', snackSpec, collect)(Snack);
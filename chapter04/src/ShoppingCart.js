import React, {PropTypes, Component} from 'react';
import {DragTarget} from 'react-dnd';

let collect = (connect, monitor)=> {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    };
};

const ShoppingCartSpec = {
    drop(){
        return {name: 'ShoppingCart'};
    }
};

class ShoppingCart extends Component {
    render() {

        const style = {
            backgroundColor: '#FFFFFF'
        };

        return (
            <div className="shopping-cart" style={style}>
                Drag here to order!
            </div>
        );
    }
}
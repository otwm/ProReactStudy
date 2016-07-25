import React, {PropTypes, Component} from 'react';
import {DragTarget} from 'react-dnd';

const ShoppingCartSpec = {
    drop(){
        return {name: 'ShoppingCart'};
    }
}
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
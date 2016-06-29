import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class GroceryList extends Component {
    render() {
        return (
            <ul>
                <ListItem quantity="1" name="Bread"/>
                <ListItem quantity="6" name="Eggs"/>
                <ListItem quantity="2" name="Milk"/>
            </ul>
        );
    }
}

class ListItem extends Component {
    render() {
        return (
            <li>
                {this.props.quantity} * {this.props.name}
            </li>
        );
    }
}

ReactDOM.render(<GroceryList/>,document.getElementById("root"));

import React, {Component} from 'react';
import KanbanBoard from './KanbanBoard';
import 'whatwg-fetch';

const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
    'Content-Type': 'application-json',
    Authorization: 'kdo'
};

class KanbanBoardContainer extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            cards: [],
        };
    }

    componentDidMount() {
        fetch(API_URL + '/cards', {header: API_HEADERS})
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({cards: responseData})
            })
            .catch((error) => {
                console.log('error !!! ', error)
            })
    }

    addTask(cardId, taskName) {

    }

    deleteTask(cardId, taskId, taskIndex) {

    }

    toggleTask(carId, taskId, taskIndex) {

    }

    render() {
        return (
            <KanbanBoard cards={this.state.cards}
                         taskCallbacks={{
                             toggle: this.toggleTask.bind(this),
                             delete: this.deleteTask.bind(this),
                             add: this.addTask.bind(this)
                         }}/>
        )
    }
}

export default KanbanBoardContainer;
import React, {Component} from 'react';
import KanbanBoard from './KanbanBoard';
import 'babel-polyfill';
import update from 'react-addons-update'
import 'whatwg-fetch';

/**
 * 칸반 API 정보
 * @type {string}
 */
const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
    'Content-Type': 'application/json',
    Authorization: 'any-string-you-like'
};

/**
 * 칸반 보드 컨테이너
 */
class KanbanBoardContainer extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            cards: [],
        };
    }

    /**
     * 컴퍼넌트에 읽어온 카드 데이터 삽입
     */
    componentDidMount() {
        fetch(API_URL + '/cards', {header: API_HEADERS})
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({cards: responseData})
            })
            .catch((error) => {
                console.log('error !!! ', error)
            });
    }

    /**
     * 태스크 추가
     * @param cardId
     * @param taskName
     */
    addTask(cardId, taskName) {
        let prevState = this.state;
        let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
        let newTask = {id: Date.now(), name: taskName, done: false};
        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {$push: [newTask]}
            }
        });

        this.setState({cards: nextState});
        fetch(`${API_URL}/cards/${cardId}/tasks`, {
            method: 'post',
            headers: API_HEADERS,
            body: JSON.stringify(newTask)
        }).then((response)=> {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error('server error')
            }
        }).then((responseData) => {
            newTask.id = responseData.id;
            this.setState({cards: nextState});
        }).catch((error) => {
            this.setState(prevState);
        });
    }

    /**
     * 태스크 삭제
     * @param cardId
     * @param taskId
     * @param taskIndex
     */
    deleteTask(cardId, taskId, taskIndex) {
        let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);

        let prevState = this.state;
        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {$splice: [[taskIndex, 1]]}
            }
        });

        this.setState({cards: nextState})

        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
            method: 'delete',
            headers: API_HEADERS
        }).then((response)=> {
            if (!response.ok) {
                throw new Error('server error');
            }
        }).catch((error)=> {
            console.error('error :', error);
            this.setState(prevState);
        });
    }

    toggleTask(cardId, taskId, taskIndex) {
        let prevState = this.state;
        let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
        let newDoneValue;
        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {
                    [taskIndex]: {
                        done: {
                            $apply: (done) => {
                                newDoneValue = !done
                                return newDoneValue;
                            }
                        }
                    }
                }
            }
        });

        this.setState({cards: nextState});

        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
            method: 'put',
            headers: API_HEADERS,
            body: JSON.stringify({done: newDoneValue})
        }).then((response)=> {
            if (!response.ok) {
                throw new Error('server error');
            }
        }).catch((error)=> {
            console.error('error :', error);
            this.setState(prevState);
        });
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
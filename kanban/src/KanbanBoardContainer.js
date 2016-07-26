import React, {Component} from 'react';
import update from 'react-addons-update';
import {throttle} from './utils';
import KanbanBoard from './KanbanBoard';
//폴리필
import 'babel-polyfill';
import 'whatwg-fetch';

/**
 * 칸반 API 정보
 * @type {string}
 */
const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
    'Content-Type': 'application/json',
    /*
     * Change the Authorization to any string you like. It can be your pet's name,
     * your middle name, your favorite animal, your superpower of choice...
     * An unique authorization will allow you to have your own environment for cards and tasks
     */
    Authorization: 'CHANGE THIS VALUE'
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
        this.updateCardStatus = throttle(this.updateCardStatus.bind(this));
        this.updateCardPosition = throttle(this.updateCardPosition.bind(this), 500);
    }

    /**
     * 컴퍼넌트에 읽어온 카드 데이터 삽입
     */
    componentDidMount() {
        fetch(API_URL + '/cards', {headers: API_HEADERS})
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

    updateCardStatus(cardId, listId) {
        let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
        let card = this.state.cards[cardIndex];
        if (card.status !== listId) {
            this.setState(update(this.state, {
                cards: {
                    [cardIndex]: {
                        status: {$set: listId}
                    }
                }
            }));
        }
    }

    updateCardPosition(cardId, afterId) {
        if (cardId !== afterId) {
            let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
            let card = this.state.cards[cardIndex];
            let afterIndex = this.state.cards.findIndex((card) => card.id == afterId);
            this.setState(update(this.state, {
                cards: {
                    $splice: [
                        [cardIndex, 1],
                        [afterIndex, 0, card]
                    ]
                }
            }));
        }
    }

    persistCardDrag(cardId, status) {
        let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
        let card = this.state.cards[cardIndex];

        fetch(`${API_URL}/cards/${cardId}`, {
            method: 'put',
            headers: API_HEADERS,
            body: JSON.stringify({
                status: card.status,
                row_order_position: cardIndex
            })
        }).then((response)=> {
            if (!response.ok) {
                throw new Error('Server error');
            }
        }).catch((error)=> {
            console.error('fetch error: ', error);
            this.setState(update(this.state, {
                cards: {
                    [cardIndex]: {
                        status: {$set: status}
                    }
                }
            }));
        });
    }

    render() {
        return (
            <KanbanBoard cards={this.state.cards}
                         taskCallbacks={{
                             toggle: this.toggleTask.bind(this),
                             delete: this.deleteTask.bind(this),
                             add: this.addTask.bind(this)
                         }}
                         cardCallbacks={{
                             updateStatus: this.updateCardStatus,
                             updatePosition: this.updateCardPosition,
                             persistCardDrag: this.persistCardDrag.bind(this)
                         }}/>
        )
    }
}

export default KanbanBoardContainer;
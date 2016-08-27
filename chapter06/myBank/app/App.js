import React, {Component} from 'react';
import {render} from 'react-dom';
import BankBalanceStore from './BankBalanceStore';
import BankActions from './BankActions';

/**
 * app 컴포넌트
 */
class App extends Component {
    /**
     * 생성자
     * 초기 계정을 설정 한다.
     */
    constructor() {
        super(...arguments);
        BankActions.createAccount();
        this.state = {
            balance: BankBalanceStore.getState()
        }
    }

    /**
     * 리스너 등록
     * 이제부터 컴퍼넌트는 스토어의 변화를 감지 하게 된다.
     */
    componentDidMount() {
        console.log('componentDidMount');
        this.storeSubscription = BankBalanceStore.addListener(data => {
            console.log('data : ' + data);// data는 현재 undefined
            this.handleStoreChange(data);
        });
    }

    /**
     * 스토어를 해체 한다.
     * 토큰을 이용하여 해체 한다.
     */
    componentWillUnmount() {
        this.storeSubscription.remove();
    }

    /**
     * 스토어의 상태 값을 컴퍼넌트의 상태로 변경
     */
    handleStoreChange() {
        console.log('test');
        this.setState({balance: BankBalanceStore.getState()});
    }

    /**
     * 입금.
     * 초기화
     */
    deposit() {
        BankActions.depositIntoAccount(Number(this.refs.amount.value));
        this.refs.amount.value = '';//refs 값을 이용하여 초기화 한다!
    }

    /**
     * 출금.
     * 초기화
     */
    withdraw() {
        BankActions.withdrawFromAccount(Number(this.refs.amount.value));
        this.refs.amount.value = '';
    }

    render() {
        return (
            <div>
                <header>Flux bank</header>
                <h1>금액 ${(this.state.balance).toFixed(2)}</h1>
                <div className="atm">
                    <input type="text" placeholder="금액" ref="amount"/>
                    <br/>
                    <button onClick={this.withdraw.bind(this)}>출금</button>
                    <button onClick={this.deposit.bind(this)}>입금</button>
                </div>
            </div>
        );
    }
}

render(<App/>, document.getElementById("root"));
import React, {Component} from 'react';
import {render} from 'react-dom';
import {Container} from 'flux/utils'
import BankBalanceStore from './BankBalanceStore';
import BankRewardsStore from './BankRewardsStore';
import BankActions from './BankActions';

/**
 * app 컴포넌트
 */
class App extends Component {
    /**
     * 생성자
     * 초기 계정을 설정 한다.
     * 별도의 상태 설정은 없다.
     */
    constructor() {
        super(...arguments);
        BankActions.createAccount();
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
                <h2>너는 {this.state.tier}</h2>
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

/**
 * 스토어 등록
 */
App.getStores = () => ([BankBalanceStore, BankRewardsStore]);
/**
 * 상태 가져오기
 * @param prevState
 */
App.calculateState = (prevState) => ({
    balance: BankBalanceStore.getState(),
    tier: BankRewardsStore.getState()
});
/**
 * 컨테이너 랩핑
 * @type {App}
 */
const AppContainer = Container.create(App);

render(<AppContainer/>, document.getElementById("root"));
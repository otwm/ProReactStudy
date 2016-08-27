import React, {Component} from 'react';
import {render} from 'react-dom';
import BankBalanceStore from './BankBalanceStore';
import BankActions from './BankActions';

class App extends Component {
    constructor() {
        super(...arguments);
        BankActions.createAccount();
        this.state = {
            balance: BankBalanceStore.getState()
        }
    }

    componentDidMount() {
        this.storeSubscription = BankBalanceStore.addListener(data => this.handleStoreChange(data));
    }

    componentWillUnmount() {
        this.storeSubscription.remove();
    }

    handleStoreChange() {
        this.setState({balance: BankBalanceStore.getState()});
    }

    deposit() {
        BankActions.depositIntoAccount(Number(this.refs.amount.value));
        this.refs.amount.value = '';
    }

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

render(<App/>,document.getElementById("root"));
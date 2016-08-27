import AppDispatcher from './AppDispatcher';
import {Store} from 'flux/utils'
import bankConstants from './constants';

/**
 * 계좌 금액
 * @type {number}
 */
let balance = 0;

/**
 * 스토어
 */
class BankBalanceStore extends Store {
    /**
     * 상태 값
     * @returns {number}
     */
    getState() {
        return balance;
    }

    /**
     * 디스패치
     * @param action
     * @private
     */
    __onDispatch(action) {
        console.log('__onDispatch');
        switch (action.type) {
            case bankConstants.CREATED_ACCOUNT:
                balance = 0;
                //사실 현 소스 상 이 부분의 이밋은 의미가 없다.
                this.__emitChange();
                break;
            case  bankConstants.DEPOSITED_INTO_ACCOUNT:
                balance = balance + action.amount;
                this.__emitChange();
                break;
            case bankConstants.WITHDREW_FROM_ACCOUNT:
                balance = balance - action.amount;
                this.__emitChange();
                break;
        }
    }
}

export default new BankBalanceStore(AppDispatcher);
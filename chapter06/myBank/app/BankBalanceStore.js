import AppDispatcher from './AppDispatcher';
import {ReduceStore} from 'flux/utils'
import bankConstants from './constants';

/**
 * 스토어
 */
class BankBalanceStore extends ReduceStore {
    /**
     * 초기값
     * @returns {number}
     */
    getInitialState() {
        return 0;
    }

    /**
     * 리듀스
     * @param state 상태
     * @param action 액션
     * @returns {*}
     */
    reduce(state, action) {
        switch (action.type) {
            case bankConstants.CREATED_ACCOUNT:
                return 0;
            case  bankConstants.DEPOSITED_INTO_ACCOUNT:
                return state + action.amount;
            case bankConstants.WITHDREW_FROM_ACCOUNT:
                return state - action.amount;
            default :
                return state;
        }
    }

}

export default new BankBalanceStore(AppDispatcher);
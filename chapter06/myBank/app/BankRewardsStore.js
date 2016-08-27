import AppDispatcher from './AppDispatcher';
import BankBalanceStore from './BankBalanceStore';
import  bankConstants from './constants';
import {ReduceStore} from 'flux/utils';

/**
 * 리워드 스토어
 */
class BankRewardsStore extends ReduceStore {
    /**
     * 초기 상태
     * @returns {string}
     */
    getInitialState() {
        return '흙수저';
    }

    /**
     * 리듀스
     * @param state 이전 상태
     * @param action 액션
     * @returns {*} 이후 상태
     */
    reduce(state, action) {
        /**
         * 이렇게 되면 의존 적이 된다.
         */
        this.getDispatcher().waitFor([
            BankBalanceStore.getDispatchToken()
        ]);
        if (action.type === bankConstants.DEPOSITED_INTO_ACCOUNT
            || action.type === bankConstants.WITHDREW_FROM_ACCOUNT
        ) {
            let balance = BankBalanceStore.getState();
            if (balance < 0) {
                return '막장';
            }
            if (balance < 5000) {
                return '흙수저';
            } else if (balance < 10000) {
                return '동수저';
            } else if (balance < 50000) {
                return '은수저';
            } else {
                return '금수저';
            }
        }
        return state;
    }
}

export default new BankRewardsStore(AppDispatcher);
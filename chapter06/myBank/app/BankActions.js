import AppDispatcher from './AppDispatcher';
import bankConstants from './constants';

let BankActions = {

    /**
     * 계좌 개설
     * 리덕스와는 다르다...!!
     */
    createAccount(){
        AppDispatcher.dispatch({
            type: bankConstants.CREATED_ACCOUNT,
            amount: 0
        });
    },
    /**
     * 입금
     * @param amount 금액
     */
    depositIntoAccount(amount){
        AppDispatcher.dispatch({
            type: bankConstants.DEPOSITED_INTO_ACCOUNT,
            amount: amount
        });
    },
    /**
     * 출금
     * @param amount 금액
     */
    withdrawFromAccount(amount){
        AppDispatcher.dispatch({
            type: bankConstants.WITHDREW_FROM_ACCOUNT,
            amount: amount
        })
    }
}

export default BankActions;
import AppDispatcher from './AppDispatcher';
import bankConstants from './constants';

let BankActions = {

  /**
   * Create an account with an empty value
   */
  createAccount() {
    AppDispatcher.dispatch({
      type: bankConstants.CREATED_ACCOUNT,
      amount: 0
    });
  },

  /**
   * @param  {number} amount to whithdraw
   */
  depositIntoAccount(amount) {
    AppDispatcher.dispatch({
      type: bankConstants.DEPOSITED_INTO_ACCOUNT,
      amount: amount
    });
  },

  /**
   * @param  {number} amount to whithdraw
   */
  withdrawFromAccount(amount) {
    AppDispatcher.dispatch({
      type: bankConstants.WITHDREW_FROM_ACCOUNT,
      amount: amount
    });
  }

};

export default BankActions;

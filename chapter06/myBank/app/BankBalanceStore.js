import {EventEmitter} from 'fbemitter';
import AppDispatcher from './AppDispatcher';
import bankConstants from './constants';

/**
 * 변경 이벤트
 * @type {string}
 */
const CHANGE_EVENT = 'change';

/**
 * 이벤트 에미터
 */
let __emitter = new EventEmitter();

/**
 * 계좌 금액
 * @type {number}
 */
let balance = 0;

let BankBalanceStore = {
    /**
     * 저장된 상태를 반환 한다.
     * @returns {number}
     */
    getState(){
        return balance;
    },
    /**
     * 리스너를 등록 한다.
     * 컴퍼넌트 상에서 사용할 콜백을 등록하기 위해 사용한다.
     * @param callback 콜백
     * @returns {*} 리스너 제거용 토큰
     */
    addListener: (callback) => {
        console.log('addListener');
        return __emitter.addListener(CHANGE_EVENT, callback);
    }
};

/**
 * 디스패쳐에 액션을 등록 했다.
 * 액션이 수행되면 기본적으로 emitter를 통해 컴퍼넌트에 값을 알려준다.
 */
BankBalanceStore.dispatchToken = AppDispatcher.register((action) => {
    switch (action.type) {
        case bankConstants.CREATED_ACCOUNT:
            balance = 0;
            //사실 현 소스 상 이 부분의 이밋은 의미가 없다.
            __emitter.emit(CHANGE_EVENT);
            break;
        case  bankConstants.DEPOSITED_INTO_ACCOUNT:
            balance = balance + action.amount;
            __emitter.emit(CHANGE_EVENT);
            break;
        case bankConstants.WITHDREW_FROM_ACCOUNT:
            balance = balance - action.amount;
            __emitter.emit(CHANGE_EVENT);
            break;
    }
});

export default BankBalanceStore;
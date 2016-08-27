import {Dispatcher} from 'flux';

/**
 * 앱 디스패쳐
 */
class AppDispatcher extends Dispatcher {
    /**
     * 디스패치
     * 로깅 기능 확장
     * 기본 디스패치 기능
     * @param action
     */
    dispatch(action = {}) {
        console.log('Dispatched', action);
        super.dispatch(action);
    }
}

export default new AppDispatcher();
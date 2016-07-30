import 'babel-polyfill';

/**
 *
 * @param func
 * @param wait
 * @returns {Function}
 */
export const throttle = (func, wait) => {
    let context, args, prevArgs, argsChanged, result;
    let previous = 0;
    return function () {
        let now, remaining;
        if (wait) {
            now = Date.now();
            remaining = wait - (now - previous);
        }
        context = this;
        args = arguments;
        argsChanged = JSON.stringify(args) != JSON.stringify(prevArgs);
        prevArgs = Object.assign({}, args);
        /**
         * 1. 인자가 변경 되었거나
         * 2. wait 가 설정 되어 있는 경우 wait 만큼 다시 시간이 훌렀을 때 true
         */
        if (argsChanged || wait && (remaining <= 0 || remaining > wait)) {
            if (wait) {
                previous = now;
            }
            result = func.apply(context, args);
            context = args = null;
        }
        return result;
    };
};
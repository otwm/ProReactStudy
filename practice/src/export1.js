/*
 let a, b, c;

 export {a, b, c};
 export {a as k, b as k2, c as k3};

 export let let1, let2, let3;
 export var var1, var2;

 export default abc;
 export default function(){

 };

 export {}
 */
export let a = 1, b = 2, c = 3;
export const pi = 3.14, t = 123;
export {a as k, b as k2, c as k3};
export default function () {
    console.log('test');
};

export default function () {
    console.log('test2');
};

export default function () {
    console.log('test3');
};

export default 10;
function test() {
    console.log('test3');
}
export {
    test as default
};

let testLet = {
    a: 1, b: 2, c: 3
};

export * from './export2';
export {e21 as myE21} from './export2';


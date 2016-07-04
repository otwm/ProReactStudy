//펼침 연산자 예제

function m(a, b) {
    return a + b;
}

let data = [1, 4];
let result = m(...data);

console.log(result);

let array1 = [2, 3, 4];
let array2 = [1, ...array1, 5, 6, 7];

console.log(array2);

console.log([].push(...[1, 2, 3]));

console.log([1, ...[2, 3, 4], ...[5, 6, 7]]);

//나머지 파라미터

function paramIter(a, b, ...args) {
    console.log(args);
}

paramIter(1, 2, 3, 4, 5, 6);

//배열 해체 할당

let array3 = [1, 2, 3];
let a, b, c;
[a, b, c] = array3;

console.log(a + b + c);
let [d,e,f] = [1, 2, 3];

console.log(d + e + f);
let [g,,h] = [1, 2, 3];
console.log(g);
console.log(h);

let [a1 , ...b1] = [1, 2, 3, 4, 5];

console.log(a1);
console.log(b1);

let [a2,,,...b2] = [1, 2, 3, 4, 5, 6];

console.log(a2);
console.log(b2);

let [aa,bb,cc = 3] = [1, 2];
console.log(cc);

let [aa1,bb1,[cc1,dd1]] = [1, 2, [3, 4]];

function paramArray([a,b,c=3]) {
    console.log(a, b, c);
}

paramArray([22, 11]);

//객체 해체 할당

let object = {'name': '민호', 'age': 23};
let name, age;
({name, age} = object);

console.log(name);
console.log(age);

let object2 = {'name': '민호', 'age': 23};
let x, y;
({name: x, age: y} = object2);

console.log(x, y);

let {name:x1, age:x2} = {'name': '민호', 'age': 23};

let {a, b, c=3} = {a: 1, b: 2};

let {['first' + 'Name']:xxx} = {firstName: 'fef'};

console.log(xxx);

var {name1, otherInfo1:{age}} = {name1: '수지', otherInfo1: {23}};

console.log(name1);
console.log(age);

function propertySeperate({name = '수지', age = 23, team='개발'}) {
    console.log(name, age, team);
}
propertySeperate({name: '동오', age: 12});

//화살표 함수

let circleArea = (pi, r) => {
    let area = pi * r * r;
    return area;
}

console.log(circleArea(3.14, 10));
let circleArea2 = (pi, r) => pi * r * r;
console.log(circleArea2(3.14, 10));

var object = {
    f1: function () {
        console.log(this);
        var f2 = function () {
            console.log(this);
        }
        f2();
        setTimeout(f2, 1000);
    }
};

object.f1();

let x10 = 1, y10 = 2;
let object = {x10,y10};

let object = {
    myfunction(){
        console.log(123);
    }
}

object.myfunction();

let abc = {
    ["test" + "Code"] : "test"
};


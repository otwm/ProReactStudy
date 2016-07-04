# chapter01 문법 맛보기
let, const, 해체 할당 등!!!

## let
블록 스코프 변수를 선언. var와는 다르게 변수 재선언이 허용 되지 않는다.

TODO: var와 let, 그리고 const가 스코프 체인에서 어떤 식으로 움직이는 지 관찰해 볼 필요가 있다!!!

## const
상수의 선언. 성격은 기본적으로 let과 유사하다. const에
객체를 할당할 경우 하위의 프로퍼티에 대해서 불변이 적용되는 것은 아니다.

## 파라미터 기본값
파라미터 변수에 기본 설정이 가능해졌다!!!(오우!)

## 펼침 연산자
이터러블 객체를 개별 값으로 나눈다.어디라도 쓸 수 있따!!!(오후!!)
... 할말을 잃어버리게 한다. 나머지 파라미터와 함께 매우 유용함.

```javascript
    function m(a, b) {
        return a, b;
    }

    let data = [1, 4];
    let result = m(...data);

    console.log(result);

    let array1 = [2, 3, 4];
    let array2 = [1, ...array1, 5, 6, 7];

    console.log(array2);

    console.log([].push(...[1, 2, 3]));

    console.log([1, ...[2, 3, 4], ...[5, 6, 7]]);
```
## 나머지 파라미터
```javascript
    function paramIter(a, b, ...args) {
        console.log(args);
    }

    paramIter(1, 2, 3, 4, 5, 6);
```
## 해체 할당
### 배열 해체 할당
```javascript
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
```
### 객체 해체 할당
```javascript
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
```
## 화살표 함수
화살표 함수의 this값은 해당 스코프의 this 값과 같다.
new 연산자 사용 불능

```javascript
var object = {
    f1:function(){
        console.log(this);
        var f2 = function(){
            console.log(this);
        }
        f2();
        setTimeout(f2,1000);
    }
}

object.f1();// 전부 Window
```

## 강화된 객체 리터럴
```javascript
    let x10 = 1, y10 = 2;
    let object = {x10,y10};
```

## 메서드
```javascript
let object = {
    myfunction(){
        console.log(123);
    }
}

object.myfunction();
```
## 조합 프로퍼티
```javascript
let abc = {
    ["test" + "Code"] : "test"
};
```
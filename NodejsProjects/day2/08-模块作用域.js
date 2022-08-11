// 好处：放置了全局变量污染的问题
// 比如在09test里引入该模块时，就是空对象，没有将uname和fn方法暴露在外面（默认情况下就是这样）
const uname = 'jiabin';

function fn() {
    console.log('my name is ' + uname);
}
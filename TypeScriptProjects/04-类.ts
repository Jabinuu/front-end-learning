class Person {
  // 先类块中定义，才能在构造函数中用this.（这里的类块中定义属性是实例的属性）
  friend: string;
  cat: string;
  constructor() {  // 可传参数
    this.friend = 'ss';
    this.cat = 'dou';
  }
  name_ = 'jiabin';   // readonly 只读属性，不可修改
  job = 'engineer'  // 但是跟方法不同，类块中的属性是会自动放到构造器中的

  set name(newValue) {    // get和set函数，也是原型上的访问器属性
    this.name_ = newValue;
  }
  get name() {
    return this.name_
  }


  /* 类块中声明的是类原型的方法成员
  ts的方法都写在类块中
  */
  eat() {
    console.log('I am eating')
  }

  /* 静态方法成员，定义在类本身上。只能由类直接调用，实例无法调用 */
  static walk() {
    console.log('I am a static method');
  }
  static create() {    //静态方法非常适合用来封装一个工厂函数
    return new Person();
  }


}
let p1 = new Person();
p1.name = 'zq'
console.log(p1.hasOwnProperty('job'));
console.log(p1.name);
p1.eat();
Person.walk();
console.log(Person.create() instanceof Person);   //通过工厂函数创建新的实例
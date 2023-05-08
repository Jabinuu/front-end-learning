interface obj{
  name:string,
  age:number
}
interface oo{
  name:string
}
function fn1<T extends oo>(arg:T):string{
  return arg.name
}
console.log(fn1<obj>({name:'jiabin',age:23}));


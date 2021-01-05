class Person{
  get [Symbol.toStringTag](){
    return 'Person'
  }
}

let p1= new Person();
console.log(({}).toString.call(p1));
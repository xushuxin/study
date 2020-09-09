{
  a = 1;

  function a() {}
  a = 3
};
console.log(a); //1

{
  function b() {};
  b = 1
};
console.log(b); //function b(){}



let str = 'AAA750pxBBB';
let res = str.replace(/(\d+)px/,(_,$1,$2)=>{
console.log($1);
return parseFloat($1)/75+'rem';
});
console.log(res);
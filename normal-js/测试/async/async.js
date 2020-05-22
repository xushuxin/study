// async function main() {
//   try {
//     const val1 = await firstStep();
//     const val2 = await secondStep(val1);
//     const val3 = await thirdStep(val1, val2);

//     console.log('Final: ', val3);
//   }catch (err) {
//     console.error(err);
//   }
// }
async function firstStep(){
  return new Promise((resolve,reject)=>{
    reject('error1')
  })
}
async function secondStep(){
  return new Promise((resolve,reject)=>{
    reject('error2')
  })
}
async function thirdStep(){
  return new Promise((resolve,reject)=>{
    reject('error3')
  })
}
// main() 
async function f() {
  try {
    await new Promise(function (resolve, reject) {
      reject('出错了1')
    });
    await new Promise(function (resolve, reject) {
      reject('出错了2')
    });
    await new Promise(function (resolve, reject) {
      reject('出错了3')
    });
    // Promise.all([firstStep(),secondStep(),thirdStep()]).then(d=>{
    //   console.log(d)
    // }).catch(e=>console.log(e))
  } catch(e) {
    console.log(e)
  }
  return 'hello world';
}
f().then(
  d=>console.log(d)
);
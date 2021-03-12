//一个字节是由8位二进制数组成的
//一个汉字由三个字节组成（不同进制有可能不同）
let b1 = Buffer.alloc(12,'珠峰')//声明一个固定大小的buffer(多出的部分会重复填充)
let b2 =Buffer.from('珠峰')//把汉字转为buffer数据
let b3 =Buffer.from('培训')

console.log(b1)//toString()=> 珠峰珠峰    
console.log(b2);
console.log(b3);

let b4 = Buffer.alloc(12);
//把b3的0~6索引的内容值拷贝到b4的0索引处
//第二个参数：指定从b4的哪个索引位置开始赋值
//第三个和第四个参数：指定拷贝b3的内容的起始索引和结束索引
b3.copy(b4,0,0,6);

//再拷贝b2的内容到索引6位置
b2.copy(b4,6,0,6);

b2.copy(b4,12,0,6);//超出了b4索引，所以没有任何效果

console.log(b4);
console.log(b4.toString())//把buffer数据转为汉字
console.log(Buffer.from(b4.toString()))//把汉字转为buffer数据


// 多个buffer合并为一个
let b5 = Buffer.concat([b2,b2,b3]);
console.log(b5);
console.log(b5.toString());

//使用slice截取buffer的部分内容
console.log(b5.slice(6).toString());
console.log(b5.slice(-6).toString());

// buffer是一个容器（缓冲器），一般用来存储数据流
//Buffer.alloc() Buffer.form() Buffer.concat()
//b1.copy() b1.length b1.toString() b1.slice()


首先，提出问题：

1. 什么是cookie，cookie有什么作用？

2. cookie的工作机制是怎样的？

3. cookie的格式及基本属性有哪些？
4. 我们应该如何使用cookie?有哪些注意点？

#### 什么是cookie?cookie有什么作用？

​	首先http是无状态的。无状态指的是，即服务器无法判断用户的身份和状态，所以就需要一种方案来让服务器可以识别用户的身份和状态，所以就出现了cookie，浏览器存储cookie并上送给服务器，从而服务器可以以此来判断用户身份和状态。

#### cookie机制

当用户第一次访问并登陆一个网站的时候，cookie的设置以及发送会经历以下四个步骤：

1.客户端发送一个http请求到服务器

2.服务器发送一个响应到客户端，其中包含set-cookie的头部

3.客户端保存cookie,之后向服务器请求时，http请求中会包含一个cookie的头部 

4.服务器根据cookie查询用户信息，处理相关请求，返回响应数据

#### cookie的格式及属性

格式：cookie其实就是一小段文本信息，用key=value的格式来表示一个cookie字段，不同cookie字段之间用分号和空格隔开。

属性：

name=value：自定义的cookie字段

expires：过期时间,在设置的某个时间点后该cookie就会失效

domain：生成该cookie的域名

path：该cookie是在哪个路径下生成的

secure：https请求才会传输该cookie

#### 使用cookie，注意点

##### 域名

cookie是不可以跨域名的，隐私安全机制禁止网站非法获取其他网站的cookie。

正常情况下，同一个一级域名下的两个二级域名也不能交互使用cookie，比如test1.qq.com和test2.qq.com，因为二者的域名不完全相同，如果想要一级域名qq.com名下的二级域名都可以使用该cookie，需要设置cookie的domain参数为.qq.com。

##### 路径

path属性决定cookie的路径。比如，设置为"/"表示允许当前域名下所有路径都可以使用cookie
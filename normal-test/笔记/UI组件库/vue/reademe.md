#### 创建项目

+ vue create project

+ Manully select features

  Bable、CSS Pre-processors、Unit Testing

+ 选择CSS-Precessors

  优选选择dart-sass：

  因为dart-sass是sass的实现版本，所有集成的新功能都要早于其他版本，而且darat-sass速度快，易于安装，最后能被编译成纯的js代码，很容易引入到我们现在的web开发的代码中

+ 选择单元测试方案：

  Jest无法测试UI，所以我们选择Mocha + Chai

  Mocha是JavaScript测试框架之一

  Chai是断言库(就是代替我们自己手动if判断测试结果的)

  [Mocha + Chai](https://www.jianshu.com/p/aa53ac34e4c0)

+ 选择单独配置文件，还是全部放在package.json中：

  选择全部放在package.json

+ save this as a preset for future projects?

  是否保存当前的设置作为未来的项目的预设   

  N 每次我们都会自己去重新配置项目

#### 删除无用文件及内容

#### 注册全局组件

利用webapck提供的require.context批量注册全局组件

#### Button组件

+ $slots.default获取默认插槽

+ 校验Button的type

+ 根据type给每种button添加不同类名（computed属性）

+ 写按钮样式（引入公共样式，使用sass变量）

+ 修改按钮hover，focus，active状态的样式

  :focus和:active的区别：

  focus是按钮聚焦的状态，使用tap键切换到按钮上时会触发该状态

  active是按钮激活的状态，鼠标左键点击按钮到松开的这段时间是active状态，tap键切换到按钮上不会触发

  点击按钮时会同时触发active和focus两种状态

  所以我们要保持focus和active的样式一致

+ 使用scss的给每一种类名设置样式

  **@each语句**

  相当于js中的forEach语句,循环体中的代码会编译多次

  ```scss
  @each $type,$color in(
    primary:$primary
    success:$success
  ){
    //这里的$type对应primary、success
    //$color对应$primary、$success的值
  }
  ```

  **&语法**

  ```scss
  //这种相当于给.my-button-success设置样式
  .mybutton{
    &-success{
    	background:green;
    }
  }
  ```

  **插值语句`#{}`**

  通过`#{}`插值语句可以在选择器或者属性名中使用变量

  ```scss
  $name: foo;
  $attr: border;
  p.#{$name} {
    #{$attr}-color: blue;
  }
  ```

  编译为

  ```css
  p.foo { border-color: blue; }
  ```

  #### Icon组件
  
  [使用阿里矢量图小图标](https://www.iconfont.cn/help/detail?spm=a313x.7781069.1998910419.17&helptype=code)
  
  使用iconfont.js（官网称为symbol引用）与使用iconfont.css的区别：
  
  - 使用js需要通过width、height修改图标大小
  
  - 使用css通过font-size修改图标大小


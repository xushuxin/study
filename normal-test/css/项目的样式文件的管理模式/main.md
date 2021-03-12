#### 管理样式文件的目的就是为了让开发人员更方便地维护代码

具体来说就是将样式文件进行分类，把相关的文件放在一起。让工程师在修改样式的时候更容易找到对应的样式文件，在创建样式文件的时候更容易找到对应的目录。

##### 以下是推荐的一种样式文件目录结构：

- base/，模板代码，比如默认标签样式重置；
- components/，组件相关样式；
- pages/，页面相关样式；
- themes/，主题样式，即使有的项目没有多个主题，也可以进行预留；
- abstracts/，其他样式文件生成的依赖函数及 mixin，不能直接生成 css 样式；
```js
src/

|

|– abstracts/

|   |– _variables.scss    

|   |– _functions.scss    

|   |– _mixins.scss       

|   |– _placeholders.scss 

|

|– base/

|   |– _reset.scss        

|   |– _typography.scss   

|   …                     

|

|– components/

|   |– _buttons.scss      

|   |– _carousel.scss     

|   |– _cover.scss        

|   |– _dropdown.scss     

|   |- header/

|      |- header.tsx

|      |- header.sass

|   |- footer/

|      |- footer.tsx

|      |- footer.sass

|   …                     

|

|– pages/

|   |– _home.scss         

|   |– _contact.scss      

|   …                     

|

```
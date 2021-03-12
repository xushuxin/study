##### 由于 CSS 的规则是全局的，任何一个样式规则，都对整个页面有效，所以如果不对选择器的命名加以管控会很容易产生冲突。

#### 解决方案

##### 手动命名
最简单有效的命名管理方式就是制定一些命名规则，比如 OOCSS、BEM、AMCSS，其中推荐比较常用的 BEM

BEM 是 Block、Element、Modifier 三个单词的缩写，Block 代表独立的功能组件，Element 代表功能组件的一个组成部分，Modifier 对应状态信息

下图是官方给出的示例代码：
![BEM官方实例](https://s0.lgstatic.com/i/image/M00/11/1E/CgqCHl7Lg5qAeYYDAAA8eZ2PEKM297.png)
从命名可以看到 Element 和 Modifier 是可选的，各个单词通过双横线（也可以用双下划线）连接（双横线虽然能和单词的连字符进行区分，但确实有些冗余，可以考虑直接用下划线代替）。BEM 的命名方式具有语义，很容易理解，非常适用于组件样式类。

##### 工具命名
通过命名规范来避免冲突的方式固然是好的，但这种规范约束也不能绝对保证样式名的唯一性，而且也没有有效的校验工具来保证命名正确无冲突。所以，聪明的开发者想到了通过插件将原命名转化成不重复的随机命名，从根本上避免命名冲突。比较著名的解决方案就是 CSS Modules。

下面是一段 css 样式代码：
```css
/* style.css */
.className {
  color: green;
}
借助 css Modules 插件，可以将 css 以 JSON 对象的形式引用和使用。
```
```js
import styles from "./style.css";
// import { className } from "./style.css";
element.innerHTML = '<div class="' + styles.className + '">';
编译之后的代码，样式类名被转化成了随机名称：
```

<div class="_3zyde4l1yATCOkgn-DBWEL"></div>
<style>
._3zyde4l1yATCOkgn-DBWEL {
  color: green;
}
</style>
但这种命名方式带来了一个问题，那就是如果想在引用组件的同时，覆盖它的样式会变得困难，因为编译后的样式名是随机。例如，在上面的示例代码中，如果想在另一个组件中覆盖 className 样式就很困难，而在手动命名情况下则可以直接重新定义 className 样式进行覆盖。
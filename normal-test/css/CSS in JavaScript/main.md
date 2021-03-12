##### 值得关注的 CSS in JavaScript
我们都知道 Web 标准提倡结构、样式、行为分离（分别对应 HTML、CSS、JavaScript 三种语言），但 React.js 的一出现就开始颠覆了这个原则。

先是通过 JSX 将 HTML 代码嵌入进 JavaScript 组件，然后又通过 CSS in JavaScript 的方式将 CSS 代码也嵌入进 JavaScript 组件。这种“all in JavaScript”的方式确实有悖 Web 标准。但这种编写方式和日益盛行的组件化概念非常契合，具有“高内聚”的特性，所以未来标准有所改变也未尝不可能。这也正是我们需要关注 CSS in JavaScript 技术的原因。

相对于使用预处理语言编写样式，CSS in JavaScript 具有两个不那么明显的优势：

+ 可以通过随机命名解决作用域问题，但命名规则和 CSS Modules 都可以解决这个问题；
+ 样式可以使用 JavaScript 语言特性，比如函数、循环，实现元素不同的样式效果可以通过新建不同样式类，修改元素样式类来实现。

我们以 [styled-compoents](https://styled-components.com/) 为例进行说明，下面是示例代码，第一段是源代码：
```js
// 源代码

const Button = styled.button`

  background: transparent;

  border-radius: 3px;

  border: 2px solid palevioletred;

  color: palevioletred;

  margin: 0.5em 1em;

  padding: 0.25em 1em;

  ${props => props.primary && css`

    background: palevioletred;

    color: white;

  `}

`;

const Container = styled.div`

  text-align: center;

`

render(

  <Container>

    <Button>Normal Button</Button>

    <Button primary>Primary Button</Button>

  </Container>

);

```

第二段是编译后生成的：
```html
<!--HTML 代码-->
<div class="sc-fzXfNJ ciXJHl">
  <button class="sc-fzXfNl hvaMnE">Normal Button</button>
  <button class="sc-fzXfNl kiyAbM">Primary Button</button>
</div>
<style>
/*CSS 代码*/
.ciXJHl {
  text-align: center;
}
.hvaMnE {
  color: palevioletred;
  background: transparent;
  border-radius: 3px;
  border-width: 2px;
  border-style: solid;
  border-color: palevioletred;
  border-image: initial;
  margin: 0.5em 1em;
  padding: 0.25em 1em;
}
.kiyAbM {
  color: white;
  border-radius: 3px;
  border-width: 2px;
  border-style: solid;
  border-color: palevioletred;
  border-image: initial;
  margin: 0.5em 1em;
  padding: 0.25em 1em;
  background: palevioletred;
}
</style>
```
对比以上两段代码很容易发现，在编译后的样式代码中有很多重复的样式规则。这并不友好，不仅增加了编写样式的复杂度和代码量，连编译后也增加了冗余代码。

styled-components 只是 CSS in JavaScript 的一种解决方案，其他解决方案还有很多，有兴趣的同学可以[点击这里查阅 GitHub 上的资料学习](https://github.com/MicheleBertoli/css-in-js)，上面收录了现有的 CSS in JavaScript 解决方案。
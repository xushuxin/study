#BFC
概念：块级格式化上下文（Block Formatting Context，BFC），是页面盒模型布局中的一种css渲染模式，相当于一个独立容器，里面的元素和外部的元素互不影响
创建BFC的方式：
  1.根元素(<html>)
  2.浮动元素（元素的 float 不是 none）
  3.绝对定位元素（元素的 position 为 absolute 或 fixed）
  4.行内块元素（元素的 display 为 inline-block）
  5.overflow 值不为 visible 的块元素
  6.弹性元素（display为 flex 或 inline-flex元素的直接子元素）
  7.匿名表格单元格元素（元素的 display为 table、table-row、 table-row-group、table-header-group、table-footer-group（分别是HTML table、row、tbody、thead、tfoot的默认属性）或 inline-table）
  8.表格单元格（元素的 display为 table-cell，HTML表格单元格默认为该值）
  9.display 值为 flow-root 的元素
  10.contain 值为 layout、content或 paint 的元素
  11.表格标题（元素的 display 为 table-caption，HTML表格标题默认为该值）
  12.网格元素（display为 grid 或 inline-grid 元素的直接子元素）
  13.多列容器（元素的 column-count 或 column-width 不为 auto，包括 column-count 为 1）
  14.column-span 为 all 的元素始终会创建一个新的BFC，即使该元素没有包裹在一个多列容器中（标准变更，Chrome bug10.）。
BFC的特性：
  1.内部的盒子会在垂直方向，一个接一个地放置。
  2.内部的盒子垂直方向的距离由margin决定，并且在一个BFC中，两个相邻的块级盒子的垂直外边距会产生折叠。
  3.形成了BFC的区域不会与浮动元素重叠
  4.计算BFC高度时，浮动元素也参与计算
  5.每个BFC和外部元素互不影响，也就是说BFC和其他元素的垂直外边距不会折叠。
创建BFC解决的问题：
  1.特性3=>实现左图右文(BFC1.html)
  2.特性5=>处理上下元素外间距重叠的问题(BFC2.html)
  3.特性4=>用于 解决浮动元素造成的父元素高度塌陷问题(BFC3.html)

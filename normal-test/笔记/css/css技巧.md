[TOC]

#### 1. 动态内容 - 文本超长处理

> 单行文本处理，使用单行省略

```css
{
    width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
```

> 多行文本的超长省略

```css
{
    width: 200px;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
```

#### 2. 图片加载错误处理最佳实践

> 原文地址：https://www.zhangxinxu.com/wordpress/2020/10/css-style-image-load-fail/

> 图像加载error的时候新增一个错误类名，例如`.error`：

```html
<img src="zxx.png" alt="CSS新世界封面" onerror="this.classList.add('error');">
```

> 再配合以下css代码(具体样式可已修改)：

```css
img.error {
  display: inline-block;
  transform: scale(1);
  content: '';
  color: transparent;
}
img.error::before {
  content: '';
  position: absolute;
  left: 0; top: 0;
  width: 100%; height: 100%;
  background: #f5f5f5 url(break.svg) no-repeat center / 50% 50%;
}
img.error::after {
  content: attr(alt);
  position: absolute;
  left: 0; bottom: 0;
  width: 100%;
  line-height: 2;
  background-color: rgba(0,0,0,.5);
  color: white;
  font-size: 12px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

> 效果如下：

![图像失败和alt信息同时出现](https://image.zhangxinxu.com/image/blog/202010/2020-10-24_192441.png)

> `break.svg`可以和主站域名一致，或跟CSS域名一致，或者直接内联在CSS文件中，例如：

```css
img.error::before {
  background: #f5f5f5 url("data:image/svg+xml,%3Csvg class='icon' viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cpath d='M304.128 456.192c48.64 0 88.064-39.424 88.064-88.064s-39.424-88.064-88.064-88.064-88.064 39.424-88.064 88.064 39.424 88.064 88.064 88.064zm0-116.224c15.36 0 28.16 12.288 28.16 28.16s-12.288 28.16-28.16 28.16-28.16-12.288-28.16-28.16 12.288-28.16 28.16-28.16z' fill='%23e6e6e6'/%3E%3Cpath d='M887.296 159.744H136.704C96.768 159.744 64 192 64 232.448v559.104c0 39.936 32.256 72.704 72.704 72.704h198.144L500.224 688.64l-36.352-222.72 162.304-130.56-61.44 143.872 92.672 214.016-105.472 171.008h335.36C927.232 864.256 960 832 960 791.552V232.448c0-39.936-32.256-72.704-72.704-72.704zm-138.752 71.68v.512H857.6c16.384 0 30.208 13.312 30.208 30.208v399.872L673.28 408.064l75.264-176.64zM304.64 792.064H165.888c-16.384 0-30.208-13.312-30.208-30.208v-9.728l138.752-164.352 104.96 124.416-74.752 79.872zm81.92-355.84l37.376 228.864-.512.512-142.848-169.984c-3.072-3.584-9.216-3.584-12.288 0L135.68 652.8V262.144c0-16.384 13.312-30.208 30.208-30.208h474.624L386.56 436.224zm501.248 325.632c0 16.896-13.312 30.208-29.696 30.208H680.96l57.344-93.184-87.552-202.24 7.168-7.68 229.888 272.896z' fill='%23e6e6e6'/%3E%3C/svg%3E") no-repeat center / 50% 50%;
}
```

#### 3.点击交互优化

> ##### 优化手势 -- 不同场景应用不同 cursor

- 按钮可点击: `cursor: pointer`

- 按钮禁止点击：`cursor: not-allowed`

- 等待 Loading 状态：`cursor: wait`

- 输入框：`cursor: text;`

- 图片查看器可放大可缩小：`cursor: zoom-in/ zoom-out`

- 提示：`cursor: help;`

  MDN：https://developer.mozilla.org/en-US/docs/Web/CSS/cursor

> ##### 点击区域优化 -- 伪元素扩大点击区域

伪元素也是可以代表其宿主元素来响应的鼠标交互事件的。借助伪元素可以轻松帮我们实现，我们可以这样写：

```css
.btn::before{
  content:"";
  position:absolute;
  top:-10px;
  right:-10px;
  bottom:-10px;
  left:-10px;
}
```

> #####  快速选择优化 -- `user-select: all`

利用 `user-select: all`，可以将需要一次选中的内容进行包裹，用户只需要点击一次，就可以选中该段信息：

```css
.g-select-all {
    user-select: all
}
```

效果：

![layout4](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a18f99c8e4064164815ecc5c6e774994~tplv-k3u1fbpfcp-zoom-1.image)

> ##### 选中样式优化 -- `::selection`

```css
.g-select-all::selection {
    background: #f7ec91;
    color: #333;
    text-shadow: 0 0 .5px #aaa, 1px 1px .5px #aaa, 2px 2px .5px #aaa, 3px 3px .5px #aaa, 4px 4px .5px #aaa;
}
```

效果：

![layout5](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cbbfee432f0042c794109cea39403faf~tplv-k3u1fbpfcp-zoom-1.image)

> ##### 添加禁止选择 -- `user-select: none`

把不可被选中元素设置为不可被选中，利用 CSS 可以快速的实现这一点：

```css
{
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
}
```

> ##### 跳转优化

对于所有路由跳转按钮，建议都使用 `<a>` 标签，并且内置 `href` 属性，填写跳转的路由地址。实际渲染出来的 DOM 可能是需要类似这样：

```html
<a href="/xx/detail">Detail</a>
```


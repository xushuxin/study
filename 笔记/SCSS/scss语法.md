**@each语句**

相当于js中的forEach语句,循环体中的代码会编译多次

```scss
@each $type in primary,success
{
  //这里的$type对应primary、success
}
```

```scss
@each $type,$color in (primary,white),(success,black)
{
  //这里的$type对应primary、success
  //$color对应white、black
}
```

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


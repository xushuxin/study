flex实现每两项之间间距相等，换行左对齐布局：

+ display:flex;  justify-content:space-between ;  flex-wrap:wrap

+ 利用after伪类，在父元素尾部生成一个伪类元素，content为空字符串，宽度和每一项盒子的大小一致

```vue
 <div class="test-flex">
      <div v-for="(item,index) in [1,2,3,4,5]" :key="item" :class="`flex-item-${index}`">item</div>
</div>
<style lang="scss">
.test-flex{
  display: flex;
  justify-content: space-between;
  flex-wrap:wrap;
  @each $class,$color,$border in (flex-item-0,#f00,#000),
  (flex-item-1,#ff0),
  (flex-item-2,#00f),
  (flex-item-3,#faa),
  (flex-item-4,#bfb)
  {
    .#{$class}{
      background:#{$color};
      border-color:#{$border};
    }
  } 
  &:after{
    content:'';
    width:100px;
  }
  >div{
    height: 100px;
    width:100px;
  }
}
</style>
```


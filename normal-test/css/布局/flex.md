> flex是flex-grow flex-shrink flex-basis的简写

单值语法：
1. 一个无单位数n，会被当做`flex:n 1 0;`
2. 一个有效width值(百分比/px/vh/em/rem等等单位)，会被当做`flex-basis`的值
3. 关键词`none`，`auto` 或`initial`

双值语法：
1. 第一个值必须为一个无单位数，会被当做`flex-grow`的值。
2. 第二个值可以是：
  + 一个无单位数：会被当做`flex-shrink`的值
  + 一个有效的宽度值，会被当做`flex-basis`的值

三值语法：
1. 第一个值必须为一个无单位数，并且它会被当做flex-grow的值
2. 第二个值必须为一个无单位数，并且它会被当作flex-shrink的值
3. 第三个值必须为一个有效的宽度值，并且它会被当做flex-basis的值
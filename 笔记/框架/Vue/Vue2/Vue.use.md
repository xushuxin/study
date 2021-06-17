[TOC]

#### 全局API的源码文件夹：vue/src/core/global-api

#### 1. Vue.use(plugin)

plugin：插件对象或者函数

原理

+ Vue.use首先会看传入的是不是一个具有install方法的对象，如果是会调用对象的install方法；

+ 如果不是则判断传入的是否为一个函数，是函数则将其当做 install方法调用；

+ install方法执行时会将Vue作为第一个参数传入

如果防止重复安装插件的？

+ 在当前Vue构造函数上添加一个静态属性_installedPlugins数组来维护已经安装的插件，安装前通过indexOf判断插件是否已安装过，已安装过则不再安装

#### 2.Vue.extend(options)

options：一个包含组件选项的对象

使用Vue构造函数，创建一个Vue的子类
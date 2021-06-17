/**
 * @file Service 插件
 */
 'use strict';

 const addComponent = require('./src/add-component');
 const addPage = require('./src/add-page');
 
 module.exports = (api, options) => {
   // 向 vue-cli-service 中注册 add-component 指令
   api.registerCommand('add-component', async () => {
     await addComponent(api);
   });
 
   // 向 vue-cli-service 中注册 add-page 指令
   api.registerCommand('add-page', async () => {
     await addPage(api);
   });
 };
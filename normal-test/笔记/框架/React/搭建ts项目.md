1. 初始化项目，命令行输入

`create-react-app 项目名 --template typescript`

2. 安装相关依赖
   `yarn add redux react-redux @types/react-redux react-router-dom @types/react-router-dom redux-thunk antd axios react-app-rewired`

   ##### react-app-rewired  这个包 可以让我们在不运行 eject的前提下进行自己的配置

   需要配合  
   1 - "scripts": {
       "start": "react-app-rewired start"
     },
   2 - config-overrides.js 在根目录下创建这个文件


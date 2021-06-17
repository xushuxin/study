import React from 'react';
import ReactDOM from 'react-dom';
//如果你使用了vw,则不再需要引入这个库了
//vw天生就会随着屏幕宽度变化而变化

//import './amfe-flexible';
import './index.css';
import 'antd/dist/antd.css';
import {Button} from 'antd';
ReactDOM.render(<Button type="primary">我是一个好按钮</Button>,document.getElementById('root'));
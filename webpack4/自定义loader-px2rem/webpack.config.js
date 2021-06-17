const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//返回的是loader的绝对路径
const px2rem2LoaderPath = path.resolve(__dirname,'loaders/test/test-px2rem2-loader.js');
const px2vwLoaderPath = path.resolve(__dirname,'loaders/test/test-px2vw-loader.js');
module.exports = {
    mode:'development',
    devtool:false,
    entry:'./src/index.js',
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'main.js'
    },
    resolveLoader:{
        /* alias:{
            'px2rem2-loader':px2rem2LoaderPath
        } */
        //modules:['loaders','node_modules']
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:[
                    {
                        loader:'babel-loader',
                        options:{
                            presets:[
                                "@babel/preset-env",
                                "@babel/preset-react"
                            ]
                        }
                    }
                ]
            },
            {
                test:/\.css$/,
               // exclude:/antd\.css$/,
                use:[
                    "style-loader",
                    "css-loader",
                    {
                        loader:px2vwLoaderPath,
                        //1rem=设计稿为750px/10
                        options:{remUnit:75,remPrecision:8,exclude:/antd\.css/},
                    
                    }
                ]
            },
            /* {
                test:/antd\.css$/,
                use:[
                    "style-loader",
                    "css-loader"
                ]
            } */
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ]
}
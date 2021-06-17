const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');

/**
 * 模块分析
 * @param {文件地址}} file 
 */
function getModuleInfo(file){
    //读取文件
    const body = fs.readFileSync(file, 'utf-8');

    // 转换为AST语法树
    const ast = parser.parse(body, {
        sourceType:'module' // ES模块
    })

    // 收集依赖
    const deps = {};
    traverse(ast, {
        ImportDeclaration({node}){
            const dirname = path.dirname(file);
            const abspath = './' + path.join(dirname, node.source.value);
            deps[node.source.value] = abspath;
        }
    })

    console.log('收集的依赖',deps)

    const { code } = babel.transformFromAst(ast, null, {
        presets:['@babel/preset-env']
    })
    // console.log('code', code);

    const moduleInfo = {
        file,
        deps,
        code
    };
    return moduleInfo;
}
// console.log('info:',getModuleInfo('./src/index.js'))

function parseModules(file){

    //从入口文件开始
    const entry = getModuleInfo(file);

    const temp = [entry];
    //依赖关系图
    const depsGraph = {};

    getDeps(temp, entry);

    //组装依赖
    temp.forEach(info => {
        depsGraph[info.file] = {
            deps: info.deps,
            code: info.code
        };
    })
    return depsGraph;
};

function getDeps(temp, {deps}){
    Object.keys(deps).forEach(key => {
        const child = getModuleInfo(deps[key]);
        temp.push(child);
        getDeps(temp, child);
    })
}


function bundle(file){
    const depsGraph = JSON.stringify(parseModules(file));
    console.log('depsGraph',depsGraph)
    return `(function(graph){
        function require(file){
            function absRequire(relPath){
                return require(graph[file].deps[relPath]);
            }
            var exports = {};
            (function(require,exports,code){
                eval(code);
            })(absRequire,exports,graph[file].code);
            return exports;
        }
        require('${file}');
    })(${depsGraph})`
}

const content = bundle('./src/index.js')
// console.log('content', content);

//写入dist
!fs.existsSync('./dist') && fs.mkdirSync('./dist');//不存在就创建目录
fs.writeFileSync('./dist/bundle.js',content);//写入
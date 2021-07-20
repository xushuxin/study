const fs  = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');

/* ==================== 1.解析单个文件 ===================== */
function getModuleInfo(file){
    // 读取文件
    const sourceCode = fs.readFileSync(file, 'utf-8')

    //转化AST语法树
    const ast = parser.parse(sourceCode,{
        sourceType:'module',//表示我们要解析的是ES模块
    });
    // console.log(ast.program.body)

    // 依赖收集(所有import导入的都视为依赖，require/exports的直接内部实现了，代码执行时内部实现的require直接执行即可)
    const deps = {};
    traverse(ast,{
        ImportDeclaration({ node }){
            const dirname = path.dirname(file);
            const abspath = './' + path.join(dirname, node.source.value);
            deps[node.source.value] = abspath;
        },
        // 收集require的依赖
        CallExpression({node}){
            if(node.callee.name !== 'require') return;
            const dirname = path.dirname(file);
            const abspath = './' + path.join(dirname, node.arguments[0].value);
            deps[node.arguments[0].value] = abspath;
        }
    })

    // ES6转成ES5
    const { code } = babel.transformFromAst(ast, null,{
        presets:[
            '@babel/preset-env',
        ]
    })
    const moduleInfo = {file, deps, code};
    return moduleInfo;
}

// const info = getModuleInfo('./src/index.js');
// console.log(info);


/* ==================== 2. 收集依赖 ======================== */

/**
 * 模块解析
 * @param {*} file 
 * @returns 
 */
function parseModules(file){
    const depsGraph = {};
    getDeps(depsGraph, file);
    return depsGraph;
}
/**
 * 获取依赖
 * @param {*} depsGraph 
 * @param {*} file 
 */
function getDeps(depsGraph, file){
    let moduleInfo = getModuleInfo(file);
    depsGraph[file] = {
        deps:moduleInfo.deps,
        code:moduleInfo.code
    }
    Object.values(moduleInfo.deps).forEach(absPath=>{
        getDeps(depsGraph, absPath)
    })
}

// parseModules('./src/index.js')


/* ==================== 3. 生成bundle文件 ================== */
/**
 * 从入口文件开始进行打包
 * @param {入口文件的路径} file 
 */
function bundle(file){
    const depsGraph = JSON.stringify(parseModules(file));
    
    return `
(function (graph){
    function require(file){
        function absRequire(relPath){
            return require(graph[file].deps[relPath])
        }
        var module = {}, code = graph[file].code;
        module.exports = {};
        (function(require,module,exports,code){
            eval(code)
        })(absRequire, module, module.exports ,code)
        return module.exports
    }
    require('${file}');
})(${depsGraph});`
}

let content = bundle('./src/index.js');
!fs.existsSync('./dist') && fs.mkdirSync('./dist');
fs.writeFileSync('./dist/bundle.js', content);

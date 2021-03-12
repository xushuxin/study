/**
 * ==========================================================================
 *                            步骤1：词法分析
 * 将源代码字符串分解成token数组，每个token是json对象，结构如下
 * {
 *    //枚举值，分别对应变量定义、变量引用、选择器、属性、值
 *    type:"varibaleDef" | "variableRef" | "selector" | "property" | "value",
 *    value:string //token字符串，即被分解的字符串
 *    indent:number //缩进空格数，需要根据它判断从属关系
 * }
 * ===========================================================================
 */

function tokenize(text){
  // 去除两边多余空格，按行进行解析
  console.log(text.trim().split(/\n|\r\n/))
  return text.trim().split(/\n|\r\n/).reduce((tokens,line,idx)=>{
    // 计算缩进
    const spaces = line.match(/^\s+/) || [''];//匹配每一行开头的空格
    const indent = spaces[0].length;//空格的数量

    //将当前行字符串去首尾空格
    const input  = line.trim();
    //通过空格分隔字符串为数组
    const words = input.split(/\s/);
    let value = words.shift();//取出第一个字,比如：$ib
    /**每一行的开头只可能是
     * 变量定义：$开头
     * 选择器：该行只有单个单词，如：id,类名，标签名（组合选择器在预编译里面是以嵌套方式实现的）
     * 属性名：仅包含字母和-
     * 除此之外视为语法错误
     */
    //
    if(words.length === 0){
      tokens.push({
        type:'selector',
        value,
        indent
      })
    }else{
      //区分是变量定义（$开头），如：$ib inline-block；还是变量引用，如：display $ib
      let type = '';
      if(/^\$/.test(value)){//如果是$开头,判定为变量定义
        type = 'variableDef';
      }else if(/^[a-zA-Z-]+$/){//如果仅包含字母和-,判定为属性名
        type = 'property'
      }else{//否则报语法错误
        throw new Error(`Tokenize error:Line ${idx} is "${value}" is not a variable or property!`)
      }
      tokens.push({
        type,
        value,
        indent
      })
      //继续取下个字,直到没有字
      while(value = words.shift()){
        tokens.push({
          //$开头则判定为变量引用（这里的字不可能是第一个字了），否则为值
          //值可能出现在变量定义时或者属性后面，或者其他值后面
          type:/^\$/.test(value)?'variableRef' : 'value',
          value,
          indent:0//变量引用和值不需要缩进
        })
      }
    }
    return tokens;
  },[])
}

/**
 * ============================================================================
 *                            步骤2：语法分析（Parse）
 * 最终AST结构如下：
 * {
 *   type: 'root',
 *   children: [{
 *     type: 'selector',
 *     rules: [{
 *       property: string,
 *       value: string[],
 *     }],
 *     indent: number,
 *     children: []
 *   }]
 * } 
 * ============================================================================
 */
function parse(tokens){
  //创建根节点
  var ast = {
    type:'root',
    children:[],
    indent:-1
  };
  //记录当前遍历路径
  let path = [ast];
  //指针，指向上一个选择器节点
  let preNode = ast;
  //遍历到的当前节点
  let node ;
  //用来存储变量值的对象
  let vDict = {};
  //依次获取token
  //如{ type: 'variableDef', value: '$ib', indent: 0 }
  while(node = tokens.shift()){
    //当前token代表变量定义
    if(node.type === 'variableDef'){
      //下一个token，如果是值，以变量名作为属性名存储到vDict对象中
      if(tokens[0]&&tokens[0].type === 'value'){
        const vNode = tokens.shift();
        vDict[node.value] = vNode.value;
      }else{//这里没有明白什么情况会走？
        preNode.rules[preNode.rules.length - 1].value = vDict[node.value];
      }
      continue;
    }
    //如果是属性名
    if(node.type === 'property'){
      // 如果缩进大于当前节点，代表是当前节点的property，向当前节点的rules中添加一个属性对象
      if(node.indent>preNode.indent){
        preNode.rules.push({
          property:node.value,
          value:[]
        })
      }else{//不是当前节点的property，是其祖先节点的属性
        //从当前节点开始向前查找
        let index = path.length-1,parent = path[index];
        //需要根据索引找到当前property所属的祖先节点
        while (node.indent <= parent.indent) {
          parent = path[--index];
        }
        //给当前节点添加属性（值在下个token设置）
        parent.rules.push({
          property: node.value,
          value: []
        })
        preNode = parent;//指针指向这个节点，后续为该属性，设置value值
      }
    }
    //当前token代表一个值，需要添加到最新添加的属性对象的value数组中（value总是紧跟在property后面）
    if(node.type === 'value'){
      try{
        preNode.rules[preNode.rules.length-1].value.push(node.value);
      }catch(e){
        console.error(preNode);
      }
      continue;
    }
    //变量引用，从vDict中取对应的变量值,添加到属性的value列表中
    if(node.type === 'variableRef'){
      preNode.rules[preNode.rules.length-1].value.push(vDict[node.value])
    }
    if(node.type === 'selector'){
      const item = {
        type:'selector',
        value :node.value,
        indent:node.indent,
        rules:[],
        children:[]
      }
      //当前选择器缩进大于当前节点的缩进，是其子节点
      if(node.indent>preNode.indent){
        // path[path.length-1].indent === node.indent && path.pop();
        path.push(item);
        preNode.children.push(item)
        preNode = item;
      }else{//不是当前节点的子节点，需要找到其父节点
        let index = path.length-1,parent = path[index];
        //从最后一个节点查找，找到当前节点所属的父节点
        while (node.indent <= parent.indent) {
          parent = path[--index];
        }
        //也可以用perent.index === -1 来判断
        if(index === 0) path = [];//说明其父节点是根节点了，可以删除上一个path数据
        parent.children.push(item)//向父节点的children数组中添加当前节点
        path.push(item)//记录当前节点
        preNode = item;//移动指针到当前子节点，下次循环给该节点添加对应的属性值，不用再查找一遍
      }
    }
  }
  // console.log(path)//path在一个选择器及其子选择器全部完成属性赋值后清空，可以节省内存
  return ast;
};

/**
 * ============================================================================
 *                             步骤3：转换
 * 为了方便代码生成，转换成下面的数组结构
 * {
 *   selector: string,
 *   rules: {
 *     property: string,
 *     value: string
 *   }[]
 * }[]
 * ============================================================================
 */
function transform(ast){
  let newAst = [];
  /**
   * 遍历AST转换成数组，同时将选择器和值拼接起来
   * @param node AST节点
   * @param prefix 当前遍历路径上的选择器名称组成的前缀
  */
  function traverse(node,prefix){
    let selector;
    prefix = prefix || '';
    //对选择器节点进行处理
    if(node.type === 'selector'){
      selector = prefix?prefix + ' ' + node.value : node.value//使用空格拼接上子选择器
      //每拼接一级选择器，就放到结果数组中
      newAst.push({
        selector,
        rules:node.rules.map((rule)=>{
          return {
            property:rule.property,//属性名
            value:rule.value.join(' ')//多个属性值用空格拼接
          }
        })
      })
    }
    //遍历children数组，递归处理子节点，传入result数组用于存储，父节点的selector用于拼接选择器
    for(let i = 0;i < node.children.length;i++){
      traverse(node.children[i],selector)
    }
  }
  traverse(ast);
  return newAst;
}

/**
 * ============================================================================
 *                         步骤4：代码生成
 * 生成CSS样式规则：
 * div { color:darkkhaki; }
 * ...
 * ============================================================================
 */

 function generate(nodes){
  //遍历抽象语法数组，拼接成css代码
  return nodes.map(item =>{
    let css = '',{selector,rules} = item;
    // css +=selector+'{'
    // rules.forEach(rule=>{
    //   css += rule.property+':' +rule.value + ';';
    // })
    // css +='}';
    css = rules.reduce((css,rule)=>{
      let {property,value} = rule;
      return css+`${property}:${value};`;
    },css)
    return `${selector}{${css}}`; 
  }).join('\n');//这里是否有必要使用\r\n?
 }
let tokens = tokenize(`
  $ib inline-block
  $borderColor lightgreen
  div
    p
      border 1px solid $borderColor
    color darkkhaki
    .a-b
      background-color lightyellow
      [data]
        padding 15px
        font-size 12px
    font-size 16px
  .d-ib
    display $ib  
`)
console.log('tokens',tokens)
let ast = parse(tokens);
console.log('ast',ast)
let newAst = transform(ast);
console.log('newAst',newAst)
let cssText = generate(newAst);
console.log(cssText)
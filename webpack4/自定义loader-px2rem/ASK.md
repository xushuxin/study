vw好还是rem呢
少数用媒体查询，主流是rem,但是未来可以vw
没听懂
刚刚的
淘宝都推荐vm了
用新不用久
vw
老师你做项目用不用脚手架搭项目的啊
不用rollup吗
为啥要用rollup


好算吗，100px不是更好算
如果你自己算的话100px 
设计 师给的设计稿750
1rem = 100px
2rem  = 200px



我们项目用的vw
感觉设置根字体  16.66667vw  刚好一个1ren = 100px
我记得媒体查询在移动端项目应用特别多
26.66667
用了好几年vw了
vm是什么
行内样式也可以被计算吗
转不了
为啥有的给1366px的设计稿？
1rem 1px不可以吗
所有的px都是根据根节点的字体大小算的吧
用了这个插件，是把写的全部的px转化为rem吗
行内样式怎么被解决
不写行内
可以设置  少于多少像素 不转换
郭纯:可以设置 少于多少像素 不转换


先不要讨论rem vw哪个好
感觉设置根字体  16.66667vw  刚好一个1ren = 100px
我记得媒体查询在移动端项目应用特别多
26.66667
用了好几年vw了
vm是什么
行内样式也可以被计算吗
转不了
为啥有的给1366px的设计稿？
1rem 1px不可以吗
chrome 最小字体12px 1px 12px
所有的px都是根据根节点的字体大小算的吧
%
em
rem 
vw
vh
px
用了这个插件，是把写的全部的px转化为rem吗
行内样式怎么被解决
不写行内
可以设置  少于多少像素 不转换
行内样式计算怎么解决
现在可以直接px直接适配了吧
第三方库没有使用rem怎么处理呢
vw 是怎么计算的啊
字体用px还是用rem??
那我如果一部分单位想用px怎么办 可以的
如果有的px我不想转化为rem怎么控制下呢 /*px*/
第三方库没有使用rem怎么处理呢
可以过滤哪些class不转换成rem吧
写PX
怎么不用devserver
比如设计给的1920设计图，按照设计图来做，name小屏幕就无法使用，如果用插件 转换城rem 或者 vw 就会完美适应各种分辨率屏幕，就是字号可能在Chrome下有问题
大写得PX
老师插件已经下载了？
跟根节点的字体大小没关系吗？
那750现在不应该是满屏么，没懂
看一下html的字体大小
那个8是设置什么的？
浏览器是rem不方便调试了呀
插件不是没写的吗，怎么转的呀
默认就是750px吗
这个比例应该是由根元素的字体大小决定的吧
那750现在不应该是满屏么，没懂
设置一下根字体大小
flexible  的替代品是什么？
不是 lib-flexiable 吗
这个插件计算时模式是750的屏幕吗
这个满屏怎么变的
为啥突然满屏幕了啊
为啥突然满屏幕了啊
font-size不是75px吗？
满屏咋变的，没看出来
用webpack devServer 效率高
我也没明白
安装了插件。。
课件地址有吗
这个flexable干啥的
满屏咋变的，没看出来，fontSize为啥37.5？
为啥满屏了flexable
哦，安装了插件，插件算出来的
750/2/10
。flexable 里面默认html 字体大小是37.5
不配置，默认保留几位？
amfe-flexable 为什么不是集成到loader里，要手动引入？
计算规则是什么
设计稿宽度在哪里设置的？默认750px吗
remdprecision是什么，来晚了
flexable计算规则是色很美
在root里设置的
flexable计算规则是什么
resolve loader
。。。。百度
在root里设置的
在 PC 上写 750 px，pxtorem 搞成是 10 rem，amfe 设置root 为 37.5 px，从而计算出 350px 刚好满屏
loader.pitch  执行顺序老师讲讲啊
从下往上执行
从下到上，右到左，这是loader的顺序，我说是pitch
有哪位课代表回头发一下代码吗？
loader-utils
111
ok



计算规则是什么
设计稿宽度在哪里设置的？默认750px吗
设计 师给设计 搞的时候750px
remdprecision 是什么，来晚了 计算REM的精度 保留几位小数
1rem 75
100px/75
flexable计算规则是色很美
在root里设置的
flexable计算规则是什么
resolve loader
。。。。百度
在root里设置的
在 PC 上写 750 px，pxtorem 搞成是 10 rem，amfe 设置root 为 37.5 px，从而计算出 350px 刚好满屏
loader.pitch  执行顺序老师讲讲啊
抱歉说句伤人的话。没基础的大哥看个屁呀。这不是浪费你自己时间吗。
从下往上执行
从下到上，右到左，这是loader的顺序，我说是pitch
有哪位课代表回头发一下代码吗？
loader-utils
111
ok
看下问题吧，都爆了
行内的计算能解决吗
ok
这么牛逼
移动端有 10px
老师用的什么浏览器 chrome
字体的大小该用 px 还是 rem 或者 em ？
rem vw
设置字体还是 px
动态传入的行内样式能自动转成rem吗？
为啥会出现不想转换的情况
大写PX
插件的不想转
vscode中 有这种插件
vscode 把源代码改了
如果单纯的是转rem,压根不用插件，写一段JS代码就自动转换了
很简单得通过dpr设置html得font-size
一会也会实现
得插件吧，css里写的px都得重新计算成rem
自动计算的
style-loader 没有生效？tg uqt b
如果是px转rem单位得需要插件了
data-dpr 是选择设备像素比的吗
但是一般不都是写成rem嘛
有配置 白名单的
老师根元素的大小是不是就是docuemnt.documentelement.clientWidth/10
一会讲
超超，你跟多少期了
为啥会变小
老师，css有类似babel把css转ast语法树的吗？有的，马上讲
代码哪里有
ypi
有的
有
啥库
postcss既有自带ast 也可
就有
postcss / csstree都可以
词法解析 -> 语法解析 -> AST抽象语法树
cssParser的库也可以
@babel/parse @babel/type @babel/traverse
@babel/generator  大概就这个几个babel 就能处理了
浏览器解析代码的时候都要通过ast树
火钳刘明
一次课能讲完吗？
参数只能传this吗 是的
获取参数用的
苍狼是不落下每次公开课
老师，loaderUtil.getOptions(this) 怎么就能反推出options 呢？
webpack
this就是当前的这个loader
不是的
this.=loaderContext loader执行的上下文对象
内部会把当前插件的 options给你
this是context，里面就有参数
为什么有两个px2rem2-loader.js
挺好玩的
为什么有两个px2rem2-loader.js文件
beforeComputed VS afterComputed
loader 是不是点函数式编程的思想
loader 就是一个翻译官，将源代码转换为webpack可执行的代码
px rem


不同屏幕分辨率的适配规则会不会讲
什么时候讲讲手写plugins
清晰易懂
哈哈
plugin手写其实没大意义，主要是要了解 tapable 了解插件注册机制，梳理下来就是整个webpack执行流程
是不是可以自己写个插件处理行内的px
老师，vue中有的组件想转换，有的不转换。例如后台系统里的大屏页面组件要转换，而普通的组件页面不转换，怎么做？
该发言可能违规，仅老师可见
动态渲染出来的dom中的style的可以处理吗
老师，vue中有的组件想转换，有的不转换。例如后台系统里的大屏页面组件要转换，而普通的组件页面不转换，怎么做？
该发言可能违规，仅老师可见
zce考勤满分，每次公开课都能看到你
你说我嘛,嘿嘿
哈哈
通过loader是不是能达到js改变css样式的目的
                                                                                        那这个this是闭包吗
loader和plugins有什么区别
执行时机的区别 2. 入参区别
老师，vue中有的组件想转换，有的不转换。例如后台系统里的大屏页面组件要转换，而普通的组件页面不转换，怎么做？
该发言可能违规，仅老师可见
今天讲不完不
时间过得好快
请问老师，vue中有的组件想转换，有的不转换。例如后台系统里的大屏页面组件要转换，而普通的组件页面不转换，怎么做？
该发言可能违规，仅老师可见
不同屏幕分辨率的适配规则会不会讲

不同屏幕分辨率的适配计算规则会不会讲
核心 如何写loader css语法树
老师浏览器这个插件，能展示手机的是啥插件
估计讲不完
会讲到几点
从0学webpack
王学通:从0学webpack


写移动端所有px都需要用rem吗
我记不住了
从零学webpack 从哪开始学呀
loader 和 loader 之间可以共享 ast 吗？还是每次都要转ast ？可以的
原理是不是 (px / 比例).toFixed(精度);
有如何发布npm包不
npm publish
多少钱
lerna publish
架构课是张老师和姜文老师一起讲？是一个架构课吗
loader 翻译转换代码  plugin则是在webpack整个执行过程中注册各种事件，在特定的时机执行特定的方法，来实现特定的需求，
是的
react17的源码有讲吗 课程
这得学多久啊
老师2020年的班级怎么升级到2021
这些能吃透，都专家了吧
这得学多久
终身学吧
老师这张图发一下呗！
极致:老师这张图发一下呗！


loader: 把非js代码转换成js代码，入参是source , 返回值是可以是任意内容，但是最左侧的loader 需要返回js代码片段。
 plugins：利用webpack内置对象上的上的钩子实现各种功能，包括转换代码，增加代码，删除代码，等等...
架构课会不会讲基础知识
牛逼
真吉尔累
老师显示iPhone用的什么插件
https://img.zhufengpeixun.com/ast-compiler-flow.jpg

才p6吗
不用插件，chrome自带的
409:不用插件，chrome自带的






字体大小用rem应该没关系吧？对视觉影响不大吧？
啥时候装的css库
409是最新的chorme吗？
怎么没声音了
有
不用最新chrome,
1px转rem,在手机可能看不到那条线，是不是会转化为小于1px，页面看不到？
require('css')咋来的
加个注释，再转化一下呢
css.parse  ???? css 哪来的
Json.stringfy后面那两个参数是啥啊意思
require('css')

直接正则替换会有问题吗
/px/
declarations[j]
/d+px$/
.3px
这种情况
第二个循环应该是j吧
如果有calc() pxRegExp能匹配上吗
应该取j吧
老师应该笔误了
取j，笔误了
厉害
processRules方法为啥写在那个方法内部
那如果不是75呢 如果是37.5
666
css.parse哪里来的
这波操作太6了，虽然俺也听不懂
该发言可能违规，仅老师可见
如果有，多层呢，不加个递归？
这也是在css库基础上做的，css这个库是不是类似babel
css模块主是类似于babel
这个支持less解析么
self用在哪里呀
实际项目里要改造loader就这样做就行是吗 新建一个文件夹文件webpack中引入就行 可以的
body的font-size没改
parseFloat(value.toFixed(8))
font-size 另一个插件改
这个replace能讲解下吗没太理解
parseFloat(val.toFixed(8))+'rem'
第一个_是啥参数啊
你可以看下正则的replace
_是匹配字符串
如果是 css3 平移 （750px） 你返回来只是 10rem 啊
这样不对啊
把平移去掉了
为啥保留八位数






老师正则是和ECMAScript一样是一套规范吗？是的
就是这么刚
老师正则是和JavaScript一样是有一套类似ECMAScript规范吗？
浏览器能解析的css数值范围是小数点后面多少位呀？为什么
resize不用节流吗 可以加 lodash
啊哈，为什么是除以10
没这么简单吧
这个 和 75啥关系？
这个 除10 还是 100 跟另一个插件 配置75有关吧 另一个插件写75 这边除10 写750 就得除100
人家的库写那么多，没这么简单吧？
一会走一下真正的源码
为什么要除以10
因为你写了75
如果75和设计稿没对上，就不对了吧？
750/10=75 375/10=37.5
其实是按比例算的，你的设计稿和实际显示大小的比值是相等的
那个10要根据单位算出来吗
remunit为37.5吗
设计稿宽度根实际手机屏幕宽度没关系啊
设置一个固定px要适配所有手机啊
为什么RemUnit是75
写CSS的时候  width:750px;
转换是按1rem=75来转换成的rem  750px => 10rem




老师，根节点是设置在body上还是html上？html上
rem不是固定的，是根据手机屏幕大小动态计算的
1rem=多少个像素是自动根据屏幕计算的
老师，我看你设置font-size在html上，库是设置在body上的
exclude
转过一次 没有变成rem吗  变成了rem后正则不是就不识别了吗
说的对
rem 是相对于根元素的单位，根元素font-size设置75px那么1rem=75px
设计750px 根元素font-size=75px 1rem=75px


presets有顺序之分吗
presets plugins
presets从上往下执行 plugins 从下往上执行
不应该是 -D？
适配成的px
第三方框架样式问题如果配置的是100，你配置的是75 ，这个如何兼容 把第三方的统一设成75l ?
-D 和 -S 有啥区别
苍狼别闹
他配置的100，但是他已经转换了啊，exclude不就行了吗 这是一种解决方法
这个你能不知道
如果-D,生产环境咋整
生产环境不需要
开发环境下才会用到
那些引入的包，到了生产环境还存在么
生产环境会重新执行install
Button加个名字
给button写点东西
width怎么为0
button里面没有写值
没有文字
但是-D的应该是不会下载的
没内容，没撑开？
button里面添点东西
button 没内容。。
没有加value
生产环境会安装package.json重新安装所依赖的包么
会
生产环境构建出的包只是根据webpack构建过程中依赖的包构建进去。不会参考package.json
那就是开发环境那些依赖随意安装了？
哦
可以用inlineloader
忽略掉
package.json里只是给程序员看的，实际构建不参考package,json
排除
加exclude
那就是根据node_modules重新安装呗
load函数里面判断一下？


 {
                test:/\.css$/,
                use:[
                    "style-loader",
                    "css-loader",
                    {
                        loader:px2rem2LoaderPath,
                        //1rem=设计稿为750px/10
                        options:{remUnit:75,remPrecision:8,exclude:/antd\.css/},
                        
                    }
                ]
            }




个配置 判断一下ast的selectors
老师刚才使用了exclude技术
6
真实
不解析node_modules文件夹中的ant中 css文件
如何处理jsx或者tsx里style样式中的px
自己再写个处理
源码fontSize为什么乘dpr
https://github.com/hnzycfcfed/styled-px2vw/blob/master/README-zh_CN.md
该发言可能违规，仅老师可见
五笔厉害了
添加libable的目的是什么
改变rem的值
默认情况
750px 宽度写的rem 1rem=75px
实际宽度 只有375px, 1rem=37.5
那如果是按需引入呢？
万一还有 element-ui.css呢
那岂不是要exclude好多
能引几个组件
exclude 位置错了
为什么别人的库写px就可以正常适配，我们就不行
可以直接用inlineloader 不经过 pxrem-loader 啊
一般第三方库都已经处理为px了，所以exclude node_module 就行了
如果你排除，那么 这个CSS就不会打包进来了
如果没有处理的可以使用include
antd  px适配怎么实现的
，
option里面的8啥意思 计算精度 保留几位小数
第三方库处理成px，怎么适配在移动端呢
amfe的为什么再次设置下字体，直接转换为rem不可以吗
给官方提pr
如果第三方根自己的适配规则不一样 那么显示效果岂不是差距很大
单独打包一些css
exclude逻辑再看下
666
666
不是会执行的吗
如果第三方跟自己的适配规则不一样那么显示效果岂不是差距很大      



第三方库不转rem，哪如何适配手机端dpr ?
帮
dpr是系统自带的参数吗
px2rem库，直接用正则把source里的px转为rem，不通过ast行吗
flexible官方现在不推荐使用了是啥原因 更推荐v
font-size 会转rem吗

px2rem-loader为啥在css-loader之前处理，css里面再@import其他css就有问题了吧
设置libable直接改变75不可以吗
6666
js文件内的css怎么办
xxx:js文件内的css怎么办

div.style.width = '100px';


inline-css-loader


设计稿是宽750px 屏幕宽度 也是750px
1vw=750/100=7.5px
如果说你有一图片在750px设计稿上75px
你的vw应该写多少？？？
75px/7.5=10vw


750px 1vw=7.5px 
750px  100vw




为什么现在不推荐rem了 vw vh
那如果元素宽度是30呢 难道要自己一点点计算吗
10
也就是所有的单位都用vw吗？
这感觉有点难算
我们早就用vw vh写移动端了 淘宝四年前就改了
vw 不同浏览器上还需要postcss 处理吗？兼容处理
是不是有vscode插件可以专门转化为vw，不然开发太费事了
vw兼容性怎么样
你们用vw写移动端，用啥库转的？
直接手写
你可以自己写个插件转换
那如果量的字体大小除不整  怎么取值呢
自己算好，直接width: 10vw ？
其实跟rem很像，区别在于换算的比例vw是自动根据viewport来的
老师，vw要设置根节点的font-size吗？不需林
vw不再需要了
和这个一样就好了，换算，保留几位小数
px2rem可以写的更动态点，根节点的换算方法暴露给用户自己写，这样稍微改一下就是px2vw了
loader地址写错了吧
type
代码里没改
vw
Type是rem
老师，vw不用改根节点的font-size吗？
vw是默认把屏幕100等分
px2vw.js计算的时候除以7.5，不是除以10
750px难道不是100vw吗
100vw
为啥除以10呢
options 应该输入设计稿宽度
哈哈哈 难怪我说为什么是10
老师辛苦了~
这就是postcss么
汤泽陶:这就是postcss么




学会了， rem直接抛弃
用vscode插件转感觉不太好吧？回头想调整也不知道视觉稿原来是啥，还是webpack插件转比较好吧？
谢谢老师
老师辛苦了
rem适配都是说的 “等比缩放” 这种方案吧？  这样的话pad和iPhone上面都是一模一样的界面，只不过等比放大了。    以及想听老师聊聊1px问题，究竟是不是个伪需求。
谢谢
字体大小也用vw?
老师辛苦了
辛苦
谢谢老师  辛苦了
文档有吗
老是辛苦
听完正式课的loader再来听这个就容易理解多了
多谢老张

&枫→岁月:

请问老师，chrome开发工具里手机模拟器用的是啥插件？
正式课能讲到词法解析 我们手写一个完整的babel
vw会等比缩放吗c
cra里已经 配置过
react17最近听说有热更新的功能，老师能讲一下这个怎么弄吗，没找到对应的文档。vite有插件可以实现，webpack不知道怎么配置
自带的就有的
为什么引入amfe 计算1rem应该等于多少个像不
老师2020班级不更新2021是不是新的课看不到 可以看
全都会啦
请问老师，chrome开发工具里手机模拟器用的是啥插件？
来波广告



webpack不是早就有热更新了嘛
React17 React-Fresh
还是不明白为啥引入amfe  px2rem不是自动把px转化为rem了吗
px rem
在不同的浏览下，1rem代表的px是不一样的
750px 75px
375   37.5px 
吸收率 最少98%
还是不明白为啥引入amfe  px2rem不是自动把px转化为rem了吗
不是说要越大屏幕不是要放大，而是要看的越多，rem是放大，vw也是放大吗
源码fontSize乘dpr，那不是dpr越大字体越大了
高度也是用vw来表示了吧  vw vh
fast refresh
老师辛苦了
先去学好高级课再来
老师总结一下，第三方引入css编译冲突，解决的几种方法
1. 改进插件，支持exclude  需要你自己实现这个loader
2. 针对antd.css单独配置loader 配二套
3. 使用行内loader 项目里有1000个CSS文件，写1000次

全都学会能拿多少k
还是不明白为啥引入amfepx2rem不是自动把px转化为rem了吗---------因为要给根元素设置font-sizea啊
全部学会就是算总包了不再是月薪了
这些都是张老师讲吗
我头很秃
这都学会了,估计得50+
学完我人都没了……
啥50
年薪
学完人还在，只是秃了
感觉还不止
我报名了 上了6节课了
人都没了...
50少了全都学透
太卷了
纯技术不太可能50，你要会管理才行
卷不动
报名往期训练营可以看吗
老师好，刚刚的源码找哪位客服要
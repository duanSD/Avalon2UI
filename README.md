
B2B
---
webpack 的工程构建 使用方法
0. node js 5.10.1 +++

1.npm install

2.node server

生产：
1.当时前目录运行webpack
2.运行node proxyServer

----------------------------------
初步目录说明：
```
+dist    //工程生成的生产目录也就是运行目录
    -css      //生成的样式目录
    -images    //图片目录
    -js       //生成的JS目录
    -view    //html目录
+src     //开发原码目录
    +css    //样式文件目录
        -common   //公用样式
        -lib    //样式库
        -model  //模块样式
    -images   //图片源目录
    +js   //js目录
        -lib  //依赖的甩的JS库或插件
        -useComponents  针对模块使用的非通用性组件
        -commponents   //组件源码目录 #这是组件的主要存放目录
        -model    //模块目录
        -util  //放置一些全局配置与静态方法
    +view 模块静态html存放目录
    

        
```
 
---------------------------------------

package.json里最终的声明依赖如下：

```javascript
"devDependencies": {
    "avalon2": "^2.0.6",
    "css-loader": "^0.23.1",
    "extract-text-webpack-plugin": "^1.0.1",
    "file-loader": "^0.8.5",
    "glob": "^7.0.3",
    "html-loader": "^0.4.3",
    "html-webpack-plugin": "^2.19.0",
    "less": "^2.7.1",
    "less-loader": "^2.2.3",
    "style-loader": "^0.13.1",
    "url-loader": "^0.5.7",
    "webpack": "^1.13.1",
    "webpack-dev-server": "^1.14.1"
  }
```


主体模块 可按需require

```
            main:'../lib/avalon/main',//avalon主体功能完整代码
            //avalon_test:'../../lib/avalon/avalon',
            avalon:'../lib/avalon/avalon', //纯avalon
            mmPromise:'../lib/avalon/mmPromise',  //列队模块
            mmHistory:'../lib/avalon/mmHistory',  //历史记录
            mmRequest:'../lib/avalon/mmRequest',  // 数据交互模块
            mmAnimate:'../lib/avalon/mmAnimate',   //动画模块
            mmRouter:'../lib/avalon/mmRouter',    //路由模块
            mmState:'../lib/avalon/mmState',     //路由模块 扩展
```
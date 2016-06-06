AVALON2 UI 组件大部分继oniui改造而成。也有部分是自有项目中整理出来。（基于bootstrap的avavlon2的组件）

-----

最新进展   添加了对bootstrap3的依赖。只使用UI组件部分。不会依赖JQ所以不使用它的所有插件。只导入LESS
添加以bootstrap主要是有很多前端兄弟希望avalonUI能免基本于这样式框架来实现。转换avlon1组件转avalon2过程中我顺便就把
它给整进来。确实oniui的外观不是很容易让人接受。

------

Avalon2 UI
--------------------------------
初步完成webpack 的工程构建 使用方法
0. node js 5.10.1

1.npm install

2.node server

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
        -commponents   //组件源码目录 #这是组件的主要存放目录
        -model    //模块目录
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


完整的源码示例前往<https://github.com/duanSD/Avalon2UI>。

<https://github.com/duanSD/Avalon2UI.git>


-------------------------------------
这是一个公开的工程 如果你有好的组件分享，也可以添加进来

现在组件在添加中..... 

有兴趣的可以一起，也可以使用这工程方式去开发各种项目，

这包相对前端来说比较智能。可省去很多架构时间。不仅限于avalon

个人对avalon一出生就跟踪到现在。比较喜欢司图正美的这个作品。

对国人来的使用相对于国外的框架有很多的优势，我不一一说明,

并且现在对 avalon支持的人也越来越多。

并于avalon2我己经在项目中使用了。

看它对原组件库存的支持问题。就想整理一份。

文档和组件会跟着进度一步步添加。


现在可用的组件列表：
-----------------
store  本地存储

validation 在avalon内置了验证这一块的功能  

mmrequest 请求插件

uptop  返回顶部

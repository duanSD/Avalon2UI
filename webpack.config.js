/**
 * Created by Administrator on 2016/5/30 0030.
 */
var path=require('path');
var glob=require('glob')
var webpack=require('webpack');
/*
 extract-text-webpack-plugin插件，
 有了它就可以将你的样式提取到单独的css文件里，
 妈妈再也不用担心样式会被打包到js文件里了。
 */
var ExtractTextPlugin = require('extract-text-webpack-plugin');
/*
 html-webpack-plugin插件，重中之重，webpack中生成HTML的插件，
 具体可以去这里查看https://www.npmjs.com/package/html-webpack-plugin
 */
var HtmlWebpackPlugin = require('html-webpack-plugin');

//提公用js
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

const debug = process.env.NODE_ENV !== 'production';

var entries = getEntry('src/js/model/**/*.js', 'src/js/model/');
var chunks = Object.keys(entries);

var config={
   /* entry: { //配置入口文件，有几个写几个
        index: './src/js/model/index.js',
        list: './src/js/model/list.js',
        about: './src/js/model/about.js'
    },*/
    entry:entries,
    output: {
        path: path.join(__dirname, 'dist'), //输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
        publicPath: '/dist/',               //模板、样式、脚本、图片等资源对应的server上的路径
        filename: 'js/[name].js',           //每个页面对应的主js的生成配置
        chunkFilename: 'js/[id].chunk.js?[chunkhash]'   //chunk生成的配置
    },

    module: {
        //加载器配置
        loaders: [//加载器，关于各个加载器的参数配置，可自行搜索之。
            {
                test: /\.css$/,
                //配置css的抽取器、加载器。'-loader'可以省去
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            }, {
                test: /\.less$/,
                //配置less的抽取器、加载器。中间!有必要解释一下，
                //根据从右到左的顺序依次调用less、css加载器，前一个的输出是后一个的输入
                //你也可以开发自己的loader哟。有关loader的写法可自行谷歌之。
                loader: ExtractTextPlugin.extract('css!less')
            }, {
                //html模板加载器，可以处理引用的静态资源，默认配置参数attrs=img:src，处理图片的src引用的资源
                //比如你配置，attrs=img:src img:data-src就可以一并处理data-src引用的资源了，就像下面这样
                test: /\.html$/,
                loader: "html?-minimize"    //避免压缩html,https://github.com/webpack/html-loader/issues/50
                //loader: "html?attrs=img:src img:data-src"
            }, {
                //文件加载器，处理文件静态资源
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=./fonts/[name].[ext]'
            }, {
                //图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
                //如下配置，将小于8192byte的图片转成base64码
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192&name=./images/[hash].[ext]'
            },
           { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
           {test: /\.(tpl|ejs)$/, loader: 'ejs'}
        ]
    },
    //插件
    plugins: [
        //使用ProvidePlugin加载使用频率高的模块 这里正常指加载node_modules里的模块。
        new webpack.ProvidePlugin({ //加载jq
          // avalon:'avalon2',
            //avalon:'avalon'
           $: 'jquery-compat'
        }),

        //提公用js到common.js文件中
        // new webpack.optimize.CommonsChunkPlugin('common.js'),
        /* new webpack.optimize.CommonsChunkPlugin({
         name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
         chunks: ['index','list','about'], //提取哪些模块共有的部分
         minChunks: 3 // 提取至少3个模块共有的部分
         }),*/

        new CommonsChunkPlugin({
            name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
            chunks: chunks,
            minChunks: chunks.length // 提取所有entry共同依赖的模块
        }),

        //将样式统一发布到.css文件中
        //将样式统一发布到style.css中
        /* new ExtractTextPlugin("style.css", {
         allChunks: true,
         disable: false
         }),*/
        new ExtractTextPlugin('css/[name].css'), //单独使用link标签加载css并设置路径，相对于output配置中的publickPath

        //HtmlWebpackPlugin，模板生成相关的配置，每个对于一个页面的配置，有几个写几个
      /*  new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
            favicon: './src/images/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
            filename: './view/index.html', //生成的html存放路径，相对于path
            template: './src/view/index.html', //html模板路径
            inject: 'body', //js插入的位置，true/'head'/'body'/false
            hash: true, //为静态资源生成hash值
            chunks: ['vendors', 'index'],//需要引入的chunk，不配置就会引入所有页面的资源
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }
        }),
        */
        debug ? function() {} : new UglifyJsPlugin({ //压缩代码
            compress: {
                warnings: false
            },
            except: ['$super', '$', 'exports', 'require','avalon'] //排除关键字
        }),


       new webpack.HotModuleReplacementPlugin() //热加载
    ],
    //其它解决方案配置
    resolve: {
        extensions: ['', '.js', '.json', '.less','.scss', '.ejs', '.png', '.jpg'],
        alias: {
            main:'../lib/avalon/main',//avalon主体功能完整代码
            //avalon_test:'../../lib/avalon/avalon',
            //avalon:'../lib/ava/avalon',//纯avalon
            mmPromise:'../lib/avalon/mmPromise',
            mmHistory:'../lib/avalon/mmHistory',
            mmRequest:'../lib/avalon/mmRequest',
            mmAnimate:'../lib/avalon/mmAnimate',
            mmRouter:'../lib/avalon/mmRouter',
            mmState:'../lib/avalon/mmState',
            //filter: path.join(__dirname, 'src/filters')
        }
    }
    //使用webpack-dev-server，提高开发效率
   /* ,devServer: {
        contentBase: './',
        host: 'localhost',
        port: 9090, //默认8080
        inline: true, //可以监控js变化
        hot: true //热启动
    }*/
}

var pages = Object.keys(getEntry('src/view/**/*.html', 'src/view/'));
pages.forEach(function(pathname){
    console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDpathname0:'+pathname);
    var conf={
        filename: './view/' + pathname + '.html', //生成的html存放路径，相对于path
        template: './src/view/' + pathname + '.html', //html模板路径 相对的路径
        inject: 'body'  //js插入的位置，true/'head'/'body'/false
        /*
         * 压缩这块，调用了html-minify，会导致压缩时候的很多html语法检查问题，
         * 如在html标签属性上使用{{...}}表达式，所以很多情况下并不需要在此配置压缩项，
         * 另外，UglifyJsPlugin会在压缩代码的时候连同html一起压缩。
         * 为避免压缩html，需要在html-loader上配置'html?-minimize'，见loaders中html-loader的配置。
         */
        // minify: { //压缩HTML文件
        //  removeComments: true, //移除HTML中的注释
        //  collapseWhitespace: false //删除空白符与换行符
        // }
        /*  new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
         favicon: './src/images/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
         filename: './view/index.html', //生成的html存放路径，相对于path
         template: './src/view/index.html', //html模板路径
         inject: 'body', //js插入的位置，true/'head'/'body'/false
         hash: true, //为静态资源生成hash值
         chunks: ['vendors', 'index'],//需要引入的chunk，不配置就会引入所有页面的资源
         minify: { //压缩HTML文件
         removeComments: true, //移除HTML中的注释
         collapseWhitespace: false //删除空白符与换行符
         }
         }),
         */

    }
    if(pathname in config.entry){
        conf.favicon = 'src/images/favicon.ico';
        conf.inject = 'body';
        conf.chunks = ['vendors', pathname];
        conf.hash = true;
    }
    config.plugins.push(new HtmlWebpackPlugin(conf));
});

module.exports=config;

function getEntry(globPath, pathDir) {
    var files = glob.sync(globPath);
    var entries = {},
        entry, dirname, basename, pathname, extname;
    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.join(dirname, basename);
        pathname = pathDir ? entry.replace(new RegExp('^' + pathDir), '').split('.')[0] : entry;
        //pathname = pathDir ? pathname.replace(new RegExp('^' + pathDir), '') : pathname;
        //pathname = pathDir ? basename: pathname;
        entries[pathname] = ['./' + entry];

    }
    for(n in entries){
        console.log('DDDDDDD-'+n+':'+entries[n]);
    }
    return entries;
}
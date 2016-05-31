/**
 * Created by Administrator on 2016/5/25 0025.
 */
'use strict'
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');
// 配置代码自动编译和热替换插件
config.entry.unshift('webpack-dev-server/client?http://localhost:9090', "webpack/hot/dev-server");
config.plugins.push(new webpack.HotModuleReplacementPlugin());
// 这里配置：请求http://localhost:9090/index.php，
// 相当于通过本地node服务代理请求到了http://testapi.uhouzz.com/index.php
var proxy = [{
    path: "/index.php/*",
    target: "http://pc.uhouzz.com",
    host: "pc.uhouzz.com"
}]
//启动服务
var app = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot:true,
    historyApiFallback: true,
    proxy:proxy
});
app.listen(9090);
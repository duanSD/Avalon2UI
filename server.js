/**
 * Created by Administrator on 2016/5/25 0025.
 */
var fs=require('fs');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');

var serverPort=54999,
    devPort=8088;

var exec=require('child_process').exec;
var comdStr='PORT='+serverPort+' supervisor ./dist/view'
exec(comdStr);

// 配置代码自动编译和热替换插件
/*config.entry.unshift('webpack-dev-server/client?http://localhost:9090', "webpack/hot/dev-server");
config.plugins.push(new webpack.HotModuleReplacementPlugin());*/
for (var i in config.entry) {
    config.entry[i].unshift('webpack-dev-server/client?http://localhost:' + devPort, "webpack/hot/dev-server")
}
config.plugins.push(new webpack.HotModuleReplacementPlugin());//热加载

// 这里配置：请求http://localhost:9090/index.php，
// 相当于通过本地node服务代理请求到了http://testapi.uhouzz.com/index.php
/*var proxy = [{
    path: "/index.php/!*",
    target: "http://pc.uhouzz.com",
    host: "pc.uhouzz.com"
}]*/
var proxy = {
    "*": "http://localhost:" + serverPort
};

//启动服务
var app = new WebpackDevServer(webpack(config), {
    publicPath:config.output.publicPath,
    hot:true
    //historyApiFallback: true
   //proxy:proxy
});

app.listen(devPort, function() {
    console.log('dev server on http://localhost:' + devPort+'\n');
});

fs.watch('./src/view/', function() {
    exec('webpack --progress --hide-modules', function(err, stdout, stderr) {
        if (err) {
            console.log(stderr);
        } else {
            console.log(stdout);
        }
    });
});

//app.listen(9090);
/**
 * Created by Administrator on 2016/5/25 0025.
 */
var proxy = require('express-http-proxy');
var express=require('express');
var app = express();
var fs=require('fs');
//var webpack = require('webpack');
//var WebpackDevServer = require('webpack-dev-server');
//var config = require('./webpack.config.js');
var proxyConfig=require('./proxyConfig.js');
var JSON=require('JSON')

var serverPort=54999,
    devPort=58084;

var exec=require('child_process').exec;
/*var comdStr='PORT='+serverPort+' supervisor ./dist/view'
exec(comdStr);*/

// 配置代码自动编译和热替换插件
/*config.entry.unshift('webpack-dev-server/client?http://localhost:9090', "webpack/hot/dev-server");
config.plugins.push(new webpack.HotModuleReplacementPlugin());*/
/*for (var i in config.entry) {
    config.entry[i].unshift('webpack-dev-server/client?http://localhost:' + devPort, "webpack/hot/dev-server")
}
config.plugins.push(new webpack.HotModuleReplacementPlugin());//热加载*/

// 这里配置：请求http://localhost:9090/index.php，
// 相当于通过本地node服务代理请求到了http://testapi.uhouzz.com/index.php
/*var proxy = [{
 path: "/index.php/!*",
 target: "http://pc.uhouzz.com",
 host: "pc.uhouzz.com"
 }]*/
/*var proxy=[];
var hostType='test'
for(i in proxyconfig[hostType]){
    proxy.push({
        path:i
        ,target:'http://'+proxyconfig[hostType][i]
        ,host:proxyconfig[hostType][i]
    })
}*/
/*var proxy = {
    "*": "http://localhost:" + serverPort
}*/;

//启动服务
/*var app = new WebpackDevServer(webpack(config), {
    publicPath:config.output.publicPath,
    hot:true
    ,contentBase:'./dist'
    /!*    historyApiFallback: true,
     proxy:proxy*!/
});*/
/*
//用于查看请求参数
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '1mb'}));  //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
    extended: true
}));
*/

var logger = require('./log').logger;
var logUse=require('./log').use;
//logger.debug("collectTime=%s",collectTime);
logUse(app);


var hostType='test'
for(i in proxyConfig[hostType]){
    uerProxy(i,proxyConfig[hostType][i]);
}


function uerProxy(target,host){
    app.use(target, proxy(host, {
        /* filter: function(req, res) {
         return req.method == req.method;
         },*/
        forwardPath: function(reqOpt, res) {
            if(target!='/hoststro'&&target!='/fileService'){
                reqOpt.headers['Content-Type'] = 'application/json';
            }
			delete reqOpt.headers.host;
            //console.log('res:',res);
            //logger.debug("reqUrl=%s",host+reqOpt.url);
            console.log('reqUrl:',host+reqOpt.url);
            return require('url').parse(reqOpt.url).path;
        }
        ,intercept: function(rsp, data, req, res, callback) {
            // rsp - original response from the target
            if(rsp.headers['Content-Type'] == 'application/json'){
                console.log(data);
                data = JSON.parse(data.toString('utf8'));
                callback(null, JSON.stringify(data));
            }else{
                callback(null, data);
            }
        }
        /* ,decorateRequest: function(reqOpt, req) {
         /!*  reqOpt.headers['Content-Type'] = '';
         reqOpt.method = 'GET';*!/
         // reqOpt.bodyContent = wrap(req.bodyContent);
         return reqOpt;
         }*/
        ,reqBodyEncoding: null
        ,preserveHostHdr: true
        ,limit:'5mb'
    }));
}
/*app.listen(devPort, function() {
    console.log('dev server on http://localhost:' + devPort+'\n');
});*/
app.use(express.static(__dirname+ '/dist'));
console.log(__dirname + '/dist');
app.listen(devPort);

/*fs.watch('./src/view/', function() {
    exec('webpack --progress --hide-modules', function(err, stdout, stderr) {
        if (err) {
            //console.log(stderr);
            console.log('写入生产文件出错！')
        } else {
            //console.log(stdout);
            console.log('写入生产文件成功！')
        }
    });
});*/

//app.listen(9090);
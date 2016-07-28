var proxy = require('express-http-proxy');
var proxyConfig=require('./proxyConfig.js');
var devPort=6090;
var express=require('express');
var app = express();
var hostType='test'
for(i in proxyConfig[hostType]){
    uerProxy(i,proxyConfig[hostType][i]);
}
function uerProxy(target,host){
    app.use(target, proxy(host, {
        forwardPath: function(reqOpt, res) {
            if(target!='/hoststro'&&target!='/fileService'){
                console.log('test')
                reqOpt.headers['Content-Type'] = 'application/json';
            }
            //console.log('res:',res);
            console.log('reqUrl:',host+reqOpt.url);
            return require('url').parse(reqOpt.url).path;
        }
       /* ,intercept: function(rsp, data, req, res, callback) {
            // rsp - original response from the target
            console.log(data);
            data = JSON.parse(data.toString('utf8'));
            callback(null, JSON.stringify(data));
        }*/
        ,reqBodyEncoding: null
        //,preserveHostHdr: true
    }));
}
app.use(express.static(__dirname+ '/'));
console.log(__dirname + '/');
app.listen(devPort);

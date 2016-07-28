/**
 * Created by Administrator on 2016/7/22.
 */
var log4js = require('log4js');

log4js.configure({

    appenders: [
        {
            type: 'console',
            category: "console"

        }, //控制台输出
        {
            type: "file",
            filename: 'logs/log.log',
            pattern: "_yyyy-MM-dd",
            maxLogSize: 1024*1024,
            backups: 10,
            category: 'dateFileLog'

        }//日期文件格式
    ],
    replaceConsole: true,   //替换console.log
    levels:{
        dateFileLog: 'debug',
        console: 'debug'
    }
});


var dateFileLog = log4js.getLogger('dateFileLog');
var consoleLog = log4js.getLogger('console');
exports.logger = dateFileLog;


exports.use = function(app) {
    app.use(log4js.connectLogger(dateFileLog, {level:'INFO'}));
}
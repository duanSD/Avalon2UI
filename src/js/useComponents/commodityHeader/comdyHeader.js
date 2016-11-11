require("../../components/store/avalon.store.js");
var config=require("_/tzbConfig")
var tmpl = require('./comdyHeader.html')
avalon.component('ms-comdyHeader', {
    template: tmpl,
    defaults: {
        userName:avalon.store.get('userInfor')['userName'],
        selectNav:1,
        role:avalon.store.get('userInfor')['role'],
        navClick:function(n) {
            var arr = [, 'selling.html', 'warehouse2.html', 'warehouse.html','recover.html','onekey.html'];
            !!arr[n]&&(location.href =arr[n])
        }
    }
})
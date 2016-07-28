/**
 * Created by Administrator on 2016/6/12.
 */
require("../../components/store/avalon.store");
var config=require("../../lib/units/b2bconfig")
var tmpl = require('./header.html')
avalon.component('ms-header', {
    template: tmpl,
    defaults: {
        userName:avalon.store.get('userInfor')['userName'],
        selectNav:0,
        logout:function(){
            //退出操作
            avalon.ajax({
                url:'/ssoService/loginOut?userID='+avalon.store.get('userInfor')['userID'],
                type: 'post',
                cache: true,
                contentType: "application/json"
            }).done(function(ret) {
                if (ret.data == 1 || ret.data == 2) {
                    avalon.store.clear();
                    location.href='account/login.html';
                }else if(ret.data == 0){

                }
            }).fail(function() {

            })
        }
    }
})
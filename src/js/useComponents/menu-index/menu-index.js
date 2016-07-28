/**
 * Created by Administrator on 2016/7/26.
 */
/**
 * Created by Administrator on 2016/6/12.
 */
require("../../components/store/avalon.store");
var config=require("../../lib/units/b2bconfig")
var tmpl = require('./menu-index.html')
avalon.component('ms-menu-index', {
    template: tmpl,
    defaults: {
        userName:avalon.store.get('userInfor')['userName'],
        selectNav:'index',
        outlogin:function(){
            //退出操作
            avalon.ajax({
                url:'/ssoService/loginOut?userID='+avalon.store.get('userInfor')['userID'],
                type: 'post',
                cache: true,
                contentType: "application/json"
            }).done(function(ret) {
                if (ret.data == 1 || ret.data == 2) {
                    avalon.store.clear();
                    location.href='login.html';
                }else if(ret.data == 0){

                }
            }).fail(function() {

            })
        },
        //进入我的金中国
        adminlink:function(){
            location.href='index.html';
        },
        link:function(type){
            var url='houtaishouye.html'
            switch (type){
                case 'index':
                    url='houtaishouye.html'
                    break;
                case 'index':
                    break;
                case 'index':
                    break;
                case 'zhgl':
                    url='jibenxinxi.html';
                    break;
                case 'index':
                    break;
                case 'index':
                    break;
            }
            //this.selectType=type
            location.href=url;
        }
    }
})
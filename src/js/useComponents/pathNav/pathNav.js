
require("../../components/store/avalon.store.js");
var config=require("_/comConfig")
var tmpl = require('./pathNav.html')
var menuRight=top.avalon.vmodels.menuRight;
avalon.component('ms-pathNav', {
    template: tmpl,
    defaults: {
        navList:[
            /*{
                title:'资源管理'
                ,url:''
                ,active:false //选中状态
            }*/
        ]
        ,refresh:avalon.noop
        ,refreshClick:function(){
            //点刷新按钮时的处量方法 默认为reload
            if(this.refresh!=avalon.noop){
                this.refresh();
            }else{
                location.reload()
            }
        }
        ,navClick:function(el){
            if(!el.url) return;
            menuRight.addTabNav({title:el.title,url:el.url});
        }
    }
})
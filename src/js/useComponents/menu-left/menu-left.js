require("../../components/store/avalon.store.js");
var config=require("_/comConfig")
var tmpl = require('./menu-left.html')
avalon.component('ms-menu-left', {
    template: tmpl,
    defaults: {
        navList:[{
            //j默认值 登录进来时的页面，也默认的左则导航列表
            toggle:true
            ,title:'首页'
            ,list: [
                {title:'首页',url: 'main/index.html',type:true}
            ]
        }]
        ,clickNav:function(els,list){
            var vm=this,isAt=0;
            avalon.each(list,function(i,e){
                e.type=false;
            })
            els.type=true;
            var menuRight=avalon.vmodels['menuRight'];
            menuRight.addTabNav({
                url:els.url,
                title:els.title
            });
        }
        ,listSHFun:function(el){
            //显示隐藏二级菜单列表
            el.toggle=!el.toggle;
        }
        ,initFun:function(){
            //导入模块列表时初始打开的页面
            var _self=this;
            var nav=this.navList[0].list[0]; //第一个为默认打开的页面
            var menuRight=avalon.vmodels['menuRight'];
            menuRight.addTabNav({
                //j默认值 登录进来时的页面
                url:nav.url,
                title:nav.title
            });
        }
  /*      ,onInit:function(){

        }
        ,onReady:function(){

        }*/
    }
})
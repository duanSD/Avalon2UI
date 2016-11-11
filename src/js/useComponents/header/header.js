/**
 * Created by Administrator on 2016/6/12.
 */
require("../../components/store/avalon.store");
var config=require("_/comConfig")
var tmpl = require('./header.html')
//var userInfor=avalon.store.get('userInfor');//当前用户信息
avalon.component('ms-header', {
    template: tmpl,
    defaults: {
        navUrlList:['',[{
            toggle:true
            ,title:'首页'
            ,list: [
                //数组的第一个元系为默认打开的页面
                {title:'首页',url: 'main/index.html',type:true}
            ]
        }],[{
                toggle:true
                ,title:'直播管理'
                ,list: [
                    {title:'直播监控',url: 'zhibo/jiankong.html',type:true}
                    , {title:'课程列表',url: 'zhibo/kecheng-liebiao.html',type:false}
                  /*  , {title:'课程明细',url: 'zhibo/kecheng-mingxi.html',type:false}*/
                    , {title:'故障列表',url: 'zhibo/guzhang-liebiao.html',type:false}
               /* , {title:'故障明细',url: 'zhibo/guzhang-mingxi.html',type:false}*/
                ]
            }
            ],[{
            toggle:true
            ,title:'资源管理'
            ,list: [
                {title:'设备列表',url: 'sebei/sebei-liebiao.html',type:true}
              /*  , {title:'设备明细',url: 'sebei/sebei-mingxi.html',type:false}*/
                , {title:'机架列表',url: 'sebei/jijia-liebiao.html',type:false}
            /*    , {title:'机架明细',url: 'sebei/jijia-mingxi.html',type:false}*/
            ]
        }
        ],[{
            toggle:true
            ,title:'系统设置'
            ,list: [
                {title:'系统设置',url: 'sezhi/xitong-sezhi.html',type:true}
            ]
        }],[{
            toggle:true
            ,title:'公共'
            ,list: [
                {title:'公共',url: 'gonggong/gonggong.html',type:true}
            ]
        }]]
        ,dlhover:'dl-hover'
        ,selectNum:1
        ,navCallback:avalon.noop
        ,navClickFun:function(i){
            this.selectNum=i;
            this.navCallback(this.navUrlList[i]);
        }
    }
})

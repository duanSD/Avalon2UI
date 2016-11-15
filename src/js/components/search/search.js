require('./search.less');
var tpl=require('./search.html')
var vm=avalon.component('ms-search', {
    template: tpl,
    defaults: {
      title:'搜索' //如果title为''时不显示
        ,searchVal:'' //这是搜索框的值
        ,isSub:false //是否显示提交按钮
        ,searchFun:avalon.loop
    }
});
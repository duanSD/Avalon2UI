/**
 * Created by Administrator on 2016/9/21.
 * 特说明。这组件不能被ms-if形式的隐藏。不然无法实现效果
 */

require('./datepicker.less');
var config=require("_/comConfig")
var laydate=require('./laydate.dev');
var tmpl = require('./datepicker.html');
avalon.component('ms-datepicker', {
    template: tmpl,
    defaults: {
        class:''
        ,width:''
        ,height:'34px'
        ,thisId:config.uuid()
        ,dateValue:new Date()-0 //初始时间
        ,dateFormatVal:''//输入框中的时间
        ,dateConf:{}//用于使用组件时配置objconf对象的属性
        ,objconf:{ //组件内部使用对象，要组件配置中不能改变些对象的值
            elem:'',
            format: 'YYYY-MM-DD hh:mm:ss', //日期格式 YYYY-MM-DD hh:mm:ss  'YYYY年MM月DD日'等
            /*min: laydate.now(), //设定最小日期为当前日期
            max: '2099-06-16', //最大日期*/
            min: '1900-01-01 00:00:00', //最小日期
            max: '2099-12-31 23:59:59', //最大日期
            istime: true, //是否显示时间
            festival: true, //显示节日
            istoday: false,
            choose: function(datas){ //选择日期后的回调
                /* end.min = datas; //开始日选好后，重置结束日的最小日期
                 end.start = datas //将结束日的初始值设定为开始日*/
            }
        }
        ,onInit: function () {
            avalon.mix(this.objconf,this.dateConf);
            this.thisId=config.uuid();
            console.log('onInit')
        },
        onReady:function () {
            this.$element.childNodes[0].id=this.thisId;//解决同是调用多个组件时的ID跟随变化
            this.objconf.elem='#'+this.thisId;
            laydate(this.objconf.$model);

            //处理初始显示时间的控制。监察值的变化与输入框值的控制
            this.$watch('dateValue',function(n,o){
                this.dateFormatVal=n!=''?laydate.now(this.dateValue,this.objconf.format):'';
            })
            this.dateFormatVal=this.dateValue!=''?laydate.now(this.dateValue,this.objconf.format):'';
            console.log('onReady')
        },
        onViewChange: function () {
            console.log('onViewChange')
        },
        onDispose: function () {
            console.log('onDispose')
        },
    }
});
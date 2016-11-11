/**
 * Created by Administrator on 2016/6/12.
 */
require('./dialog.css');
var tmpl = require('./dialog.html');
avalon.component('ms-dialog', {
    template: tmpl,
    defaults: {
        body:'',
        height:'250px',
        width:'500px',
        zIndex:new Date()-0,
        tgle:false,
        //弹出层显示按钮类型1这双按钮模式。2为单按钮 可配置按钮文字
        buttonType:1,
        buttonValue:'确定'

        //最上层的head的title
        ,headTitle:''

        //是否显示整个title块
        ,titlebool:true
        //弹出层的标题选择。分为三种:0(默认值)不显示title,1为成功类型，2为提示类型，3为错误类型
        ,titleType:0
        ,titleCon:'Dialog title'

        //确定按钮的回调函数
        ,submitCallback:null
        ,atThisInit: function () {
            this.buttonType=1;
            this.titleType=0;
            this.buttonValue='确定';
            this.titleCon='Dialog title';
            this.submitCallback=null;
        }
        ,onInit: function () {
            console.log('onInit')
        },
        onReady: function () {
            console.log('onReady')
        },
        onViewChange: function () {
            console.log('onViewChange')
        },
        onDispose: function () {
            console.log('onDispose')
        },
        close:function(){
            this.tgle=false;
            this.atThisInit();
        },
        open:function(obj){
            if(!!obj) {
                this.buttonType = obj.buttonType || 1;
                this.titleType = obj.titleType || 0;
                this.buttonValue = obj.buttonValue || '确定';
                this.titleCon = obj.titleCon || 'Dialog title';
                this.headTitle = obj.headTitle || '';
                this.submitCallback = obj.submitCallback || null;
            }
            this.tgle=true;
        }
        ,submitOk:function(){
            if(this.submitCallback){
                this.submitCallback();
            }else{
                this.close();
            }
        }
    }
    ,soleSlot: 'body'
})
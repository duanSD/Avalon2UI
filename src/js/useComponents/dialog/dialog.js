/**
 * Created by Administrator on 2016/6/12.
 */
var tmpl = require('./dialog.html')
avalon.component('ms-dialog', {
    template: tmpl,
    defaults: {
        title:'验证手机',
        body:'',
        maskHeight:'100%',//avalon(document).height()
        maskWidth:'100%',
        toggle:false,
        onInit: function () {
            console.log('onInit')
        },
        onReady: function () {
            this.maskHeight=avalon(document).height();
            this.maskWidth=avalon(document).width();
            console.log('onReady')
        },
        onViewChange: function () {
            console.log('onViewChange')
        },
        onDispose: function () {
            console.log('onDispose')
        },
        close:function(){
            this.toggle=false;
        },
        open:function(tlp){
            this.toggle=true;
            this.temlp=tlp;
        }
    }
    ,soleSlot: 'body'
})
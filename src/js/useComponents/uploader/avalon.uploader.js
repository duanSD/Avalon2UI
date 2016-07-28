/**
 * Created by Administrator on 2016/7/18.
 */
var config=require("../../lib/units/b2bconfig")
var style = require('./avalon.uploader.css')
var tmpl = require('./avalon.uploader.html')
avalon.component('ms-uploader', {
    template: tmpl,
    defaults: {
       /* upId:'',//定义表单ID,必填参数，
        title:'',//提示标题
        content:'',
        upUrl:'/fileService/file', //上传URL
        done:avalon.noop,//上传完成回调
        imgscon:'',
        imgID:'',
        //completeImg:'',//上传图片服务端路径
        fileChange:function(){
            this.upForm=document.getElementById(this.upId);
            //this.upinput=document.getElementById(this.upInputId);
            this.upForm[0].click();
        },
        fileName:'',
        //两个节点
        upinput:null,
        upForm:null,
        newObjID:'',
        onSelectChange:function(){
            var vm=this;
            vm.upForm=document.getElementById(this.upId);
            var formData=new FormData(vm.upForm.$model);
            formData.append(vm.upForm[0].name, vm.upForm[0].files[0])
            // formData.append(vm.upForm[0].name, vm.upForm[0].value);
            avalon.ajax({
                contentType: "multipart/form-data",
                form: formData, //这是一个formData 对象,详看这里https://developer.mozilla.org/zh-CN/docs/Web/Guide/Using_FormData_Objects
                type: "post", //get也可以
                url: vm.upUrl,
                //success: callback,
                dataType: 'json' //你想返回什么类型的数据给你
            }).done(function(ret) {
                if(ret['fileName']){
                    document.getElementById(vm.imgID).src='/fileService/file/'+ret['fileName'];
                }
                vm.done&&vm.done(ret);
            }).fail(function() {
                avalon.log( '服务异常，请重试');
            })
        },*/
      /*  onInit: function () {
            this.imgID='img'+config.uuid();
            this.upId=config.uuid();
        },
        onReady: function () {

        },
        onViewChange: function () {
            console.log('onViewChange')
        },
        onDispose: function () {
            console.log('onDispose')
        }*/
    }
})
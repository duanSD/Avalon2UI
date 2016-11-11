/**
 * Created by Administrator on 2016/7/18.
 */
var config = require("../../lib/units/comConfig")
var style = require('./avalon.uploader.css')
var tmpl = require('./avalon.uploader.html')
require("../../components/browser/avalon.browser");
//var upForm=upfileInput=iframeLoad=upfileIframeBox=null; //上传表单的两个元素。form 与file input  响应数据的iframe
var vm=avalon.component('ms-uploader', {
    template: tmpl,
    defaults: {
        num: 5 //允许最多上传的图片张数，最少为1
        ,TipCon:'<span>建议尺寸：<b>900*900</b>像素，仅支持<b>png，jpg</b>和<b>gif</b>格式，文件大小不要超过<b>2M</b>；默认<b>第一张未商品主图</b>，可以<b>拖曳图片调整顺序</b>。</span>'//提示内容
        ,browserIE:avalon.browser.ie
        ,upfileObj:[]//缓存己经上传的文件列表 master:true,src:'',id:''
        ,fileType:'file'//上传文件参数
        ,upfileUrl:'/fileService/file'//上传url
        ,upfilePath:'/fileService/file/'//加载图片使用的目录
        //,upForm:null //表单dom
        ,upFormId:'' //表单ID
        ,editView:false //控制编辑操作的显示或隐藏
        ,thisUuId:'' //用于缓存当前所操作 更改 的图片ID
        ,thisID:config.uuid() // 用于标识这个上传组件的独立性
       // ,thisIframeBoxID:config.uuid()
        ,upfileInputID:config.uuid()

        //上传表单的两个元素。form 与file input  响应数据的iframe
         ,$upForm:null
        ,$upfileInput:null
        ,$iframeLoad :null
        //,upfileIframeBox:null
        ,onmouseover:function(){
            this.editView=true;
        }
        ,onmouseleave:function(){
            this.editView=false;
        }
        ,setmaster:function(el){
            var vm=this;
            avalon.each(vm.upfileObj,function(i,e){
                e.master=false;
            });
            el.master=true;
        }
        ,editImg:function(el){
            this.thisUuId=el.id;
            this.$upfileInput.click();
        }
        ,delImg:function(el){
            avalon.Array.remove(this.upfileObj,el);
        }
        ,onInit: function () {
            //this.initUploadBtn();
            this.upFormId=config.uuid();
            this.thisID=config.uuid(); // 用于标识这个上传组件的独立性
           // this.thisIframeBoxID=config.uuid();
            this.upfileInputID=config.uuid() ;
        },
        onReady: function () {
            var vm=this;
            //var upfileIframeBox=vm.$element.childNodes[2];
            var iframe=document.createElement('iframe');
            avalon.bind(iframe,'load',function(e){
                var iframe=e.target;
                var iframeDoc = (iframe.contentDocument || iframe.contentWindow.document);
                var iframeBody = iframeDoc.body;
                var wrapper = iframeDoc.createElement('div');
                var btnStyle = 'display:block;width:0px;height:0px;overflow:hidden;border:0;margin:0;padding:0;position:absolute;top:0;left:0;filter:alpha(opacity=0);-moz-opacity:0;-khtml-opacity: 0;opacity: 0;cursor:pointer;';

                wrapper.innerHTML='<form style="display:block;width:100%;height:100%;overflow:hidden;border:0;margin:0;padding:0;position:absolute;top:0;left:0;filter:alpha(opacity=0);-moz-opacity:0;-khtml-opacity: 0;opacity: 0;cursor:pointer;" id="'+
                    vm.upFormId+'" action="'+vm.upfileUrl+'"  method="POST" enctype="multipart/form-data" target="'+vm.thisID+'">'+
                    '<input id="'+vm.upfileInputID+'" type="file" name="'+vm.fileType+'"  multiple="" style="width: 100%;height: 100%">'+
                    '</form>'+
                    '<iframe id="'+vm.thisID+'" name="'+vm.thisID+'" style="display:none;width:0;height:0;border:0;margin:0;padding:0;position:absolute;"></iframe>';
                iframeBody.style.cssText = btnStyle;
                iframeBody.style.width =  '0px';
                iframeBody.style.height = '0px';
                iframeBody.appendChild(wrapper);
                vm.$upForm = iframeDoc.getElementById(vm.upFormId);
                vm.$upfileInput = iframeDoc.getElementById(vm.upfileInputID);
                vm.$iframeLoad = iframeDoc.getElementById(vm.thisID);
                if (vm.$upfileInput.addEventListener) {
                    vm.$upfileInput.addEventListener("change", changeCallback, false);
                }
                else {
                    avalon.bind(vm.$upfileInput,"change", changeCallback);
                }
                function changeCallback(e){
                    //暂时只支持一次只支持选一张图片
                    //upForm=document.getElementById(this.upFormId);
                    if(!!vm.browserIE&&vm.browserIE<10){
                        function callback(e){
                            var iframe=e.target;
                            //var upForm=document.getElementById(vm.upFormId);
                            try {
                                var link, json, loader,
                                    body = (iframe.contentDocument || iframe.contentWindow.document).body,
                                    result = body.innerText || body.textContent || '';
                                json = (new Function("return " + result))();
                                if (json && json.fileName) {
                                    if(vm.thisUuId!=''){
                                        avalon.each(vm.upfileObj,function(i,e){
                                            if(vm.thisUuId==e.id){
                                                e.src=json['fileName'];
                                            }
                                        })
                                    }else{
                                        var len=vm.upfileObj.length;
                                        vm.upfileObj.push({master:len==0?true:false,src:json.fileName,id:config.uuid()});
                                    }
                                } else {
                                    //showErrorLoader && showErrorLoader(json.state);
                                }
                                vm.thisUuId='';
                            } catch (er) {
                                vm.thisUuId='';
                                //showErrorLoader && showErrorLoader(me.getLang('upimg.loadError'));
                            }
                            vm.$upForm.reset();
                            avalon.unbind(vm.$iframeLoad, 'load', callback);
                        }
                        avalon.bind(vm.$iframeLoad, 'load', callback);
                        vm.$upForm.action = vm.upfileUrl;
                        vm.$upForm.submit();
                    }else{
                        var formData=new FormData(vm.$upForm);
                        formData.append(vm.$upForm[0].name, vm.$upForm[0].files[0]);
                        // formData.append(vm.$upForm[0].name, vm.$upForm[0].value);
                        avalon.ajax({
                            contentType: "multipart/form-data",
                            form: formData, //这是一个formData 对象,详看这里https://developer.mozilla.org/zh-CN/docs/Web/Guide/Using_FormData_Objects
                            type: "post", //get也可以
                            url: vm.upfileUrl,
                            //success: callback,
                            dataType: 'json' //你想返回什么类型的数据给你
                        }).done(function(ret) {
                            if(ret['fileName']){
                                if(vm.thisUuId!=''){
                                    avalon.each(vm.upfileObj,function(i,e){
                                        if(vm.thisUuId==e.id){
                                            e.src=ret['fileName'];
                                        }
                                    })
                                }else{
                                    var len=vm.upfileObj.length;
                                    vm.upfileObj.push({master:len==0?true:false,src:ret.fileName,id:config.uuid()});
                                }
                                //document.getElementById(vm.imgID).src='/fileService/file/'+ret['fileName'];
                            }
                            vm.thisUuId='';
                            //vm.done&&vm.done(ret);
                        }).fail(function() {
                            vm.thisUuId='';
                            avalon.log( '服务异常，请重试');
                        })
                    }
                };
                //avalon(upfileInput).bind('change',vm.onSelectChange);
            });
            vm.$element.childNodes[2].appendChild(iframe);
            //upfileInput.addEventListener('change',vm.onSelectChange);
        },
        onViewChange: function () {
            console.log('onViewChange')
        },
        onDispose: function () {
            console.log('onDispose')
        }
        ,upfileAdd:function(){
            this.$upfileInput.click();
        }
    }
  // ,soleSlot: 'TipCon'
});
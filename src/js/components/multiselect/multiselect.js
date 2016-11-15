require('./multiselect.less')
var tmpl = require('./multiselect.html')
//var userInfor=avalon.store.get('userInfor');//当前用户信息
avalon.component('ms-multiselect', {
    template: tmpl,
    defaults: {
        //配置的数据格式
        //操作运算的对象
        list_data:[
            /*{
                key:'HTC'
                ,val:'HTC'
                ,selected:true //是否选中
                ,show:1 //是否显示在列表
            }
            ,{
                key:'Oculas'
                ,val:'Oculas'
                ,selected:false
                ,show:1
            }*/
        ]
        //当选择组件发生变化时的回调 参数为最新的选择数据的数组
        ,dataCallback:avalon.noop

        //缓存最新选中的数据列表 输出使用
       /* ,selected_data:[]*/


        /*控制显示隐藏下拦框*/
        ,isShowDown:false
        ,DrapdownFun:function(){
            this.isShowDown=!this.isShowDown
            this.tagInput=''
            avalon.each(this.list_data,function(i,el){
                el.show=1
            })
        }
        //选中取消元素方法
        ,selectItem:function(el){
            el.selected=!el.selected;
            //计算选中的个数
            this.selectedFun()
        }
        //关掉去除一个选中元素
        ,closeItem:function(el){
            el.selected=false;
            //计算选中的个数
            this.selectedFun()
        }
        //点击回退键时去除选中的元素
        ,keyupDel:function(e){
            var vm=this;
            if(e.type=='keyup'&&e.keyCode==8){
                avalon.each(this.list_data.reverse(),function(i,e){
                    if(e.selected){
                        e.selected=false;
                        return false
                    }
                })
                this.list_data.reverse()
                //计算选中的个数
                this.selectedFun()
            }
        }

  /*      //选中的元素从list_data中的selected中过滤
        ,selectedFilter:function(el){
            return el.selected;
        }
        //是否显示过虑
        ,showFilter:function(el){
            return el.show==1;
        }*/


        /*搜索列表相关的功能*/
        //搜索输入框输入的需要匹配的内容
        ,tagInput:''
        //输入内容发生变化时的回调函数
        ,tagInputCall:function(e){
            //avalon.log(key,e.target.value);
            var val=e.target.value
            this.pipeiFun(val,this.list_data);
        }
        //用于匹配输入的字答是否存在对应数据中
        ,pipeiFun:function(text,data){
            if(!data) return;
            var keyWordArr = text.replace(/[\s]+/g,' ').split(' ');
            re = new RegExp(""+keyWordArr+"","gmi");
            avalon.each(data,function(i,el){
                el.show=re.test(el.val)?1:0
            })
        }
        //计算选中的个数
        ,selectedFun:function(){
            var selected_data=[]
            avalon.each(this.list_data,function(i,el){
                el.selected&&selected_data.push({
                    key:el.key
                    ,val:el.val
                })
            })
            this.dataCallback(selected_data);
        }
        ,onInit:function(){
            //初始化操作对象
            var vm=this;
           avalon(document.body).bind('click',function(e){
               !avalon.contains(vm.$element, this)&&(vm.isShowDown=false);
            });
        }
    }
});
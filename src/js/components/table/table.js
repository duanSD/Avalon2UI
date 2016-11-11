require('../pages/pages');
require('./table.less');
var conf=require('_/comConfig');
var tpl=require('./table.html')
var vm=avalon.component('ms-table', {
    template: tpl,
    defaults: {
        ifpages:true //是否显示分页。默认显示
        ,ifgetData:true //是否配置组件自动加载数据。还是传递数据对旬。默认为前者
        ,columns: [/*{
            checkbox: true
            ,field:'id'
            ,title: '序号'
        }, {
            field: 'imei',
            title: 'IMEI'
        },{
            field: 'action',
            title: '操作'
            ,action:[
                {
                    name:'明细'
                    ,url:'javascript:;'
                    ,click:function(e,els){
                        //e为事件对象 els为行VM数对数据对象
                    console.log(e,els)
                      }
                }
                ,{
                    name:'明细2'
                    ,url:'javascript:;'
                    ,click:function(e,els){
                    //e为事件对象 els为行VM数对数据对象
                        console.log(e,els)
                }
                }
            ]
        }*/]
        ,pageLen:10 //每页显示多少条记录
        ,selectPage:1 //当前选 中的页码
        ,numlen:5 //显示多少个分页按键
        ,onPageChange:function(n){
            this.getData(n);
        }
        ,tbpgConf:{ //分页配置
            totalNum:10
            ,selectPage:1
            ,numlen:10
            ,pageLen:10
            ,onPageChange:avalon.noop
        }
        ,tbody:[]
        ,dataUrl:''
        ,onInit:function(){
            var vm=this;
            if(this.ifpages){
                this.pagesId=conf.uuid();
                this.tbpgConf={//分页配置
                    totalNum:10
                    ,selectPage:vm.selectPage
                    ,numlen:vm.numlen
                    ,pageLen:vm.pageLen
                    ,onPageChange:vm.onPageChange
                }
            }


            this.getData();
        }
        ,onReady:function(){
        }
        ,onViewChange:function(){

        }
        ,onDispose:function(){

        }
        ,getData:function(n){
            //n为当前选中的页码
            var vm=this;
            if(this.ifgetData){
                avalon.ajax({
                    type: "GET",
                    url: this.dataUrl+'&p='+(n||this.selectPage)+'&n='+this.pageLen,
                    /*            headers: {
                     xxx: "yyy"

                     },*/
                    dataType:'json',
                    success: function(d){
                        if(d.status==1){
                            vm.tbody=d.data;
                            vm.tbpgConf.totalNum=d.pageSum;
                        }
                        console.log(d);
                    }

                })
            }
        }
    }
});
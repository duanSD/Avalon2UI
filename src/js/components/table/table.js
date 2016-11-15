require('../pages/pages');
require('../search/search');
require('../datepicker/datepicker')
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

        //工具条控制
        ,boolBox:false //是否显示工具条
        ,toolTit:'搜索'
        ,tbSearch:{
            title:'搜索'
            ,searchVal:''
        }
        ,dateSConf:{
            dateFormatVal:''
            ,objconf:{ //组件内部使用对象，要组件配置中不能改变些对象的值
                elem:'',
                format: 'YYYY-MM-DD', //日期格式 YYYY-MM-DD hh:mm:ss  'YYYY年MM月DD日'等
                /*min: laydate.now(), //设定最小日期为当前日期
                 max: '2099-06-16', //最大日期*/
                istime: false, //是否显示时间
                festival: true, //显示节日
                istoday: false,
                choose: function(datas){ //选择日期后的回调
                    /* end.min = datas; //开始日选好后，重置结束日的最小日期
                     end.start = datas //将结束日的初始值设定为开始日*/
                }
            }
        }
        ,dateEConf:{
            dateFormatVal:''
            ,objconf:{ //组件内部使用对象，要组件配置中不能改变些对象的值
                elem:'',
                format: 'YYYY-MM-DD', //日期格式 YYYY-MM-DD hh:mm:ss  'YYYY年MM月DD日'等
                /*min: laydate.now(), //设定最小日期为当前日期
                 max: '2099-06-16', //最大日期*/
                istime: false, //是否显示时间
                festival: true, //显示节日
                istoday: false,
                choose: function(datas){ //选择日期后的回调
                    /* end.min = datas; //开始日选好后，重置结束日的最小日期
                     end.start = datas //将结束日的初始值设定为开始日*/
                }
            }
        }
        ,$cacheUrl:''
        ,tbSearchFun:function(){

            this.dataUrl=this.$cacheUrl+'&name='+this.tbSearch.searchVal+'&startDate='+this.dateSConf.dateFormatVal+'&startEnd='+this.dateEConf.dateFormatVal
            this.getData();
        }

        ,onInit:function(){
            var vm=this;
            this.$cacheUrl=this.dataUrl;
            if(this.ifpages) {
                this.pagesId = conf.uuid();

                this.dateEndId = conf.uuid();
                this.tbpgConf = {//分页配置
                    totalNum: 10
                    , selectPage: vm.selectPage
                    , numlen: vm.numlen
                    , pageLen: vm.pageLen
                    , onPageChange: vm.onPageChange
                };
            }
            if(this.boolBox) {
                this.searchId = conf.uuid();
                this.dateStartId = conf.uuid();
                this.tbSearch = {
                    title: vm.toolTit
                    , searchVal: ''
                }
                this.dateSConf.objconf.max = this.dateEConf.dateFormatVal;
                this.dateEConf.objconf.min = this.dateSConf.dateFormatVal;
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
            var tbpgConf=vm.tbpgConf
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
                            !!tbpgConf?tbpgConf.totalNum=d.pageSum:vm.totalNum=d.pageSum;
                        }
                        console.log(d);
                    }

                })
            }
        }
    }
});
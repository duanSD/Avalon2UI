require(['avalon','text!../js/avalon/pages/avalon.pages.html'], function(avalon,tpl) {
    var vm=avalon.component('ms-pages', {
        template: tpl,
        //avalon.watch('selectNum',this.clickCallback);

        defaults: {
            totalNum:10,//总页数
            selectPage:1,//当前选中的页码
            numlen:5,//显示多少个分页按钮
            pageList:[1,2,3,4,5],
            totalNumArr:[1,2,3,4,5],//全部页码
            //上下翻页是否显示
            prevView:true,
            nextView:true,
            inputValue:1,
           // clickCallback:avalon.noop,
            onPageChange:avalon.noop,//go按键的回调函数 参数为事件对象与页码 选中页码发生改变时要做的处理

            /*-----------------------------------------------------------建议线以上组件外部修改属性*/
            selectNum:0,//当前第几个按钮
            onInit: function () {
                console.log('onInit');
            },
            onReady: function () {
                console.log('onReady')
                this.$watch('totalNum',function(n,o){
                    var arr=[],totalArr=[];
                    var i=this.selectPage%this.numlen
                    for(var i=0;i<n;i++){
                        totalArr.push(i+1);
                    }
                    this.totalNumArr=totalArr;
                    var s=(this.selectPage-i)<0?0:this.selectPage-i,e=(this.selectPage-i+this.numlen)>n?n:(this.selectPage-i+this.numlen);
                    var arr=this.totalNumArr.slice(s,e);
                    this.pageList=arr;
                    this.prevView=this.pageList[0]>1;
                    this.nextView=this.totalNum>this.pageList[this.pageList.length-1];
                })
                this.totalNum=11;

                this.$watch('selectPage',function(n,o){
                    if(0<n<=this.totalNum){
                        var i=n%this.numlen;
                        var s=(n-i)<0?0:n-i,e=(n-i+this.numlen)>this.totalNum?this.totalNum:(n-i+this.numlen);
                        var arr=this.totalNumArr.slice(s,e);
                        this.pageList=arr;
                        this.selectNum=i-1;
                        this.onPageChange&&this.onPageChange(n);
                    }else{
                        this.onPageChange&&this.onPageChange(n,'请选择或输入正确的页码');
                    }
                    avalon,log(n,0);
                })
            },
            onViewChange: function () {
                this.prevView=this.pageList[0]>1;
                this.nextView=this.totalNum>this.pageList[this.pageList.length-1];
                console.log('onViewChange')
            },
            onDispose: function () {
                console.log('onDispose')
            },

            onNumClick:function(e,index){
                this.selectNum=index;
                this.selectPage=this.pageList[index]
               // this.clickCallback&&this.clickCallback(e,this.selectPage);
            },
            update: function(e,type){
                var list=this.pageList,len=this.numlen;
                var start=list[0],end=list[this.pageList.length-1],arr=[];
                if(type=='next'){
                    arr=this.totalNumArr.slice(end,end+len)
                }else if(type=='prev'){
                    if(start>1){
                        arr=this.totalNumArr.slice(start-len-1,start-1)
                    }
                }
                if(arr.length>0){
                    this.selectNum=1000;
                    this.pageList=arr;
                }
            },
            ongo:function(e,d){
                this.selectPage=d;
            }
        }

    });
});

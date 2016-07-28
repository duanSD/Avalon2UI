require(['avalon','text!../js/avalon/pages/avalon.pages.html'], function(avalon,tpl) {
    var vm=avalon.component('ms-pages', {
        template: tpl,
        defaults: {
            totalNum:0,//总页数 不可以为0
            selectPage:0,//当前选中的页码
            numlen:0,//显示多少个分页按钮 必须大于1以上的个数
            //pageList:[],
            pageLen:0,//每页多少条。这是只前后端交互时用到
            //上下翻页是否显示
            prevView:false,
            nextView:false,
            inputValue:1,
           // clickCallback:avalon.noop,
            onPageChange:avalon.noop,//go按键的回调函数 参数为事件对象与页码 选中页码发生改变时要做的处理

            /*-----------------------------------------------------------建议线以上组件外部修改属性*/
            //selectNum:0,//当前第几个按钮
            onInit: function () {
                //初始化
                this.totalNum=99;
                this.pageList=avalon.range(1,this.numlen+1);
                this.selectPage=1;
                this.selectNums=0;
                this.$watch('totalNum',function(n,o){
                    n=n==0?1:n;
                    var i=this.selectPage%this.numlen
                    var s=(this.selectPage-i)<0?0:this.selectPage-i,e=(this.selectPage-i+this.numlen)>n?n:(this.selectPage-i+this.numlen);
                    //this.pageList=null;
                    this.pageList=avalon.range(s+1,e+1);
/*                    this.prevView=this.pageList[0]>1;
                    this.nextView=this.totalNum>this.pageList[this.pageList.length-1];*/
                })
                 this.$watch('selectPage',function(n,o){
                     var i=this.selectPage%this.numlen;
                     i=i==0?this.numlen:i;
                     var s=(n-i)<0?0:n-i,e=(n-i+this.numlen)>this.totalNum?this.totalNum:(n-i+this.numlen);
                     this.onPageChange(n);
                     this.pageList=avalon.range(s+1,e+1);

                 })
            },
            onReady: function () {

            },
            onViewChange: function () {
                this.prevView=this.pageList[0]>1;
                this.nextView=this.totalNum>this.pageList[this.pageList.length-1];
            },
            onDispose: function () {
                //console.log('onDispose')
            },

            onNumClick:function(index){
                this.selectPage=this.pageList[index];
                this.selectNums=index;
            },
            update: function(type){

                var start=this.pageList[0],end=this.pageList[this.pageList.length-1];
                end1=(end+this.numlen>this.totalNum)?this.totalNum:end+this.numlen;
                if(type=='next'){
                    this.selectPage=end+1;
                    this.selectNums=0;
                    //this.pageList=avalon.range(end+1,end1+1);
                }else if(type=='prev'){
                    if(start>1){
                        this.selectPage=start-1;

                      //this.pageList=avalon.range(start-this.numlen,start);
                    }
                    this.selectNums=start-2;
                }

            },
            ongo:function(){
                this.inputValue>this.totalNum&&(this.inputValue=this.totalNum);
                this.inputValue<1&&(this.inputValue=1);
               this.selectPage=this.inputValue;
                var i=this.selectPage%this.numlen;
                this.selectNums=i-1;
            }
        }

    });
});

require("../../components/store/avalon.store.js");
var config=require("_/comConfig")
var tmpl = require('./menu-right.html')
avalon.component('ms-menu-right', {
    template: tmpl,
    defaults: {
        //tabList为tab导航条的数据。包括已经关闭的。
        //包令几种状态： 当前是不是选中显示的页面。  己经关闭的页面(只隐藏不移除。方便下次打开。)
        tabList:[
           /* {
                status:2 //status 为tab页面装态。0是己经关闭的。1是当前选中显示的页面。2为打开得未选中的页面。
                ,title:'首页'
                ,url: 'main/index.html'
            }*/
        ]
        ,containerHeight:829
        ,closeTab:function(el){
            //关闭tab不移除页面的方式就会多出一个0状态
            /*var newArr=this.tabList.filter(function(el, i, arr){
                return el.status!=0
            });
            var i=newArr.indexOf(el);
            el.status=0;
            i!=-1&&(i>0?newArr[i-1]['status']=1:newArr[i+1]['status']=1);*/

            //关闭tab移除页面的方法
            this.closeTabNav(el.url);

        }
        ,clickNav:function(el){
            avalon.each(this.tabList,function(i,e){
                e.status==1&&(e.status=2);
            })
            el.status=1;
        }

    /*    //tab条喧赤的块。type标识当前把在的页面
        ,selectNav:[
            {title:'首页',url: 'main/index.html',type:true,close:false}
        ]*/

        /*tab左右移动等相关操作*/
        ,tabWidth:140 //每个tab长度
        ,$leftVal:-140
        ,leftMove:function(e){
            /*var boxWidth=avalon(e.target.parentNode.childNodes[1].childNodes[0]).width();
             var tabListWidth=this.tabWidth*this.selectNav.length;*/
            var uloffset=avalon(e.target.parentNode.childNodes[1].childNodes[0].childNodes[0]).position();
            if(uloffset.left>0){

            }
            avalon(e.target.parentNode.childNodes[1].childNodes[0]).scrollLeft(this.$leftVal);
            this.$leftVal-=this.tabWidth;
        }
        ,$rightVal:140
        ,rightMove:function(e){
            avalon(e.target.parentNode.childNodes[1].childNodes[0]).scrollLeft(this.$rightVal);
            this.$rightVal+=this.tabWidth;
        }
        ,maxRightMove:function(p){
            var vm=this;
            var w=p||0;
            var em=avalon(this.$element.childNodes[0].childNodes[0].childNodes[1].childNodes[0]);
            if(!w){
                w=em.width();
            }
            em.scrollLeft(w);
        }

        /*  公开的方法*/
        ,closeTabNav:function(url){
            //关闭tab 参数url为对应的tab的url
            var vm=this;
            avalon.each(this.tabList,function(i,e){
                if(!!e&&e.url==url){
                    if(e.status==1){
                        i!=-1&&(i>0?vm.tabList[i-1]['status']=1:vm.tabList[i+1]['status']=1);
                    }
                    avalon.Array.remove(vm.tabList,e);
                }
            })
        }
        ,addTabNav:function(obj){
            if(!obj||!obj.url)return false;
            var o={
                url:obj.url
                ,status:1
                ,title:obj.title||obj.url
            }
            var isAt=0,index=-1;  //isAt标示有没有己经存的tab index取得当前选中的索引
            var _self=this;


            avalon.each(this.tabList,function(i,e){
                //根据Url判断页面是否己经存在
                if(!!e&&e.status==1&&o.url!=e.url){
                    e.status=2
                    index=i;
                }
                if(!!e&&o.url==e.url) {
                    //己经存的的tab的切换和显示
                    //e.status=1;
                    isAt = 1;
                    if (e.status == 2) {
                        e.status = 1;
                        _self.maxRightMove((i) * _self.tabWidth - 1);
                    }
                }
            })
            //插入新的tab
            if(!isAt){
                if(index==-1){
                    avalon.Array.ensure(this.tabList,o);
                    _self.maxRightMove();
                }else{
                    this.tabList.splice(index+1,0,o);
                }
            }
        }
    }
})
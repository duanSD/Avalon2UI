require(['avalon', 'text!../js/avalon/search/avalon.search.html','../js/avalon/store/avalon.store', 'mmRequest'], function (avalon,tpl) {
    avalon.component('ms-search', {
        template: tpl,
        defaults: {
            data: ['店铺列表','商品品类', '商品品目','二级品目','三级品目','商品款式','商品品牌','商品标签'],
            data0:{
                arr:[],//缓存的数据
                pipe:[]//输入时匹配的数据，用于绑定到节点上
                ,conArr:[]//用于匹配的数组串，组存所在的名称
            },
            data1:{
                arr:[],//缓存的数据
                pipe:[]//输入时匹配的数据，用于绑定到节点上
                ,conArr:[]//用于匹配的数组串，组存所在的名称
            },
            data2:{
                arr:[],//缓存的数据
                pipe:[]//输入时匹配的数据，用于绑定到节点上
                ,conArr:[]//用于匹配的数组串，组存所在的名称
            },
            data3:{
                arr:[],//缓存的数据
                pipe:[]//输入时匹配的数据，用于绑定到节点上
                ,conArr:[]//用于匹配的数组串，组存所在的名称
            },
            data4:{
                arr:[],//缓存的数据
                pipe:[]//输入时匹配的数据，用于绑定到节点上
                ,conArr:[]//用于匹配的数组串，组存所在的名称
            },
            data5:{
                arr:[],//缓存的数据
                pipe:[]//输入时匹配的数据，用于绑定到节点上
                ,conArr:[]//用于匹配的数组串，组存所在的名称
            },
            data6:{
                arr:[],//缓存的数据
                pipe:[]//输入时匹配的数据，用于绑定到节点上
                ,conArr:[]//用于匹配的数组串，组存所在的名称
            },
            data7:{
                arr:[],//缓存的数据
                pipe:[]//输入时匹配的数据，用于绑定到节点上
                ,conArr:[]//用于匹配的数组串，组存所在的名称
            },
            host: '',//品类host
            selectData:{
                bizid:'',//入驻商ID
                goodssellerid:'',//店铺ID
                goodsclassifyname:'', //品类
                goodssubclassifyname:''
                ,goodsthreeclassifyname:''
                ,goodsfourclassifyname:''
                ,goodsstylename:''
                ,brandname:''
                ,goodslabelname:''
            },//选中的条件
            searchValue: '',
            seltID: 'a',//用示控制下拉显示
            shopId:'',
            hostshop:'',//标签
            hostBrand:'', //品牌host
            ssoService:'',//店铺HOST
            Submit: avalon.noop,

            /*-----------------------------------------------------------建议线以上组件外部修改属性*/
            i:1,//用于做递增
            role:avalon.store.get('role'),
            userInfo:avalon.store.get('userInfor'),
            //用于控制是显示哪种类型的弄表一种为静态的。一种为用户输入匹配的
            viewList:0,
            //搜索输入框输入的需要匹配的内容
            tagInput:'',
            //输入内容发生变化时的回调函数
            tagInputCall:function(key,e){
                //avalon.log(key,e.target.value);
                this.pipeiFun(e.target.value,this[key]);
            },
            //用于匹配输入的字答是否存在对应数据中
            pipeiFun:function(text,data){
                this.viewList=1;
                if(!data) return;
                var keyWordArr = text.replace(/[\s]+/g,' ').split(' ');
                re = new RegExp(""+keyWordArr+"","gmi");
                data.pipe=[];//var arr=[]
                avalon.each(data['conArr'],function(i,el){
                    if(re.test(el)){
                        data.pipe.push(data['arr'][i]);
                    }
                })
               // data.pipe=arr;
               // avalon.log(text,data);
            },
            

            onInit: function () {
                this.searchValue='';
                var vm = this;
                if (this.host != '') {
                    avalon.ajax({
                        url: this.host + '/classify/clazzlist/1',//获取品类。品目,
                        type: 'get',
                        cache: true,
                        contentType:'application/json;charset=utf-8',
                    }).done(function (ret) {
                        if (ret.isSuccess == 1) {
                            vm.data1['arr'] = ret.data;
                            vm.data1['conArr']=[];
                            avalon.each(vm.data1['arr'],function(i,el){
                                vm.data1['conArr'].push(el.clazzname);
                            });
                        } else {
                            dialog.open({
                                text: '品类请求失败，请重试'
                            })
                        }
                    })
                }
                if(this.hostshop!=''){
                    //获取标签
                    avalon.ajax({
                        url: this.hostshop+'/goodsLabel/'+this.shopId,//
                        type: 'get',
                        cache: true,
                        contentType:'application/json;charset=utf-8',
                    }).done(function (ret) {
                        if (ret.isSuccess == 1) {
                            vm.data7['arr'] = ret.data;
                            vm.data7['conArr']=[];
                            avalon.each(vm.data7['arr'],function(i,el){
                                vm.data7['conArr'].push(el.labelname);
                            });

                        } else {
                            dialog.open({
                                text: '请求失败，请重试'
                            })
                        }
                    })
                }
                if(this.hostBrand!='') {
                    ///bdBrand/{id}获取品牌
                    ///manage/shopInfo/shop/{id}
                    if(this.role==1){
                        var aUrl=this.ssoService+'/manage/shopInfo/shop/' + this.shopId;
                    }else if(this.role==2||this.role==0){
                        var aUrl=this.hostBrand + '/bdBrand/all';
                    }
                    avalon.ajax({
                        url:aUrl,//。,
                        type: 'get',
                        cache: true,
                        contentType: 'application/json;charset=utf-8',
                    }).done(function (ret) {
                        if (ret.isSuccess == 1) {
                            if(vm.role==2||vm.role==0){
                                vm.data6['arr'] = ret.data;
                                vm.data6['conArr'] = [];
                                avalon.each(vm.data6['arr'], function (i, el) {
                                    vm.data6['conArr'].push(el.bd_bdChnName);
                                });
                            }else{
                                var bd_bdChnName=ret.data['brandName'];
                                var bd_bdChnNames=bd_bdChnName&&bd_bdChnName.split(',')
                                vm.data6['conArr'] = [];vm.data6['arr']=[];
                                avalon.each(bd_bdChnNames, function (i, el) {
                                    vm.data6['conArr'].push(el.bd_bdChnName);
                                    vm.data6['arr'].push({bd_bdChnName:el});
                                });
                            }
                        } else {
                            dialog.open({
                                text: '请求失败，请重试'
                            })
                        }
                    });
                }
                if(this.ssoService!=''){
                    ////shopUser/listInfo 获取店铺列表信息
                    if(this.role==0||this.role==2) {
                        avalon.ajax({
                            url: this.ssoService + '/shopUser/listInfo',
                            type: 'post',
                            data:JSON.stringify({
                                userId:this.userInfo.userID,
                                shopName:'',
                                name:''
                            }),
                            contentType:'application/json;charset=utf-8',
                            cache: true,
                        }).done(function (ret) {
                            if (ret.isSuccess == 1) {
                                vm.data0['arr'] = ret.data['result'];
                                vm.data0['conArr']=[];
                                avalon.each(vm.data0['arr'],function(i,el){
                                    vm.data0['conArr'].push(el.sso_shopName);
                                });
                            } else {
                                dialog.open({
                                    text: '品牌请求失败，请重试'
                                })
                            }
                        })
                        vm.selectData['bizid']=avalon.store.get('userInfor')['userID'];
                    }else{
                        vm.selectData['goodssellerid']=avalon.store.get('shopId');
                    }
                };
                this.Submit();
            },
            onReady: function () {
                this.searchValue='';
            },
            onViewChange: function () {
            },
            onDispose: function () {
                console.log('onDispose')
            }
            , onselectPClass: function (i,e) {
                this.viewList=0;
                this.tagInput='';
                if(e.target.tagName=='INPUT') return;
                switch (e.type) {
                    case 'mouseleave':
                        this.seltID = 'a';
                        break;
                    case 'click':
                        this.seltID = 'a'
                        this.seltID = i;
                        break
                }
            }
            , onselectClass: function (e, el,i) {
                /*
                * ['店铺列表','商品品类', '商品品目','二级品目','三级品目','商品款式','商品品牌','商品标签'],*/
                var me=this;
                this.seltID = 'a';
                switch (i){
                    case 0:
                        this.selectData['goodssellerid']=el.sso_shopInfoID;
                        this.data[i] = el.sso_shopName;
                        //this['data'+(i+2)]&&(this['data'+(i+2)]=el.children);
                        break;
                    case 1:
                        this.selectData['goodsclassifyname']=el.clazzname;
                        this.data[i] = el.clazzname;
                        this.data[2]='商品品目';
                        this.data[5]='商品款式';
                        this.data2.conArr=[];this.data3.conArr=[];this.data4.conArr=[];this.data5.conArr=[];
                        if(el.children.length>0){
                            this['data2']['arr']=el.children;
                            avalon.each(this['data2']['arr'],function(i,els){
                                me.data2.conArr.push(els.clazzname)
                            });
                        }else if(el.stylelist.length>0){
                            this['data5']['arr']=el.stylelist;
                            me.data5.conArr=[];
                            avalon.each(this['data5']['arr'],function(i,els){
                                me.data5.conArr.push(els.gd_styleName)
                            });
                        }
                        break;
                    case 2:
                        this.selectData['goodssubclassifyname']=el.clazzname;
                        this.data[i] = el.clazzname;
                        this.data[3]='二级品目';
                        this.data[5]='商品款式';
                        this.data3.conArr=[];this.data4.conArr=[];this.data5.conArr=[];
                        if(el.children.length>0){
                            this['data3']['arr']=el.children;
                            avalon.each(this['data3']['arr'],function(i,els){
                                me.data3.conArr.push(els.clazzname)
                            });
                        }else if(el.stylelist.length>0){
                            this['data5']['arr']=el.stylelist;
                            avalon.each(this['data5']['arr'],function(i,els){
                                me.data5.conArr.push(els.gd_styleName)
                            });
                        }
                        break;
                    case 3:
                        this.selectData['goodsthreeclassifyname']=el.clazzname;
                        this.data[i] = el.clazzname;
                        this.data[4]='三级品目';
                        this.data[5]='商品款式';
                        this.data4.conArr=[];this.data5.conArr=[];
                        if(el.children.length>0){
                            this['data4']['arr']=el.children;
                            this.data4.conArr=[];
                            avalon.each(this['data4']['arr'],function(i,els){
                                me.data4.conArr.push(els.clazzname)
                            });
                        }else if(el.stylelist.length>0){
                            this['data5']['arr']=el.stylelist;
                            this.data5.conArr=[];
                            avalon.each(this['data5']['arr'],function(i,els){
                                me.data5.conArr.push(els.gd_styleName)
                            });
                        }
                        break;
                    case 4://最后一级品类
                        this.selectData['goodsfourclassifyname']=el.clazzname;
                        this.data[i] = el.clazzname;
                        this.data[5]='商品款式';
                        if(el.stylelist.length>0){
                            this['data5']['arr']=el.children;
                            this.data5.conArr=[];
                            avalon.each(this['data5']['arr'],function(i,els){
                                me.data5.conArr.push(els.gd_styleName)
                            });
                        }
                        break;
                    case 5://款式
                        this.selectData['goodsstylename']=el.gd_styleName;
                        this.data[i] = el.gd_styleName;
                        break;
                    case 6: //K品牌
                        this.selectData['brandname']=el.bd_bdChnName;
                        this.data[i] = el.bd_bdChnName;
                        break;
                    case 7: //标签
                        this.selectData['goodslabelname']=el.labelname;
                        this.data[i] = el.labelname;
                        break;
                }

                    me.Submit();
            }
        }

    });
});

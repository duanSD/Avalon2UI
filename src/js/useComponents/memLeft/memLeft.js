/**
 * Created by Administrator on 2016/6/12.
 */
var config=require("../../lib/units/b2bconfig")
require("../../components/store/avalon.store")
var tmpl = require('./memLeft.html')
//获取用户状态接口

var urlleft='/ssoService/companyInfoAuthState/'+avalon.store.get('userInfor')['userID'];
avalon.component('ms-memLeft', {
    template: tmpl,
    defaults: {
        //认证状态
        renzhengStatu:'001',
        onInit: function () {
            //获取用户状态
            avalon.ajax({
                url:urlleft,
                type: 'get',
                cache: true
            }).done(function(ret) {
                if (ret.isSuccess == 1) {
                    //暂时没做处理
                    avalon.log(ret);
                    avalon.store.set('renzhengStatu',ret.data);
                    var rsaData = ret.data;
                }else{
                    avalon.log( '服务异常，请重试');
                    return;
                }
            }).fail(function() {
                avalon.log( '服务异常，请重试');
            });
        },
        /*data返回参数说明:
         认证状态
         130采购商认证未审核      131采购商认证审核通过       132采购商认证失败
         140供应商认证未审核    141供应商认证审核通过     142供应商认证失败
         150品牌商认证未审核         151品牌商认证审核通过      152品牌商认证失败
         升级认证状态
         2340采购商升级供应商未审核     2341采购商升级供应商审核通过(理论上升级通过之后只保留最高级认证状态.)       2342采购商升级供应商失败
         2350采购商升级品牌商未审核      2351采购商升级品牌商审核通过(理论上升级通过之后只保留最高级认证状态.)       2352采购商升级品牌商失败
         2450供应商升级品牌商未审核      2451供应商升级品牌商审核通过(理论上升级通过之后只保留最高级认证状态.)        2452供应商升级品牌商失败
         002数据有误           001未认证*/
        onClickNav:function(e){
            //i=parseInt(i);
            var i=parseInt(avalon(e.target).attr('dataNav'));
           // if(i==this.selectindex) return;
            var url=[
                'jibenxinxi.html', //基本信息
                'new-company.html', //公司信息'companyMessage.html', //公司信息
                null,//子账号管理
                'weirenzheng.html',//资质认证   这里需要根据当臆的认证状态来跳转不同的页面
                'xiugaimima.html',//修改密码<
                'zhanghaoanquan.html',//账号安全
                'zhanghaoguanli.html'//账号管理
            ]
            url[i]&&(location.href=url[i]);
        },
        selectindex:0,
        onReady: function () {

        },
        onViewChange: function () {
            console.log('onViewChange')
        },
        onDispose: function () {
            console.log('onDispose')
        },
    }
})
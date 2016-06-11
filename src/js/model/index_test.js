//引入css
/*require("../../css/lib/reset.css");
require("../../css/common/global.css");
require("../../css/common/grid.css");*/
require("../../css/lib/bootstrap/less/bootstrap.less");
require("../../css/lib/bootstrap/less/theme.less");
require("../../css/model/index.less");
var avalon=require("avalon");
/*require("mmAnimate");
 require("mmRouter");*/

var button=require("../components/button-test/button");
var panel=require("../components/panel-test/panel");
var uptop=require("../components/uptop/avalon2.uptop");
var vm=avalon.define({
	$id: "test",
	aaa: "Hello Avalon11  22asawqs2323!",
	aaaaa:"asdfasdfasdsasfsadfwe"
    ,panelConf:{
        body:'testttt。'
    },
    validate: {
        onError: function (reasons) {
            reasons.forEach(function (reason) {
                console.log(reason.getMessage())
            })
        },
        onValidateAll: function (reasons) {
            if (reasons.length) {
                console.log('有表单没有通过')
            } else {
                console.log('全部通过')
            }
        }
    }
})
//增加事件

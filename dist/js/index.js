webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(82);


/***/ },

/***/ 82:
/***/ function(module, exports, __webpack_require__) {

	//引入css
	/*require("../../css/lib/reset.css");
	require("../../css/common/global.css");
	require("../../css/common/grid.css");*/
	__webpack_require__(72);
	__webpack_require__(79);
	__webpack_require__(83);
	var avalon=__webpack_require__(71);

	var button=__webpack_require__(84);
	var panel=__webpack_require__(85);
	var uptop=__webpack_require__(87);
	var vm=avalon.define({
		$id: "test",
		aaa: "Hello Avalon11  22asawqs2323!",
		aaaaa:"asdfasdfasdsasfsadfwe"
	    ,panelConf:{
	        body:'终于走通了。'
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


/***/ },

/***/ 83:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 84:
/***/ function(module, exports) {

	//var avalon = require('avalon')

	avalon.component('ms-button', {
	    template: '<button type="button"><span><slot name="buttonText"></slot></span></button>',
	    defaults: {
	        buttonText: "button"
	    },
	    soleSlot: 'buttonText'
	})


/***/ },

/***/ 85:
/***/ function(module, exports, __webpack_require__) {

	var button = __webpack_require__(84)
	var tmpl = __webpack_require__(86)

	avalon.component('ms-panel', {
	    template: tmpl,
	    defaults: {
	        body: "&nbsp;&nbsp;",
	        'ms_button': {
	            buttonText: 'click me!'
	        }
	    },
	    soleSlot: 'body'
	})

/***/ },

/***/ 86:
/***/ function(module, exports) {

	module.exports = "<div>\r\n    <div class=\"body\">\r\n        <slot name=\"body\"></slot>\r\n    </div>\r\n    <p><ms-button /></p>\r\n</div>";

/***/ },

/***/ 87:
/***/ function(module, exports) {

	
	avalon.component('ms-uptop',{
	    template:"<div ms-css='{right:@distanceToRight,bottom:@distanceToBottom,width:@width,height:@height,position:'fixed',backgroundImage:@backgroundUrl,cursor:'pointer'}' ms-attr={title:@title} ms-on-click='@goTop' ms-visible='@toggle' class='btn btn-default'></div>",
	    defaults :{
	        distanceToRight: 50,
	        distanceToBottom: 60,
	        title: "回到顶部",
	        width: '60px',
	        height: '60px',
	        animate: false,
	        toggle: false,
	        $skipArray : ["timeId"],
	        timeId : 0,
	        goTop :function() {
	            var scrollTop = avalon(document).scrollTop()
	                if (this.animate) {
	                    this.timeId = setTimeout(function() {
	                        window.scrollBy(0, -100)
	                        this.goTop()
	                    },200)
	                    if (scrollTop==0) {
	                        clearTimeout(this.timeId);
	                    }
	                } else {
	                    window.scrollTo(0, 0)
	                }
	        },
	        backgroundUrl: 'url(http://source.qunarzz.com/general/oniui/uptop/up.png)',
	        //http://source.qunarzz.com/general/oniui/uptop/up.png"
	        onInit: function () {
	            var me=this;
	            avalon(document).bind("scroll", throttle(scrollCallback, 100, 200))
	            function throttle(fn, delay, mustRunDelay, args){
	                var timer = null;
	                var t_start;
	                return function(){
	                    var context = this, t_curr = +new Date();
	                    clearTimeout(timer);
	                    if(!t_start){
	                        t_start = t_curr;
	                    }
	                    if(t_curr - t_start >= mustRunDelay){
	                        fn.apply(context, args);
	                        t_start = t_curr;
	                    }
	                    else {
	                        timer = setTimeout(function(){
	                            fn.apply(context, args);
	                        }, delay);
	                    }
	                };
	            }
	            function scrollCallback() {
	                var scrollTop = avalon(document).scrollTop();
	                if (scrollTop > 200) {
	                    me.toggle = true;
	                } else {
	                    me.toggle = false
	                }
	            }
	            console.log('onInit')
	        },
	        onReady: function () {
	            console.log('onReady')
	        },
	        onViewChange: function () {
	            console.log('onViewChange')
	        },
	        onDispose: function () {
	            console.log('onDispose')
	        }
	    }
	})


/***/ }

});
webpackJsonp([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(88);


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


/***/ },

/***/ 88:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Administrator on 2016/6/5 0005.
	 */
	var avalon=__webpack_require__(71);
	__webpack_require__(72);
	__webpack_require__(79);
	var uptop=__webpack_require__(87);
	var panel=__webpack_require__(84);
	avalon.define({
	    $id:'test'
	})

/***/ }

});
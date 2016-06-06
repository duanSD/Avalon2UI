webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(70);


/***/ },

/***/ 70:
/***/ function(module, exports, __webpack_require__) {

	//引入css
	/*require("../../css/lib/reset.css");
	require("../../css/common/global.css");
	require("../../css/common/grid.css");*/
	__webpack_require__(71);
	__webpack_require__(78);
	__webpack_require__(79);
	var avalon=__webpack_require__(80);

	var button=__webpack_require__(81);
	var panel=__webpack_require__(82);
	var uptop=__webpack_require__(84);
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

/***/ 79:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 82:
/***/ function(module, exports, __webpack_require__) {

	var button = __webpack_require__(81)
	var tmpl = __webpack_require__(83)

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

/***/ 83:
/***/ function(module, exports) {

	module.exports = "<div>\r\n    <div class=\"body\">\r\n        <slot name=\"body\"></slot>\r\n    </div>\r\n    <p><ms-button /></p>\r\n</div>";

/***/ }

});
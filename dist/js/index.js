webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {//引入css
	__webpack_require__(2);
	__webpack_require__(6);
	__webpack_require__(8);
	__webpack_require__(12);


	$('.g-bd').append('<p class="text">这是由js生成的一句话。</p>');

	//增加事件
	$('.btn').click(function() {
		__webpack_require__.e/* nsure */(2, function(require) {
			var Dialog = __webpack_require__(13);
			new Dialog();
		});
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 12:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});
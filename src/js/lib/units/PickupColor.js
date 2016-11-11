/*拾取颜色*/
	var PickupColor = function(pars){
        this.ui = pars.ui; //id
        this.color = pars.color || '#333';//默认颜色
        this.colorArr = pars.colorArr || ['#333', '#4d70f3', '#5d3b3b', '#960500', '#7a7528', '#73287a', '#111a5b', '#178028', '#dc6a9a', '#f24e4e', '#c8a062', '#cc9999', '#ccc999', '#ffcc99','#ffffff'];//颜色集合
        this.done = pars.done || null;//选取后执行的方法
        this.doneOps = pars.doneOps || null;//选取后执行的方法需要的参数
        this.uiColor = this.ui.find('.pickup-color');
        this.uiPickup =  this.ui.find('.pickup-box');
        this.init();
    }
    PickupColor.prototype = {
        constructor: PickupColor,
        init: function(){
        	var self = this;
        	self.ininHtml();
        	self.events();
        }
        //初始化demo
        ,ininHtml: function(){
        	var self = this;
        	var _len = self.colorArr.length;
        	var _html = '';
			if (_len > 0) {
				_html += '<ul class="color-list fn-c" style="width: '+24*_len+'px"><li class="line"></li>'
				for (var i = 0; i < _len; i++) {
					var _dI = self.colorArr[i];
					_html += '<li data-pickup="color" data-color="'+_dI+'"><p data-pickup="color" data-color="'+_dI+'" class="color" style="background-color: '+_dI+';"></p></li>';
				};
				_html += '</ul>'
			}else{
				return;
			}
			self.uiColor.css('background-color', self.color)
			self.ui.append(_html);
			self.list = self.ui.find('.color-list');
        }
        //事件
        ,events: function(){
        	var self = this;
        	self.ui.on('click', function(e) {
        		var _e = $(e.target);
        		var _ePickup = _e.attr('data-pickup');
        		if (_ePickup == 'box') {
        			if (self.list.is(':visible')) {
						self.list.css('display','none');
        			}else{
        				self.list.css('display','block');
        			}
        		};
        		if (_ePickup == 'color') {
        			self.color = _e.attr('data-color');
        			self.uiColor.css('background-color', self.color);
                    if (self.done) {
                        self.done(self.doneOps);
                    };
        		};
        	});

        	$('body').on('click', function(e){
        		var _e = $(e.target);
        		if (!(_e.attr('id') == self.ui.attr('id') || _e.parents('.ui-pickup-color').attr('id') == self.ui.attr('id'))) {
        			self.list.hide();
        		};
        	})
        }
    }
	module .exports=PickupColor




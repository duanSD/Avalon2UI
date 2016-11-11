/*单点登录方法*/
define(function (){

	//信任域名
	var domains = ['http://localhost:2222', 'http://localhost:2223', 'http://localhost:2224']
	//跳转的地址
	var hrefs = ['/html/account/singLogin.html', '/html/account/singLogin.html', '/html/account/singLogin.html']

	var login = function(pars){
		/*
		this.domains: 信任的域名集合
		this.hrefs: 跳转的地址
		this.domainNow: 当前的域名
		this.data: 需要传输的数据
		 */
		this.domains = pars.domains || domains;
		this.hrefs = pars.hrefs || hrefs;
		this.domainNow = pars.domainNow;
		this.data = pars.data;
		//删除通过此方法添加的iframe
	  	var ifrOld = document.getElementsByTagName('iframe');
	  	var ifrOldLen = ifrOld.length-1;
	  	if (ifrOldLen > -1) {
	  		for (var i = ifrOldLen; i > -1; i--) {
	  			if (ifrOld[i].getAttribute('data-type') == 'domain') {
	  				if (navigator.appName == 'Microsoft Internet Explorer') {
	  					ifrOld[i].removeNode(true);
	  				}else{
	  					ifrOld[i].remove();
	  				}
	  			};
	  		};
	  	};

	  	//添加域名iframe
		var wwws = [];//需要创建iframe的域名集合
		var ifrs = [];//创建的iframe集合
	  	var domainsLen = this.domains.length;
	  	for (var i = 0; i < domainsLen; i++) {
	  		var dI = this.domains[i];
	  		if (dI != this.domainNow) {
	  			wwws.push(this.domains[i]);
	  			ifrs.push('ifr_'+i);
	  			var ifrNew = document.createElement("iframe");
	    		ifrNew.id = 'ifr_'+i;
	    		ifrNew.width = '0';
	    		ifrNew.height = '0';
	    		ifrNew.style.display = 'none';
	    		ifrNew.setAttribute('data-type','domain')
	    		ifrNew.src = this.domains[i] + this.hrefs[i];
	    		document.getElementsByTagName('body')[0].appendChild(ifrNew);
	  		};
	  	};

	  	//传输数据
	    setTimeout(function(){
	    	var wwwsLen = wwws.length;
	    	for (var i = 0; i < wwwsLen; i++) {
	    		var ifrI = document.getElementById(ifrs[i]);
	    		ifrI.contentWindow.postMessage(this.data, wwws[i]);
	    	};
	    },100)
	}
	return {
		login: login
	};
});



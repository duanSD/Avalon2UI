   var tmpl = require('./avalon.fxTopSearch.html')
    avalon.component('ms-fxTopSearch', {
        template: tpl,
        defaults: {
            pageName:'',
            condition:'',
            Submit: avalon.noop
        }
    });

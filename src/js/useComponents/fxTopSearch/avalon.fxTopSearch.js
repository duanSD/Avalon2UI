   var tmpl = require('./avalon.fxTopSearch.html')
    avalon.component('ms-fxTopSearch', {
        template: tmpl,
        defaults: {
            pageName:'',
            condition:'',
            Submit: avalon.noop
        }
    });

var button = require('../button-test/button')
var tmpl = require('./template.html')

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
astconf-template
================
Asterisk *.conf files templates

`````
var Template = require('astconf-template');

var context = Template['extensions']('__context', {
    name: 'outbound', 
    include: 'internal'
});

context.set('include', 'external');

console.log(context.getAttributes());
console.log(context.getName());


`````
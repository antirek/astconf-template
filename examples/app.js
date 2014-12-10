var Template = require('../index');

console.log(Template);

var context = Template['extensions']('__context', {
    name: 'qw', 
    include: 'internal'
});

context.set('include', 'external');

console.log(context.getAttributes());
console.log(context.getName());

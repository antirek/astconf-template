var Template = require('../index');

console.log(Template);

var context = Template['extensions']('__context', {
    name: 'qw', 
    include: 'internal'
});

context.set('include', 'external');

console.log(context.getAttributes());
console.log(context.getName());


var te2 = Template['extensions']('__context', {include: 'qwqwq  qw  qwwwqwqw'});
te2.set('include', 'qw');
console.log(te2);
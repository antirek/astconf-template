var Template = require('../index');

console.log(Template);

var te = Template['extensions']('__context', {include: 'tu'});
te.set('include', 'qw');

console.log(te);



var te2 = Template['extensions']('__context', {include: 'qwqwq  qw  qwwwqwqw'});
te2.set('include', 'qw');
console.log(te2);

//var user = new Conf.UserConf({name: 'Vasya', secret: '1234'});
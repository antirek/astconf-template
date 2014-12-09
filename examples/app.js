var Template = require('../index');

console.log(Template);

var te = Template['extensions']('__context', {include: 'tu'});
te.set('include', 'qw');

console.log(te);

//var user = new Conf.UserConf({name: 'Vasya', secret: '1234'});
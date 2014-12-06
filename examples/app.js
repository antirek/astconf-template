var Conf = require('../index');

var user = new Conf.UserConf({name: 'Vasya', secret: '1234'});

console.log(user);
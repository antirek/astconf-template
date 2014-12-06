(function() {
    var assert = require("assert");
    
    suite("Scheme", function() {
        var Conf = require('../index');        

        test('check valid user.attributes on users.conf', function() {
            var user = new Conf.UserConf({name: 'Vasya', secret: '1234'});
            var object = {name: 'Vasya', secret: '1234'};
            return assert.deepEqual(user.attributes, object);
        });

        test('check decline attr in scheme', function() {
            var user = new Conf.UserConf({name: 'Vasya', secret: '1234', noattrinscheme: '1234'});
            var object = {name: 'Vasya', secret: '1234'};
            return assert.deepEqual(user.attributes, object);
        });

    });

}).call(this);
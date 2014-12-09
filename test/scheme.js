(function() {
    var assert = require("assert");
    
    suite("Scheme", function() {
        var Template = require('../index');        

        test('check valid user.attributes on users.conf', function() {
            var user = Template['users']('__user', {name: 'Vasya', secret: '1234'});
            var object = {name: 'Vasya', secret: '1234'};
            return assert.deepEqual(user.attributes, object);
        });

        test('check decline attr in scheme', function() {
            var user = Template['users']('__user', {name: 'Vasya', secret: '1234', noattrinscheme: '1234'});
            var object = {name: 'Vasya', secret: '1234'};
            return assert.deepEqual(user.attributes, object);
        });

    });

}).call(this);
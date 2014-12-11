(function() {
    var assert = require("assert");
    
    suite("Template", function() {
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

        test('check decline attr in scheme', function() {
            var template = Template['extensions']('__context', {name: 'cool', include: 'inc1'});
            template.set('include', 'inc2');

            var object = {name: 'cool', include: ['inc1', 'inc2']};
            return assert.deepEqual(template.attributes, object);
        });

        test('check decline attr in scheme', function() {
            var template = Template['extensions']('__context', {name: 'cool', include: 'inc1'});
            console.log(template.attributes);
            template.set({'include': 'inc2'});
            template.set({'include': 'inc3'});
            //template.set({'include': ['inc2', 'inc3']});
            console.log(template.attributes);

            var object = {name: 'cool', include: ['inc1', 'inc2', 'inc3']};
            return assert.deepEqual(template.attributes, object);
        });


        test('check not right object pass', function() {
            return assert.throws(function(){
                var object = {
                    name: 'Vasya', 
                    secret: '1234', 
                    norightattr: {key: 'value'}
                };
                var user = Template['users']('__user', object);
            }, Error);
        });


    });

}).call(this);
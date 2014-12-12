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

        test('check add attr to object', function() {
            var template = Template['extensions']('__context', {name: 'cool', include: 'inc1'});
            template.set({'include': 'inc2'});
            template.set({'include': 'inc3'});

            var object = {name: 'cool', include: ['inc1', 'inc2', 'inc3']};
            return assert.deepEqual(template.attributes, object);
        });

        test('check decline attr in scheme', function() {
            var template = Template['extensions']('__context', {name: 'cool', include: 'inc1'});         
            template.set({'include': ['inc2', 'inc3']});

            var object = {name: 'cool', include: ['inc1', 'inc2', 'inc3']};
            return assert.deepEqual(template.attributes, object);
        });

        test('check decline attr in scheme', function() {
            var template = Template['extensions']('__context', {name: 'cool', include: 'inc1'});         
            template.set('include', ['inc2', 'inc3']);

            var object = {name: 'cool', include: ['inc1', 'inc2', 'inc3']};
            return assert.deepEqual(template.attributes, object);
        });

        test('check decline attr in scheme', function() {
            var template = Template['extensions']('__context', {name: 'cool', include: 'inc1'});         
            template.set({'include': ['inc2', 'inc3']});
            template.set({'include': 'inc4'});
            template.set({'include': ['inc5', 'inc6']});
            template.set('include', 'inc7');
            template.set('exten', 'exten1');
            template.set({'exten': ['exten2', 'exten3']});
            template.set('exten', ['exten4', 'exten5']);


            var object = {
                name: 'cool', 
                include: ['inc1', 'inc2', 'inc3', 'inc4', 'inc5', 'inc6', 'inc7'],
                exten: ['exten1', 'exten2', 'exten3', 'exten4', 'exten5']
            };
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
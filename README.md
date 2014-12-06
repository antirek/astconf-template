astconf-template
================
Asterisk *.conf files templates

1. Create object with attributes 
> var object = {name: 'Vasya', secret: '1234'}

2. Add object to *.conf template
> var user = Conf.UserConf(object);

3. Get validated object in user.attributes and save it 
> user.attributes
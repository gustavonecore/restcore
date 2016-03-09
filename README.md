RESTCORE - Simple Rest Client
===================
This is a simple Jquery plugin for making calls against API services.

How to use
-------

    $.restCore('GET', 'http://jsonplaceholder.typicode.com/posts', null, function(error, response)
		{
			console.log('response', response);
			console.log('error', error);
		},
		{
			headers:[
				{header: 'x-access-token', value:'secret-language'}
			]
		});

**Documentation**
http://onecore.cl/restcore/restCore.html
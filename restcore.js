/**
 * Restcore
 * @external "jQuery.fn"
 */

/**
 * Restcore plugin
 * @function external:"jQuery.fn".restCore
 */
(function($)
{
	$.restCoreMiddleware = null;

	/**
	 * Make an HTTP request
	 *
	 * @class restCore
	 * @param {string}   method   - The HTTP method to use
	 * @param {string}   url      - The url of the endpoint
	 * @param {object}   query    - Used like query data or body data
	 * @param {callback} next     - Callback with the server response
	 * @param {object}   options  - JSon object with with options to setup e.g: the headers {header:'', value:''}
	 */
	$.restCore = function(method, url, query, next, options)
	{
		if (!method)
		{
			throw Error('You must define the HTTP method');
		}
		if (!url)
		{
			throw Error('You must define the url endpoint');
		}
		if (!next || !(next instanceof Function))
		{
			throw Error('You must define the [next] callback');
		}

		var middleware = $.restCoreMiddleware;

		$.ajax({
			data: query,
			beforeSend: function(xhr)
			{
				if (options && options.headers)
				{
					var headers = options.headers;
					for (var i in headers)
					{
						xhr.setRequestHeader(headers[i].header, headers[i].value);
					}
				}
			},
			url: url,
			crossDomain: true,
			dataType: "json",
			type: method.toUpperCase(),
			success: function (response)
			{

				if (middleware)
				{
					middleware(null, response, function()
					{
						next(null, response);
					});
				}
				else
				{
					next(null, response);
				}
			},
			error: function(xhr,status,error)
			{
				if (middleware)
				{
					middleware({error: error, xhr: xhr,status: status}, null, function()
					{
						next({
							error: error,
							xhr: xhr,
							status: status
						}, null);
					});
				}
				else
				{
					next({
						error: error,
						xhr: xhr,
						status: status
					}, null);
				}
			}
		});
	};

}(jQuery));
(function($)
{
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
				next(null, response);
			},
			error: function(xhr,status,error)
			{
				next({
					error: error,
					xhr: xhr,
					status: status
				}, null);
			}
		});
	};
}(jQuery));
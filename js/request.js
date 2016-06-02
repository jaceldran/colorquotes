/**
 * REQUEST POST/GET GENÉRICO - LLEVAR A lab/js
 */
var Request = {type: 'GET', dataType: 'json', async: true };
Request.send = function(url, args, callback){				
	callback = callback || function(){};
	$.ajax({
		url: url
		, type: Request.type
		, data: args
		, dataType: Request.dataType
		, async: Request.async
		, success: function(response, status, xhr) {
			callback(response);
		}
		, error: function(xhr, status, error){
			// de momento recargar 
			location.href = location.href;
			//alert(status + ' ' + error);
		}
	});	
};
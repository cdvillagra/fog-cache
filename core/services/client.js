/*
|--------------------------------------------------------------------------------
| Cache Fog - DVILLAGRA
|--------------------------------------------------------------------------------
|
| # This module is the client service, that consume the server service [REST]
|
|--------------------------------------------------------------------------------
|
| Module Client Service
|
| @package     service
| @subpackage  client 
| @author      Christopher Villagra - <christopher@dvillagra.com.br>
|
*/

module.exports = function() {

	//# require dependencies
	var assert 	= require('assert'),
		restify = require('restify'),
		vars 	= require('../constants/service'),
		merge	= require('merge'), original, cloned;
	
	//# create the pawl
	var service = restify.createJsonClient(vars.options);
 	
 	//# create objects of module
	var client = {

		/*
		|
	    | Get content page by keyword
	    |
	    | @author  	Christopher Villagra
	    | @param  	type[string]
	    | @param  	keyword[string]
	    | @param  	callback[function]
	    | @return  	undefined
	    |
		*/

	  	contentPage: function(type, keyword, callback){

	  		vars.params.keyword = keyword;

	  		//# Consume service
			service.post(vars.path, merge(vars.key,vars.params), function (err, req, res, obj) {

				//# Treat error if existing
				assert.ifError(err);

				//# Call function pass from argument
				callback(obj);

			});

	  	}

	}
	
	//# Return object created
	return client;
};
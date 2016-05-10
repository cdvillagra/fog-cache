/*
|--------------------------------------------------------------------------------
| Cache Fog - DVILLAGRA
|--------------------------------------------------------------------------------
|
| # This module is the main middleware, to execute before call the controllers
|
|--------------------------------------------------------------------------------
|
| Middleware Main
|
| @package     middleware
| @subpackage  main 
| @author      Christopher Villagra - <christopher@dvillagra.com.br>
|
*/

module.exports = function(app){

	//# Get module of Service
	var service = app.cliService();

	//# Require the module Merge, to merge objects
	var merge	= require('merge'), original, cloned;

	//# Initialize the variables to use on scope of the middleware
	var keyword;
	var internal;

	//# Return object
	var mainMiddleware = {

		/*
		|
		| Single method: check if the content exist on fog or on database, else get by service
		|
		| @author  	Christopher Villagra - <christopher@dvillagra.com.br>
	    | @param  	req[object]
	    | @param  	res[object]
	    | @param  	next[function]
	    | @return  	undefined
		|
		*/

		fog: function(req,res,next){

			//# Get functions object of model
			var single = app.models.main;

			//# Define the main as default keyword
			keyword = 'main';
			internal = null;

			//# Check if keyword parameter is passed on request
			if(typeof req.params.page != 'undefined')
				keyword = req.params.page;

			var localsKey = keyword;

			//# Check if internal parameter is passed on request
			if(typeof req.params.slug != 'undefined'){
			
				internal = req.params.slug;
				localsKey = keyword+'-'+internal;

			}

			//# Check if the content exist on Fog
			if(typeof app.locals[localsKey] != 'undefined'){

				//# LOG
				console.log('<fog_found> : True');

				//# Go to controller
				next();

			}else{

				//# Find a document from keyword in our database
				single.findOne({keyword:keyword,internal:internal},function(err,data){

					//# Check if exist de document
					if(!data || (data.length == 0)){

						//# LOG
						console.log('<page_found> : Empty');
						console.log('<service_start> : Keyword => ' + keyword);

						//# Consume se server service to get the content page
						service.contentPage('single',keyword,function(retorno){

							//# Check if existe response on service
							if(retorno.response){

								//# LOG
								console.log('<service_return> :');
								console.log(retorno);

								//# Add the response object on locals of application to use on fog
								var data_service = app.locals[localsKey] = {typePage:retorno.response.typePage,contentPage:retorno.response.contentPage};

								//# Go to controller
								next();

								//# Prepare the object to insertion on document
								var single = new app.models.main(merge({keyword:keyword},{internal:internal},data_service));

								//# Save document
								single.save(function (err) {

									//# Check if exist error
									if (err) {

										//# LOG
								    	console.log('<db_insert_content> : Fail');

								 	} else {

										//# LOG
										console.log('<db_insert_content> : Saved');

									}

								});

							}else{

								//# LOG
								console.log('<service_return> : Empty');

								//# Render the error message
								res.render('error', {varBlock: app.dataFront, error: {status:404,stack:'Not found on database and service'}});

							}

						});

					}else{

						//# LOG
						console.log('<page_found> : ');
						console.log(data);

						//# Add the response object on locals of application to use on fog
						app.locals[localsKey] = {keyword:keyword,typePage:data.typePage,contentPage:data.contentPage};

						//# Go to controller
						next();

					}

				});
			}

		},

	}

	//# Return object created
	return mainMiddleware;

}
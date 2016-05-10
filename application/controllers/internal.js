/*
|--------------------------------------------------------------------------------
| Cache Fog - DVILLAGRA
|--------------------------------------------------------------------------------
|
| # This controller is responsible for the rules of internal pages
|
|--------------------------------------------------------------------------------
|
| Controller Internal
|
| @package     controller
| @subpackage  internal 
| @author      Christopher Villagra - <christopher@dvillagra.com.br>
|
*/

module.exports = function(app){

	//# Initialize the variables to use on scope of the controller
	var action;
	var internal;
	var content;
	var localsKey;

	//# Return object
	var internalController = {

		/*
		|
		| Constructor method
		|
		| @author  	Christopher Villagra - <christopher@dvillagra.com.br>
	    | @param  	req[object]
	    | @param  	res[object]
	    | @return  	undefined
		|
		*/

		construct: function(req,res){

			//# Set 'main' as default page
			action = 'main';

			//# Check if page parameter is passed on request
			if(typeof req.params.page != 'undefined')
				action = req.params.page;

			//# Check if page parameter is passed on request
			if(typeof req.params.slug != 'undefined')
				internal = req.params.slug;

			localsKey = action+'-'+internal;
			
			//# Execute the method
			internalController[action](req,res);

		},

		/*
		|
		| Render main page
		|
		| @author  	Christopher Villagra - <christopher@dvillagra.com.br>
	    | @param  	req[object]
	    | @param  	res[object]
	    | @return  	view
		|
		*/

		news: function(req,res){

			//# Get content object saved on fog
			var content = app.locals[localsKey];

			//# Check if the content is html or object
			if(content.typePage == "html"){
				
				//# Show html
				res.send(content.contentPage);

			}else{

				//# Render page passing object as parameter
				res.render('news', {varBlock: app.dataFront});

			}

		},

	}

	//# Return object created
	return internalController;

}
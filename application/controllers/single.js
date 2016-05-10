/*
|--------------------------------------------------------------------------------
| Cache Fog - DVILLAGRA
|--------------------------------------------------------------------------------
|
| # This controller is responsible for the rules of single pages
|
|--------------------------------------------------------------------------------
|
| Controller Single
|
| @package     controller
| @subpackage  single 
| @author      Christopher Villagra - <christopher@dvillagra.com.br>
|
*/

module.exports = function(app){

	//# Initialize the variables to use on scope of the controller
	var action;
	var content;

	//# Return object
	var singleController = {

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
			
			//# Execute the method
			singleController[action](req,res);

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

		main: function(req,res){

			//# Get content object saved on fog
			var content = app.locals[action];

			//# Check if the content is html or object
			if(content.typePage == "html"){
				
				//# Show html
				res.send(content.contentPage);

			}else{

				//# Render page passing object as parameter
				res.render('index', {varBlock: app.dataFront});

			}

		},

		/*
		|
		| Render contact page
		|
		| @author  	Christopher Villagra - <christopher@dvillagra.com.br>
	    | @param  	req[object]
	    | @param  	res[object]
	    | @return  	view
		|
		*/

		contact: function(req,res){

			//# Render page
			res.render('contact', {varBlock: app.dataFront});

		},

	}

	//# Return object created
	return singleController;

}
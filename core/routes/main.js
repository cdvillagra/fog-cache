/*
|--------------------------------------------------------------------------------
| Cache Fog - DVILLAGRA
|--------------------------------------------------------------------------------
|
| # This module is responsable to routes of the application
|
|--------------------------------------------------------------------------------
|
| Routes Main
|
| @package     rountes
| @subpackage  main 
| @author      Christopher Villagra - <christopher@dvillagra.com.br>
|
*/

module.exports = function(app) {

  //# get functions object of single and internal controllers
  var single 	  = app.controllers.single;
  var internal 	= app.controllers.internal;
 
  //# get functions object of main middleware
  var mid 		  = app.middleware.main;

  //# First we call the middleware functions to do the magic
  app.get('/',mid.fog);
  app.get('/:page',mid.fog);
  app.get('/:page/:slug',mid.fog);

  //# Call the construct functions to the application continue executing after execute the middlewares
  app.get('/',single.construct);
  app.get('/:page',single.construct);
  app.get('/:page/:slug',internal.construct);
  
};
/*
|--------------------------------------------------------------------------------
| Cache Fog - DVILLAGRA
|--------------------------------------------------------------------------------
|
| # Model to use our database
|
|--------------------------------------------------------------------------------
|
| Model Main
|
| @package     model
| @subpackage  main 
| @author      Christopher Villagra - <christopher@dvillagra.com.br>
|
*/

module.exports = function(app){

	//# Require the mongoose module to treat data of database
	var mongoose = require('mongoose');

	//# Variable created to make the schema acoording to mongoose rule
	var Schema = mongoose.Schema;

	//# Make skema acoording the use on application
	var singleSchema = new Schema({

	  keyword: String,
	  internal: String,
	  typePage: String,
	  contentPage: Object

	});

	//# Return the model ready to use
	return mongoose.model('single', singleSchema);

}
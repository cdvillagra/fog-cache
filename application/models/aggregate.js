
// //First let's create the Schemas:
// // Record Schema
// var Record = new Schema({
//     amount: { type: Number, required: true },
//     date: { type: Date, required: true },
//     description: { type: String }
// })
 
// // Account Schema
// var Account = new Schema({
//     name: { type: String, required: true },
//     currency: { type: String, required: true },
//     created: { type: Date, default: Date.now },
//     records: [Record]
// });
 
// //Define Models
// var AccountModel = mongoose.model('Account', Account);
// var RecordModel = mongoose.model('Record', Record);
// var ObjectId = require('mongoose').Types.ObjectId;
 
// // Utility functions to insert data:
// var insertAccount = function(account, callback) {
// 	var Account = new AccountModel();
// 	Account.name = account.name;
// 	Account.currency = account.currency;
// 	Account.records = [];
 
// 	Account.save(function(err) {
// 		if (err) {
// 			console.log(err);
// 			return null;
// 		}
 
// 		return callback(Account._id);
// 	});
// }
 
 
// var insertRecords = function(accountId, record, numberOfRecords, callback) {
// 	AccountModel.findOne({_id:accountId}, function(err, account) {
// 		if (err) {
// 			console.log(err);
// 			return ;
// 		}
 
//  		for (var i = 0; i < numberOfRecords; i++) {
// 			var Record = new RecordModel();
// 			Record.amount = record.amount;
// 			Record.date = new Date();
// 			Record.is_expense = record.is_expense;
	 
// 			account.records.push(Record);
// 		}
 
// 		account.save(function(err2) {
// 			if (err2) {
// 				console.log(err2);
// 			}

// 			return callback();
// 		});
// 	});
// }
 
// var listAccounts = function() {
// 	var query = AccountModel.find();
 
// 	query.exec(function(err, accounts) {
// 		if (err) {
// 			console.log(err);
// 		}
 
// 		console.log(accounts);
// 	});
// }

// var listAccount = function(id) {
// 	if (id == null) {
// 		return ;
// 	}

// 	var query = AccountModel.find({_id:id});
// 	query.field('_id name currency date');
 
// 	query.exec(function(err, accounts) {
// 		if (err) {
// 			console.log(err);
// 		}
 
// 		console.log(accounts);
// 	});
// }
 
// var removeAccount = function(accountId) {
// 	var query = AccountModel.findOne({_id:accountId});
 
// 	query.exec(function(err, account) {
// 		if (err) {
// 			console.log(err);
// 			return ;
// 		}
 
// 		account.remove();
// 	});
// }

 
// //Aggregation function
// var getBalance = function(accountId) {
//     AccountModel.aggregate([
//         { $match: {
//             _id: accountId
//         }},
//         { $unwind: "$records" },
//         { $group: {
//             _id: "$_id",
//             balance: { $sum: "$records.amount"  }
//         }}
//     ], function (err, result) {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         console.log(result);
//     });
// }
 

// //Let's add some data and call the getBalance fucntion
// insertAccount({name:"First Account", currency: "Dollar"}, function(accountId) {
// 	if (accountId == null) {
// 		console.log("accountId is null");
// 		return ;
// 	}

// 	insertRecords(accountId, {amount:123.5}, 1000, function() {
// 		getBalance(accountId);
// 	});
// });
//  
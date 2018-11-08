var mongoose = require('mongoose')
var crypto = require('crypto')
var User = require('./modules/Users.js');
mongoose.Promise = require('bluebird');
mongoose.connect("mongodb://localhost:27017/blackjack", { useMongoClient: true});


// User API

exports.createUser = function(userData){
	var user = {
		name: userData.name,
		email: userData.email,
		pass: hash(userData.pass)
	}
	
	return new User(user).save((err)=>{
		mongoose.disconnect();
		if(err) return console.log(err);
	});
}

exports.getUser = function(name) {
	
	return User.findOne(name).then((doc)=>{
		return Promise.resolve(doc);
	});
}

exports.checkUser = function(userData) { 
	return User
		.findOne({name: userData.name})
		.then(function(doc){
			if ( doc.pass == hash(userData.pass) ){
				console.log("User password is ok");
				return Promise.resolve(doc);
			} else {
				return false; 
			}
		})
}

exports.updateUser = function(data){
	return User.findOneAndUpdate({name: data.user}, {bet: data.bet}, (err, result)=>{
		if (err) throw err;
		console.log(result);
	});
}

function hash(text) {
	return crypto.createHash('sha1')
	.update(text).digest('base64')
}
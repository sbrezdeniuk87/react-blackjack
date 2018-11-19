const mongoose = require('mongoose');
const crypto = require('crypto');
const User = require('./module/Users.js');
const objectId = require("mongodb").ObjectID;
mongoose.Promise = require('bluebird');
mongoose.connect("mongodb://localhost:27017/black_jack", { useNewUrlParser: true }); 
mongoose.set('useCreateIndex', true);


// User API

exports.createUser = function(userData){
	let user = {
		name: userData.name,
		email: userData.email,
		password: hash(userData.password)
	}

	console.log(user);
	
	return new User(user).save()
		.then(()=>{
			// function(err){
				mongoose.disconnect();
				console.log("User create");
				// if(err) return console.log(err);
			// }
			return true;
		})
		.catch(()=> {return false});
}


exports.checkUser = function(userData) { 
	return User
		.findOne({email: userData.email})
		.then((doc)=>{
			if(doc){
				if ( doc.password == hash(userData.password) ){
					console.log("User password is ok");
					return Promise.resolve(doc);
				} else {
					return false; 
				}
			}else{				
				return false; 
			}			
		}).catch(()=>{
			return false;
		});
}

exports.checkUserId = function(userId) { 
	return User
		.findOne({"_id": new objectId(userId)})
		.then(function(doc){
			if (doc){
				return Promise.resolve(doc);
			} else {
				return false; 
			}
		})
}

exports.updateUser = function(data){
	return User.findOneAndUpdate({"_id": new objectId(data.userUpdate)}, {bet: data.cash}, (err, result)=>{
		if (err) throw err;
		console.log(result);
	});
}

function hash(text) {
	return crypto.createHash('sha1')
	.update(text).digest('base64')
}
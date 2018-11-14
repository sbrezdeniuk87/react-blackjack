const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = new Schema({
    name : {
        type: String,       
        required: true
    },
    email : {
        type: String,        
        unique: true, 
        required: true
    },
    password : {
        type: String,
        required: true
    },
    bet: { 
    	type: Number, 
    	default: 1500
    },
});

module.exports = mongoose.model('User', User);
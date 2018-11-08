const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = new Schema({
    name : {
        type: String,
        unique: true,        
        required: true
    },
    email : {
        type: String,
        required: true
    },
    pass : {
        type: String,
        required: true
    },
    bet: { 
    	type: Number, 
    	default: 1500
    },
});

module.exports = mongoose.model('User', User);
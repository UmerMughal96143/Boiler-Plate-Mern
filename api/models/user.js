const mongoose  = require('mongoose');

const UserSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    isAdmin : {
        type : Boolean,
        required : true ,
        default : false
    }
    
} , {timestamps : true})

module.exports = User = mongoose.model('user', UserSchema)
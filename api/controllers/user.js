const User = require('../models/user');
const {validationResult} = require('express-validator')
const bcrypt  = require('bcrypt');
const jwt  = require('jsonwebtoken');


exports.postUser = async(req , res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errros : errors.array()})
    }

    const {name , email , password} = req.body;

    

    try {
        let user = await User.findOne({email}).select('-password');
    if(user){
        return res.status(400).json({errors : [{msg : 'User Already Exist'}]})
    }
    user = new User({
        name,
        email,
        password
    })

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password , salt);

    await user.save();
    
    const payload = {
        user : {
            id : user.id,
            name : user.name,
            isAdmin : user.isAdmin
        }
    }
    jwt.sign(payload , process.env.JWT_KEY , {
        expiresIn : 360000
    } ,
    
    (err , token) => {
        if(err) throw err ;
        res.json({token , user})

    }
    )
    } catch (err) {
        
        console.log(err);
        return res.status(500).json('Server Error')
    }

}
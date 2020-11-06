const { validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');









exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if(user){
      user.name = req.body.name || user.name ;
      user.email = req.body.email || user.email ;
    }
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
};


exports.updatePostUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if(user){
      user.name = req.body.name || user.name ;
      user.email = req.body.email || user.email ;
    }
    if(req.body.password){
      const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(req.body.password , salt);

    await user.save();
    
    }
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
};

exports.postUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    console.log(req.body);
    const { email, password } = req.body;
    let user =await User.findOne({email})
    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ msg: "Enter Email or password is incorrect" });
    }

    const payload = {
      user: {
          id : user.id ,
          name : user.name,
          isAdmin : user.isAdmin
      },
    };

    jwt.sign(payload , process.env.JWT_KEY , {
        expiresIn : 360000
    } , (
        err , token
    ) => {
        if(err) throw err;
        res.json({token , user})
    })
  } catch (err) {
      console.log(err)
      res.status(500).json('Server Error')
  }
};

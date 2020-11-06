const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const userController = require('../controllers/user');




router.post('/' , [
    check('name' , 'Name is required').not().isEmpty(),
    check('email' , 'Email is Required').isEmail() ,
    check('password' , 'Enter password that contains 6 or more characters').isLength({min : 6})
], userController.postUser )





module.exports = router ;
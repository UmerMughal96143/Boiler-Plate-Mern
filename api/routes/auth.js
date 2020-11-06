const express = require('express')
const router = express.Router();
const  { check } = require('express-validator');
const Auth = require('../middleware/authentication');
const authControoler = require('../controllers/auth');






router.get('/' , Auth , authControoler.getUser )
router.post('/update' , Auth , authControoler.updatePostUser )

router.post('/' , [
    check('email' , ' Please enter Valid Email').isEmail(),
    check('password' , 'Password should be 6 or more characters').isLength({min : 6})
    
] , authControoler.postUser )



module.exports = router ;
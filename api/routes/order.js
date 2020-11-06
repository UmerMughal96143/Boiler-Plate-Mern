const express = require('express');
const router = express.Router();
const Auth = require('../middleware/authentication');
const orderController = require('../controllers/order');







router.post('/' , Auth , orderController.postOrder )




module.exports = router ;
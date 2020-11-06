const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const Auth = require('../middleware/authentication');
const isAdmin = require('../middleware/role');
const productController = require('../controllers/product');





router.post('/' , [
    check('name' , 'Name is required').not().isEmpty(),
    check('brand' , 'Brand is required').not().isEmpty(),
    check('image' , 'Image is required').not().isEmpty(),
    check('category' , 'Category is required').not().isEmpty(),
    check('description' , 'Description is required').not().isEmpty(),
    check('rating' , 'Rating is required').not().isEmpty(),
    check('numReviews' , 'Number Of Reviews is required').not().isEmpty(),
    check('price' , 'Price is required').not().isEmpty(),
    check('countInStock' , 'Count In Stock is required').not().isEmpty(),
] , Auth , isAdmin , productController.postProduct )


router.get('/' , productController.getAllProducts)


router.get('/:id' , productController.getProductById)



module.exports = router ;
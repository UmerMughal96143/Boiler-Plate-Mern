const { validationResult } = require("express-validator");
const Product = require("../models/product");





//POST A PRODUCT

//http://localhost:5000/api/products

//POST REQUEST


exports.postProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {
      name,
      brand,
      image,
      category,
      description,
      rating,
      numReviews,
      price,
      countInStock,
    } = req.body;


    const newProduct = {
        name,
        brand,
        image,
        category,
        description,
        rating,
        numReviews,
        price,
        countInStock,
        user:req.user.id
    }
    
    let product =await new Product(newProduct)

    await product.save();

    res.status(201).json(product)

  } catch (err) {
    console.log(err);
    return res.status(500).json("Server Error");
  }
};

//GET ALL PRODUCTS

//http://localhost:5000/api/products

//GET REQUEST


exports.getAllProducts = async(req  , res) => {

    try {
        
        let products = await Product.find();

        res.status(200).json(products);

    } catch (err) {
        
    }
}




//GET PRODUCT BY PRODCUT ID 

//http://localhost:5000/api/products/:id

//GET REQUEST


exports.getProductById = async (req , res) => {

    
    try {
        
        const product = await Product.findById({_id : req.params.id})
        
        if(product){
            return res.status(200).json({product})
        }

        res.status(404).json({msg : 'Product not Found'})

    } catch (err) {
        console.log(err)
        res.status(500).json('Server Error')
    }

}














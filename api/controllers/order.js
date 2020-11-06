const mongoose = require("mongoose");
const Order = require("../models/order");

exports.postOrder = async (req, res) => {
    console.log(req.body);
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
    taxPrice,
  } = req.body;

  if(orderItems && orderItems.length === 0){
      res.status(400)
      throw new Error('No orders found')
      return
  }
  else {
      const order = new Order({
        orderItems,
        user : req.user.id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice,
        taxPrice,
      })

      const createOrder = await order.save();

      res.status(201).json(createOrder);
  }
};

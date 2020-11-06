import axios from "axios";

export const cartItemsList = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
  console.log(data);

  dispatch({
    type: "ADD_CART_ITEM",
    payload: {
      product: data.product._id,
      name: data.product.name,
      image: data.product.image,
      countInStock: data.product.countInStock,
      price: data.product.price,
      qty,
    },
  });

  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().CartState.cartItems)
  );
};

export const removeCartItem = (id) => (dispatch, getState) => {
  dispatch({
    type: "REMOVE_CART_ITEM",
    payload: id,
  });
  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().CartState.cartItems)
  );
};





export const UserShippingAddress = (data) => async (dispatch) => {

  dispatch({ type: "CART_SAVE_SHIPPING_ADDRESS"  , payload : data});

  localStorage.setItem(
    "shippingAddress",
    JSON.stringify(data)
  );
};





export const SavePaymentDetails = (data) => async (dispatch) => {

  dispatch({ type: 'PAYMENT_METHOD_DETAILS'  , payload : data});

  localStorage.setItem(
    "paymentMethod",
    JSON.stringify(data)
  );
};


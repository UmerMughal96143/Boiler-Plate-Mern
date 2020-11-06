import React, { useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../Message";
import CheckoutState from "../ChekoutState";
import { Link } from "react-router-dom";
import {CreateOrder} from '../../actions/order';


const PlaceOrderScreen = ({history}) => {
  const cart = useSelector((state) => state.CartState);
  const { shippingAddress } = cart;
  const createOrder = useSelector((state) => state.OrderState);
  const { order , success , loading } = createOrder;
  const dispatch = useDispatch();


  const addDecimal =(num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
  }

  cart.itemsPrice = cart.cartItems.reduce((acc , item) => acc + item.price * item.qty , 0)
  cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 100 ;
  cart.taxPrice = addDecimal(Number((0.15 * cart.itemsPrice).toFixed(2)))
  cart.TotalPrice = Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice);
  useEffect(()=> {
    if(success){
      history.push(`/order/${order._id}`)
    }
  } , [dispatch , success])

  const placeOrderHandler= () => {
      dispatch(CreateOrder({
        orderItems : cart.cartItems,
        shippingAddress : cart.shippingAddress,
        paymentMethod : cart.paymentMethod,
        itemsPrice : cart.itemsPrice,
        shippingPrice : cart.shippingPrice,
        taxPrice : cart.taxPrice ,
        totalPrice : cart.TotalPrice
      }))
  }

  return (
    <>
      <CheckoutState step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address : </strong>
                {shippingAddress.address} , {shippingAddress.city} ,{" "}
                {shippingAddress.postalCode} , {shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method :</strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>

            <h2>Order Items</h2>
            {cart.cartItems.length === 0 ? (
              <Message variant="danger">Your cart is Empty ...</Message>
            ) : (
              <ListGroup variant="flush">
                {cart.cartItems.map((item, ind) => (
                  <ListGroup.Item key={ind}>
                    <Row>
                      <Col md={1}>
                        <Image
                          src={item.image}
                          item={item.name}
                          fluid
                          rounded
                        />
                      </Col>
                      <Col>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={4}>
                        {item.qty} x ${item.price} = ${item.qty * item.price}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
                        </ListGroup.Item>

          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <h2>Order Sumamry</h2>
            </ListGroup>
            <ListGroup.Item>
              <Row>
                <Col>Items</Col>
                <Col>${cart.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>
                <Col>${cart.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col>${cart.taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total Price</Col>
                <Col>${cart.TotalPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button type='button' className='btn btn-block' disabled={cart.cartItems.length === 0} onClick={placeOrderHandler}>
                    Place Order
              </Button>
            </ListGroup.Item>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;

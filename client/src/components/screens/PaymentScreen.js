import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import FormContainer from "../FormContainer";
import { useSelector, useDispatch } from "react-redux";
import CheckoutState from "../ChekoutState";
import {SavePaymentDetails} from '../../actions/cart';

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.CartState);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethode, setPaymentMethode] = useState("PayPal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(SavePaymentDetails(paymentMethode));
    history.push("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutState step1 step2 step3/>
      <h2>Payment Method</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
        </Form.Group>
        <Col>
          <Form.Check
            type="radio"
            label="PayPal or Credit Card"
            id="PayPal"
            name="paymentMethod"
            value="PayPal"
            checked
            onChange={(e) => setPaymentMethode(e.target.value)}
          ></Form.Check>
          <Form.Check
            type="radio"
            label="Stripe"
            id="Stripe"
            name="paymentMethod"
            value="Stripe"
            onChange={(e) => setPaymentMethode(e.target.value)}
          ></Form.Check>
        </Col>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;

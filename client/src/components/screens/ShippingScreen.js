import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../FormContainer";
import { useSelector, useDispatch } from "react-redux";
import { UserShippingAddress } from "../../actions/cart";
import CheckoutState from "../ChekoutState";

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.CartState);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(UserShippingAddress({ address, city, postalCode, country }));
    history.push("/payment");
  };

  return (
    <FormContainer>
      <CheckoutState step1 step2 />
      <h2>Shipping</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="address"
            placeholder="Enter Address"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            onChange={(e) => setCity(e.target.value)}
            value={city}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Postal Code"
            onChange={(e) => setPostalCode(e.target.value)}
            value={postalCode}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="country">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Country"
            onChange={(e) => setCountry(e.target.value)}
            value={country}
            required
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;

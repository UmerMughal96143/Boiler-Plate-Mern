import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../actions/auth";
import FormContainer from '../FormContainer'
import Message from '../Message';



export const Login = ({ location, history }) => {
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState("");
  const redirect = location.search ? location.search.split("=")[1] : "/";
  console.log(redirect)
  const { user, error, loading } = useSelector((state) => state.AuthState);
  const dispatch = useDispatch();
  console.log(email,password)

  useEffect(() => {
    if (user) {
      history.push(redirect);
    }
  }, [history, redirect, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
    
  };

  return (
    <FormContainer>
      <h1>SignIn</h1>
      { error && <Message variant='danger'>Invalid Credentials</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          >
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          >
          </Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          {" "}
          Sign In
        </Button>
      </Form>
      <Row>
        <Col>
        
          <Link
            to='/register'
          >New Customer?{" "}</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};


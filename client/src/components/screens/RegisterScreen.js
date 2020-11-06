import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Spinner } from "../Spinner";
import { RegisterUser } from "../../actions/auth";
import FormContainer from '../FormContainer'
import Message from '../Message';

export const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msgError, setMessage] = useState(null);
  const { user, error, loading } = useSelector((state) => state.AuthState);

  const redirect = location.search ? location.search.split("=")[1] : "/";
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      history.push(redirect);
    }
  }, [history, redirect, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
        setMessage('Password dont Match') 
        return false ;
    }
    dispatch(RegisterUser(name ,email, password));

    
  };



  return (
    <FormContainer>
      <h1>Register</h1>
      {msgError && <Message variant='danger'>Password dont Match</Message>}
      <Form onSubmit={submitHandler}>
      <Form.Group controlId="email">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          >
          </Form.Control>
        </Form.Group>
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
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          >
          </Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          {" "}
          
          Register
        </Button>
      </Form>
      <Row>
        <Col>
          Are you Register ?{" "}
          <Link
            to={redirect ? `/login?redirect=${redirect}` : "/login"}
          ></Link>
        </Col>
      </Row>
    </FormContainer>
  );
};


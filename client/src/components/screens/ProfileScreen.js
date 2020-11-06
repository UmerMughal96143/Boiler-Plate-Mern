import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { GetUserDetails ,UpdateUserDetails } from "../../actions/auth";
import Message from '../Message';


export const ProfileScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msgError, setMessage] = useState(null);



  const userDetail = useSelector((state) => state.UserProfileState);
  const { profileUser, error, loading } = userDetail ;

  const userInfo = useSelector((state) => state.AuthState);
  const { user } = userInfo ;

  const userInformation = useSelector((state) => state.UpdateProfileState);
  const { success } = userInformation ;

    
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      history.push('/login');
    }else {
        if(!profileUser.name) {

            dispatch(GetUserDetails())
        }else {
            setName(profileUser.name);
            setEmail(profileUser.email)
        }
        
    }
    
  }, [dispatch , history , userInfo , profileUser ]);

 

  const submitHandler = (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
        setMessage('Password dont Match') 
        return false ;
    }
    dispatch(UpdateUserDetails({name : name , email : email , password : password }))
    

    
  };



  return (
    <Row>
        <Col md={3}>
        <h2>Profile</h2>
      {msgError && <Message variant='danger'>{msgError}</Message>}
      {success && <Message variant='success'>Profile Updated</Message>}
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
          
         Update
        </Button>
      </Form>
        </Col>
        <Col md={9}>
            <h1>Orders of mine </h1>
        </Col>
    </Row>
  );
};


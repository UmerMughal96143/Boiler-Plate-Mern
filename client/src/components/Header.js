import React from "react";
import { Navbar, Nav, Container, NavDropdown, Dropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {logoutuser} from '../actions/auth';

const Header = ({history}) => {
  const dispatch = useDispatch();

  
  const data = useSelector((state) => state.AuthState);
  const {user} = data
  



  const logoutHandler = () => {
    dispatch(logoutuser());
    history.push('/')
  }

  

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Proshop</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i>Cart
                </Nav.Link>
              </LinkContainer>
              {user ? (
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic">
                    {user.user.name }
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <LinkContainer to='/profile'>
                    
                    <Dropdown.Item >Profile</Dropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/'>
                    
                    <Dropdown.Item onClick={logoutHandler} >Logout</Dropdown.Item>
                    </LinkContainer>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i>Signin
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

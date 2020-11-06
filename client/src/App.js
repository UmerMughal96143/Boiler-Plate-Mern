import React from "react";
import {Container}  from "react-bootstrap";
import { BrowserRouter as Router , Route } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreens from './components/screens/HomeScreens';
import ProductScreen from './components/screens/ProductScreen';
import CartScreen from './components/screens/CartScreen';
import {Login} from './components/screens/LoginScreen';
import {RegisterScreen} from './components/screens/RegisterScreen';
import {ProfileScreen} from './components/screens/ProfileScreen';
import ShippingScreen from './components/screens/ShippingScreen';
import PaymentScreen from './components/screens/PaymentScreen';
import PlaceOrderScreen from './components/screens/PlaceOrderScreen';







function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          
          <Route exact  path ='/' component={HomeScreens} />
          <Route exact  path ='/shipping' component={ShippingScreen} />
          <Route exact  path ='/placeorder' component={PlaceOrderScreen} />
          <Route exact  path ='/payment' component={PaymentScreen} />
          <Route exact  path ='/login' component={Login} />
          <Route exact  path ='/product/:id' component={ProductScreen} />
          <Route exact path='/cart/:id?' component={CartScreen} />
          <Route exact path='/register' component={RegisterScreen} />
          <Route exact path='/profile' component={ProfileScreen} />
        </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;

import {createStore , applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';


const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userinfoFromLocalStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
const shippingAddressFromLocalStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}
const paymentMethodFromLocalStorage = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : null




const intialState = {
    CartState : { cartItems : cartItemsFromStorage , shippingAddress : shippingAddressFromLocalStorage , paymentMethod : paymentMethodFromLocalStorage},
    AuthState : {user : userinfoFromLocalStorage},
};

// MIDDLEWARE
const middleware = [thunk];

const store = createStore(
    rootReducer,
    intialState,
    composeWithDevTools(applyMiddleware(...middleware))
)


export default store ;
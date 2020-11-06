import {combineReducers} from 'redux';
import { ProductState  , ProductDetailState} from './product';
import { CartState } from './cart';
import {AuthState , UserProfileState,UpdateProfileState } from './auth';
import {OrderState} from './order';



export default combineReducers({
    ProductState,
    ProductDetailState,
    CartState,
    AuthState,
    UserProfileState,
    UpdateProfileState,
    OrderState
});
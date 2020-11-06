const initialCartState= {
    cartItems : [],
    shippingAddress : {},
    paymentMethod : null
}


export const CartState = (state=initialCartState , action) => {

    const {type , payload} = action ;
    switch(type) {
        case  'ADD_CART_ITEM' :
            const item = payload ;
            const existItem = state.cartItems.find(x => x.product === item.product) ;
            if(existItem){

                return{
                    ...state,
                    cartItems : state.cartItems.map(x => x.product=== existItem.product ? item : x)
                }

            }else{
                return{
                    ...state,
                    cartItems : [...state.cartItems , item]
                }
            }
            
            case 'REMOVE_CART_ITEM' : 
            return{
                ...state,
                cartItems : state.cartItems.filter((x) => x.product !== payload)
            }
            case "CART_SAVE_SHIPPING_ADDRESS" :
                return{
                    ...state ,
                    shippingAddress : payload 
                }
            case 'PAYMENT_METHOD_DETAILS' :
                return {
                    ...state,
                    paymentMethod : payload
                }

        default : 
        return state
    }


}


export const  OrderState = (state={} , action) => {
    const {type , payload} = action ;
    switch(type) {

        case 'CREATE_ORDER_REQUEST' :
            return {
               ...state , loading : true 
            }
        case 'CREATE_ORDER_SUCCESS' :
            return {
                loading : false , 
                success : true ,
                order : payload
            }
        case 'CREATE_ORDER_FAIL' :
            return {
                loading : false ,
                error : payload
            }
        default : 
        return state ;
    }
}
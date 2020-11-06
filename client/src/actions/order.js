import axios from 'axios';




export const CreateOrder  = (order) => async(dispatch , getState) => {
    console.log(order)
    try {
        
        dispatch({
            type : 'CREATE_ORDER_REQUEST',
        })
 
        const token = getState().AuthState.user.token
        const config = {
            headers : {
                'Content-Type' : 'application/json',
                Authorization : `Bearer ${token}`
            }
        }
        console.log(config)
 
        const {data} = await axios.post(`http://localhost:5000/api/orders` , order, config)
 
        dispatch({
            type : 'CREATE_ORDER_SUCCESS' ,
            payload : data
        })
     } catch (err) {
         dispatch({
             type : 'CREATE_ORDER_FAIL',
             payload : err.data
         })
     }
 
}
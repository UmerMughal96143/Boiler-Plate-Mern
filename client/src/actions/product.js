import axios from 'axios';

export const getAllProducts =   () =>async dispatch => {

    
    
    try {
        
            dispatch({type : 'PRODUCT_LIST_REQUEST'});
        
            const {data} = await axios.get('http://localhost:5000/api/products') ;
            
            dispatch({type : 'PRODUCT_LIST_SUCCESS' , payload : data})
        
    } catch (err) {
        
        dispatch({type : 'PRODUCT_LIST_FAIL' , payload : err.response})

    }

}






export const getProductById =   (id) =>async dispatch => {

    
    
    try {
        
            dispatch({type : 'PRODUCT_DETAIL_REQUEST'});
        
            const {data} = await axios.get(`http://localhost:5000/api/products/${id}`) ;
            
            dispatch({type : 'PRODUCT_DETAIL_SUCCESS' , payload : data.product})
        
    } catch (err) {
        
        dispatch({type : 'PRODUCT_DETAIL_FAIL' , payload : err.response})

    }

}
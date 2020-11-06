const initialState = {
    products: [],
    loading: true,
    error : {},
};


const productDetailState = {
    
    product : { reviews : []},
    pLoading : true ,
    pError : {}
}


export const ProductState = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'PRODUCT_LIST_REQUEST':
            return { loading: true, products: [] }
        case 'PRODUCT_LIST_SUCCESS' : 
        return {
            loading : false , products : payload
        }
        case 'PRODUCT_LIST_FAIL' : 
        return {
            loading : false , error : payload
        }
        default :
        return state ;
    }


}



export const ProductDetailState = (state = productDetailState, action) => {
    const { type, payload } = action;
    switch (type) {
       
        case 'PRODUCT_DETAIL_REQUEST':
            return { pLoading: true , ...state}
        case 'PRODUCT_DETAIL_SUCCESS' : 
        return {
            pLoading : false , product : payload
        }
        case 'PRODUCT_DETAIL_FAIL' : 
        return {
            pLoading : false , pError : payload
        }
        default :
        return state ;
    }


}
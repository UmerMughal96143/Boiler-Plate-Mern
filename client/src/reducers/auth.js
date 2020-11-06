
const authInitialState = {
loading : true ,
user : {},
error : {}
}

export const AuthState = (state = authInitialState , action) => {
    const {type , payload} = action ;

    switch(type){
        case 'USER_LOGIN_REQUEST' :
            return{
                loading : true 
            }

        case 'USER_LOGIN_SUCCESS' : 
        return{
            loading : false , user : payload
        }
        case 'USER_LOGIN_FAIL' : 
        return{
            loading : false , error : payload
        }
        case 'USER_REGISTER_REQUEST':
            return {
                    loading  : true 
            }
            case 'USER_REGISTER_SUCCESS' : 
        return {
            loading : false , user : payload
        }
        case 'USER_REGISTER_FAIL' : 
        return {
            loading : false , error : payload 
        }
        default : 
        return state ;
    }
}



export const UserProfileState = (state = {profileUser : {} } , action) => {
    const {type , payload} = action ;
    switch(type){
        case 'USER_DETAIL_REQUEST' :
            return{
                ...state , loading : true 
            }
            case 'USER_DETAIL_SUCCESS' :
            return{
                loading : false , profileUser : payload
            }
            case 'USER_DETAIL_FAIL' :
            return{
                loading : false , error : payload 
            }
            default : 
            return state;
    }
}


export const UpdateProfileState = (state = {} , action) => {
    const {type , payload} = action ;
    switch(type){
        case 'USER_UPDATE_PROFILE_REQUEST' :
            return{
                loading : true 
            }
            case 'USER_UPDATE_PROFILE_SUCCESS' :
            return{
                loading : false , userInfo : payload , success : true
            }
            case 'USER_UPDATE_PROFILE_FAIL' :
            return{
                loading : false , error : payload 
            }
            default : 
            return state;
    }
}
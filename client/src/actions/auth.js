import axios from 'axios';

export const loginUser = (email , password) => async (dispatch ) => {
    console.log(email , password)

     try {
         
        dispatch({
            type : 'USER_LOGIN_REQUEST',
        })

        const config = {
            headers : {
                'Content-Type' : 'application/json'
            }
        }

        const {data} = await axios.post(`http://localhost:5000/api/auth`, {email , password} , config)

        dispatch({
            type : 'USER_LOGIN_SUCCESS' ,
            payload : data
        })
        localStorage.setItem('user' , JSON.stringify(data))
     } catch (err) {
         dispatch({
             type : 'USER_LOGIN_FAIL',
             payload : err
         })
     }


}

export const logoutuser = () => dispatch => {

    localStorage.removeItem('user')
    dispatch({
        type : 'LOGOUT_SUCCESSFULLY'
    })
}




export const RegisterUser = (name, email , password) => async (dispatch ) => {

     try {
         
        dispatch({
            type : 'USER_REGISTER_REQUEST',
        })

        const config = {
            headers : {
                'Content-Type' : 'application/json'
            }
        }

        const {data} = await axios.post(`http://localhost:5000/api/user`, {name ,email , password} , config)

        dispatch({
            type : 'USER_REGISTER_SUCCESS' ,
            payload : data
        })
        localStorage.setItem('user' , JSON.stringify(data))
     } catch (err) {
         dispatch({
             type : 'USER_REGISTER_FAIL',
             payload : err.response
         })
         console.log(err.response)
     }


}



export const GetUserDetails= (id) => async (dispatch , getState ) => {

    try {
        
       dispatch({
           type : 'USER_DETAIL_REQUEST',
       })

       const token = getState().AuthState.user.token
       const config = {
           headers : {
               'Content-Type' : 'application/json',
               Authorization : `Bearer ${token}`
           }
       }
       console.log(config)

       const {data} = await axios.get(`http://localhost:5000/api/auth`, config)

       dispatch({
           type : 'USER_DETAIL_SUCCESS' ,
           payload : data
       })
    } catch (err) {
        dispatch({
            type : 'USER_DETAIL_FAIL',
            payload : err.data
        })
    }


}

export const UpdateUserDetails= (user) => async (dispatch , getState ) => {
    console.log(user)
    try {
        
       dispatch({
           type : 'USER_UPDATE_PROFILE_REQUEST',
       })

       const token = getState().AuthState.user.token
    //    console.log(token)
       const config = {
           headers : {
               'Content-Type' : 'application/json',
               Authorization : `Bearer ${token}`
           }
       }
    //    console.log(config)
       const {data} = await axios.post(`http://localhost:5000/api/auth`,user , config)

       dispatch({
           type : 'USER_UPDATE_PROFILE_SUCCESS' ,
           payload : data
       })
    } catch (err) {
        dispatch({
            type : 'USER_UPDATE_PROFILE_FAIL',
            payload : err.data
        })
    }


}
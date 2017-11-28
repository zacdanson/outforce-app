import axios from 'axios';


export const handleLogin = (email, password) => {
    return async (dispatch) => {
        if(!email || !password){
            dispatch(loginFailed('must provide email and password.'));
            return;
        }
        dispatch(loading(true));
        try {
            let userData = {
                email: email,
                password: password
            };
            await axios.post('https://us-central1-outforce-app.cloudfunctions.net/app/users/loginWithCredentials/', {
               userData
            }).then(data=>{
                let res = data.data.response;
                console.log('response - ', res);
                let userObj = {
                    uid: res.uid,
                    email: res.email,
                    displayName: res.displayName,
                };
                dispatch(loginSuccess(userObj));
                dispatch(loading(false));
            }).catch(error=>{
                console.log('error1 - ', error.response.data.error);
                dispatch(loading(false));
                dispatch(loginFailed(error.response.data.error));
            });
        } catch(err){
            console.log('error2 - ', err);
            dispatch(loginFailed(err));
            dispatch(loading(false));
        }
    };
};

export const updateEmail = (email) => {
    console.log('email ', email);
    return{
            type: 'UPDATE_EMAIL',
            payload: email
    };

};

export const updatePass = (password) => {
    return{
        type: 'UPDATE_PASSWORD',
        payload: password
    };
};


const loginFailed = (error) => {
  return {
      type: 'LOGIN_FAILED',
      payload: error
  };
};


const loginSuccess = (user) => {
    return {
        type: 'LOGIN_SUCCESS',
        payload: user
    };
};

const loading = (status) => {
  return {
    type: 'LOADING',
    payload: status
  };
};

import axios from 'axios';
import * as actionTypes from './actionTypes';
import * as Keys from './googleApiKey';

export const registerStart = () => {
    return {
        type: actionTypes.REGISTER_START
    };
};

export const registerSuccess = (token, userId) => {
    return {
        type: actionTypes.REGISTER_SUCCESS,
        idToken: token,
        userId: userId,
    };
};

export const registerFail = (error) => {
    return {
        type: actionTypes.REGISTER_FAIL,
        error: error
    };
};

export const register = (email, password) => {
    return dispatch => {
        dispatch(registerStart());
        const registerData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        const url = Keys.signUpApiKey ;
        axios.post(url, registerData)
        .then(response => {
            console.log(response);
            dispatch(registerSuccess(response.data.idToken, response.data.localId));
        })
        .catch(err => {
            console.log(err);
            dispatch(registerFail(err.response.data.error))
        })
    };
};
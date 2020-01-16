import axios from 'axios';
import * as actionTypes from './actionTypes';
import * as Keys from './googleApiKey';

export const logInStart = () => {
    return {
        type: actionTypes.LOGIN_START
    };
};

export const logInSuccess = (token, userId) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        idToken: token,
        userId: userId,
    };
};

export const logInFail = (error) => {
    return {
        type: actionTypes.LOGIN_FAIL,
        error: error
    };
};

export const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.LOGIN_LOGOUT
    };
};

export const checkTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logOut());
        }, expirationTime*1000);
    };
};

export const logIn = (email, password) => {
    return dispatch => {
        dispatch(logInStart());
        const logInData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        const url = Keys.signInApiKey ;
        axios.post(url, logInData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(logInSuccess(response.data.idToken, response.data.localId));
                dispatch(checkTimeout(response.data.expiresIn));
            })
            .catch(err => {
                console.log(err);
                dispatch(logInFail(err.response.data.error))
            })
    };
};

export const checkState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logOut());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logOut());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(logInSuccess(token, userId));
                dispatch(checkTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}
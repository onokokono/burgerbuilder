import * as actionTypes from './actionTypes';
import axios from 'axios';

export const auth_start = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const auth_success = (userId, idToken) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId: userId,
        idToken: idToken
    };
};

export const auth_failed = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
};

export const auth_logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpires');
    localStorage.removeItem('localId');

    return {
        type: actionTypes.AUTH_LOGOUT
    }
};

export const logout_timer = (timer) => {
    return dispatch => {
        setTimeout(() => dispatch(auth_logout()), timer * 1000);
    };
};

export const set_auth_redirect_path = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(auth_logout);
        } else {
            const expiresIn = new Date(localStorage.getItem('tokenExpires'));
            if (expiresIn > new Date()) {
                const localId = localStorage.getItem('localId');
                dispatch(auth_success(localId, token));
                dispatch(logout_timer( (expiresIn.getTime() - new Date().getTime()) / 1000 ));
            } else {
                dispatch(auth_logout);
            }
        }

    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        let URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAWL6nfAGTWM25G2xMkh5HhV00HVW8vr20';

        if (!isSignup)
            URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAWL6nfAGTWM25G2xMkh5HhV00HVW8vr20';

        const authData = {
            'email': email,
            'password': password,
            'returnSecureToken': true
        };

        dispatch(auth_start());

        axios.post(URL, authData)
            .then(response => {
                const tokenExpires = new Date(new Date().getTime() + (response.data.expiresIn * 1000));
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('tokenExpires', tokenExpires);
                localStorage.setItem('localId', response.data.localId);

                dispatch(auth_success(response.data.localId, response.data.idToken));
                dispatch(logout_timer(response.data.expiresIn));
            })
            .catch(error => {
                console.log(error);
                dispatch(auth_failed(error.response.data.error))
            })
    }
};
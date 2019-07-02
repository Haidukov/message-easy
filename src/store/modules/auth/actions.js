import firebase from 'firebase';
import * as ActionTypes from './action-types';

export const loginRequest = () => ({
    type: ActionTypes.LOGIN_REQUEST
});

export const loginSuccess = user => ({
    type: ActionTypes.LOGIN_SUCCESS,
    payload: user
});

export const loginError = error => ({
   type: ActionTypes.LOGIN_FAILED,
   payload: error
});

export const login = ({ phoneNumber, appVerifier }) => async dispatch => {
    try {
        dispatch(loginRequest());
        console.log(phoneNumber);
        console.log(appVerifier);
        const response = await firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier);
        console.log(response);
        dispatch(loginSuccess(response));
    } catch (error) {
        console.log(error);
        dispatch(loginError(error))
    }
};

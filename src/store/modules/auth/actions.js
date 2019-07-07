import firebase from 'firebase';
import * as ActionTypes from './action-types';
import { saveUserToLocalStorage, removeUserFromLocalStorage } from '../../../services/local-storage.';
import { signOut } from '../../../services/auth';

export const sendCodeRequest = () => ({
    type: ActionTypes.SEND_CODE_VERIFICATION_REQUEST
});

export const sendCodeSuccess = confirmationResult => ({
    type: ActionTypes.SEND_CODE_VERIFICATION_SUCCESS,
    payload: confirmationResult
});

export const sendCodeFailed = error => ({
    type: ActionTypes.SEND_CODE_VERIFICATION_FAILED,
    payload: error
});

export const confirmCodeRequest = () => ({
    type: ActionTypes.CONFIRM_CODE_REQUEST
});

export const confirmCodeSuccess = result => ({
    type: ActionTypes.CONFIRM_CODE_SUCCESS,
    payload: result
});

export const confirmCodeFailed = () => ({
    type: ActionTypes.CONFIRM_CODE_FAILED
});

export const openCodeForm = () => ({
    type: ActionTypes.OPEN_CODE_FORM
});

export const login = user => ({
    type: ActionTypes.LOGIN_USER,
    payload: user
});

export const logout = () => ({
    type: ActionTypes.LOGOUT_USER
});

export const sendVerificationCode = ({ phoneNumber, appVerifier }) => async dispatch => {
    try {
        dispatch(sendCodeRequest());
        const confirmationResult = await firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier);
        dispatch(sendCodeSuccess(confirmationResult));
    } catch (error) {
        dispatch(sendCodeFailed(error.message))
    }
};

export const confirmCode = code => async (dispatch, getState) => {
    try {
        dispatch(confirmCodeRequest());
        const { auth: { confirmationResult } } = getState();
        const response = await confirmationResult.confirm(code);
        dispatch(confirmCodeSuccess(response));
    } catch (error) {
        dispatch(confirmCodeFailed(error.message));
    }
};

export const saveUser = user => dispatch => {
    try {
        console.log('action');
        saveUserToLocalStorage(user);
        dispatch(login(user));
    } catch (e) {
        dispatch(logout(user));
    }
};

export const logoutUser = () => async dispatch => {
    await signOut();
    removeUserData(dispatch);
};

export const localLogout = () => dispatch => {
    removeUserData(dispatch);
};

const removeUserData = dispatch => {
    dispatch(logout());
};

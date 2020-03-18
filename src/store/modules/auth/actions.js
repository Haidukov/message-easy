import firebase from 'firebase';
import * as ActionTypes from './action-types';
import { signOut } from '../../../services/auth';
import ToastNotificationsService from '../../../services/toast-notification';

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

export const fetchAvatarRequest = () => ({
    type: ActionTypes.FETCH_AVATAR_REQUEST
});


export const fetchAvatarSuccess = avatar => ({
    type: ActionTypes.FETCH_AVATAR_SUCCESS,
    payload: avatar
});

export const fetchAvatarFailed = () => ({
    type: ActionTypes.FETCH_AVATAR_FAILED
});

export const updateAvatarRequest = () => ({
    type: ActionTypes.UPDATE_AVATAR_REQUEST
});

export const updateAvatarSuccess = () => ({
    type: ActionTypes.UPDATE_AVATAR_SUCCESS
});

export const updateAvatarFailed = () => ({
    type: ActionTypes.UPDATE_AVATAR_FAILED
});

export const updateProfileRequest = () => ({
    type: ActionTypes.UPDATE_PROFILE_REQUEST
});

export const updateProfileSuccess = () => ({
    type: ActionTypes.UPDATE_PROFILE_SUCCESS
});

export const updateProfileFailed = () => ({
    type: ActionTypes.UPDATE_PROFILE_FAILED
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

export const saveAvatar = user => async dispatch => {
    const { photoURL } = user;
    if (!photoURL) return;

    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child(photoURL);
    try {
        dispatch(fetchAvatarRequest());
        const image = await imageRef.getDownloadURL();
        dispatch(fetchAvatarSuccess(image));
    } catch {
        dispatch(fetchAvatarFailed());
    }
};

export const updateAvatar = file => async (dispatch, getState) => {
    const { auth: { currentUser } } = getState();
    const storageRef = firebase.storage().ref();
    const photoURL = `images/${file.name}`;
    const imageRef = storageRef.child(photoURL);
    try {
        dispatch(updateAvatarRequest());
        await Promise.all([imageRef.put(file), currentUser.updateProfile({ photoURL })]);
        dispatch(updateAvatarSuccess());
        dispatch(saveAvatar(currentUser));
    } catch {
        dispatch(updateAvatarFailed());
    }
};

export const updateProfile = form => async (dispatch, getState) => {
    const { auth: { currentUser } } = getState();
    dispatch(updateProfileRequest());
    try {
        await currentUser.updateProfile(form);
        dispatch(updateProfileSuccess(form));
            ToastNotificationsService.showSuccess('Ви успішно оновили інформацію про профіль');
    } catch (e) {
        ToastNotificationsService.showError('Failed to update your profile');
        dispatch(updateProfileFailed());
    }
};

export const saveUser = user => dispatch => {
    try {
        dispatch(saveAvatar(user));
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

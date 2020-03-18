import * as ActionTypes from './action-types';

const initialState = {
    currentUser: null,
    avatarURL: null,
    loading: {
        code: false,
        phone: false,
        avatar: false,
        profile: false
    },
    error: '',
    confirmationResult: null,
    step: 'PHONE_INPUT'
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SEND_CODE_VERIFICATION_REQUEST:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    phone: true
                }
            };
        case ActionTypes.SEND_CODE_VERIFICATION_SUCCESS:
            return {
                ...state,
                error: '',
                confirmationResult: action.payload,
                loading: {
                    ...state.loading,
                    phone: false
                },
                step: 'CODE_INPUT'
            };
        case ActionTypes.SEND_CODE_VERIFICATION_FAILED:
            return {
                ...state,
                error: action.payload,
                loading: {
                    ...state.loading,
                    phone: false
                }
            };
        case ActionTypes.CONFIRM_CODE_REQUEST:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    code: true
                }
            };
        case ActionTypes.CONFIRM_CODE_SUCCESS:
            return {
                ...state,
                error: '',
                step: 'LOGIN_SUCCESS',
                loading: {
                    ...state.loading,
                    code: false
                }
            };
        case ActionTypes.CONFIRM_CODE_FAILED:
            return {
                ...state,
                error: action.payload,
                loading: {
                    ...state.loading,
                    code: false
                }
            };
        case ActionTypes.LOGIN_USER:
            return {
                ...state,
                currentUser: action.payload
            };
        case ActionTypes.LOGOUT_USER:
            return {
                ...state,
                currentUser: null,
                avatarURL: null
            };

        case ActionTypes.FETCH_AVATAR_REQUEST:
        case ActionTypes.UPDATE_AVATAR_REQUEST:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    avatar: true
                }
            };
        case ActionTypes.FETCH_AVATAR_SUCCESS:
            return {
                ...state,
                avatarURL: action.payload,
                loading: {
                    ...state.loading,
                    avatar: false,
                }
            };
        case ActionTypes.FETCH_AVATAR_FAILED:
        case ActionTypes.UPDATE_AVATAR_SUCCESS:
        case ActionTypes.UPDATE_AVATAR_FAILED:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    avatar: false
                }
            };
        case ActionTypes.UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    profile: true
                }
            };
        case ActionTypes.UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    ...action.payload
                },
                loading: {
                    ...state.loading,
                    profile: false
                }
            };
        case ActionTypes.UPDATE_PROFILE_FAILED:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    profile: false
                }
            }
    }
    return state;
};



import * as ActionTypes from './action-types';

const initialState = {
    currentUser: null,
    loading: {
        code: false,
        phone: false
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
                currentUser: null
            }
    }
    return state;
};



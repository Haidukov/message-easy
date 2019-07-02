import * as ActionTypes from './action-types';

const initialState = {
    currentUser: null,
    loading: false,
    error: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_REQUEST:
            return {
                ...state,
                loading: true
            };
        case ActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                error: {},
                currentUser: action.payload,
                loading: false
            };
        case ActionTypes.LOGIN_FAILED:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
    }
    return state;
};



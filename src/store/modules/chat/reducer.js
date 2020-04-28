import * as ActionTypes from './action-types';

const initialState = {
    list: [],
    byId: {},
    searchValue: '',
    unreadMessagesCount: 0,
    loading: {
        list: true,
        form: false,
        unreadMessagesCount: false
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_CHATS_REQUEST:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    list: true
                }
            };
        case ActionTypes.FETCH_CHATS_SUCCESS:
            const list = action.payload;
            const byId = {};
            list.forEach(contact => {
                byId[contact.id] = contact;
            });
            return {
                ...state,
                list,
                byId,
                loading: {
                    ...state.loading,
                    list: false
                }
            };
        case ActionTypes.FETCH_CHATS_FAILED:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    list: false
                }
            };
        case ActionTypes.SEARCH_CONTACT:
            return {
                ...state,
                searchValue: action.payload
            };
        case ActionTypes.FETCH_MESSAGES_SUCCESS:
            const { chatId, messages } = action.payload;
            return {
                ...state,
                [chatId]: messages
            };
        case ActionTypes.ADD_CONTACT_REQUEST:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    form: true
                }
            };
        case ActionTypes.ADD_CONTACT_SUCCESS:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    form: false
                }
            }
        case ActionTypes.ADD_CONTACT_FAILED:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    form: false
                }
            }
        case ActionTypes.UPDATE_CHAT_ORDER:
            return state;
        case ActionTypes.FETCH_UNREAD_MESSAGES_COUNT_REQUEST:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    unreadMessagesCount: true
                }
            };
        case ActionTypes.FETCH_UNREAD_MESSAGES_COUNT_SUCCESS:
            return {
                ...state,
                unreadMessagesCount: action.payload,
                loading: {
                    ...state.loading,
                    unreadMessagesCount: false
                }
            };   
        case ActionTypes.FETCH_UNREAD_MESSAGES_COUNT_FAILED:
        return {
            ...state,
            loading: {
                ...state.loading,
                unreadMessagesCount: false
            }
        }; 
        default: {
            return state;
        }
    }
    return state;
};

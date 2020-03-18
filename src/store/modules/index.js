import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import auth from './auth';
import chat from './chat';


const createRootReducer = history => combineReducers({
    router: connectRouter(history),
    auth,
    chat
});

export default createRootReducer;

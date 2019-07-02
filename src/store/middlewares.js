import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { routerMiddleware as createRouterMiddleware } from 'connected-react-router';

const loggerMiddleware = createLogger({ collapsed: true });
//const routerMiddleware = createRouterMiddleware(histr);

const middlewares = [thunk];

if (process.env.NODE_ENV !== 'production') {
    middlewares.push(loggerMiddleware);
}

export default middlewares;


import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { routerMiddleware as createRouterMiddleware } from 'connected-react-router';

const createMiddlewares = ({ history }) => {
    const loggerMiddleware = createLogger({ collapsed: true });

    const middlewares = [thunk, createRouterMiddleware(history)];

    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(loggerMiddleware);
    }

    return middlewares;
};

export default createMiddlewares;


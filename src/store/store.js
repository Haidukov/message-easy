import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import createRootReducer from './modules';
import enhance from './enhance';
import createMiddlewares from './middlewares';

export const history = createBrowserHistory();

const configureStore = () => {
    const rootReducer = createRootReducer(history);

    const middlewares = createMiddlewares({ history });

    const enhancers = enhance(applyMiddleware(...middlewares));
    const store = createStore(
        rootReducer,
        {},
        enhancers);

    if (module.hot) {
        module.hot.accept('./modules', () => {
            store.replaceReducer(rootReducer);
        })
    }
    return store;
};

export default configureStore;

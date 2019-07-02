import { createStore, applyMiddleware } from 'redux';
import reducer from './modules';
import enhance from './enhance';
import middlewares from './middlewares';

const enhancers = enhance(applyMiddleware(...middlewares));
const store = createStore(reducer, {}, enhancers);

if (module.hot) {
    module.hot.accept('./modules', () => {
        store.replaceReducer(reducer);
    })
}

export default store;

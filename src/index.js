    import React from 'react';
    import ReactDOM from 'react-dom';
    import { Provider } from 'react-redux';
    import './index.css';
    import 'antd/dist/antd.css';
    import App from './App';
    import * as serviceWorker from './serviceWorker';
    import store from './store';
    import firebase from 'firebase';
    import { localLogout, logoutUser, saveUser } from './store/modules/auth/actions';
    import { Spin } from 'antd';
    import { firebaseConfig } from './firebase-config';

    const rootNode = document.getElementById('root');

    firebase.initializeApp(firebaseConfig);

    let gotAuthStateFirstTime = false;

    const renderSpinner = () => {
        ReactDOM.render(
            <div className='spinner-wrapper'>
                <Spin size='large'/>
            </div>,
            rootNode);
    };

    const renderApp = () => {
        ReactDOM.render(
            <Provider store={store}>
                <App/>
            </Provider>,
            rootNode
        );
    };

    renderSpinner();

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            store.dispatch(saveUser(user));
        }
        else {
            store.dispatch(localLogout());
        }
        if (!gotAuthStateFirstTime) {
            gotAuthStateFirstTime = true;
            renderApp();
            if (process.env.NODE_ENV !== 'production' && module.hot) {
                module.hot.accept('./App', renderApp);
            }
        }
    });

    serviceWorker.register();

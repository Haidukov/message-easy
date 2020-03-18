import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import 'antd/dist/antd.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import configureStore, { history } from './store';
import firebase from 'firebase';
import 'firebase/functions';
import 'firebase/firestore';
import { localLogout, saveUser } from './store/modules/auth/actions';
import { Spin } from 'antd';
import { firebaseConfig } from './firebase-config';
import HistoryContext from './contexts/history-context';
import Notifications from './services/toast-notification';

const rootNode = document.getElementById('root');

const store = configureStore();

initFirebase();

let gotAuthStateFirstTime = false;

renderSpinner();

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        store.dispatch(saveUser(user));
    } else {
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

function renderSpinner() {
    ReactDOM.render(
        <div className='spinner-wrapper'>
            <Spin size='large'/>
        </div>,
        rootNode);
}

function renderApp() {
    ReactDOM.render(
        <Provider store={store}>
            <HistoryContext.Provider value={history}>
                <App />
            </HistoryContext.Provider>
        </Provider>,
        rootNode
    );
}

function initFirebase() {
    firebase.initializeApp(firebaseConfig);
    enableOfflinePersistence();
}

function enableOfflinePersistence() {
    firebase.firestore().enablePersistence()
        .catch(err => {
            if (err.code === 'failed-precondition') {
                Notifications.showError('Please close another app tabs');
            }
        });
}

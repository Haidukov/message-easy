import React, { useEffect, useRef, useState } from 'react';
import firebase from 'firebase';
import logo from './logo.svg';
import './App.css';
import Router from './Router';
import RecaptchaContext from './contexts/recaptcha-context';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
};

function App() {
    const recaptchaRef = useRef();
    const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);
    useEffect(() => {
        const app = firebase.initializeApp(firebaseConfig);
        const appVerifier = new firebase.auth.RecaptchaVerifier(recaptchaRef.current, {
            'size': 'normal',
            'callback': response => {
                console.log('hello');
            },
            'expired-callback': () => {
                console.log('expired');
            }
        });
        setRecaptchaVerifier(appVerifier);
    }, []);
    return (
        <>
            <RecaptchaContext.Provider value={recaptchaVerifier}>
                <Router/>
            </RecaptchaContext.Provider>
            <div id='recaptcha-container' ref={recaptchaRef}></div>
        </>
    );
}

export default App;

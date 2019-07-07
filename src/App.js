import React, { useEffect, useRef, useState } from 'react';
import firebase from 'firebase';
import logo from './logo.svg';
import './App.css';
import Router from './Router';
import RecaptchaContext from './contexts/recaptcha-context';

const App = () => {
    return (
        <Router/>
    );
}

export default App;

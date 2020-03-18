import React from 'react';
import ReactDOM from 'react-dom';

const Title = ({ children }) => {
    const el = document.getElementById('title');
    return (
        el ? ReactDOM.createPortal(children, el) : <></>
    );
};

export default Title;

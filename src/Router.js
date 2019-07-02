import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login/Login';

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route path='/login' component={Login}/>
            <Route exact path='/' component={() => <div>hello</div>} />
        </Switch>
    </BrowserRouter>
);

export default Router;

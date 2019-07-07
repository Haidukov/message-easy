import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login/Login';
import Dashboard from './pages/Main/Dashboard';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    user: state.auth.currentUser
});

const Router = ({ user }) => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/login' render={user ? () => <Redirect to='/'/> : () => <Login/>}/>
                <Route exact path='/' render={user ? () => <Dashboard/> : () => <Redirect to='/login'/>}/>
            </Switch>
        </BrowserRouter>
    );
}

export default connect(mapStateToProps)(Router);

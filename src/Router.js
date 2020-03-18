import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Login from './pages/Login/Login';
import Dashboard from './pages/Main/Dashboard';
import { connect } from 'react-redux';
import HistoryContext from './contexts/history-context';

const mapStateToProps = state => ({
    user: state.auth.currentUser
});

const Router = ({ user }) => {
    const history = useContext(HistoryContext);
    return (
        <ConnectedRouter history={history}>
            <Switch>
                <Route path='/login' render={user ? () => <Redirect to='/'/> : () => <Login/>}/>
                <Route path='/' render={user ? () => <Dashboard/> : () => <Redirect to='/login'/>}/>
            </Switch>
        </ConnectedRouter>
    );
}

export default connect(mapStateToProps)(Router);

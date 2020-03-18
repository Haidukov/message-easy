import React, { useContext } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Profile from './Profile';
import Chat from './Chat/Chat';
import HistoryContext from '../../contexts/history-context';
import NotSelectedChat from './NotSelectedChat';

const Router = () => {
    const history = useContext(HistoryContext);
    return (
        <ConnectedRouter history={history}>
            <Switch>
                <Route path='/profile' component={Profile} />
                <Route path='/chat/:chatId' component={Chat} />
                <Route path='/' component={NotSelectedChat}/>
            </Switch>
        </ConnectedRouter>
    );
};

export default Router;

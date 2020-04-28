import React, { useContext } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Profile from './Profile';
import Chat from './Chat/Chat';
import HistoryContext from '../../contexts/history-context';
import NotSelectedChat from './NotSelectedChat';

const Router = ({ chatChanged, collapsed }) => {
    const history = useContext(HistoryContext);
    return (
   
            <Switch>
                <Route path='/profile' render={params => 
                    <Profile {...params} collapsed={collapsed} chatChanged={chatChanged} />} />
                <Route path='/chat/:chatId' render={params => 
                    <Chat {...params} collapsed={collapsed} chatChanged={chatChanged}/>
                } />
                <Route path='/' component={NotSelectedChat}/>
            </Switch>
   
    );
};

export default Router;

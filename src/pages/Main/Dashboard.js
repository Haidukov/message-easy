import React, { useEffect, useState } from 'react';
import { Icon, Layout, Menu, Divider, Modal, Typography } from 'antd';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import ProfileMenu from './ProfileMenu';
import Sider from './Sider';
import Router from './Router';
import { connect } from 'react-redux';
import { subscribeChats, unsubscribeChats, getUnreadMessagesCount } from '../../store/modules/chat/actions';
import { useSize } from '../../utils/hooks';

const Header = styled(Layout.Header)`
    display: flex; 
    justify-content: space-between; 
    align-items: center;
    background: #fff;
    padding: 1em;
`;

const Content = styled(Layout.Content)`
    margin: 24px 16px;
    padding: 24px;
    background: #fff;
    min-height: 280px;
`;

//const createToggleStyled = component => 

const StyledAppLayout = styled(Layout)`
display: ${props => props.show ? 'initial': 'none'}
`;
const StyledAppSider = styled(Sider)`
display: ${props => props.show ? 'initial': 'none'}
`;

const mapStateToProps = state => ({
    user: state.auth.currentUser
});

const mapDispatchToProps = dispatch => ({
    subscribeChats: userId => dispatch(subscribeChats(userId)),
    unsubscribeChats: () => dispatch(unsubscribeChats()),
    getUnreadMessagesCount: () => dispatch(getUnreadMessagesCount())
});

const Dashboard = ({ user, location, subscribeChats, unsubscribeChats, getUnreadMessagesCount }) => {
    const [chatId, setChatId] = useState(null);
    const { width } = useSize();
    const isCollapsed = width < 600;
    useEffect(() => {
        subscribeChats(user.uid);
        return unsubscribeChats;
    }, []);

    useEffect(() => {
        getUnreadMessagesCount();
    }, []);

    console.log(location);

    const showSider = isCollapsed ? location.pathname.includes('/chat') && !chatId : true;
    const showContent = isCollapsed ? !location.pathname.includes('/chat') || !!chatId : true;

    console.log(chatId);

    const onChangeChatId = chatId => {
        console.log('hello', chatId);
        setChatId(chatId);
    }   
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <StyledAppSider show={showSider} collapsed={isCollapsed}/>
            <StyledAppLayout show={showContent}>
                <Header>
                    <Typography.Title id='title' level={2}></Typography.Title>
                    <ProfileMenu collapsed={isCollapsed}/>
                </Header>
                <Content>
                    <Router chatChanged={onChangeChatId} collapsed={isCollapsed}/>
                </Content>
            </StyledAppLayout>
        </Layout>
    );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));

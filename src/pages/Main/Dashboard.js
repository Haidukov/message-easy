import React, { useEffect, useState } from 'react';
import { Icon, Layout, Menu, Divider, Modal, Typography } from 'antd';
import styled from 'styled-components';
import ProfileMenu from './ProfileMenu';
import Sider from './Sider';
import Router from './Router';
import { connect } from 'react-redux';
import { subscribeChats, unsubscribeChats } from '../../store/modules/chat/actions';

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

const mapStateToProps = state => ({
    user: state.auth.currentUser
});

const mapDispatchToProps = dispatch => ({
    subscribeChats: userId => dispatch(subscribeChats(userId)),
    unsubscribeChats: () => dispatch(unsubscribeChats())
});

const Dashboard = ({ user, subscribeChats, unsubscribeChats }) => {
    useEffect(() => {
        subscribeChats(user.uid);
        return unsubscribeChats;
    }, []);
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider/>
            <Layout>
                <Header>
                    <Typography.Title id='title' level={2}></Typography.Title>
                    <ProfileMenu/>
                </Header>
                <Content>
                   <Router/>
                </Content>
            </Layout>
        </Layout>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

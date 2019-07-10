import React, { useEffect, useState } from 'react';
import { Icon, Layout, Menu, Divider, Modal } from 'antd';
import styled from 'styled-components';
import ProfileMenu from './ProfileMenu';
import Sider from './Sider';

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

const Dashboard = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider/>
            <Layout>
                <Header>
                    <div></div>
                    <ProfileMenu/>
                </Header>
                <Content>
                    Content
                </Content>
            </Layout>
        </Layout>
    );
}

export default Dashboard;

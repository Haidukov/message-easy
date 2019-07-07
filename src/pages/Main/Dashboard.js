import React, { useState } from 'react';
import { Icon, Layout, Menu } from 'antd';
import styled from 'styled-components';
import ProfileMenu from './ProfileMenu';

const Logo = styled.div`
    width: 120px;
    height: 31px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px auto 16px;
`;

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
    min-height: 280p
`;

const Dashboard = () => {
    const [collapsed, setCollapsed] = useState(false);
    const toggle = () => setCollapsed(!collapsed);
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Layout.Sider trigger={null} collapsible collapsed={collapsed}>
                <Logo/>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">
                        <Icon type="user" />
                        <span>nav 1</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="video-camera" />
                        <span>nav 2</span>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Icon type="upload" />
                        <span>nav 3</span>
                    </Menu.Item>
                </Menu>
            </Layout.Sider>
            <Layout>
                <Header>
                    <Icon
                        className='trigger'
                        type={collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={toggle}
                    />
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

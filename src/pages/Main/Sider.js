import React, { useState } from 'react';
import { Divider, Icon, Layout, Menu, Modal } from 'antd';
import styled from 'styled-components';
import AddContactForm from './AddContactForm';

const Logo = styled.div`
    width: 120px;
    height: 31px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px auto;
`;

const Sider = () => {
        const [isModalOpen, setIsModalOpen] = useState(false);
        const showModal = () => setIsModalOpen(true);
        const hideModal = () => setIsModalOpen(false);
        return (
            <>
                <Layout.Sider>
                    <Logo/>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" onClick={showModal}>
                            <Icon type="plus"/>
                            <span>Add user</span>
                        </Menu.Item>
                        <Divider/>
                        <Menu.Item key="2">
                            <Icon type="user"/>
                            <span>nav 1</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="video-camera"/>
                            <span>nav 2</span>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Icon type="upload"/>
                            <span>nav 3</span>
                        </Menu.Item>
                    </Menu>
                </Layout.Sider>
                <AddContactForm
                    visible={isModalOpen}
                    hideModal={hideModal}
                />
            </>
        )
    }
;

export default Sider;

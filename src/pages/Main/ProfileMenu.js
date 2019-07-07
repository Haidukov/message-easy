import React from 'react';
import { Menu as AntMenu, Avatar, Dropdown, Icon } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { signOut } from '../../services/auth';

const MenuWrapper = styled.div`
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    width: 150px;
    z-index: 10px;
`;

const Menu = () => (
    <MenuWrapper>
        <AntMenu>
            <AntMenu.Item key={1}>
                <Link to='/profile'>
                    <Icon type='user' />
                    Profile
                </Link>
            </AntMenu.Item>
            <AntMenu.Item key={2} onClick={signOut}>
                <Icon type='logout' />
                Sign out
            </AntMenu.Item>
        </AntMenu>
    </MenuWrapper>
);

const ProfileMenu = () => (
    <Dropdown overlay={<Menu/>} trigger={['click']}>
        <Avatar className='cursor-pointer' size='large' icon='user'/>
    </Dropdown>
);

export default ProfileMenu;

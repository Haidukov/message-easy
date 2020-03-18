import React from 'react';
import { Menu as AntMenu, Avatar, Dropdown, Icon, Spin } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { signOut } from '../../services/auth';
import { connect } from 'react-redux';

const MenuWrapper = styled.div`
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    width: 150px;
    z-index: 10;
`;

const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Menu = ({ avatarURL }) => (
    <MenuWrapper>
        <AntMenu>
            <AntMenu.Item key={1}>
                <Link to='/profile'>
                    <Icon
                        src={avatarURL}
                        type='user'/>
                    Profile
                </Link>
            </AntMenu.Item>
            <AntMenu.Item key={2} onClick={signOut}>
                <Icon type='logout'/>
                Sign out
            </AntMenu.Item>
        </AntMenu>
    </MenuWrapper>
);

const mapStateToProps = state => ({
    avatarURL: state.auth.avatarURL,
    loading: state.auth.loading.avatar
});

const ProfileMenu = ({ avatarURL, loading }) => (
    <Dropdown overlay={<Menu/>} trigger={['click']}>
        <AvatarWrapper>
            {loading ?
                <Spin /> :
                <Avatar
                    size='large'
                    icon='user'
                    src={avatarURL}
                />
            }
        </AvatarWrapper>
    </Dropdown>
);

export default connect(mapStateToProps)(ProfileMenu);

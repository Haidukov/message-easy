import React, { useState, useRef } from 'react';
import { Menu as AntMenu, Avatar, Dropdown, Icon, Spin } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { signOut } from '../../services/auth';
import { connect } from 'react-redux';
import { Badge } from 'antd';

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

const Menu = ({ avatarURL, onClick }) => {
    return (
    <MenuWrapper onClick={onClick}>
        <AntMenu>
            <AntMenu.Item onClick={() => document.body.click()} key={1}>
                <Link to='/profile'>
                    <Icon
                        src={avatarURL}
                        type='user'/>
                    Profile
                </Link>
            </AntMenu.Item>
            <AntMenu.Item onClick={signOut} key={2}>
                <Icon type='logout'/>
                Sign out
            </AntMenu.Item>
        </AntMenu>
    </MenuWrapper>
)
    };

const mapStateToProps = state => ({
    avatarURL: state.auth.avatarURL,
    loading: state.auth.loading.avatar,
    unreadMessagesCount: state.chat.unreadMessagesCount
});

const ProfileMenu = ({ avatarURL, loading, unreadMessagesCount }) => {
    const [visible, setVisible] = useState(false);
    const onVisibleChange = (e) => {
        setVisible(visible => !visible);
    };
    const onMenuClick = () => setVisible(false);
    return (
        <Dropdown visible={visible} onVisibleChange={onVisibleChange} overlay={<Menu onClick={onMenuClick} />} trigger={['click']}>
        <Badge count={unreadMessagesCount}>
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
        </Badge>
        </Dropdown>
    );
};

export default connect(mapStateToProps)(ProfileMenu);

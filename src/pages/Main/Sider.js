import React, { useState } from 'react';
import { Icon, Layout, Menu, Spin, Row, Avatar, Input } from 'antd';
import styled from 'styled-components';
import AddContactForm from './AddContactForm';
import { connect } from 'react-redux';
import { searchContact } from '../../store/modules/chat/actions';
import { makeGetSearchedContacts } from '../../store/modules/chat/selectors';
import { withRouter } from 'react-router-dom';
import { push } from 'connected-react-router';
import { useSize } from '../../utils/hooks';
import ProfileMenu from './ProfileMenu';
import { updateChatOrder } from '../../store/modules/chat/actions';

const UsernameLabel = styled.span`
   margin-left: 5px;
   @media (max-width: 600px) {
       font-size: 20px;
       margin-left: 40px;
   }
`;

const NotFoundLabel = styled.div`
   margin-top: 35px;
   text-align: center;
   color: white;
`;

const SearchInput = styled.input`
   padding: 0 10px;
   width: 80%;
   height: 31px;
   background: rgba(255, 255, 255, 0.2);
   margin: 16px auto;
   border: none;
   color: white;
   box-shadow: none;
   outline: none;
   &:focus {
      border: 0.5px solid yellow;
   }
`;

const ProfileMenuWrapper = styled.div`
   display: flex;
   justify-content: center;
   align-items-center;
   margin-right: 17px;
`;

const AddContactLabel = styled.span`
   @media (max-width: 600px) {
        font-size: 20px;
   }
`;

const StyledMenuItem = styled(Menu.Item)`
   @media (max-width: 600px) {
        height: 50px;    
   }
`;

const makeMapStateToProps = () => {
    const getSearchedContacts = makeGetSearchedContacts();
    const mapStateToProps = state => {
        return {
            chats: getSearchedContacts(state.chat),
            loading: state.chat.loading.list,
            searchValue: state.chat.searchValue,
            getChatLastMessage: chatId => state.chat[chatId] && state.chat[chatId][0] && state.chat[chatId][0].content,
        }
    };
    return mapStateToProps;
};

const mapDispatchToProps = dispatch => ({
    search: searchValue => dispatch(searchContact(searchValue)),
    push: (...args) => dispatch(push(...args)),
    updateChatOrder: chatId => dispatch(updateChatOrder(chatId))
});

const Sider = ({ chats, loading, searchValue, search, collapsed, push, show, updateChatOrder }) => {
        const [isModalOpen, setIsModalOpen] = useState(false);
        const showModal = () => setIsModalOpen(true);
        const hideModal = () => setIsModalOpen(false);
        const openChat = chatId => {
            push(`/chat/${chatId}`);
            updateChatOrder(chatId);
        };

        const { width } = useSize();

        const siderSize = show ? collapsed ? window.innerWidth : 250 : 0;
        
        return (
            <>
                <Layout.Sider width={siderSize}>
                    {loading ?
                        <Row type='flex' justify='center' align='middle' style={{ marginTop: '30px' }}>
                            <Spin size='large' />
                        </Row> :
                        <>
                            <Row type='flex' justify='center'>
                                <SearchInput
                                    type='text'
                                    value={searchValue}
                                    onChange={event => search(event.target.value)}
                                />
                                {collapsed && (
                                    <ProfileMenuWrapper>
                                        <ProfileMenu style={{ marginRight: '30px' }}/>
                                    </ProfileMenuWrapper>
                                )}
                            </Row>
                            <Menu theme='dark' mode="inline">
                                <Menu.Item key={1} onClick={showModal}>
                                    <Icon type='plus'/>
                                    <AddContactLabel>Add contact</AddContactLabel>
                                </Menu.Item>
                                {chats.length > 0
                                    ? chats.sort((chat1, chat2) => chat1.order < chat2.order).map(({ id, chatId, photoURL, name }) => (
                                        <StyledMenuItem
                                            key={chatId}
                                            style={{ height: '50px' }}
                                            onClick={() => openChat(chatId)}
                                        >
                                            <Avatar 
                                                size={collapsed ? 'large' : 'small'} 
                                                src={photoURL}
                                            />
                                            <UsernameLabel>{name}</UsernameLabel>
                                        </StyledMenuItem>
                                    ))
                                    :
                                    <NotFoundLabel>
                                        {searchValue ?
                                            'Not found any contacts' :
                                            'You don`t have any friends :('
                                        }
                                    </NotFoundLabel>
                                }
                            </Menu>
                        </>
                    }
                </Layout.Sider>
                <AddContactForm
                    visible={isModalOpen}
                    hideModal={hideModal}
                />
            </>
        )
    }
;

export default withRouter(connect(makeMapStateToProps, mapDispatchToProps)(Sider));

import React, { useState } from 'react';
import { Icon, Layout, Menu, Spin, Row, Avatar, Input } from 'antd';
import styled from 'styled-components';
import AddContactForm from './AddContactForm';
import { connect } from 'react-redux';
import { searchContact } from '../../store/modules/chat/actions';
import { makeGetSearchedContacts } from '../../store/modules/chat/selectors';
import { withRouter } from 'react-router-dom';
import { push } from 'connected-react-router';

const UsernameLabel = styled.span`
   margin-left: 5px;
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

const makeMapStateToProps = () => {
    const getSearchedContacts = makeGetSearchedContacts();
    const mapStateToProps = state => {
        return {
            chats: getSearchedContacts(state.chat),
            loading: state.chat.loading.list,
            searchValue: state.chat.searchValue
        }
    };
    return mapStateToProps;
};

const mapDispatchToProps = dispatch => ({
    search: searchValue => dispatch(searchContact(searchValue)),
    push: (...args) => dispatch(push(...args))
});

const Sider = ({ chats, loading, searchValue, search, history, push }) => {
        const [isModalOpen, setIsModalOpen] = useState(false);
        const showModal = () => setIsModalOpen(true);
        const hideModal = () => setIsModalOpen(false);
        const openChat = chatId => {
            push(`/chat/${chatId}`);
        };
        return (
            <>
                <Layout.Sider width={250}>
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
                            </Row>
                            <Menu theme='dark' mode="inline">
                                <Menu.Item key={1} onClick={showModal}>
                                    <Icon type='plus'/>
                                    <span>Add user</span>
                                </Menu.Item>
                                {chats.length > 0
                                    ? chats.map(({ id, chatId, photoURL, name }) => (
                                        <Menu.Item
                                            key={chatId}
                                            onClick={() => openChat(chatId)}
                                        >
                                            <Avatar size='small' src={photoURL}/>
                                            <UsernameLabel>{name}</UsernameLabel>
                                        </Menu.Item>
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

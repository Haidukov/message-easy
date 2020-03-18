import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Input, Button, Row, Col, Avatar, Form, Spin, Empty as AntEmpty } from 'antd';
import styled from 'styled-components';
import { grey, blue } from '@ant-design/colors/lib';
import { sendMessage, subscribeToMessages } from '../../../store/modules/chat/actions';
import { connect } from 'react-redux';
import { useSubmit } from '../../../hooks/useSubmit';
import { withRouter } from 'react-router-dom';
import { unsubscribeFromMessages } from '../../../store/modules/chat/actions';
import Title from '../../../components/Title';

const ChatLayout = styled.div`
  position: relative;
  height: 100%;
  padding: 40px;
`;

const MessageBar = styled.div`
  position: absolute;
  left: 100px;
  right: 100px;
  bottom: 20px;
  @media screen and (max-width: 900px) {
    left: 5%;
    right: 5%;
  }
`;

const SendButton = styled(Button)`
  width: 100%;
`;

const MessagesList = styled.div`
  padding: 0 200px;
  margin-bottom: 40px;
  height: 100%;
  max-height: calc(100vh - 300px);
  overflow-y: auto;
  @media screen and (max-width: 1100px) {
    padding: 0 5%;
  }
`;

const Message = styled.div`
  margin-top: 10px;
`;

const MessageText = styled.div`
  padding: 10px 20px;
  border-radius: 25px;
  min-width: 200px;
  color: white;    
  @media screen and (max-width: 720px) {
    min-width: 100px;
  }                    
`;

const Empty = styled(AntEmpty)`
  margin-top: 100px;
`;

const mapStateToProps = (state, { match }) => {
    const user = state.auth.currentUser;
    const getContactById = id => {
        const byId = {
            [user.uid]: {
                ...user,
                photoURL: state.auth.avatarURL
            },
            ...state.chat.byId
        };
        return byId[id];
    };
    return {
        chats: state.chat.list,
        messages: state.chat[match.params.chatId],
        user,
        getContactById
    }
};

const mapDispatchToProps = dispatch => ({
    subscribeToMessages: chatId => dispatch(subscribeToMessages(chatId)),
    unsubscribeFromMessages: () => dispatch(unsubscribeFromMessages()),
    sendMessage: ({ chatId, messageText }) => dispatch(sendMessage({ chatId, messageText }))
});

const Chat = ({ sendMessage, user, chats, form, match, subscribeToMessages, unsubscribeFromMessages, messages, getContactById }) => {
    const { chatId } = match.params;
    const { getFieldDecorator } = form;
    const listRef = useRef(null);
    const currentChat = useMemo(
        () => chats && chats.find(chat => chat.chatId === chatId),
        [chats, chatId]
    );
    const scrollToBottom = useCallback(() => {
        const listNode = listRef.current;
        if (listNode) {
            listNode.scrollTop = listNode.scrollHeight - listNode.clientHeight;
        }
    }, [messages]);
    const onSubmit = useSubmit(form, async ({ messageText }) => {
        const registration = await navigator.serviceWorker.ready;
        registration.sync.register('sync');
        console.log(registration);
        sendMessage({ chatId, messageText});
        form.resetFields();
    });
    useEffect(() => {
        subscribeToMessages(chatId);
        return () => unsubscribeFromMessages()
    }, [chatId]);
    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    return (
        <ChatLayout>
            <Title>{ currentChat ? currentChat.name : <Spin /> }</Title>
            {messages ? <MessagesList ref={listRef}>
                    {messages.length > 0 ? messages.map((message, i) => {
                            const isSentByCurrentUser = message.senderId === user.uid;
                            const contact = getContactById(message.senderId);
                            const photoURL = contact && contact.photoURL;
                            return (
                                <Message key={i}>
                                    <Row
                                        type='flex'
                                        align='middle'
                                        {...isSentByCurrentUser && ({ justify: 'end' })}
                                    >
                                        <Avatar
                                            src={photoURL}
                                            size='large'
                                            style={{ order: isSentByCurrentUser ? 2 : 1 }}
                                        />
                                        <MessageText style={{
                                            [`margin${isSentByCurrentUser ? 'Right' : 'Left'}`]: '10px',
                                            backgroundColor: isSentByCurrentUser ? blue[4] : grey[1],
                                            order: isSentByCurrentUser ? 1 : 2
                                        }}>
                                            {message.content}
                                        </MessageText>
                                    </Row>
                                </Message>
                            )
                        }) :
                        <Empty description='No messages yet'/>}
                </MessagesList> :
                <Row type='flex' align='middle' justify='center' style={{ height: '100%' }}>
                    <Spin size='large'/>
                </Row>
            }
            <MessageBar>
                <Form onSubmit={onSubmit}>
                    <Row type='flex'>
                        <Col xs={16} md={20}>
                            <Form.Item>
                                {getFieldDecorator('messageText', {
                                })(
                                    <Input size='large'/>
                                )}
                            </Form.Item>
                        </Col>
                        <Col xs={8} md={4}>
                            <SendButton
                                htmlType='submit'
                                size='large'>
                                Send
                            </SendButton>
                        </Col>
                    </Row>
                </Form>
            </MessageBar>
        </ChatLayout>
    )
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'chat' })(Chat)));

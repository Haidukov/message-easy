import React, { useCallback, useEffect, useState, useMemo, useRef } from 'react';
import { Input, Button, Row, Col, Form, Spin, Empty as AntEmpty } from 'antd';
import styled from 'styled-components';
import { LeftOutlined } from '@ant-design/icons';
import { sendMessage, subscribeToMessages, getUnreadMessagesCount } from '../../../store/modules/chat/actions';
import { connect } from 'react-redux';
import { useSubmit } from '../../../hooks/useSubmit';
import { withRouter } from 'react-router-dom';
import { unsubscribeFromMessages } from '../../../store/modules/chat/actions';
import Title from '../../../components/Title';
import { push } from 'connected-react-router';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import Message from './Message';

const ChatLayout = styled.div`
  position: relative;
  height: 100%;
  padding: 40px;
`;

const MessageBar = styled.div`
  position: absolute;
  left: 100px;
  right: 100px;
  bottom: 0;
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


const Empty = styled(AntEmpty)`
  margin-top: 100px;
`;

const PickerWrapper = styled.div`
  position: absolute;
  bottom: 80px;
`;

const EmoziContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

const EmoziWrapped = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        const handler = event => {
            if (ref.current !== event.target && !ref.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('click', handler);
        return () => document.removeEventListener('click', handler);
    });
    return (
        <EmoziContainer ref={ref}>
            <Button onClick={() => setIsOpen(true)} style={{ height: '40px' }}>
                <span role='img' aria-label='emozi'>😀</span>
            </Button>
            <PickerWrapper>{isOpen && <Picker {...props}/>}</PickerWrapper>
        </EmoziContainer>
    );
};

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
    sendMessage: ({ chatId, messageText }) => dispatch(sendMessage({ chatId, messageText })),
    push: (...args) => dispatch(push(...args)),
    getUnreadMessagesCount: () => dispatch(getUnreadMessagesCount())
});

const Chat = ({ sendMessage, user, chats, form, match, subscribeToMessages, unsubscribeFromMessages, messages, getContactById, chatChanged, push, collapsed, getUnreadMessagesCount }) => {
    const { chatId } = match.params;
    const { getFieldDecorator, setFieldsValue, getFieldValue } = form;
    const [messageToSend, setMessageToSend] = useState('');
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
        getUnreadMessagesCount();
    }, [chatId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        chatChanged && chatChanged(chatId ? chatId : null);
    }, [chatId]);

    const renderTitle = () => {
        if (!currentChat) return (
            <Title>
                <Spin/>
            </Title>
        );
        const handleBack = () => {
            push('/chat');
            chatChanged && chatChanged(null);
        };
        return (
            <Title>
                {collapsed && (
                    <Button onClick={handleBack}>        
                        <LeftOutlined />
                    </Button>
                )}
                {currentChat.name}
            </Title>
        );
    };

    const onEmoziSelect = emoziData => {
        console.log(setFieldsValue);
        const messageTextOld = getFieldValue('messageText') || '';
        setFieldsValue({
            messageText: messageTextOld + emoziData.native
        });
    };

    return (
        <ChatLayout>
            {renderTitle()}
            {messages ? <MessagesList ref={listRef}>
                    {messages.length > 0 ? messages.map((message, i) => {
                            const contact = getContactById(message.senderId);
                            return (
                                <Message 
                                    key={i} 
                                    contact={contact}
                                    user={user}
                                    message={message}
                                />
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
                        <Col xs={14} sm={20} md={19}>
                            <Form.Item>
                                {getFieldDecorator('messageText', {
                                })(
                                    <Input size='large'/>
                                )}
                            </Form.Item>
                        </Col>
                        <Col xs={1} sm={0} md={1}>
                            {!collapsed && <EmoziWrapped onSelect={onEmoziSelect} />}
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

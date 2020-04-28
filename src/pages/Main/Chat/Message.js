import React, { useState } from 'react';
import styled from 'styled-components';
import { Row, Avatar, Modal, Typography } from 'antd';
import { grey, blue } from '@ant-design/colors/lib';

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

const MessageContainer = ({ message, user, contact }) => {
        const [isOpen, setIsOpen] = useState(false);
        const isSentByCurrentUser = message.senderId === user.uid;
        const photoURL = contact && contact.photoURL;
        const renderModal = () => (
            <>
                <Avatar
                    src={photoURL}
                    size={128}
                    style={{ marginBottom: '10px' }}
                />
                <Typography.Title level={4}>Name: {contact.displayName}</Typography.Title>
                <Typography.Title level={4}>Phone: {contact.phoneNumber}</Typography.Title>
            </>
        );
        return (
            <Message>
                <Row
                    type='flex'
                    align='middle'
                    {...isSentByCurrentUser && ({ justify: 'end' })}
                >
                    <div style={{ order: isSentByCurrentUser ? 2 : 1 }}>
                        <Avatar
                            src={photoURL}
                            size='large'
                            onClick={() => setIsOpen(true)}
                        />
                        <Modal 
                            className='message-contact-modal'
                            title='Profile info'
                            visible={isOpen}
                            onCancel={() => setIsOpen(false)}
                        >
                            {contact && renderModal()}
                        </Modal>
                    </div>
                    <MessageText style={{
                        [`margin${isSentByCurrentUser ? 'Right' : 'Left'}`]: '10px',
                        backgroundColor: isSentByCurrentUser ? blue[4] : grey[1],
                        order: isSentByCurrentUser ? 1 : 2
                    }}>
                        {message.content}
                    </MessageText>
                </Row>
            </Message>
        );
};

export default MessageContainer;
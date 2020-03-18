import React from 'react';
import { connect } from 'react-redux';
import { Row, Typography, Spin } from 'antd'
import styled from 'styled-components';

const Paragraph = styled(Typography.Paragraph)`
  font-size: 16px;
`;

const mapStateToProps = state => ({
    hasChats: !!state.chat.list.length,
    loading: state.chat.loading.list
});

const NotSelectedChat = ({ hasChats, loading }) => (
    <Row type='flex' justify='center' align='middle' style={{ height: '100%' }}>
        { !loading ?
            <Paragraph>{hasChats ? 'Please select a chat to start messaging' : 'You don`t have any contacts yet'}</Paragraph> :
            <Spin size='large' />
        }
    </Row>
);

export default connect(mapStateToProps)(NotSelectedChat);

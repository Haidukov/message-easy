import React from 'react';
import { Card as AntdCard } from 'antd/lib/index';
import styled from 'styled-components';

const Wrapper = styled.div`
    padding-top: 50px;
    display: flex;
    justify-content: center
`;

const Card = styled(AntdCard)`
    width: 500px;
`;

const AuthLayout = ({ children }) => (
    <Wrapper>
        <Card>{children}</Card>
    </Wrapper>
);

export default AuthLayout;

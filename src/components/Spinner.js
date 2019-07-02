import { Icon as AntdIcon, Spin } from 'antd';
import styled from 'styled-components';
import React from 'react';

const Icon = styled(AntdIcon)`
    color: ${props => props.color || 'white'};
    font-size: ${props => props.size || '22px'}
`;

const Spinner = ({ color, size }) => (
    <Spin indicator={<Icon type='loading' color={color} size={size} spin/>}/>
);

export default Spinner;

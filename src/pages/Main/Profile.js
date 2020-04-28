import React from 'react';
import {
    Avatar as AntAvatar,
    Col,
    Icon as AntIcon,
    Row,
    Spin as AntSpin,
    Typography,
    Form,
    Input,
    Button
} from 'antd';
import styled from 'styled-components';
import { connect } from 'react-redux';
import withFileUpload from '../../hocs/withFileUpload';
import { updateAvatar, updateProfile } from '../../store/modules/auth/actions';
import { useSubmit } from '../../hooks/useSubmit';
import { push } from 'connected-react-router';
import { LeftOutlined } from '@ant-design/icons';
import Title from '../../components/Title';

const Avatar = styled(AntAvatar)`
    margin-bottom: 20px;
    cursor: pointer;
`;

const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
  margin-right: ${props => !props.collapsed ? '30px' : 0};
`;

const Spin = styled(AntSpin)`
    font-size: 25px;
`;

const UploadButton = withFileUpload(Button);

const mapStateToProps = state => ({
    user: state.auth.currentUser,
    avatarURL: state.auth.avatarURL,
    avatarLoading: state.auth.loading.avatar,
    profileLoading: state.auth.loading.profile
});

const mapDispatchToProps = dispatch => ({
    updateAvatar: file => dispatch(updateAvatar(file)),
    updateProfile: form => dispatch(updateProfile(form)),
    push: (...args) => dispatch(push(...args))
});

const Profile = ({
                     user,
                     avatarURL,
                     avatarLoading,
                     profileLoading,
                     updateAvatar,
                     updateProfile,
                     form,
                     chatChanged,
                     collapsed,
                     push
                 }) => {
    const { displayName, phoneNumber } = user;
    const { getFieldDecorator } = form;
    const onSubmit = useSubmit(form, updateProfile);
    const handleBack = () => {
            push('/chat');
            chatChanged && chatChanged(null);
    };
    return (
        <>
            <Title level={2}>{collapsed && (
                <Button onClick={handleBack}>        
                    <LeftOutlined />
                </Button>
            )} Profile</Title>
            <Form onSubmit={onSubmit}>
                <Typography.Title level={2}>Profile</Typography.Title>
                <Row>
                    <Col span={18} xs={24} md={20} order={2}>
                        <Form.Item>
                            {getFieldDecorator('displayName', {
                                initialValue: displayName,
                                rules: [{ required: true, message: 'Name is required' }]
                            })(
                                <Input
                                    size='large'
                                    prefix={<AntIcon type='user' style={{ color: 'rgba(0,0,0,.25)' }}/>}
                                    placeholder='name'
                                />
                            )}
                        </Form.Item>
                        <Form.Item style={{ marginTop: '50px' }}>
                            {getFieldDecorator('phone', {
                                initialValue: phoneNumber,
                            })(
                                <Input
                                    disabled
                                    size='large'
                                    prefix={<AntIcon type='phone' style={{ color: 'rgba(0,0,0,.25)' }}/>}
                                    placeholder='phone'
                                />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={4} xs={24} md={4} order={1} style={{...collapsed && ({ display: 'flex' , justifyContent: 'center', order: 1})} }>
                        <AvatarWrapper collapsed={collapsed}>
                            {avatarLoading ?
                                <Spin size='large'/> :
                                <Col>
                                    <Avatar
                                        size={120}
                                        icon='user'
                                        src={avatarURL}
                                    />
                                    <Row type='flex' justify='center'>
                                        <UploadButton
                                            type='secondary'
                                            htmlType='button'
                                            handleUpload={updateAvatar}
                                        >
                                            Upload
                                        </UploadButton>
                                    </Row>
                                </Col>
                            }
                        </AvatarWrapper>
                    </Col>
                </Row>
                <Button block type='primary' htmlType='submit' loading={profileLoading}>
                    Update
                </Button>
            </Form>
        </>
    )
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'Profile' })(Profile));

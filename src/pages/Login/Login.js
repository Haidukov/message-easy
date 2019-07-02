import React, { useEffect, useState, useRef, useContext } from 'react';
import { connect } from 'react-redux';
import { login } from '../../store/modules/auth/actions';
import { Form, Icon, Input, Button, Layout, Card, Spin } from 'antd';
import AuthLayout from '../../layouts/AuthLayout';
import { EMAIL_REGEX } from '../../utils/regex';
import firebase from 'firebase';
import RecaptchaContext from '../../contexts/recaptcha-context';

const mapStateToProps = state => ({
    authError: state.auth.error,
    loading: state.auth.loading
});

const mapDispatchToProps = dispatch => ({
    login: ({ phoneNumber, appVerifier}) => dispatch(login({ phoneNumber, appVerifier }))
});

function Login({ login, form, loading }) {
    const { getFieldDecorator } = form;
    const ref = useRef();
    const appVerifier = useContext(RecaptchaContext);
    const onSubmit = event => {
        event.preventDefault();
        form.validateFields((err) => {
            if (!err) {
                login({ phoneNumber: '+380682903586', appVerifier });
            }
        });
    };
    return (
        <>
            <AuthLayout>
                <Form onSubmit={onSubmit}>
                    <Form.Item>
                        {getFieldDecorator('username', {

                        })(
                            <Input
                                prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }}/>}
                                placeholder='Username'
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                                type="password"
                                placeholder="Password"
                            />,
                        )}
                    </Form.Item>
                    <Button type='primary' htmlType='submit' loading={loading}>
                        Login
                    </Button>
                    <div>
                        Or <a href="">register now!</a>
                    </div>
                </Form>
            </AuthLayout>
            <div ref={ref}>
            </div>
        </>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'login' })(Login));

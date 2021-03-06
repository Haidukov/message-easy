import React, { useEffect, useState, useRef } from 'react';
import { Button, Form, Icon, Input, Typography } from 'antd';
import firebase from 'firebase';
import { sendVerificationCode, openCodeForm, } from '../../store/modules/auth/actions';
import { connect } from 'react-redux';
import { useSubmit } from '../../hooks/useSubmit';

const mapStateToProps = state => ({
    authError: state.auth.error,
    loading: state.auth.loading.phone
});

const mapDispatchToProps = dispatch => ({
    sendVerificationCode: ({ phoneNumber, appVerifier }) => dispatch(sendVerificationCode({
        phoneNumber,
        appVerifier
    })),
    next: dispatch(openCodeForm())
});

const PhoneForm = ({ form, loading, authError, sendVerificationCode }) => {
    const { getFieldDecorator } = form;
    const [appVerifier, setRecaptchaVerifier] = useState(null);
    const recaptchaRef = useRef();
    useEffect(() => {
        setTimeout(() => {
            const appVerifier = new firebase.auth.RecaptchaVerifier(recaptchaRef.current, {
                size: 'invisible',
            });
            setRecaptchaVerifier(appVerifier);
        });
    }, []);
    const onSubmit = useSubmit(form, form => sendVerificationCode({ ...form, appVerifier }));
    return (
        <>
            <Form onSubmit={onSubmit}>
                <Typography.Title>Авторизація</Typography.Title>
                <Form.Item
                    { ...authError && {
                        help: authError,
                        validateStatus: 'error',
                    }}>
                    {getFieldDecorator('phoneNumber', {
                        rules: [{ required: true, message: 'Should be valid phone' }]
                    })(
                        <Input
                            size='large'
                            prefix={<Icon type='phone' style={{ color: 'rgba(0,0,0,.25)' }}/>}
                            placeholder='Номер телефону'
                        />
                    )}
                </Form.Item>
                <Button block type='primary' htmlType='submit' loading={loading}>
                    Відправити
                </Button>
            </Form>
            <div ref={recaptchaRef}></div>
        </>
    )
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'PhoneForm' })(PhoneForm));

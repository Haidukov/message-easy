import React from 'react';
import { connect } from 'react-redux';
import AuthLayout from '../../layouts/AuthLayout';
import PhoneForm from './PhoneForm';
import CodeForm from './CodeForm';
import { Redirect } from 'react-router-dom';

const mapStateToProps = state => ({
    step: state.auth.step
});

function Login({ step }) {
    return (
        <>
            <AuthLayout>
                {step === 'PHONE_INPUT' &&
                <PhoneForm/>
                }
                {step === 'CODE_INPUT' &&
                <CodeForm/>
                }
            </AuthLayout>
        </>
    );
}

export default connect(mapStateToProps)(Login);

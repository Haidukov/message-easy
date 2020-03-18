import React  from 'react';
import { Button, Form, Icon, Input, Typography } from 'antd';
import { confirmCode } from '../../store/modules/auth/actions';
import { connect } from 'react-redux';
import { useSubmit } from '../../hooks/useSubmit';

const mapStateToProps = state => ({
    authError: state.auth.error,
    loading: state.auth.loading.code
});

const mapDispatchToProps = dispatch => ({
    confirmCode: code => dispatch(confirmCode(code))
});

const CodeForm = ({ form, confirmCode, authError, loading }) => {
    const { getFieldDecorator } = form;
    const onSubmit = useSubmit(form, ({ code }) => confirmCode(code));
    return (
        <Form onSubmit={onSubmit}>
            <Typography.Title>Авторизація</Typography.Title>
            <Form.Item
                {...authError && {
                    help: authError,
                    validateStatus: 'error',
                }}>
                {getFieldDecorator('code', {
                    rules: [{ required: true, message: 'Code is required' }]
                })(
                    <Input
                        size='large'
                        prefix={<Icon type='code' style={{ color: 'rgba(0,0,0,.25)' }}/>}
                        placeholder='Code'
                    />
                )}
            </Form.Item>
            <Button block type='primary' htmlType='submit' loading={loading}>
                Відправити
            </Button>
        </Form>
    )
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'PageOne' })(CodeForm));

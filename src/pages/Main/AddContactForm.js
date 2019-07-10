import { Form, Icon, Input, Modal, Typography } from 'antd';
import { connect } from 'react-redux';
import React from 'react';
import { getUsersByPhoneNumber } from '../../services/users';

const AddContactForm = ({ form, visible, hideModal}) => {
    const { getFieldDecorator } = form;
    const onSubmit = event => {
        event.preventDefault();
        form.validateFields(async (err, { phone }) => {
            if (!err) {
                const user = await getUsersByPhoneNumber(phone);
                console.log(user);
                //hideModal();
            }
        });
    };
    return (
        <Modal
            title='Add contact'
            visible={visible}
            onOk={onSubmit}
            onCancel={hideModal}
        >
            <Form onSubmit={onSubmit}>
                <Form.Item>
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: 'Phone is required' }]
                    })(
                        <Input
                            size='large'
                            prefix={<Icon type='phone' style={{ color: 'rgba(0,0,0,.25)' }}/>}
                            placeholder='Phone'
                        />
                    )}
                </Form.Item>
            </Form>
        </Modal>
    )
};

export default connect(() => ({}), () => ({}))(Form.create({ name: 'AddContactForm' })(AddContactForm));

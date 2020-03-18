import { Form, Icon, Input, Modal, Typography } from 'antd';
import { connect } from 'react-redux';
import React from 'react';
import { addContactByPhoneNumber } from '../../store/modules/chat/actions';
import { useSubmit } from '../../hooks/useSubmit';

const mapStateToProps = state => ({
    loading: state.chat.loading.form
});

const mapDispatchToProps = dispatch => ({
   addContact: phoneNumber => dispatch(addContactByPhoneNumber(phoneNumber))
});

const AddContactForm = ({ form, visible, addContact, hideModal, loading }) => {
    console.log(loading);
    const { getFieldDecorator } = form;
    const onSubmit = useSubmit(form,    async ({ phone }) => {
        await addContact(phone);
        hideModal();
    });
    return (
        <Modal
            title='Add contact'
            visible={visible}
            onOk={onSubmit}
            confirmLoading={loading}
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

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'AddContactForm' })(AddContactForm));
